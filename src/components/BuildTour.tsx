import { useEffect, useRef, useState } from "react";
import { RotateCcw, FastForward, Volume2 } from "lucide-react";

/*
 * "Live build" tour: several agents (cursors) build the page in parallel.
 * Text is typed line-by-line (clip-path polygon + caret), images/frames are
 * drawn by resizing from the corner, headings are dragged into place.
 */

const COLORS = ["oklch(0.72 0.15 235)", "oklch(0.85 0.17 90)", "oklch(0.75 0.18 150)", "oklch(0.75 0.17 330)", "oklch(0.7 0.2 30)", "oklch(0.8 0.12 200)"];
const AGENTS = 18;
const WORKERS = 5;
const LEAF = "h1,h2,h3,h4,p,li,blockquote,img,button,a,span";
const FRAME = "nav,article,[data-frame]";

type Kind = "text" | "img" | "frame" | "drag";
type Job = { el: HTMLElement; kind: Kind; start: number; dur: number; lines: { t: number; b: number; l: number; r: number }[]; label: string };
type Worker = { color: string; x: number; y: number; job: Job | null; cool: number; role: Role };
type Role = { name: string; kinds: Kind[] };
// Each agent has one job: it only picks the layers that match its role (nearest first).
const ROLES: Role[] = [{ name: "Writer", kinds: ["text"] }, { name: "Designer", kinds: ["img", "frame"] }, { name: "Layout", kinds: ["drag", "frame"] }, { name: "Writer", kinds: ["text"] }, { name: "Designer", kinds: ["img", "frame"] }];
type Snap = { workers: { color: string; x: number; y: number; box: DOMRect | null; label: string; caret: { x: number; y: number; h: number } | null; kind: Kind | null }[]; idle: { x: number; y: number; c: string }[] };

function kindOf(el: HTMLElement): Kind {
  if (el.matches(FRAME)) return "frame";
  if (el.tagName === "IMG") return "img";
  if (el.tagName === "H1" || el.tagName === "H2") return "drag";
  if ((el.tagName === "BUTTON" || el.tagName === "A") && /border|bg-primary|bg-signal/.test(el.className)) return "frame";
  return "text";
}
const NAMES: Record<string, string> = { H1: "Heading", H2: "Heading", H3: "Heading", H4: "Heading", P: "Text", LI: "List item", IMG: "Image", BUTTON: "Button", A: "Link", SPAN: "Text", NAV: "Navbar", ARTICLE: "Card", BLOCKQUOTE: "Quote", DIV: "Frame" };

function measureLines(el: HTMLElement) {
  const r = el.getBoundingClientRect();
  const range = document.createRange();
  range.selectNodeContents(el);
  const rows: { t: number; b: number; l: number; r: number }[] = [];
  for (const c of Array.from(range.getClientRects())) {
    if (c.width < 1) continue;
    const t = c.top - r.top, b = c.bottom - r.top;
    const row = rows.find((x) => Math.abs(x.t - t) < 4 || (t >= x.t && t < x.b - 2));
    if (row) { row.l = Math.min(row.l, c.left - r.left); row.r = Math.max(row.r, c.right - r.left); row.t = Math.min(row.t, t); row.b = Math.max(row.b, b); }
    else rows.push({ t, b, l: c.left - r.left, r: c.right - r.left });
  }
  return rows.sort((a, b) => a.t - b.t);
}

const ease = (p: number) => 1 - Math.pow(1 - p, 3);

