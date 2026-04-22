/**
 * Options for relative time formatting
 */
export interface RelativeTimeOptions {
  /** The locale to use for formatting (default: 'en') */
  locale?: string;
  /** The base date to compare against (default: new Date()) */
  baseDate?: Date;
  /** numeric option for Intl.RelativeTimeFormat (default: 'auto') */
  numeric?: 'always' | 'auto';
  /** style option for Intl.RelativeTimeFormat (default: 'long') */
  style?: 'long' | 'short' | 'narrow';
}

function isFiniteDate(date: Date): boolean {
  return date instanceof Date && Number.isFinite(date.getTime());
}

/**
 * Formats a date relative to another date (usually "now").
 * Uses Intl.RelativeTimeFormat for localization.
 *
 * @param date The date to format
 * @param options Configuration options
 * @returns The formatted relative time string (e.g., "2 days ago")
 */
export function formatRelativeTime(date: Date, options: RelativeTimeOptions = {}): string {
  const { locale = 'en', baseDate = new Date(), numeric = 'always', style = 'long' } = options;

  if (!isFiniteDate(date) || !isFiniteDate(baseDate)) {
    return '';
  }

  const diffMs = date.getTime() - baseDate.getTime();
  const diffSecs = Math.round(diffMs / 1000);
  const formatter = new Intl.RelativeTimeFormat(locale, { numeric, style });

  // Array of units and their values in seconds
  const units: { unit: Intl.RelativeTimeFormatUnit; seconds: number }[] = [
    { unit: 'year', seconds: 60 * 60 * 24 * 365 },
    { unit: 'month', seconds: 60 * 60 * 24 * 30 },
    { unit: 'week', seconds: 60 * 60 * 24 * 7 },
    { unit: 'day', seconds: 60 * 60 * 24 },
    { unit: 'hour', seconds: 60 * 60 },
    { unit: 'minute', seconds: 60 },
    { unit: 'second', seconds: 1 },
  ];

  for (const { unit, seconds } of units) {
    if (Math.abs(diffSecs) >= seconds || unit === 'second') {
      const value = Math.round(diffSecs / seconds);
      return formatter.format(value, unit);
    }
  }

  return '';
}
