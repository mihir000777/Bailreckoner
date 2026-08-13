import { NextRequest, NextResponse } from 'next/server';
import { evaluateBailEligibility } from '@/lib/legalEngine';
import { fetchAiPrecedentsAndSummary } from '@/lib/gemini';
import { UndertrialCase } from '@/types/legal';

export const dynamic = 'force-dynamic';

/**
 * Plug-and-Play Integration API Endpoint for external legal/jail management systems
 * POST /api/reckoner/evaluate
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const fullCase: UndertrialCase = {
      id: body.id || `case-ext-${Date.now()}`,
      prisonerName: body.prisonerName || 'Anonymous Applicant',
      prisonerAge: body.prisonerAge || 30,
      gender: body.gender || 'male',
      isFirstTimeOffender: body.isFirstTimeOffender ?? true,
      isForeignNational: body.isForeignNational ?? false,
      firNumber: body.firNumber || 'FIR 101/2024',
      policeStation: body.policeStation || 'Central P.S.',
      state: body.state || 'Bihar',
      district: body.district || 'Patna',
      courtName: body.courtName || 'District & Sessions Court',
      custodyStartDate: body.custodyStartDate,
      offenseIds: body.offenseIds && body.offenseIds.length > 0 ? body.offenseIds : ['offense-ipc-420'],
      flightRiskFactors: {
        hasPermanentAddress: body.flightRiskFactors?.hasPermanentAddress ?? true,
        hasJobFamilyInJurisdiction: body.flightRiskFactors?.hasJobFamilyInJurisdiction ?? true,
        hasPassportSurrendered: body.flightRiskFactors?.hasPassportSurrendered ?? false,
        previousJumpedBail: body.flightRiskFactors?.previousJumpedBail ?? false,
      },
      tamperingRiskFactors: {
        witnessesAreRelatives: body.tamperingRiskFactors?.witnessesAreRelatives ?? false,
        isInfluentialPerson: body.tamperingRiskFactors?.isInfluentialPerson ?? false,
        evidenceSecuredByPolice: body.tamperingRiskFactors?.evidenceSecuredByPolice ?? true,
      },
      societalDangerFactors: {
        hasPriorConvictions: body.societalDangerFactors?.hasPriorConvictions ?? false,
        crimeInvolvedViolence: body.societalDangerFactors?.crimeInvolvedViolence ?? false,
        multiplePendingCases: body.societalDangerFactors?.multiplePendingCases ?? false,
      },
      status: body.status || 'pending_review',
      createdAt: body.createdAt || new Date().toISOString(),
    };

    const eligibility = evaluateBailEligibility(fullCase);
    const intelligence = await fetchAiPrecedentsAndSummary(fullCase, eligibility);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      caseId: body.id || `case-ext-${Date.now()}`,
      prisonerName: body.prisonerName,
      eligibility,
      aiPrecedents: intelligence.precedents,
      aiSummary: intelligence.aiSummary,
      recommendedPrayer: intelligence.recommendedPrayer,
      integrationStatus: 'Plug-and-play API active',
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal evaluation error' },
      { status: 500 }
    );
  }
}
