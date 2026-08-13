import type { Metadata } from 'next';
import './globals.css';
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import { AuthProvider } from '@/lib/authContext';

export const metadata: Metadata = {
  title: 'Bail Reckoner — Statutory Bail Computation for Indian Courts (SIH268405)',
  description:
    'A computational framework for bail eligibility, legal aid allotment and remand audit under BNSS 2023 Section 479 & IPC/BNS framework.',
  icons: {
    icon: '/icon.png',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-accent/20 transition-colors duration-300">
        <AuthProvider>
          <SiteNav />
          <main className="flex-grow">{children}</main>
          <SiteFooter />
        </AuthProvider>
      </body>
    </html>
  );
}
