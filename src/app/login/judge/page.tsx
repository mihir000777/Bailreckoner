'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Landmark, Lock, ShieldCheck, ArrowRight, UserCheck, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '@/lib/authContext';

export default function JudgeLoginPage() {
  const router = useRouter();
  const { loginAsJudge } = useAuth();

  const [judicialId, setJudicialId] = useState('');
  const [judgeName, setJudgeName] = useState('');
  const [passcode, setPasscode] = useState('');
  const [benchDistrict, setBenchDistrict] = useState('Bench #3 District & Sessions Court, Patna');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!judicialId.trim()) {
      setError('Please enter your Judicial Officer ID.');
      return;
    }
    loginAsJudge(judicialId.trim(), judgeName.trim() || undefined);
    router.push('/judge');
  };

  const handleDemoLogin = () => {
    loginAsJudge('JO-902', "Hon'ble Magistrate S. K. Gupta");
    router.push('/judge');
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-accent/20 flex flex-col justify-between">
      <main className="px-6 py-16">
        <div className="mx-auto max-w-md space-y-8">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-block border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.25em] text-emerald-400 font-bold">
              Government of India • e-Courts Judicial Authority Gateway
            </div>
            <h1 className="font-display text-4xl italic tracking-tight text-foreground">
              Judicial Officer SSO Login
            </h1>
            <p className="text-muted-foreground text-xs font-sans">
              Single sign-on for Chief Judicial Magistrates &amp; Sessions Judges for BNSS Section 479 reviews.
            </p>
          </div>

          {/* Form Card */}
          <div className="border border-border bg-folder p-6 sm:p-8 rounded-sm shadow-xl space-y-6">
            {error && (
              <div className="p-3 border border-rose-500/40 bg-rose-500/10 text-rose-300 font-mono text-xs flex items-center gap-2">
                <AlertCircle className="size-4 shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block uppercase text-muted-foreground mb-1 font-bold">
                  Assigned Judicial Bench *
                </label>
                <select
                  value={benchDistrict}
                  onChange={(e) => setBenchDistrict(e.target.value)}
                  className="w-full border border-input bg-background p-3 text-foreground focus:border-accent focus:outline-none"
                >
                  <option value="Bench #3 District & Sessions Court, Patna">Bench #3 District &amp; Sessions Court, Patna</option>
                  <option value="City Civil & Sessions Court, Mumbai">City Civil &amp; Sessions Court, Mumbai</option>
                  <option value="Tis Hazari Courts Complex, Delhi">Tis Hazari Courts Complex, Delhi</option>
                  <option value="Principal Sessions Court, Chennai">Principal Sessions Court, Chennai</option>
                </select>
              </div>

              <div>
                <label className="block uppercase text-muted-foreground mb-1 font-bold">
                  Judicial Officer ID (JO-Code) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. JO-902 or JO-PAT-4401"
                  value={judicialId}
                  onChange={(e) => setJudicialId(e.target.value)}
                  className="w-full border border-input bg-background p-3 text-foreground focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block uppercase text-muted-foreground mb-1 font-bold">
                  Judicial Officer Full Title &amp; Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Hon'ble Magistrate S. K. Gupta"
                  value={judgeName}
                  onChange={(e) => setJudgeName(e.target.value)}
                  className="w-full border border-input bg-background p-3 text-foreground font-sans focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block uppercase text-muted-foreground mb-1 font-bold">
                  Digital Signature Passcode
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full border border-input bg-background p-3 text-foreground focus:border-accent focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-500 text-slate-950 py-3.5 font-mono text-xs uppercase tracking-widest font-bold hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2"
              >
                <span>Authenticate Judicial Credentials</span>
                <ArrowRight className="size-4" />
              </button>
            </form>

            <div className="relative py-2 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <span className="relative bg-folder px-3 font-mono text-[9px] text-muted-foreground uppercase">
                Instant Demo Access
              </span>
            </div>

            {/* 1-Click Demo Login */}
            <button
              onClick={handleDemoLogin}
              className="w-full border border-border bg-background py-3 text-center font-mono text-xs uppercase text-foreground font-bold hover:border-emerald-500 hover:text-emerald-400 transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="size-4 text-emerald-400" />
              <span>1-Click Demo Login (Magistrate S. K. Gupta JO-902)</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