export function BuildTour() {
  const [snap, setSnap] = useState<Snap>({ workers: [], idle: [] });
  const [phase, setPhase] = useState<"building" | "done">("building");
  const [done, setDone] = useState(0);
  const [total, setTotal] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [touring, setTouring] = useState(true);
  const s = useRef({ queue: [] as HTMLElement[], all: [] as HTMLElement[], workers: [] as Worker[], sim: 0, done: 0, running: false, speed: 1, touring: true, t0: 0, pauseUntil: 0, manual: false });

  useEffect(() => { s.current.speed = speed; }, [speed]);
  useEffect(() => { s.current.touring = touring; }, [touring]);

  const reset = (el: HTMLElement) => { el.style.clipPath = ""; el.style.transform = ""; el.style.filter = ""; el.style.opacity = ""; };

  const start = () => {
    const main = document.querySelector("main");
    if (!main) return;
    const st = s.current;
    st.all.forEach(reset);
    const all = Array.from(main.querySelectorAll<HTMLElement>(`${FRAME},${LEAF}`)).filter((el) => {
      if (el.closest("[data-tour-ui]")) return false;
      if (el.matches(FRAME)) return true;
      const anc = el.parentElement?.closest(LEAF);
      if (anc && main.contains(anc)) return false;
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    });
    all.forEach((el) => { el.style.opacity = "0"; });
    (main as HTMLElement).style.opacity = "1";
    st.all = all; st.queue = [...all]; st.done = 0; st.sim = 0; st.running = true; st.t0 = performance.now();
    st.workers = Array.from({ length: WORKERS }, (_, i) => ({ color: COLORS[i % COLORS.length]!, x: window.innerWidth / 2, y: window.innerHeight + 40, job: null, cool: 0, role: ROLES[i % ROLES.length]! }));
    st.manual = false; st.pauseUntil = 0;
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    setTotal(all.length); setDone(0); setPhase("building"); setTouring(true);
  };

  const finish = () => {
    const st = s.current;
    st.all.forEach(reset);
    st.queue = []; st.workers.forEach((w) => (w.job = null)); st.running = false;
    setDone(st.all.length); setElapsed((performance.now() - st.t0) / 1000); setPhase("done");
    // build over: glide back up to the top of the page
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" as ScrollBehavior }), 500);
  };

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (location.hash) history.replaceState(null, "", location.pathname + location.search);
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    setTimeout(() => document.documentElement.classList.add("smooth"), 1000);
    const h = setTimeout(start, 300);
    const stopTour = () => {
      const st = s.current;
      if (st.manual) return;
      st.pauseUntil = performance.now() + 3500;
      if (st.touring) setTouring(false);
    };
    window.addEventListener("wheel", stopTour, { passive: true });
    window.addEventListener("touchmove", stopTour, { passive: true });
    let raf = 0, last = performance.now();
    const loop = (now: number) => {
      const st = s.current;
      const dt = Math.min(50, now - last) * st.speed; last = now;
      st.sim += dt;
      if (!st.touring && !st.manual && st.pauseUntil && now > st.pauseUntil) { st.pauseUntil = 0; setTouring(true); }
      const t = now / 1000;
      const out: Snap["workers"] = [];
      let lowest = -Infinity;

      if (st.running) {
        for (const w of st.workers) {
          if (!w.job && st.queue.length && st.sim >= w.cool && st.workers.every((o) => !o.job || o.job.el.closest("section,header,footer,nav") === st.queue[0]!.closest("section,header,footer,nav"))) {
            // look ahead a little for a layer that matches this agent's role; otherwise help with the next one
            // section by section: only take layers from the section currently being built
            const sec = (q: HTMLElement) => q.closest("section,header,footer,nav");
            const cur = sec(st.queue[0]!);
            let n = 0; while (n < st.queue.length && sec(st.queue[n]!) === cur) n++;
            let idx = st.queue.slice(0, Math.min(n, 8)).findIndex((q) => w.role.kinds.includes(kindOf(q)));
            if (idx < 0) idx = 0;
            const el = st.queue.splice(idx, 1)[0]!;
            const kind = kindOf(el);
            const len = (el.textContent || "").trim().length;
            const dur = kind === "text" ? Math.min(5600, Math.max(1100, len * 62)) : kind === "img" ? 3400 : kind === "drag" ? 2200 : 1500;
            el.style.opacity = "1";
            el.style.clipPath = "inset(0 100% 100% 0)";
            w.job = { el, kind, start: st.sim + 520, dur, lines: kind === "text" ? measureLines(el) : [], label: `${w.role.name} · ${NAMES[el.tagName] || "Layer"}` };
          }
          const j = w.job;
          if (!j) { out.push({ color: w.color, x: w.x, y: w.y, box: null, label: "", caret: null, kind: null }); continue; }
          const r = j.el.getBoundingClientRect();
          const p = Math.max(0, Math.min(1, (st.sim - j.start) / j.dur));
          let tx = r.left, ty = r.top, caret: Snap["workers"][number]["caret"] = null;

          if (j.kind === "text") {
            const L = j.lines.length ? j.lines : [{ t: 0, b: r.height, l: 0, r: r.width }];
            const tot = L.reduce((a, l) => a + (l.r - l.l), 0) || 1;
            let acc = p * tot, i = 0;
            while (i < L.length - 1 && acc > L[i]!.r - L[i]!.l) { acc -= L[i]!.r - L[i]!.l; i++; }
            const ln = L[i]!;
            const x = ln.l + Math.min(acc, ln.r - ln.l);
            j.el.style.clipPath = p >= 1 ? "" : `polygon(0 0, 100% 0, 100% ${ln.t}px, ${x}px ${ln.t}px, ${x}px ${ln.b}px, 0 ${ln.b}px, 0 ${ln.t}px, 0 0)`;
            if (i === 0) j.el.style.clipPath = p >= 1 ? "" : `polygon(0 ${ln.t}px, ${x}px ${ln.t}px, ${x}px ${ln.b}px, 0 ${ln.b}px)`;
            caret = { x: r.left + x, y: r.top + ln.t, h: ln.b - ln.t };
            tx = r.left + x + 4; ty = r.top + ln.b - 2;
          } else if (j.kind === "img" || j.kind === "frame") {
            const e = ease(p);
            j.el.style.clipPath = `inset(0 ${(1 - e) * 100}% ${(1 - e) * 100}% 0)`;
            if (j.kind === "img") j.el.style.filter = p < 0.7 ? "grayscale(1) brightness(0.35)" : "";
            tx = r.left + r.width * Math.max(e, 0.05); ty = r.top + r.height * Math.max(e, 0.05);
          } else {
            const e = ease(p);
            j.el.style.clipPath = st.sim < j.start ? "inset(0 100% 100% 0)" : "";
            j.el.style.transform = `translate(${(1 - e) * -70}px, ${(1 - e) * 40}px)`;
            tx = r.left + 24; ty = r.top + r.height / 2;
          }
          // cursor flies toward its target
          const k = st.sim < j.start ? 0.08 : 0.24;
          w.x += (tx - w.x) * k; w.y += (ty - w.y) * k;
          lowest = Math.max(lowest, w.y);
          out.push({ color: w.color, x: w.x, y: w.y, box: r, label: j.label, caret: j.kind === "text" && st.sim >= j.start ? caret : null, kind: j.kind });

          if (p >= 1) { reset(j.el); w.job = null; w.cool = st.sim + 320; st.done++; }
        }
        if (st.done !== done) setDone(st.done);
        if (!st.queue.length && st.workers.every((w) => !w.job)) finish();

        // auto-scroll ("Touring") — keep the active work in view
        if (st.touring && lowest !== -Infinity) {
          const delta = lowest - window.innerHeight * 0.6;
          if (Math.abs(delta) > 2) window.scrollTo({ top: window.scrollY + delta * 0.18, behavior: "instant" as ScrollBehavior });
        }
      }

      // after the build: all agents gather into one flock that swirls in loops (like a murmuration)
      const W = window.innerWidth, H = window.innerHeight;
      const cx = W * 0.72 + Math.sin(t * 0.35) * W * 0.16, cy = H * 0.45 + Math.sin(t * 0.7) * H * 0.2;
      const idle = Array.from({ length: st.running ? 0 : AGENTS }, (_, i) => {
        const a = t * 1.6 + (i / AGENTS) * Math.PI * 2 * 0.55;
        const rad = Math.min(W, H) * (0.07 + 0.03 * Math.sin(t * 1.3 + i));
        return {
          x: cx + Math.cos(a) * rad + Math.sin(t * 2.1 + i * 1.9) * 10,
          y: cy + Math.sin(a) * rad * 1.3 + Math.cos(t * 1.8 + i * 2.7) * 10,
          c: COLORS[i % COLORS.length]!,
        };
      });
      setSnap({ workers: out, idle });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { clearTimeout(h); cancelAnimationFrame(raf); window.removeEventListener("wheel", stopTour); window.removeEventListener("touchmove", stopTour); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Cursor = ({ x, y, c }: { x: number; y: number; c: string }) => (
    <svg width="15" height="15" viewBox="0 0 24 24" className="absolute drop-shadow" style={{ left: x, top: y, color: c }}>
      <path d="M3 2l18 9-8 2-3 8z" fill="currentColor" stroke="black" strokeWidth="1" />
    </svg>
  );

  return (
    <div data-tour-ui>
      <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
        {snap.idle.map((c, i) => <Cursor key={`i${i}`} {...c} />)}
        {snap.workers.map((w, i) => w.box && (
          <div key={`b${i}`} className={`absolute border ${w.kind === "text" ? "border-signal bg-signal/5" : "border-signal"}`}
            style={{ left: w.box.left - 4, top: w.box.top - 4, width: w.box.width + 8, height: w.box.height + 8 }}>
            {w.kind !== "text" && ["-left-1 -top-1", "-right-1 -top-1", "-left-1 -bottom-1", "-right-1 -bottom-1"].map((p) => (
              <span key={p} className={`absolute h-2 w-2 border border-signal bg-background ${p}`} />
            ))}
            {w.kind === "frame" || w.kind === "drag" ? <span className="absolute -right-4 -top-4 font-mono text-sm text-foreground">+</span> : null}
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-sm bg-signal px-1 font-mono text-[9px] font-bold text-background">
              {Math.round(w.box.width)} × {Math.round(w.box.height)}
            </span>
            <span className="absolute -top-5 left-0 whitespace-nowrap rounded-sm px-1 font-mono text-[9px] font-bold text-background" style={{ background: w.color }}>{w.label}</span>
          </div>
        ))}
        {snap.workers.map((w, i) => w.caret && (
          <span key={`c${i}`} className="absolute w-[2px] animate-blink bg-signal" style={{ left: w.caret.x, top: w.caret.y, height: w.caret.h }} />
        ))}
        {snap.workers.map((w, i) => w.box && <Cursor key={`w${i}`} x={w.x} y={w.y} c={w.color} />)}
      </div>

      <div className="fixed bottom-3 left-1/2 z-50 flex max-w-[calc(100vw-1rem)] -translate-x-1/2 items-center gap-2.5 rounded-full border bg-card/95 px-3 py-1.5 font-mono text-[10px] backdrop-blur sm:gap-3 sm:text-[11px]">
        <span className="flex -space-x-1">{COLORS.slice(0, 5).map((c) => <span key={c} className="h-2.5 w-2.5 rounded-full border border-card" style={{ background: c }} />)}</span>
        {phase === "building" ? (
          <>
            <span className="whitespace-nowrap"><b>{AGENTS}</b> agents</span>
            <span className="hidden whitespace-nowrap text-muted-foreground sm:inline"><b className="text-foreground">{done}</b> / {total} layers</span>
            <span className="hidden h-1 w-16 overflow-hidden rounded-full bg-muted sm:block"><span className="block h-full bg-signal" style={{ width: `${total ? (done / total) * 100 : 0}%` }} /></span>
            <button onClick={() => { s.current.manual = true; setTouring((v) => !v); }} className={`rounded-full px-2 py-0.5 ${touring ? "bg-signal/20 text-signal" : "text-muted-foreground"}`}>Touring</button>
            <button onClick={() => setSpeed((v) => (v === 1 ? 2 : v === 2 ? 4 : 1))} className="rounded-full px-1.5 py-0.5 text-muted-foreground hover:text-foreground">{speed}x</button>
            <Volume2 className="hidden h-3 w-3 text-muted-foreground sm:block" />
            <button onClick={finish} aria-label="Skip" className="text-muted-foreground hover:text-foreground"><FastForward className="h-3 w-3" /></button>
          </>
        ) : (
          <>
            <span className="whitespace-nowrap">Rebuilt by <b>{AGENTS}</b> agents in <b>{elapsed.toFixed(1)}s</b></span>
            <button onClick={start} className="flex items-center gap-1 rounded-full bg-signal px-2.5 py-0.5 font-bold text-background">
              <RotateCcw className="h-3 w-3" /> Replay
            </button>
          </>
        )}
      </div>
    </div>
  );
}
