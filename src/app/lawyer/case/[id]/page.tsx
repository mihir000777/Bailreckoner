'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Sparkles, BookOpen, FileEdit, Copy, Check, X } from 'lucide-react';
import { MOCK_LAWYER_CASES } from '@/data/mockCases';
import { evaluateBailEligibility } from '@/lib/legalEngine';
import { fetchAiPrecedentsAndSummary } from '@/lib/gemini';
import { UndertrialCase, EligibilityResult, JudicialPrecedent } from '@/types/legal';
import { BailApplicationPDF } from '@/components/BailApplicationPDF';
import { EligibilityTimeline } from '@/components/EligibilityTimeline';
import { RiskScorePanel } from '@/components/RiskScorePanel';
import { EligibilityCountdown } from '@/components/EligibilityCountdown';
import { Reveal } from '@/components/Reveal';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function LawyerCaseDetailPage() {
  const params = useParams();
  const caseId = params?.id as string;

  const caseData = MOCK_LAWYER_CASES.find((c) => c.id === caseId) || MOCK_LAWYER_CASES[0];
  const eligibility = evaluateBailEligibility(caseData);

  const [aiData, setAiData] = useState<{
    aiSummary: string;
    precedents: JudicialPrecedent[];
    keyStrengths: string[];
    keyChallenges: string[];
    recommendedPrayer: string;
  } | null>(null);

  const [loadingAi, setLoadingAi] = useState(true);

  // Full Draft Generator state
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  const [draftText, setDraftText] = useState('');
  const [loadingDraft, setLoadingDraft] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerateDraft = async () => {
    setIsDraftModalOpen(true);
    setLoadingDraft(true);
    setDraftText('');
    try {
      const res = await fetch('/api/ai-bail-draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ undertrial: caseData, eligibility }),
      });
      const json = await res.json();
      if (json.success) setDraftText(json.draft);
      else setDraftText('Failed to generate draft. Please try again.');
    } catch {
      setDraftText('Network error. Could not connect to draft service.');
    } finally {
      setLoadingDraft(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(draftText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    async function loadIntelligence() {
      setLoadingAi(true);
      try {
        const intelligence = await fetchAiPrecedentsAndSummary(caseData, eligibility);
        setAiData(intelligence);
      } catch (err) {
        console.error('Failed to load AI intelligence:', err);
      } finally {
        setLoadingAi(false);
      }
    }
    loadIntelligence();
  }, [caseId]);

  return (
    <ProtectedRoute requiredRole="lawyer">
      <div className="min-h-screen bg-background font-sans text-foreground selection:bg-accent/20">
      {/* Header */}
      <header className="border-b border-border px-6 pb-16 pt-16">
        <div className="mx-auto max-w-6xl space-y-6">
          <Link
            href="/lawyer"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors"
          >
            <ArrowLeft className="size-3" />
            <span>← Return to Active Docket</span>
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <div className="mb-3 inline-block border border-accent/40 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-accent">
                Case File #{caseData.id} • {caseData.firNumber}
              </div>
              <h1 className="font-display text-5xl italic leading-tight text-foreground">
                {caseData.prisonerName}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground font-mono">
                {caseData.courtName} • {caseData.district}, {caseData.state}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleGenerateDraft}
                className="flex items-center gap-2 bg-foreground px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest text-background font-bold hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <FileEdit className="size-3" />
                Generate Full Draft
              </button>
              <div className="border border-border bg-folder px-6 py-3 text-folder-foreground font-mono text-xs uppercase tracking-widest font-bold">
                Status: <span className="text-accent">{eligibility.status}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <section className="px-6 py-20 max-w-6xl mx-auto space-y-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          {/* Left Column: Case Profile & Statutory Math */}
          <div className="space-y-8">
            <div className="border border-border bg-card p-8 space-y-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent font-bold">
                Statutory Assessment
              </span>
              <h2 className="font-display text-3xl italic">{eligibility.primaryReason}</h2>
              <div className="space-y-4 font-mono text-xs pt-4 border-t border-border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Days Served in Custody:</span>
                  <span className="font-bold text-foreground">{eligibility.timeServed.daysServed} Days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">1/3rd Rule Ceiling:</span>
                  <span className="font-bold text-accent">{eligibility.timeServed.oneThirdThresholdYears} Years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">50% Max Term Ceiling:</span>
                  <span className="font-bold text-foreground">{eligibility.timeServed.halfTimeThresholdYears} Years</span>
                </div>
              </div>
            </div>

            <EligibilityTimeline
              timeServed={eligibility.timeServed}
              isFirstTimeOffender={caseData.isFirstTimeOffender}
            />

            {/* Eligibility Countdown for CONDITIONAL cases */}
            {eligibility.status === 'CONDITIONAL' && (
              <EligibilityCountdown
                oneThirdEligibilityDate={eligibility.timeServed.oneThirdEligibilityDate}
                halfTimeEligibilityDate={eligibility.timeServed.halfTimeEligibilityDate}
                isFirstTimeOffender={caseData.isFirstTimeOffender}
                daysServed={eligibility.timeServed.daysServed}
                oneThirdThresholdYears={eligibility.timeServed.oneThirdThresholdYears}
                halfTimeThresholdYears={eligibility.timeServed.halfTimeThresholdYears}
              />
            )}

            <RiskScorePanel riskAssessment={eligibility.riskAssessment} />

            <div className="pt-4">
              <BailApplicationPDF undertrial={caseData} eligibility={eligibility} />
            </div>
          </div>

          {/* Right Column: Gemini AI Supreme Court Precedent Workspace */}
          <div className="space-y-8">
            <div className="border border-border bg-foreground p-8 text-background space-y-6">
              <div className="flex items-center justify-between border-b border-background/20 pb-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent font-bold">
                  Gemini SC Precedent Intelligence
                </span>
                {loadingAi && <span className="font-mono text-[9px] uppercase animate-pulse">Searching Precedents...</span>}
              </div>

              {loadingAi ? (
                <div className="py-12 text-center space-y-3 font-mono text-xs opacity-60">
                  <Sparkles className="size-6 animate-spin mx-auto text-accent" />
                  <p>Indexing Supreme Court & High Court bail precedents for BNSS 479...</p>
                </div>
              ) : aiData ? (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="font-mono text-[9px] uppercase tracking-widest opacity-50 block">AI Strategic Brief</span>
                    <p className="text-xs leading-relaxed opacity-80 font-sans">{aiData.aiSummary}</p>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-background/20">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-accent font-bold block">
                      Landmark Judicial Precedents
                    </span>
                    <div className="space-y-3">
                      {aiData.precedents.map((prec, i) => (
                        <div key={i} className="border border-background/20 bg-background/5 p-4 rounded space-y-2">
                          <div className="flex items-center justify-between font-mono text-[10px]">
                            <span className="font-bold text-accent">{prec.citation}</span>
                            <span className="opacity-60">{prec.court} ({prec.year})</span>
                          </div>
                          <h4 className="font-display text-lg italic text-background">{prec.caseTitle}</h4>
                          <p className="text-xs opacity-70 font-sans">{prec.keyPrinciple}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* Full Draft Generator Modal */}
      {isDraftModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-3xl border border-border bg-card shadow-2xl flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4 font-mono text-xs uppercase shrink-0">
              <span className="font-bold text-accent flex items-center gap-2">
                <Sparkles className="size-3" />
                AI-Generated Full Bail Application Draft
              </span>
              <div className="flex items-center gap-3">
                {!loadingDraft && draftText && (
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 border border-border px-3 py-1.5 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {copied ? <Check className="size-3 text-accent" /> : <Copy className="size-3" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                )}
                <button onClick={() => setIsDraftModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* Draft Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {loadingDraft ? (
                <div className="py-20 text-center space-y-4 font-mono text-xs opacity-60">
                  <Sparkles className="size-8 animate-spin mx-auto text-accent" />
                  <p>Gemini AI is drafting a court-ready bail application...</p>
                  <p className="text-[10px]">Personalizing legal language for {caseData.prisonerName} • {caseData.firNumber}</p>
                </div>
              ) : (
                <pre className="whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-foreground">{draftText}</pre>
              )}
            </div>

            {/* Modal Footer */}
            {!loadingDraft && draftText && (
              <div className="border-t border-border px-6 py-4 flex justify-end gap-3 shrink-0">
                <button
                  onClick={() => setIsDraftModalOpen(false)}
                  className="border border-border px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground"
                >
                  Close
                </button>
                <button
                  onClick={handleCopy}
                  className="bg-foreground px-6 py-2 font-mono text-[10px] uppercase tracking-widest text-background font-bold hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  {copied ? '✓ Copied to Clipboard' : 'Copy Full Application'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
    </ProtectedRoute>
  );
}
