import type { ParsedCron, FormatterOptions } from './types.js';
import type { I18nStrings } from '../i18n/es.js';
import { parseCron } from './parser.js';
import { es } from '../i18n/es.js';
import { en } from '../i18n/en.js';
import { ptBR } from '../i18n/pt-br.js';

/**
 * Helper function to check if an array of numbers is a consecutive range
 */
function isConsecutiveRange(values: number[]): boolean {
  if (values.length < 2) return false;
  for (let i = 1; i < values.length; i++) {
    if (values[i] !== values[i - 1] + 1) {
      return false;
    }
  }
  return true;
}

/**
 * Formats a cron expression into human-readable text
 *
 * @param expression - The cron expression to format
 * @param options - Formatting options (locale, format preferences)
 * @returns Human-readable description of the cron expression
 *
 * @example
 * formatCron('0 2 * * *', { locale: 'es' })
 * // Returns: "A las 2:00 AM, todos los días"
 *
 * formatCron('* /15 9-17 * * 1-5', { locale: 'en' })
 * // Returns: "Every 15 minutes, between 9:00 AM and 5:00 PM, Monday through Friday"
 */
export function formatCron(expression: string, options: FormatterOptions = {}): string {
  const {
    locale = 'en',
    use24HourFormat = true,
    includeSeconds = false,
    verbose = false,
  } = options;

  let i18n = en;
  if (locale === 'es') i18n = es;
  else if (locale === 'pt-BR') i18n = ptBR;

  const parsed = parseCron(expression, includeSeconds);

  // Handle special keywords
  if (parsed.isSpecial && parsed.specialKeyword) {
    return formatSpecialKeyword(parsed.specialKeyword, i18n);
  }

  return formatStandardCron(parsed, i18n, use24HourFormat, verbose);
}

/**
 * Formats special cron keywords
 */
function formatSpecialKeyword(keyword: string, i18n: I18nStrings): string {
  const map: Record<string, string> = {
    '@yearly': i18n.everyYear,
    '@annually': i18n.everyYear,
    '@monthly': i18n.everyMonth,
    '@weekly': i18n.everyWeek,
    '@daily': i18n.everyDay,
    '@midnight': `${i18n.at} ${i18n.midnight}`,
    '@hourly': i18n.everyHour,
  };

  return map[keyword] || keyword;
}

/**
 * Formats a standard cron expression
 */
function formatStandardCron(
  parsed: ParsedCron,
  i18n: I18nStrings,
  use24HourFormat: boolean,
  verbose: boolean
): string {
  const parts: string[] = [];

  // Time part (seconds, minutes, hours)
  const timePart = formatTime(parsed, i18n, use24HourFormat);
  if (timePart) {
    parts.push(timePart);
  }

  // Day/Month part
  const datePart = formatDate(parsed, i18n, verbose);
  if (datePart) {
    parts.push(datePart);
  }

  return parts.join(', ');
}

/**
 * Formats the time portion of a cron expression
 */
function formatTime(parsed: ParsedCron, i18n: I18nStrings, use24HourFormat: boolean): string {
  const { minute, hour, second } = parsed;

  // Check for special patterns
  if (minute.isWildcard && hour.isWildcard) {
    if (second && !second.isWildcard) {
      return `${i18n.at} ${i18n.second} ${second.values.join(', ')}`;
    }
    return i18n.everyMinute;
  }

  if (minute.isWildcard) {
    // Every minute of specific hours
    if (hour.values.length === 1) {
      const formattedHour = formatHour(hour.values[0], use24HourFormat, i18n);
      return `${i18n.everyMinute} ${i18n.at} ${formattedHour}`;
    }
    if (hour.values.length > 1 && hour.isRange) {
      const start = formatHour(hour.values[0], use24HourFormat, i18n);
      const end = formatHour(hour.values[hour.values.length - 1], use24HourFormat, i18n);
      return `${i18n.everyMinute}, ${i18n.between} ${start} ${i18n.and} ${end}`;
    }
  }

  if (hour.isWildcard && !minute.isWildcard) {
    // Every hour at specific minutes
    if (minute.values.length === 1) {
      return `${i18n.at} ${i18n.minute} ${minute.values[0]}`;
    }
    if (minute.isStep) {
      const step = minute.values[1] - minute.values[0];
      return `${i18n.every} ${step} ${i18n.minutes}`;
    }
  }

  // Specific time
  if (!minute.isWildcard && !hour.isWildcard) {
    if (minute.values.length === 1 && hour.values.length === 1) {
      const time = formatTime24Hour(hour.values[0], minute.values[0]);
      const formatted = use24HourFormat
        ? time
        : formatTime12Hour(hour.values[0], minute.values[0], i18n);
      return `${i18n.at} ${formatted}`;
    }

    // Multiple specific times
    if (minute.values.length > 1 || hour.values.length > 1) {
      // Check if it's a range pattern (consecutive hours with same minute)
      if (
        minute.values.length === 1 &&
        hour.isRange &&
        hour.values.length > 1 &&
        isConsecutiveRange(hour.values)
      ) {
        const startTime = use24HourFormat
          ? formatTime24Hour(hour.values[0], minute.values[0])
          : formatTime12Hour(hour.values[0], minute.values[0], i18n);
        const endTime = use24HourFormat
          ? formatTime24Hour(hour.values[hour.values.length - 1], minute.values[0])
          : formatTime12Hour(hour.values[hour.values.length - 1], minute.values[0], i18n);
        return `${i18n.between} ${startTime} ${i18n.and} ${endTime}`;
      }

      if (minute.isStep) {
        const step = minute.values[1] - minute.values[0];
        if (hour.isRange) {
          const start = formatHour(hour.values[0], use24HourFormat, i18n);
          const end = formatHour(hour.values[hour.values.length - 1], use24HourFormat, i18n);
          return `${i18n.every} ${step} ${i18n.minutes}, ${i18n.between} ${start} ${i18n.and} ${end}`;
        }
        return `${i18n.every} ${step} ${i18n.minutes}`;
      }
    }
  }

  // Default: list all combinations
  return formatTimeList(parsed, i18n, use24HourFormat);
}

