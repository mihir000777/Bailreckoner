'use client';

import React from 'react';
import { Shield, AlertTriangle, CheckCircle, ShieldAlert } from 'lucide-react';
import { RiskAssessmentResult } from '@/types/legal';

interface RiskGaugeProps {
  riskAssessment: RiskAssessmentResult;
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({ riskAssessment }) => {
  const { overallRiskLevel, overallScore, flightRiskScore, tamperingRiskScore, societalDangerScore, details } = riskAssessment;

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'LOW':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'MEDIUM':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'HIGH':
      default:
        return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-slate-100">
              Judicial Risk Assessment Gauge
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Evaluates Flight Risk, Witness Tampering & Societal Harm
          </p>
        </div>

        <div className={`px-3 py-1 rounded-xl text-xs font-bold border flex items-center gap-1.5 ${getRiskColor(overallRiskLevel)}`}>
          {overallRiskLevel === 'LOW' && <CheckCircle className="w-3.5 h-3.5" />}
          {overallRiskLevel === 'MEDIUM' && <AlertTriangle className="w-3.5 h-3.5" />}
          {overallRiskLevel === 'HIGH' && <ShieldAlert className="w-3.5 h-3.5" />}
          <span>{overallRiskLevel} RISK ({overallScore}/100)</span>
        </div>
      </div>

      {/* Visual Risk Gauge Progress Bar */}
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs text-slate-400 mb-1.5">
            <span>Overall Risk Score</span>
            <span className="font-bold text-slate-200">{overallScore}%</span>
          </div>
          <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden relative">
            <div
              className={`h-full transition-all duration-500 ${
                overallRiskLevel === 'LOW'
                  ? 'bg-emerald-400'
                  : overallRiskLevel === 'MEDIUM'
                  ? 'bg-amber-400'
                  : 'bg-rose-500'
              }`}
              style={{ width: `${Math.max(5, overallScore)}%` }}
            />
          </div>
        </div>

        {/* 3 Sub-Factor Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[11px] font-semibold text-slate-400">Flight Risk</span>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-100">{flightRiskScore}%</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${flightRiskScore < 30 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                {flightRiskScore < 30 ? 'Low' : 'Elevated'}
              </span>
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[11px] font-semibold text-slate-400">Witness Tampering</span>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-100">{tamperingRiskScore}%</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${tamperingRiskScore < 30 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                {tamperingRiskScore < 30 ? 'Low' : 'Elevated'}
              </span>
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[11px] font-semibold text-slate-400">Societal Danger</span>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-100">{societalDangerScore}%</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${societalDangerScore < 30 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                {societalDangerScore < 30 ? 'Low' : 'Elevated'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {details && details.length > 0 && (
        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 text-xs text-slate-300 space-y-1">
          <span className="font-bold text-amber-300 block">Risk Factors Checklist:</span>
          <ul className="list-disc list-inside space-y-0.5 text-slate-400">
            {details.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
