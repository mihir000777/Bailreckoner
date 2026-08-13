'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole } from '@/types/legal';
import { Language, translations, Translations } from '@/lib/i18n';

export type Theme = 'dark' | 'light';

export interface DemoUser {
  role: UserRole;
  name: string;
  badge: string;
  jurisdiction: string;
  avatarColor: string;
}

export const DEMO_USERS: Record<UserRole, DemoUser> = {
  prisoner: {
    role: 'prisoner',
    name: 'Ramesh Kumar (Representing Undertrial)',
    badge: 'Prisoner ID: #UT-4092',
    jurisdiction: 'Central Jail Patna',
    avatarColor: 'from-amber-400 to-amber-600',
  },
  lawyer: {
    role: 'lawyer',
    name: 'Adv. Rajesh Sharma',
    badge: 'DLSA Panel Advocate #DLSA-882',
    jurisdiction: 'District Court Patna / Greater Mumbai',
    avatarColor: 'from-blue-400 to-blue-600',
  },
  judge: {
    role: 'judge',
    name: "Hon'ble Magistrate S. K. Gupta",
    badge: 'Judicial Officer #JO-902',
    jurisdiction: 'Bench #3 District & Sessions Court',
    avatarColor: 'from-emerald-400 to-emerald-600',
  },
};

interface AuthContextType {
  user: DemoUser;
  switchUserRole: (role: UserRole) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  
  // Real Login Auth Methods
  isAuthenticated: boolean;
  loginAsLawyer: (barNo: string, name?: string) => void;
  loginAsJudge: (judicialId: string, name?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<DemoUser>(DEMO_USERS.prisoner);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [language, setLanguageState] = useState<Language>('en');
  const [theme, setThemeState] = useState<Theme>('dark');

  useEffect(() => {
    const savedRole = localStorage.getItem('bail_reckoner_role') as UserRole;
    const authSession = localStorage.getItem('bail_reckoner_auth_session');
    
    if (authSession === 'true') {
      setIsAuthenticated(true);
    }

    if (savedRole && DEMO_USERS[savedRole]) {
      setUser(DEMO_USERS[savedRole]);
    }

    const savedLang = localStorage.getItem('bail_reckoner_lang') as Language;
    if (savedLang && translations[savedLang]) {
      setLanguageState(savedLang);
    }

    const savedTheme = localStorage.getItem('bail_reckoner_theme') as Theme;
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setThemeState(savedTheme);
      applyThemeClass(savedTheme);
    } else {
      applyThemeClass('dark');
    }
  }, []);

  const applyThemeClass = (t: Theme) => {
    const root = document.documentElement;
    if (t === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
  };

  const switchUserRole = (role: UserRole) => {
    const newUser = DEMO_USERS[role];
    setUser(newUser);
    localStorage.setItem('bail_reckoner_role', role);
  };

  const loginAsLawyer = (barNo: string, name?: string) => {
    const lawyerUser: DemoUser = {
      role: 'lawyer',
      name: name || 'Adv. Rajesh Sharma',
      badge: `DLSA Bar Council #${barNo || 'DLSA-882'}`,
      jurisdiction: 'District Court Patna / Greater Mumbai',
      avatarColor: 'from-blue-400 to-blue-600',
    };
    setUser(lawyerUser);
    setIsAuthenticated(true);
    localStorage.setItem('bail_reckoner_role', 'lawyer');
    localStorage.setItem('bail_reckoner_auth_session', 'true');
  };

  const loginAsJudge = (judicialId: string, name?: string) => {
    const judgeUser: DemoUser = {
      role: 'judge',
      name: name || "Hon'ble Magistrate S. K. Gupta",
      badge: `Judicial Officer #${judicialId || 'JO-902'}`,
      jurisdiction: 'Bench #3 District & Sessions Court',
      avatarColor: 'from-emerald-400 to-emerald-600',
    };
    setUser(judgeUser);
    setIsAuthenticated(true);
    localStorage.setItem('bail_reckoner_role', 'judge');
    localStorage.setItem('bail_reckoner_auth_session', 'true');
  };

  const logout = () => {
    setUser(DEMO_USERS.prisoner);
    setIsAuthenticated(false);
    localStorage.setItem('bail_reckoner_role', 'prisoner');
    localStorage.removeItem('bail_reckoner_auth_session');
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('bail_reckoner_lang', lang);
  };

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem('bail_reckoner_theme', t);
    applyThemeClass(t);
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  };

  const t = translations[language] || translations.en;

  return (
    <AuthContext.Provider
      value={{
        user,
        switchUserRole,
        isAuthModalOpen,
        setIsAuthModalOpen,
        language,
        setLanguage,
        t,
        theme,
        setTheme,
        toggleTheme,
        isAuthenticated,
        loginAsLawyer,
        loginAsJudge,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
