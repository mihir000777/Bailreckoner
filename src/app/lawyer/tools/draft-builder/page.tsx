'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Scale, ArrowLeft, Sparkles, Copy, Check, Download, FileText, CheckCircle2, Shield, Gavel, UserCheck, BookOpen, AlertCircle, Plus, Trash2 } from 'lucide-react';
import { searchOffenses } from '@/lib/offenseDb';
import { Offense } from '@/types/legal';
import { ProtectedRoute } from '@/components/ProtectedRoute';

interface PrecedentItem {
  citation: string;
  title: string;
  principle: string;
  selected: boolean;
}

const INITIAL_PRECEDENTS: PrecedentItem[] = [
  {
    citation: '(2022) 10 SCC 51',
    title: 'Satender Kumar Antil v. Central Bureau of Investigation',
    principle: 'Bail is the rule and jail is an exception. Mandatory release under Section 436A CrPC / 479 BNSS on personal bond without onerous monetary surety conditions.',
    selected: true,
  },
  {
    citation: '(2012) 1 SCC 40',
    title: 'Sanjay Chandra v. Central Bureau of Investigation',
    principle: 'Detention during trial is not punitive. Gravity of offence alone cannot be a ground to deny bail when investigation is complete.',
    selected: true,
  },
  {
    citation: '(2014) 8 SCC 273',
    title: 'Arnesh Kumar v. State of Bihar',
    principle: 'Mandatory compliance with Sec 41A CrPC / Sec 35 BNSS notice of appearance before making arrest in offences punishable up to 7 years.',
    selected: false,
  },
  {
    citation: '(1980) 2 SCC 565',
    title: 'Gurbaksh Singh Sibbia v. State of Punjab',
    principle: 'Personal liberty under Article 21 of Constitution requires courts to lean against pre-conviction detention unless compelling flight risk exists.',
    selected: false,
  },
];

