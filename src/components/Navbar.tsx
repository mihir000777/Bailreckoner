'use client';

import React from 'react';
import Link from 'next/link';
import { Scale, Languages, Sparkles, UserCheck, Sun, Moon } from 'lucide-react';
import { RoleSwitcher } from './RoleSwitcher';
import { Language } from '@/lib/i18n';
import { useAuth } from '@/lib/authContext';
import { DemoAuthModal } from './DemoAuthModal';

export const Navbar: React.FC = () => {
  const { user, setIsAuthModalOpen, language, setLanguage, theme, toggleTheme, t } = useAuth();

  return (
    <>
      {/* Top Official Government Banner */}
      <div className="bg-slate-950 text-slate-300 text-[11px] font-sans border-b border-slate-800/80 relative z-50">
        <div className="tricolor-bar" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-200">
              भारत सरकार | GOVERNMENT OF INDIA
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-amber-300 font-semibold hidden sm:inline">
              विधि एवं न्याय मंत्रालय | MINISTRY OF LAW & JUSTICE
            </span>
          </div>

          <div className="flex items-center gap-4 text-[10px] text-slate-400">
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-semibold hidden md:inline">
              ICJS / e-Courts Compliant Engine
            </span>
            <span className="hidden md:inline">•</span>
            <span className="text-slate-300 font-bold">SIH Problem ID: SIH268405</span>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 glass-panel border-b border-slate-800/90 shadow-2xl transition-colors duration-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-amber-800 flex items-center justify-center shadow-lg shadow-amber-900/30 group-hover:scale-105 transition-transform border border-amber-300/40">
              <Scale className="w-5 h-5 text-slate-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-slate-100 tracking-tight">
                  Bail<span className="gold-gradient-text">Reckoner</span>
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  SIH268405
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden md:block">
                BNSS 2023 Sec 479 & IPC/BNS Undertrial Bail Decision Engine
              </p>
            </div>
          </Link>

          {/* Center: Role Switcher */}
          <div className="hidden lg:flex items-center">
            <RoleSwitcher />
          </div>

          {/* Right Controls: Theme Toggle + Active Demo User + Language Selector + CTA */}
          <div className="flex items-center gap-2.5">
            {/* Dark/Light Mode Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 text-amber-400 transition-all shadow-sm flex items-center justify-center"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Active User Badge & Auth Switcher Trigger */}
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 text-xs transition-all shadow-sm"
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              <div className="text-left">
                <span className="font-bold text-slate-200 block line-clamp-1">{user.name}</span>
                <span className="text-[9px] text-amber-300 block font-semibold">{user.badge}</span>
              </div>
            </button>

            {/* i18n Language Selector */}
            <div className="relative flex items-center gap-1 bg-slate-900/90 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-300">
              <Languages className="w-3.5 h-3.5 text-amber-400" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="bg-transparent text-slate-200 font-semibold text-xs focus:outline-none cursor-pointer pr-1"
              >
                <option value="en" className="bg-slate-900 text-slate-100">English</option>
                <option value="hi" className="bg-slate-900 text-slate-100">हिन्दी (Hindi)</option>
                <option value="kn" className="bg-slate-900 text-slate-100">ಕನ್ನಡ (Kannada)</option>
                <option value="ta" className="bg-slate-900 text-slate-100">தமிழ் (Tamil)</option>
                <option value="te" className="bg-slate-900 text-slate-100">తెలుగు (Telugu)</option>
                <option value="mr" className="bg-slate-900 text-slate-100">मराठी (Marathi)</option>
              </select>
            </div>

            {/* Official Portal Login Button */}
            <Link
              href="/login"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-900/90 text-slate-200 hover:border-amber-500/50 hover:text-amber-400 font-mono text-xs transition-all"
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-bold">Official Login</span>
            </Link>

            <Link
              href="/prisoner/wizard"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md shadow-amber-900/20 hover:scale-105 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Check Eligibility</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      <DemoAuthModal />
    </>
  );
};
