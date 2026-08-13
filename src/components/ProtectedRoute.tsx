'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/authContext';
import { UserRole } from '@/types/legal';
import { Lock, ShieldAlert, ArrowRight, Sparkles, Scale, Landmark } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole: UserRole;
  fallbackTitle?: string;
  fallbackDescription?: string;
}

export function ProtectedRoute({
  children,
  requiredRole,
  fallbackTitle,
  fallbackDescription,
}: ProtectedRouteProps) {
  const { user, isAuthenticated, loginAsLawyer, loginAsJudge } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center font-mono text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 animate-spin text-accent" />
          <span>Verifying Judicial Authentication &amp; Credentials...</span>
        </div>
      </div>
    );
  }

  const isAuthorized = isAuthenticated && user.role === requiredRole;

  if (!isAuthorized) {
    const roleTitle = requiredRole === 'lawyer' ? 'Advocate / Legal Aid Counsel' : requiredRole === 'judge' ? 'Judicial Bench Magistrate' : 'Undertrial / Applicant';
    const loginPath = requiredRole === 'lawyer' ? '/login/lawyer' : requiredRole === 'judge' ? '/login/judge' : '/login';
    const roleIcon = requiredRole === 'lawyer' ? <Scale className="w-8 h-8 text-accent" /> : <Landmark className="w-8 h-8 text-emerald-400" />;

    return (
      <div className="min-h-[75vh] flex items-center justify-center px-6 py-16 bg-background font-sans text-foreground">
        <div className="w-full max-w-xl border border-rose-500/30 bg-card p-8 md:p-12 rounded-3xl text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto shadow-md">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-3">
            <div className="inline-block border border-rose-500/40 bg-rose-500/10 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-rose-400 font-bold">
              SECURITY ACCESS RESTRICTION • HTTP 403 UNAUTHORIZED
            </div>
            <h2 className="font-display text-4xl italic text-foreground">
              {fallbackTitle || `${roleTitle} Authentication Required`}
            </h2>
            <p className="text-sm text-muted-foreground font-sans leading-relaxed max-w-md mx-auto">
              {fallbackDescription ||
                `You are currently logged out or do not hold active ${roleTitle} credentials. Access to this judicial tool is restricted to authorized personnel.`}
            </p>
          </div>

          {/* Quick Authentication Actions */}
          <div className="p-6 rounded-2xl bg-background border border-border space-y-4 font-mono text-xs">
            <span className="text-muted-foreground uppercase font-bold text-[10px] block">
              Authorized Action Required:
            </span>

            {requiredRole === 'lawyer' && (
              <button
                type="button"
                onClick={() => loginAsLawyer('DLSA-882', 'Adv. Rajesh Sharma')}
                className="w-full py-3.5 px-6 rounded-xl bg-accent text-accent-foreground font-bold hover:bg-accent/90 transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>1-Click Authenticate as Adv. Rajesh Sharma</span>
              </button>
            )}

            {requiredRole === 'judge' && (
              <button
                type="button"
                onClick={() => loginAsJudge('JO-902', "Hon'ble Magistrate S. K. Gupta")}
                className="w-full py-3.5 px-6 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>1-Click Authenticate as Hon'ble Magistrate S. K. Gupta</span>
              </button>
            )}

            <Link
              href={loginPath}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-accent font-bold underline transition-colors"
            >
              <span>Proceed to Official {roleTitle} Sign In Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
