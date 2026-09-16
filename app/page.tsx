import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BellRing,
  Bot,
  Check,
  ChevronRight,
  CircleDot,
  ClipboardCheck,
  DatabaseZap,
  FileSearch,
  Layers3,
  Plane,
  RadioTower,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Waypoints,
  Zap,
} from "lucide-react";

const metrics = [
  { value: "92.4%", label: "live compliance score" },
  { value: "4.8x", label: "faster manual reviews" },
  { value: "17k", label: "rules mapped to policy" },
];

const process = [
  {
    icon: DatabaseZap,
    title: "Connect",
    body: "Pull manuals, HR policies, audit evidence, and operational procedures into one controlled workspace.",
  },
  {
    icon: ScanLine,
    title: "Analyze",
    body: "aeroAI cross-checks FAA, EASA, ICAO, and DOT changes against every clause and procedure.",
  },
  {
    icon: ClipboardCheck,
    title: "Act",
    body: "Draft fixes, assign owners, build evidence packs, and keep leadership ahead of exposure.",
  },
];

const capabilities = [
  {
    icon: RadioTower,
    title: "Regulatory Radar",
    body: "Continuously tracks rule changes and flags the procedures they touch.",
  },
  {
    icon: FileSearch,
    title: "Gap Analysis",
    body: "Compares manuals and contracts against aviation standards with source-backed findings.",
  },
  {
    icon: Bot,
    title: "aeroAI Assistant",
    body: "Answers operational questions using your documents, citations, and confidence scoring.",
  },
  {
    icon: Layers3,
    title: "Document Generator",
    body: "Creates policy updates, contract clauses, and audit-ready summaries in minutes.",
  },
  {
    icon: ShieldCheck,
    title: "Audit Readiness",
    body: "Turns weak signals into scored evidence workflows for upcoming reviews.",
  },
];

const useCases = [
  "Flight operations",
  "Maintenance",
  "Safety",
  "HR contracts",
];

const integrations = ["FAA", "EASA", "ICAO", "DOT", "SMS", "HRIS", "QMS", "PDF", "DOCX", "RAG"];

