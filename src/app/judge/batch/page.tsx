'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Upload, Play, Download, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { evaluateBailEligibility } from '@/lib/legalEngine';
import { UndertrialCase } from '@/types/legal';
import { Reveal } from '@/components/Reveal';
import { ProtectedRoute } from '@/components/ProtectedRoute';

interface BatchRow {
  name: string;
  firNumber: string;
  custodyStartDate: string;
  offenseId: string;
  isFirstTimeOffender: boolean;
}

interface BatchResult {
  row: BatchRow;
  caseData: UndertrialCase;
  status: 'ELIGIBLE' | 'CONDITIONAL' | 'NOT_ELIGIBLE';
  daysServed: number;
  daysRemaining: number;
  primaryReason: string;
  riskLevel: string;
}

const SAMPLE_CSV = `Name,FIR Number,Custody Start Date,Offense ID,First Time Offender
Ramesh Kumar,FIR 204/2023,2023-02-10,offense-ipc-420,true
Priya Sharma,FIR 88/2024,2023-09-01,offense-it-66d,true
Mohammad Iqbal,FIR 310/2023,2023-05-12,offense-ipc-379,false
Arjun Das,FIR 42/2024,2024-01-20,offense-ipc-302,false
Sunita Devi,FIR 176/2023,2023-08-05,offense-ipc-420,true
Vikram Singh,FIR 501/2022,2022-12-01,offense-ipc-379,false
Lalita Prasad,FIR 99/2023,2023-03-15,offense-ipc-420,true
Abdul Rahman,FIR 267/2024,2024-03-10,offense-it-66d,false`;

function parseCSV(csv: string): BatchRow[] {
  const lines = csv.trim().split('\n');
  if (lines.length < 2) return [];
  const rows: BatchRow[] = [];
  // skip header (line 0)
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',').map((c) => c.trim());
    if (cols.length < 5 || !cols[0]) continue;
    rows.push({
      name: cols[0],
      firNumber: cols[1] || `FIR ${100 + i}/2023`,
      custodyStartDate: cols[2] || '2023-01-01',
      offenseId: cols[3] || 'offense-ipc-420',
      isFirstTimeOffender: cols[4]?.toLowerCase() === 'true',
    });
  }
  return rows;
}

function buildCase(row: BatchRow, idx: number): UndertrialCase {
  return {
    id: `batch-case-${idx}`,
    prisonerName: row.name,
    prisonerAge: 30,
    gender: 'male',
    isFirstTimeOffender: row.isFirstTimeOffender,
    firNumber: row.firNumber,
    policeStation: 'Central P.S.',
    state: 'Bihar',
    district: 'Patna',
    courtName: 'District & Sessions Court',
    custodyStartDate: row.custodyStartDate,
    offenseIds: [row.offenseId],
    flightRiskFactors: { hasPermanentAddress: true, hasJobFamilyInJurisdiction: true, hasPassportSurrendered: false, previousJumpedBail: false },
    tamperingRiskFactors: { witnessesAreRelatives: false, isInfluentialPerson: false, evidenceSecuredByPolice: true },
    societalDangerFactors: { hasPriorConvictions: false, crimeInvolvedViolence: false, multiplePendingCases: false },
    status: 'pending_review',
    createdAt: new Date().toISOString(),
  };
}

