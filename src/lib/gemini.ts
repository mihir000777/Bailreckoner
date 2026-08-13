import { GoogleGenerativeAI } from '@google/generative-ai';
import { UndertrialCase, EligibilityResult, JudicialPrecedent } from '@/types/legal';

const DEFAULT_PRECEDENTS: JudicialPrecedent[] = [
  {
    caseTitle: 'Satender Kumar Antil v. Central Bureau of Investigation',
    citation: '(2022) 10 SCC 51',
    court: 'Supreme Court of India',
    year: 2022,
    relevanceSummary:
      'Supreme Court mandated strict guidelines for bail categorising offences into A, B, C, D. Emphasized that bail is the rule and jail is an exception, specifically protecting undertrials from unwarranted prolonged custody.',
    keyPrinciple:
      'Bail is the rule and jail is the exception. Undertrial prisoners who have served substantial custody should be granted bail on personal bonds.',
    appliedSections: ['BNSS 479', 'CrPC 436A', 'CrPC 437', 'CrPC 439'],
  },
  {
    caseTitle: 'Arnesh Kumar v. State of Bihar',
    citation: '(2014) 8 SCC 273',
    court: 'Supreme Court of India',
    year: 2014,
    relevanceSummary:
      'Mandatory pre-arrest notice under Sec 41A CrPC (Sec 35 BNSS) for offenses carrying punishment up to 7 years. Arrest should not be routine or automatic.',
    keyPrinciple:
      'Arrest should not be made automatically without satisfying the necessity of arrest parameters.',
    appliedSections: ['IPC 498A', 'IPC 420', 'BNSS 35', 'CrPC 41A'],
  },
  {
    caseTitle: 'Sanjay Chandra v. Central Bureau of Investigation',
    citation: '(2012) 1 SCC 40',
    court: 'Supreme Court of India',
    year: 2012,
    relevanceSummary:
      'Object of bail is to secure attendance at trial, not to be punitive. Gravity of charge alone cannot be sole ground to refuse bail when investigation is complete.',
    keyPrinciple:
      'Pre-trial detention should not turn into punitive incarceration prior to conviction.',
    appliedSections: ['IPC 420', 'IPC 468', 'CrPC 439'],
  },
  {
    caseTitle: 'Bhadresh Bipinbhai Sheth v. State of Gujarat',
    citation: '(2016) 1 SCC 152',
    court: 'Supreme Court of India',
    year: 2016,
    relevanceSummary:
      'Personal liberty under Article 21 of Constitution of India is paramount. Balancing individual liberty with societal interest during bail evaluation.',
    keyPrinciple:
      'Fundamental Right to Liberty under Article 21 must be preserved during undertrial period.',
    appliedSections: ['BNSS 482', 'CrPC 438', 'Article 21'],
  },
];

