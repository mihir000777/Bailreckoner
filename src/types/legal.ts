export type UserRole = 'prisoner' | 'lawyer' | 'judge';

export type OffenseCategory = 
  | 'Bailable' 
  | 'Non-Bailable' 
  | 'Heinous' 
  | 'Special Act';

export type SpecialStatuteCategory = 
  | 'CYBER_CRIME'
  | 'CRIMES_AGAINST_SC_ST'
  | 'CRIMES_AGAINST_WOMEN'
  | 'CRIMES_AGAINST_CHILDREN'
  | 'OFFENCES_AGAINST_THE_STATE'
  | 'ECONOMIC_OFFENSE'
  | 'CRIMES_AGAINST_FOREIGNERS'
  | 'GENERAL_PENAL';

export interface Offense {
  id: string;
  ipcSection: string;
  bnsSection: string;
  title: string;
  description: string;
  category: OffenseCategory;
  statuteCategory: SpecialStatuteCategory;
  maxSentenceYears: number; // Max punishment in years
  maxFineAmountRupees?: number;
  isCompoundable: boolean;
  specialAct: string;
  specialActDetails?: string;
  bailableCondition?: string;
  keyElements: string[];
}

export interface UndertrialCase {
  id: string;
  prisonerName: string;
  prisonerAge: number;
  gender: 'male' | 'female' | 'other';
  isForeignNational?: boolean; // For Crimes Against Foreigners requirement
  isFirstTimeOffender: boolean;
  firNumber: string;
  policeStation: string;
  state: string;
  district: string;
  courtName: string;
  custodyStartDate: string; // ISO YYYY-MM-DD
  offenseIds: string[];
  
  // Risk Checklist Factors
  flightRiskFactors: {
    hasPermanentAddress: boolean;
    hasJobFamilyInJurisdiction: boolean;
    hasPassportSurrendered: boolean;
    previousJumpedBail: boolean;
  };
  tamperingRiskFactors: {
    witnessesAreRelatives: boolean;
    isInfluentialPerson: boolean;
    evidenceSecuredByPolice: boolean;
  };
  societalDangerFactors: {
    hasPriorConvictions: boolean;
    crimeInvolvedViolence: boolean;
    multiplePendingCases: boolean;
  };

  lawyerNotes?: string;
  judgeNotes?: string;
  status: 'draft' | 'pending_review' | 'granted' | 'rejected' | 'under_appeal';
  createdAt: string;
}

export interface TimelineMilestone {
  label: string;
  date: string; // ISO or formatted date
  daysFromStart: number;
  isCompleted: boolean;
  isCurrentStatus?: boolean;
  description: string;
  percentage: number;
}

export interface TimeServedDetails {
  daysServed: number;
  monthsServed: number;
  yearsServed: number;
  maxSentenceYears: number;
  fractionOfMaxSentence: number;
  halfTimeThresholdYears: number;
  oneThirdThresholdYears: number;
  eligibleUnderBnss479: boolean;
  eligibleUnderOneThirdRule: boolean;
  bnss479Reasoning: string;
  sentenceConcurrencyBasis?: string;
  
  // Timeline projections
  custodyStartDateFormatted: string;
  oneThirdEligibilityDate: string;
  halfTimeEligibilityDate: string;
  maxSentenceDate: string;
  timelineMilestones: TimelineMilestone[];
}

export interface ProceduralRequirements {
  personalBondAmount: number;
  suretyBondCount: number;
  suretyRequirements: string[];
  fineAmountEstimated?: number;
  identityVerificationDocs: string[];
  sec35BnssCompliance: {
    isCompliant: boolean;
    details: string;
  };
  bsaCompliance?: {
    isElectronicEvidenceAdmissible: boolean;
    certificateDetails: string;
  };
  proceduralChecklist: string[];
}

export interface RiskAssessmentResult {
  overallRiskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  overallScore: number; // 0 to 100
  flightRiskScore: number;
  tamperingRiskScore: number;
  societalDangerScore: number;
  details: string[];
  recommendedConditions: string[];
}

export interface EligibilityResult {
  status: 'ELIGIBLE' | 'NOT_ELIGIBLE' | 'CONDITIONAL';
  primaryReason: string;
  timeServed: TimeServedDetails;
  riskAssessment: RiskAssessmentResult;
  proceduralRequirements: ProceduralRequirements;
  bailableStatusSummary: string;
  compoundableSummary: string;
  specialActOverride: {
    hasOverride: boolean;
    actName?: string;
    details?: string;
  };
  statutoryBasis: string[];
  recommendedSteps: string[];
}

export interface JudicialPrecedent {
  caseTitle: string;
  citation: string;
  court: 'Supreme Court of India' | 'High Court';
  year: number;
  relevanceSummary: string;
  keyPrinciple: string;
  appliedSections: string[];
}
