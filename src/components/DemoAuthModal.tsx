'use client';

import React from 'react';
import { useAuth, DEMO_USERS } from '@/lib/authContext';
import { UserRole } from '@/types/legal';
import { Shield, Scale, User, CheckCircle2, Lock, X, KeyRound } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const DemoAuthModal: React.FC = () => {
  const { user, switchUserRole, isAuthModalOpen, setIsAuthModalOpen } = useAuth();
  const router = useRouter();

  if (!isAuthModalOpen) return null;

  const handleSelectRole = (role: UserRole) => {
    switchUserRole(role);
    setIsAuthModalOpen(false);
    if (role === 'prisoner') router.push('/prisoner/wizard');
    else if (role === 'lawyer') router.push('/lawyer');
    else if (role === 'judge') router.push('/judge');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-card rounded-2xl p-6 sm:p-8 max-w-lg w-full border border-slate-700 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100">Role-Based Access Control Demo</h3>
              <p className="text-xs text-slate-400">Select pre-seeded demo credentials for judge evaluation</p>
            </div>
          </div>

          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {Object.values(DEMO_USERS).map((u) => {
            const isSelected = u.role === user.role;
            return (
              <div
                key={u.role}
                onClick={() => handleSelectRole(u.role)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500/50 shadow-md'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${u.avatarColor} flex items-center justify-center text-slate-950 font-bold text-sm shadow-md`}>
                    {u.role === 'prisoner' && <User className="w-5 h-5" />}
                    {u.role === 'lawyer' && <Shield className="w-5 h-5" />}
                    {u.role === 'judge' && <Scale className="w-5 h-5" />}
                  </div>

                  <div>
                    <div className="text-sm font-bold text-slate-100">{u.name}</div>
                    <div className="text-xs font-semibold text-amber-300">{u.badge}</div>
                    <div className="text-[11px] text-slate-400">{u.jurisdiction}</div>
                  </div>
                </div>

                {isSelected && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
              </div>
            );
          })}
        </div>

        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
          <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Security Note: System complies with ICJS role-based permission specifications.</span>
        </div>
      </div>
    </div>
  );
};
