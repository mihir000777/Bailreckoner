'use client';

import React, { useState } from 'react';
import { useAuth, DEMO_USERS } from '@/lib/authContext';
import { UserRole } from '@/types/legal';
import { Shield, Scale, User, ChevronUp, ChevronDown, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const FloatingPersonaDock: React.FC = () => {
  const { user, switchUserRole } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  const handleSelectRole = (role: UserRole) => {
    switchUserRole(role);
    if (role === 'prisoner') router.push('/prisoner/wizard');
    else if (role === 'lawyer') router.push('/lawyer');
    else if (role === 'judge') router.push('/judge');
  };

  return (
    <div className="fixed bottom-4 right-6 z-40 hidden md:block">
      <div className="border border-border bg-card shadow-2xl rounded-lg overflow-hidden backdrop-blur-xl transition-all">
        {/* Dock Header Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-4 py-2.5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors w-full cursor-pointer"
        >
          <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <div className="flex items-center gap-2">
            <span>Jury Dock:</span>
            <span className="font-bold text-accent">{user.role}</span>
          </div>
          {isExpanded ? <ChevronDown className="size-3 text-muted-foreground" /> : <ChevronUp className="size-3 text-muted-foreground" />}
        </button>

        {/* Expanded Role Selection Dock */}
        {isExpanded && (
          <div className="p-3 border-t border-border bg-background space-y-2 font-mono text-xs w-64">
            <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest px-1">
              Select Evaluator Persona:
            </div>

            <div className="space-y-1">
              {(['prisoner', 'lawyer', 'judge'] as UserRole[]).map((r) => {
                const isSelected = r === user.role;
                const demoUser = DEMO_USERS[r];

                return (
                  <button
                    key={r}
                    onClick={() => handleSelectRole(r)}
                    className={`flex items-center justify-between gap-2.5 w-full p-2 border text-left transition-all ${
                      isSelected
                        ? 'border-accent bg-accent-soft text-accent font-bold'
                        : 'border-border bg-card text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {r === 'prisoner' && <User className="size-3 text-accent shrink-0" />}
                      {r === 'lawyer' && <Shield className="size-3 text-accent shrink-0" />}
                      {r === 'judge' && <Scale className="size-3 text-accent shrink-0" />}

                      <div>
                        <div className="text-[11px] font-bold leading-none">{demoUser.name}</div>
                        <div className="text-[8px] opacity-60 mt-0.5">{demoUser.badge}</div>
                      </div>
                    </div>

                    {isSelected && <Sparkles className="size-3 text-accent shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
