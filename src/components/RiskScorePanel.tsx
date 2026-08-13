'use client';

import React from 'react';
import { RiskAssessmentResult } from '@/types/legal';
import { AlertTriangle, TrendingUp, ShieldAlert, Users } from 'lucide-react';

interface RiskScorePanelProps {
  riskAssessment: RiskAssessmentResult;
}

const MAX_SCORE = 10;

function RiskBar({ label, score, max, icon: Icon }: { label: string; score: number; max: number; icon: React.FC<{ className?: string }> }) {
  const pct = Math.min(100, Math.round((score / max) * 100));
  const color = score >= 6 ? 'bg-destructive' : score >= 3 ? 'bg-accent' : 'bg-foreground/30';
  const textColor = score >= 6 ? 'text-destructive' : score >= 3 ? 'text-accent' : 'text-muted-foreground';

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest">
        <span className="flex items-center gap-2 text-muted-foreground">
          <Icon className="size-3" />
          {label}
        </span>
        <span className={`font-bold ${textColor}`}>{score} / {max}</span>
      </div>
      <div className="h-1 w-full bg-border relative">
        <div
          className={`h-1 ${color} transition-all duration-700 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function RadialGauge({ score, riskLevel }: { score: number; riskLevel: string }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const strokeColor =
    riskLevel === 'HIGH' ? '#f43f5e' : riskLevel === 'MEDIUM' ? '#f59e0b' : '#10b981';

  return (
    <div className="relative size-24 shrink-0 flex items-center justify-center">
      <svg className="size-full -rotate-90" viewBox="0 0 90 90">
        {/* Background Track */}
        <circle
          cx="45"
          cy="45"
          r={radius}
          className="stroke-border"
          strokeWidth="6"
          fill="transparent"
        />
        {/* Animated Score Ring */}
        <circle
          cx="45"
          cy="45"
          r={radius}
          stroke={strokeColor}
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="font-mono text-xl font-bold tracking-tight text-foreground">
          {score}%
        </span>
        <span className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground">
          Score
        </span>
      </div>
    </div>
  );
}

export const RiskScorePanel: React.FC<RiskScorePanelProps> = ({ riskAssessment }) => {
  const { overallRiskLevel, overallScore, flightRiskScore, tamperingRiskScore, societalDangerScore, details, recommendedConditions } = riskAssessment;

  const levelColor =
    overallRiskLevel === 'HIGH'
      ? 'border-destructive text-destructive bg-destructive/10'
      : overallRiskLevel === 'MEDIUM'
      ? 'border-accent text-accent bg-accent/10'
      : 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10';

  return (
    <div className="border border-border bg-folder p-6 space-y-6 shadow-sm">
      {/* Header with Circular Radial Score Gauge */}
      <div className="flex items-center justify-between border-b border-border pb-4 gap-4">
        <div className="space-y-2">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent font-bold block">
            Multi-Axis Risk Assessment
          </span>
          <h3 className="font-display text-xl italic">Risk Score Breakdown</h3>
          <div className={`inline-block border px-3 py-1 font-mono text-[10px] uppercase tracking-widest font-bold rounded ${levelColor}`}>
            {overallRiskLevel} Risk Profile
          </div>
        </div>

        <RadialGauge score={overallScore} riskLevel={overallRiskLevel} />
      </div>

      {/* Three Risk Bars */}
      <div className="space-y-5">
        <RiskBar label="Flight Risk" score={flightRiskScore} max={MAX_SCORE} icon={TrendingUp} />
        <RiskBar label="Evidence Tampering" score={tamperingRiskScore} max={MAX_SCORE} icon={ShieldAlert} />
        <RiskBar label="Societal Danger" score={societalDangerScore} max={MAX_SCORE} icon={Users} />
      </div>

      {/* Detail Flags */}
      {details.length > 0 && (
        <div className="border-t border-border pt-4 space-y-2">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground block">
            Risk Flags Identified
          </span>
          <ul className="space-y-1.5">
            {details.map((d, i) => (
              <li key={i} className="flex items-start gap-2 font-mono text-[10px] text-muted-foreground">
                <AlertTriangle className="size-3 shrink-0 text-accent mt-0.5" />
                {d}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommended Conditions */}
      {recommendedConditions.length > 0 && (
        <div className="border-t border-border pt-4 space-y-2">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground block">
            Recommended Bail Conditions
          </span>
          <ol className="space-y-1.5 list-none">
            {recommendedConditions.map((c, i) => (
              <li key={i} className="flex items-start gap-2 font-mono text-[10px] text-foreground">
                <span className="shrink-0 border border-border px-1 text-accent">{String(i + 1).padStart(2, '0')}</span>
                {c}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};
