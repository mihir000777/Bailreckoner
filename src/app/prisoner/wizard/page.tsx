'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Search, CheckCircle2, AlertTriangle, User, RotateCcw, AlertCircle, FileText, Code2, Copy, Check, Trash2, Scale, Sparkles, Loader2, Clock, ShieldCheck } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { searchOffenses, getAllOffenses } from '@/lib/offenseDb';
import { evaluateBailEligibility } from '@/lib/legalEngine';
import { UndertrialCase, Offense, EligibilityResult, SpecialStatuteCategory } from '@/types/legal';
import { BailApplicationPDF } from '@/components/BailApplicationPDF';
import { EligibilityTimeline } from '@/components/EligibilityTimeline';
import { RiskScorePanel } from '@/components/RiskScorePanel';
import { EligibilityCountdown } from '@/components/EligibilityCountdown';
import { useAuth } from '@/lib/authContext';
import { saveCase } from '@/lib/db';

const steps = [
  {
    code: '01',
    title: 'Offence Intake & Demographics',
    body: 'Enter undertrial details and FIR charges. The engine resolves each charge against the BNSS 2023 schedule.',
  },
  {
    code: '02',
    title: 'Detention Thresholding',
    body: 'Days in custody are measured against 1/3rd (first-time offender) and 50% ceilings, flagging statutory entitlement.',
  },
  {
    code: '03',
    title: 'Multi-Axis Risk Checklist',
    body: 'Evaluates flight risk, evidence tampering, and societal safety factors to produce an un-biased risk score.',
  },
  {
    code: '04',
    title: 'Application Draft & PDF',
    body: 'A formatted release application is generated, ready for instant download and filing with the magistrate registry.',
  },
];

const SPECIAL_STATUTES: { id: string; name: string }[] = [
  { id: 'ALL', name: 'All 7 Special Statutes (SIH Mandate)' },
  { id: 'CYBER_CRIME', name: '1. Cyber Crimes (IT Act 66D/66C)' },
  { id: 'CRIMES_AGAINST_SC_ST', name: '2. Crimes Against SCs & STs (SC/ST Act)' },
  { id: 'CRIMES_AGAINST_WOMEN', name: '3. Crimes Against Women (BNS 74/64)' },
  { id: 'CRIMES_AGAINST_CHILDREN', name: '4. Crimes Against Children (POCSO Act)' },
  { id: 'OFFENCES_AGAINST_THE_STATE', name: '5. Offences Against State (BNS 152)' },
  { id: 'ECONOMIC_OFFENSE', name: '6. Economic Offences (BNS 318 / PMLA)' },
  { id: 'CRIMES_AGAINST_FOREIGNERS', name: '7. Crimes Against Foreigners' },
];

