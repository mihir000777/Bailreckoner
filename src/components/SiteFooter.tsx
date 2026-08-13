'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Shield, FileText, PhoneCall, Scale, HelpCircle, X, CheckCircle2, Lock, ArrowRight } from 'lucide-react';
import { Logo } from '@/components/Logo';

import { useAuth } from '@/lib/authContext';

type ModalType = 'terms' | 'privacy' | 'support' | 'bnss_guide' | null;

export function SiteFooter() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const { t, language } = useAuth();

  const closeModal = () => setActiveModal(null);

  return (
    <>
      <footer className="border-t border-border px-6 py-16 bg-background text-foreground relative z-30">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-12 md:flex-row">
          <div className="max-w-md space-y-4">
            <Link href="/" className="cursor-pointer block">
              <Logo size={36} />
            </Link>
            <p className="text-xs uppercase leading-relaxed tracking-wider text-muted-foreground font-mono">
              {t.footerRegistryDivision}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
            {/* Quick Portals */}
            <div className="space-y-4">
              <div className="font-mono text-xs uppercase tracking-widest text-foreground font-bold border-b border-border/60 pb-2">
                {t.switchRole}
              </div>
              <ul className="space-y-2.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                <li>
                  <Link href="/prisoner/wizard" className="hover:text-accent transition-colors flex items-center gap-1.5 cursor-pointer py-0.5">
                    <span className="text-accent">›</span> {t.prisonerPortal}
                  </Link>
                </li>
                <li>
                  <Link href="/lawyer" className="hover:text-accent transition-colors flex items-center gap-1.5 cursor-pointer py-0.5">
                    <span className="text-accent">›</span> {t.lawyerPortal}
                  </Link>
                </li>
                <li>
                  <Link href="/judge" className="hover:text-accent transition-colors flex items-center gap-1.5 cursor-pointer py-0.5">
                    <span className="text-accent">›</span> {t.judgePortal}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal & Compliance */}
            <div className="space-y-4">
              <div className="font-mono text-xs uppercase tracking-widest text-foreground font-bold border-b border-border/60 pb-2">
                {language === 'kn' ? 'ನಿಯಮಗಳು' : language === 'hi' ? 'नियम व शर्तें' : 'Legal & Rules'}
              </div>
              <ul className="space-y-2.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveModal('terms')}
                    className="hover:text-accent transition-colors flex items-center gap-1.5 text-left cursor-pointer w-full py-0.5"
                  >
                    <span className="text-accent">›</span> {t.termsAndConditions}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveModal('bnss_guide')}
                    className="hover:text-accent transition-colors flex items-center gap-1.5 text-left cursor-pointer w-full py-0.5"
                  >
                    <span className="text-accent">›</span> BNSS Sec 479 Guide
                  </button>
                </li>
              </ul>
            </div>

            {/* Support & Contact */}
            <div className="space-y-4 col-span-2 sm:col-span-1">
              <div className="font-mono text-xs uppercase tracking-widest text-foreground font-bold border-b border-border/60 pb-2">
                {t.supportHelpdesk}
              </div>
              <ul className="space-y-2.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveModal('support')}
                    className="hover:text-accent transition-colors flex items-center gap-1.5 text-left cursor-pointer w-full py-0.5"
                  >
                    <span className="text-accent">›</span> NALSA 15100 Helpline
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright Line */}
        <div className="mx-auto mt-16 pt-8 border-t border-border/40 flex max-w-6xl flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>© 2026 BAIL RECKONER —</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse inline shrink-0" />
            <span><strong className="text-foreground font-bold">NEXORA</strong></span>
          </div>
          <div className="flex items-center gap-4 text-[10px]">
            <span className="px-2 py-0.5 rounded border border-border bg-accent/5 text-accent font-bold">BNSS 2023 / CrPC</span>
          </div>
        </div>
      </footer>

      {/* Interactive Modal Overlay (Top Level Layer with High Z-Index) */}
      {activeModal && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 cursor-pointer"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-card border border-border p-6 sm:p-8 shadow-2xl space-y-6 text-foreground cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent shrink-0">
                  {activeModal === 'terms' && <FileText className="w-5 h-5" />}
                  {activeModal === 'privacy' && <Lock className="w-5 h-5" />}
                  {activeModal === 'support' && <PhoneCall className="w-5 h-5" />}
                  {activeModal === 'bnss_guide' && <Shield className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    {activeModal === 'terms' && 'Terms of Service & Usage Guidelines'}
                    {activeModal === 'privacy' && 'Privacy & Data Governance Policy'}
                    {activeModal === 'support' && 'Help & Legal Aid Support Desk'}
                    {activeModal === 'bnss_guide' && 'BNSS 2023 Section 479 Statutory Rules'}
                  </h3>
                  <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                    Official Information & Judicial Mandates
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground font-sans">
              {activeModal === 'terms' && (
                <>
                  <div className="p-3.5 rounded-xl bg-accent/10 border border-accent/30 text-xs font-mono text-accent">
                    NOTICE: Bail Reckoner is an open statutory assessment utility designed under the provisions of the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023.
                  </div>
                  <h4 className="font-bold text-foreground text-base">1. Judicial Scope & Purpose</h4>
                  <p>
                    This system provides computational evaluation of undertrial detention limits, personal bond amounts, and statutory bail eligibility under Section 479 of BNSS, 2023. Final bail decisions rest exclusively with the competent judicial bench.
                  </p>
                  <h4 className="font-bold text-foreground text-base">2. Accuracy & Open Auditing</h4>
                  <p>
                    All penal provisions, maximum sentences, and threshold formulas are mapped according to the official Gazette of India schedules. Users and legal advocates are encouraged to verify court dockets against original FIR charges.
                  </p>
                  <h4 className="font-bold text-foreground text-base">3. System Usage</h4>
                  <p>
                    Authorized judicial officers, registrars, legal aid attorneys, and undertrials are granted non-exclusive, auditable access to calculate statutory detention thresholds and generate standardized writ dockets.
                  </p>
                </>
              )}

              {activeModal === 'privacy' && (
                <>
                  <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400">
                    SECURITY GUARANTEE: Zero data monetization, end-to-end docket encryption, and strict DPDP Act 2023 compliance.
                  </div>
                  <h4 className="font-bold text-foreground text-base">1. Data Storage & Encryption</h4>
                  <p>
                    Case records and personal detention data entered into Bail Reckoner are protected with AES-256 encryption. Client data is never sold or repurposed.
                  </p>
                  <h4 className="font-bold text-foreground text-base">2. Access Control</h4>
                  <p>
                    Access to individual undertrial dockets is strictly restricted to designated Judicial Officers, District Legal Services Authorities (DLSA), and authorized legal counsel.
                  </p>
                  <h4 className="font-bold text-foreground text-base">3. Audit Logging</h4>
                  <p>
                    All statutory evaluations generate immutable audit timestamps for transparency in judicial reviews.
                  </p>
                </>
              )}

              {activeModal === 'support' && (
                <>
                  <div className="p-4 rounded-xl bg-background border border-border space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold shrink-0">
                        15100
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground text-base">NALSA Toll-Free Helpline</h4>
                        <p className="text-xs text-muted-foreground">National Legal Services Authority — Free 24/7 Legal Aid</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-4 rounded-xl border border-border bg-background space-y-1">
                      <span className="text-xs font-bold text-foreground block">DLSA Clinic Desk</span>
                      <span className="text-xs text-muted-foreground block">Available at every District & Sessions Court</span>
                      <span className="text-[11px] font-mono text-accent font-bold">dlsa-help@nalsa.gov.in</span>
                    </div>
                    <div className="p-4 rounded-xl border border-border bg-background space-y-1">
                      <span className="text-xs font-bold text-foreground block">NEXORA System Desk</span>
                      <span className="text-xs text-muted-foreground block">Technical support & judicial integration</span>
                      <span className="text-[11px] font-mono text-accent font-bold">support@nexora.justice.gov.in</span>
                    </div>
                  </div>
                </>
              )}

              {activeModal === 'bnss_guide' && (
                <>
                  <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-xs font-mono text-blue-400">
                    STATUTORY SUMMARY: Section 479 of Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023 (Replaces CrPC 436A).
                  </div>
                  
                  <div className="space-y-3 pt-2">
                    <div className="p-4 rounded-xl bg-background border border-border space-y-1">
                      <span className="font-bold text-xs text-accent uppercase tracking-wider block">1/3rd Sentence Rule for First-Time Offenders</span>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Under BNSS §479(1), an undertrial prisoner accused of an offence not punishable by death or life imprisonment, who has never been previously convicted, must be released on personal bond after completing <strong>one-third (1/3rd)</strong> of the maximum period of imprisonment.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-background border border-border space-y-1">
                      <span className="font-bold text-xs text-accent uppercase tracking-wider block">1/2 Sentence Rule for Other Undertrials</span>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Undertrials who have served <strong>one-half (1/2)</strong> of the maximum term are entitled to statutory release on bail.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-background border border-border space-y-1">
                      <span className="font-bold text-xs text-amber-400 uppercase tracking-wider block">Mandatory Superintendent Report</span>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Jail Superintendents must immediately submit bail application writs upon completion of statutory threshold dates to the District Judge or DLSA.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-border pt-4 flex justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="px-6 py-2.5 rounded-xl bg-accent text-accent-foreground font-bold text-xs hover:opacity-90 transition-opacity cursor-pointer shadow-md"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


