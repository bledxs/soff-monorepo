import type { HolidayDefinition, Holiday, HolidayNames } from '../core/types';
import { resolveHolidays, checkIsHoliday, findNextHoliday } from '../core/engine';
import { checkIsBusinessDay, addBusinessDays, getBusinessDaysBetween } from '../core/business';
import { pt } from '../i18n/pt';

const definitions: HolidayDefinition[] = [
  { key: 'newYear', rule: { type: 'fixed', month: 1, day: 1 } },
  { key: 'carnivalMonday', rule: { type: 'easterRelative', offset: -48 } },
  { key: 'carnivalTuesday', rule: { type: 'easterRelative', offset: -47 } },
  { key: 'goodFriday', rule: { type: 'easterRelative', offset: -2 } },
  { key: 'tiradentesDay', rule: { type: 'fixed', month: 4, day: 21 } },
  { key: 'laborDay', rule: { type: 'fixed', month: 5, day: 1 } },
  { key: 'corpusChristi', rule: { type: 'easterRelative', offset: 60 } },
  { key: 'independenceDay', rule: { type: 'fixed', month: 9, day: 7 } },
  { key: 'ladyAparecida', rule: { type: 'fixed', month: 10, day: 12 } },
  { key: 'allSouls', rule: { type: 'fixed', month: 11, day: 2 } },
  { key: 'republicProclamation', rule: { type: 'fixed', month: 11, day: 15 } },
  { key: 'blackConsciousness', rule: { type: 'fixed', month: 11, day: 20 } },
  { key: 'christmas', rule: { type: 'fixed', month: 12, day: 25 } },
];

export interface GetHolidaysOptions {
  lang?: HolidayNames;
}

export function getHolidays(year: number, options?: GetHolidaysOptions): Holiday[] {
  const names = options?.lang ?? pt;
  return resolveHolidays(definitions, year, names);
}

export function isHoliday(date: Date, options?: GetHolidaysOptions): Holiday | null {
  const names = options?.lang ?? pt;
  return checkIsHoliday(definitions, date, names);
}

export function getNextHoliday(
  from: Date = new Date(),
  options?: GetHolidaysOptions,
): Holiday | null {
  const names = options?.lang ?? pt;
  return findNextHoliday(definitions, from, names);
}

export function isBusinessDay(date: Date): boolean {
  return checkIsBusinessDay(definitions, date);
}

export function businessDays(date: Date, amount: number): Date {
  return addBusinessDays(definitions, date, amount);
}

export function diffBusinessDays(startDate: Date, endDate: Date): number {
  return getBusinessDaysBetween(definitions, startDate, endDate);
}
