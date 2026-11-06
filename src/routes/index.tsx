import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Github, Linkedin, Mail, Copy, Check } from "lucide-react";
import portrait from "@/assets/portrait.jpg";
import { BuildTour } from "@/components/BuildTour";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mohamed — Portfolio" },
      { name: "description", content: "Portfolio of Mohamed: systems, products and engineering work." },
      { property: "og:title", content: "Mohamed — Portfolio" },
      { property: "og:description", content: "Systems, products and engineering work." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAME = "MOHAMED";
const EMAIL = "hello@mohamed.dev";

function Nav() {
  return (
    <nav className="fixed left-1/2 top-4 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border bg-card/80 px-2 py-1.5 backdrop-blur">
      <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">M</span>
      {["About", "Flagships", "Matrix", "Contact"].map((l) => (
        <a key={l} href={`#${l.toLowerCase()}`} className="rounded-full px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">{l}</a>
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
    <section className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-6 pt-24 lg:grid-cols-[1.3fr_1fr]">
      <div>
        <h1 data-build="H1 · Title" className="font-display text-outline text-[clamp(4rem,13vw,11rem)] leading-[0.85] tracking-tight">PORTFOLIO</h1>
        <p data-build="Script" className="mt-2 font-script text-4xl">Hello, I'm</p>
        <span data-build="Name Block" className="mt-1 inline-block bg-primary px-4 py-1 font-display text-5xl text-primary-foreground md:text-6xl">{NAME}.</span>
        <p data-build="Role Tag" className="mt-6 flex items-center gap-2 label-mono text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-primary" /> System Architect &amp; Product Engineer
        </p>
        <p data-build="Intro" className="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">
          Building <b className="text-foreground">reliable, always-on systems</b> and{" "}
          <b className="text-foreground">thoughtful products</b> from first principles — clean architecture, total ownership.
        </p>
        <div data-build="CTA Group" className="mt-8 flex flex-wrap gap-3">
          <a href="#contact" className="flex items-center gap-2 bg-primary px-5 py-3 label-mono text-primary-foreground transition hover:brightness-110">Initiate dispatch <ArrowRight className="h-3.5 w-3.5" /></a>
          <a href="#flagships" className="border px-5 py-3 label-mono transition hover:border-primary hover:text-primary">Explore architecture</a>
        </div>
        <div data-build="Stats" className="mt-12 flex gap-10">
          {[["48+", "Projects"], ["7-Layer", "Stack"], ["100%", "Ownership"]].map(([n, l]) => (
            <div key={l}><p className="font-display text-3xl text-primary">{n}</p><p className="label-mono text-muted-foreground">{l}</p></div>
          ))}
        </div>
      </div>
      <div data-build="Portrait" className="relative mx-auto w-full max-w-sm">
        <div className="absolute -inset-3 border border-primary/40" />
        <img src={portrait} alt={`Portrait of ${NAME}`} width={768} height={960} className="relative w-full" />
        <span className="absolute -bottom-3 left-4 bg-background px-2 py-1 label-mono text-primary">● Sovereign silicon active</span>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-6 py-28">
      <p className="mb-10 font-mono text-xs text-muted-foreground">// 01.00 SEC_ABOUT INDEX [01 / 05]</p>
      <Label>Engineer profile</Label>
      <h2 data-build="H2 · About" className="mt-2 text-4xl font-extrabold tracking-tight md:text-5xl">Background &amp; Philosophy</h2>
      <div className="mt-10 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
        <div data-build="Bio" className="space-y-5 border-l-2 border-primary pl-6 text-muted-foreground leading-relaxed">
          <p>I'm {NAME[0] + NAME.slice(1).toLowerCase()} — an independent system architect. My formal education began with a <b className="text-foreground">degree in Computer Science</b>, followed by intensive self-driven training in design and engineering.</p>
          <p>My defining capabilities were forged in the terminal — self-taught in machine learning, cloud architecture and product design. I view software not as framework assembly but as the orchestration of systems and incentives.</p>
          <blockquote className="text-lg font-semibold italic text-foreground">"I design and deploy systems that operate 24/7 — built from first principles, not frameworks."</blockquote>
        </div>
        <div data-build="Principles" className="space-y-6">
          {[["Sovereign Silicon", "Everything runs on hardware I control."], ["First-Principles Architecture", "Every layer understood, nothing borrowed blindly."], ["Automatic Verification", "Tests, monitoring and self-healing by default."]].map(([t, d]) => (
            <div key={t} className="border-b pb-4"><p className="font-bold">{t}</p><p className="text-sm text-muted-foreground">{d}</p></div>
          ))}
        </div>
      </div>
    </section>
  );
}

const LAYERS: [string, string, string][] = [
  ["L1: Core Engine", "Uncensored Base Foundation", "Local model inference running natively on a dedicated GPU workstation."],
  ["L2: Dynamic Tools", "Tool Orchestration", "Hundreds of custom tools exposed through a unified protocol."],
  ["L3: Voice Synthesis", "Voice Interface", "Real-time speech in and out with sub-second latency."],
  ["L4: Autonomous Loop", "Self-Directed Execution", "Plans, acts and reflects without supervision."],
  ["L5: 4-Tier Memory", "Persistent Memory", "Short, working, episodic and long-term memory tiers."],
  ["L6: Proactive Mirror", "Anticipation", "Surfaces what matters before you ask."],
  ["L7: Self-Evolution", "Continuous Improvement", "Rewrites and tests its own modules."],
];

function Flagships() {
  const [layer, setLayer] = useState(0);
  return (
    <section id="flagships" className="mx-auto max-w-7xl px-6 py-28">
      <Label>Architectural showcase</Label>
      <h2 data-build="H2 · Flagships" className="mt-2 text-4xl font-extrabold tracking-tight md:text-5xl">Flagship Deployments</h2>
      <p className="mt-3 max-w-xl text-muted-foreground">Production-grade systems running 24/7 across local silicon, blockchain mainnets and commercial endpoints.</p>

      <div data-build="Core Card" className="mt-10 border bg-card p-6 md:p-10">
        <span className="bg-primary/15 px-2 py-1 label-mono text-primary">● Core ecosystem</span>
        <h3 className="mt-4 text-2xl font-extrabold md:text-3xl">NOVA — 7-Layer Autonomous AI Ecosystem</h3>
        <p className="mt-3 max-w-3xl text-muted-foreground">A persistent, self-evolving intelligence operating 24/7 on local silicon. Engineered without external startup frameworks, with redundant memory and a continuous reflection loop.</p>
        <div className="mt-8 grid grid-cols-2 gap-px border bg-border md:grid-cols-4">
          {[["478", "Custom tools"], ["14", "Servers"], ["15k", "Lines / week"], ["Master", "Status"]].map(([n, l]) => (
            <div key={l} className="bg-card p-5"><p className="font-display text-3xl text-primary">{n}</p><p className="label-mono text-muted-foreground">{l}</p></div>
          ))}
        </div>
        <p className="mt-10 label-mono">7-Layer constitutional stack</p>
        <p className="text-xs text-muted-foreground">Click a layer to inspect implementation</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {LAYERS.map(([l], i) => (
            <button key={l} onClick={() => setLayer(i)} className={`px-3 py-1.5 font-mono text-[11px] transition ${i === layer ? "bg-primary text-primary-foreground" : "border text-muted-foreground hover:border-primary hover:text-foreground"}`}>{l}</button>
          ))}
        </div>
        <div key={layer} className="mt-5 animate-rise border-l-2 border-primary bg-background/50 p-5">
          <p className="label-mono text-primary">Layer 0{layer + 1} // {LAYERS[layer][0].split(": ")[1]}</p>
          <p className="mt-1 text-lg font-bold">{LAYERS[layer][1]}</p>
          <p className="text-sm text-muted-foreground">{LAYERS[layer][2]}</p>
        </div>
      </div>

      <div data-build="Project Grid" className="mt-6 grid gap-6 md:grid-cols-3">
        {[
          ["DeFi // High-frequency", "Flash Lab — Arbitrage & Liquidation Engine", ["Flash loan arbitrage", "Multi-DEX routing", "Async WebSocket engine"], "Solidity · Node"],
          ["Mobile // Commercial product", "Biller — Offline-First Invoicing", ["Offline SQLite sync", "Bluetooth thermal printing", "Tax-compliant invoices"], "Flutter"],
          ["Quant // Execution", "Quantitative Gold & Forex Engine", ["ML signal models", "Risk-aware sizing", "Live broker execution"], "Python"],
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

const MATRIX: [string, string, string][] = [
  ["Autonomous AI", "Multi-LLM Parliament Architecture", "Cognitive assembly of personality shards engaging in structured debate and voting."],
  ["Machine Learning", "Time Series Forecaster", "Production forecasting service with a live dashboard."],
  ["Deep Learning", "Dynamical Latent Field Model", "Experimental physics-inspired latent architecture."],
  ["Cryptography", "GPU-Accelerated Cryptographic Search", "Massively parallel search kernels on consumer GPUs."],
  ["Financial Architecture", "Hedge Fund Structure & Institutional Design", "End-to-end fund architecture, governance and compliance routing."],
  ["Autonomous AI", "Axiom of Truth Cognitive Framework", "Epistemological foundation against hallucination."],
];
function Matrix() {
  const cats = ["All", ...Array.from(new Set(MATRIX.map((m) => m[0])))];
  const [f, setF] = useState("All");
  return (
    <section id="matrix" className="mx-auto max-w-7xl px-6 py-28">
      <Label>Engineering index</Label>
      <h2 data-build="H2 · Matrix" className="mt-2 text-4xl font-extrabold tracking-tight md:text-5xl">The Systems Matrix</h2>
      <p className="mt-3 max-w-xl text-muted-foreground">Specialized architectures spanning multi-model AI, deep learning and GPU cryptography.</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {cats.map((c) => (
          <button key={c} onClick={() => setF(c)} className={`px-3 py-1.5 font-mono text-[11px] transition ${f === c ? "bg-primary text-primary-foreground" : "border text-muted-foreground hover:text-foreground"}`}>{c}</button>
        ))}
      </div>
      <div data-build="Matrix Grid" className="mt-8 grid gap-px border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {MATRIX.filter((m) => f === "All" || m[0] === f).map(([c, t, d], i) => (
          <article key={t} className="animate-rise bg-card p-6 transition hover:bg-accent">
            <div className="flex justify-between"><span className="label-mono text-primary">{c}</span><span className="font-mono text-[10px] text-muted-foreground">SYS-0{i + 1}</span></div>
            <h4 className="mt-3 font-extrabold">{t}</h4>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
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
      <h2 data-build="H2 · Contact" className="mt-3 text-4xl font-extrabold tracking-tight md:text-6xl">Let's Architect Something<br />Extraordinary.</h2>
      <p className="mx-auto mt-5 max-w-lg text-muted-foreground">Available for production system design, technical advisory and ambitious product builds worldwide.</p>
      <div data-build="Email" className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <span className="font-mono font-bold">{EMAIL}</span>
        <button onClick={() => { navigator.clipboard.writeText(EMAIL); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
          className="flex items-center gap-2 bg-primary px-4 py-2 label-mono text-primary-foreground">
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} {copied ? "Copied" : "Copy email address"}
        </button>
      </div>
      <div data-build="Socials" className="mt-8 flex flex-wrap justify-center gap-3">
        {[[Github, "github.com/mohamed"], [Linkedin, "linkedin.com/in/mohamed"], [Mail, EMAIL]].map(([I, l]) => {
          const Icon = I as typeof Github;
          return <a key={l as string} href="#" className="flex items-center gap-2 border px-3 py-2 text-xs text-muted-foreground transition hover:border-primary hover:text-foreground"><Icon className="h-3.5 w-3.5" />{l as string}</a>;
        })}
      </div>
      <p className="mt-16 font-mono text-[11px] text-muted-foreground">© 2026 {NAME}. Designed and engineered from first principles.</p>
    </section>
  );
}

function Index() {
  return (
    <main className="relative overflow-x-hidden">
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