/**
 * Formats the date portion of a cron expression
 */
function formatDate(parsed: ParsedCron, i18n: I18nStrings, verbose: boolean): string {
  const { dayOfMonth, month, dayOfWeek } = parsed;

  // Every day
  if (dayOfMonth.isWildcard && dayOfWeek.isWildcard && month.isWildcard) {
    return i18n.everyDay;
  }

  const parts: string[] = [];

  // Day of week
  if (!dayOfWeek.isWildcard) {
    const dayPart = formatDaysOfWeek(dayOfWeek.values, i18n, verbose);
    if (dayPart) {
      parts.push(dayPart);
    }
  }

  // Day of month
  if (!dayOfMonth.isWildcard && dayOfWeek.isWildcard) {
    const dayPart = formatDaysOfMonth(dayOfMonth.values, i18n, verbose);
    if (dayPart) {
      parts.push(dayPart);
    }
  }

  // Month
  if (!month.isWildcard) {
    const monthPart = formatMonths(month.values, i18n, verbose);
    if (monthPart) {
      parts.push(monthPart);
    }
  }

  return parts.join(', ');
}

/**
 * Formats hour in 24-hour format
 */
function formatTime24Hour(hour: number, minute: number): string {
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
}

/**
 * Formats hour in 12-hour format
 */
function formatTime12Hour(hour: number, minute: number, i18n: I18nStrings): string {
  const period = hour < 12 ? i18n.am : i18n.pm;
  const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${hour12}:${minute.toString().padStart(2, '0')} ${period}`;
}

/**
 * Formats a single hour
 */
function formatHour(hour: number, use24HourFormat: boolean, i18n: I18nStrings): string {
  if (use24HourFormat) {
    return `${hour.toString().padStart(2, '0')}:00`;
  }
  return formatTime12Hour(hour, 0, i18n);
}

/**
 * Formats a list of times
 */
function formatTimeList(parsed: ParsedCron, i18n: I18nStrings, use24HourFormat: boolean): string {
  const times: string[] = [];

  for (const hour of parsed.hour.values) {
    for (const minute of parsed.minute.values) {
      const time = use24HourFormat
        ? formatTime24Hour(hour, minute)
        : formatTime12Hour(hour, minute, i18n);
      times.push(time);
    }
  }

  if (times.length <= 3) {
    return `${i18n.at} ${times.join(`, `)}`;
  }

  return `${i18n.at} ${times.slice(0, 2).join(', ')}... (${times.length} times)`;
}

/**
 * Formats days of the week
 */
function formatDaysOfWeek(days: number[], i18n: I18nStrings, verbose: boolean): string {
  const dayNames = [
    i18n.sunday,
    i18n.monday,
    i18n.tuesday,
    i18n.wednesday,
    i18n.thursday,
    i18n.friday,
    i18n.saturday,
  ];

  // Check for weekdays (Mon-Fri)
  if (
    days.length === 5 &&
    days.includes(1) &&
    days.includes(2) &&
    days.includes(3) &&
    days.includes(4) &&
    days.includes(5)
  ) {
    return i18n.weekday;
  }

  // Check for weekend
  if (days.length === 2 && days.includes(0) && days.includes(6)) {
    return i18n.weekend;
  }

  if (days.length === 1) {
    return i18n.on + ' ' + dayNames[days[0]];
  }

  if (days.length === 7) {
    return i18n.everyDay;
  }

  // List days
  const names = days.map((d) => dayNames[d]);
  if (verbose || days.length <= 3) {
    return formatList(names, i18n);
  }

  return `${names[0]} ${i18n.through} ${names[names.length - 1]}`;
}

/**
 * Formats days of the month
 */
function formatDaysOfMonth(days: number[], i18n: I18nStrings, verbose: boolean): string {
  if (days.length === 1) {
    return `${i18n.on} ${i18n.day} ${days[0]}`;
  }

  if (days.length === 31) {
    return i18n.everyDay;
  }

  if (verbose || days.length <= 3) {
    return `${i18n.on} ${i18n.days} ${days.join(', ')}`;
  }

  return `${i18n.on} ${i18n.days} ${days[0]} ${i18n.through} ${days[days.length - 1]}`;
}

/**
 * Formats months
 */
function formatMonths(months: number[], i18n: I18nStrings, verbose: boolean): string {
  const monthNames = [
    i18n.january,
    i18n.february,
    i18n.march,
    i18n.april,
    i18n.may,
    i18n.june,
    i18n.july,
    i18n.august,
    i18n.september,
    i18n.october,
    i18n.november,
    i18n.december,
  ];

  if (months.length === 1) {
    return `${i18n.in} ${monthNames[months[0] - 1]}`;
  }

  if (months.length === 12) {
    return '';
  }

  const names = months.map((m) => monthNames[m - 1]);
  if (verbose || months.length <= 3) {
    return `${i18n.in} ${formatList(names, i18n)}`;
  }

  return `${i18n.in} ${names[0]} ${i18n.through} ${names[names.length - 1]}`;
}

/**
 * Formats a list of items with proper grammar
 */
function formatList(items: string[], i18n: I18nStrings): string {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} ${i18n.and} ${items[1]}`;

  const last = items[items.length - 1];
  const rest = items.slice(0, -1);
  return `${rest.join(', ')}, ${i18n.and} ${last}`;
}
