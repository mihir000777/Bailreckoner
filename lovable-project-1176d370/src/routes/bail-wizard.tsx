import { createFileRoute } from "@tanstack/react-router";
import { PortalHeader, PortalShell } from "@/components/SiteChrome";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/bail-wizard")({
  head: () => ({
    meta: [
      { title: "Bail Wizard — Section 436A Eligibility Engine | Bail Reckoner" },
      {
        name: "description",
        content:
          "Compute undertrial bail eligibility against BNSS schedules, detention thresholds and statutory timelines in seconds.",
      },
      { property: "og:title", content: "Bail Wizard — Eligibility Engine" },
      {
        property: "og:description",
        content: "Statutory bail computation for undertrials under BNSS and Section 436A.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BailWizardPage,
});

const steps = [
  {
    code: "01",
    title: "Offence Intake",
    body: "Enter the FIR sections. The engine resolves each charge against the BNSS schedule and its maximum prescribed term.",
  },
  {
    code: "02",
    title: "Detention Thresholding",
    body: "Days in custody are measured against the 50% ceiling of the maximum term, flagging automatic release entitlement.",
  },
  {
    code: "03",
    title: "Precedent Weighting",
    body: "Comparable district orders are surfaced alongside the computation so the recommendation is never a black box.",
  },
  {
    code: "04",
    title: "Application Draft",
    body: "A formatted release application is generated, ready for filing with the relevant magistrate's registry.",
  },
];

function BailWizardPage() {
  return (
    <PortalShell>
      <PortalHeader
        ref="Portal 01 / Core Engine"
        title={
          <>
            The Bail <span className="text-accent">Wizard</span>.
          </>
        }
        lede="Primary engine for calculating Section 436A eligibility under the Bharatiya Nagarik Suraksha Sanhita, with auditable reasoning at every step."
      />

      <section className="px-6 py-28">
        <div className="mx-auto grid max-w-6xl gap-20 lg:grid-cols-2">
          <div className="space-y-14">
            {steps.map((step, i) => (
              <Reveal key={step.code} delay={i * 90}>
                <div className="group border-l border-border pl-8">
                  <div className="mb-3 flex items-center gap-4">
                    <span className="flex size-8 items-center justify-center rounded-full border border-border font-mono text-[10px] transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
                      {step.code}
                    </span>
                    <h2 className="font-display text-2xl italic">{step.title}</h2>
                  </div>
                  <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="sticky top-28 border border-border bg-folder p-1 text-folder-foreground shadow-[0_30px_60px_oklch(0_0_0_/_0.18)]">
              <div className="border border-border p-8">
                <div className="mb-10 flex items-start justify-between">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
                    CASE_ANALYZER_V2
                  </span>
                  <span className="border border-accent px-2 py-0.5 font-mono text-[8px] uppercase text-accent">
                    Live
                  </span>
                </div>
                <div className="space-y-6">
                  {[
                    ["Offence Severity", "Non-Bailable"],
                    ["Maximum Term", "7 Years"],
                    ["Period in Detention", "142 Days"],
                    ["436A Threshold", "1,278 Days"],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-center justify-between border-b border-border pb-4"
                    >
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        {k}
                      </span>
                      <span className="font-display text-xl italic">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-10 bg-foreground p-6 text-background">
                  <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">
                    Reckoned Outcome
                  </div>
                  <div className="mt-3 font-display text-5xl italic">82% Release Likelihood</div>
                  <p className="mt-4 text-xs leading-relaxed opacity-60">
                    Discretionary bail under Section 480 BNSS is indicated. Draft application
                    prepared for the Sessions registry.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-foreground px-6 py-28 text-background">
        <div className="mx-auto grid max-w-6xl gap-px bg-background/10 sm:grid-cols-3">
          {[
            ["0.4s", "Median Computation"],
            ["99.8%", "Code Compliance"],
            ["42k", "Applications Drafted"],
          ].map(([n, l], i) => (
            <Reveal key={l} delay={i * 100}>
              <div className="h-full bg-foreground p-10">
                <div className="font-display text-5xl italic">{n}</div>
                <div className="mt-3 font-mono text-[10px] uppercase tracking-widest opacity-50">
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
