import { UndertrialCase } from '@/types/legal';
import { MOCK_LAWYER_CASES } from '@/data/mockCases';
import { getDbCases, createDbCase, updateDbCase } from '@/lib/supabase';

const STORAGE_KEY = 'bail_reckoner_cases_db';
const EVENT_NAME = 'bail_reckoner_db_change';

/**
 * Get all cases from local persistent store (with Supabase sync if enabled)
 */
export async function fetchAllCases(): Promise<UndertrialCase[]> {
  if (typeof window === 'undefined') {
    return MOCK_LAWYER_CASES;
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Failed to read from local cases store', e);
  }

  // Fallback to Supabase or Mock Data
  const remoteCases = await getDbCases();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(remoteCases));
  } catch (e) {
    // Ignore storage quota
  }

  return remoteCases;
}

/**
 * Synchronous get cases for instant UI rendering
 */
export function getLocalCases(): UndertrialCase[] {
  if (typeof window === 'undefined') return MOCK_LAWYER_CASES;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    // Ignore
  }
  return MOCK_LAWYER_CASES;
}

/**
 * Add or update a case in the database
 */
export async function saveCase(caseData: UndertrialCase): Promise<UndertrialCase[]> {
  const current = getLocalCases();
  const index = current.findIndex((c) => c.id === caseData.id);

  let updated: UndertrialCase[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = { ...updated[index], ...caseData };
  } else {
    updated = [caseData, ...current];
  }

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event(EVENT_NAME));
    } catch (e) {
      console.warn('Failed to write to localStorage db', e);
    }
  }

  // Async remote sync
  createDbCase(caseData).catch((err) => console.warn('Supabase sync background fail:', err));

  return updated;
}

/**
 * Update case status or notes (e.g. Judge digital sign order)
 */
export async function updateCaseStatus(
  id: string,
  status: UndertrialCase['status'],
  notes?: { judgeNotes?: string; lawyerNotes?: string }
): Promise<UndertrialCase[]> {
  const current = getLocalCases();
  const updated = current.map((c) => {
    if (c.id === id) {
      return {
        ...c,
        status,
        judgeNotes: notes?.judgeNotes ?? c.judgeNotes,
        lawyerNotes: notes?.lawyerNotes ?? c.lawyerNotes,
      };
    }
    return c;
  });

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event(EVENT_NAME));
    } catch (e) {
      console.warn('Failed to write to localStorage db', e);
    }
  }

  // Async remote sync
  updateDbCase(id, { status, ...notes }).catch((err) => console.warn('Supabase update background fail:', err));

  return updated;
}

/**
 * Subscribe to database changes across components
 */
export function subscribeToDb(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(EVENT_NAME, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(EVENT_NAME, callback);
    window.removeEventListener('storage', callback);
  };
}
