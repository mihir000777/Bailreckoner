'use client';

import React from 'react';
import { BarChart3, PieChart, TrendingUp, Users, AlertCircle, CheckCircle2, Scale } from 'lucide-react';

export const JudgeAnalyticsCharts: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Banner: National Undertrial Impact Statistics */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/40 border border-blue-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">
                National Prison Statistics & Judicial Impact Analytics
              </h3>
              <p className="text-xs text-slate-400">
                National Crime Records Bureau (NCRB) Prison Statistics India & BNSS Sec 479 Projection
              </p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-300 border border-blue-500/30 self-start md:self-auto">
            Live NCRB Benchmark
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 block">Total Undertrials in India</span>
            <span className="text-2xl font-extrabold text-amber-400 mt-1 block">4,34,302</span>
            <span className="text-[10px] text-amber-300">76.1% of all inmates</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 block">BNSS 479 Auto-Flagged</span>
            <span className="text-2xl font-extrabold text-emerald-400 mt-1 block">1,42,800+</span>
            <span className="text-[10px] text-emerald-300">32.8% immediate release potential</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 block">Average Custody Duration</span>
            <span className="text-2xl font-extrabold text-blue-400 mt-1 block">1.8 Years</span>
            <span className="text-[10px] text-blue-300">Before trial commencement</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 block">DLSA Legal Aid Coverage</span>
            <span className="text-2xl font-extrabold text-purple-400 mt-1 block">68.4%</span>
            <span className="text-[10px] text-purple-300">Free representation entitled</span>
          </div>
        </div>
      </div>

      {/* Visual Analytics Grid: Donut Chart + Bar Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chart 1: Donut Chart - Eligibility Breakdown */}
        <div className="glass-card rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-emerald-400" />
              Bail Status Breakdown (Current Court Docket)
            </h4>
            <span className="text-[11px] text-slate-400 font-mono">12 Cases Active</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-around gap-6 pt-2">
            {/* Pure SVG Donut Chart */}
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                {/* Background circle */}
                <path
                  className="text-slate-800 stroke-current"
                  strokeWidth="4"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* Segment 1: Mandatory Eligible (33%) - Green */}
                <path
                  className="text-emerald-400 stroke-current"
                  strokeWidth="4"
                  strokeDasharray="33, 100"
                  strokeDashoffset="0"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* Segment 2: Conditional Discretionary (42%) - Amber */}
                <path
                  className="text-amber-400 stroke-current"
                  strokeWidth="4"
                  strokeDasharray="42, 100"
                  strokeDashoffset="-33"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* Segment 3: Non-Bailable / High Risk (25%) - Red */}
                <path
                  className="text-red-400 stroke-current"
                  strokeWidth="4"
                  strokeDasharray="25, 100"
                  strokeDashoffset="-75"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>

              <div className="absolute text-center">
                <span className="text-xl font-extrabold text-slate-100 block">12</span>
                <span className="text-[9px] text-slate-400 uppercase tracking-wider block">Total Docket</span>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400 shrink-0" />
                <span className="text-slate-300">BNSS 479 Mandatory Bail (33% / 4 Cases)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-400 shrink-0" />
                <span className="text-slate-300">Discretionary Review (42% / 5 Cases)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400 shrink-0" />
                <span className="text-slate-300">High Risk / Special Act (25% / 3 Cases)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chart 2: Custody Duration Distribution Bar Chart */}
        <div className="glass-card rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-400" />
              Custody Duration Distribution
            </h4>
            <span className="text-[11px] text-slate-400">By Time Served</span>
          </div>

          <div className="space-y-3 pt-1">
            {[
              { label: '0 – 3 Months', count: 3, percentage: 25, color: 'bg-slate-700' },
              { label: '3 – 6 Months', count: 2, percentage: 17, color: 'bg-blue-500' },
              { label: '6 – 12 Months', count: 4, percentage: 33, color: 'bg-amber-500' },
              { label: '1 – 3 Years', count: 2, percentage: 17, color: 'bg-emerald-500' },
              { label: '> 3 Years (BNSS 479 Alert)', count: 1, percentage: 8, color: 'bg-purple-500' },
            ].map((bar, i) => (
              <div key={i} className="space-y-1 text-xs">
                <div className="flex justify-between text-[11px] font-semibold text-slate-300">
                  <span>{bar.label}</span>
                  <span>{bar.count} Prisoners ({bar.percentage}%)</span>
                </div>
                <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`${bar.color} h-full rounded-full transition-all duration-500`}
                    style={{ width: `${bar.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
