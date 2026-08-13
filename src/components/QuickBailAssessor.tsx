'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Scale, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, FileSpreadsheet, Clock, UserCheck } from 'lucide-react';

interface PresetOffense {
  title: string;
  ipc: string;
  bns: string;
  maxYears: number;
  category: 'Bailable' | 'Non-Bailable';
}

const PRESET_OFFENSES: PresetOffense[] = [
  { title: 'Theft / House Breaking', ipc: 'Sec 379 / 454', bns: 'Sec 303 / 329 BNSS', maxYears: 3, category: 'Non-Bailable' },
  { title: 'Cheating & Dishonesty', ipc: 'Sec 420', bns: 'Sec 318 BNSS', maxYears: 7, category: 'Non-Bailable' },
  { title: 'Criminal Breach of Trust', ipc: 'Sec 406 / 409', bns: 'Sec 316 BNSS', maxYears: 7, category: 'Non-Bailable' },
  { title: 'Forgery of Security', ipc: 'Sec 467 / 468', bns: 'Sec 336 BNSS', maxYears: 10, category: 'Non-Bailable' },
  { title: 'Cyber Financial Fraud', ipc: 'Sec 419 / IT Act 66D', bns: 'Sec 319 BNSS', maxYears: 5, category: 'Non-Bailable' },
  { title: 'Voluntarily Causing Hurt', ipc: 'Sec 323 / 324', bns: 'Sec 115 BNSS', maxYears: 3, category: 'Bailable' },
];

