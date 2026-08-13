import {
  UndertrialCase,
  EligibilityResult,
  TimeServedDetails,
  RiskAssessmentResult,
  ProceduralRequirements,
  Offense,
  TimelineMilestone,
} from '@/types/legal';
import { getOffensesByIds } from './offenseDb';

export function calculateTimeServed(
  custodyStartDate: string,
  maxSentenceYears: number,
  isFirstTimeOffender: boolean
): TimeServedDetails {
  const start = new Date(custodyStartDate);
  const now = new Date();
  
  // Calculate difference in days
  const diffTime = Math.max(0, now.getTime() - start.getTime());
  const daysServed = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const yearsServed = daysServed / 365.25;
  const monthsServed = Math.floor(daysServed / 30.4375);

  const halfTimeThresholdYears = maxSentenceYears / 2;
  const oneThirdThresholdYears = maxSentenceYears / 3;
  const fractionOfMaxSentence = maxSentenceYears > 0 ? yearsServed / maxSentenceYears : 0;

  const eligibleUnderBnss479 = yearsServed >= halfTimeThresholdYears;
  const eligibleUnderOneThirdRule = isFirstTimeOffender && yearsServed >= oneThirdThresholdYears;

  // Calculate projected eligibility dates
  const oneThirdDate = new Date(start.getTime() + oneThirdThresholdYears * 365.25 * 24 * 60 * 60 * 1000);
  const halfTimeDate = new Date(start.getTime() + halfTimeThresholdYears * 365.25 * 24 * 60 * 60 * 1000);
  const maxSentenceDateObj = new Date(start.getTime() + maxSentenceYears * 365.25 * 24 * 60 * 60 * 1000);

  const formatDate = (d: Date) =>
    d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  const timelineMilestones: TimelineMilestone[] = [
    {
      label: 'Custody Start',
      date: formatDate(start),
      daysFromStart: 0,
      isCompleted: true,
      description: 'Accused remanded to judicial custody',
      percentage: 0,
    },
    {
      label: '1/3rd Term (First Offender)',
      date: formatDate(oneThirdDate),
      daysFromStart: Math.round(oneThirdThresholdYears * 365.25),
      isCompleted: daysServed >= oneThirdThresholdYears * 365.25,
      isCurrentStatus: isFirstTimeOffender && daysServed >= oneThirdThresholdYears * 365.25,
      description: 'BNSS 479(1) First Proviso mandatory bail threshold',
      percentage: Math.round((oneThirdThresholdYears / maxSentenceYears) * 100),
    },
    {
      label: '1/2 Term (Half-Sentence)',
      date: formatDate(halfTimeDate),
      daysFromStart: Math.round(halfTimeThresholdYears * 365.25),
      isCompleted: daysServed >= halfTimeThresholdYears * 365.25,
      isCurrentStatus: !isFirstTimeOffender && daysServed >= halfTimeThresholdYears * 365.25,
      description: 'BNSS 479(1) / CrPC 436A mandatory bail threshold',
      percentage: 50,
    },
    {
      label: 'Max Prescribed Term',
      date: formatDate(maxSentenceDateObj),
      daysFromStart: Math.round(maxSentenceYears * 365.25),
      isCompleted: daysServed >= maxSentenceYears * 365.25,
      description: 'Maximum punishment period under penal code',
      percentage: 100,
    },
  ];

  let bnss479Reasoning = '';
  if (eligibleUnderOneThirdRule) {
    bnss479Reasoning = `Eligible for mandatory bail under BNSS 2023 Section 479(1) First Proviso: As a first-time offender, custody duration (${yearsServed.toFixed(1)} years / ${daysServed} days) reached 1/3rd threshold on ${formatDate(oneThirdDate)}.`;
  } else if (eligibleUnderBnss479) {
    bnss479Reasoning = `Eligible for mandatory bail under BNSS 2023 Section 479(1) / CrPC 436A: Custody duration (${yearsServed.toFixed(1)} years / ${daysServed} days) reached 1/2 threshold on ${formatDate(halfTimeDate)}.`;
  } else {
    const requiredDays = Math.ceil((isFirstTimeOffender ? oneThirdThresholdYears : halfTimeThresholdYears) * 365.25);
    const remainingDays = Math.max(0, requiredDays - daysServed);
    const targetDate = isFirstTimeOffender ? formatDate(oneThirdDate) : formatDate(halfTimeDate);
    bnss479Reasoning = `Currently served ${daysServed} days (${(fractionOfMaxSentence * 100).toFixed(1)}% of max sentence). ${remainingDays} more days required for mandatory BNSS 479 release (Target Date: ${targetDate}).`;
  }

  return {
    daysServed,
    monthsServed,
    yearsServed: Number(yearsServed.toFixed(2)),
    maxSentenceYears,
    fractionOfMaxSentence: Number(fractionOfMaxSentence.toFixed(3)),
    halfTimeThresholdYears: Number(halfTimeThresholdYears.toFixed(2)),
    oneThirdThresholdYears: Number(oneThirdThresholdYears.toFixed(2)),
    eligibleUnderBnss479,
    eligibleUnderOneThirdRule,
    bnss479Reasoning,
    sentenceConcurrencyBasis: `Calculated on highest single charge (${maxSentenceYears} Yrs max) under pre-trial concurrent detention principles (BNSS 2023 Sec 479 & CrPC Sec 427).`,
    custodyStartDateFormatted: formatDate(start),
    oneThirdEligibilityDate: formatDate(oneThirdDate),
    halfTimeEligibilityDate: formatDate(halfTimeDate),
    maxSentenceDate: formatDate(maxSentenceDateObj),
    timelineMilestones,
  };
}

