'use client';

import React from 'react';
import Link from 'next/link';

import { useAuth } from '@/lib/authContext';

interface DossierStackProps {
  drift?: number;
}

export function DossierStack({ drift = 0 }: DossierStackProps) {
  const { t } = useAuth();

  return (
    <div
      className="dossier-group relative h-[520px] w-full max-w-[380px] mx-auto cursor-pointer"
      style={{ transform: `translateY(${-drift}px)` }}
    >
      {/* Judge Authority (bottom card - Bench.03) */}
      <Link
        href="/judge"
        className="dossier-card animate-dossier absolute inset-x-0 bottom-0 mx-auto aspect-[3/4] w-full max-w-[360px] border border-[#383530] bg-[#1f1d19] p-8 text-[#e6e2da] shadow-[0_10px_30px_rgba(0,0,0,0.5)] [--rotation:4deg] [animation-delay:400ms] rounded-b-sm rounded-tl-sm"
      >
        <div className="absolute -top-6 left-0 flex h-6 w-24 items-center justify-center rounded-t-lg border-x border-t border-[#383530] bg-[#1f1d19] font-mono text-[9px] uppercase tracking-widest text-[#9e978b]">
          Bench.03
        </div>
        <div className="flex h-full flex-col justify-between border border-[#383530]/80 p-6 rounded bg-[#171613]">
          <div>
            <div className="mb-8 font-mono text-[10px] tracking-[0.2em] text-[#9e978b]">
              REF: JUDICIAL_OVERSIGHT
            </div>
            <h2 className="mb-4 font-display text-3xl italic text-[#f0ece1]">{t.dossierCard3Title}</h2>
            <p className="text-sm leading-relaxed text-[#9e978b] font-sans">
              {t.dossierCard3Desc}
            </p>
          </div>
          <div className="font-mono text-[10px] text-[#9e978b]">STAMP: 26/Q3_VERIFIED</div>
        </div>
      </Link>

      {/* Legal Aid Lawyer (middle card - Aid.02) */}
      <Link
        href="/lawyer"
        className="dossier-card animate-dossier absolute inset-x-0 bottom-4 z-10 mx-auto aspect-[3/4] w-full max-w-[360px] border border-[#3d3a34] bg-[#282520] p-8 text-[#e6e2da] shadow-[0_20px_40px_rgba(0,0,0,0.6)] [--rotation:-2deg] [animation-delay:200ms] rounded-b-sm rounded-tr-sm"
      >
        <div className="absolute -top-6 left-28 flex h-6 w-24 items-center justify-center rounded-t-lg border-x border-t border-[#3d3a34] bg-[#282520] font-mono text-[9px] uppercase tracking-widest text-[#a8a194]">
          Aid.02
        </div>
        <div className="flex h-full flex-col justify-between border border-[#3d3a34]/80 p-6 rounded bg-[#1d1b17]">
          <div>
            <div className="mb-8 font-mono text-[10px] tracking-[0.2em] text-[#a8a194]">
              REF: DEFENSE_AID
            </div>
            <h2 className="mb-4 font-display text-3xl italic text-[#f0ece1]">{t.dossierCard2Title}</h2>
            <p className="text-sm leading-relaxed text-[#a8a194] font-sans">
              {t.dossierCard2Desc}
            </p>
          </div>
          <div className="flex gap-2">
            <div className="size-2 rounded-full bg-[#e07a5f]" />
            <div className="size-2 rounded-full bg-[#3d3a34]" />
            <div className="size-2 rounded-full bg-[#3d3a34]" />
          </div>
        </div>
      </Link>

      {/* Bail Wizard (top card - Core.01 Light Paper Folder) */}
      <Link
        href="/prisoner/wizard"
        className="dossier-card animate-dossier absolute inset-x-0 bottom-8 z-20 mx-auto aspect-[3/4] w-full max-w-[360px] bg-[#EAE7E1] p-8 text-[#1a1917] shadow-[0_30px_70px_rgba(0,0,0,0.6)] [--rotation:1deg] rounded-b-sm rounded-tl-sm border border-[#d6d2c9]"
      >
        {/* Top Folder Tab */}
        <div className="absolute -top-6 right-0 flex h-6 w-24 items-center justify-center rounded-t-lg border-x border-t border-[#d6d2c9] bg-[#EAE7E1] font-mono text-[9px] uppercase tracking-widest text-[#78736a] font-bold">
          Core.01
        </div>

        <div className="flex h-full flex-col justify-between">
          <div>
            <div className="mb-10 flex items-start justify-between">
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#8a847a] font-semibold">
                CASE_ANALYZER_V2
              </span>
              <span className="border border-[#e07a5f] px-2 py-0.5 font-mono text-[8px] uppercase text-[#e07a5f] font-bold tracking-wider">
                Urgent
              </span>
            </div>
            <h2 className="mb-6 font-display text-4xl sm:text-[2.6rem] italic text-[#1a1917] font-normal leading-[1.08] tracking-tight">
              {t.dossierCard1Title}
            </h2>
            <p className="text-sm leading-relaxed text-[#5c574f] font-sans font-normal">
              {t.dossierCard1Desc}
            </p>
          </div>

          <div className="space-y-4">
            <div className="h-px w-full bg-[#d6d2c9]" />
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] uppercase text-[#e07a5f] font-bold tracking-widest">
                Deploy Logic
              </span>
              {/* Black diagonal arrow matching user's screenshot */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1a1917"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5 text-[#1a1917]"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
