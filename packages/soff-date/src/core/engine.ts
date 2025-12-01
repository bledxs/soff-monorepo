import type { HolidayDefinition, HolidayRule, Holiday } from './types';
import { getEasterSunday } from './algorithms/easter';
import { getNthWeekday } from './algorithms/nth-weekday';
import { applyShift } from './algorithms/shifts';

/** Resolves a rule to a concrete date */
function resolveRule(rule: HolidayRule, year: number): Date | null {
  switch (rule.type) {
    case 'fixed':
      return new Date(Date.UTC(year, rule.month - 1, rule.day));

    case 'nthWeekday':
      return getNthWeekday(year, rule.month, rule.weekday, rule.n);

    case 'easterRelative': {
      const easter = getEasterSunday(year);
      const result = new Date(easter);
      result.setUTCDate(easter.getUTCDate() + rule.offset);
      return result;
    }

    case 'custom':
      return rule.calc(year);
  }
}

/** Formats Date to ISO string (date only) */
function toISODate(date: Date): string {
  return date.toISOString().split('T')[0];
}

/** Generates holidays for a year */
export function resolveHolidays(
  definitions: HolidayDefinition[],
  year: number,
  names: Record<string, string> = {},
): Holiday[] {
  return definitions
    .map((def) => {
      const rawDate = resolveRule(def.rule, year);
      if (!rawDate) return null;

      const { date, shifted } = applyShift(rawDate, def.shift ?? 'none');

      return {
        date: toISODate(date),
        key: def.key,
        name: names[def.key] ?? def.key,
        ...(shifted && { isShifted: true }),
      };
    })
    .filter((h): h is Holiday => h !== null)
    .sort((a, b) => a.date.localeCompare(b.date));
}

/** Checks if a date is a holiday */
export function checkIsHoliday(
  definitions: HolidayDefinition[],
  date: Date,
  names?: Record<string, string>,
): Holiday | null {
  const year = date.getUTCFullYear();
  const isoDate = toISODate(date);
  const holidays = resolveHolidays(definitions, year, names);
  return holidays.find((h) => h.date === isoDate) ?? null;
}

/** Gets the next holiday from a date */
export function findNextHoliday(
  definitions: HolidayDefinition[],
  from: Date,
  names?: Record<string, string>,
): Holiday | null {
  const isoFrom = toISODate(from);
  const year = from.getUTCFullYear();

  // Search in current year
  let holidays = resolveHolidays(definitions, year, names);
  let next = holidays.find((h) => h.date >= isoFrom);

  // If none, search in next year
  if (!next) {
    holidays = resolveHolidays(definitions, year + 1, names);
    next = holidays[0];
  }

  return next ?? null;
}