export function evaluateRiskScore(undertrial: UndertrialCase): RiskAssessmentResult {
  let flightScore = 0;
  let tamperingScore = 0;
  let societalScore = 0;
  const details: string[] = [];
  const recommendedConditions: string[] = ['Execution of Personal Bond with local surety'];

  // Foreign National Check (Crimes Against Foreigners requirement)
  if (undertrial.isForeignNational) {
    flightScore += 4;
    details.push('Foreign National applicant - High international flight risk (Embassy notification required)');
    recommendedConditions.push('Surrender of Passport to Court & Intimation to Embassy/Consulate');
  }

  // Flight Risk Evaluation
  if (!undertrial.flightRiskFactors.hasPermanentAddress) {
    flightScore += 3;
    details.push('No verified permanent residential address in jurisdiction');
  } else {
    recommendedConditions.push('Verification of permanent local address by SHO');
  }

  if (!undertrial.flightRiskFactors.hasJobFamilyInJurisdiction) {
    flightScore += 3;
    details.push('Limited family or employment ties to local jurisdiction');
  }

  if (undertrial.flightRiskFactors.previousJumpedBail) {
    flightScore += 4;
    details.push('Prior history of jumping bail or absconding');
  }

  if (undertrial.flightRiskFactors.hasPassportSurrendered) {
    flightScore = Math.max(0, flightScore - 2);
  } else {
    recommendedConditions.push('Surrender of passport before Magistrate');
  }

  // Witness Tampering Evaluation
  if (undertrial.tamperingRiskFactors.witnessesAreRelatives) {
    tamperingScore += 4;
    details.push('Material witnesses are known acquaintances or subordinates');
  }

  if (undertrial.tamperingRiskFactors.isInfluentialPerson) {
    tamperingScore += 3;
    details.push('High position of influence or authority over witnesses');
  }

  if (undertrial.tamperingRiskFactors.evidenceSecuredByPolice) {
    tamperingScore = Math.max(0, tamperingScore - 2);
    details.push('Police investigation and evidence seizure complete');
  } else {
    recommendedConditions.push('Strict order prohibiting contact with prosecution witnesses');
  }

  // Societal Danger Evaluation
  if (undertrial.societalDangerFactors.hasPriorConvictions) {
    societalScore += 4;
    details.push('History of prior criminal convictions');
  }

  if (undertrial.societalDangerFactors.crimeInvolvedViolence) {
    societalScore += 4;
    details.push('Alleged offense involves bodily harm or violent conduct');
  }

  if (undertrial.societalDangerFactors.multiplePendingCases) {
    societalScore += 2;
    details.push('Multiple concurrent pending criminal cases');
  }

  const overallScore = Math.round(((flightScore + tamperingScore + societalScore) / 30) * 100);

  let overallRiskLevel: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
  if (overallScore >= 60) {
    overallRiskLevel = 'HIGH';
    recommendedConditions.push('Bi-weekly reporting at local Police Station', 'Deposit of cash security / heavy surety bond');
  } else if (overallScore >= 30) {
    overallRiskLevel = 'MEDIUM';
    recommendedConditions.push('Weekly reporting at local Police Station on Sundays');
  } else {
    overallRiskLevel = 'LOW';
    recommendedConditions.push('Regular attendance on court hearing dates');
  }

  return {
    overallRiskLevel,
    overallScore,
    flightRiskScore: flightScore,
    tamperingRiskScore: tamperingScore,
    societalDangerScore: societalScore,
    details,
    recommendedConditions,
  };
}

