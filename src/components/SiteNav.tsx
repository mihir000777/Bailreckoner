'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sun, Moon, Languages, Scale, Landmark, LogOut, UserCheck } from 'lucide-react';
import { useAuth } from '@/lib/authContext';
import { Language } from '@/lib/i18n';
import { Logo } from '@/components/Logo';

export function SiteNav() {
  const { theme, toggleTheme, language, setLanguage, t, user, isAuthenticated, logout } = useAuth();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-border bg-background/90 px-4 sm:px-6 py-3.5 backdrop-blur-md">
      <Link href="/" className="cursor-pointer">
        <Logo size={36} />
      </Link>

      <div className="flex items-center gap-4 sm:gap-6">
        <div className="hidden gap-6 font-mono text-[11px] uppercase tracking-widest text-muted-foreground lg:flex items-center">
          <Link
            href="/prisoner/wizard"
            className={`transition-colors hover:text-foreground ${pathname?.startsWith('/prisoner') ? 'text-accent font-bold' : ''}`}
          >
            {language === 'en' ? 'Bail Wizard' : t.checkEligibility}
          </Link>
          <Link
            href="/lawyer"
            className={`transition-colors hover:text-foreground ${pathname?.startsWith('/lawyer') ? 'text-accent font-bold' : ''}`}
          >
            {language === 'en' ? 'Legal Aid' : t.lawyerPortal}
          </Link>
          <Link
            href="/judge"
            className={`transition-colors hover:text-foreground ${pathname?.startsWith('/judge') ? 'text-accent font-bold' : ''}`}
          >
            {language === 'en' ? 'Judge Authority' : t.judgePortal}
          </Link>
        </div>

        {/* Dedicated Login Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {isAuthenticated ? (
            <div className="flex items-center gap-2 shrink-0">
              <div className="hidden md:flex items-center gap-2 border border-accent/40 bg-accent/10 px-3 py-1.5 rounded-lg font-mono text-[10px] shrink-0">
                <UserCheck className="w-3.5 h-3.5 text-accent shrink-0" />
                <span className="font-bold text-foreground truncate max-w-[140px] xl:max-w-[200px]">{user.name}</span>
                <span className="text-accent font-semibold">({user.role.toUpperCase()})</span>
              </div>
              <button
                type="button"
                onClick={logout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-muted-foreground hover:text-destructive hover:border-destructive text-[11px] font-mono font-bold transition-colors cursor-pointer shrink-0"
                title="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {/* Lawyer Login Button */}
              <Link
                href="/login/lawyer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-accent/40 bg-accent/10 text-accent hover:bg-accent hover:text-accent-foreground text-[11px] font-mono font-bold transition-all shadow-sm cursor-pointer"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>Lawyer Login</span>
              </Link>

              {/* Judge Login Button */}
              <Link
                href="/login/judge"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 text-[11px] font-mono font-bold transition-all shadow-sm cursor-pointer"
              >
                <Landmark className="w-3.5 h-3.5" />
                <span>Judge Login</span>
              </Link>
            </div>
          )}

          {/* Language Selector */}
          <div className="relative flex items-center gap-1 rounded-lg border border-input px-2 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <Languages className="size-3 text-accent shrink-0" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-transparent font-mono text-[10px] uppercase focus:outline-none cursor-pointer text-foreground"
            >
              <option value="en" className="bg-background text-foreground">EN</option>
              <option value="hi" className="bg-background text-foreground">HI (हिंदी)</option>
              <option value="kn" className="bg-background text-foreground">KN (ಕನ್ನಡ)</option>
              <option value="ta" className="bg-background text-foreground">TA (தமிழ்)</option>
              <option value="te" className="bg-background text-foreground">TE (తెలుగు)</option>
              <option value="mr" className="bg-background text-foreground">MR (मराठी)</option>
            </select>
          </div>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="group flex items-center gap-1.5 rounded-lg border border-input px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:border-accent hover:text-accent cursor-pointer"
          >
            {mounted && theme === 'dark' ? <Sun className="size-3" /> : <Moon className="size-3" />}
            <span className="hidden xl:inline">{mounted && theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
