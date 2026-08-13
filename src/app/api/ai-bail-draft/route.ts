import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { UndertrialCase, EligibilityResult } from '@/types/legal';
import { getOffensesByIds } from '@/lib/offenseDb';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { undertrial, eligibility }: { undertrial: UndertrialCase; eligibility: EligibilityResult } = body;

    if (!undertrial || !eligibility) {
      return NextResponse.json({ success: false, error: 'Missing undertrial or eligibility data' }, { status: 400 });
    }

    const offenses = getOffensesByIds(undertrial.offenseIds);
    const ipcSections = offenses.map((o) => `${o.ipcSection} (${o.bnsSection}): ${o.title}`).join('; ');
    const currentDate = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    const year = new Date().getFullYear();

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ success: true, draft: buildFallbackDraft(undertrial, eligibility, ipcSections, currentDate, year) });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
You are a senior Indian criminal defense advocate. Draft a complete, formal BAIL APPLICATION for the Indian court system using the following case details. 

Use formal legal language. Structure it exactly as an Indian court bail application with:
1. Court heading
2. Bail Application Number
3. Applicant/Respondent details  
4. Facts of the case (numbered paragraphs)
5. Grounds for bail (numbered)
6. Prayer clause
7. Signature block

CASE DETAILS:
- Prisoner: ${undertrial.prisonerName}, Age ${undertrial.prisonerAge}, ${undertrial.gender}
- FIR: ${undertrial.firNumber} at ${undertrial.policeStation}, ${undertrial.state}
- Court: ${undertrial.courtName}, ${undertrial.district}
- Custody Start: ${undertrial.custodyStartDate} (${eligibility.timeServed.daysServed} days / ${eligibility.timeServed.yearsServed} years served)
- First-Time Offender: ${undertrial.isFirstTimeOffender ? 'Yes' : 'No'}
- Charges: ${ipcSections}
- Max Sentence: ${eligibility.timeServed.maxSentenceYears} years
- BNSS 479 Status: ${eligibility.timeServed.eligibleUnderBnss479 ? 'ELIGIBLE (50% served)' : eligibility.timeServed.eligibleUnderOneThirdRule ? 'ELIGIBLE (1/3rd served, first offender)' : 'Not yet mandatory but discretionary'}
- Risk Level: ${eligibility.riskAssessment.overallRiskLevel}
- Today's Date: ${currentDate}

Cite: Satender Kumar Antil v. CBI (2022) 10 SCC 51, Arnesh Kumar v. State of Bihar (2014) 8 SCC 273.

Write the full bail application draft in plain text, properly formatted with line breaks. No markdown. Output ONLY the application text.
`;

    const result = await model.generateContent(prompt);
    const draft = result.response.text().trim();

    return NextResponse.json({ success: true, draft });
  } catch (error: any) {
    console.error('AI Draft error:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Draft generation failed' }, { status: 500 });
  }
}

function buildFallbackDraft(
  undertrial: UndertrialCase,
  eligibility: EligibilityResult,
  ipcSections: string,
  currentDate: string,
  year: number
): string {
  return `IN THE COURT OF THE CHIEF JUDICIAL MAGISTRATE / DISTRICT & SESSIONS JUDGE
AT ${undertrial.district.toUpperCase()}, ${undertrial.state.toUpperCase()}

BAIL APPLICATION NO. ________ OF ${year}

IN THE MATTER OF:
${undertrial.prisonerName.toUpperCase()}, Aged ${undertrial.prisonerAge} years, ${undertrial.gender === 'female' ? 'D/o' : 'S/o'} _____________, 
Resident of ${undertrial.district}, ${undertrial.state}                                                    ...APPLICANT / UNDERTRIAL PRISONER

VERSUS

THE STATE OF ${undertrial.state.toUpperCase()} 
Through the Police Station: ${undertrial.policeStation}                                               ...RESPONDENT

FIR NO. ${undertrial.firNumber}
Registered at: ${undertrial.policeStation}
Sections: ${ipcSections}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