function exportCSV(results: BatchResult[]) {
  const headers = ['Name', 'FIR Number', 'Custody Start', 'Days Served', 'Status', 'Days Remaining', 'Risk Level', 'Reason'];
  const rows = results.map((r) => [
    r.row.name,
    r.row.firNumber,
    r.row.custodyStartDate,
    r.daysServed,
    r.status,
    r.daysRemaining,
    r.riskLevel,
    `"${r.primaryReason.replace(/"/g, "'")}"`,
  ]);
  const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `bail-batch-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
}

export default function JudgeBatchPage() {
  const [csvText, setCsvText] = useState(SAMPLE_CSV);
  const [results, setResults] = useState<BatchResult[]>([]);
  const [running, setRunning] = useState(false);

  const handleRun = async () => {
    setRunning(true);
    await new Promise((r) => setTimeout(r, 600)); // simulate processing
    const rows = parseCSV(csvText);
    const evaluated: BatchResult[] = rows.map((row, idx) => {
      const caseData = buildCase(row, idx);
      const eligibility = evaluateBailEligibility(caseData);
      const targetDays = Math.round(
        (caseData.isFirstTimeOffender
          ? eligibility.timeServed.oneThirdThresholdYears
          : eligibility.timeServed.halfTimeThresholdYears) * 365.25
      );
      const remaining = Math.max(0, targetDays - eligibility.timeServed.daysServed);
      return {
        row,
        caseData,
        status: eligibility.status,
        daysServed: eligibility.timeServed.daysServed,
        daysRemaining: remaining,
        primaryReason: eligibility.primaryReason,
        riskLevel: eligibility.riskAssessment.overallRiskLevel,
      };
    });
    // Sort: ELIGIBLE first, then by days remaining ascending
    evaluated.sort((a, b) => {
      if (a.status === 'ELIGIBLE' && b.status !== 'ELIGIBLE') return -1;
      if (b.status === 'ELIGIBLE' && a.status !== 'ELIGIBLE') return 1;
      return a.daysRemaining - b.daysRemaining;
    });
    setResults(evaluated);
    setRunning(false);
  };

  const eligible = results.filter((r) => r.status === 'ELIGIBLE');
  const conditional = results.filter((r) => r.status === 'CONDITIONAL');
  const notEligible = results.filter((r) => r.status === 'NOT_ELIGIBLE');

  return (
    <ProtectedRoute requiredRole="judge">
      <div className="min-h-screen bg-background font-sans text-foreground selection:bg-accent/20">
      {/* Header */}
      <header className="border-b border-border px-6 pb-20 pt-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Link
              href="/judge"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors"
            >
              <ArrowLeft className="size-3" />
              <span>Back to Judge Authority</span>
            </Link>
            <span className="text-muted-foreground/30">•</span>
            <div className="inline-block border border-accent/40 bg-accent/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-accent font-bold rounded">
              Portal 03 / Batch Intelligence Engine
            </div>
          </div>
          <h1 className="max-w-4xl font-display text-6xl italic leading-[0.9] tracking-tighter md:text-8xl">
            Jail Census <span className="text-accent">Scanner</span>.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Paste a jail register CSV to automatically screen every undertrial prisoner for BNSS 479 eligibility. Surface who is entitled to statutory bail today.
          </p>
        </div>
      </header>

      {/* Input Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            {/* CSV Editor */}
            <div className="space-y-3">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest">
                <span className="text-muted-foreground">Jail Register CSV Input</span>
                <button
                  onClick={() => setCsvText(SAMPLE_CSV)}
                  className="text-accent hover:underline"
                >
                  Load Sample Data
                </button>
              </div>
              <textarea
                value={csvText}
                onChange={(e) => setCsvText(e.target.value)}
                rows={12}
                className="w-full border border-border bg-background p-4 font-mono text-xs text-foreground focus:border-accent focus:outline-none resize-none leading-relaxed"
                placeholder={`Name,FIR Number,Custody Start Date,Offense ID,First Time Offender\nRamesh Kumar,FIR 204/2023,2023-02-10,offense-ipc-420,true`}
              />
              <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                Accepted columns: Name, FIR Number, Custody Start Date (YYYY-MM-DD), Offense ID, First Time Offender (true/false)
              </p>
            </div>

            {/* Stats Card */}
            <div className="space-y-4">
              <div className="border border-border bg-folder p-8 space-y-6 text-folder-foreground">
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent block">Processing Summary</span>
                <div className="space-y-4 font-mono text-xs">
                  <div className="flex justify-between border-b border-border pb-3">
                    <span className="text-muted-foreground">Rows Detected</span>
                    <span className="font-bold text-foreground">{parseCSV(csvText).length}</span>
                  </div>
                  {results.length > 0 && (
                    <>
                      <div className="flex justify-between border-b border-border pb-3">
                        <span className="text-muted-foreground">ELIGIBLE (Mandatory Bail)</span>
                        <span className="font-bold text-accent">{eligible.length}</span>
                      </div>
                      <div className="flex justify-between border-b border-border pb-3">
                        <span className="text-muted-foreground">CONDITIONAL (Judicial)</span>
                        <span className="font-bold">{conditional.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">NOT ELIGIBLE YET</span>
                        <span className="font-bold">{notEligible.length}</span>
                      </div>
                    </>
                  )}
                </div>

                {results.length > 0 && (
                  <div className="border border-accent bg-accent-soft p-4 space-y-1">
                    <div className="font-display text-4xl italic text-accent">{eligible.length}</div>
                    <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                      Prisoners entitled to immediate statutory release
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={handleRun}
                disabled={running}
                className="w-full bg-foreground p-4 text-center font-mono text-xs uppercase tracking-widest text-background font-bold hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {running ? (
                  <><Clock className="size-4 animate-spin" /> Computing BNSS 479 Eligibility...</>
                ) : (
                  <><Play className="size-4" /> Run Batch Screener</>
                )}
              </button>

              {results.length > 0 && (
                <button
                  onClick={() => exportCSV(results)}
                  className="w-full border border-border p-4 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground hover:border-accent transition-colors flex items-center justify-center gap-3"
                >
                  <Download className="size-4" />
                  Export Results as CSV
                </button>
              )}
            </div>
          </div>

          {/* Results Table */}
          {results.length > 0 && (
            <Reveal>
              <div className="border border-border">
                <div className="flex items-center justify-between border-b border-border px-6 py-4 font-mono text-[10px] uppercase tracking-widest">
                  <span className="text-muted-foreground">Eligibility Results — Ranked by Urgency</span>
                  <span className="text-accent font-bold">{results.length} Prisoners Screened</span>
                </div>

                <div className="divide-y divide-border">
                  {results.map((r, i) => (
                    <div
                      key={i}
                      className={`flex flex-col md:flex-row md:items-center justify-between gap-4 px-6 py-5 ${
                        r.status === 'ELIGIBLE' ? 'bg-accent-soft' : ''
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <span className="font-mono text-[10px] text-muted-foreground w-6 shrink-0 mt-0.5">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-3">
                            <span className="font-display text-lg italic">{r.row.name}</span>
                            <span
                              className={`border px-2 py-0.5 font-mono text-[9px] uppercase font-bold ${
                                r.status === 'ELIGIBLE'
                                  ? 'border-accent text-accent'
                                  : r.status === 'CONDITIONAL'
                                  ? 'border-foreground/40 text-muted-foreground'
                                  : 'border-destructive/40 text-destructive'
                              }`}
                            >
                              {r.status}
                            </span>
                          </div>
                          <div className="font-mono text-[10px] text-muted-foreground">
                            {r.row.firNumber} • {r.daysServed} days served • Risk: {r.riskLevel}
                          </div>
                          <p className="font-mono text-[10px] text-muted-foreground max-w-xl leading-relaxed">
                            {r.primaryReason.slice(0, 120)}...
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0 self-start md:self-center">
                        {r.status === 'ELIGIBLE' ? (
                          <div className="flex items-center gap-2 border border-accent px-3 py-2 text-accent font-mono text-[10px] uppercase font-bold">
                            <CheckCircle2 className="size-3" />
                            File Immediately
                          </div>
                        ) : r.daysRemaining > 0 ? (
                          <div className="font-mono text-[10px] text-muted-foreground text-right">
                            <div className="font-bold text-foreground text-base">{r.daysRemaining}</div>
                            <div className="uppercase tracking-widest">days to threshold</div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </div>
    </ProtectedRoute>
  );
}
