'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sun, Moon, Languages, Scale, Landmark, LogOut, UserCheck, Menu, X } from 'lucide-react';
import { useAuth } from '@/lib/authContext';
import { Language } from '@/lib/i18n';
import { Logo } from '@/components/Logo';

export function SiteNav() {
  const { theme, toggleTheme, language, setLanguage, t, user, isAuthenticated, logout } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile drawer when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="sticky top-0 z-50 flex w-full flex-col border-b border-border bg-background/95 backdrop-blur-md">
      <div className="flex w-full items-center justify-between px-4 sm:px-6 py-3">
        <Link href="/" className="cursor-pointer shrink-0">
          <Logo size={32} />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
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

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {/* Desktop Login Actions */}
          <div className="hidden sm:flex items-center gap-2">
            {isAuthenticated ? (
              <div className="flex items-center gap-2 shrink-0">
                <div className="hidden lg:flex items-center gap-2 border border-accent/40 bg-accent/10 px-3 py-1 rounded-lg font-mono text-[10px]">
                  <UserCheck className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span className="font-bold text-foreground truncate max-w-[120px]">{user.name}</span>
                </div>
                <button
                  type="button"
                  onClick={logout}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-muted-foreground hover:text-destructive hover:border-destructive text-[11px] font-mono font-bold transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login/lawyer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-accent/40 bg-accent/10 text-accent hover:bg-accent hover:text-accent-foreground text-[11px] font-mono font-bold transition-all shadow-sm cursor-pointer"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Lawyer Login</span>
                </Link>
                <Link
                  href="/login/judge"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 text-[11px] font-mono font-bold transition-all shadow-sm cursor-pointer"
                >
                  <Landmark className="w-3.5 h-3.5" />
                  <span>Judge Login</span>
                </Link>
              </div>
            )}
          </div>

          {/* Language Selector (Always visible) */}
          <div className="relative flex items-center gap-1 rounded-lg border border-input px-2 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <Languages className="size-3.5 text-accent shrink-0" />
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
            className="flex items-center justify-center p-2 rounded-lg border border-input text-muted-foreground hover:border-accent hover:text-accent transition-colors cursor-pointer"
          >
            {mounted && theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>

          {/* Mobile Hamburger Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center p-2 rounded-lg border border-border bg-card text-foreground cursor-pointer ml-1"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="size-5 text-accent" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card p-4 space-y-4 animate-in slide-in-from-top-2 duration-200 shadow-2xl">
          {/* Mobile Navigation Links */}
          <div className="flex flex-col space-y-2 font-mono text-xs uppercase tracking-wider">
            <Link
              href="/prisoner/wizard"
              className={`p-3 rounded-lg border transition-colors ${
                pathname?.startsWith('/prisoner') ? 'border-accent bg-accent/10 text-accent font-bold' : 'border-border bg-background/50 text-foreground'
              }`}
            >
              ⚡ {language === 'en' ? 'Bail Eligibility Wizard' : t.checkEligibility}
            </Link>
            <Link
              href="/lawyer"
              className={`p-3 rounded-lg border transition-colors ${
                pathname?.startsWith('/lawyer') ? 'border-accent bg-accent/10 text-accent font-bold' : 'border-border bg-background/50 text-foreground'
              }`}
            >
              ⚖️ {language === 'en' ? 'Legal Aid & Advocate Portal' : t.lawyerPortal}
            </Link>
            <Link
              href="/judge"
              className={`p-3 rounded-lg border transition-colors ${
                pathname?.startsWith('/judge') ? 'border-accent bg-accent/10 text-accent font-bold' : 'border-border bg-background/50 text-foreground'
              }`}
            >
              🏛️ {language === 'en' ? 'Judicial Oversight Bench' : t.judgePortal}
            </Link>
          </div>

          {/* Mobile Login Buttons */}
          <div className="pt-2 border-t border-border/60 space-y-2">
            {isAuthenticated ? (
              <div className="space-y-2 font-mono text-xs">
                <div className="p-3 rounded-lg border border-accent/40 bg-accent/10 flex items-center justify-between text-foreground">
                  <span className="font-bold">{user.name}</span>
                  <span className="text-accent font-bold uppercase">({user.role})</span>
                </div>
                <button
                  type="button"
                  onClick={logout}
                  className="w-full flex items-center justify-center gap-2 p-3 rounded-lg border border-destructive bg-destructive/10 text-destructive font-bold cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                <Link
                  href="/login/lawyer"
                  className="flex items-center justify-center gap-2 p-3 rounded-lg border border-accent/40 bg-accent/10 text-accent font-bold cursor-pointer text-center"
                >
                  <Scale className="w-4 h-4" />
                  <span>Lawyer Login</span>
                </Link>
                <Link
                  href="/login/judge"
                  className="flex items-center justify-center gap-2 p-3 rounded-lg border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-bold cursor-pointer text-center"
                >
                  <Landmark className="w-4 h-4" />
                  <span>Judge Login</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