export function evaluateProceduralRequirements(
  undertrial: UndertrialCase,
  offenses: Offense[],
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH'
): ProceduralRequirements {
  let personalBondAmount = 25000;
  let suretyBondCount = 1;

  if (riskLevel === 'HIGH') {
    personalBondAmount = 100000;
    suretyBondCount = 2;
  } else if (riskLevel === 'MEDIUM') {
    personalBondAmount = 50000;
    suretyBondCount = 1;
  }

  const totalFineEstimated = offenses.reduce(
    (sum, o) => sum + (o.maxFineAmountRupees || 10000),
    0
  );

  const maxSentenceYears = Math.max(...offenses.map((o) => o.maxSentenceYears), 1);
  const sec35IsCompliant = maxSentenceYears <= 7;

  return {
    personalBondAmount,
    suretyBondCount,
    suretyRequirements: [
      `${suretyBondCount} local solvent surety residing in ${undertrial.district}`,
      'Solvency Certificate issued by Tehsildar / Collectorate',
      'Proof of unencumbered immovable property or fixed deposit',
    ],
    fineAmountEstimated: totalFineEstimated,
    identityVerificationDocs: [
      'Aadhaar Card / Voter ID of undertrial prisoner',
      'Passport / Visa copy (mandatory for foreign nationals)',
      'Police Verification Report of surety by local SHO',
      'Jail Custody Certificate signed by Jail Superintendent',
    ],
    sec35BnssCompliance: {
      isCompliant: sec35IsCompliant,
      details: sec35IsCompliant
        ? 'Arrest notice under BNSS Sec 35 / CrPC Sec 41A mandatory prior to arrest (punishment <= 7 years).'
        : 'Offense punishment exceeds 7 years; formal remand under BNSS Sec 187 required.',
    },
    bsaCompliance: {
      isElectronicEvidenceAdmissible: true,
      certificateDetails: 'Bharatiya Saakshya Adhiniyam (BSA) 2023 Section 61 electronic record certificate verified for digital case evidence.',
    },
    proceduralChecklist: [
      'Verification of permanent residential address by SHO',
      'Affidavit of no prior convictions filed by advocate',
      'Execution of Personal Bond & Surety Bond in Court',
      'Surrender of Passport / Intimation to Authorities',
      'Compliance with BSA 2023 Section 61 electronic record certificate for digital evidence',
    ],
  };
}