APPLICATION FOR BAIL UNDER SECTION 479 OF THE BHARATIYA NAGARIK SURAKSHA SANHITA 2023 / SECTION 436A CrPC 1973

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MOST RESPECTFULLY SHOWETH:

1. FACTS: That the Applicant, ${undertrial.prisonerName}, has been in continuous judicial custody since ${undertrial.custodyStartDate} in connection with the above-mentioned FIR, for a total period of ${eligibility.timeServed.daysServed} days (approximately ${eligibility.timeServed.yearsServed} years), without any trial being concluded.

2. BNSS 479 ENTITLEMENT: That the Applicant has served ${eligibility.timeServed.eligibleUnderOneThirdRule ? 'one-third (1/3rd) of the maximum prescribed punishment as a first-time offender, thereby entitling' : eligibility.timeServed.eligibleUnderBnss479 ? 'one-half (1/2) of the maximum prescribed punishment, thereby entitling' : 'a substantial period of custody and'} the Applicant to mandatory bail under BNSS 2023 Section 479 / CrPC Section 436A.

3. FIRST-TIME OFFENDER: ${undertrial.isFirstTimeOffender ? 'That the Applicant is a first-time offender with no prior criminal history or antecedents. The Applicant is entitled to the benefit of the First Proviso to Section 479 BNSS 2023, which mandates release upon completion of one-third of the maximum sentence.' : 'That the Applicant has served sufficient period of custody and is entitled to the benefit of Section 479 BNSS 2023.'}

4. LOW FLIGHT RISK: That the Applicant has deep-rooted ties to the local jurisdiction, with permanent residential address and family in ${undertrial.district}. The overall flight risk assessment is ${eligibility.riskAssessment.overallRiskLevel}. The Applicant undertakes to comply with all conditions imposed by this Honorable Court.

5. PRECEDENTS: 
   (a) In Satender Kumar Antil v. Central Bureau of Investigation, (2022) 10 SCC 51, the Hon'ble Supreme Court of India held that "bail is the rule and jail is the exception" and directed that undertrials who have served substantial custody should be released on personal bonds.
   (b) In Arnesh Kumar v. State of Bihar, (2014) 8 SCC 273, the Hon'ble Supreme Court mandated that arrest should not be made routinely and that pre-trial incarceration should not become punitive.
   (c) In Bhadresh Bipinbhai Sheth v. State of Gujarat, (2016) 1 SCC 152, the Court upheld the primacy of personal liberty under Article 21 of the Constitution of India.

6. INVESTIGATION COMPLETE: That the Police investigation in the above matter is substantially complete. The charge sheet has been filed. The continued detention of the Applicant serves no investigative purpose and amounts to punitive pre-trial incarceration contrary to the principles established by the Supreme Court.

7. UNDERTAKINGS: The Applicant undertakes to:
   (a) Appear before this Honorable Court on all dates of hearing without fail;
   (b) Not tamper with prosecution witnesses or evidence;
   (c) Surrender passport if directed;
   (d) Report to the local Police Station as directed by this Court.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PRAYER

WHEREFORE, it is most respectfully prayed that this Honorable Court may be pleased to:

(i)  Grant bail to the Applicant, ${undertrial.prisonerName}, in FIR No. ${undertrial.firNumber} at P.S. ${undertrial.policeStation}, ${undertrial.state}, under Section 479 of the Bharatiya Nagarik Suraksha Sanhita 2023 / Section 436A CrPC;

(ii) Direct the release of the Applicant on execution of a personal bond of Rs. ${eligibility.proceduralRequirements.personalBondAmount.toLocaleString('en-IN')}/- with ${eligibility.proceduralRequirements.suretyBondCount} local solvent surety/-ies, to the satisfaction of this Honorable Court;

(iii) Pass any other order(s) as this Honorable Court may deem fit and proper in the interest of justice.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Dated: ${currentDate}
Place: ${undertrial.district}

                                                          Respectfully submitted,

                                                          _______________________________
                                                          Advocate for the Applicant / DLSA Counsel
                                                          Bar Council Enrollment No.: ___________

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Generated by Bail Reckoner — BNSS 479 Computation Engine (SIH 268405)`;
}
