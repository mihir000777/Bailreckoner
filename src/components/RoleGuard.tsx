'use client';

import React from 'react';
import { useAuth, DEMO_USERS } from '@/lib/authContext';
import { UserRole } from '@/types/legal';
import { Shield, Scale, User, Lock, ArrowRight, Sparkles, KeyRound } from 'lucide-react';
import Link from 'next/link';

interface RoleGuardProps {
  requiredRole: UserRole;
  children: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ requiredRole, children }) => {
  const { user, switchUserRole, setIsAuthModalOpen } = useAuth();

  if (user.role === requiredRole) {
    return <>{children}</>;
  }

  const targetDemoUser = DEMO_USERS[requiredRole];

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-amber-500/30 shadow-2xl space-y-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto shadow-lg shadow-amber-900/20">
          <Lock className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
            ICJS Role-Based Security Access Control
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
            Restricted {requiredRole === 'judge' ? 'Judicial Bench' : requiredRole === 'lawyer' ? 'Legal Aid' : 'Prisoner'} Access
          </h2>
          <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
            You are currently accessing this portal as <strong className="text-amber-400">{user.name}</strong> ({user.role.toUpperCase()} role). Accessing this section requires <strong>{requiredRole.toUpperCase()}</strong> credentials.
          </p>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-left max-w-md mx-auto space-y-3">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Required Demo Persona Credentials:
          </span>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${targetDemoUser.avatarColor} flex items-center justify-center text-slate-950 font-bold text-sm shadow-md`}>
              {requiredRole === 'prisoner' && <User className="w-5 h-5" />}
              {requiredRole === 'lawyer' && <Shield className="w-5 h-5" />}
              {requiredRole === 'judge' && <Scale className="w-5 h-5" />}
            </div>
            <div>
              <div className="text-xs font-bold text-slate-100">{targetDemoUser.name}</div>
              <div className="text-[11px] font-semibold text-amber-300">{targetDemoUser.badge}</div>
              <div className="text-[10px] text-slate-400">{targetDemoUser.jurisdiction}</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => switchUserRole(requiredRole)}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-900/20 transition-all"
          >
            <KeyRound className="w-4 h-4" />
            <span>Authenticate as {requiredRole.toUpperCase()} Persona</span>
          </button>

          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-900 text-slate-300 hover:text-slate-100 font-semibold text-xs border border-slate-800 transition-all"
          >
            <span>Select Persona</span>
          </button>
        </div>
      </div>
    </div>
  );
};
