'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Filter, Shield, FileText, Scale, Phone, CheckCircle2, Clock, MapPin, User, ArrowRight, Sparkles, Building, AlertCircle, Copy, Check, Lock, UserCheck, Gavel, LogOut } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { MOCK_LAWYER_CASES } from '@/data/mockCases';
import { UndertrialCase } from '@/types/legal';
import { evaluateBailEligibility } from '@/lib/legalEngine';
import { LegalAidScreener } from '@/components/LegalAidScreener';
import { DlsaClinicFinder } from '@/components/DlsaClinicFinder';

import { fetchAllCases, getLocalCases, saveCase, subscribeToDb } from '@/lib/db';
import { useAuth } from '@/lib/authContext';

interface LegalAidApplication {
  id: string;
  applicantName: string;
  phone: string;
  category: string;
  district: string;
  state: string;
  legalHelpType: string;
  firDetails?: string;
  assignedAdvocate?: string;
  status: 'RECEIVED' | 'SCRUTINY' | 'COUNSEL_ASSIGNED' | 'APPLICATION_FILED' | 'HEARING_SET';
  createdAt: string;
}

const INITIAL_APPLICATIONS: LegalAidApplication[] = [
  {
    id: 'DLSA-2026-PAT-9082',
    applicantName: 'Sunita Devi (Wife of Undertrial)',
    phone: '+91 98350 11223',
    category: 'Person in Custody (Sec 12g)',
    district: 'Patna',
    state: 'Bihar',
    legalHelpType: 'BNSS 479 Mandatory Bail Application',
    firDetails: 'FIR 142/2024 P.S. Patna Central',
    assignedAdvocate: 'Adv. Rajesh Sharma (DLSA Panel #882)',
    status: 'APPLICATION_FILED',
    createdAt: '2026-08-10',
  },
  {
    id: 'DLSA-2026-MUM-4120',
    applicantName: 'Anand Verma',
    phone: '+91 98201 44556',
    category: 'Annual Income < ₹3,00,000 (Sec 12h)',
    district: 'Greater Mumbai',
    state: 'Maharashtra',
    legalHelpType: 'Defense Counsel Allotment',
    firDetails: 'FIR 88/2024 P.S. Colaba',
    assignedAdvocate: 'Adv. Priya Deshmukh (DLSA Panel #412)',
    status: 'COUNSEL_ASSIGNED',
    createdAt: '2026-08-11',
  },
  {
    id: 'DLSA-2026-DEL-1049',
    applicantName: 'Meena Kumari (SC Community)',
    phone: '+91 99102 77889',
    category: 'Member of SC / ST Community (Sec 12b)',
    district: 'Central Delhi',
    state: 'Delhi',
    legalHelpType: 'Free Legal Aid & Protection Order',
    firDetails: 'FIR 301/2024 P.S. Daryaganj',
    assignedAdvocate: 'Pending Allotment',
    status: 'SCRUTINY',
    createdAt: '2026-08-12',
  },
];

const EMPANELLED_ADVOCATES = [
  {
    name: 'Adv. Rajesh Sharma',
    panelId: 'DLSA-PAT-882',
    court: 'District & Sessions Court, Patna',
    specialty: 'BNSS 479 Undertrial Bail Specialist',
    experienceYears: 14,
    activeCases: 18,
    phone: '+91 94310 99887',
  },
  {
    name: 'Adv. Priya Deshmukh',
    panelId: 'DLSA-MUM-412',
    court: 'City Civil & Sessions Court, Mumbai',
    specialty: 'Cyber Crime & Economic Offenses',
    experienceYears: 11,
    activeCases: 14,
    phone: '+91 98200 33445',
  },
  {
    name: 'Adv. Suresh K. Nair',
    panelId: 'DLSA-CHE-109',
    court: 'High Court Legal Services, Chennai',
    specialty: 'Crimes Against Women & SC/ST Act',
    experienceYears: 16,
    activeCases: 22,
    phone: '+91 94440 12345',
  },
  {
    name: 'Adv. Harvinder Singh',
    panelId: 'DLSA-DEL-304',
    court: 'Tis Hazari Courts, Delhi',
    specialty: 'BNSS 480 Bailable Rights & Writs',
    experienceYears: 9,
    activeCases: 12,
    phone: '+91 98110 55667',
  },
];

