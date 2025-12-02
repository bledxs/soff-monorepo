import type { HolidayDefinition, Holiday, HolidayNames } from '../core/types';
import { resolveHolidays, checkIsHoliday, findNextHoliday } from '../core/engine';
import { checkIsBusinessDay, addBusinessDays, getBusinessDaysBetween } from '../core/business';
import { es } from '../i18n/es';

const definitions: HolidayDefinition[] = [
  { key: 'newYear', rule: { type: 'fixed', month: 1, day: 1 } },
  { key: 'carnivalMonday', rule: { type: 'easterRelative', offset: -48 } },
  { key: 'carnivalTuesday', rule: { type: 'easterRelative', offset: -47 } },
  { key: 'memoryDay', rule: { type: 'fixed', month: 3, day: 24 } },
  { key: 'malvinasDay', rule: { type: 'fixed', month: 4, day: 2 } },
  { key: 'goodFriday', rule: { type: 'easterRelative', offset: -2 } },
  { key: 'laborDay', rule: { type: 'fixed', month: 5, day: 1 } },
  { key: 'mayRevolution', rule: { type: 'fixed', month: 5, day: 25 } },
  {
    key: 'guemesDay',
    rule: { type: 'fixed', month: 6, day: 17 },
    shift: 'nearestMonday',
  },
  { key: 'belgranoDay', rule: { type: 'fixed', month: 6, day: 20 } },
  { key: 'independenceDay', rule: { type: 'fixed', month: 7, day: 9 } },
  {
    key: 'sanMartinDay',
    rule: { type: 'fixed', month: 8, day: 17 },
    shift: 'nearestMonday',
  },
  {
    key: 'diversityDay',
    rule: { type: 'fixed', month: 10, day: 12 },
    shift: 'nearestMonday',
  },
  {
    key: 'sovereigntyDay',
    rule: { type: 'fixed', month: 11, day: 20 },
    shift: 'nearestMonday',
  },
  { key: 'immaculateConception', rule: { type: 'fixed', month: 12, day: 8 } },
  { key: 'christmas', rule: { type: 'fixed', month: 12, day: 25 } },
];

export interface GetHolidaysOptions {
  lang?: HolidayNames;
}

export function getHolidays(year: number, options?: GetHolidaysOptions): Holiday[] {
  const names = options?.lang ?? es;
  return resolveHolidays(definitions, year, names);
}

export function isHoliday(date: Date, options?: GetHolidaysOptions): Holiday | null {
  const names = options?.lang ?? es;
  return checkIsHoliday(definitions, date, names);
}

export function getNextHoliday(
  from: Date = new Date(),
  options?: GetHolidaysOptions,
): Holiday | null {
  const names = options?.lang ?? es;
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
