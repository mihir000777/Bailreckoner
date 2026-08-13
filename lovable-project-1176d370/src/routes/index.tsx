import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";
import { Reveal, useParallax } from "@/components/Reveal";
import pillarImg from "@/assets/courtroom-pillar.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bail Reckoner — Statutory Bail Computation for Indian Courts" },
      {
        name: "description",
        content:
          "A computational framework for bail eligibility, legal aid allotment and remand audit under the BNSS. Three portals, one case file.",
      },
      { property: "og:title", content: "Bail Reckoner — Justice delayed is liberty denied" },
      {
        property: "og:description",
        content:
          "Bail Wizard, Legal Aid Lawyer and Judge Authority portals for statutory bail computation in India.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const drift = useParallax(0.06);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-accent/20">
      <SiteNav />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden px-6 pb-40 pt-24">
          <div className="mx-auto grid max-w-6xl items-end gap-20 lg:grid-cols-2">
            <div className="mb-10 space-y-12">
              <div className="space-y-6">
                <div className="inline-block border border-accent/40 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-accent">
                  Statutory Update BNSS/2026
                </div>
                <h1 className="text-balance font-display text-7xl italic leading-[0.9] tracking-tighter md:text-8xl">
                  Justice delayed is liberty <span className="text-accent">denied</span>.
                </h1>
              </div>
              <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
                A computational framework for judicial officers to navigate the complexities of bail
                eligibility and undertrial detention mandates.
              </p>
              <div className="flex gap-4">
                <div className="flex size-12 animate-bounce items-center justify-center rounded-full border border-border">
                  <span className="text-xs text-muted-foreground">↓</span>
                </div>
                <span className="self-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Scroll to review dockets
                </span>
              </div>
            </div>

            {/* Dossier stack — three portals */}
            <div
              className="dossier-group relative h-[520px] cursor-pointer"
              style={{ transform: `translateY(${-drift}px)` }}
            >
              {/* Judge Authority (bottom) */}
              <Link
                to="/judge-authority"
                className="dossier-card animate-dossier absolute inset-x-0 bottom-0 mx-auto aspect-3/4 w-full max-w-sm border border-border bg-folder p-8 text-folder-foreground shadow-[0_10px_30px_oklch(0_0_0_/_0.12)] [--rotation:4deg] [animation-delay:400ms]"
              >
                <div className="absolute -top-6 left-0 flex h-6 w-24 items-center justify-center rounded-t-lg border-x border-t border-border bg-folder font-mono text-[9px] uppercase tracking-widest">
                  Bench.03
                </div>
                <div className="flex h-full flex-col justify-between border border-border p-6">
                  <div>
                    <div className="mb-8 font-mono text-[10px] text-muted-foreground">
                      REF: JUDICIAL_OVERSIGHT
                    </div>
                    <h2 className="mb-4 font-display text-3xl italic">Judge Authority</h2>
                    <p className="text-sm leading-snug text-muted-foreground">
                      Automated review of magistrate orders against statutory timelines.
                    </p>
                  </div>
                  <div className="font-mono text-[10px]">STAMP: 26/Q3_VERIFIED</div>
                </div>
              </Link>

              {/* Legal Aid Lawyer (middle) */}
              <Link
                to="/legal-aid"
                className="dossier-card animate-dossier absolute inset-x-0 bottom-4 z-10 mx-auto aspect-3/4 w-full max-w-sm border border-border bg-folder p-8 text-folder-foreground shadow-[0_20px_40px_oklch(0_0_0_/_0.16)] [--rotation:-2deg] [animation-delay:200ms]"
              >
                <div className="absolute -top-6 left-28 flex h-6 w-24 items-center justify-center rounded-t-lg border-x border-t border-border bg-folder font-mono text-[9px] uppercase tracking-widest">
                  Aid.02
                </div>
                <div className="flex h-full flex-col justify-between border border-border p-6">
                  <div>
                    <div className="mb-8 font-mono text-[10px] text-muted-foreground">
                      REF: DEFENSE_AID
                    </div>
                    <h2 className="mb-4 font-display text-3xl italic">Legal Aid Lawyer</h2>
                    <p className="text-sm leading-snug text-muted-foreground">
                      Connecting eligible undertrials to public defense councils immediately.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <div className="size-2 rounded-full bg-accent" />
                    <div className="size-2 rounded-full bg-border" />
                    <div className="size-2 rounded-full bg-border" />
                  </div>
                </div>
              </Link>

              {/* Bail Wizard (top) */}
              <Link
                to="/bail-wizard"
                className="dossier-card animate-dossier absolute inset-x-0 bottom-8 z-20 mx-auto aspect-3/4 w-full max-w-sm bg-foreground p-8 text-background shadow-[0_30px_60px_oklch(0_0_0_/_0.3)] [--rotation:1deg]"
              >
                <div className="absolute -top-6 right-0 flex h-6 w-24 items-center justify-center rounded-t-lg border-x border-t border-background/10 bg-foreground font-mono text-[9px] uppercase tracking-widest text-background/60">
                  Core.01
                </div>
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <div className="mb-10 flex items-start justify-between">
                      <span className="font-mono text-[10px] tracking-[0.2em] text-background/40">
                        CASE_ANALYZER_V2
                      </span>
                      <span className="border border-accent px-2 py-0.5 font-mono text-[8px] uppercase text-accent">
                        Urgent
                      </span>
                    </div>
                    <h2 className="mb-6 font-display text-4xl italic">Bail Eligibility Reckoner</h2>
                    <p className="text-sm leading-relaxed text-background/60">
                      Primary engine for calculating Section 436A eligibility under the new
                      Bharatiya Nagarik Suraksha Sanhita.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="h-px w-full bg-background/10" />
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] uppercase text-accent">
                        Deploy Logic
                      </span>
                      <ArrowUpRight className="size-5" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Procedural precision */}
        <section className="relative overflow-hidden bg-foreground py-32 text-background">
          <div
            className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none font-display text-[24rem] italic text-background/[0.03]"
            style={{ transform: `translate3d(${-drift * 2}px, -50%, 0)` }}
          >
            PROCEDURE
          </div>

          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <div className="grid items-start gap-24 md:grid-cols-2">
              <div className="space-y-16">
                <Reveal className="space-y-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent">
                    Technical Specifications
                  </span>
                  <h2 className="font-display text-5xl italic leading-tight">
                    Algorithmic <br />
                    Due Process
                  </h2>
                </Reveal>

                <div className="grid gap-12">
                  {[
                    [
                      "01",
                      "Statutory Thresholding",
                      "The system maps every offence against the BNSS schedule, automatically flagging cases where detention exceeds 50% of the maximum term.",
                    ],
                    [
                      "02",
                      "Automated Writ Drafting",
                      "Instant generation of standardised release applications, formatted for district court acceptance, reducing administrative friction by 80%.",
                    ],
                  ].map(([n, t, b], i) => (
                    <Reveal key={n} delay={i * 120}>
                      <div className="group">
                        <div className="mb-4 flex items-center gap-4">
                          <span className="flex size-8 items-center justify-center rounded-full border border-background/20 font-mono text-[10px] transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
                            {n}
                          </span>
                          <h3 className="font-display text-xl italic">{t}</h3>
                        </div>
                        <p className="pl-12 text-sm leading-relaxed text-background/50">{b}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>

              <Reveal delay={100}>
                <div className="relative rounded-2xl border border-background/10 bg-background/5 p-1">
                  <img
                    src={pillarImg}
                    alt="Harsh side-lit concrete pillar inside a brutalist courtroom"
                    loading="lazy"
                    className="aspect-4/5 w-full rounded-xl object-cover opacity-80"
                  />
                  <div className="absolute -bottom-6 -left-6 w-64 bg-accent p-8 text-accent-foreground shadow-2xl">
                    <div className="mb-2 font-display text-4xl italic">99.8%</div>
                    <div className="font-mono text-[9px] uppercase tracking-widest opacity-80">
                      Code Compliance Accuracy
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Deployment metrics */}
        <section className="px-6 py-32">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <div className="mb-16 flex items-end justify-between border-b border-border pb-8">
                <h2 className="font-display text-3xl italic">Deployment Metrics</h2>
                <span className="pb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Live Updates / 24ms
                </span>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 gap-px border border-border bg-border lg:grid-cols-4">
              {[
                ["Districts", "114"],
                ["Appointed Aid", "42k"],
                ["Review Speed", "0.4s"],
                ["Success Rate", "89%"],
              ].map(([l, n], i) => (
                <Reveal key={l} delay={i * 80}>
                  <div className="h-full space-y-4 bg-background p-10 transition-colors hover:bg-accent-soft">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {l}
                    </span>
                    <div className="font-display text-5xl italic">{n}</div>
                    <div className="h-1 w-12 bg-accent" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
