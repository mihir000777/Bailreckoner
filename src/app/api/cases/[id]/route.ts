import { NextResponse } from 'next/server';
import { getDbCases, updateDbCase } from '@/lib/supabase';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const cases = await getDbCases();
    const foundCase = cases.find((c) => c.id === params.id);

    if (!foundCase) {
      return NextResponse.json(
        { success: false, error: `Case ID ${params.id} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: foundCase,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch case details' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const updates = await request.json();
    const updated = await updateDbCase(params.id, updates);

    return NextResponse.json({
      success: updated,
      message: updated ? 'Case updated successfully' : 'Failed to update case',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update case' },
      { status: 500 }
    );
  }
}