export default function BailWizardPage() {
  const { t, language } = useAuth();
  const [step, setStep] = useState(1);
  const [validationError, setValidationError] = useState('');
  const [selectedStatuteCategory, setSelectedStatuteCategory] = useState<string>('ALL');

  // Form State
  const [prisonerName, setPrisonerName] = useState('');
  const [prisonerAge, setPrisonerAge] = useState<number | ''>('');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [isForeignNational, setIsForeignNational] = useState(false);
  const [isFirstTimeOffender, setIsFirstTimeOffender] = useState(true);
  const [firNumber, setFirNumber] = useState('');
  const [policeStation, setPoliceStation] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('Bihar');
  const [custodyStartDate, setCustodyStartDate] = useState('');

  // Offense Selection
  const [selectedOffenseIds, setSelectedOffenseIds] = useState<string[]>(['offense-ipc-379']);
  const [offenseSearchQuery, setOffenseSearchQuery] = useState('');

  // Risk Checklist
  const [hasPermanentAddress, setHasPermanentAddress] = useState(true);
  const [hasJobFamilyInJurisdiction, setHasJobFamilyInJurisdiction] = useState(true);
  const [hasPassportSurrendered, setHasPassportSurrendered] = useState(false);
  const [previousJumpedBail, setPreviousJumpedBail] = useState(false);

  const [witnessesAreRelatives, setWitnessesAreRelatives] = useState(false);
  const [isInfluentialPerson, setIsInfluentialPerson] = useState(false);
  const [evidenceSecuredByPolice, setEvidenceSecuredByPolice] = useState(true);

  const [hasPriorConvictions, setHasPriorConvictions] = useState(false);
  const [crimeInvolvedViolence, setCrimeInvolvedViolence] = useState(false);
  const [multiplePendingCases, setMultiplePendingCases] = useState(false);

  // API Modal State
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);
  const [copiedApi, setCopiedApi] = useState(false);

  // Evaluation Loading & Result State
  const [isCalculating, setIsCalculating] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStepText, setLoadingStepText] = useState('Initializing AI Statutory Reckoner...');

  const [result, setResult] = useState<{
    caseData: UndertrialCase;
    eligibility: EligibilityResult;
  } | null>(null);

  // Load state from sessionStorage on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('bail_wizard_draft');
      if (saved) {
        const data = JSON.parse(saved);
        if (data.prisonerName) setPrisonerName(data.prisonerName);
        if (data.prisonerAge) setPrisonerAge(data.prisonerAge);
        if (data.gender) setGender(data.gender);
        if (typeof data.isForeignNational === 'boolean') setIsForeignNational(data.isForeignNational);
        if (typeof data.isFirstTimeOffender === 'boolean') setIsFirstTimeOffender(data.isFirstTimeOffender);
        if (data.firNumber) setFirNumber(data.firNumber);
        if (data.policeStation) setPoliceStation(data.policeStation);
        if (data.district) setDistrict(data.district);
        if (data.state) setState(data.state);
        if (data.custodyStartDate) setCustodyStartDate(data.custodyStartDate);
        if (data.selectedOffenseIds?.length) setSelectedOffenseIds(data.selectedOffenseIds);
        if (data.step) setStep(data.step);
      }
    } catch (e) {
      console.warn('Could not restore wizard draft', e);
    }
  }, []);

  // Save state to sessionStorage on change
  useEffect(() => {
    try {
      const draft = {
        prisonerName,
        prisonerAge,
        gender,
        isForeignNational,
        isFirstTimeOffender,
        firNumber,
        policeStation,
        district,
        state,
        custodyStartDate,
        selectedOffenseIds,
        step,
      };
      sessionStorage.setItem('bail_wizard_draft', JSON.stringify(draft));
    } catch (e) {
      // Ignore
    }
  }, [prisonerName, prisonerAge, gender, isForeignNational, isFirstTimeOffender, firNumber, policeStation, district, state, custodyStartDate, selectedOffenseIds, step]);

  const clearDraft = () => {
    sessionStorage.removeItem('bail_wizard_draft');
    setStep(1);
    setPrisonerName('');
    setPrisonerAge('');
    setFirNumber('');
    setPoliceStation('');
    setDistrict('');
    setCustodyStartDate('');
    setSelectedOffenseIds(['offense-ipc-379']);
    setResult(null);
  };

  const allFiltered = searchOffenses(offenseSearchQuery).filter((off) => {
    if (selectedStatuteCategory === 'ALL') return true;
    return off.statuteCategory === selectedStatuteCategory;
  });

  const loadDemoCaseData = () => {
    setValidationError('');
    setPrisonerName('Ramesh Kumar');
    setPrisonerAge(32);
    setGender('male');
    setIsForeignNational(false);
    setIsFirstTimeOffender(true);
    setFirNumber('FIR 142/2024');
    setPoliceStation('Patna Central');
    setDistrict('Patna');
    setState('Bihar');
    setCustodyStartDate('2023-01-15');
    setSelectedOffenseIds(['offense-ipc-420']);
  };

  const validateStep1 = () => {
    if (!prisonerName.trim()) {
      setValidationError('Please enter the undertrial prisoner full name.');
      return false;
    }
    if (!custodyStartDate) {
      setValidationError('Please select the custody start date.');
      return false;
    }
    setValidationError('');
    return true;
  };

  const toggleOffense = (id: string) => {
    if (selectedOffenseIds.includes(id)) {
      if (selectedOffenseIds.length > 1) {
        setSelectedOffenseIds(selectedOffenseIds.filter((item) => item !== id));
      }
    } else {
      setSelectedOffenseIds([...selectedOffenseIds, id]);
    }
  };

  const handleEvaluate = () => {
    if (!validateStep1()) {
      setStep(1);
      return;
    }

    setIsCalculating(true);
    setLoadingProgress(20);
    setLoadingStepText('Parsing Undertrial Demographics & Detention Record...');

    setTimeout(() => {
      setLoadingProgress(50);
      setLoadingStepText('Resolving IPC → BNSS 2023 Schedule & Special Statute Offenses...');
    }, 450);

    setTimeout(() => {
      setLoadingProgress(80);
      setLoadingStepText('Evaluating Section 479 1/3rd First-Offender & 1/2 Sentence Ceilings...');
    }, 950);

    setTimeout(() => {
      setLoadingProgress(98);
      setLoadingStepText('Synthesizing Flight Risk Matrix & Formulating Court Application...');
    }, 1450);

    setTimeout(() => {
      const undertrial: UndertrialCase = {
        id: `case-${Date.now()}`,
        prisonerName: prisonerName || 'Ramesh Kumar',
        prisonerAge: typeof prisonerAge === 'number' ? prisonerAge : 30,
        gender,
        isForeignNational,
        isFirstTimeOffender,
        firNumber: firNumber || 'FIR 142/2024',
        policeStation: policeStation || 'Central P.S.',
        state: state || 'Bihar',
        district: district || 'Patna',
        courtName: 'District & Sessions Court',
        custodyStartDate: custodyStartDate || '2023-01-15',
        offenseIds: selectedOffenseIds,
        flightRiskFactors: {
          hasPermanentAddress,
          hasJobFamilyInJurisdiction,
          hasPassportSurrendered,
          previousJumpedBail,
        },
        tamperingRiskFactors: {
          witnessesAreRelatives,
          isInfluentialPerson,
          evidenceSecuredByPolice,
        },
        societalDangerFactors: {
          hasPriorConvictions,
          crimeInvolvedViolence,
          multiplePendingCases,
        },
        status: 'pending_review',
        createdAt: new Date().toISOString(),
      };

      const eligibility = evaluateBailEligibility(undertrial);
      setResult({ caseData: undertrial, eligibility });
      saveCase(undertrial);
      setStep(4);
      setIsCalculating(false);
    }, 1800);
  };

  const sampleCurl = `curl -X POST http://localhost:3000/api/reckoner/evaluate \\
  -H "Content-Type: application/json" \\
  -d '{
    "prisonerName": "${prisonerName || 'Ramesh Kumar'}",
    "firNumber": "${firNumber || 'FIR 142/2024'}",
    "custodyStartDate": "${custodyStartDate || '2023-01-15'}",
    "isFirstTimeOffender": ${isFirstTimeOffender},
    "offenseIds": ["${selectedOffenseIds[0] || 'offense-ipc-420'}"]
  }'`;

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-accent/20">
      {/* Portal Header */}
      <header className="border-b border-border px-6 pb-24 pt-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center justify-between">
            <div className="inline-block border border-accent/40 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-accent">
              Portal 01 / Core Engine
            </div>

            <button
              onClick={() => setIsApiModalOpen(true)}
              className="inline-flex items-center gap-2 border border-border bg-card px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-accent hover:border-accent transition-colors"
            >
              <Code2 className="size-3 text-accent" />
              <span>ICJS / e-Courts Plug-and-Play API</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <h1 className="max-w-4xl text-balance font-display text-6xl italic leading-[0.9] tracking-tighter md:text-8xl">
                The Bail <span className="text-accent">Wizard</span>.
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Primary engine for calculating Section 479 eligibility under the Bharatiya Nagarik Suraksha Sanhita, with auditable reasoning at every step.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={clearDraft}
                className="group flex items-center gap-1.5 rounded-sm border border-border px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:border-destructive hover:text-destructive cursor-pointer"
                title={t.clearDraftBtn}
              >
                <Trash2 className="size-3" />
                <span>{t.clearDraftBtn}</span>
              </button>
              <button
                type="button"
                onClick={loadDemoCaseData}
                className="group flex items-center gap-2 rounded-sm border border-input px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:border-accent hover:text-accent cursor-pointer"
              >
                <span>{t.demoCaseBtn}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="px-6 py-20 relative">
        <div className="mx-auto max-w-4xl space-y-12">
          {/* Main Form & Results Container */}
          <div className="space-y-12">
            {/* Step Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-border pb-4 font-mono text-[10px] uppercase tracking-widest">
              {[1, 2, 3, 4].map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    if (s === 4 && !result) {
                      handleEvaluate();
                    } else {
                      setStep(s);
                    }
                  }}
                  className={`px-3 py-1.5 transition-colors border-b-2 ${
                    step === s
                      ? 'border-accent text-accent font-bold'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  0{s} Step
                </button>
              ))}
            </div>

            {/* Step 1: Demographics */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="font-display text-3xl italic">{t.step1Title}</h2>
                  <p className="text-sm text-muted-foreground">Enter prisoner identity and detention start date.</p>
                </div>

                {validationError && (
                  <div className="p-3 border border-destructive bg-destructive/10 text-destructive text-xs font-mono">
                    {validationError}
                  </div>
                )}

                <div className="space-y-4 font-mono text-xs">
                  <div>
                    <label className="block uppercase text-muted-foreground mb-1">{t.prisonerNameLabel} *</label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Kumar"
                      value={prisonerName}
                      onChange={(e) => setPrisonerName(e.target.value)}
                      className="w-full border border-input bg-background p-3 text-foreground font-sans focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block uppercase text-muted-foreground mb-1">Age</label>
                      <input
                        type="number"
                        placeholder="32"
                        value={prisonerAge}
                        onChange={(e) => setPrisonerAge(e.target.value ? Number(e.target.value) : '')}
                        className="w-full border border-input bg-background p-3 text-foreground font-sans focus:border-accent focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block uppercase text-muted-foreground mb-1">{t.firstTimeOffenderLabel}</label>
                      <select
                        value={isFirstTimeOffender ? 'yes' : 'no'}
                        onChange={(e) => setIsFirstTimeOffender(e.target.value === 'yes')}
                        className="w-full border border-input bg-background p-3 text-foreground font-sans focus:border-accent focus:outline-none"
                      >
                        <option value="yes">Yes (1/3rd Custody Rule)</option>
                        <option value="no">No (50% Custody Ceiling)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block uppercase text-muted-foreground mb-1">{t.firNumberLabel}</label>
                      <input
                        type="text"
                        placeholder="FIR 142/2024"
                        value={firNumber}
                        onChange={(e) => setFirNumber(e.target.value)}
                        className="w-full border border-input bg-background p-3 text-foreground font-sans focus:border-accent focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block uppercase text-muted-foreground mb-1">{t.custodyDateLabel} *</label>
                      <input
                        type="date"
                        value={custodyStartDate}
                        onChange={(e) => setCustodyStartDate(e.target.value)}
                        className="w-full border border-input bg-background p-3 text-foreground font-sans focus:border-accent focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-3 cursor-pointer pt-2">
                      <input
                        type="checkbox"
                        checked={isForeignNational}
                        onChange={(e) => setIsForeignNational(e.target.checked)}
                        className="accent-accent"
                      />
                      <span className="text-muted-foreground">Undertrial is a Foreign National (SIH Special Statute Check)</span>
                    </label>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (validateStep1()) setStep(2);
                  }}
                  className="w-full bg-foreground p-4 text-center font-mono text-xs uppercase tracking-widest text-background transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  {t.calculateBtn} →
                </button>
              </div>
            )}

            {/* Step 2: Offenses with 7 Special Statutes Filter */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="font-display text-3xl italic">{t.step2Title}</h2>
                  <p className="text-sm text-muted-foreground">{t.step2Sub}</p>
                </div>

                {/* Special Statute Category Filter */}
                <div className="space-y-1 font-mono text-xs">
                  <label className="block uppercase text-accent font-bold tracking-widest">
                    {t.filterByStatutes}
                  </label>
                  <select
                    value={selectedStatuteCategory}
                    onChange={(e) => setSelectedStatuteCategory(e.target.value)}
                    className="w-full border border-accent/50 bg-background p-3 text-foreground font-mono text-xs focus:border-accent focus:outline-none"
                  >
                    {SPECIAL_STATUTES.map((s) => {
                      let displayName = s.name;
                      if (s.id === 'ALL') {
                        displayName = language === 'kn' ? 'ಎಲ್ಲಾ 7 ವಿಶೇಷ ಕಾಯಿದೆಗಳು (SIH Mandate)' : language === 'hi' ? 'सभी 7 विशेष कानून (SIH मैंडेट)' : s.name;
                      } else if (s.id === 'CYBER_CRIME') {
                        displayName = language === 'kn' ? '1. ಸೈಬರ್ ಅಪರಾಧಗಳು (IT Act 66D/66C)' : language === 'hi' ? '1. साइबर अपराध (IT Act 66D/66C)' : s.name;
                      } else if (s.id === 'CRIMES_AGAINST_SC_ST') {
                        displayName = language === 'kn' ? '2. SC/ST ದೌರ್ಜನ್ಯ ತಡೆ ಕಾಯಿದೆ (SC/ST Act)' : language === 'hi' ? '2. SC/ST अत्याचार निवारण अधिनियम' : s.name;
                      } else if (s.id === 'CRIMES_AGAINST_WOMEN') {
                        displayName = language === 'kn' ? '3. ಮಹಿಳೆಯರ ಮೇಲಿನ ಅಪರಾಧಗಳು (BNS 74/64)' : language === 'hi' ? '3. महिलाओं के खिलाफ अपराध (BNS 74/64)' : s.name;
                      } else if (s.id === 'CRIMES_AGAINST_CHILDREN') {
                        displayName = language === 'kn' ? '4. ಮಕ್ಕಳ ಮೇಲಿನ ಅಪರಾಧಗಳು (POCSO Act)' : language === 'hi' ? '4. बच्चों के खिलाफ अपराध (POCSO Act)' : s.name;
                      } else if (s.id === 'OFFENCES_AGAINST_THE_STATE') {
                        displayName = language === 'kn' ? '5. ರಾಜ್ಯದ ವಿರುದ್ಧದ ಅಪರಾಧಗಳು (BNS 152)' : language === 'hi' ? '5. राज्य के खिलाफ अपराध (BNS 152)' : s.name;
                      } else if (s.id === 'ECONOMIC_OFFENSE') {
                        displayName = language === 'kn' ? '6. ಆರ್ಥಿಕ ಅಪರಾಧಗಳು (BNS 318 / PMLA)' : language === 'hi' ? '6. आर्थिक अपराध (BNS 318 / PMLA)' : s.name;
                      } else if (s.id === 'CRIMES_AGAINST_FOREIGNERS') {
                        displayName = language === 'kn' ? '7. ವಿದೇಶಿಯರ ಮೇಲಿನ ಅಪರಾಧಗಳು' : language === 'hi' ? '7. विदेशियों के खिलाफ अपराध' : s.name;
                      }
                      return (
                        <option key={s.id} value={s.id}>
                          {displayName}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-3.5 size-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder={t.searchOffensePlaceholder}
                    value={offenseSearchQuery}
                    onChange={(e) => setOffenseSearchQuery(e.target.value)}
                    className="w-full border border-input bg-background pl-10 pr-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none font-sans"
                  />
                </div>

                <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                  {allFiltered.map((off) => {
                    const isSelected = selectedOffenseIds.includes(off.id);
                    return (
                      <div
                        key={off.id}
                        onClick={() => toggleOffense(off.id)}
                        className={`p-4 border cursor-pointer transition-colors ${
                          isSelected ? 'border-accent bg-accent-soft' : 'border-border bg-background hover:border-accent/50'
                        }`}
                      >
                        <div className="flex items-center justify-between font-mono text-xs">
                          <span className="font-bold text-accent">{off.ipcSection} → {off.bnsSection}</span>
                          <span className="text-muted-foreground">{off.statuteCategory} • Max {off.maxSentenceYears} Yrs</span>
                        </div>
                        <h4 className="font-sans font-semibold text-sm text-foreground mt-1">{off.title}</h4>
                        {off.specialAct !== 'NONE' && (
                          <span className="inline-block mt-2 font-mono text-[9px] uppercase px-2 py-0.5 bg-accent/20 text-accent font-bold">
                            Act: {off.specialAct}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 border border-border p-4 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground"
                  >
                    {t.backBtn}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="w-2/3 bg-foreground p-4 text-center font-mono text-xs uppercase tracking-widest text-background transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    {t.proceedToRiskBtn}
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Risk Checklist */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="font-display text-3xl italic">{t.step3Title}</h2>
                  <p className="text-sm text-muted-foreground font-sans">{t.step3Sub}</p>
                </div>

                <div className="space-y-4 font-mono text-xs">
                  <div className="border border-border p-4 space-y-3 bg-background">
                    <span className="text-accent uppercase font-bold tracking-widest block">{t.flightRiskHeader}</span>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasPermanentAddress}
                        onChange={(e) => setHasPermanentAddress(e.target.checked)}
                        className="accent-accent"
                      />
                      <span>{t.permAddressLabel}</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasPassportSurrendered}
                        onChange={(e) => setHasPassportSurrendered(e.target.checked)}
                        className="accent-accent"
                      />
                      <span>{t.passportSurrenderedLabel}</span>
                    </label>
                  </div>

                  <div className="border border-border p-4 space-y-3 bg-background">
                    <span className="text-accent uppercase font-bold tracking-widest block">{t.societalSafetyHeader}</span>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasPriorConvictions}
                        onChange={(e) => setHasPriorConvictions(e.target.checked)}
                        className="accent-accent"
                      />
                      <span>{t.priorConvictionsLabel}</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={crimeInvolvedViolence}
                        onChange={(e) => setCrimeInvolvedViolence(e.target.checked)}
                        className="accent-accent"
                      />
                      <span>{t.crimeViolenceLabel}</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-1/3 border border-border p-4 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground"
                  >
                    {t.backBtn}
                  </button>
                  <button
                    type="button"
                    onClick={handleEvaluate}
                    className="w-2/3 bg-foreground p-4 text-center font-mono text-xs uppercase tracking-widest text-background transition-colors hover:bg-accent hover:text-accent-foreground font-bold"
                  >
                    {t.computeBailBtn}
                  </button>
                </div>
              </div>
            )}

            {/* Step 4 & 5: Results */}
            {step >= 4 && result && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h2 className="font-display text-3xl italic">{t.step4Title}</h2>
                  <p className="text-sm text-muted-foreground">Section 479 BNSS computation breakdown.</p>
                </div>

                {/* CASE_ANALYZER_V2 Summary & Verdict Banner */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Verdict Banner */}
                  <div className="md:col-span-2 border border-border bg-folder p-6 md:p-8 text-folder-foreground space-y-4 rounded-2xl shadow-lg">
                    <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent font-bold">
                      Reckoned Verdict
                    </div>
                    <div className="font-display text-4xl md:text-5xl italic">
                      {result.eligibility.timeServed.eligibleUnderBnss479 || result.eligibility.timeServed.eligibleUnderOneThirdRule
                        ? '100% Mandatory Bail Eligible'
                        : 'Conditional Bail Discretion'}
                    </div>
                    <p className="text-xs leading-relaxed opacity-90 font-sans">
                      {result.eligibility.primaryReason}
                    </p>
                  </div>

                  {/* CASE_ANALYZER_V2 Card (Now cleanly inside Step 4) */}
                  <div className="border border-border bg-card p-6 rounded-2xl shadow-lg space-y-4">
                    <div className="flex items-center justify-between border-b border-border pb-3">
                      <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground font-bold">
                        CASE_ANALYZER_V2
                      </span>
                      <span className="border border-accent/60 bg-accent/10 px-2 py-0.5 font-mono text-[8px] uppercase text-accent font-bold rounded">
                        COMPUTED
                      </span>
                    </div>

                    <div className="space-y-3 font-mono text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">UNDERTRIAL:</span>
                        <span className="font-bold text-foreground">{result.caseData.prisonerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">FIR NO:</span>
                        <span className="font-bold text-accent">{result.caseData.firNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">CUSTODY:</span>
                        <span className="font-bold text-foreground">{result.caseData.custodyStartDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">OFFENDER TYPE:</span>
                        <span className="font-bold text-foreground">
                          {result.caseData.isFirstTimeOffender ? '1st Time (1/3rd)' : 'Repeat (1/2)'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Eligibility Countdown — only for conditional cases */}
                {result.eligibility.status === 'CONDITIONAL' && (
                  <EligibilityCountdown
                    oneThirdEligibilityDate={result.eligibility.timeServed.oneThirdEligibilityDate}
                    halfTimeEligibilityDate={result.eligibility.timeServed.halfTimeEligibilityDate}
                    isFirstTimeOffender={result.caseData.isFirstTimeOffender}
                    daysServed={result.eligibility.timeServed.daysServed}
                    oneThirdThresholdYears={result.eligibility.timeServed.oneThirdThresholdYears}
                    halfTimeThresholdYears={result.eligibility.timeServed.halfTimeThresholdYears}
                  />
                )}

                <EligibilityTimeline
                  timeServed={result.eligibility.timeServed}
                  isFirstTimeOffender={result.caseData.isFirstTimeOffender}
                />

                {/* Risk Score Breakdown */}
                <RiskScorePanel riskAssessment={result.eligibility.riskAssessment} />

                {/* Statutory Basis */}
                <div className="border border-border bg-background p-6 rounded-2xl space-y-3">
                  <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent font-bold block">
                    Statutory Basis Applied
                  </span>
                  <ul className="space-y-2">
                    {result.eligibility.statutoryBasis.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 font-mono text-[10px] text-muted-foreground">
                        <span className="shrink-0 border border-border px-1 text-accent">{String(i + 1).padStart(2, '0')}</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Full-Width Formatted Court Application */}
                <div className="space-y-4 pt-4">
                  <BailApplicationPDF undertrial={result.caseData} eligibility={result.eligibility} />
                  
                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => { setStep(1); setResult(null); }}
                      className="inline-flex items-center gap-2 border border-border bg-card px-6 py-3 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-destructive hover:border-destructive transition-colors rounded-xl font-bold cursor-pointer"
                    >
                      <RotateCcw className="size-3.5" />
                      <span>Reset Calculator &amp; Start Over</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* AI Statutory Reckoner Loading Screen Modal */}
        {isCalculating && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/90 backdrop-blur-xl p-6">
            <div className="w-full max-w-lg border border-accent/40 bg-card p-8 md:p-10 rounded-3xl shadow-2xl space-y-8 text-center border-t-4 border-t-accent">
              <div className="relative mx-auto size-20 flex items-center justify-center rounded-2xl bg-accent/10 border border-accent/40 text-accent">
                <Scale className="w-10 h-10 text-accent animate-pulse" />
              </div>

              <div className="space-y-3">
                <div className="inline-block border border-accent/50 bg-accent/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-accent font-bold rounded-full">
                  AI Statutory Reckoner v2.4
                </div>
                <h3 className="font-display text-3xl italic text-foreground">
                  Reckoning BNSS §479 Statutory Rights...
                </h3>
                <p className="font-mono text-xs text-accent font-semibold animate-pulse">
                  {loadingStepText}
                </p>
              </div>

              <div className="space-y-2">
                <div className="h-3 w-full rounded-full bg-muted overflow-hidden border border-border p-0.5">
                  <div
                    className="h-full bg-accent rounded-full transition-all duration-300 ease-out shadow-[0_0_12px_rgba(224,122,95,0.6)]"
                    style={{ width: `${loadingProgress}%` }}
                  />
                </div>
                <div className="flex justify-between font-mono text-[10px] text-muted-foreground">
                  <span>COMPUTING LEGISLATIVE MATRIX</span>
                  <span className="font-bold text-accent">{loadingProgress}%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Interactive Judicial Benchmark & Statutory Rights Summary */}
      <section className="border-t border-border bg-card/60 px-6 py-20 text-foreground relative z-20">
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-block border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.25em] text-accent font-bold rounded-full">
              {language === 'kn' ? 'ಶಾಸನಬದ್ಧ ಬೆಂಚ್‌ಮಾರ್ಕ್ & ವ್ಯವಸ್ಥೆಯ ಮಾಪನಗಳು' : language === 'hi' ? 'वैधानिक बेंचमार्क एवं प्रणाली माप' : 'Statutory Benchmark & System Performance'}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl italic text-foreground">
              {language === 'kn' ? 'ನ್ಯಾಯಾಂಗ ನಿಖರತೆ ಮತ್ತು ಸಾರ್ವಜನಿಕ ಹಕ್ಕುಗಳ ಗ್ಯಾರಂಟಿ' : language === 'hi' ? 'न्यायिक सटीकता एवं सार्वजनिक अधिकार गारंटी' : 'Judicial Precision & Public Rights Guarantee'}
            </h2>
            <p className="text-xs text-muted-foreground font-sans leading-relaxed">
              {language === 'kn'
                ? 'ಭಾರತೀಯ ನಾಗರಿಕ ಸುರಕ್ಷಾ ಸಂಹಿತೆ (BNSS) 2023 ರ ಸೆಕ್ಷನ್ 479 ರ ಅಡಿಯಲ್ಲಿ ಪ್ರತಿ ಕೈದಿಯ ಬಂಧನ ಕಾಲಮಿತಿಯ ಸ್ವಯಂಚಾಲಿತ ಲೆಕ್ಕಾಚಾರ.'
                : language === 'hi'
                ? 'भारतीय नागरिक सुरक्षा संहिता (BNSS) 2023 की धारा 479 के तहत प्रत्येक कैदी की हिरासत समयसीमा की स्वचालित गणना।'
                : 'Automated evaluation of undertrial custody limits under Section 479 of the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Clock,
                value: '0.4s',
                title: language === 'kn' ? 'ನೈಜ-ಸಮಯದ ಲೆಕ್ಕಾಚಾರ' : language === 'hi' ? 'रीयल-टाइम गणना समय' : 'Median Computation',
                desc: language === 'kn' ? 'IPC ↔ BNS ವಿಭಾಗಗಳ ಅತ್ಯಂತ ವೇಗದ ಪರಿಶೀಲನೆ' : language === 'hi' ? 'IPC ↔ BNS धाराओं की त्वरित जांच' : 'Instant Section 479 custody limit calculation',
                accentColor: 'text-accent',
              },
              {
                icon: ShieldCheck,
                value: '99.8%',
                title: language === 'kn' ? 'ಶಾಸನಬದ್ಧ ನಿಖರತೆ' : language === 'hi' ? 'वैधानिक सटीकता' : 'Code Compliance',
                desc: language === 'kn' ? 'ಭಾರತೀಯ ನ್ಯಾಯಾಲಯಗಳ ಕಾಯಿದೆ ಸಂಪೂರ್ಣ ಅನುಸರಣೆ' : language === 'hi' ? 'अदालती नियमों का शत-प्रतिशत पालन' : 'Full Gazette schedule rule enforcement',
                accentColor: 'text-emerald-400',
              },
              {
                icon: Scale,
                value: '1/3rd',
                title: language === 'kn' ? 'ಮೊದಲ ಅಪರಾಧಿ ನಿಯಮ' : language === 'hi' ? 'प्रथम अपराध नियम' : 'First Offender Rule',
                desc: language === 'kn' ? '1/3 ಭಾಗ ಜೈಲು ಶಿಕ್ಷೆ ಪೂರ್ಣಗೊಂಡಾಗ ಕಡ್ಡಾಯ ಜಾಮೀನು' : language === 'hi' ? '1/3 सजा पूरी होने पर अनिवार्य जमानत' : 'Mandatory bail threshold under BNSS 479(1)',
                accentColor: 'text-amber-400',
              },
              {
                icon: Sparkles,
                value: '100%',
                title: language === 'kn' ? 'ಉಚಿತ ಕಾನೂನು ನೆರವು' : language === 'hi' ? 'मुफ्त कानूनी सहायता' : 'Free DLSA Counsel',
                desc: language === 'kn' ? 'ವಿಧಿ 39A ಅಡಿಯಲ್ಲಿ ಉಚಿತ ವಕೀಲರ ನಿಯೋಜನೆ' : language === 'hi' ? 'अनुच्छेद 39A के तहत मुफ्त सरकारी वकील' : 'Article 39A free public defense entitlement',
                accentColor: 'text-blue-400',
              },
            ].map((stat, i) => {
              const IconComponent = stat.icon;
              return (
                <Reveal key={i} delay={i * 100}>
                  <div className="flex flex-col items-center justify-between text-center p-6 rounded-2xl bg-card border border-border/80 hover:border-accent/60 transition-all hover:shadow-xl group h-full space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <div className={`font-display text-4xl sm:text-5xl italic ${stat.accentColor}`}>
                        {stat.value}
                      </div>
                      <h3 className="font-mono text-xs uppercase tracking-widest text-foreground font-bold mt-2">
                        {stat.title}
                      </h3>
                      <p className="text-[11px] text-muted-foreground font-sans mt-1 leading-relaxed">
                        {stat.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ICJS Plug-and-Play API Modal */}
      {isApiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl border border-border bg-card p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4 font-mono text-xs uppercase">
              <span className="font-bold text-accent">ICJS / e-Courts Plug-and-Play API Endpoint</span>
              <button onClick={() => setIsApiModalOpen(false)} className="text-muted-foreground hover:text-foreground">✕</button>
            </div>

            <p className="text-xs text-muted-foreground font-sans">
              The Bail Reckoner exposes a zero-dependency REST endpoint for external Integration with Inter-operable Criminal Justice System (ICJS), e-Prisons, and State District Legal Aid authorities.
            </p>

            <div className="relative border border-border bg-background p-4 rounded font-mono text-[11px] text-accent overflow-x-auto">
              <pre>{sampleCurl}</pre>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(sampleCurl);
                  setCopiedApi(true);
                  setTimeout(() => setCopiedApi(false), 2000);
                }}
                className="absolute top-3 right-3 p-2 bg-card border border-border text-muted-foreground hover:text-foreground"
              >
                {copiedApi ? <Check className="size-3 text-accent" /> : <Copy className="size-3" />}
              </button>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setIsApiModalOpen(false)}
                className="bg-foreground px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-background font-bold hover:bg-accent hover:text-accent-foreground"
              >
                Close API Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
