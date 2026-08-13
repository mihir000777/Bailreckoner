'use client';

import React, { useState, useEffect } from 'react';
import { Clock, CalendarCheck } from 'lucide-react';

interface EligibilityCountdownProps {
  oneThirdEligibilityDate: string;
  halfTimeEligibilityDate: string;
  isFirstTimeOffender: boolean;
  daysServed: number;
  oneThirdThresholdYears: number;
  halfTimeThresholdYears: number;
}

function daysUntil(dateStr: string): number {
  // dateStr is formatted like "15 Jan 2026" from the engine
  const target = new Date(dateStr);
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export const EligibilityCountdown: React.FC<EligibilityCountdownProps> = ({
  oneThirdEligibilityDate,
  halfTimeEligibilityDate,
  isFirstTimeOffender,
  daysServed,
  oneThirdThresholdYears,
  halfTimeThresholdYears,
}) => {
  const targetDate = isFirstTimeOffender ? oneThirdEligibilityDate : halfTimeEligibilityDate;
  const targetYears = isFirstTimeOffender ? oneThirdThresholdYears : halfTimeThresholdYears;
  const targetDays = Math.round(targetYears * 365.25);
  const remaining = Math.max(0, targetDays - daysServed);

  // Animate the countdown from a big number to remaining
  const [displayed, setDisplayed] = useState(remaining + 20);

  useEffect(() => {
    if (remaining === 0) { setDisplayed(0); return; }
    const step = Math.ceil((displayed - remaining) / 12);
    if (displayed <= remaining) return;
    const timeout = setTimeout(() => setDisplayed(Math.max(remaining, displayed - step)), 60);
    return () => clearTimeout(timeout);
  }, [displayed, remaining]);

  const pct = Math.min(100, Math.round((daysServed / targetDays) * 100));

  return (
    <div className="border border-border bg-foreground p-6 text-background space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-background/20 pb-4">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent font-bold">
          {isFirstTimeOffender ? '1/3rd Rule (First Offender)' : 'BNSS 479 — 50% Custody Ceiling'}
        </span>
        <Clock className="size-4 text-accent" />
      </div>

      {/* Big Countdown */}
      <div className="space-y-1">
        <div className="font-display text-6xl italic leading-none">
          {remaining === 0 ? (
            <span className="text-accent">Eligible Now</span>
          ) : (
            <>{displayed} <span className="text-3xl text-background/50">days left</span></>
          )}
        </div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-background/50">
          {remaining === 0
            ? 'Mandatory statutory bail threshold reached'
            : `Target: ${targetDate} — ${(targetYears).toFixed(1)} year threshold`}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="h-1 w-full bg-background/20">
          <div
            className="h-1 bg-accent transition-all duration-1000 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex justify-between font-mono text-[9px] uppercase tracking-widest text-background/40">
          <span>Day 0 — Custody Start</span>
          <span>{pct}% Complete</span>
          <span>Day {targetDays}</span>
        </div>
      </div>

      {/* CTA */}
      {remaining === 0 && (
        <div className="flex items-center gap-3 bg-accent px-4 py-3 text-accent-foreground">
          <CalendarCheck className="size-4 shrink-0" />
          <p className="font-mono text-[10px] uppercase tracking-widest font-bold">
            File bail application immediately — statutory entitlement active
          </p>
        </div>
      )}
    </div>
  );
};
