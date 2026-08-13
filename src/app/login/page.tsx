'use client';

import React from 'react';
import Link from 'next/link';
import { Scale, ShieldCheck, ArrowRight, UserCheck, Lock, Landmark, FileText } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

export default function UnifiedLoginPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-accent/20 flex flex-col justify-between">
      <main className="px-6 py-20">
        <div className="mx-auto max-w-4xl space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-block border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.25em] text-accent font-bold">
              Government of India • e-Courts &amp; NALSA Authentication Gateway
            </div>
            <h1 className="font-display text-5xl sm:text-6xl italic leading-tight tracking-tight text-foreground">
              Official Portal <span className="text-accent">Login</span>.
            </h1>
            <p className="max-w-xl mx-auto text-muted-foreground text-sm font-sans leading-relaxed">
              Secure single sign-on access for empaneled Legal Aid Advocates and Judicial Officers (Magistrates &amp; District Judges).
            </p>
          </div>

          {/* Portal Selector Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Lawyer Login Card */}
            <Reveal>
              <Link
                href="/login/lawyer"
                className="group block border border-border bg-folder p-8 rounded-sm hover:border-accent transition-all shadow-lg hover:shadow-xl space-y-6"
              >
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div className="size-12 border border-accent/40 flex items-center justify-center text-accent bg-accent/5">
                    <Scale className="size-6" />
                  </div>
                  <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-accent border border-accent/30 px-2 py-0.5 rounded">
                    PORTAL 02
                  </span>
                </div>

                <div className="space-y-2">
                  <h2 className="font-display text-3xl italic text-foreground group-hover:text-accent transition-colors">
                    Advocate &amp; DLSA Panel Login
                  </h2>
                  <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                    For empanelled Legal Aid defense advocates, DLSA coordinators, and Bar Association members to manage clients and draft BNSS 479 bail applications.
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between font-mono text-xs text-accent font-bold uppercase tracking-widest">
                  <span>Enter Advocate Portal</span>
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </Reveal>

            {/* Judge Login Card */}
            <Reveal delay={100}>
              <Link
                href="/login/judge"
                className="group block border border-border bg-folder p-8 rounded-sm hover:border-emerald-500/50 transition-all shadow-lg hover:shadow-xl space-y-6"
              >
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div className="size-12 border border-emerald-500/40 flex items-center justify-center text-emerald-400 bg-emerald-500/5">
                    <Landmark className="size-6" />
                  </div>
                  <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
                    PORTAL 03
                  </span>
                </div>

                <div className="space-y-2">
                  <h2 className="font-display text-3xl italic text-foreground group-hover:text-emerald-400 transition-colors">
                    Judicial Officer SSO Login
                  </h2>
                  <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                    For Chief Judicial Magistrates and District Judges to review BNSS 479 auto-flagged undertrials, perform batch screening, and digitally sign bail orders.
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between font-mono text-xs text-emerald-400 font-bold uppercase tracking-widest">
                  <span>Enter Judicial Bench</span>
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </Reveal>
          </div>

          {/* Public Prisoner Note */}
          <div className="text-center font-mono text-xs text-muted-foreground border-t border-border pt-6">
            Looking for public undertrial eligibility calculation?{' '}
            <Link href="/prisoner/wizard" className="text-accent underline font-bold">
              Access Public Bail Wizard (No Login Required) →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
