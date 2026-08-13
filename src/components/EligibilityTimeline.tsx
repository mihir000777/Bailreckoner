'use client';

import React from 'react';
import { TimeServedDetails } from '@/types/legal';
import { Calendar, Clock, CheckCircle2, AlertTriangle, Flag } from 'lucide-react';

interface EligibilityTimelineProps {
  timeServed: TimeServedDetails;
  isFirstTimeOffender: boolean;
}

export const EligibilityTimeline: React.FC<EligibilityTimelineProps> = ({
  timeServed,
  isFirstTimeOffender,
}) => {
  return (
    <div className="border border-border bg-folder p-6 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-accent" />
            <h3 className="font-display text-lg italic text-folder-foreground">
              Imprisonment Duration &amp; Mandatory Bail Timeline
            </h3>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
            BNSS 2023 Section 479 &amp; CrPC 436A Custody Milestone Projections
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-[10px]">
          <span className="border border-accent px-2 py-1 text-accent font-bold">
            {timeServed.daysServed} Days Served
          </span>
          <span className="border border-border px-2 py-1 text-muted-foreground">
            Max: {timeServed.maxSentenceYears} Years
          </span>
        </div>
      </div>

      {/* Visual Timeline Bar */}
      <div className="relative pt-4 pb-2">
        {/* Background track */}
        <div className="w-full bg-border h-1.5 relative overflow-hidden">
          {/* Progress fill */}
          <div
            className="bg-accent h-full transition-all duration-700"
            style={{ width: `${Math.min(100, Math.max(5, (timeServed.fractionOfMaxSentence || 0) * 100))}%` }}
          />
        </div>

        {/* Milestone Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4">
          {/* Pin 1: Start */}
          <div className="p-3 border border-border bg-background space-y-1">
            <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-muted-foreground">
              <Calendar className="w-3 h-3" />
              <span>Custody Start</span>
            </div>
            <div className="font-display text-sm italic text-foreground">
              {timeServed.custodyStartDateFormatted}
            </div>
            <span className="font-mono text-[9px] text-muted-foreground block">Day 0</span>
          </div>

          {/* Pin 2: 1/3rd Milestone */}
          <div
            className={`p-3 border space-y-1 ${
              isFirstTimeOffender && timeServed.eligibleUnderOneThirdRule
                ? 'border-accent bg-accent-soft'
                : 'border-border bg-background'
            }`}
          >
            <div className="flex items-center justify-between gap-1">
              <span className="font-mono text-[10px] uppercase text-accent font-bold">1/3rd Sentence</span>
              {isFirstTimeOffender && (
                <span className="font-mono text-[9px] border border-accent/50 text-accent px-1">
                  1st Offender
                </span>
              )}
            </div>
            <div className="font-display text-sm italic text-foreground">
              {timeServed.oneThirdEligibilityDate}
            </div>
            <span className="font-mono text-[9px] text-muted-foreground block">
              {timeServed.oneThirdThresholdYears} Yrs threshold
            </span>
          </div>

          {/* Pin 3: 1/2 Milestone (BNSS 479) */}
          <div
            className={`p-3 border space-y-1 ${
              timeServed.eligibleUnderBnss479
                ? 'border-accent bg-accent-soft'
                : 'border-border bg-background'
            }`}
          >
            <div className="flex items-center justify-between gap-1">
              <span className="font-mono text-[10px] uppercase text-foreground font-bold">1/2 (BNSS 479)</span>
              <Flag className="w-3 h-3 text-accent" />
            </div>
            <div className="font-display text-sm italic text-foreground">
              {timeServed.halfTimeEligibilityDate}
            </div>
            <span className="font-mono text-[9px] text-muted-foreground block">
              {timeServed.halfTimeThresholdYears} Yrs threshold
            </span>
          </div>

          {/* Pin 4: Max Sentence */}
          <div className="p-3 border border-border bg-background space-y-1">
            <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-muted-foreground">
              <AlertTriangle className="w-3 h-3 text-destructive" />
              <span>Full Max Sentence</span>
            </div>
            <div className="font-display text-sm italic text-foreground">
              {timeServed.maxSentenceDate}
            </div>
            <span className="font-mono text-[9px] text-muted-foreground block">
              {timeServed.maxSentenceYears} Years max term
            </span>
          </div>
        </div>
      </div>

      <div className="border border-border bg-background p-4 font-mono text-xs text-muted-foreground leading-relaxed flex items-start gap-3">
        <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
        <div>
          <strong className="text-foreground">Statutory Timeline Assessment: </strong>
          {timeServed.bnss479Reasoning}
        </div>
      </div>
    </div>
  );
};
