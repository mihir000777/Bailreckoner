import { createFileRoute } from "@tanstack/react-router";
import { PortalHeader, PortalShell } from "@/components/SiteChrome";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/legal-aid")({
  head: () => ({
    meta: [
      { title: "Legal Aid Lawyer Portal — Defense Counsel Network | Bail Reckoner" },
      {
        name: "description",
        content:
          "Match eligible undertrials with pro-bono advocates, sync case documents and track cause-list hearings in one defense workspace.",
      },
      { property: "og:title", content: "Legal Aid Lawyer Portal" },
      {
        property: "og:description",
        content: "Defense counsel workspace: assignment, document vault and hearing alerts.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LegalAidPage,
});

const services = [
  {
    code: "01",
    title: "Instant Assignment",
    body: "Automated matching on jurisdiction, offence category and language preference — counsel is allotted within the same working day.",
  },
  {
    code: "02",
    title: "Document Vault",
    body: "Encrypted store for FIRs, charge sheets, remand orders and previous applications, indexed by case number.",
  },
  {
    code: "03",
    title: "Hearing Alerts",
    body: "Cause-list changes push to SMS and WhatsApp so no undertrial loses a date to an unnoticed listing.",
  },
];

const roster = [
  ["4,512", "Empanelled Advocates"],
  ["28", "States & UTs"],
  ["11", "Filing Languages"],
  ["6.2h", "Median Allotment"],
];

function LegalAidPage() {
  return (
    <PortalShell>
      <PortalHeader
        ref="Portal 02 / Defense Aid"
        title={
          <>
            Counsel, <span className="text-accent">allotted</span> in hours.
          </>
        }
        lede="A working surface for legal aid advocates: assignment, evidence, drafting and listings held in one continuous case file."
      />

      <section className="px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-px border border-border bg-border md:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.code} delay={i * 110}>
                <div className="group h-full bg-background p-10 transition-colors hover:bg-accent-soft">
                  <div className="mb-8 flex size-12 items-center justify-center rounded-full border border-border font-display text-xl italic transition-colors group-hover:border-accent group-hover:text-accent">
                    {s.code}
                  </div>
                  <h2 className="mb-4 font-display text-2xl italic">{s.title}</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-folder px-6 py-28 text-folder-foreground">
        <div className="mx-auto grid max-w-6xl gap-20 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent">
                Roster Status
              </span>
              <h2 className="mt-6 font-display text-5xl italic leading-tight">
                A defense bench <br /> that answers back.
              </h2>
              <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground">
                Every allotment is logged, auditable and reversible. Undertrials can see who
                represents them and when the next hearing falls.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-px bg-border">
            {roster.map(([n, l], i) => (
              <Reveal key={l} delay={i * 80}>
                <div className="h-full bg-folder p-10">
                  <div className="font-display text-5xl italic">{n}</div>
                  <div className="mt-3 h-1 w-12 bg-accent" />
                  <div className="mt-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {l}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex items-end justify-between border-b border-border pb-8">
            <h2 className="font-display text-3xl italic">Active Docket</h2>
            <span className="pb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Sample data / Illustrative
            </span>
          </div>
          <ul className="divide-y divide-border">
            {[
              ["CR/2418/2026", "Sessions Court, Pune", "Charge sheet filed", "14 Aug"],
              ["CR/1190/2025", "District Court, Ranchi", "436A review listed", "18 Aug"],
              ["CR/0873/2026", "Magistrate, Nagpur", "Awaiting surety", "21 Aug"],
              ["CR/3341/2025", "Sessions Court, Kochi", "Bail granted", "Closed"],
            ].map(([id, court, status, date], i) => (
              <Reveal as="li" key={id} delay={i * 70}>
                <div className="grid grid-cols-2 gap-4 py-6 md:grid-cols-4">
                  <span className="font-mono text-xs tracking-widest text-accent">{id}</span>
                  <span className="text-sm">{court}</span>
                  <span className="text-sm text-muted-foreground">{status}</span>
                  <span className="text-right font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {date}
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </PortalShell>
  );
}
