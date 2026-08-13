import { createFileRoute } from "@tanstack/react-router";
import { PortalHeader, PortalShell } from "@/components/SiteChrome";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/judge-authority")({
  head: () => ({
    meta: [
      { title: "Judge Authority — Remand Audit & Bench Analytics | Bail Reckoner" },
      {
        name: "description",
        content:
          "Bench-side oversight of remand orders, statutory timelines and district-level undertrial analytics with full audit trails.",
      },
      { property: "og:title", content: "Judge Authority — Bench Oversight" },
      {
        property: "og:description",
        content: "Remand audit, statutory timelines and district undertrial analytics.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: JudgeAuthorityPage,
});

const districts = [
  ["Pune", 312, 78],
  ["Ranchi", 244, 61],
  ["Nagpur", 198, 52],
  ["Kochi", 141, 88],
  ["Guwahati", 126, 44],
  ["Jaipur", 289, 69],
];

function JudgeAuthorityPage() {
  return (
    <PortalShell>
      <PortalHeader
        ref="Portal 03 / Judicial Oversight"
        title={
          <>
            The bench, <span className="text-accent">audited</span>.
          </>
        }
        lede="Automated review of magistrate orders against statutory timelines, with district analytics that make undertrial backlog visible at a glance."
      />

      <section className="px-6 py-28">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <div className="border border-border">
              <div className="flex items-center justify-between border-b border-border px-8 py-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  District Backlog Index
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
                  Live / 24ms
                </span>
              </div>
              <div className="divide-y divide-border">
                {districts.map(([name, count, pct], i) => (
                  <Reveal key={String(name)} delay={i * 60}>
                    <div className="flex items-center gap-6 px-8 py-6">
                      <span className="w-28 font-display text-xl italic">{name}</span>
                      <div className="h-1 flex-1 bg-border">
                        <div
                          className="h-1 bg-accent transition-[width] duration-1000 ease-out"
                          style={{ width: `${pct as number}%` }}
                        />
                      </div>
                      <span className="w-16 text-right font-mono text-xs text-muted-foreground">
                        {count}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="space-y-8">
            {[
              [
                "Timeline Breach Alerts",
                "Any remand extended past its statutory ceiling raises a bench notice before the next listing.",
              ],
              [
                "Order Consistency",
                "Comparable orders across the district are surfaced so discretion is exercised on a visible baseline.",
              ],
              [
                "Immutable Audit Log",
                "Every computation, override and note is written to an append-only register open to review.",
              ],
            ].map(([t, b], i) => (
              <Reveal key={t} delay={i * 100}>
                <div className="border-l border-accent bg-accent-soft p-8">
                  <h2 className="mb-3 font-display text-2xl italic">{t}</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-foreground px-6 py-32 text-background">
        <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none font-display text-[22rem] italic text-background/[0.03]">
          BENCH
        </div>
        <div className="relative mx-auto grid max-w-6xl gap-px bg-background/10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["114", "Districts Synced"],
            ["32%", "Undertrial Reduction"],
            ["14k", "Orders Reviewed"],
            ["22 Days", "Avg. Time Saved"],
          ].map(([n, l], i) => (
            <Reveal key={l} delay={i * 90}>
              <div className="h-full bg-foreground p-10">
                <div className="font-display text-4xl italic">{n}</div>
                <div className="mt-3 h-1 w-12 bg-accent" />
                <div className="mt-4 font-mono text-[10px] uppercase tracking-widest opacity-50">
                  {l}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </PortalShell>
  );
}
