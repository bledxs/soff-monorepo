/**
 * Humanizer - Converts natural language text to cron expressions
 */

import type { Locale } from './types.js';
import { validateCron } from './validator.js';
import type { HumanizerPatterns } from '../i18n/en.js';
import { enPatterns } from '../i18n/en.js';
import { esPatterns } from '../i18n/es.js';

/**
 * Options for humanizing text to cron
 */
export interface HumanizerOptions {
  /**
   * Locale for parsing the input text
   * @default 'en'
   */
  locale?: Locale;
}

/**
 * Result of humanizing text to cron
 */
export interface HumanizerResult {
  /**
   * Whether the text was successfully converted
   */
  success: boolean;

  /**
   * The generated cron expression
   */
  cronExpression?: string;

  /**
   * Error message if conversion failed
   */
  error?: string;

  /**
   * Suggestions for fixing the input
   */
  suggestions?: string[];
}

/**
 * Converts natural language text to a cron expression
 *
 * @param text - Human-readable text (e.g., "every 5 minutes", "cada hora")
 * @param options - Options for parsing
 * @returns Result with cron expression or error
 *
 * @example
 * ```typescript
 * humanizeCron("every 5 minutes", { locale: 'en' });
 * // → { success: true, cronExpression: "*\/5 * * * *" }
 *
 * humanizeCron("todos los días a las 2 am", { locale: 'es' });
 * // → { success: true, cronExpression: "0 2 * * *" }
 * ```
 */
export function humanizeCron(text: string, options: HumanizerOptions = {}): HumanizerResult {
  const { locale = 'en' } = options;
  const patterns = locale === 'es' ? esPatterns : enPatterns;

  // Normalize text: lowercase, trim, remove extra spaces
  const normalized = text.toLowerCase().trim().replace(/\s+/g, ' ');

  // Try to match against patterns
  for (const pattern of patterns.patterns) {
    const match = normalized.match(pattern.regex);
    if (match) {
      try {
        const cron = pattern.toCron(match, patterns);

        // Validate the generated cron
        const validation = validateCron(cron);
        if (validation.isValid) {
          return {
            success: true,
            cronExpression: cron,
          };
        } else {
          return {
            success: false,
            error: `Generated invalid cron: ${validation.error}`,
            suggestions: getSuggestions(normalized, locale),
          };
        }
      } catch {
        continue; // Try next pattern
      }
    }
  }

  // No pattern matched
  return {
    success: false,
    error:
      locale === 'es'
        ? 'No se pudo interpretar el texto. Intenta usar frases como "cada 5 minutos" o "todos los días a las 2 am".'
        : 'Could not parse the text. Try phrases like "every 5 minutes" or "every day at 2 am".',
    suggestions: getSuggestions(normalized, locale),
  };
}

/**
 * Get suggestions based on partial matches
 */
function getSuggestions(text: string, locale: Locale): string[] {
  const suggestions: string[] = [];

  if (locale === 'es') {
    if (text.includes('minuto')) suggestions.push('cada 5 minutos');
    if (text.includes('hora')) suggestions.push('cada hora', 'cada 2 horas');
    if (text.includes('día') || text.includes('dia'))
      suggestions.push('todos los días', 'todos los días a las 9 am');
    if (text.includes('semana')) suggestions.push('cada semana', 'todos los lunes');
    if (text.includes('mes')) suggestions.push('cada mes', 'el día 1 de cada mes');
    if (text.includes('lunes') || text.includes('martes') || text.includes('miércoles')) {
      suggestions.push('todos los lunes a las 10 am');
    }
  } else {
    if (text.includes('minute')) suggestions.push('every 5 minutes', 'every 15 minutes');
    if (text.includes('hour')) suggestions.push('every hour', 'every 2 hours');
    if (text.includes('day')) suggestions.push('every day', 'every day at 9 am');
    if (text.includes('week')) suggestions.push('every week', 'every monday');
    if (text.includes('month')) suggestions.push('every month', 'on the 1st of every month');
    if (text.includes('monday') || text.includes('tuesday') || text.includes('wednesday')) {
      suggestions.push('every monday at 10 am');
    }
  }

  return suggestions.slice(0, 3); // Return max 3 suggestions
}

/**
 * Helper to parse time strings like "2am", "14:30", "2:30 pm"
 */
export function parseTimeString(timeStr: string): { hour: number; minute: number } | null {
  // Remove spaces
  const cleaned = timeStr.replace(/\s+/g, '');

  // Pattern: 2am, 2pm, 14, etc.
  let match = cleaned.match(/^(\d{1,2})(am|pm)?$/i);
  if (match) {
    let hour = parseInt(match[1], 10);
    const period = match[2]?.toLowerCase();

    if (period === 'pm' && hour !== 12) hour += 12;
    if (period === 'am' && hour === 12) hour = 0;

    if (hour >= 0 && hour <= 23) {
      return { hour, minute: 0 };
    }
  }

  // Pattern: 14:30, 2:30pm, 2:30 pm
  match = cleaned.match(/^(\d{1,2}):(\d{2})(am|pm)?$/i);
  if (match) {
    let hour = parseInt(match[1], 10);
    const minute = parseInt(match[2], 10);
    const period = match[3]?.toLowerCase();

    if (period === 'pm' && hour !== 12) hour += 12;
    if (period === 'am' && hour === 12) hour = 0;

    if (hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59) {
      return { hour, minute };
    }
  }

  return null;
}

/**
 * Helper to parse day of week names
 */
export function parseDayOfWeek(day: string, patterns: HumanizerPatterns): number | null {
  const normalized = day.toLowerCase();

  for (const [index, dayName] of patterns.days.entries()) {
    if (normalized.includes(dayName.toLowerCase())) {
      return index; // 0 = Sunday, 1 = Monday, etc.
    }
  }

  return null;
}
