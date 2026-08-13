'use client';

import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, UserCheck, AlertCircle, Scale, CheckCircle2, HelpCircle } from 'lucide-react';

import { useAuth } from '@/lib/authContext';

const SECTION_12_CATEGORIES = [
  { id: 'WOMAN_CHILD', label: 'Woman or Child (Sec 12a)', desc: 'All women and children regardless of financial income' },
  { id: 'SC_ST', label: 'Member of SC / ST Community (Sec 12b)', desc: 'Protected under Scheduled Castes & Tribes (POA) Act' },
  { id: 'UNDER_CUSTODY', label: 'Person in Custody / Undertrial (Sec 12g)', desc: 'Incarcerated in jail or protective home / custody' },
  { id: 'WORKMAN', label: 'Industrial Workman (Sec 12e)', desc: 'Workmen covered under Industrial Disputes Act' },
  { id: 'DISABILITY', label: 'Person with Disability (Sec 12c)', desc: 'Covered under Rights of Persons with Disabilities Act' },
  { id: 'TRAFFICKING_DISASTER', label: 'Trafficking / Violence Victim (Sec 12d)', desc: 'Victims of human trafficking, mass disaster, or violence' },
  { id: 'LOW_INCOME', label: 'Annual Income below ₹3,00,000 (Sec 12h)', desc: 'Financially eligible under State Legal Services rules' },
];

interface LegalAidScreenerProps {
  onApplyClick?: (category: string) => void;
}

export const LegalAidScreener: React.FC<LegalAidScreenerProps> = ({ onApplyClick }) => {
  const { t } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('UNDER_CUSTODY');
  const [incomeRange, setIncomeRange] = useState<string>('BELOW_1.5L');
  const [hasActiveCase, setHasActiveCase] = useState<boolean>(true);
  const [isCalculated, setIsCalculated] = useState<boolean>(true);

  const activeCatInfo = SECTION_12_CATEGORIES.find((c) => c.id === selectedCategory);

  return (
    <div className="border border-border bg-folder p-6 sm:p-8 space-y-6 shadow-md rounded-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <div className="size-10 border border-accent/40 flex items-center justify-center text-accent bg-accent/5">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent font-bold block">
              {t.screenerSub}
            </span>
            <h3 className="font-display text-xl italic text-foreground">
              {t.screenerTitle}
            </h3>
          </div>
        </div>

        <span className="px-3 py-1 font-mono text-[10px] uppercase font-bold tracking-widest border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 rounded">
          {t.freeMandateBadge}
        </span>
      </div>

      {/* Checklist Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Category Selector */}
        <div className="space-y-3">
          <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground font-bold block">
            {t.selectCategoryLabel}
          </label>
          <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
            {SECTION_12_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-3 border cursor-pointer rounded-sm transition-all flex items-start justify-between gap-2 ${
                  selectedCategory === cat.id
                    ? 'border-accent bg-accent/10 text-foreground'
                    : 'border-border bg-background text-muted-foreground hover:border-accent/40'
                }`}
              >
                <div>
                  <div className="font-sans text-xs font-semibold text-foreground">{cat.label}</div>
                  <div className="font-mono text-[9px] text-muted-foreground mt-0.5">{cat.desc}</div>
                </div>
                {selectedCategory === cat.id && (
                  <CheckCircle2 className="size-4 text-accent shrink-0 mt-0.5" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Income & Custody Details */}
        <div className="space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground font-bold block mb-2">
                2. Annual Family Income
              </label>
              <select
                value={incomeRange}
                onChange={(e) => setIncomeRange(e.target.value)}
                className="w-full bg-background border border-border p-3 font-mono text-xs text-foreground focus:outline-none focus:border-accent"
              >
                <option value="BELOW_1.5L">Below ₹1,50,000 / year (Fully Eligible)</option>
                <option value="1.5L_3L">₹1,50,000 to ₹3,00,000 / year (Eligible in most States)</option>
                <option value="ABOVE_3L">Above ₹3,00,000 / year (Exempt if Woman/Child/Custody)</option>
              </select>
            </div>

            <div className="border border-border bg-background p-4 rounded-sm space-y-2">
              <div className="flex items-center gap-2 text-accent font-mono text-xs font-bold uppercase">
                <ShieldCheck className="size-4" /> Statutory Entitlement Summary
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                Under Section 12 of LSA Act 1987, applicants matching <strong className="text-foreground">{activeCatInfo?.label}</strong> are statutorily guaranteed a free DLSA advocate, filing fee exemptions, and court drafting support.
              </p>
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-2">
            <button
              onClick={() => onApplyClick && onApplyClick(selectedCategory)}
              className="w-full bg-accent text-accent-foreground py-3.5 px-4 font-mono text-xs uppercase tracking-widest font-bold hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
            >
              <span>Submit Free DLSA Legal Aid Request Now</span>
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