const pricing = [
  {
    name: "Launch",
    price: "$149",
    body: "For small operators building their first AI compliance cockpit.",
    features: ["5 document workspaces", "Regulatory intelligence feed", "Gap analysis exports"],
  },
  {
    name: "Command",
    price: "$399",
    body: "For teams that need live monitoring, drafting, and audit workflows.",
    features: ["Unlimited manuals", "aeroAI assistant", "Audit evidence packs", "Priority model routing"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    body: "For multi-base airlines and regulated aviation groups.",
    features: ["Dedicated environments", "Custom frameworks", "SSO and governance", "Implementation support"],
  },
];

const faqs = [
  {
    question: "Can aeroAI cite the source of a regulatory finding?",
    answer: "Yes. Findings are designed around traceability, with citations back to source documents and the internal policy section they affect.",
  },
  {
    question: "Does this replace compliance officers?",
    answer: "No. It handles the repetitive monitoring, mapping, and drafting work so specialists can review, approve, and lead the operational response.",
  },
  {
    question: "Can we start from our current manuals?",
    answer: "Yes. Upload existing manuals, contracts, policies, and reports, then use the workspace to classify, compare, and generate changes.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-aero-ink text-aero-paper">
      <section className="relative min-h-[92vh] border-b border-white/10">
        <div className="absolute inset-0 grainz-grid opacity-70" />
        <div className="absolute inset-0 grainz-scan" />
        <div className="relative mx-auto flex min-h-[92vh] w-full max-w-7xl flex-col px-5 sm:px-6 lg:px-8">
          <header className="flex h-20 items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.18)]">
                <Plane className="h-4 w-4 -rotate-45" />
              </span>
              <span className="text-sm font-semibold tracking-[0.22em] text-white">aeroAI</span>
            </Link>
            <nav className="hidden items-center gap-7 text-sm text-white/58 md:flex">
              <a href="#platform" className="transition hover:text-white">Platform</a>
              <a href="#workflow" className="transition hover:text-white">Workflow</a>
              <a href="#pricing" className="transition hover:text-white">Pricing</a>
            </nav>
            <Link
              href="/dashboard"
              className="inline-flex h-10 items-center gap-2 rounded-md border border-white/14 bg-white/8 px-4 text-sm font-medium text-white backdrop-blur transition hover:border-white/30 hover:bg-white hover:text-black"
            >
              Enter app
              <ChevronRight className="h-4 w-4" />
            </Link>
          </header>

          <div className="grid flex-1 items-center gap-10 pb-10 pt-8 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/70 backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-300 opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-300" />
                </span>
                Live aviation intelligence for FAA, EASA, ICAO, and DOT
              </div>
              <h1 className="max-w-4xl text-4xl font-black leading-[0.98] tracking-normal text-white sm:text-5xl lg:text-7xl">
                aeroAI Aviation Compliance Workflow.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/62 sm:text-lg">
                aeroAI turns aviation manuals, contracts, regulations, and audit evidence into a continuously monitored command layer. Detect gaps, draft fixes, and defend every decision with source-backed intelligence.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/dashboard"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-white px-5 text-sm font-bold text-black transition hover:bg-lime-200"
                >
                  Launch cockpit
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#platform"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/14 bg-white/[0.03] px-5 text-sm font-semibold text-white transition hover:border-white/28 hover:bg-white/10"
                >
                  View system
                  <CircleDot className="h-4 w-4" />
                </a>
              </div>
              <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
                {metrics.map((metric) => (
                  <div key={metric.label} className="border-l border-white/12 pl-4">
                    <p className="text-2xl font-black text-white">{metric.value}</p>
                    <p className="mt-1 text-xs leading-4 text-white/48">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[520px] lg:min-h-[620px]">
              <div className="stipple-sphere absolute left-1/2 top-6 h-[330px] w-[330px] -translate-x-1/2 rounded-full sm:h-[440px] sm:w-[440px]" />
              <div className="absolute left-1/2 top-20 h-[360px] w-[360px] -translate-x-1/2 rounded-full border border-white/10 sm:h-[500px] sm:w-[500px]" />
              <div className="absolute right-0 top-24 w-[88%] rounded-lg border border-white/12 bg-black/62 p-3 shadow-[0_30px_120px_rgba(0,0,0,0.7)] backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-white/10 px-2 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-lime-300" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">aeroAI command</span>
                </div>
                <div className="grid gap-3 pt-4 md:grid-cols-[1.15fr_0.85fr]">
                  <div className="rounded-md border border-white/10 bg-white/[0.035] p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-xs font-semibold text-white/50">Compliance score</span>
                      <span className="rounded-full bg-lime-300 px-2 py-1 text-[10px] font-bold text-black">+7.2%</span>
                    </div>
                    <div className="relative mx-auto flex h-48 w-48 items-center justify-center rounded-full border border-white/10 bg-[conic-gradient(from_140deg,#bef264_0_78%,rgba(255,255,255,0.08)_78%)]">
                      <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full bg-black text-center">
                        <span className="text-5xl font-black">92</span>
                        <span className="text-xs text-white/45">audit ready</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {["FAR Part 117", "14 CFR 145.163", "DOT oral fluid"].map((item, index) => (
                      <div key={item} className="rounded-md border border-white/10 bg-white/[0.035] p-3">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-xs font-semibold text-white">{item}</span>
                          <span className={index === 0 ? "text-[10px] text-red-300" : "text-[10px] text-amber-200"}>{index === 0 ? "critical" : "high"}</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                          <div className="h-full rounded-full bg-white" style={{ width: `${82 - index * 18}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute bottom-8 left-0 w-[70%] rounded-lg border border-white/12 bg-white p-4 text-black shadow-[0_25px_80px_rgba(0,0,0,0.45)]">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-black text-white">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-black">Draft fix generated</p>
                    <p className="mt-1 text-xs leading-5 text-black/55">Crew-rest policy revision mapped to FAA source language and internal SOP section 8.4.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="platform" className="relative border-b border-white/10 bg-[#050505] py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-lime-200">Product reveal</p>
              <h2 className="mt-4 text-4xl font-black leading-tight text-white sm:text-5xl">One operating layer for every compliance signal.</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-white/56 lg:ml-auto">
              Inspired by Grainz&apos;s serious black-and-white SaaS rhythm, this interface keeps the story buyer-focused: expose risk, prove the system, then make the next action obvious.
            </p>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-5">
            {capabilities.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className={index === 0 ? "lg:col-span-2 rounded-lg border border-white/12 bg-white text-black p-6" : "rounded-lg border border-white/10 bg-white/[0.035] p-6"}>
                  <Icon className={index === 0 ? "h-6 w-6 text-black" : "h-6 w-6 text-lime-200"} />
                  <h3 className={index === 0 ? "mt-8 text-2xl font-black text-black" : "mt-8 text-lg font-black text-white"}>{item.title}</h3>
                  <p className={index === 0 ? "mt-3 text-sm leading-6 text-black/60" : "mt-3 text-sm leading-6 text-white/52"}>{item.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="workflow" className="border-b border-white/10 bg-aero-ink py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/40">Workflow</p>
            <h2 className="mt-4 text-4xl font-black text-white sm:text-5xl">Connect. Analyze. Act.</h2>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {process.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="relative rounded-lg border border-white/10 bg-white/[0.035] p-6">
                  <span className="absolute right-5 top-5 font-mono text-xs text-white/25">0{index + 1}</span>
                  <Icon className="h-7 w-7 text-white" />
                  <h3 className="mt-10 text-2xl font-black text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/52">{step.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#050505] py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-lime-200">Use cases</p>
            <h2 className="mt-4 text-4xl font-black text-white sm:text-5xl">Built for teams that cannot afford vague AI.</h2>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {useCases.map((useCase, index) => (
                <div key={useCase} className={index === 0 ? "rounded-md bg-white px-4 py-3 text-sm font-bold text-black" : "rounded-md border border-white/10 px-4 py-3 text-sm font-bold text-white/58"}>
                  {useCase}
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-md border border-white/10 bg-black p-5">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <BellRing className="h-4 w-4 text-lime-200" />
                New FAA duty-rest change detected
              </div>
              <p className="mt-3 text-sm leading-6 text-white/55">
                aeroAI identifies affected crew scheduling procedures, drafts a redline-ready policy update, and queues evidence for safety leadership review.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-14 overflow-hidden border-y border-white/10 py-4">
          <div className="logo-marquee flex gap-3 whitespace-nowrap">
            {[...integrations, ...integrations].map((item, index) => (
              <span key={`${item}-${index}`} className="rounded-full border border-white/10 bg-white/[0.035] px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white/45">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="border-b border-white/10 bg-aero-ink py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/40">Pricing</p>
              <h2 className="mt-4 text-4xl font-black text-white sm:text-5xl">Start with the surface area you need.</h2>
            </div>
            <div className="inline-flex w-fit rounded-md border border-white/10 bg-white/[0.035] p-1 text-xs font-bold">
              <span className="rounded bg-white px-3 py-2 text-black">Monthly</span>
              <span className="px-3 py-2 text-white/45">Annual</span>
            </div>
          </div>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {pricing.map((plan) => (
              <div key={plan.name} className={plan.popular ? "relative rounded-lg border border-white bg-white p-6 text-black" : "rounded-lg border border-white/10 bg-white/[0.035] p-6 text-white"}>
                {plan.popular && <span className="absolute right-5 top-5 rounded-full bg-black px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">Most popular</span>}
                <h3 className="text-xl font-black">{plan.name}</h3>
                <p className={plan.popular ? "mt-3 text-sm leading-6 text-black/60" : "mt-3 text-sm leading-6 text-white/52"}>{plan.body}</p>
                <div className="mt-8 flex items-end gap-2">
                  <span className="text-4xl font-black">{plan.price}</span>
                  {plan.price.startsWith("$") && <span className={plan.popular ? "pb-1 text-sm text-black/45" : "pb-1 text-sm text-white/40"}>/mo</span>}
                </div>
                <div className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm">
                      <Check className={plan.popular ? "h-4 w-4 text-black" : "h-4 w-4 text-lime-200"} />
                      <span className={plan.popular ? "text-black/70" : "text-white/60"}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#050505] py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-lime-200">FAQ</p>
            <h2 className="mt-4 text-4xl font-black text-white">Last-mile questions, answered.</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-lg border border-white/10 bg-white/[0.035] p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-white">
                  {faq.question}
                  <Zap className="h-4 w-4 shrink-0 text-white/35 transition group-open:rotate-45" />
                </summary>
                <p className="mt-4 text-sm leading-6 text-white/52">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white p-8 text-black sm:p-10">
            <Waypoints className="absolute right-8 top-8 h-16 w-16 text-black/10" />
            <BadgeCheck className="mb-8 h-8 w-8" />
            <h2 className="max-w-3xl text-4xl font-black leading-tight sm:text-6xl">Give your compliance team an AI command layer that proves its work.</h2>
            <Link href="/dashboard" className="mt-8 inline-flex h-12 items-center gap-2 rounded-md bg-black px-5 text-sm font-bold text-white transition hover:bg-lime-700">
              Open aeroAI
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
