/**
 * Internationalization strings for Spanish
 */
export interface I18nStrings {
  at: string;
  every: string;
  everyMinute: string;
  everyHour: string;
  everyDay: string;
  everyWeek: string;
  everyMonth: string;
  everyYear: string;
  minute: string;
  minutes: string;
  hour: string;
  hours: string;
  day: string;
  days: string;
  week: string;
  weeks: string;
  month: string;
  months: string;
  year: string;
  years: string;
  on: string;
  in: string;
  and: string;
  between: string;
  through: string;
  of: string;
  second: string;
  seconds: string;

  // Day names
  sunday: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;

  // Month names
  january: string;
  february: string;
  march: string;
  april: string;
  may: string;
  june: string;
  july: string;
  august: string;
  september: string;
  october: string;
  november: string;
  december: string;

  // Time periods
  am: string;
  pm: string;
  midnight: string;
  noon: string;

  // Special
  weekday: string;
  weekend: string;
}

export const es: I18nStrings = {
  at: 'a las',
  every: 'cada',
  everyMinute: 'cada minuto',
  everyHour: 'cada hora',
  everyDay: 'todos los días',
  everyWeek: 'cada semana',
  everyMonth: 'cada mes',
  everyYear: 'cada año',
  minute: 'minuto',
  minutes: 'minutos',
  hour: 'hora',
  hours: 'horas',
  day: 'día',
  days: 'días',
  week: 'semana',
  weeks: 'semanas',
  month: 'mes',
  months: 'meses',
  year: 'año',
  years: 'años',
  on: 'el',
  in: 'en',
  and: 'y',
  between: 'entre',
  through: 'hasta',
  of: 'de',
  second: 'segundo',
  seconds: 'segundos',

  // Day names
  sunday: 'domingo',
  monday: 'lunes',
  tuesday: 'martes',
  wednesday: 'miércoles',
  thursday: 'jueves',
  friday: 'viernes',
  saturday: 'sábado',

  // Month names
  january: 'enero',
  february: 'febrero',
  march: 'marzo',
  april: 'abril',
  may: 'mayo',
  june: 'junio',
  july: 'julio',
  august: 'agosto',
  september: 'septiembre',
  october: 'octubre',
  november: 'noviembre',
  december: 'diciembre',

  // Time periods
  am: 'AM',
  pm: 'PM',
  midnight: 'medianoche',
  noon: 'mediodía',

  // Special
  weekday: 'día de semana',
  weekend: 'fin de semana',
};

import type { HumanizerPatterns } from './en.js';
import { parseTimeString, parseDayOfWeek } from '../core/humanizer.js';

