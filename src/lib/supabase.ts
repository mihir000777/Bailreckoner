import { createClient } from '@supabase/supabase-js';
import { UndertrialCase } from '@/types/legal';
import { MOCK_LAWYER_CASES } from '@/data/mockCases';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Fetch all cases from Supabase database or fallback to mock data
 */
export async function getDbCases(): Promise<UndertrialCase[]> {
  if (!supabase) {
    return MOCK_LAWYER_CASES;
  }

  try {
    const { data, error } = await supabase
      .from('undertrial_cases')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      console.warn('Supabase query warning/empty, using fallback cases:', error?.message);
      return MOCK_LAWYER_CASES;
    }

    return data.map((item) => ({
      id: item.id,
      prisonerName: item.prisoner_name,
      prisonerAge: item.prisoner_age,
      gender: item.gender,
      isForeignNational: item.is_foreign_national,
      isFirstTimeOffender: item.is_first_time_offender,
      firNumber: item.fir_number,
      policeStation: item.police_station,
      state: item.state,
      district: item.district,
      courtName: item.court_name,
      custodyStartDate: item.custody_start_date,
      offenseIds: item.offense_ids || [],
      flightRiskFactors: item.flight_risk_factors || {},
      tamperingRiskFactors: item.tampering_risk_factors || {},
      societalDangerFactors: item.societal_danger_factors || {},
      lawyerNotes: item.lawyer_notes,
      judgeNotes: item.judge_notes,
      status: item.status || 'pending_review',
      createdAt: item.created_at,
    }));
  } catch (err) {
    console.error('Failed to fetch from Supabase:', err);
    return MOCK_LAWYER_CASES;
  }
}

/**
 * Insert new case into Supabase or return local record
 */
export async function createDbCase(undertrial: UndertrialCase): Promise<UndertrialCase> {
  if (!supabase) {
    return undertrial;
  }

  try {
    const payload = {
      id: undertrial.id,
      prisoner_name: undertrial.prisonerName,
      prisoner_age: undertrial.prisonerAge,
      gender: undertrial.gender,
      is_foreign_national: undertrial.isForeignNational || false,
      is_first_time_offender: undertrial.isFirstTimeOffender,
      fir_number: undertrial.firNumber,
      police_station: undertrial.policeStation,
      state: undertrial.state,
      district: undertrial.district,
      court_name: undertrial.courtName,
      custody_start_date: undertrial.custodyStartDate,
      offense_ids: undertrial.offenseIds,
      flight_risk_factors: undertrial.flightRiskFactors,
      tampering_risk_factors: undertrial.tamperingRiskFactors,
      societal_danger_factors: undertrial.societalDangerFactors,
      status: undertrial.status,
      created_at: undertrial.createdAt || new Date().toISOString(),
    };

    const { error } = await supabase.from('undertrial_cases').insert([payload]);
    if (error) {
      console.error('Supabase insert error:', error.message);
    }
  } catch (err) {
    console.error('Supabase insert exception:', err);
  }

  return undertrial;
}

/**
 * Update case status or notes in Supabase
 */
export async function updateDbCase(id: string, updates: Partial<UndertrialCase>): Promise<boolean> {
  if (!supabase) {
    return true;
  }

  try {
    const payload: Record<string, any> = {};
    if (updates.status) payload.status = updates.status;
    if (updates.judgeNotes) payload.judge_notes = updates.judgeNotes;
    if (updates.lawyerNotes) payload.lawyer_notes = updates.lawyerNotes;

    const { error } = await supabase
      .from('undertrial_cases')
      .update(payload)
      .eq('id', id);

    if (error) {
      console.error('Supabase update error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Supabase update exception:', err);
    return false;
  }
}
