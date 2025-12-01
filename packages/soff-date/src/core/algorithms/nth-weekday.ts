/**
 * Calculates the Nth weekday of a month
 * @param year - Year
 * @param month - Month (1-12)
 * @param weekday - Weekday (0=Sun, 1=Mon, ..., 6=Sat)
 * @param n - Occurrence (1=first, 2=second, -1=last)
 */
export function getNthWeekday(year: number, month: number, weekday: number, n: number): Date {
  if (n > 0) {
    // From start of month
    const first = new Date(Date.UTC(year, month - 1, 1));
    const firstWeekday = first.getUTCDay();
    const diff = (weekday - firstWeekday + 7) % 7;
    const day = 1 + diff + (n - 1) * 7;
    return new Date(Date.UTC(year, month - 1, day));
  } else {
    // From end of month (n = -1 = last)
    // month is 1-12. Date.UTC(year, month, 0) gives the last day of month 'month'
    const last = new Date(Date.UTC(year, month, 0));
    const lastWeekday = last.getUTCDay();
    const diff = (lastWeekday - weekday + 7) % 7;
    const day = last.getUTCDate() - diff + (n + 1) * 7;
    return new Date(Date.UTC(year, month - 1, day));
  }
}
