import { Offense } from '@/types/legal';
import offensesData from '@/data/offenses.json';

const offenses: Offense[] = offensesData as Offense[];

export function getAllOffenses(): Offense[] {
  return offenses;
}

export function getOffenseById(id: string): Offense | undefined {
  return offenses.find((o) => o.id === id);
}

export function getOffensesByIds(ids: string[]): Offense[] {
  return offenses.filter((o) => ids.includes(o.id));
}

export function searchOffenses(query: string): Offense[] {
  if (!query || query.trim() === '') return offenses;
  const q = query.toLowerCase().trim();
  return offenses.filter(
    (o) =>
      o.ipcSection.toLowerCase().includes(q) ||
      o.bnsSection.toLowerCase().includes(q) ||
      o.title.toLowerCase().includes(q) ||
      o.description.toLowerCase().includes(q) ||
      o.specialAct.toLowerCase().includes(q)
  );
}

export function getBnsEquivalent(ipcQuery: string): { ipc: string; bns: string; title: string } | undefined {
  const match = offenses.find((o) => o.ipcSection.toLowerCase().includes(ipcQuery.toLowerCase()));
  if (!match) return undefined;
  return {
    ipc: match.ipcSection,
    bns: match.bnsSection,
    title: match.title,
  };
}
