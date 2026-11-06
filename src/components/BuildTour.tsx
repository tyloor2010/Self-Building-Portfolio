import { useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";

const COLORS = ["var(--primary)", "var(--signal)", "oklch(0.85 0.17 90)", "oklch(0.75 0.18 150)", "oklch(0.75 0.17 330)"];
const AGENTS = 18;
type Box = { x: number; y: number; w: number; h: number; label: string } | null;

export function BuildTour() {
  const [box, setBox] = useState<Box>(null);
  const [t, setT] = useState(0);
  const [phase, setPhase] = useState<"building" | "done">("building");
  const [progress, setProgress] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const run = useRef(0);
  const active = useRef<HTMLElement | null>(null);

  // animation clock + keep box glued to the active element while scrolling
  useEffect(() => {
    let raf = 0;
    const loop = (ms: number) => {
      setT(ms / 1000);
      const el = active.current;
      if (el) {
        const r = el.getBoundingClientRect();
        setBox((b) => ({ x: r.left, y: r.top, w: r.width, h: r.height, label: b?.label ?? "" }));
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const start = async () => {
    const id = ++run.current;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-build]"));
    els.forEach((el) => { el.style.transition = "opacity .5s, transform .5s"; el.style.opacity = "0"; el.style.transform = "translateY(12px)"; });
    setPhase("building");
    window.scrollTo({ top: 0 });
    const t0 = performance.now();
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
    for (let i = 0; i < els.length; i++) {
      if (id !== run.current) return;
      const el = els[i];
      const r = el.getBoundingClientRect();
      if (r.top < 80 || r.bottom > window.innerHeight - 80)
        window.scrollTo({ top: window.scrollY + r.top - window.innerHeight / 3, behavior: "smooth" });
      active.current = el;
      setBox({ x: r.left, y: r.top, w: r.width, h: r.height, label: el.dataset.build || "" });
      await wait(380);
      el.style.opacity = "1"; el.style.transform = "none";
      setProgress((i + 1) / els.length);
      setElapsed((performance.now() - t0) / 1000);
      await wait(420);
    }
    active.current = null;
    setBox(null);
    setPhase("done");
  };

  useEffect(() => { const h = setTimeout(start, 500); return () => { clearTimeout(h); run.current++; }; }, []);

  const cx = box ? box.x + box.w / 2 : 0;
  const cy = box ? box.y + box.h / 2 : 0;

  return (
    <>
      {/* swarm cursors */}
      <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
        {Array.from({ length: 14 }).map((_, i) => {
          const vw = typeof window !== "undefined" ? window.innerWidth : 1280;
          const vh = typeof window !== "undefined" ? window.innerHeight : 800;
          let x: number, y: number;
          if (box) {
            const a = (i / 14) * Math.PI * 2 + t * 0.8;
            x = cx + Math.cos(a) * (box.w / 2 + 20) * (0.6 + 0.4 * Math.sin(t + i));
            y = cy + Math.sin(a) * (box.h / 2 + 20) * (0.6 + 0.4 * Math.cos(t + i));
          } else {
            x = vw / 2 + Math.sin(t * 0.3 + i * 1.7) * vw * 0.42;
            y = vh / 2 + Math.cos(t * 0.25 + i * 2.3) * vh * 0.4;
          }
          return (
            <svg key={i} width="14" height="14" viewBox="0 0 24 24" className="absolute drop-shadow transition-[left,top] duration-500 ease-out"
              style={{ left: x, top: y, color: COLORS[i % COLORS.length] }}>
              <path d="M3 2l18 9-8 2-3 8z" fill="currentColor" />
            </svg>
          );
        })}
      </div>

      {/* editor-style selection box */}
      {box && (
        <div className="pointer-events-none fixed z-40 border-2 border-signal transition-all duration-300 ease-out"
          style={{ left: box.x - 6, top: box.y - 6, width: box.w + 12, height: box.h + 12 }}>
          {[["-left-1.5 -top-1.5"], ["-right-1.5 -top-1.5"], ["-left-1.5 -bottom-1.5"], ["-right-1.5 -bottom-1.5"]].map(([p]) => (
            <span key={p} className={`absolute h-2.5 w-2.5 border-2 border-signal bg-background ${p}`} />
          ))}
          <span className="absolute -top-6 left-0 whitespace-nowrap bg-signal px-1.5 py-0.5 font-mono text-[10px] font-bold text-background">{box.label}</span>
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-signal px-1.5 py-0.5 font-mono text-[10px] text-background">
            {Math.round(box.w)} × {Math.round(box.h)}
          </span>
        </div>
      )}

      {/* status bar */}
      <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full border bg-card/90 px-4 py-2 font-mono text-[11px] backdrop-blur">
        <span className="flex -space-x-1">{COLORS.map((c) => <span key={c} className="h-2.5 w-2.5 rounded-full border border-card" style={{ background: c }} />)}</span>
        {phase === "building" ? (
          <>
            <span><b>{AGENTS}</b> agents</span>
            <span className="h-1 w-24 overflow-hidden rounded-full bg-muted"><span className="block h-full bg-signal transition-all" style={{ width: `${progress * 100}%` }} /></span>
            <span className="text-signal">Building<span className="animate-blink">_</span></span>
          </>
        ) : (
          <>
            <span>Rebuilt by <b>{AGENTS}</b> agents in <b>{elapsed.toFixed(1)}s</b></span>
            <button onClick={start} className="pointer-events-auto flex items-center gap-1 rounded-full bg-signal px-2.5 py-0.5 font-bold text-background">
              <RotateCcw className="h-3 w-3" /> Replay
            </button>
          </>
        )}
      </div>
    </>
  );
}