export const esPatterns: HumanizerPatterns = {
  days: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
  months: [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ],

  patterns: [
    // "cada minuto" → * * * * *
    {
      regex: /^cada\s+minuto$/,
      toCron: () => '* * * * *',
      description: 'Cada minuto',
    },

    // "cada 5 minutos" → */5 * * * *
    {
      regex: /^cada\s+(\d+)\s+minutos?$/,
      toCron: (match) => `*/${match[1]} * * * *`,
      description: 'Cada N minutos',
    },

    // "cada hora" → 0 * * * *
    {
      regex: /^cada\s+hora$/,
      toCron: () => '0 * * * *',
      description: 'Cada hora',
    },

    // "cada 2 horas" → 0 */2 * * *
    {
      regex: /^cada\s+(\d+)\s+horas?$/,
      toCron: (match) => `0 */${match[1]} * * *`,
      description: 'Cada N horas',
    },

    // "todos los días" or "todos los dias" → 0 0 * * *
    {
      regex: /^todos\s+los\s+d[ií]as$/,
      toCron: () => '0 0 * * *',
      description: 'Todos los días a medianoche',
    },

    // "todos los días a las 2am" or "todos los dias a las 14:30"
    {
      regex: /^todos\s+los\s+d[ií]as\s+a\s+las?\s+(.+)$/,
      toCron: (match) => {
        const time = parseTimeString(match[1]);
        if (!time) throw new Error('Formato de hora inválido');
        return `${time.minute} ${time.hour} * * *`;
      },
      description: 'Todos los días a una hora específica',
    },

    // "cada semana" → 0 0 * * 0
    {
      regex: /^cada\s+semana$/,
      toCron: () => '0 0 * * 0',
      description: 'Cada semana (domingo a medianoche)',
    },

    // "todos los lunes" or "cada lunes"
    {
      regex:
        /^(?:todos\s+los|cada)\s+(lunes|martes|mi[eé]rcoles|jueves|viernes|s[aá]bado|domingo)$/,
      toCron: (match, patterns) => {
        const day = parseDayOfWeek(match[1], patterns);
        if (day === null) throw new Error('Día inválido');
        return `0 0 * * ${day}`;
      },
      description: 'Cada día específico de la semana',
    },

    // "todos los lunes a las 10am"
    {
      regex:
        /^(?:todos\s+los|cada)\s+(lunes|martes|mi[eé]rcoles|jueves|viernes|s[aá]bado|domingo)\s+a\s+las?\s+(.+)$/,
      toCron: (match, patterns) => {
        const day = parseDayOfWeek(match[1], patterns);
        const time = parseTimeString(match[2]);
        if (day === null || !time) throw new Error('Día u hora inválida');
        return `${time.minute} ${time.hour} * * ${day}`;
      },
      description: 'Cada día específico a una hora específica',
    },

    // "cada mes" → 0 0 1 * *
    {
      regex: /^cada\s+mes$/,
      toCron: () => '0 0 1 * *',
      description: 'Cada mes (día 1 a medianoche)',
    },

    // "el día 1 de cada mes" or "el dia 15 de cada mes"
    {
      regex: /^el\s+d[ií]a\s+(\d{1,2})\s+de\s+cada\s+mes(?:\s+a\s+las?\s+(.+))?$/,
      toCron: (match) => {
        const day = parseInt(match[1], 10);
        if (day < 1 || day > 31) throw new Error('Día del mes inválido');

        if (match[2]) {
          const time = parseTimeString(match[2]);
          if (!time) throw new Error('Formato de hora inválido');
          return `${time.minute} ${time.hour} ${day} * *`;
        }
        return `0 0 ${day} * *`;
      },
      description: 'Día específico de cada mes',
    },

    // "cada año" → 0 0 1 1 *
    {
      regex: /^cada\s+a[ñn]o$/,
      toCron: () => '0 0 1 1 *',
      description: 'Cada año (1 de enero a medianoche)',
    },

    // "a las 2am" or "a las 14:30"
    {
      regex: /^a\s+las?\s+(.+)$/,
      toCron: (match) => {
        const time = parseTimeString(match[1]);
        if (!time) throw new Error('Formato de hora inválido');
        return `${time.minute} ${time.hour} * * *`;
      },
      description: 'Diariamente a una hora específica',
    },

    // "días de semana a las 9am" or "dias laborales a las 9am"
    {
      regex: /^(?:d[ií]as\s+de\s+semana|d[ií]as\s+laborales)\s+a\s+las?\s+(.+)$/,
      toCron: (match) => {
        const time = parseTimeString(match[1]);
        if (!time) throw new Error('Formato de hora inválido');
        return `${time.minute} ${time.hour} * * 1-5`;
      },
      description: 'Días de semana a una hora específica',
    },

    // "fines de semana a las 10am"
    {
      regex: /^fines?\s+de\s+semana\s+a\s+las?\s+(.+)$/,
      toCron: (match) => {
        const time = parseTimeString(match[1]);
        if (!time) throw new Error('Formato de hora inválido');
        return `${time.minute} ${time.hour} * * 0,6`;
      },
      description: 'Fines de semana a una hora específica',
    },
  ],
};
