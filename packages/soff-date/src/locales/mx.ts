import type { HolidayDefinition, Holiday, HolidayNames } from '../core/types';
import { resolveHolidays, checkIsHoliday, findNextHoliday } from '../core/engine';
import { checkIsBusinessDay, addBusinessDays, getBusinessDaysBetween } from '../core/business';
import { es } from '../i18n/es';

const definitions: HolidayDefinition[] = [
  { key: 'newYear', rule: { type: 'fixed', month: 1, day: 1 } },
  // First Monday of Feb (Constitution)
  { key: 'constitutionDay', rule: { type: 'nthWeekday', month: 2, weekday: 1, n: 1 } },
  // Third Monday of Mar (Benito Juarez)
  { key: 'benitoJuarez', rule: { type: 'nthWeekday', month: 3, weekday: 1, n: 3 } },
  { key: 'laborDay', rule: { type: 'fixed', month: 5, day: 1 } },
  { key: 'independenceDay', rule: { type: 'fixed', month: 9, day: 16 } },
  // Third Monday of Nov (Revolution)
  { key: 'revolutionDay', rule: { type: 'nthWeekday', month: 11, weekday: 1, n: 3 } },
  // Transmission of Executive Power
  {
    key: 'transmissionExecutive',
    rule: {
      type: 'custom',
      calc: (year) => {
        if (year >= 2024) {
          if ((year - 2024) % 6 === 0) return new Date(Date.UTC(year, 9, 1)); // Oct 1
        } else {
          // 2018, 2012, etc.
          if ((year - 2018) % 6 === 0) return new Date(Date.UTC(year, 11, 1)); // Dec 1
        }
        return null;
      },
    },
  },
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
