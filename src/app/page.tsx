'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal, useParallax } from '@/components/Reveal';
import { DossierStack } from '@/components/DossierStack';

import { StatutoryLookup } from '@/components/StatutoryLookup';
import { QuickBailAssessor } from '@/components/QuickBailAssessor';
import { useAuth } from '@/lib/authContext';

export default function HomePage() {
  const drift = useParallax(0.06);
  const { t, language } = useAuth();

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-accent/20">
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden px-6 pb-40 pt-24">
          <div className="mx-auto grid max-w-6xl items-end gap-20 lg:grid-cols-2">
            <div className="mb-10 space-y-12">
              <div className="space-y-6">
                <div className="inline-block border border-accent/40 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-accent">
                  {language === 'kn' ? 'ಶಾಸನಬದ್ಧ ನವೀಕರಣ BNSS 2023 / CrPC' : language === 'hi' ? 'वैधानिक अद्यतन BNSS 2023 / CrPC' : 'Statutory Update BNSS/2026'}
                </div>
                <h1 className="text-balance font-display text-6xl sm:text-7xl italic leading-[0.9] tracking-tighter md:text-8xl">
                  {language === 'kn' ? (
                    <>ವಿಳಂಬಿತ ನ್ಯಾಯವು ಸ್ವಾತಂತ್ರ್ಯದ <span className="text-accent">ನಿರಾಕರಣೆ</span>.</>
                  ) : language === 'hi' ? (
                    <>विलंबित न्याय स्वतंत्रता से <span className="text-accent">वंचित</span> करना है।</>
                  ) : (
                    <>Justice delayed is liberty <span className="text-accent">denied</span>.</>
                  )}
                </h1>
              </div>
              <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
                {t.tagline}
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
            <DossierStack drift={drift} />
          </div>
        </section>

        {/* Live IPC ↔ BNS Statutory Lookup */}
        <StatutoryLookup />

        {/* Procedural precision */}
        <section className="relative overflow-hidden bg-foreground py-32 text-background">
          <div
            className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center select-none font-display text-[10rem] md:text-[14rem] lg:text-[16rem] italic text-background/10 opacity-20 z-0 overflow-hidden"
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
                      '01',
                      'Statutory Thresholding',
                      'The system maps every offence against the BNSS schedule, automatically flagging cases where detention exceeds 50% of the maximum term.',
                    ],
                    [
                      '02',
                      'Automated Writ Drafting',
                      'Instant generation of standardised release applications, formatted for district court acceptance, reducing administrative friction by 80%.',
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
                    src="/assets/courtroom-pillar.jpg"
                    alt="Harsh side-lit concrete pillar inside a brutalist courtroom"
                    loading="lazy"
                    className="aspect-[4/5] w-full rounded-xl object-cover opacity-90 shadow-2xl"
                  />
                  <div className="absolute -bottom-6 -left-6 w-64 bg-accent p-8 text-accent-foreground shadow-2xl rounded-sm">
                    <div className="mb-2 font-display text-4xl italic">99.8%</div>
                    <div className="font-mono text-[9px] uppercase tracking-widest opacity-90 font-bold">
                      Code Compliance Accuracy
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Interactive Quick Statutory Bail Assessor */}
        <QuickBailAssessor />
      </main>
    </div>
  );
}
