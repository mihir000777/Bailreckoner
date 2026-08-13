'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { evaluateBailEligibility } from '@/lib/legalEngine';
import { UndertrialCase } from '@/types/legal';
import { fetchAllCases, getLocalCases, updateCaseStatus, subscribeToDb } from '@/lib/db';
import { useAuth } from '@/lib/authContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';

const districts = [
  ['Pune', 312, 78],
  ['Ranchi', 244, 61],
  ['Nagpur', 198, 52],
  ['Kochi', 141, 88],
  ['Guwahati', 126, 44],
  ['Jaipur', 289, 69],
];

export default function JudgeAuthorityPage() {
  const { user, isAuthenticated, logout } = useAuth();
  const [casesList, setCasesList] = useState<UndertrialCase[]>([]);
  const [selectedCase, setSelectedCase] = useState<UndertrialCase | null>(null);
  const [reviewDecision, setReviewDecision] = useState<'GRANTED' | 'REJECTED'>('GRANTED');
  const [judicialNotes, setJudicialNotes] = useState('');
  const [signedOrder, setSignedOrder] = useState<{
    orderNumber: string;
    caseData: UndertrialCase;
    decision: 'GRANTED' | 'REJECTED';
    notes: string;
    date: string;
  } | null>(null);

  useEffect(() => {
    async function load() {
      const data = await fetchAllCases();
      setCasesList(data);
    }
    load();
    const unsubscribe = subscribeToDb(() => {
      setCasesList(getLocalCases());
    });
    return unsubscribe;
  }, []);

  const evaluatedCases = casesList.map((c) => ({
    caseData: c,
    eligibility: evaluateBailEligibility(c),
  }));

  const handleIssueOrder = async () => {
    if (!selectedCase) return;
    const orderNo = `ORD-BNSS479-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const finalNotes = judicialNotes || 'Order passed pursuant to BNSS Section 479 mandatory provisions upon personal bond.';

    const newOrder = {
      orderNumber: orderNo,
      caseData: selectedCase,
      decision: reviewDecision,
      notes: finalNotes,
      date: now,
    };

    setSignedOrder(newOrder);

    // Update real-time database store!
    const newStatus = reviewDecision === 'GRANTED' ? 'granted' : 'rejected';
    await updateCaseStatus(selectedCase.id, newStatus, { judgeNotes: finalNotes });

    // Persist to localStorage for Audit Log
    try {
      const stored = localStorage.getItem('bail_reckoner_orders');
      const existing = stored ? JSON.parse(stored) : [];
      const persistRecord = {
        orderNumber: orderNo,
        prisonerName: selectedCase.prisonerName,
        firNumber: selectedCase.firNumber,
        district: selectedCase.district,
        decision: reviewDecision,
        notes: finalNotes,
        date: now,
        timestamp: Date.now(),
      };
      localStorage.setItem('bail_reckoner_orders', JSON.stringify([persistRecord, ...existing]));
    } catch { /* ignore */ }

    setSelectedCase(null);
  };

  return (
    <ProtectedRoute requiredRole="judge">
      <div className="min-h-screen bg-background font-sans text-foreground selection:bg-accent/20">
      {/* Portal Header */}
      <header className="border-b border-border px-6 pb-24 pt-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 inline-block border border-accent/40 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-accent">
            Portal 03 / Judicial Oversight
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-3 mb-8">
            <Link
              href="/judge/batch"
              className="flex items-center gap-2 border border-input px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:border-accent hover:text-accent transition-colors"
            >
              <span>⚡ Batch Screener</span>
            </Link>
            <Link
              href="/judge/orders"
              className="flex items-center gap-2 border border-input px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:border-accent hover:text-accent transition-colors"
            >
              <span>📋 Order Registry</span>
            </Link>
          </div>
          <h1 className="max-w-4xl text-balance font-display text-6xl italic leading-[0.9] tracking-tighter md:text-8xl">
            The bench, <span className="text-accent">audited</span>.
          </h1>
          <p className="mt-10 max-w-xl text-lg leading-relaxed text-muted-foreground font-sans">
            Automated review of magistrate orders against statutory timelines, with district analytics that make undertrial backlog visible at a glance.
          </p>
        </div>
      </header>

      {/* District Backlog & Alerts */}
      <section className="px-6 py-28">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <div className="border border-border bg-card">
              <div className="flex items-center justify-between border-b border-border px-8 py-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  District Backlog Index
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
                  Live / 24ms
                </span>
              </div>
              <div className="divide-y divide-border">
                {districts.map(([name, count, pct], i) => (
                  <Reveal key={String(name)} delay={i * 60}>
                    <div className="flex items-center gap-6 px-8 py-6">
                      <span className="w-28 font-display text-xl italic">{name}</span>
                      <div className="h-1 flex-1 bg-border">
                        <div
                          className="h-1 bg-accent transition-[width] duration-1000 ease-out"
                          style={{ width: `${pct as number}%` }}
                        />
                      </div>
                      <span className="w-16 text-right font-mono text-xs text-muted-foreground">
                        {count}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="space-y-8">
            {[
              [
                'Timeline Breach Alerts',
                'Any remand extended past its statutory ceiling raises a bench notice before the next listing.',
              ],
              [
                'Order Consistency',
                'Comparable orders across the district are surfaced so discretion is exercised on a visible baseline.',
              ],
              [
                'Immutable Audit Log',
                'Every computation, override and note is written to an append-only register open to review.',
              ],
            ].map(([t, b], i) => (
              <Reveal key={t} delay={i * 100}>
                <div className="border-l border-accent bg-accent-soft p-8">
                  <h2 className="mb-3 font-display text-2xl italic">{t}</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground font-sans">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Auto-Flagged Queue Table */}
      <section className="px-6 pb-28 border-t border-border pt-20">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="flex items-end justify-between border-b border-border pb-6">
            <h2 className="font-display text-3xl italic">BNSS 479 Flagged Release Queue</h2>
            <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
              Expedited Action Required
            </span>
          </div>

          <div className="divide-y divide-border border border-border bg-card">
            {evaluatedCases.map(({ caseData, eligibility }) => (
              <div key={caseData.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-accent-soft transition-colors">
                <div className="space-y-1">
                  <div className="font-mono text-xs text-accent font-bold">{caseData.firNumber} • {caseData.district}</div>
                  <h3 className="font-display text-2xl italic">{caseData.prisonerName}</h3>
                  <p className="text-xs text-muted-foreground font-sans">{eligibility.primaryReason}</p>
                </div>

                <button
                  onClick={() => setSelectedCase(caseData)}
                  className="bg-foreground px-6 py-3 font-mono text-xs uppercase tracking-widest text-background font-bold hover:bg-accent hover:text-accent-foreground transition-colors self-start md:self-auto"
                >
                  Review Order →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="relative overflow-hidden bg-foreground px-6 py-32 text-background">
        <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center select-none font-display text-[10rem] md:text-[14rem] lg:text-[18rem] italic text-background/[0.03] overflow-hidden">
          BENCH
        </div>
        <div className="relative mx-auto grid max-w-6xl gap-px bg-background/10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['114', 'Districts Synced'],
            ['32%', 'Undertrial Reduction'],
            ['14k', 'Orders Reviewed'],
            ['22 Days', 'Avg. Time Saved'],
          ].map(([n, l], i) => (
            <Reveal key={l} delay={i * 90}>
              <div className="h-full bg-foreground p-10">
                <div className="font-display text-4xl italic">{n}</div>
                <div className="mt-3 h-1 w-12 bg-accent" />
                <div className="mt-4 font-mono text-[10px] uppercase tracking-widest opacity-50">
                  {l}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Review Modal */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg border border-border bg-card p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4 font-mono text-xs uppercase">
              <span className="font-bold text-accent">Pass Judicial Order • {selectedCase.firNumber}</span>
              <button onClick={() => setSelectedCase(null)} className="text-muted-foreground hover:text-foreground">✕</button>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div>
                <span className="text-muted-foreground uppercase block">Undertrial Prisoner</span>
                <span className="font-display text-2xl italic text-foreground">{selectedCase.prisonerName}</span>
              </div>

              <div>
                <span className="text-muted-foreground uppercase block mb-1">Judicial Decision</span>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setReviewDecision('GRANTED')}
                    className={`flex-1 py-3 text-center border font-bold uppercase transition-colors ${
                      reviewDecision === 'GRANTED' ? 'border-accent bg-accent text-accent-foreground' : 'border-border text-muted-foreground'
                    }`}
                  >
                    Grant Release (BNSS 479)
                  </button>
                  <button
                    type="button"
                    onClick={() => setReviewDecision('REJECTED')}
                    className={`flex-1 py-3 text-center border font-bold uppercase transition-colors ${
                      reviewDecision === 'REJECTED' ? 'border-destructive bg-destructive text-destructive-foreground' : 'border-border text-muted-foreground'
                    }`}
                  >
                    Refuse Release
                  </button>
                </div>
              </div>

              <div>
                <span className="text-muted-foreground uppercase block mb-1">Judicial Bench Notes</span>
                <textarea
                  rows={3}
                  value={judicialNotes}
                  onChange={(e) => setJudicialNotes(e.target.value)}
                  placeholder="Enter judicial reasoning & bond terms..."
                  className="w-full border border-input bg-background p-3 text-foreground font-sans text-xs focus:border-accent focus:outline-none"
                />
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedCase(null)}
                  className="w-1/3 border border-border py-3 text-center font-mono text-xs uppercase text-muted-foreground"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleIssueOrder}
                  className="w-2/3 bg-foreground py-3 text-center font-mono text-xs uppercase text-background font-bold hover:bg-accent hover:text-accent-foreground"
                >
                  Sign & Issue Judicial Order →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </ProtectedRoute>
  );
}
