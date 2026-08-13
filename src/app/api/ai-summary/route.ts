import { NextRequest, NextResponse } from 'next/server';
import { fetchAiPrecedentsAndSummary } from '@/lib/gemini';
import { evaluateBailEligibility } from '@/lib/legalEngine';
import { UndertrialCase } from '@/types/legal';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const undertrial: UndertrialCase = await req.json();
    if (!undertrial || !undertrial.custodyStartDate) {
      return NextResponse.json({ error: 'Invalid undertrial case details provided' }, { status: 400 });
    }

    const eligibility = evaluateBailEligibility(undertrial);
    const aiIntelligence = await fetchAiPrecedentsAndSummary(undertrial, eligibility);

    return NextResponse.json({
      caseId: undertrial.id,
      eligibility,
      ...aiIntelligence,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
