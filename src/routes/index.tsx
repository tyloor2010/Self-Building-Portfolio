import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Github, Linkedin, Mail, Copy, Check, Instagram, Facebook, Globe, Music2, ShoppingBag, ExternalLink } from "lucide-react";
import portrait from "@/assets/portrait.jpg";
import { BuildTour } from "@/components/BuildTour";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mohamed Nasser — Portfolio" },
      { name: "description", content: "Mohamed Nasser builds AI, computer vision and EdTech platforms — VisionTrack AI, SiderEdu, MouSaSAT, FireHarmonize and more." },
      { property: "og:title", content: "Mohamed Nasser — Portfolio" },
      { property: "og:description", content: "AI, computer vision and EdTech platforms by Mohamed Nasser." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAME = "MOHAMED";
const EMAIL = "moonasser.official@gmail.com";

function Nav() {
  return (
    <nav className="fixed left-1/2 top-4 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border bg-card/80 px-2 py-1.5 backdrop-blur">
      <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">M</span>
      {["About", "Flagships", "Projects", "Contact"].map((l) => (
        <a key={l} href={`#${l === "Projects" ? "matrix" : l.toLowerCase()}`} className="rounded-full px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">{l}</a>
      ))}
      <span className="ml-2 hidden items-center gap-1.5 pr-2 label-mono text-signal sm:flex">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal" /> Available
      </span>
    </nav>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="label-mono text-primary">{children}</p>;
}

function Hero() {
  return (
    <section className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-6 pt-24 lg:grid-cols-[1.3fr_1fr] xl:grid-cols-[1.2fr_0.9fr_0.8fr]">
      <div>
        <h1 data-build="H1 · Title" className="font-display text-outline text-[clamp(4rem,13vw,11rem)] leading-[0.85] tracking-tight">PORTFOLIO</h1>
        <p data-build="Script" className="mt-2 font-script text-4xl">Hello, I'm</p>
        <span data-build="Name Block" className="mt-1 inline-block -rotate-2 rounded-lg border-2 border-foreground bg-accent px-4 py-1 font-display text-accent-foreground shadow-[4px_4px_0_var(--foreground)] text-5xl md:text-6xl">{NAME}.</span>
        <p data-build="Role Tag" className="mt-6 flex items-center gap-2 label-mono text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-primary" /> AI &amp; EdTech Builder
        </p>
        <p data-build="Intro" className="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">
          Building <b className="text-foreground">AI &amp; computer vision systems</b> and{" "}
          <b className="text-foreground">learning platforms</b> for students across Egypt and beyond.
        </p>
        <div data-build="CTA Group" className="mt-8 flex flex-wrap gap-3">
          <a href="#contact" className="flex items-center gap-2 bg-primary px-5 py-3 label-mono text-primary-foreground transition hover:brightness-110">Get in touch <ArrowRight className="h-3.5 w-3.5" /></a>
          <a href="#flagships" className="border px-5 py-3 label-mono transition hover:border-primary hover:text-primary">See projects</a>
        </div>
        <div data-build="Stats" className="mt-12 flex gap-10">
          {[["9", "Projects"], ["6", "EdTech platforms"], ["2", "Competitions"]].map(([n, l]) => (
            <div key={l}><p className="font-display text-3xl text-primary">{n}</p><p className="label-mono text-muted-foreground">{l}</p></div>
          ))}
        </div>
      </div>
      <div data-frame data-build="Portrait" className="relative mx-auto w-full max-w-sm">
        <div className="absolute -inset-3 border border-primary/40" />
        <img src={portrait} alt={`Portrait of ${NAME}`} width={768} height={960} className="relative w-full" />
        <span className="absolute -bottom-3 left-4 bg-background px-2 py-1 label-mono text-primary">● Building now</span>
      </div>
      <div className="hidden space-y-4 xl:block">
        {[["01.", "VisionTrack AI", "Finding missing persons faster with computer vision. ITC-Egypt 2026.", "AI / CV"], ["02.", "EdTech Platforms", "SiderEdu, MouSaSAT, Real SAT Prep, Sider IGCSE, STEM Egypt Hub, Step.", "EDTECH"], ["03.", "FireHarmonize", "NASA Space Apps 2026 — one harmonized satellite fire map.", "SPACE"]].map(([n, t, d, tag]) => (
          <article key={n} className="border bg-card/60 p-4">
            <div className="flex justify-between"><span className="font-mono text-[10px] text-muted-foreground">{n}</span><span className="label-mono text-muted-foreground">{tag}</span></div>
            <h3 className="mt-2 font-bold">{t}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{d}</p>
          </article>
        ))}
        <p className="font-mono text-[10px] text-muted-foreground">AI · Computer Vision · EdTech · Satellite Data</p>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-6 py-28">
      <p className="mb-10 font-mono text-xs text-muted-foreground">// 01.00 SEC_ABOUT INDEX [01 / 05]</p>
      <Label>Engineer profile</Label>
      <h2 data-build="H2 · About" className="mt-2 text-4xl font-extrabold tracking-tight md:text-5xl">What I Build</h2>
      <div className="mt-10 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
        <div data-build="Bio" className="space-y-5 border-l-2 border-primary pl-6 text-muted-foreground leading-relaxed">
          <p>I'm <b className="text-foreground">Mohamed Nasser</b>. I build AI and computer vision systems — like <b className="text-foreground">VisionTrack AI</b>, made for ITC-Egypt 2026 to help find missing persons faster — and space-data tools like <b className="text-foreground">FireHarmonize</b> for the NASA Space Apps Challenge 2026.</p>
          <p>Most of my work is in education: SAT, IGCSE and STEM learning platforms such as SiderEdu, MouSaSAT, Real SAT Prep and STEM Egypt Hub, plus study guides on my Gumroad store.</p>
          <blockquote className="text-lg font-semibold italic text-foreground">"Technology that turns every minute into progress — for students and for people searching for the ones they love."</blockquote>
        </div>
        <div data-build="Principles" className="space-y-6">
          {[["AI for Good", "Computer vision that turns camera feeds into real leads."], ["Learning First", "Platforms built around how students actually prepare."], ["Real Data", "Satellite and camera data made clear and useful."]].map(([t, d]) => (
            <div key={t} className="border-b pb-4"><p className="font-bold">{t}</p><p className="text-sm text-muted-foreground">{d}</p></div>
          ))}
        </div>
      </div>
    </section>
  );
}

const LAYERS: [string, string, string][] = [
  ["Problem", "Every minute matters", "When a person goes missing, hours of camera footage hide the clues that matter."],
  ["v1: Detection", "VisionTrack AI", "AI and computer vision turn camera feeds into real leads, faster, smarter, safer."],
  ["v2: Search & Match", "VisionTrack AI v2", "Matches faces across camera feeds in real time for faster results."],
  ["Stage", "ITC-Egypt 2026", "International Telecommunication Conference, hosted by the Air Defence College."],
];

function Flagships() {
  const [layer, setLayer] = useState(0);
  return (
    <section id="flagships" className="mx-auto max-w-7xl px-6 py-28">
      <Label>Architectural showcase</Label>
      <h2 data-build="H2 · Flagships" className="mt-2 text-4xl font-extrabold tracking-tight md:text-5xl">Flagship Deployments</h2>
      <p className="mt-3 max-w-xl text-muted-foreground">AI, space data and learning platforms built for real people and real stakes.</p>

      <div data-frame data-build="Core Card" className="mt-10 rounded-xl border-2 shadow-[6px_6px_0_var(--foreground)] bg-card p-6 md:p-10">
        <span className="bg-primary/15 px-2 py-1 label-mono text-primary">● AI / Computer Vision</span>
        <h3 className="mt-4 text-2xl font-extrabold md:text-3xl">VisionTrack AI — Finding Missing Persons</h3>
        <p className="mt-3 max-w-3xl text-muted-foreground">Finding missing persons faster, smarter, safer. Built for ITC-Egypt 2026, VisionTrack uses AI and computer vision to turn camera feeds into real leads when every minute matters.</p>
        <div className="mt-8 grid grid-cols-2 gap-px border bg-border md:grid-cols-4">
          {[["2", "Versions"], ["Real-time", "Face match"], ["2026", "ITC-Egypt"], ["AI + CV", "Stack"]].map(([n, l]) => (
            <div key={l} className="bg-card p-5"><p className="font-display text-3xl text-primary">{n}</p><p className="label-mono text-muted-foreground">{l}</p></div>
          ))}
        </div>
        <p className="mt-10 label-mono">How it works</p>
        <p className="text-xs text-muted-foreground">Click a step to see details</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {LAYERS.map(([l], i) => (
            <button key={l} onClick={() => setLayer(i)} className={`px-3 py-1.5 font-mono text-[11px] transition ${i === layer ? "bg-primary text-primary-foreground" : "border text-muted-foreground hover:border-primary hover:text-foreground"}`}>{l}</button>
          ))}
        </div>
        <div key={layer} className="mt-5 animate-rise border-l-2 border-primary bg-background/50 p-5">
          <p className="label-mono text-primary">Step 0{layer + 1} // {LAYERS[layer]![0]}</p>
          <p className="mt-1 text-lg font-bold">{LAYERS[layer]![1]}</p>
          <p className="text-sm text-muted-foreground">{LAYERS[layer]![2]}</p>
        </div>
      </div>

      <div data-build="Project Grid" className="mt-6 grid gap-6 md:grid-cols-3">
        {[
          ["Space // NASA Space Apps 2026", "FireHarmonize", ["MODIS + VIIRS satellite fire data", "One harmonized fire map", "Two satellites, one common view"], "Satellite data"],
          ["EdTech // Platform", "SiderEdu", ["Online learning platform", "\"Your next step in learning\"", "sideredu.com"], "EdTech"],
          ["EdTech // STEM", "STEM Egypt Hub", ["Video lessons & live classes", "Question bank & e-exams", "Progress reports for parents"], "EdTech"],
        ].map(([tag, title, pts, stack]) => (
          <article key={title as string} className="group flex flex-col border bg-card p-6 transition hover:border-primary">
            <span className="label-mono text-primary">{tag}</span>
            <h4 className="mt-3 text-lg font-extrabold">{title}</h4>
            <ul className="mt-4 flex-1 space-y-1.5 text-sm text-muted-foreground">
              {(pts as string[]).map((p) => <li key={p}>• {p}</li>)}
            </ul>
            <p className="mt-6 border-t pt-3 font-mono text-xs text-muted-foreground group-hover:text-foreground">{stack}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const MATRIX: [string, string, string, string?][] = [
  ["AI / Computer Vision", "VisionTrack AI", "Finding missing persons faster, smarter, safer. Built for ITC-Egypt 2026."],
  ["AI / Computer Vision", "VisionTrack AI v2", "Search & Match — matches faces across camera feeds in real time."],
  ["EdTech Platform", "SiderEdu", "An online learning platform, \"your next step in learning.\"", "https://sideredu.com"],
  ["EdTech Platform", "MouSaSAT", "A dedicated SAT prep website with organized content and practice resources.", "https://mousasat.com"],
  ["EdTech Platform", "Real SAT Prep", "Real practice, real prep — a hub for serious SAT preparation.", "https://realsatprep.com"],
  ["EdTech Platform", "Sider IGCSE", "An IGCSE learning companion with a playful, mascot-led design."],
  ["EdTech Platform", "STEM Egypt Hub", "Video lessons, live classes, question bank, e-exams and parent progress reports."],
  ["EdTech Platform", "Step Education", "\"Step by step to your future.\" A guided learning platform."],
  ["Space / Data", "FireHarmonize", "NASA Space Apps 2026 — MODIS and VIIRS fire data in one harmonized map."],
];
function Matrix() {
  const cats = ["All", ...Array.from(new Set(MATRIX.map((m) => m[0])))];
  const [f, setF] = useState("All");
  return (
    <section id="matrix" className="mx-auto max-w-7xl px-6 py-28">
      <Label>Engineering index</Label>
      <h2 data-build="H2 · Matrix" className="mt-2 text-4xl font-extrabold tracking-tight md:text-5xl">All Projects</h2>
      <p className="mt-3 max-w-xl text-muted-foreground">Every project I have shipped — AI, education and space data.</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {cats.map((c) => (
          <button key={c} onClick={() => setF(c)} className={`px-3 py-1.5 font-mono text-[11px] transition ${f === c ? "bg-primary text-primary-foreground" : "border text-muted-foreground hover:text-foreground"}`}>{c}</button>
        ))}
      </div>
      <div data-build="Matrix Grid" className="mt-8 grid gap-px border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {MATRIX.filter((m) => f === "All" || m[0] === f).map(([c, t, d, url], i) => (
          <article key={t} className="animate-rise bg-card p-6 transition hover:bg-accent">
            <div className="flex justify-between"><span className="label-mono text-primary">{c}</span><span className="font-mono text-[10px] text-muted-foreground">0{i + 1}</span></div>
            <h4 className="mt-3 font-extrabold">{t}</h4>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            {url && <a href={url} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 font-mono text-xs text-primary hover:underline">{url.replace("https://", "")} <ExternalLink className="h-3 w-3" /></a>}
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  return (
    <section id="contact" className="mx-auto max-w-3xl px-6 py-32 text-center">
      <Label>Direct connect</Label>
      <h2 data-build="H2 · Contact" className="mt-3 text-4xl font-extrabold tracking-tight md:text-6xl">Let's Build Something<br />Together.</h2>
      <p className="mx-auto mt-5 max-w-lg text-muted-foreground">Open to collaborations on AI, EdTech and product builds. Grab my SAT guides from the store below.</p>
      <div data-build="Email" className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <span className="font-mono font-bold">{EMAIL}</span>
        <button onClick={() => { navigator.clipboard.writeText(EMAIL); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
          className="flex items-center gap-2 bg-primary px-4 py-2 label-mono text-primary-foreground">
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} {copied ? "Copied" : "Copy email address"}
        </button>
      </div>
      <div data-build="Socials" className="mt-8 flex flex-wrap justify-center gap-3">
        {([
          [Linkedin, "LinkedIn", "https://www.linkedin.com/in/mohamed-nasser-377b6b404"],
          [Github, "GitHub", "https://github.com/nohamednasser"],
          [Globe, "moonasser.site", "https://moonasser.site"],
          [Instagram, "Instagram", "https://www.instagram.com/m_m7md33"],
          [Music2, "TikTok", "https://www.tiktok.com/@m_m7md33"],
          [Facebook, "Facebook", "https://www.facebook.com/profile.php?id=61591259158690"],
          [Globe, "Framer Marketplace", "https://framer.com/@randomboyz/"],
          [Mail, "Email", `mailto:${EMAIL}`],
        ] as [typeof Github, string, string][]).map(([Icon, l, href]) => (
          <a key={l} href={href} target="_blank" rel="noreferrer" className="flex items-center gap-2 border px-3 py-2 text-xs text-muted-foreground transition hover:border-primary hover:text-foreground"><Icon className="h-3.5 w-3.5" />{l}</a>
        ))}
      </div>
      <div data-build="Store" className="mt-10 rounded-xl border-2 shadow-[6px_6px_0_var(--foreground)] bg-card p-6 text-left">
        <p className="flex items-center gap-2 label-mono text-primary"><ShoppingBag className="h-3.5 w-3.5" /> Store</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[["How to Get 1300+ on the SAT", "https://moonasser.gumroad.com/l/upechg"], ["How to Write a Perfect Essay", "https://moonasser.gumroad.com/l/ztinid"]].map(([t, h]) => (
            <a key={t} href={h} target="_blank" rel="noreferrer" className="flex items-center justify-between border px-4 py-3 text-sm font-bold transition hover:border-primary">{t} <ArrowRight className="h-4 w-4 text-primary" /></a>
          ))}
        </div>
        <a href="https://moonasser.gumroad.com/" target="_blank" rel="noreferrer" className="mt-3 inline-block font-mono text-xs text-muted-foreground hover:text-primary">moonasser.gumroad.com →</a>
      </div>
      <p className="mt-16 font-mono text-[11px] text-muted-foreground">© 2026 Mohamed Nasser.</p>
    </section>
  );
}

function Index() {
  return (
    <main className="relative overflow-x-hidden opacity-0">
      <Nav />
      <Hero />
      <About />
      <Flagships />
      <Matrix />
      <Contact />
      <BuildTour />
    </main>
  );
}
