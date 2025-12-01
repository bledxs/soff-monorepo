import type { ShiftRule } from '../types';

/**
 * Applies a shift rule to a date
 * @returns { date: Date, shifted: boolean }
 */
export function applyShift(date: Date, rule: ShiftRule): { date: Date; shifted: boolean } {
  const day = date.getUTCDay(); // 0=Sun, 6=Sat

  if (rule === 'none') {
    return { date, shifted: false };
  }

  const result = new Date(date);

  switch (rule) {
    case 'emiliani':
    case 'nextMonday': {
      // If it's already Monday (1), do not move
      if (day === 1) {
        return { date, shifted: false };
      }
      // Move to next Monday
      // (8 - day) % 7 gives days until next Monday
      // Ex: Sun(0) -> (8-0)%7 = 1 (+1 day) -> Mon
      // Ex: Sat(6) -> (8-6)%7 = 2 (+2 days) -> Mon
      // Ex: Wed(3) -> (8-3)%7 = 5 (+5 days) -> Mon
      const daysToNextMonday = (8 - day) % 7;
      result.setUTCDate(date.getUTCDate() + daysToNextMonday);
      break;
    }

    case 'observedUS':
      // Only affects weekends
      if (day === 0) {
        // Sunday -> Monday (+1)
        result.setUTCDate(date.getUTCDate() + 1);
      } else if (day === 6) {
        // Saturday -> Friday (-1)
        result.setUTCDate(date.getUTCDate() - 1);
      } else {
        return { date, shifted: false };
      }
      break;

    case 'nearestMonday':
      // Argentina rule:
      // Tue/Wed -> Previous Monday
      // Thu/Fri -> Next Monday
      if (day === 2) {
        // Tuesday -> Monday (-1)
        result.setUTCDate(date.getUTCDate() - 1);
      } else if (day === 3) {
        // Wednesday -> Monday (-2)
        result.setUTCDate(date.getUTCDate() - 2);
      } else if (day === 4) {
        // Thursday -> Next Monday (+4)
        result.setUTCDate(date.getUTCDate() + 4);
      } else if (day === 5) {
        // Friday -> Next Monday (+3)
        result.setUTCDate(date.getUTCDate() + 3);
      } else {
        return { date, shifted: false };
      }
      break;

    default:
      return { date, shifted: false };
  }

  return { date: result, shifted: true };
}
