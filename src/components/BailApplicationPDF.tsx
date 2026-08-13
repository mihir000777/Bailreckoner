'use client';

import React, { useRef, useState } from 'react';
import { UndertrialCase, EligibilityResult, Offense } from '@/types/legal';
import { getOffensesByIds } from '@/lib/offenseDb';
import { Printer, Download, FileText, CheckCircle2, ShieldCheck, Scale, Copy, Check } from 'lucide-react';

interface BailApplicationPDFProps {
  undertrial: UndertrialCase;
  eligibility: EligibilityResult;
}

import { useAuth } from '@/lib/authContext';

export const BailApplicationPDF: React.FC<BailApplicationPDFProps> = ({
  undertrial,
  eligibility,
}) => {
  const { t } = useAuth();
  const [copiedText, setCopiedText] = useState(false);
  const offenses: Offense[] = getOffensesByIds(undertrial.offenseIds);
  const ipcSections = offenses.map((o) => o.ipcSection).join(', ');
  const bnsSections = offenses.map((o) => o.bnsSection).join(', ');
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleCopyText = () => {
    const fullText = `IN THE COURT OF THE CHIEF JUDICIAL MAGISTRATE / DISTRICT & SESSIONS JUDGE AT ${undertrial.district.toUpperCase()}, ${undertrial.state.toUpperCase()}

BAIL APPLICATION NO. ________ OF ${new Date().getFullYear()}

IN THE MATTER OF:
${undertrial.prisonerName.toUpperCase()}, Aged about ${undertrial.prisonerAge} years,
Resident of ${undertrial.district}, ${undertrial.state}
(Presently incarcerated in Judicial Custody)
... APPLICANT / UNDERTRIAL PRISONER

VERSUS

THE STATE OF ${undertrial.state.toUpperCase()}
Through Police Station: ${undertrial.policeStation.toUpperCase()}
... PROSECUTION / RESPONDENT

FIR NO.: ${undertrial.firNumber}
POLICE STATION: ${undertrial.policeStation}
OFFENSES CHARGED: ${ipcSections} (Corresponding to ${bnsSections})

APPLICATION FOR GRANT OF BAIL UNDER SECTION 479 / SECTION 480 / SECTION 482 OF THE BHARATIYA NAGARIK SURAKSHA SANHITA, 2023 (BNSS) READ WITH SECTIONS 436A / 437 / 439 OF CrPC 1973

MOST RESPECTFULLY SHOWETH:
1. That the Applicant / Undertrial Prisoner was arrested in connection with FIR No. ${undertrial.firNumber} registered at P.S. ${undertrial.policeStation} and has been in continuous judicial custody since ${undertrial.custodyStartDate}.
2. MANDATORY STATUTORY ENTITLEMENT UNDER BNSS SECTION 479:
Total continuous custody served: ${eligibility.timeServed.daysServed} Days (${eligibility.timeServed.yearsServed} Years).
Maximum sentence for alleged offense: ${eligibility.timeServed.maxSentenceYears} Years.
Threshold: ${eligibility.timeServed.bnss479Reasoning}
3. NO FLIGHT RISK OR WITNESS TAMPERING: Risk assessment score: LOW (${eligibility.riskAssessment.flightRiskScore}/10).
4. BINDING PRECEDENTS: Satender Kumar Antil v. CBI (2022) 10 SCC 51; Arnesh Kumar v. State of Bihar (2014) 8 SCC 273.

PRAYER:
(i) Release Applicant ${undertrial.prisonerName} on bail in FIR No. ${undertrial.firNumber} of P.S. ${undertrial.policeStation};
(ii) Accept personal bond with solvent local surety;
(iii) Pass any other order(s) as deemed fit in the interest of justice.

Date: ${currentDate}
Place: ${undertrial.district}
ADVOCATE FOR THE APPLICANT / DLSA PANEL`;

    navigator.clipboard.writeText(fullText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 3000);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Bail Application - ${undertrial.prisonerName} (FIR ${undertrial.firNumber})</title>
          <style>
            @page {
              size: A4;
              margin: 20mm 20mm 20mm 20mm;
            }
            body {
              font-family: 'Times New Roman', Georgia, serif;
              color: #000;
              background: #fff;
              line-height: 1.5;
              padding: 20px;
              font-size: 12pt;
            }
            .court-header {
              text-align: center;
              font-weight: bold;
              text-transform: uppercase;
              font-size: 13pt;
              margin-bottom: 20px;
              text-decoration: underline;
            }
            .case-number {
              text-align: right;
              font-weight: bold;
              margin-bottom: 20px;
            }
            .parties-box {
              margin-bottom: 20px;
              line-height: 1.8;
            }
            .versus {
              text-align: center;
              font-weight: bold;
              margin: 10px 0;
            }
            .heading-title {
              text-align: center;
              font-weight: bold;
              font-size: 12pt;
              border-top: 1.5px solid #000;
              border-bottom: 1.5px solid #000;
              padding: 8px 0;
              margin: 20px 0;
              text-transform: uppercase;
            }
            p.para {
              text-align: justify;
              text-indent: 40px;
              margin-bottom: 12px;
            }
            .precedent-box {
              border-left: 3px solid #000;
              padding-left: 15px;
              margin: 15px 0;
              font-style: italic;
            }
            .prayer-box {
              margin-top: 25px;
              font-weight: bold;
            }
            .signature-section {
              margin-top: 50px;
              display: flex;
              justify-content: space-between;
            }
            .verification {
              margin-top: 30px;
              border-top: 1px dashed #000;
              padding-top: 15px;
              font-size: 11pt;
            }
          </style>
        </head>
        <body>
          <div class="court-header">
            IN THE COURT OF THE CHIEF JUDICIAL MAGISTRATE / DISTRICT & SESSIONS JUDGE<br/>
            AT ${undertrial.district.toUpperCase()}, ${undertrial.state.toUpperCase()}
          </div>

          <div class="case-number">
            BAIL APPLICATION NO. ________ OF ${new Date().getFullYear()}
          </div>

          <div class="parties-box">
            <strong>IN THE MATTER OF:</strong><br/>
            <strong>${undertrial.prisonerName.toUpperCase()}</strong>, Aged about ${undertrial.prisonerAge} years,<br/>
            Resident of ${undertrial.district}, ${undertrial.state}<br/>
            (Presently incarcerated in Judicial Custody)<br/>
            <div style="text-align: right;"><strong>... APPLICANT / UNDERTRIAL PRISONER</strong></div>

            <div class="versus">VERSUS</div>

            <strong>THE STATE OF ${undertrial.state.toUpperCase()}</strong><br/>
            Through Police Station: ${undertrial.policeStation.toUpperCase()}<br/>
            <div style="text-align: right;"><strong>... PROSECUTION / RESPONDENT</strong></div>
          </div>

          <div style="margin-bottom: 15px;">
            <strong>FIR NO.:</strong> ${undertrial.firNumber}<br/>
            <strong>POLICE STATION:</strong> ${undertrial.policeStation}<br/>
            <strong>OFFENSES CHARGED:</strong> ${ipcSections} (Corresponding to ${bnsSections})
          </div>

          <div class="heading-title">
            APPLICATION FOR GRANT OF BAIL UNDER SECTION 479 / SECTION 480 / SECTION 482 OF THE BHARATIYA NAGARIK SURAKSHA SANHITA, 2023 (BNSS) READ WITH SECTIONS 436A / 437 / 439 OF CrPC 1973
          </div>

          <p><strong>MOST RESPECTFULLY SHOWETH:</strong></p>

          <p class="para">1. That the Applicant / Undertrial Prisoner was arrested in connection with FIR No. ${undertrial.firNumber} registered at P.S. ${undertrial.policeStation} and has been in continuous judicial custody since ${undertrial.custodyStartDate}.</p>

          <p class="para">2. <strong>MANDATORY STATUTORY ENTITLEMENT UNDER BNSS SECTION 479:</strong><br/>
          (a) Total continuous custody served: <strong>${eligibility.timeServed.daysServed} Days (${eligibility.timeServed.yearsServed} Years)</strong>.<br/>
          (b) Maximum sentence for alleged offense: <strong>${eligibility.timeServed.maxSentenceYears} Years</strong>.<br/>
          (c) Statutory Threshold: ${
            undertrial.isFirstTimeOffender
              ? `As a first-time offender with no prior criminal antecedents, the Applicant has completed 1/3rd of the maximum prescribed sentence (${eligibility.timeServed.oneThirdThresholdYears} years threshold) pursuant to BNSS 2023 Section 479(1) First Proviso.`
              : `The Applicant has completed continuous detention exceeding one-half (1/2) of the maximum period of imprisonment (${eligibility.timeServed.halfTimeThresholdYears} years threshold) pursuant to BNSS 2023 Section 479(1) / CrPC Section 436A.`
          }</p>

          <p class="para">3. <strong>NO FLIGHT RISK OR WITNESS TAMPERING:</strong><br/>
          The Applicant has deep-rooted family ties in ${undertrial.district}. The risk assessment score is LOW (${eligibility.riskAssessment.flightRiskScore}/10). The investigation is complete and all physical evidence has been secured by the Investigating Officer.</p>

          <p class="para">4. <strong>PROCEDURAL & EVIDENCE COMPLIANCE UNDER BNSS / BSA 2023:</strong><br/>
          (a) Compliance with arrest notice provisions under BNSS 2023 Section 35 / CrPC Section 41A.<br/>
          (b) Electronic evidence admissibility certificate submitted pursuant to <strong>Bharatiya Saakshya Adhiniyam (BSA) 2023 Section 61</strong>.<br/>
          (c) Sentence threshold calculated under concurrent detention principles (BNSS 2023 Sec 479 & CrPC Sec 427).</p>

          <div class="precedent-box">
            <strong>BINDING SUPREME COURT PRECEDENTS RELIED UPON:</strong><br/>
            • <em>Satender Kumar Antil v. CBI (2022) 10 SCC 51</em> — "Bail is the rule, jail is an exception. Undertrials serving substantial sentence are entitled to release on personal bond."<br/>
            • <em>Arnesh Kumar v. State of Bihar (2014) 8 SCC 273</em> — "Pre-trial arrest should not be routine or punitive."
          </div>

          <div class="prayer-box">
            PRAYER:<br/>
            It is therefore most humbly prayed that this Honorable Court may be pleased to:<br/>
            (i) Release the Applicant ${undertrial.prisonerName} on bail in FIR No. ${undertrial.firNumber} of P.S. ${undertrial.policeStation};<br/>
            (ii) Accept personal bond with solvent local surety to the satisfaction of this Court;<br/>
            (iii) Pass any other order(s) as deemed fit in the interest of justice.
          </div>

          <div class="signature-section">
            <div>
              Date: ${currentDate}<br/>
              Place: ${undertrial.district}
            </div>
            <div style="text-align: right;">
              _______________________________________<br/>
              <strong>ADVOCATE FOR THE APPLICANT</strong><br/>
              District Legal Services Authority (DLSA)
            </div>
          </div>

          <div class="verification">
            <strong>VERIFICATION:</strong> Verified at ${undertrial.district} on ${currentDate} that the contents of paragraphs 1 to 3 are true and correct to my knowledge.
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  return (
    <div className="border border-border bg-card p-6 sm:p-8 rounded-2xl shadow-xl space-y-6 w-full">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-border pb-6">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl border border-accent/40 bg-accent/10 flex items-center justify-center text-accent shrink-0">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display text-xl italic text-foreground">
              Court-Ready Formatted Bail Application (BNSS 479)
            </h3>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Standardized Indian Court Format • Ready for Magistrates &amp; Sessions Court
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start md:self-auto">
          <button
            type="button"
            onClick={handleCopyText}
            className="flex items-center gap-2 border border-border bg-background px-4 py-2.5 rounded-xl font-mono text-[11px] uppercase tracking-widest text-foreground font-bold hover:border-accent hover:text-accent transition-colors cursor-pointer"
          >
            {copiedText ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copiedText ? 'Copied!' : t.copyLegalTextBtn}</span>
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-2 bg-accent text-accent-foreground px-5 py-2.5 rounded-xl font-mono text-[11px] uppercase tracking-widest font-bold hover:bg-accent/90 transition-colors shadow-md cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>{t.printCourtPdfBtn}</span>
          </button>
        </div>
      </div>

      {/* Styled Printable Preview Container */}
      <div className="border border-border bg-background p-6 md:p-8 rounded-xl font-serif text-sm text-foreground space-y-5 max-h-[580px] overflow-y-auto leading-relaxed shadow-inner break-words">
        <div className="text-center font-bold text-accent text-base uppercase tracking-wider leading-snug border-b border-border/60 pb-3">
          IN THE COURT OF THE CHIEF JUDICIAL MAGISTRATE / DISTRICT &amp; SESSIONS JUDGE<br/>
          AT {undertrial.district.toUpperCase()}, {undertrial.state.toUpperCase()}
        </div>

        <div className="text-right font-mono text-xs font-bold text-muted-foreground">
          BAIL APPLICATION NO. ________ OF {new Date().getFullYear()}
        </div>

        <div className="bg-card p-5 rounded-xl border border-border space-y-2 font-mono text-xs">
          <div><strong className="text-accent">APPLICANT / UNDERTRIAL:</strong> {undertrial.prisonerName.toUpperCase()}, Aged {undertrial.prisonerAge} yrs, Resident of {undertrial.district}, {undertrial.state}.</div>
          <div><strong className="text-accent">RESPONDENT:</strong> THE STATE OF {undertrial.state.toUpperCase()} through P.S. {undertrial.policeStation}.</div>
          <div><strong className="text-accent">FIR DETAILS:</strong> {undertrial.firNumber} | Sections: {ipcSections} (Corresponding to {bnsSections})</div>
        </div>

        <div className="text-center font-bold text-foreground font-sans text-xs uppercase border-y border-border py-3 my-3 tracking-wider bg-muted/30 rounded-lg">
          APPLICATION FOR GRANT OF BAIL UNDER SECTION 479 / SECTION 480 / SECTION 482 OF THE BHARATIYA NAGARIK SURAKSHA SANHITA, 2023 (BNSS)
        </div>

        <div className="space-y-3 text-foreground font-sans text-xs leading-relaxed">
          <p><strong>1. Custody Record:</strong> Applicant has been in continuous judicial custody since <span className="font-mono text-accent">{undertrial.custodyStartDate}</span> ({eligibility.timeServed.daysServed} Days served).</p>
          <p><strong>2. BNSS 479 Mandate:</strong> {eligibility.timeServed.bnss479Reasoning}</p>
          <p><strong>3. Low Flight Risk:</strong> Verified local residence in {undertrial.district}, flight risk score: <span className="font-mono text-emerald-400">{eligibility.riskAssessment.flightRiskScore}/10</span>.</p>
        </div>

        <div className="bg-accent/10 border border-accent/40 p-4 rounded-xl text-xs text-accent font-sans italic">
          <strong>Supreme Court Precedents Relied Upon:</strong> Satender Kumar Antil v. CBI (2022) 10 SCC 51 &amp; Arnesh Kumar v. State of Bihar (2014) 8 SCC 273.
        </div>

        <div className="pt-4 border-t border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 font-mono text-xs text-muted-foreground">
          <span>Date: {currentDate}</span>
          <span className="font-bold text-foreground">Advocate for Applicant / DLSA Panel Counsel</span>
        </div>
      </div>
    </div>
  );
};
