import type { HolidayDefinition, Holiday, HolidayNames } from '../core/types';
import { resolveHolidays, checkIsHoliday, findNextHoliday } from '../core/engine';
import { checkIsBusinessDay, addBusinessDays, getBusinessDaysBetween } from '../core/business';
import { en } from '../i18n/en';

const definitions: HolidayDefinition[] = [
  // Fijos con observed
  {
    key: 'newYear',
    rule: { type: 'fixed', month: 1, day: 1 },
    shift: 'observedUS',
  },
  {
    key: 'independenceDayUS',
    rule: { type: 'fixed', month: 7, day: 4 },
    shift: 'observedUS',
  },
  {
    key: 'veteransDay',
    rule: { type: 'fixed', month: 11, day: 11 },
    shift: 'observedUS',
  },
  {
    key: 'christmas',
    rule: { type: 'fixed', month: 12, day: 25 },
    shift: 'observedUS',
  },

  // Nth weekday
  {
    key: 'mlkDay',
    rule: { type: 'nthWeekday', month: 1, weekday: 1, n: 3 },
  },
  {
    key: 'presidentsDay',
    rule: { type: 'nthWeekday', month: 2, weekday: 1, n: 3 },
  },
  {
    key: 'memorialDay',
    rule: { type: 'nthWeekday', month: 5, weekday: 1, n: -1 },
  },
  {
    key: 'laborDay',
    rule: { type: 'nthWeekday', month: 9, weekday: 1, n: 1 },
  },
  {
    key: 'columbusDay',
    rule: { type: 'nthWeekday', month: 10, weekday: 1, n: 2 },
  },
  {
    key: 'thanksgivingDay',
    rule: { type: 'nthWeekday', month: 11, weekday: 4, n: 4 },
  },
];

export interface GetHolidaysOptions {
  lang?: HolidayNames;
}

export function getHolidays(year: number, options?: GetHolidaysOptions): Holiday[] {
  const names = options?.lang ?? en;
  return resolveHolidays(definitions, year, names);
}

export function isHoliday(date: Date, options?: GetHolidaysOptions): Holiday | null {
  const names = options?.lang ?? en;
  return checkIsHoliday(definitions, date, names);
}

export function getNextHoliday(
  from: Date = new Date(),
  options?: GetHolidaysOptions,
): Holiday | null {
  const names = options?.lang ?? en;
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
