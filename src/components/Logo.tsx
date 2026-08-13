'use client';

import React from 'react';
import Image from 'next/image';

interface LogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export function Logo({ size = 32, className = '', showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className="relative overflow-hidden rounded-xl border border-accent/40 bg-accent/10 p-0.5 shadow-md transition-transform hover:scale-105 shrink-0"
        style={{ width: size, height: size }}
      >
        <img
          src="/logo.png"
          alt="Bail Reckoner Logo"
          className="h-full w-full object-cover rounded-lg"
        />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className="font-display text-2xl italic leading-none tracking-tight text-foreground">
            Bail Reckoner
          </span>
          <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
            Registry Division
          </span>
        </div>
      )}
    </div>
  );
}