export function QuickBailAssessor() {
  const [selectedOffense, setSelectedOffense] = useState<PresetOffense>(PRESET_OFFENSES[1]); // Cheating
  const [isFirstTime, setIsFirstTime] = useState<boolean>(true);
  const [monthsServed, setMonthsServed] = useState<number>(30); // 2.5 years

  // Calculation under BNSS 479:
  // First-time offender: 1/3 of max sentence
  // Other undertrial: 1/2 of max sentence
  const maxMonths = selectedOffense.maxYears * 12;
  const thresholdFraction = isFirstTime ? 1 / 3 : 1 / 2;
  const requiredMonths = Math.ceil(maxMonths * thresholdFraction);
  const isEligible = monthsServed >= requiredMonths;
  const percentageServed = Math.min(100, Math.round((monthsServed / maxMonths) * 100));
  const thresholdPercentage = Math.round(thresholdFraction * 100);

  const monthsRemaining = Math.max(0, requiredMonths - monthsServed);

  return (
    <section className="px-6 py-24 bg-card/40 border-y border-border/60">
      <div className="mx-auto max-w-6xl space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/80 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              <Scale className="w-3.5 h-3.5" />
              Interactive Statutory Reckoner
            </div>
            <h2 className="font-display text-4xl italic tracking-tight">
              Instant BNSS §479 Eligibility Assessor
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
              Test undertrial detention thresholds under Bharatiya Nagarik Suraksha Sanhita, 2023. Evaluate 1/3rd first-time offender relief vs 1/2 general sentence limits instantly.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Link
              href="/prisoner/wizard"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-accent-foreground font-semibold text-xs hover:opacity-90 transition-opacity shadow-lg"
            >
              Full Case Wizard
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Interactive Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6 bg-background p-6 md:p-8 rounded-2xl border border-border/80 shadow-md">
            
            {/* Step 1: Select Offense */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-bold flex items-center justify-between">
                <span>1. Select Charged Offence / Section</span>
                <span className="text-accent">{selectedOffense.category}</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PRESET_OFFENSES.map((offense) => (
                  <button
                    key={offense.title}
                    onClick={() => setSelectedOffense(offense)}
                    className={`p-3 rounded-xl text-left border text-xs transition-all ${
                      selectedOffense.title === offense.title
                        ? 'border-accent bg-accent/10 text-foreground shadow-sm font-semibold'
                        : 'border-border/60 bg-card hover:bg-muted/60 text-muted-foreground'
                    }`}
                  >
                    <div className="font-bold text-sm text-foreground mb-0.5">{offense.title}</div>
                    <div className="font-mono text-[11px] text-muted-foreground">
                      IPC {offense.ipc} • <span className="text-accent">{offense.bns}</span>
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-1">
                      Max Sentence: <strong className="text-foreground">{offense.maxYears} Years</strong> ({offense.maxYears * 12} Mo)
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Offender Category */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-bold block">
                2. Undertrial Conviction Record (BNSS Sec 479 Rule)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setIsFirstTime(true)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    isFirstTime
                      ? 'border-accent bg-accent/15 text-foreground ring-1 ring-accent'
                      : 'border-border/60 bg-card text-muted-foreground hover:bg-muted/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs uppercase tracking-wider text-accent">First-Time Offender</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent/20 text-accent font-bold">1/3rd Rule</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-snug">
                    Never previously convicted of any offence. Eligible after serving 33.3% of max sentence.
                  </p>
                </button>

                <button
                  onClick={() => setIsFirstTime(false)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    !isFirstTime
                      ? 'border-accent bg-accent/15 text-foreground ring-1 ring-accent'
                      : 'border-border/60 bg-card text-muted-foreground hover:bg-muted/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs uppercase tracking-wider text-foreground">Standard Undertrial</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground font-bold">1/2 Rule</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-snug">
                    Has prior record or multiple pending charges. Eligible after serving 50% of max sentence.
                  </p>
                </button>
              </div>
            </div>

            {/* Step 3: Months Served Slider */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center text-xs font-mono uppercase tracking-widest">
                <span className="text-muted-foreground font-bold">3. Actual Detention Duration Served</span>
                <span className="text-foreground font-bold text-sm bg-accent/10 px-3 py-1 rounded-lg border border-accent/20 text-accent">
                  {monthsServed} Months ({ (monthsServed / 12).toFixed(1) } Yrs)
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={maxMonths}
                value={monthsServed}
                onChange={(e) => setMonthsServed(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
              />
              <div className="flex justify-between text-[11px] font-mono text-muted-foreground">
                <span>0 Months</span>
                <span>BNSS Threshold: {requiredMonths} Months</span>
                <span>Max: {maxMonths} Months ({selectedOffense.maxYears} Yrs)</span>
              </div>
            </div>
          </div>

          {/* Results Outcome Column */}
          <div className="lg:col-span-5 space-y-6 bg-card border border-border/80 p-6 md:p-8 rounded-2xl shadow-xl">
            <div className="flex items-center justify-between border-b border-border/60 pb-4">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground font-bold">
                Computed Statutory Assessment
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-muted text-muted-foreground">
                BNSS §479 Schedule
              </span>
            </div>

            {/* Status Banner */}
            <div
              className={`p-5 rounded-2xl border space-y-3 transition-all ${
                isEligible
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
              }`}
            >
              <div className="flex items-start gap-3">
                {isEligible ? (
                  <CheckCircle2 className="w-6 h-6 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-6 h-6 shrink-0 mt-0.5" />
                )}
                <div>
                  <h3 className="font-bold text-base leading-snug">
                    {isEligible
                      ? 'ELIGIBLE FOR MANDATORY BAIL RELEASE'
                      : 'DETENTION BELOW STATUTORY THRESHOLD'}
                  </h3>
                  <p className="text-xs opacity-90 mt-1 leading-relaxed">
                    {isEligible
                      ? `Undertrial has completed ${monthsServed} months (${percentageServed}% of max sentence), satisfying the required ${thresholdPercentage}% threshold (${requiredMonths} months) under BNSS §479.`
                      : `Undertrial has served ${monthsServed} months out of the required ${requiredMonths} months (${thresholdPercentage}% statutory threshold).`}
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Progress Gauge */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-muted-foreground">Detention Progress</span>
                <span className="font-bold text-foreground">{percentageServed}% Served</span>
              </div>
              <div className="w-full bg-muted h-3 rounded-full overflow-hidden relative">
                {/* Benchmark Indicator */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-accent z-10"
                  style={{ left: `${thresholdPercentage}%` }}
                  title={`Statutory Threshold: ${thresholdPercentage}%`}
                />
                <div
                  className={`h-full transition-all duration-300 ${
                    isEligible ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                  style={{ width: `${percentageServed}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-muted-foreground pt-1">
                <span>Remand Start</span>
                <span className="text-accent font-bold">★ Threshold: {requiredMonths} Mo</span>
                <span>Max Sentence: {maxMonths} Mo</span>
              </div>
            </div>

            {/* Action Recommendations */}
            <div className="space-y-3 pt-2">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground font-bold block">
                Statutory Remedy & Action
              </span>

              {isEligible ? (
                <div className="p-4 rounded-xl bg-background border border-border space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                    <UserCheck className="w-4 h-4 text-emerald-400" />
                    <span>Mandatory Personal Bond Undertaking</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Jail Superintendent is required to transmit Form 479 Writ Application directly to the District Judge or DLSA for immediate release on personal recognizance.
                  </p>
                  <Link
                    href={`/lawyer/case/demo?offense=${selectedOffense.ipc}&months=${monthsServed}`}
                    className="mt-2 inline-flex items-center gap-2 w-full justify-center py-2.5 rounded-lg bg-accent text-accent-foreground text-xs font-bold hover:opacity-90 transition-opacity"
                  >
                    Draft BNSS Writ Application Now
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-background border border-border space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>{monthsRemaining} Months Until Statutory Threshold</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Undertrial will become eligible for mandatory bail under BNSS §479 on completing {requiredMonths} months of custody.
                  </p>
                  <Link
                    href="/prisoner/wizard"
                    className="mt-2 inline-flex items-center gap-2 w-full justify-center py-2.5 rounded-lg bg-card border border-border text-foreground hover:bg-muted text-xs font-bold transition-colors"
                  >
                    Explore Alternative Regular Bail Grounds
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* System Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="p-6 rounded-2xl bg-background border border-border/70 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-foreground">Automated BNSS §479 Writs</h3>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Instant auto-drafting of court-ready release petitions formatted for District Court Registries with zero manual paperwork.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-background border border-border/70 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-foreground">Judicial Remand Audit</h3>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Presiding Judges receive algorithmic alerts flagging undertrials whose custody exceeds statutory thresholds.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-background border border-border/70 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-foreground">DLSA Legal Aid Sync</h3>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Direct connection with District Legal Services Authorities to assign free defense counsel for unrepresented prisoners.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
