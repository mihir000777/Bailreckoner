'use client';

import React from 'react';
import { UserRole } from '@/types/legal';
import { Shield, Scale, User, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface RoleSwitcherProps {
  currentRole?: UserRole;
  onRoleChange?: (role: UserRole) => void;
}

export const RoleSwitcher: React.FC<RoleSwitcherProps> = ({ currentRole, onRoleChange }) => {
  const pathname = usePathname();

  let activeRole: UserRole = 'prisoner';
  if (pathname.startsWith('/lawyer')) activeRole = 'lawyer';
  else if (pathname.startsWith('/judge')) activeRole = 'judge';
  else if (currentRole) activeRole = currentRole;

  const roles: { role: UserRole; label: string; icon: any; href: string; color: string }[] = [
    {
      role: 'prisoner',
      label: 'Undertrial Prisoner',
      icon: User,
      href: '/prisoner',
      color: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    },
    {
      role: 'lawyer',
      label: 'Legal Aid Lawyer',
      icon: Shield,
      href: '/lawyer',
      color: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
    },
    {
      role: 'judge',
      label: 'Judicial Authority',
      icon: Scale,
      href: '/judge',
      color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    },
  ];

  return (
    <div className="flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
      {roles.map((r) => {
        const Icon = r.icon;
        const isActive = activeRole === r.role;
        return (
          <Link
            key={r.role}
            href={r.href}
            onClick={() => onRoleChange && onRoleChange(r.role)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              isActive
                ? `${r.color} shadow-sm border`
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{r.label}</span>
            {isActive && <CheckCircle2 className="w-3 h-3 text-emerald-400 ml-0.5" />}
          </Link>
        );
      })}
    </div>
  );
};
