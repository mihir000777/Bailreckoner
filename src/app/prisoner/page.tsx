'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

export default function PrisonerPortalPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-accent/20">
      {/* Portal Header */}
      <header className="border-b border-border px-6 pb-20 pt-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 inline-block border border-accent/40 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-accent">
            Portal 01 / Prisoner Self-Service
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <h1 className="max-w-4xl text-balance font-display text-6xl italic leading-[0.9] tracking-tighter md:text-8xl">
                Know your <span className="text-accent">liberty</span> rights.
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Evaluate custody time served, calculate Section 479 mandatory bail eligibility under the BNSS 2023, and generate a pre-filled court application.
              </p>
            </div>

            <Link
              href="/prisoner/wizard"
              className="inline-flex items-center gap-2 bg-foreground px-6 py-3 font-mono text-xs uppercase tracking-widest text-background transition-colors hover:bg-accent hover:text-accent-foreground font-bold self-start sm:self-auto"
            >
              <span>Launch Bail Wizard</span>
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* 3 Step Process Grid */}
      <section className="px-6 py-24 max-w-6xl mx-auto space-y-16">
        <Reveal>
          <div className="border-b border-border pb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-accent font-bold">
            03 Step Computational Workflow
          </div>
        </Reveal>

        <div className="grid gap-px border border-border bg-border md:grid-cols-3">
          {[
            [
              '01',
              'FIR & Custody Intake',
              'Input basic FIR details, police station, arrest date, and whether the undertrial is a first-time offender.',
            ],
            [
              '02',
              'Statutory Threshold Math',
              'The engine measures custody served against 1/3rd (first-time offender) or 50% statutory ceilings under Section 479.',
            ],
            [
              '03',
              'Generate Release Petition',
              'Export a pre-filled formal court bail application ready for submission through DLSA or private advocate counsel.',
            ],
          ].map(([n, t, b], i) => (
            <Reveal key={n} delay={i * 100}>
              <div className="group h-full bg-background p-10 transition-colors hover:bg-accent-soft">
                <div className="mb-8 flex size-12 items-center justify-center rounded-full border border-border font-display text-xl italic transition-colors group-hover:border-accent group-hover:text-accent font-bold">
                  {n}
                </div>
                <h3 className="mb-4 font-display text-2xl italic">{t}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground font-sans">{b}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="text-center pt-8">
          <Link
            href="/prisoner/wizard"
            className="inline-flex items-center gap-3 bg-foreground px-8 py-4 font-mono text-xs uppercase tracking-widest text-background transition-colors hover:bg-accent hover:text-accent-foreground font-bold shadow-lg"
          >
            <span>Begin Section 479 Eligibility Calculator →</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
