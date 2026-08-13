import { UndertrialCase, EligibilityResult, Offense } from '@/types/legal';
import { getOffensesByIds } from './offenseDb';

export function generateBailApplicationText(
  undertrial: UndertrialCase,
  eligibility: EligibilityResult
): string {
  const offenses: Offense[] = getOffensesByIds(undertrial.offenseIds);
  const ipcSections = offenses.map((o) => o.ipcSection).join(', ');
  const bnsSections = offenses.map((o) => o.bnsSection).join(', ');
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return `
BEFORE THE HONORABLE COURT OF THE CHIEF JUDICIAL MAGISTRATE / DISTRICT & SESSIONS JUDGE
AT ${undertrial.district.toUpperCase()}, ${undertrial.state.toUpperCase()}

BAIL APPLICATION NO. ________ OF ${new Date().getFullYear()}

IN THE MATTER OF:
${undertrial.prisonerName.toUpperCase()}, Aged about ${undertrial.prisonerAge} years,
Resident of ${undertrial.district}, ${undertrial.state}
(Currently incarcerated in Central Jail)
                                                   ... APPLICANT / UNDERTRIAL PRISONER

VERSUS

THE STATE OF ${undertrial.state.toUpperCase()}
Through P.S. ${undertrial.policeStation.toUpperCase()}
                                                   ... PROSECUTION / RESPONDENT

F.I.R. NO.: ${undertrial.firNumber}
POLICE STATION: ${undertrial.policeStation}
SECTIONS CHARGED: ${ipcSections} (Corresponding to ${bnsSections})

================================================================================
APPLICATION FOR GRANT OF BAIL UNDER SECTION 479 / SECTION 480 / SECTION 482 OF THE 
BHARATIYA NAGARIK SURAKSHA SANHITA, 2023 (BNSS) READ WITH SECTION 436A / 437 / 439 OF CrPC, 1973
================================================================================

MOST RESPECTFULLY SHOWETH:

1. That the Applicant / Undertrial Prisoner was arrested in connection with FIR No. ${undertrial.firNumber} registered at P.S. ${undertrial.policeStation} and has been in continuous judicial custody since ${undertrial.custodyStartDate}.

2. MANDATORY STATUTORY ELIGIBILITY UNDER BNSS 2023 SECTION 479:
   a. Total Custody Duration Undergone: ${eligibility.timeServed.daysServed} Days (${eligibility.timeServed.yearsServed} Years / ${eligibility.timeServed.monthsServed} Months).
   b. Prescribed Maximum Punishment for Alleged Offense: ${eligibility.timeServed.maxSentenceYears} Years.
   c. Statutory Threshold: ${
     undertrial.isFirstTimeOffender
       ? `As a first-time offender with no prior criminal antecedents, the Applicant has completed 1/3rd of the maximum prescribed sentence (${eligibility.timeServed.oneThirdThresholdYears} years threshold) pursuant to BNSS 2023 Section 479(1) First Proviso.`
       : `The Applicant has completed continuous detention exceeding one-half (1/2) of the maximum period of imprisonment (${eligibility.timeServed.halfTimeThresholdYears} years threshold) pursuant to BNSS 2023 Section 479(1) / CrPC Section 436A.`
   }

3. NO FLIGHT RISK OR WITNESS TAMPERING:
   a. The Applicant is a law-abiding citizen with permanent deep-rooted family ties in ${undertrial.district}.
   b. The Applicant's flight risk score is assessed as LOW (${eligibility.riskAssessment.flightRiskScore}/10). The Applicant has no passport / is willing to surrender all travel documents.
   c. The investigation is substantially complete and all physical evidence has been secured by the Investigating Officer.

4. BINDING SUPREME COURT PRECEDENTS:
   a. Satender Kumar Antil v. CBI (2022) 10 SCC 51 — "Bail is the rule, jail is an exception. Undertrials serving substantial sentence are entitled to release on personal bond."
   b. Arnesh Kumar v. State of Bihar (2014) 8 SCC 273 — "Routine pre-trial detention without satisfying necessity of arrest is unconstitutional."

5. PRAYER:
   It is therefore most humbly prayed that this Honorable Court may be pleased to:
   (i) Release the Applicant / Undertrial Prisoner ${undertrial.prisonerName} on bail in FIR No. ${undertrial.firNumber} of P.S. ${undertrial.policeStation};
   (ii) Accept personal bond with solvent local surety as deemed fit by this Court;
   (iii) Pass any other order(s) as this Honorable Court deems fit in the interest of justice.

AND FOR THIS ACT OF KINDNESS, THE APPLICANT SHALL EVER PRAY.

Date: ${currentDate}
Place: ${undertrial.district}

                                                   _______________________________________
                                                   ADVOCATE FOR THE APPLICANT / LEGAL AID
`;
}
