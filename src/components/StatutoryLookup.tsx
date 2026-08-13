'use client';

import React, { useState } from 'react';
import { searchOffenses } from '@/lib/offenseDb';
import { Offense } from '@/types/legal';
import { Search, ArrowRight, ShieldCheck, AlertTriangle, Scale, Clock, Sparkles } from 'lucide-react';

import { useAuth } from '@/lib/authContext';

const POPULAR_SEARCHES = [
  { label: 'Cheating (IPC 420)', query: '420' },
  { label: 'Theft (IPC 379)', query: '379' },
  { label: 'Forgery (IPC 468)', query: '468' },
  { label: 'Cyber Crime', query: 'cyber' },
  { label: 'Hurt (IPC 323)', query: '323' },
];

export const StatutoryLookup: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedOffense, setSelectedOffense] = useState<Offense | null>(null);
  const { t } = useAuth();

  const results = searchOffenses(query).slice(0, 6);

  return (
    <section className="relative py-20 px-6 border-t border-border/60 bg-folder/30">
      <div className="mx-auto max-w-6xl space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent font-bold block mb-2">
              BNSS 2023 ↔ IPC 1860
            </span>
            <h2 className="font-display text-4xl italic">{t.statutoryLookupTitle}</h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground font-sans">
            {t.statutoryLookupDesc}
          </p>
        </div>

        {/* Search Bar & Quick Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedOffense(null);
              }}
              placeholder={t.searchOffensePlaceholder}
              className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground/60 font-mono text-sm focus:outline-none focus:border-accent transition-colors"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-muted-foreground hover:text-foreground"
              >
                CLEAR
              </button>
            )}
          </div>

          {/* Quick Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mr-2">
              Popular Lookups:
            </span>
            {POPULAR_SEARCHES.map((item) => (
              <button
                key={item.query}
                onClick={() => {
                  setQuery(item.query);
                  setSelectedOffense(null);
                }}
                className={`px-3 py-1 text-xs font-mono border rounded-full transition-all ${
                  query === item.query
                    ? 'border-accent bg-accent/10 text-accent font-bold'
                    : 'border-border bg-background text-muted-foreground hover:border-accent/40 hover:text-foreground'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((offense) => {
            const halfTermYears = (offense.maxSentenceYears / 2).toFixed(1);
            const oneThirdTermYears = (offense.maxSentenceYears / 3).toFixed(1);
            const isSelected = selectedOffense?.id === offense.id;

            return (
              <div
                key={offense.id}
                onClick={() => setSelectedOffense(isSelected ? null : offense)}
                className={`group cursor-pointer border p-5 transition-all duration-200 rounded-sm relative flex flex-col justify-between ${
                  isSelected
                    ? 'border-accent bg-accent/5 shadow-lg'
                    : 'border-border bg-background hover:border-accent/50 hover:bg-folder/50'
                }`}
              >
                <div className="space-y-3">
                  {/* Category & Section badges */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-accent uppercase tracking-wider">
                      {offense.category}
                    </span>
                    <span
                      className={`px-2 py-0.5 font-mono text-[9px] font-bold uppercase rounded border ${
                        offense.category === 'Bailable'
                          ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                          : 'border-rose-500/40 bg-rose-500/10 text-rose-400'
                      }`}
                    >
                      {offense.category === 'Bailable' ? 'Bailable' : 'Non-Bailable'}
                    </span>
                  </div>

                  {/* Code mapping banner */}
                  <div className="flex items-center gap-2 font-mono text-xs border border-border/80 bg-folder/80 p-2 rounded">
                    <span className="text-amber-400 font-bold">IPC {offense.ipcSection}</span>
                    <ArrowRight className="size-3 text-muted-foreground shrink-0" />
                    <span className="text-emerald-400 font-bold">BNS {offense.bnsSection}</span>
                  </div>

                  <h3 className="font-display text-lg italic text-foreground group-hover:text-accent transition-colors line-clamp-1">
                    {offense.title}
                  </h3>

                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {offense.description}
                  </p>
                </div>

                {/* Threshold Metrics */}
                <div className="mt-5 pt-4 border-t border-border/60 space-y-2 font-mono text-[10px]">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="size-3 text-accent" /> Max Punishment:
                    </span>
                    <span className="font-bold text-foreground">{offense.maxSentenceYears} Years</span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Scale className="size-3 text-emerald-400" /> 1/3 Threshold (1st Offence):
                    </span>
                    <span className="font-bold text-emerald-400">{oneThirdTermYears} Years</span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Sparkles className="size-3 text-amber-400" /> 1/2 Threshold (General):
                    </span>
                    <span className="font-bold text-amber-400">{halfTermYears} Years</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {results.length === 0 && (
          <div className="text-center py-12 border border-dashed border-border bg-background/50 p-6 rounded">
            <p className="font-mono text-sm text-muted-foreground">
              No matching sections found for "{query}". Try searching "420", "379", or "cyber".
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
