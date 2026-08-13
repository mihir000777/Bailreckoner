import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ThemeToggle } from "./ThemeToggle";

export function SiteNav() {
  return (
    <nav className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-border bg-background/80 px-6 py-4 backdrop-blur-md">
      <Link to="/" className="flex flex-col">
        <span className="font-display text-2xl italic leading-none tracking-tight">
          Bail Reckoner
        </span>
        <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
          Registry Division
        </span>
      </Link>

      <div className="flex items-center gap-6">
        <div className="hidden gap-8 font-mono text-[10px] uppercase tracking-widest text-muted-foreground lg:flex">
          <Link to="/bail-wizard" className="transition-colors hover:text-foreground">
            Bail Wizard
          </Link>
          <Link to="/legal-aid" className="transition-colors hover:text-foreground">
            Legal Aid
          </Link>
          <Link to="/judge-authority" className="transition-colors hover:text-foreground">
            Judge Authority
          </Link>
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-6 py-20">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-20 md:flex-row">
        <div className="max-w-sm">
          <div className="mb-6 font-display text-3xl italic">Bail Reckoner</div>
          <p className="text-xs uppercase leading-relaxed tracking-wider text-muted-foreground">
            An initiative by the Justice Digital Lab to provide open-access statutory tools for
            judicial practitioners. All algorithms are publicly auditable.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-20">
          <div className="space-y-4">
            <div className="font-mono text-[10px] uppercase tracking-widest text-foreground">
              Framework
            </div>
            <ul className="space-y-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <li>
                <Link to="/bail-wizard" className="hover:text-accent">
                  BNSS Guide
                </Link>
              </li>
              <li>
                <Link to="/bail-wizard" className="hover:text-accent">
                  Section 436A
                </Link>
              </li>
              <li>
                <Link to="/judge-authority" className="hover:text-accent">
                  District Sync
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <div className="font-mono text-[10px] uppercase tracking-widest text-foreground">
              Integrity
            </div>
            <ul className="space-y-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <li>
                <Link to="/judge-authority" className="hover:text-accent">
                  Audit Log
                </Link>
              </li>
              <li>
                <Link to="/legal-aid" className="hover:text-accent">
                  Defense Roster
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-accent">
                  Ethical AI
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-32 flex max-w-6xl items-center justify-between font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
        <span>© 2026 Justice Reckoner</span>
        <span>Secure Node: 88.0.21</span>
      </div>
    </footer>
  );
}

export function PortalHeader({
  ref: refCode,
  title,
  lede,
}: {
  ref: string;
  title: ReactNode;
  lede: string;
}) {
  return (
    <header className="border-b border-border px-6 pb-24 pt-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 inline-block border border-accent/40 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-accent">
          {refCode}
        </div>
        <h1 className="max-w-4xl text-balance font-display text-6xl italic leading-[0.9] tracking-tighter md:text-8xl">
          {title}
        </h1>
        <p className="mt-10 max-w-xl text-lg leading-relaxed text-muted-foreground">{lede}</p>
      </div>
    </header>
  );
}

export function PortalShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-accent/20">
      <SiteNav />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