export default function AdvocateDraftBuilderPage() {
  // Form State
  const [courtName, setCourtName] = useState('IN THE COURT OF THE PRINCIPAL SESSIONS JUDGE AT PATNA');
  const [prisonerName, setPrisonerName] = useState('Ramesh Kumar');
  const [prisonerAge, setPrisonerAge] = useState(32);
  const [fatherName, setFatherName] = useState('Suresh Kumar');
  const [address, setAddress] = useState('House No. 42, Kankarbagh, Patna, Bihar');
  const [firNumber, setFirNumber] = useState('FIR No. 142/2024');
  const [policeStation, setPoliceStation] = useState('Patna Central P.S.');
  const [custodyDate, setCustodyDate] = useState('2023-01-15');
  const [monthsServed, setMonthsServed] = useState(30);
  const [isFirstTime, setIsFirstTime] = useState(true);

  // Selected Charges
  const [selectedOffense, setSelectedOffense] = useState<Offense>(
    searchOffenses('420')[0] || {
      id: 'offense-ipc-420',
      ipcSection: 'Sec 420',
      bnsSection: 'Sec 318 BNSS',
      title: 'Cheating & Dishonesty',
      description: 'Cheating and dishonestly inducing delivery of property',
      category: 'Non-Bailable',
      statuteCategory: 'ECONOMIC_OFFENSE',
      maxSentenceYears: 7,
      isCompoundable: false,
      specialAct: 'NONE',
      keyElements: [],
    }
  );

  // Grounds Checklist
  const [grounds, setGrounds] = useState({
    sec479Mandatory: true,
    investigationComplete: true,
    noFlightRisk: true,
    passportSurrendered: false,
    soleEarner: true,
    medicalGrounds: false,
    noPriorConviction: true,
  });

  // Precedents
  const [precedents, setPrecedents] = useState<PrecedentItem[]>(INITIAL_PRECEDENTS);

  // Generated Petition Output State
  const [generatedDraft, setGeneratedDraft] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggleGround = (key: keyof typeof grounds) => {
    setGrounds({ ...grounds, [key]: !grounds[key] });
  };

  const togglePrecedent = (index: number) => {
    const updated = [...precedents];
    updated[index].selected = !updated[index].selected;
    setPrecedents(updated);
  };

  // Generate Petition Text
  const handleGeneratePetition = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const selectedPrecedentsList = precedents
        .filter((p) => p.selected)
        .map((p) => `   - ${p.title} ${p.citation}: "${p.principle}"`)
        .join('\n');

      const maxMonths = selectedOffense.maxSentenceYears * 12;
      const thresholdFraction = isFirstTime ? '1/3rd (one-third)' : '1/2 (one-half)';
      const bondAmount = isFirstTime ? '₹25,000/- (Rupees Twenty-Five Thousand Only)' : '₹50,000/- (Rupees Fifty Thousand Only)';

      const draft = `FORMAL BAIL PETITION UNDER SECTION 479 OF BHARATIYA NAGARIK SURAKSHA SANHITA, 2023
========================================================================================

${courtName.toUpperCase()}

BAIL APPLICATION NO. ________ OF 2026
(Arising out of ${firNumber} of ${policeStation})

IN THE MATTER OF:
${prisonerName.toUpperCase()}, S/o ${fatherName.toUpperCase()},
Aged about ${prisonerAge} Years,
Resident of: ${address}
... ACCUSED / APPLICANT (IN CUSTODY)

VERSUS

STATE OF BIHAR (THROUGH INVESTIGATING OFFICER, ${policeStation.toUpperCase()})
... RESPONDENT / PROSECUTION

----------------------------------------------------------------------------------------
APPLICATION FOR MANDATORY REGULAR BAIL UNDER SECTION 479 BNSS, 2023 READ WITH ARTICLE 21 OF THE CONSTITUTION OF INDIA
----------------------------------------------------------------------------------------

TO,
THE HON'BLE PRESIDING JUDGE AND HIS COMPANION JUDGES OF THE SESSIONS COURT:

MOST RESPECTFULLY SHOWETH:

1. That the Applicant / Accused is currently lodged in judicial custody at District Jail pursuant to arrest in connection with ${firNumber} registered at P.S. ${policeStation} for alleged offences under ${selectedOffense.ipcSection} IPC (Corresponding to ${selectedOffense.bnsSection}).

2. STATUTORY DETENTION THRESHOLD UNDER SECTION 479 BNSS:
   a) The maximum period of imprisonment prescribed for the alleged offence under ${selectedOffense.ipcSection} IPC is ${selectedOffense.maxSentenceYears} Years (${maxMonths} Months).
   b) The Applicant was taken into custody on ${custodyDate} and has continuously undergone judicial detention for a period of ${monthsServed} Months (${(monthsServed / 12).toFixed(1)} Years).
   c) ${isFirstTime ? 'The Applicant is a FIRST-TIME OFFENDER with no prior criminal convictions on record.' : 'The Applicant has no pending violence convictions.'}
   d) Under Section 479(1) of BNSS, 2023, an undertrial who has completed ${thresholdFraction} of the maximum period of imprisonment MUST BE RELEASED ON PERSONAL BOND.

3. SUBMISSIONS ON MERITS & INVESTIGATION STATUS:
${grounds.investigationComplete ? '   a) That the investigation in the instant case is substantially complete and charge-sheet has been prepared/filed. No further custodial interrogation of the Applicant is required.' : ''}
${grounds.noPriorConviction ? '   b) That the Applicant has clean antecedents and has never been convicted by any Court of Law in India.' : ''}
${grounds.noFlightRisk ? '   c) That the Applicant is a permanent resident of ${address} and owns immovable property, having deep roots in society. There is zero risk of the Applicant absconding.' : ''}
${grounds.soleEarner ? '   d) That the Applicant is the sole breadwinner of his family, including dependent elderly parents and minor children, who face starvation during prolonged detention.' : ''}
${grounds.medicalGrounds ? '   e) That the Applicant suffers from acute medical vulnerabilities requiring specialized clinical care unavailable in prison ward.' : ''}

4. JUDICIAL PRECEDENTS OF THE SUPREME COURT OF INDIA APPLIED:
The Applicant respectfully relies upon the binding principles of statutory bail laid down by the Supreme Court of India:
${selectedPrecedentsList || '   - Satender Kumar Antil v. CBI (2022) 10 SCC 51: Release on personal bond under BNSS 479.'}

5. UNDERTAKING & BOND CONDITIONS:
   a) The Applicant undertakes to furnish a Personal Bond in the sum of ${bondAmount} along with 1 solvent local surety to the satisfaction of this Hon'ble Court.
   b) The Applicant undertakes to attend court proceedings on every date of listing and shall not tamper with prosecution evidence or influence witnesses.

PRAYER:
WHEREFORE, it is most respectfully prayed that this Hon'ble Court may be pleased to:
i) RELEASE the Applicant (${prisonerName}) on mandatory regular bail in connection with ${firNumber} of ${policeStation} under Section 479 BNSS, 2023 on executing a Personal Bond;
ii) PASS such other or further order(s) as this Hon'ble Court may deem fit and proper in the interest of justice.

AND FOR THIS ACT OF KINDNESS, THE APPLICANT SHALL EVER PRAY.

DATED: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
PLACE: PATNA

FILED BY:
ADV. RAJESH SHARMA & ASSOCIATES
DLSA Empanelled Public Defense Counsel (Panel #DLSA-882)
High Court & Sessions Court Registry, Patna
Contact: +91 94310 99887

----------------------------------------------------------------------------------------
VERIFICATION
----------------------------------------------------------------------------------------
I, ${fatherName}, S/o Late Ramashray Singh, aged about 58 years, resident of ${address}, do hereby solemnly affirm and declare that the contents of paragraphs 1 to 5 above are true and correct to the best of my knowledge and belief.

DEPONENT (Father / Pairvikar of Applicant)
`;

      setGeneratedDraft(draft);
      setIsGenerating(false);
    }, 400);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedDraft], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `Bail_Petition_${prisonerName.replace(/\s+/g, '_')}_BNSS479.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <ProtectedRoute requiredRole="lawyer">
      <div className="min-h-screen bg-background font-sans text-foreground selection:bg-accent/20">
      {/* Header */}
      <header className="border-b border-border px-6 pb-16 pt-12 bg-card/40">
        <div className="mx-auto max-w-6xl space-y-6">
          <Link
            href="/lawyer"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors"
          >
            <ArrowLeft className="size-3" />
            <span>← Return to Advocate Workspace</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="mb-3 inline-block border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-accent font-bold">
                Advocate Toolkit • BNSS 2023 Section 479
              </div>
              <h1 className="font-display text-5xl italic leading-tight text-foreground md:text-6xl">
                Bail Petition &amp; Writ Builder
              </h1>
              <p className="mt-2 text-sm text-muted-foreground max-w-2xl leading-relaxed">
                Automated legal petition generator for defense advocates and DLSA panel lawyers. Instantly format court-ready petitions with Supreme Court precedent citations and Section 479 statutory grounds.
              </p>
            </div>

            <button
              onClick={handleGeneratePetition}
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3.5 font-mono text-xs uppercase tracking-widest font-bold hover:bg-accent/90 transition-colors shadow-lg cursor-pointer shrink-0"
            >
              <Sparkles className="size-4" />
              <span>Generate Court Writ Petition</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Form Controls */}
          <div className="lg:col-span-6 space-y-8 bg-card border border-border p-6 md:p-8 rounded-2xl shadow-md">
            
            {/* Section 1: Court & Parties */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border/80 pb-2">
                <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold flex items-center gap-2">
                  <Gavel className="size-4" /> 1. Court Jurisdiction &amp; Undertrial Identity
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div>
                  <label className="block text-muted-foreground uppercase text-[10px] mb-1 font-bold">Heading Court Cause Title *</label>
                  <input
                    type="text"
                    value={courtName}
                    onChange={(e) => setCourtName(e.target.value)}
                    className="w-full border border-input bg-background p-3 text-foreground font-sans text-xs focus:border-accent focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-muted-foreground uppercase text-[10px] mb-1 font-bold">Undertrial Name *</label>
                    <input
                      type="text"
                      value={prisonerName}
                      onChange={(e) => setPrisonerName(e.target.value)}
                      className="w-full border border-input bg-background p-3 text-foreground font-sans text-xs focus:border-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-muted-foreground uppercase text-[10px] mb-1 font-bold">Father's Name *</label>
                    <input
                      type="text"
                      value={fatherName}
                      onChange={(e) => setFatherName(e.target.value)}
                      className="w-full border border-input bg-background p-3 text-foreground font-sans text-xs focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-muted-foreground uppercase text-[10px] mb-1 font-bold">FIR Number *</label>
                    <input
                      type="text"
                      value={firNumber}
                      onChange={(e) => setFirNumber(e.target.value)}
                      className="w-full border border-input bg-background p-3 text-foreground font-sans text-xs focus:border-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-muted-foreground uppercase text-[10px] mb-1 font-bold">Police Station *</label>
                    <input
                      type="text"
                      value={policeStation}
                      onChange={(e) => setPoliceStation(e.target.value)}
                      className="w-full border border-input bg-background p-3 text-foreground font-sans text-xs focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-muted-foreground uppercase text-[10px] mb-1 font-bold">Permanent Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full border border-input bg-background p-3 text-foreground font-sans text-xs focus:border-accent focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Custody & Offence Math */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between border-b border-border/80 pb-2">
                <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold flex items-center gap-2">
                  <Scale className="size-4" /> 2. Charged Offence &amp; Sentence Threshold
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div>
                  <label className="block text-muted-foreground uppercase text-[10px] mb-1 font-bold">Select Primary Penal Offence</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { ipc: 'Sec 420', bns: 'Sec 318 BNSS', title: 'Cheating & Dishonesty', max: 7 },
                      { ipc: 'Sec 379', bns: 'Sec 303 BNSS', title: 'Theft / Housebreaking', max: 3 },
                      { ipc: 'Sec 406', bns: 'Sec 316 BNSS', title: 'Breach of Trust', max: 7 },
                      { ipc: 'Sec 467', bns: 'Sec 336 BNSS', title: 'Forgery of Security', max: 10 },
                    ].map((off) => (
                      <button
                        key={off.ipc}
                        type="button"
                        onClick={() =>
                          setSelectedOffense({
                            id: `offense-${off.ipc}`,
                            ipcSection: off.ipc,
                            bnsSection: off.bns,
                            title: off.title,
                            description: off.title,
                            category: 'Non-Bailable',
                            statuteCategory: 'GENERAL_PENAL',
                            maxSentenceYears: off.max,
                            isCompoundable: false,
                            specialAct: 'NONE',
                            keyElements: [],
                          })
                        }
                        className={`p-2.5 rounded-lg border text-left text-[11px] transition-all cursor-pointer ${
                          selectedOffense.ipcSection === off.ipc
                            ? 'border-accent bg-accent/10 font-bold text-foreground'
                            : 'border-border/60 bg-background text-muted-foreground hover:bg-muted'
                        }`}
                      >
                        <div className="font-bold text-foreground">{off.title}</div>
                        <div className="text-[10px] text-accent">{off.ipc} → {off.bns}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-muted-foreground uppercase text-[10px] mb-1 font-bold">First Time Offender Rule</label>
                    <select
                      value={isFirstTime ? 'yes' : 'no'}
                      onChange={(e) => setIsFirstTime(e.target.value === 'yes')}
                      className="w-full border border-input bg-background p-3 text-foreground font-mono text-xs focus:border-accent focus:outline-none"
                    >
                      <option value="yes">Yes (1/3rd Rule)</option>
                      <option value="no">No (1/2 Sentence Ceiling)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-muted-foreground uppercase text-[10px] mb-1 font-bold">Custody Duration (Months)</label>
                    <input
                      type="number"
                      value={monthsServed}
                      onChange={(e) => setMonthsServed(Number(e.target.value))}
                      className="w-full border border-input bg-background p-3 text-foreground font-mono text-xs focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Statutory Relief Grounds Checklist */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between border-b border-border/80 pb-2">
                <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold flex items-center gap-2">
                  <CheckCircle2 className="size-4" /> 3. Defense Arguments &amp; Grounds Checklist
                </span>
              </div>

              <div className="space-y-2 font-mono text-xs">
                {[
                  ['sec479Mandatory', 'Mandatory 1/3rd / 50% Custody Threshold Served under BNSS §479'],
                  ['investigationComplete', 'Investigation Complete & Charge-Sheet Filed (No Interrogation Needed)'],
                  ['noPriorConviction', 'Clean Antecedents — First Time Offender with No Prior Convictions'],
                  ['noFlightRisk', 'Permanent Residence & Local Roots — Zero Flight Risk'],
                  ['soleEarner', 'Sole Breadwinner of Family Facing Extreme Financial Hardship'],
                  ['medicalGrounds', 'Medical Vulnerability / Ill Health Requiring Specialized Care'],
                  ['passportSurrendered', 'Passport Surrendered to Investigating Officer'],
                ].map(([key, label]) => (
                  <label
                    key={key}
                    className="flex items-start gap-3 p-2.5 rounded-lg border border-border/60 bg-background hover:bg-muted/60 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={grounds[key as keyof typeof grounds]}
                      onChange={() => toggleGround(key as keyof typeof grounds)}
                      className="accent-accent mt-0.5"
                    />
                    <span className="text-xs text-foreground font-sans">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Section 4: Supreme Court Precedents */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between border-b border-border/80 pb-2">
                <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold flex items-center gap-2">
                  <BookOpen className="size-4" /> 4. Supreme Court Citations Library
                </span>
              </div>

              <div className="space-y-2 font-mono text-xs">
                {precedents.map((prec, i) => (
                  <div
                    key={prec.citation}
                    onClick={() => togglePrecedent(i)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      prec.selected
                        ? 'border-accent bg-accent/10 text-foreground font-semibold'
                        : 'border-border/60 bg-background text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-accent">{prec.title}</span>
                      <span className="text-[10px] text-muted-foreground">{prec.citation}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground font-sans line-clamp-2">{prec.principle}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Live Formatted Petition Editor */}
          <div className="lg:col-span-6 space-y-6">
            <div className="border border-border bg-card rounded-2xl shadow-xl overflow-hidden flex flex-col min-h-[680px]">
              
              {/* Toolbar */}
              <div className="bg-muted/40 border-b border-border px-6 py-4 flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2">
                  <FileText className="size-4 text-accent" />
                  <span className="font-bold uppercase tracking-wider text-foreground">
                    Live Court Petition Preview
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    disabled={!generatedDraft}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-background border border-border text-muted-foreground hover:text-foreground font-bold transition-colors disabled:opacity-40 cursor-pointer"
                  >
                    {copied ? <Check className="size-3 text-emerald-400" /> : <Copy className="size-3" />}
                    <span>{copied ? 'Copied!' : 'Copy Text'}</span>
                  </button>

                  <button
                    onClick={handleDownload}
                    disabled={!generatedDraft}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-accent text-accent-foreground font-bold hover:bg-accent/90 transition-colors disabled:opacity-40 cursor-pointer"
                  >
                    <Download className="size-3" />
                    <span>Download .TXT</span>
                  </button>
                </div>
              </div>

              {/* Document Paper Container */}
              <div className="p-6 md:p-8 flex-1 bg-background overflow-y-auto max-h-[620px]">
                {isGenerating ? (
                  <div className="py-32 text-center space-y-4 font-mono text-xs opacity-60">
                    <Sparkles className="size-8 animate-spin mx-auto text-accent" />
                    <p>Formulating Section 479 BNSS Bail Application...</p>
                  </div>
                ) : generatedDraft ? (
                  <pre className="whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-foreground select-text font-medium">
                    {generatedDraft}
                  </pre>
                ) : (
                  <div className="py-32 text-center space-y-4 text-muted-foreground font-mono text-xs">
                    <Gavel className="size-10 mx-auto text-accent opacity-40" />
                    <p className="font-display text-2xl italic text-foreground">No petition generated yet.</p>
                    <p className="max-w-md mx-auto text-muted-foreground">
                      Click the <strong className="text-accent">"Generate Court Writ Petition"</strong> button above to format a complete court-ready Section 479 release application.
                    </p>
                  </div>
                )}
              </div>

              {/* Document Footer Status */}
              <div className="bg-muted/40 border-t border-border px-6 py-3 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
                <span>FORMAT: Sessions Court / High Court Registry</span>
                <span>BNSS 2023 §479 COMPLIANT</span>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
    </ProtectedRoute>
  );
}