export async function fetchAiPrecedentsAndSummary(
  undertrial: UndertrialCase,
  eligibility: EligibilityResult
): Promise<{
  aiSummary: string;
  precedents: JudicialPrecedent[];
  keyStrengths: string[];
  keyChallenges: string[];
  recommendedPrayer: string;
}> {
  const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (!apiKey) {
    // Return structured offline intelligence fallback
    return getFallbackIntelligence(undertrial, eligibility);
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
You are a senior Indian Legal Expert & Supreme Court Advocate specialized in criminal jurisprudence, the Bharatiya Nagarik Suraksha Sanhita (BNSS 2023), CrPC 1973, and criminal law reforms.

Evaluate the following undertrial prisoner bail case details:
- Prisoner Name: ${undertrial.prisonerName}
- Age / Gender: ${undertrial.prisonerAge} / ${undertrial.gender}
- First Time Offender: ${undertrial.isFirstTimeOffender ? 'YES' : 'NO'}
- FIR Number & Police Station: ${undertrial.firNumber}, ${undertrial.policeStation}, ${undertrial.state}
- Custody Duration Served: ${eligibility.timeServed.daysServed} days (${eligibility.timeServed.yearsServed} years)
- Max Prescribed Punishment: ${eligibility.timeServed.maxSentenceYears} years
- BNSS 479 Eligibility: ${eligibility.timeServed.eligibleUnderBnss479 ? 'ELIGIBLE (Half-time served)' : eligibility.timeServed.eligibleUnderOneThirdRule ? 'ELIGIBLE (1/3rd term first-time offender)' : 'NOT MANDATORY YET'}
- Risk Level: ${eligibility.riskAssessment.overallRiskLevel} (Flight Risk Score: ${eligibility.riskAssessment.flightRiskScore}/10, Tampering Score: ${eligibility.riskAssessment.tamperingRiskScore}/10)
- Bailable Summary: ${eligibility.bailableStatusSummary}

Respond strictly in valid JSON format matching this schema:
{
  "aiSummary": "Concise 3-sentence legal executive summary highlighting statutory rights under BNSS 479 / CrPC 436A and key case merits.",
  "keyStrengths": ["Strength 1", "Strength 2", "Strength 3"],
  "keyChallenges": ["Challenge 1", "Challenge 2"],
  "recommendedPrayer": "Formal Prayer paragraph for bail application to be submitted before the Honorable Court."
}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanedText);

    return {
      aiSummary: parsed.aiSummary || getFallbackIntelligence(undertrial, eligibility).aiSummary,
      precedents: DEFAULT_PRECEDENTS,
      keyStrengths: parsed.keyStrengths || getFallbackIntelligence(undertrial, eligibility).keyStrengths,
      keyChallenges: parsed.keyChallenges || getFallbackIntelligence(undertrial, eligibility).keyChallenges,
      recommendedPrayer: parsed.recommendedPrayer || getFallbackIntelligence(undertrial, eligibility).recommendedPrayer,
    };
  } catch (error) {
    console.error('Gemini API call error, falling back to static intelligence:', error);
    return getFallbackIntelligence(undertrial, eligibility);
  }
}

function getFallbackIntelligence(undertrial: UndertrialCase, eligibility: EligibilityResult) {
  const isEligible = eligibility.status === 'ELIGIBLE';
  const days = eligibility.timeServed.daysServed;
  const maxYears = eligibility.timeServed.maxSentenceYears;

  const aiSummary = `Undertrial prisoner ${undertrial.prisonerName} has undergone continuous custody of ${days} days in connection with FIR No. ${undertrial.firNumber} (${undertrial.policeStation}). ${
    isEligible
      ? `The applicant is statutorily entitled to release on bail pursuant to BNSS 2023 Section 479 (${undertrial.isFirstTimeOffender ? '1/3rd period served for first-time offender' : '1/2 period served'}).`
      : `The application falls under discretionary judicial evaluation under BNSS 482 / CrPC 439, as custody duration equals ${((days / (maxYears * 365.25)) * 100).toFixed(1)}% of maximum sentence.`
  } Risk assessment scores indicate ${eligibility.riskAssessment.overallRiskLevel} risk of flight or witness tampering.`;

  const keyStrengths = [
    `Custody duration of ${days} days (${eligibility.timeServed.monthsServed} months) served without trial delay attributable to accused.`,
    undertrial.isFirstTimeOffender
      ? 'Clean prior record with no history of previous convictions or absconding (First-Time Offender).'
      : 'Accused has permanent deep-rooted residential and family ties in local court jurisdiction.',
    'Police investigation substantially complete and physical evidence secured.',
  ];

  const keyChallenges = [
    eligibility.riskAssessment.overallRiskLevel === 'HIGH'
      ? 'Prosecution opposition citing gravity of charges and potential witness influence.'
      : 'Need to satisfy court regarding reliability of local solvent sureties.',
  ];

  const recommendedPrayer = `WHEREFORE, it is most respectfully prayed that this Honorable Court may be pleased to order the release of the Applicant / Undertrial Prisoner ${undertrial.prisonerName} on bail in FIR No. ${undertrial.firNumber} registered at P.S. ${undertrial.policeStation}, on executing a personal bond with solvent surety to the satisfaction of this Court, in the interest of justice.`;

  return {
    aiSummary,
    precedents: DEFAULT_PRECEDENTS,
    keyStrengths,
    keyChallenges,
    recommendedPrayer,
  };
}