export default function LawyerDashboardPage() {
  const { t, language, user, isAuthenticated, loginAsLawyer, logout } = useAuth();
  
  // 2 Portals: 'public' or 'advocate'
  const [portalMode, setPortalMode] = useState<'public' | 'advocate'>('public');

  // Public Portal Sub-Tabs
  const [publicTab, setPublicTab] = useState<'screener' | 'tracker' | 'clinics'>('screener');

  // Advocate Portal Sub-Tabs
  const [advocateTab, setAdvocateTab] = useState<'docket' | 'builder' | 'roster'>('docket');

  const [casesList, setCasesList] = useState<UndertrialCase[]>([]);
  const [applications, setApplications] = useState<LegalAidApplication[]>(INITIAL_APPLICATIONS);

  // Tracking Widget State
  const [searchTrackingId, setSearchTrackingId] = useState('DLSA-2026-PAT-9082');
  const [trackedApp, setTrackedApp] = useState<LegalAidApplication | null>(INITIAL_APPLICATIONS[0]);
  const [trackingError, setTrackingError] = useState('');

  // Public Request Modal State
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Person in Custody (Sec 12g)');
  const [district, setDistrict] = useState('Patna');
  const [state, setState] = useState('Bihar');
  const [legalHelpType, setLegalHelpType] = useState('BNSS 479 Mandatory Bail Application');
  const [firDetails, setFirDetails] = useState('');
  const [newTrackingCode, setNewTrackingCode] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  // Docket Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const isLawyerLoggedIn = isAuthenticated && user.role === 'lawyer';

  useEffect(() => {
    async function loadCases() {
      const data = await fetchAllCases();
      setCasesList(data);
    }
    loadCases();

    const unsubscribe = subscribeToDb(() => {
      setCasesList(getLocalCases());
    });
    return unsubscribe;
  }, []);

  const handleTrackSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = searchTrackingId.trim().toUpperCase();
    const match = applications.find((a) => a.id.toUpperCase() === query);
    if (match) {
      setTrackedApp(match);
      setTrackingError('');
    } else {
      setTrackedApp(null);
      setTrackingError(`No application found for ID "${searchTrackingId}". Try searching "DLSA-2026-PAT-9082".`);
    }
  };

  const handlePublicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !phone) return;

    const trackingId = `DLSA-2026-${district.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newApp: LegalAidApplication = {
      id: trackingId,
      applicantName,
      phone,
      category: selectedCategory,
      district: district || 'Patna',
      state: state || 'Bihar',
      legalHelpType,
      firDetails: firDetails || 'FIR Details Pending',
      assignedAdvocate: 'DLSA Allotment Pending (Within 24 Hours)',
      status: 'RECEIVED',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setApplications([newApp, ...applications]);
    setNewTrackingCode(trackingId);
    setSearchTrackingId(trackingId);
    setTrackedApp(newApp);
  };

  const handleDemoLawyerLogin = () => {
    loginAsLawyer('DLSA-882', 'Adv. Rajesh Sharma');
    setPortalMode('advocate');
  };

  const evaluatedCases = casesList.map((c) => ({
    caseData: c,
    eligibility: evaluateBailEligibility(c),
  }));

  const filteredCases = evaluatedCases.filter(({ caseData, eligibility }) => {
    const matchesSearch =
      caseData.prisonerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseData.firNumber.toLowerCase().includes(searchQuery.toLowerCase());

    if (filterStatus === 'ALL') return matchesSearch;
    return matchesSearch && eligibility.status === filterStatus;
  });

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-accent/20">
      {/* Portal Top Header */}
      <header className="border-b border-border px-6 pb-12 pt-12 bg-card/30">
        <div className="mx-auto max-w-6xl space-y-6">
          
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-block border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-accent font-bold">
              {t.nalsaGovIndia}
            </div>
            <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
              <Phone className="size-3 text-amber-400" />
              <span>{t.nalsaHelpline}</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="max-w-4xl text-balance font-display text-5xl italic leading-[0.95] tracking-tighter md:text-6xl">
                {t.nationalFreeLegalAidTitle}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground font-sans">
                {t.nationalFreeLegalAidSub}
              </p>
            </div>

            {/* Portal Switcher Buttons */}
            <div className="flex items-center gap-2 bg-background border border-border p-1.5 rounded-xl shrink-0 self-start md:self-auto shadow-md">
              <button
                type="button"
                onClick={() => setPortalMode('public')}
                className={`px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  portalMode === 'public'
                    ? 'bg-foreground text-background shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>{t.publicPortalBtn}</span>
              </button>

              <button
                type="button"
                onClick={() => setPortalMode('advocate')}
                className={`px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  portalMode === 'advocate'
                    ? 'bg-accent text-accent-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Scale className="w-3.5 h-3.5" />
                <span>{t.advocatePortalBtn}</span>
                {isLawyerLoggedIn ? (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                ) : (
                  <Lock className="w-3 h-3 opacity-60" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* PORTAL 1: PUBLIC LEGAL AID PORTAL (OPEN TO PUBLIC CITIZENS) */}
      {/* ========================================================================= */}
      {portalMode === 'public' && (
        <section className="px-6 py-12">
          <div className="mx-auto max-w-6xl space-y-10">
            
            {/* Public Header Action Banner */}
            <div className="border border-border bg-card p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold">
                  {t.publicCitizenAccess}
                </span>
                <h3 className="font-bold text-lg text-foreground">
                  {t.freeLegalRepTitle}
                </h3>
                <p className="text-xs text-muted-foreground font-sans max-w-xl">
                  {t.freeLegalRepSub}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsRequestModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-accent text-accent-foreground font-mono text-xs uppercase tracking-wider font-bold hover:bg-accent/90 transition-opacity shadow-md cursor-pointer flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t.applyForFreeLawyerBtn}</span>
                </button>
              </div>
            </div>

            {/* Public Tab Navigation */}
            <div className="flex flex-wrap gap-2 border-b border-border pb-1 font-mono text-xs uppercase tracking-widest">
              <button
                type="button"
                onClick={() => setPublicTab('screener')}
                className={`px-4 py-2.5 font-bold transition-all border-b-2 cursor-pointer ${
                  publicTab === 'screener'
                    ? 'border-accent text-accent bg-accent/5'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {t.tabScreener}
              </button>
              <button
                type="button"
                onClick={() => setPublicTab('tracker')}
                className={`px-4 py-2.5 font-bold transition-all border-b-2 cursor-pointer ${
                  publicTab === 'tracker'
                    ? 'border-accent text-accent bg-accent/5'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {t.tabTracker}
              </button>
              <button
                type="button"
                onClick={() => setPublicTab('clinics')}
                className={`px-4 py-2.5 font-bold transition-all border-b-2 cursor-pointer ${
                  publicTab === 'clinics'
                    ? 'border-accent text-accent bg-accent/5'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {t.tabClinics}
              </button>
            </div>

            {/* Public Tab 1: Screener */}
            {publicTab === 'screener' && (
              <Reveal>
                <LegalAidScreener
                  onApplyClick={(cat) => {
                    setSelectedCategory(cat);
                    setIsRequestModalOpen(true);
                  }}
                />
              </Reveal>
            )}

            {/* Public Tab 2: Tracker */}
            {publicTab === 'tracker' && (
              <Reveal>
                <div className="border border-border bg-folder p-6 sm:p-8 space-y-8 rounded-2xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent font-bold block mb-1">
                        Public Application Tracking System
                      </span>
                      <h2 className="font-display text-2xl italic text-foreground">
                        Track Your DLSA Advocate Application Status
                      </h2>
                    </div>
                    <div className="font-mono text-[10px] text-muted-foreground">
                      Sample Code: <button onClick={() => { setSearchTrackingId('DLSA-2026-PAT-9082'); handleTrackSearch(); }} className="text-accent underline font-bold">DLSA-2026-PAT-9082</button>
                    </div>
                  </div>

                  <form onSubmit={handleTrackSearch} className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <input
                        type="text"
                        value={searchTrackingId}
                        onChange={(e) => setSearchTrackingId(e.target.value)}
                        placeholder="Enter DLSA Tracking Code (e.g. DLSA-2026-PAT-9082)..."
                        className="w-full pl-11 pr-4 py-3 bg-background border border-border text-foreground font-mono text-sm uppercase focus:outline-none focus:border-accent rounded-xl"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-foreground text-background px-6 py-3 font-mono text-xs uppercase tracking-widest font-bold hover:bg-accent hover:text-accent-foreground transition-colors rounded-xl cursor-pointer"
                    >
                      Track Status
                    </button>
                  </form>

                  {trackingError && (
                    <div className="p-4 border border-rose-500/40 bg-rose-500/10 text-rose-300 font-mono text-xs flex items-center gap-2 rounded-xl">
                      <AlertCircle className="size-4 shrink-0" />
                      {trackingError}
                    </div>
                  )}

                  {trackedApp && (
                    <div className="border border-border bg-background p-6 space-y-6 rounded-xl">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
                        <div>
                          <span className="font-mono text-xs font-bold text-accent tracking-widest block">
                            TRACKING ID: {trackedApp.id}
                          </span>
                          <h3 className="font-sans text-lg font-bold text-foreground mt-0.5">
                            {trackedApp.applicantName}
                          </h3>
                          <p className="font-mono text-[10px] text-muted-foreground">
                            Category: {trackedApp.category} • District: {trackedApp.district}, {trackedApp.state}
                          </p>
                        </div>

                        <div className="px-3 py-1.5 font-mono text-xs uppercase font-bold tracking-widest border border-accent/40 bg-accent/10 text-accent rounded-lg self-start sm:self-auto">
                          Status: {trackedApp.status.replace('_', ' ')}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground font-bold block">
                          Application Workflow Progress:
                        </span>

                        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 font-mono text-[10px]">
                          {[
                            { stage: 'RECEIVED', label: '1. Request Logged' },
                            { stage: 'SCRUTINY', label: '2. DLSA Scrutiny' },
                            { stage: 'COUNSEL_ASSIGNED', label: '3. Counsel Allotted' },
                            { stage: 'APPLICATION_FILED', label: '4. Bail Application Filed' },
                            { stage: 'HEARING_SET', label: '5. Court Hearing' },
                          ].map((s, idx) => {
                            const stagesOrder = ['RECEIVED', 'SCRUTINY', 'COUNSEL_ASSIGNED', 'APPLICATION_FILED', 'HEARING_SET'];
                            const currentIdx = stagesOrder.indexOf(trackedApp.status);
                            const isDone = idx <= currentIdx;

                            return (
                              <div
                                key={s.stage}
                                className={`p-3 border rounded-xl text-center transition-all ${
                                  isDone
                                    ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400 font-bold'
                                    : 'border-border bg-card text-muted-foreground opacity-60'
                                }`}
                              >
                                <div className="flex items-center justify-center gap-1 mb-1">
                                  {isDone ? <CheckCircle2 className="size-3.5 text-emerald-400" /> : <Clock className="size-3.5" />}
                                </div>
                                {s.label}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="border-t border-border pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
                        <div>
                          <span className="text-muted-foreground block text-[10px] uppercase">Assigned DLSA Defense Counsel:</span>
                          <span className="font-bold text-foreground text-sm">{trackedApp.assignedAdvocate}</span>
                        </div>

                        <div>
                          <span className="text-muted-foreground block text-[10px] uppercase">FIR Details:</span>
                          <span className="font-bold text-amber-400">{trackedApp.firDetails}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Reveal>
            )}

            {/* Public Tab 3: Clinics */}
            {publicTab === 'clinics' && (
              <Reveal>
                <DlsaClinicFinder />
              </Reveal>
            )}

            {/* Public Callout to Advocates */}
            <div className="border border-accent/40 bg-accent/10 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
              <div className="space-y-1">
                <span className="text-accent font-bold uppercase tracking-wider block">Empanelled Legal Aid Advocate?</span>
                <span className="text-muted-foreground">Switch to the Advocate Portal to access case builders, client dockets, and petition tools.</span>
              </div>
              <button
                type="button"
                onClick={() => setPortalMode('advocate')}
                className="px-5 py-2.5 rounded-xl bg-accent text-accent-foreground font-bold hover:bg-accent/90 transition-colors shrink-0 cursor-pointer"
              >
                Switch to Advocate Workspace →
              </button>
            </div>

          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* PORTAL 2: ADVOCATE / LAWYER PORTAL (GATED — REQUIRES ADVOCATE LOGIN) */}
      {/* ========================================================================= */}
      {portalMode === 'advocate' && (
        <section className="px-6 py-12">
          <div className="mx-auto max-w-6xl space-y-10">

            {/* IF NOT LOGGED IN AS LAWYER: SHOW LOGIN GATEWAY CARD */}
            {!isLawyerLoggedIn ? (
              <Reveal>
                <div className="border border-border bg-card p-8 md:p-12 rounded-3xl text-center space-y-6 max-w-3xl mx-auto shadow-2xl">
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/30 text-accent flex items-center justify-center mx-auto">
                    <Lock className="w-8 h-8" />
                  </div>

                  <div className="space-y-3">
                    <div className="inline-block border border-accent/40 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-accent font-bold">
                      Advocate Authentication Required
                    </div>
                    <h2 className="font-display text-4xl italic text-foreground">
                      Empanelled Advocate Workspace Locked
                    </h2>
                    <p className="text-sm text-muted-foreground max-w-xl mx-auto font-sans leading-relaxed">
                      This professional workspace is reserved for empanelled Legal Aid Advocates, DLSA Panel Lawyers, and Bar Council members to access client case dockets and auto-draft BNSS §479 writs.
                    </p>
                  </div>

                  {/* 1-Click Demo Login Action */}
                  <div className="p-6 rounded-2xl bg-background border border-border/80 space-y-4 max-w-md mx-auto">
                    <div className="font-mono text-xs text-muted-foreground uppercase font-bold">
                      Authenticate to Unlock Advocate Tools
                    </div>

                    <button
                      type="button"
                      onClick={handleDemoLawyerLogin}
                      className="w-full py-3.5 px-6 rounded-xl bg-accent text-accent-foreground font-mono text-xs uppercase tracking-wider font-bold hover:bg-accent/90 transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>1-Click Demo Login (Adv. Rajesh Sharma #882)</span>
                    </button>

                    <Link
                      href="/login/lawyer"
                      className="inline-block text-xs font-mono text-muted-foreground hover:text-accent underline"
                    >
                      Or enter custom Bar Enrollment Credentials →
                    </Link>
                  </div>
                </div>
              </Reveal>
            ) : (
              /* UNLOCKED ADVOCATE PORTAL FOR AUTHENTICATED LAWYERS */
              <div className="space-y-10">
                {/* Active Session Banner */}
                <div className="border border-emerald-500/40 bg-emerald-500/10 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-emerald-400 font-mono text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-300">
                      <UserCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-foreground text-sm block">{user.name}</span>
                      <span className="text-[11px] opacity-80">{user.badge} • {user.jurisdiction}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      href="/lawyer/tools/draft-builder"
                      className="px-4 py-2 rounded-xl bg-accent text-accent-foreground font-bold hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Launch Petition Builder</span>
                    </Link>
                    <button
                      type="button"
                      onClick={logout}
                      className="px-3 py-2 rounded-xl border border-rose-500/40 text-rose-400 hover:bg-rose-500/10 transition-colors font-bold cursor-pointer flex items-center gap-1.5"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>

                {/* Advocate Portal Sub-Tabs */}
                <div className="flex flex-wrap gap-2 border-b border-border pb-1 font-mono text-xs uppercase tracking-widest">
                  <button
                    type="button"
                    onClick={() => setAdvocateTab('docket')}
                    className={`px-4 py-2.5 font-bold transition-all border-b-2 cursor-pointer ${
                      advocateTab === 'docket'
                        ? 'border-accent text-accent bg-accent/5'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    01. Active Client Docket &amp; AI Briefs
                  </button>
                  <button
                    type="button"
                    onClick={() => setAdvocateTab('builder')}
                    className={`px-4 py-2.5 font-bold transition-all border-b-2 cursor-pointer ${
                      advocateTab === 'builder'
                        ? 'border-accent text-accent bg-accent/5'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    02. BNSS 479 Petition Builder Tool
                  </button>
                  <button
                    type="button"
                    onClick={() => setAdvocateTab('roster')}
                    className={`px-4 py-2.5 font-bold transition-all border-b-2 cursor-pointer ${
                      advocateTab === 'roster'
                        ? 'border-accent text-accent bg-accent/5'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    03. Empanelled DLSA Panel Roster
                  </button>
                </div>

                {/* Advocate Tab 1: Client Docket */}
                {advocateTab === 'docket' && (
                  <Reveal>
                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between border-b border-border pb-6 gap-4">
                        <div>
                          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent font-bold block mb-1">
                            Active Public Defense Cases
                          </span>
                          <h2 className="font-display text-3xl italic text-foreground">Client Case Docket Roster</h2>
                        </div>

                        <div className="flex items-center gap-4 font-mono text-xs">
                          <input
                            type="text"
                            placeholder="Search prisoner or FIR..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="border border-input bg-background px-3 py-2 text-foreground focus:border-accent focus:outline-none rounded-lg"
                          />
                          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                            {filteredCases.length} Client Cases
                          </span>
                        </div>
                      </div>

                      <ul className="divide-y divide-border border border-border bg-card rounded-2xl overflow-hidden">
                        {filteredCases.map(({ caseData, eligibility }) => (
                          <li key={caseData.id} className="hover:bg-accent/5 transition-colors">
                            <Link href={`/lawyer/case/${caseData.id}`} className="block p-4 sm:p-5">
                              <div className="grid grid-cols-2 gap-4 md:grid-cols-4 items-center">
                                <span className="font-mono text-xs tracking-widest text-accent font-bold">
                                  {caseData.firNumber}
                                </span>
                                <span className="text-sm font-sans font-semibold text-foreground">
                                  {caseData.prisonerName}
                                </span>
                                <span className="text-xs text-muted-foreground font-mono">
                                  {caseData.district}, {caseData.state}
                                </span>
                                <div className="text-right flex items-center justify-end gap-2 font-mono text-xs uppercase tracking-widest">
                                  <span
                                    className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                                      eligibility.status === 'ELIGIBLE'
                                        ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                                        : eligibility.status === 'CONDITIONAL'
                                        ? 'border-amber-500/40 bg-amber-500/10 text-amber-400'
                                        : 'border-rose-500/40 bg-rose-500/10 text-rose-400'
                                    }`}
                                  >
                                    {eligibility.status}
                                  </span>
                                  <span className="text-accent font-bold">View AI Case Brief →</span>
                                </div>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                )}

                {/* Advocate Tab 2: Petition Builder Tool Link */}
                {advocateTab === 'builder' && (
                  <Reveal>
                    <div className="border border-border bg-card p-8 rounded-3xl space-y-6 text-center max-w-2xl mx-auto shadow-xl">
                      <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/30 text-accent flex items-center justify-center mx-auto">
                        <Sparkles className="w-8 h-8" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-display text-3xl italic text-foreground">
                          BNSS Section 479 Petition &amp; Writ Builder
                        </h3>
                        <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                          Automated court petition formatter with Supreme Court citations library, statutory detention threshold math, and personal bond calculator.
                        </p>
                      </div>
                      <Link
                        href="/lawyer/tools/draft-builder"
                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-accent text-accent-foreground font-mono text-xs uppercase tracking-widest font-bold hover:bg-accent/90 transition-opacity shadow-lg cursor-pointer"
                      >
                        <span>Open Petition Builder Tool Workspace →</span>
                      </Link>
                    </div>
                  </Reveal>
                )}

                {/* Advocate Tab 3: DLSA Panel Roster */}
                {advocateTab === 'roster' && (
                  <Reveal>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-b border-border pb-4">
                        <div>
                          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent font-bold block mb-1">
                            NALSA Empanelled Panel Roster
                          </span>
                          <h2 className="font-display text-2xl italic text-foreground">
                            Empanelled Legal Aid Defense Counsels (LADC)
                          </h2>
                        </div>
                        <span className="font-mono text-xs text-muted-foreground">
                          4,512 Active Advocates Registered
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {EMPANELLED_ADVOCATES.map((adv, i) => (
                          <div
                            key={i}
                            className="border border-border bg-card p-5 space-y-3 rounded-2xl hover:border-accent/40 transition-colors flex flex-col justify-between"
                          >
                            <div className="space-y-2">
                              <span className="font-mono text-[9px] font-bold text-accent uppercase tracking-widest block">
                                {adv.panelId}
                              </span>
                              <h3 className="font-sans text-base font-bold text-foreground">
                                {adv.name}
                              </h3>
                              <p className="font-mono text-[10px] text-muted-foreground">
                                {adv.court}
                              </p>
                              <div className="inline-block px-2 py-0.5 border border-border bg-background text-accent font-mono text-[9px] font-bold uppercase rounded">
                                {adv.specialty}
                              </div>
                            </div>

                            <div className="pt-3 border-t border-border/60 space-y-2 font-mono text-[10px]">
                              <div className="flex items-center justify-between text-muted-foreground">
                                <span>Experience:</span>
                                <span className="font-bold text-foreground">{adv.experienceYears} Years</span>
                              </div>
                              <div className="flex items-center justify-between text-muted-foreground">
                                <span>Active Cases:</span>
                                <span className="font-bold text-emerald-400">{adv.activeCases} Undertrials</span>
                              </div>
                              <div className="flex items-center justify-between text-muted-foreground">
                                <span>Contact:</span>
                                <span className="font-bold text-amber-400">{adv.phone}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                )}
              </div>
            )}

          </div>
        </section>
      )}

      {/* Public Request Application Modal */}
      {isRequestModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-lg border border-border bg-card p-6 sm:p-8 shadow-2xl space-y-6 rounded-2xl text-foreground">
            <div className="flex items-center justify-between border-b border-border pb-4 font-mono text-xs uppercase">
              <span className="font-bold text-accent flex items-center gap-2">
                <Scale className="size-4" /> Apply for Free DLSA Advocate
              </span>
              <button
                onClick={() => {
                  setIsRequestModalOpen(false);
                  setNewTrackingCode('');
                }}
                className="text-muted-foreground hover:text-foreground font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {newTrackingCode ? (
              <div className="space-y-6 text-center py-4">
                <div className="size-16 border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center rounded-full">
                  <CheckCircle2 className="size-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-2xl italic text-foreground">
                    Legal Aid Application Submitted!
                  </h3>
                  <p className="text-xs text-muted-foreground font-sans">
                    Your request has been forwarded to the District Legal Services Authority (DLSA) Secretary. An empanelled public defense counsel will be assigned within 24 hours.
                  </p>
                </div>

                <div className="p-4 border border-accent/40 bg-accent/10 rounded-xl font-mono space-y-2">
                  <span className="text-[10px] uppercase text-muted-foreground block">Your Official DLSA Tracking Code:</span>
                  <div className="text-xl font-bold text-accent tracking-widest">{newTrackingCode}</div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(newTrackingCode);
                      setCopiedCode(true);
                      setTimeout(() => setCopiedCode(false), 3000);
                    }}
                    className="mt-2 inline-flex items-center gap-1.5 text-xs text-foreground bg-background border border-border px-3 py-1 font-bold hover:border-accent rounded-lg cursor-pointer"
                  >
                    {copiedCode ? <Check className="size-3 text-emerald-400" /> : <Copy className="size-3" />}
                    <span>{copiedCode ? 'Copied to Clipboard!' : 'Copy Code'}</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    setIsRequestModalOpen(false);
                    setPortalMode('public');
                    setPublicTab('tracker');
                  }}
                  className="w-full bg-foreground text-background py-3 font-mono text-xs uppercase tracking-widest font-bold hover:bg-accent hover:text-accent-foreground transition-colors rounded-xl cursor-pointer"
                >
                  Track Application Status Now →
                </button>
              </div>
            ) : (
              <form onSubmit={handlePublicSubmit} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block uppercase text-muted-foreground mb-1">Applicant / Prisoner Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar or Sunita Devi"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full border border-input bg-background p-3 text-foreground font-sans focus:border-accent focus:outline-none rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase text-muted-foreground mb-1">Phone / WhatsApp *</label>
                    <input
                      type="text"
                      required
                      placeholder="+91 98350 12345"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border border-input bg-background p-3 text-foreground font-sans focus:border-accent focus:outline-none rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block uppercase text-muted-foreground mb-1">District *</label>
                    <input
                      type="text"
                      required
                      placeholder="Patna / Mumbai / Delhi"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full border border-input bg-background p-3 text-foreground font-sans focus:border-accent focus:outline-none rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block uppercase text-muted-foreground mb-1">Section 12 Entitlement Category *</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full border border-input bg-background p-3 text-foreground font-sans focus:border-accent focus:outline-none rounded-xl"
                  >
                    <option value="Person in Custody (Sec 12g)">Person in Custody / Undertrial Prisoner (Sec 12g)</option>
                    <option value="Woman or Child (Sec 12a)">Woman or Child (Sec 12a)</option>
                    <option value="Member of SC / ST Community (Sec 12b)">Member of SC / ST Community (Sec 12b)</option>
                    <option value="Annual Income < ₹3,00,000 (Sec 12h)">Annual Income Below ₹3,00,000 (Sec 12h)</option>
                    <option value="Industrial Workman (Sec 12e)">Industrial Workman (Sec 12e)</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase text-muted-foreground mb-1">FIR Number &amp; Police Station Details</label>
                  <input
                    type="text"
                    placeholder="FIR 142/2024 P.S. Patna Central (optional)"
                    value={firDetails}
                    onChange={(e) => setFirDetails(e.target.value)}
                    className="w-full border border-input bg-background p-3 text-foreground font-sans focus:border-accent focus:outline-none rounded-xl"
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsRequestModalOpen(false)}
                    className="w-1/3 border border-border py-3 text-center font-mono text-xs uppercase text-muted-foreground rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 bg-accent text-accent-foreground py-3 text-center font-mono text-xs uppercase font-bold hover:bg-accent/90 rounded-xl cursor-pointer"
                  >
                    Submit Legal Aid Application →
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
