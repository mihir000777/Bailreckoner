'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, XCircle, FileText, Download } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { ProtectedRoute } from '@/components/ProtectedRoute';

interface SignedOrder {
  orderNumber: string;
  prisonerName: string;
  firNumber: string;
  district: string;
  decision: 'GRANTED' | 'REJECTED';
  notes: string;
  date: string;
  timestamp: number;
}

function exportCSV(orders: SignedOrder[]) {
  const headers = ['Order No.', 'Prisoner Name', 'FIR', 'District', 'Decision', 'Date', 'Notes'];
  const rows = orders.map((o) => [
    o.orderNumber, o.prisonerName, o.firNumber, o.district, o.decision, o.date, `"${o.notes.replace(/"/g, "'")}"`
  ]);
  const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `judicial-orders-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
}

export default function JudgeOrdersPage() {
  const [orders, setOrders] = useState<SignedOrder[]>([]);
  const [filterDecision, setFilterDecision] = useState<'ALL' | 'GRANTED' | 'REJECTED'>('ALL');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('bail_reckoner_orders');
      if (stored) setOrders(JSON.parse(stored));
    } catch { /* ignore */ }
  }, []);

  const filtered = orders.filter((o) => filterDecision === 'ALL' || o.decision === filterDecision);
  const granted = orders.filter((o) => o.decision === 'GRANTED').length;
  const rejected = orders.filter((o) => o.decision === 'REJECTED').length;

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
              Portal 03 / Judicial Oversight
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <h1 className="max-w-4xl font-display text-6xl italic leading-[0.9] tracking-tighter md:text-8xl">
                Order <span className="text-accent">Registry</span>.
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Immutable append-only audit log of all judicial orders passed under BNSS 479. Every decision, timestamped and traceable.
              </p>
            </div>
            {orders.length > 0 && (
              <button
                onClick={() => exportCSV(orders)}
                className="group flex items-center gap-2 border border-input px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:border-accent hover:text-accent transition-colors self-start sm:self-auto"
              >
                <Download className="size-3" />
                Export Audit Log
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Stats Banner */}
      <section className="border-b border-border bg-folder px-6 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-3 gap-px bg-border">
            {[
              ['Total Orders', orders.length],
              ['Releases Granted', granted],
              ['Releases Refused', rejected],
            ].map(([label, count]) => (
              <div key={String(label)} className="bg-folder p-6 space-y-2">
                <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground block">{label}</span>
                <div className="font-display text-4xl italic text-folder-foreground">{count}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter + Table */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl space-y-8">
          {/* Filter */}
          <div className="flex items-center justify-between border-b border-border pb-6">
            <h2 className="font-display text-3xl italic">Signed Orders</h2>
            <div className="flex gap-2 font-mono text-[10px] uppercase tracking-widest">
              {(['ALL', 'GRANTED', 'REJECTED'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilterDecision(f)}
                  className={`border px-3 py-1.5 transition-colors ${
                    filterDecision === f
                      ? 'border-accent text-accent font-bold'
                      : 'border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="border border-border bg-folder p-16 text-center space-y-4">
              <FileText className="size-10 mx-auto text-muted-foreground opacity-40" />
              <p className="font-display text-2xl italic text-muted-foreground">No orders recorded yet.</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Pass an order from the <Link href="/judge" className="text-accent hover:underline">Judge Authority</Link> dashboard to populate this registry.
              </p>
            </div>
          ) : (
            <div className="border border-border divide-y divide-border">
              {filtered.map((order, i) => (
                <Reveal key={order.orderNumber} delay={i * 60}>
                  <div className="px-6 py-6 flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-mono text-[10px] text-accent font-bold">{order.orderNumber}</span>
                        <span className="font-mono text-[9px] text-muted-foreground">{order.firNumber}</span>
                        <span
                          className={`flex items-center gap-1.5 border px-2 py-0.5 font-mono text-[9px] uppercase font-bold ${
                            order.decision === 'GRANTED'
                              ? 'border-accent/50 text-accent'
                              : 'border-destructive/50 text-destructive'
                          }`}
                        >
                          {order.decision === 'GRANTED' ? (
                            <CheckCircle2 className="size-3" />
                          ) : (
                            <XCircle className="size-3" />
                          )}
                          {order.decision}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl italic">{order.prisonerName}</h3>
                      <p className="font-mono text-[10px] text-muted-foreground">{order.district}</p>
                      {order.notes && (
                        <p className="font-sans text-xs text-muted-foreground leading-relaxed max-w-xl italic">
                          &ldquo;{order.notes}&rdquo;
                        </p>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-mono text-[10px] text-muted-foreground">{order.date}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
    </ProtectedRoute>
  );
}
