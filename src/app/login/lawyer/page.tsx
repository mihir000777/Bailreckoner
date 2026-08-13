'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Scale, Lock, ShieldCheck, ArrowRight, UserCheck, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '@/lib/authContext';

export default function LawyerLoginPage() {
  const router = useRouter();
  const { loginAsLawyer } = useAuth();

  const [barNumber, setBarNumber] = useState('');
  const [advocateName, setAdvocateName] = useState('');
  const [password, setPassword] = useState('');
  const [stateBarCouncil, setStateBarCouncil] = useState('Bihar Bar Council (Patna High Court)');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!barNumber.trim()) {
      setError('Please enter your Bar Council Enrollment Number.');
      return;
    }
    loginAsLawyer(barNumber.trim(), advocateName.trim() || undefined);
    router.push('/lawyer');
  };

  const handleDemoLogin = () => {
    loginAsLawyer('DLSA-882', 'Adv. Rajesh Sharma');
    router.push('/lawyer');
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-accent/20 flex flex-col justify-between">
      <main className="px-6 py-16">
        <div className="mx-auto max-w-md space-y-8">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-block border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.25em] text-accent font-bold">
              NALSA LADC Defense Counsel Gateway
            </div>
            <h1 className="font-display text-4xl italic tracking-tight text-foreground">
              Advocate Sign In
            </h1>
            <p className="text-muted-foreground text-xs font-sans">
              Enter your Bar Council Credentials or click 1-Click Demo Login to access client dossiers.
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
                  State Bar Council *
                </label>
                <select
                  value={stateBarCouncil}
                  onChange={(e) => setStateBarCouncil(e.target.value)}
                  className="w-full border border-input bg-background p-3 text-foreground focus:border-accent focus:outline-none"
                >
                  <option value="Bihar Bar Council (Patna High Court)">Bihar Bar Council (Patna High Court)</option>
                  <option value="Maharashtra & Goa Bar Council">Maharashtra &amp; Goa Bar Council</option>
                  <option value="Bar Council of Delhi">Bar Council of Delhi</option>
                  <option value="Bar Council of Tamil Nadu">Bar Council of Tamil Nadu</option>
                </select>
              </div>

              <div>
                <label className="block uppercase text-muted-foreground mb-1 font-bold">
                  Bar Enrollment / DLSA Panel No. *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. DLSA-882 or BR/1402/2018"
                  value={barNumber}
                  onChange={(e) => setBarNumber(e.target.value)}
                  className="w-full border border-input bg-background p-3 text-foreground focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block uppercase text-muted-foreground mb-1 font-bold">
                  Advocate Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Adv. Rajesh Sharma"
                  value={advocateName}
                  onChange={(e) => setAdvocateName(e.target.value)}
                  className="w-full border border-input bg-background p-3 text-foreground font-sans focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block uppercase text-muted-foreground mb-1 font-bold">
                  e-Courts Security PIN / Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-input bg-background p-3 text-foreground focus:border-accent focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-accent text-accent-foreground py-3.5 font-mono text-xs uppercase tracking-widest font-bold hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
              >
                <span>Authenticate Advocate Account</span>
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
              className="w-full border border-border bg-background py-3 text-center font-mono text-xs uppercase text-foreground font-bold hover:border-accent hover:text-accent transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="size-4 text-accent" />
              <span>1-Click Demo Login (Adv. Rajesh Sharma #882)</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