export function evaluateBailEligibility(undertrial: UndertrialCase): EligibilityResult {
  const offenses: Offense[] = getOffensesByIds(undertrial.offenseIds);

  // Max sentence calculation
  const maxSentenceYears = Math.max(
    ...offenses.map((o) => o.maxSentenceYears),
    1
  );

  // Time served calculation
  const timeServed = calculateTimeServed(
    undertrial.custodyStartDate,
    maxSentenceYears,
    undertrial.isFirstTimeOffender
  );

  // Risk assessment calculation
  const riskAssessment = evaluateRiskScore(undertrial);

  // Procedural requirements calculation
  const proceduralRequirements = evaluateProceduralRequirements(
    undertrial,
    offenses,
    riskAssessment.overallRiskLevel
  );

  // Bailable & Compoundable breakdown
  const bailableCount = offenses.filter((o) => o.category === 'Bailable').length;
  const nonBailableCount = offenses.filter((o) => o.category === 'Non-Bailable').length;
  const heinousCount = offenses.filter((o) => o.category === 'Heinous').length;
  const specialActOffenses = offenses.filter((o) => o.category === 'Special Act' || o.specialAct !== 'NONE');

  const allBailable = bailableCount === offenses.length && offenses.length > 0;
  const hasHeinous = heinousCount > 0;
  const hasSpecialAct = specialActOffenses.length > 0;

  // Statutory Basis list
  const statutoryBasis: string[] = [
    'BNSS 2023 Section 479 (Maximum period for which undertrial prisoner can be detained)',
    'CrPC 1973 Section 436A (Corresponding legacy half-time rule)',
  ];

  if (allBailable) {
    statutoryBasis.push('BNSS 2023 Section 480 / CrPC Section 436 (Mandatory bail in bailable offenses)');
  } else {
    statutoryBasis.push('BNSS 2023 Section 482 / CrPC Section 437 & 439 (Discretionary judicial bail powers)');
  }

  if (maxSentenceYears <= 7) {
    statutoryBasis.push('Arnesh Kumar v. State of Bihar (2014) 8 SCC 273 (Notice under Sec 35 BNSS / 41A CrPC mandatory)');
  }

  // Special Act override check
  let specialActOverride = {
    hasOverride: false,
    actName: undefined as string | undefined,
    details: undefined as string | undefined,
  };

  if (hasSpecialAct) {
    const actNames = specialActOffenses.map((o) => o.specialActDetails || o.specialAct).join(', ');
    specialActOverride = {
      hasOverride: true,
      actName: actNames,
      details: `Special Act statutory conditions apply (e.g. NDPS Sec 37 / PMLA Sec 45 twin conditions or POCSO presumption).`,
    };
    statutoryBasis.push(`Special Act Override: ${actNames}`);
  }

  // Determine overall status
  let status: 'ELIGIBLE' | 'NOT_ELIGIBLE' | 'CONDITIONAL' = 'CONDITIONAL';
  let primaryReason = '';

  if (allBailable) {
    status = 'ELIGIBLE';
    primaryReason = 'All charged offenses are bailable under BNSS 2023 First Schedule / CrPC Section 436. Entitled to bail as a matter of right upon executing personal bond.';
  } else if (timeServed.eligibleUnderBnss479 || timeServed.eligibleUnderOneThirdRule) {
    status = 'ELIGIBLE';
    primaryReason = timeServed.bnss479Reasoning;
  } else if (hasHeinous && timeServed.fractionOfMaxSentence < 0.5) {
    status = 'NOT_ELIGIBLE';
    primaryReason = `Case involves heinous offense carrying sentence exceeding 10 years or life imprisonment. Detention duration (${timeServed.daysServed} days) is less than half-sentence threshold under BNSS 479 proviso.`;
  } else if (hasSpecialAct && riskAssessment.overallRiskLevel === 'HIGH') {
    status = 'NOT_ELIGIBLE';
    primaryReason = `Special Act statutory bar active combined with high flight/tampering risk. Satisfaction of twin statutory conditions required before court.`;
  } else {
    status = 'CONDITIONAL';
    primaryReason = `Discretionary bail under judicial evaluation (BNSS Sec 482 / CrPC Sec 439). Case strength depends on completion of investigation, charge sheet filing, and imposition of surety conditions.`;
  }

  const recommendedSteps: string[] = [];
  if (status === 'ELIGIBLE') {
    recommendedSteps.push(
      'Draft and file Bail Application under BNSS Section 479 / Section 480 before the competent Magistrate Court.',
      'Attach Custody Certificate issued by Jail Superintendent certifying total days served.',
      'File affidavit confirming no prior criminal convictions if claiming first-time offender 1/3rd benefit.'
    );
  } else if (status === 'CONDITIONAL') {
    recommendedSteps.push(
      'Highlight completion of police investigation and filing of Charge Sheet (Sec 193 BNSS).',
      'Demonstrate willingness to submit passport and furnish solvent local sureties.',
      'Cite Supreme Court precedents (*Satender Kumar Antil* & *Arnesh Kumar*) on unnecessary pre-trial incarceration.'
    );
  } else {
    recommendedSteps.push(
      'Wait for completion of key witness depositions before filing fresh bail application under changed circumstances.',
      'Apply for interim bail on medical or humanitarian grounds if applicable.',
      'File representation to District Legal Services Authority (DLSA) for legal aid review.'
    );
  }

  return {
    status,
    primaryReason,
    timeServed,
    riskAssessment,
    proceduralRequirements,
    bailableStatusSummary: `${bailableCount} Bailable, ${nonBailableCount} Non-Bailable, ${heinousCount} Heinous`,
    compoundableSummary: offenses.some((o) => o.isCompoundable)
      ? 'Contains compoundable offense(s) - settlement possible'
      : 'Non-compoundable offenses',
    specialActOverride,
    statutoryBasis,
    recommendedSteps,
  };
}
