import { NextResponse } from 'next/server';
import { getDbCases, createDbCase } from '@/lib/supabase';
import { UndertrialCase } from '@/types/legal';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const cases = await getDbCases();
    return NextResponse.json({
      success: true,
      count: cases.length,
      data: cases,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch cases' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: UndertrialCase = await request.json();
    if (!body.prisonerName || !body.firNumber || !body.custodyStartDate) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: prisonerName, firNumber, custodyStartDate' },
        { status: 400 }
      );
    }

    const createdCase = await createDbCase(body);
    return NextResponse.json({
      success: true,
      data: createdCase,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create case' },
      { status: 500 }
    );
  }
}
