'use client';

import React from 'react';
import { ProceduralRequirements as ProceduralReqType } from '@/types/legal';
import { ShieldCheck, FileText, CheckSquare, DollarSign, UserCheck, AlertCircle } from 'lucide-react';

interface ProceduralRequirementsProps {
  procedural: ProceduralReqType;
}

export const ProceduralRequirements: React.FC<ProceduralRequirementsProps> = ({ procedural }) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">
              Procedural Pre-requisites & Statutory Compliance
            </h3>
            <p className="text-xs text-slate-400">
              Mandatory procedural conditions under BNSS / CrPC for court submission
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-300 border border-blue-500/30">
          Parameter 4 Compliant
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Metric 1: Personal Bond */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
          <div className="flex items-center gap-1 text-xs text-slate-400 font-semibold">
            <DollarSign className="w-3.5 h-3.5 text-amber-400" />
            <span>Personal Bond Amount</span>
          </div>
          <div className="text-lg font-bold text-amber-400">
            ₹{procedural.personalBondAmount.toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] text-slate-500 block">Personal undertaking</span>
        </div>

        {/* Metric 2: Sureties */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
          <div className="flex items-center gap-1 text-xs text-slate-400 font-semibold">
            <UserCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Solvent Sureties</span>
          </div>
          <div className="text-lg font-bold text-blue-400">
            {procedural.suretyBondCount} Local Surety
          </div>
          <span className="text-[10px] text-slate-500 block">Solvent resident of district</span>
        </div>

        {/* Metric 3: Estimated Fines */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
          <div className="flex items-center gap-1 text-xs text-slate-400 font-semibold">
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span>Max Statutory Fine</span>
          </div>
          <div className="text-lg font-bold text-emerald-400">
            ₹{(procedural.fineAmountEstimated || 0).toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] text-slate-500 block">Under charged penal provisions</span>
        </div>

        {/* Metric 4: Sec 35 BNSS Compliance */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
          <div className="flex items-center gap-1 text-xs text-slate-400 font-semibold">
            <CheckSquare className="w-3.5 h-3.5 text-purple-400" />
            <span>BNSS Sec 35 Notice</span>
          </div>
          <div className="text-xs font-bold text-purple-300">
            {procedural.sec35BnssCompliance.isCompliant ? 'Notice Compliant' : 'Notice Pending'}
          </div>
          <span className="text-[10px] text-slate-500 block">CrPC Sec 41A arrest rule</span>
        </div>
      </div>

      {/* Verification Docs & Procedural Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
          <h4 className="text-xs font-bold text-slate-200">Required Identity & Residence Verification</h4>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {procedural.identityVerificationDocs.map((doc, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>{doc}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
          <h4 className="text-xs font-bold text-slate-200">Court Compliance Checklist</h4>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {procedural.proceduralChecklist.map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
