'use client';

import React from 'react';
import { ArrowRight, ShieldCheck, AlertTriangle } from 'lucide-react';

interface IPCBNSBadgeProps {
  ipcSection: string;
  bnsSection: string;
  title?: string;
  isBailable?: boolean;
  category?: string;
}

export const IPCBNSBadge: React.FC<IPCBNSBadgeProps> = ({
  ipcSection,
  bnsSection,
  title,
  isBailable = true,
  category,
}) => {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs shadow-sm">
      <div className="flex items-center gap-1">
        <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-bold border border-amber-500/30">
          IPC {ipcSection}
        </span>
        <ArrowRight className="w-3 h-3 text-slate-500" />
        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 font-bold border border-emerald-500/30">
          BNS {bnsSection}
        </span>
      </div>

      {title && (
        <span className="text-slate-300 font-medium truncate max-w-[140px] hidden sm:inline">
          {title}
        </span>
      )}

      {isBailable ? (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
          <ShieldCheck className="w-3 h-3" /> Bailable
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30">
          <AlertTriangle className="w-3 h-3" /> Non-Bailable
        </span>
      )}

      {category && (
        <span className="text-[10px] text-slate-400 font-semibold px-1.5 py-0.5 rounded bg-slate-800">
          {category}
        </span>
      )}
    </div>
  );
};
