import { describe, it, expect } from 'vitest';
import { humanizeCron, parseTimeString, parseDayOfWeek } from '../../src/core/humanizer.js';
import { enPatterns } from '../../src/i18n/en.js';
import { esPatterns } from '../../src/i18n/es.js';

describe('humanizer', () => {
  describe('parseTimeString', () => {
    it('should parse 12-hour format with AM/PM', () => {
      expect(parseTimeString('2am')).toEqual({ hour: 2, minute: 0 });
      expect(parseTimeString('2pm')).toEqual({ hour: 14, minute: 0 });
      expect(parseTimeString('12am')).toEqual({ hour: 0, minute: 0 });
      expect(parseTimeString('12pm')).toEqual({ hour: 12, minute: 0 });
    });

    it('should parse 24-hour format', () => {
      expect(parseTimeString('14')).toEqual({ hour: 14, minute: 0 });
      expect(parseTimeString('0')).toEqual({ hour: 0, minute: 0 });
      expect(parseTimeString('23')).toEqual({ hour: 23, minute: 0 });
    });

    it('should parse time with minutes', () => {
      expect(parseTimeString('14:30')).toEqual({ hour: 14, minute: 30 });
      expect(parseTimeString('2:30pm')).toEqual({ hour: 14, minute: 30 });
      expect(parseTimeString('2:30 pm')).toEqual({ hour: 14, minute: 30 });
      expect(parseTimeString('9:15am')).toEqual({ hour: 9, minute: 15 });
    });

    it('should return null for invalid formats', () => {
      expect(parseTimeString('25:00')).toBeNull();
      expect(parseTimeString('14:60')).toBeNull();
      expect(parseTimeString('invalid')).toBeNull();
    });
  });

  describe('parseDayOfWeek', () => {
    it('should parse English day names', () => {
      expect(parseDayOfWeek('sunday', enPatterns)).toBe(0);
      expect(parseDayOfWeek('monday', enPatterns)).toBe(1);
      expect(parseDayOfWeek('friday', enPatterns)).toBe(5);
      expect(parseDayOfWeek('saturday', enPatterns)).toBe(6);
    });

    it('should parse Spanish day names', () => {
      expect(parseDayOfWeek('domingo', esPatterns)).toBe(0);
      expect(parseDayOfWeek('lunes', esPatterns)).toBe(1);
      expect(parseDayOfWeek('viernes', esPatterns)).toBe(5);
      expect(parseDayOfWeek('sábado', esPatterns)).toBe(6);
    });

    it('should return null for invalid day names', () => {
      expect(parseDayOfWeek('invalidday', enPatterns)).toBeNull();
    });
  });

  describe('humanizeCron - English', () => {
    it('should convert "every minute"', () => {
      const result = humanizeCron('every minute', { locale: 'en' });
      expect(result.success).toBe(true);
      expect(result.cronExpression).toBe('* * * * *');
    });

    it('should convert "every 5 minutes"', () => {
      const result = humanizeCron('every 5 minutes', { locale: 'en' });
      expect(result.success).toBe(true);
      expect(result.cronExpression).toBe('*/5 * * * *');
    });

    it('should convert "every hour"', () => {
      const result = humanizeCron('every hour', { locale: 'en' });
      expect(result.success).toBe(true);
      expect(result.cronExpression).toBe('0 * * * *');
    });

    it('should convert "every 2 hours"', () => {
      const result = humanizeCron('every 2 hours', { locale: 'en' });
      expect(result.success).toBe(true);
      expect(result.cronExpression).toBe('0 */2 * * *');
    });

    it('should convert "every day"', () => {
      const result = humanizeCron('every day', { locale: 'en' });
      expect(result.success).toBe(true);
      expect(result.cronExpression).toBe('0 0 * * *');
    });

    it('should convert "every day at 2am"', () => {
      const result = humanizeCron('every day at 2am', { locale: 'en' });
      expect(result.success).toBe(true);
      expect(result.cronExpression).toBe('0 2 * * *');
    });

    it('should convert "every day at 14:30"', () => {
      const result = humanizeCron('every day at 14:30', { locale: 'en' });
      expect(result.success).toBe(true);
      expect(result.cronExpression).toBe('30 14 * * *');
    });

    it('should convert "every monday"', () => {
      const result = humanizeCron('every monday', { locale: 'en' });
      expect(result.success).toBe(true);
      expect(result.cronExpression).toBe('0 0 * * 1');
    });

    it('should convert "every monday at 10am"', () => {
      const result = humanizeCron('every monday at 10am', { locale: 'en' });
      expect(result.success).toBe(true);
      expect(result.cronExpression).toBe('0 10 * * 1');
    });

    it('should convert "every week"', () => {
      const result = humanizeCron('every week', { locale: 'en' });
      expect(result.success).toBe(true);
      expect(result.cronExpression).toBe('0 0 * * 0');
    });

    it('should convert "every month"', () => {
      const result = humanizeCron('every month', { locale: 'en' });
      expect(result.success).toBe(true);
      expect(result.cronExpression).toBe('0 0 1 * *');
    });

    it('should convert "on the 1st of every month"', () => {
      const result = humanizeCron('on the 1st of every month', { locale: 'en' });
      expect(result.success).toBe(true);
      expect(result.cronExpression).toBe('0 0 1 * *');
    });

    it('should convert "on the 15th of every month at 3pm"', () => {
      const result = humanizeCron('on the 15th of every month at 3pm', { locale: 'en' });
      expect(result.success).toBe(true);
      expect(result.cronExpression).toBe('0 15 15 * *');
    });

    it('should convert "at 2am"', () => {
      const result = humanizeCron('at 2am', { locale: 'en' });
      expect(result.success).toBe(true);
      expect(result.cronExpression).toBe('0 2 * * *');
    });

    it('should convert "weekdays at 9am"', () => {
      const result = humanizeCron('weekdays at 9am', { locale: 'en' });
      expect(result.success).toBe(true);
      expect(result.cronExpression).toBe('0 9 * * 1-5');
    });

    it('should convert "on weekdays at 9am"', () => {
      const result = humanizeCron('on weekdays at 9am', { locale: 'en' });
      expect(result.success).toBe(true);
      expect(result.cronExpression).toBe('0 9 * * 1-5');
    });

    it('should convert "weekends at 10am"', () => {
      const result = humanizeCron('weekends at 10am', { locale: 'en' });
      expect(result.success).toBe(true);
      expect(result.cronExpression).toBe('0 10 * * 0,6');
    });

    it('should handle case insensitivity', () => {
      const result = humanizeCron('EVERY DAY AT 2AM', { locale: 'en' });
      expect(result.success).toBe(true);
      expect(result.cronExpression).toBe('0 2 * * *');
    });

    it('should handle extra whitespace', () => {
      const result = humanizeCron('  every   day   at   2am  ', { locale: 'en' });
      expect(result.success).toBe(true);
      expect(result.cronExpression).toBe('0 2 * * *');
    });

    it('should fail on invalid input', () => {
      const result = humanizeCron('invalid text', { locale: 'en' });
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.suggestions).toBeDefined();
    });
  });

  describe('humanizeCron - Spanish', () => {
    it('should convert "cada minuto"', () => {
      const result = humanizeCron('cada minuto', { locale: 'es' });
      expect(result.success).toBe(true);
      expect(result.cronExpression).toBe('* * * * *');
    });

    it('should convert "cada 5 minutos"', () => {
      const result = humanizeCron('cada 5 minutos', { locale: 'es' });
      expect(result.success).toBe(true);
      expect(result.cronExpression).toBe('*/5 * * * *');
    });

    it('should convert "cada hora"', () => {
      const result = humanizeCron('cada hora', { locale: 'es' });
      expect(result.success).toBe(true);
      expect(result.cronExpression).toBe('0 * * * *');
    });

    it('should convert "cada 2 horas"', () => {
      const result = humanizeCron('cada 2 horas', { locale: 'es' });
      expect(result.success).toBe(true);
      expect(result.cronExpression).toBe('0 */2 * * *');
    });

    it('should convert "todos los días"', () => {
      const result = humanizeCron('todos los días', { locale: 'es' });
      expect(result.success).toBe(true);
      expect(result.cronExpression).toBe('0 0 * * *');
    });

    it('should convert "todos los dias" (sin acento)', () => {
      const result = humanizeCron('todos los dias', { locale: 'es' });
      expect(result.success).toBe(true);
      expect(result.cronExpression).toBe('0 0 * * *');
    });

    it('should convert "todos los días a las 2am"', () => {
      const result = humanizeCron('todos los días a las 2am', { locale: 'es' });
      expect(result.success).toBe(true);
      expect(result.cronExpression).toBe('0 2 * * *');
    });

    it('should convert "todos los días a las 14:30"', () => {
      const result = humanizeCron('todos los días a las 14:30', { locale: 'es' });
      expect(result.success).toBe(true);
      expect(result.cronExpression).toBe('30 14 * * *');
    });

    it('should convert "todos los lunes"', () => {
      const result = humanizeCron('todos los lunes', { locale: 'es' });
      expect(result.success).toBe(true);
      expect(result.cronExpression).toBe('0 0 * * 1');
    });

    it('should convert "cada lunes"', () => {
      const result = humanizeCron('cada lunes', { locale: 'es' });
      expect(result.success).toBe(true);
      expect(result.cronExpression).toBe('0 0 * * 1');
    });

    it('should convert "todos los lunes a las 10am"', () => {
      const result = humanizeCron('todos los lunes a las 10am', { locale: 'es' });
      expect(result.success).toBe(true);
      expect(result.cronExpression).toBe('0 10 * * 1');
    });

    it('should convert "cada semana"', () => {
      const result = humanizeCron('cada semana', { locale: 'es' });
      expect(result.success).toBe(true);
      expect(result.cronExpression).toBe('0 0 * * 0');
    });

    it('should convert "cada mes"', () => {
      const result = humanizeCron('cada mes', { locale: 'es' });
      expect(result.success).toBe(true);
      expect(result.cronExpression).toBe('0 0 1 * *');
    });

    it('should convert "el día 1 de cada mes"', () => {
      const result = humanizeCron('el día 1 de cada mes', { locale: 'es' });
      expect(result.success).toBe(true);
      expect(result.cronExpression).toBe('0 0 1 * *');
    });

    it('should convert "el dia 15 de cada mes a las 3pm"', () => {
      const result = humanizeCron('el dia 15 de cada mes a las 3pm', { locale: 'es' });
      expect(result.success).toBe(true);
      expect(result.cronExpression).toBe('0 15 15 * *');
    });

    it('should convert "a las 2am"', () => {
      const result = humanizeCron('a las 2am', { locale: 'es' });
      expect(result.success).toBe(true);
      expect(result.cronExpression).toBe('0 2 * * *');
    });

    it('should convert "días de semana a las 9am"', () => {
      const result = humanizeCron('días de semana a las 9am', { locale: 'es' });
      expect(result.success).toBe(true);
      expect(result.cronExpression).toBe('0 9 * * 1-5');
    });

    it('should convert "dias laborales a las 9am"', () => {
      const result = humanizeCron('dias laborales a las 9am', { locale: 'es' });
      expect(result.success).toBe(true);
      expect(result.cronExpression).toBe('0 9 * * 1-5');
    });

    it('should convert "fines de semana a las 10am"', () => {
      const result = humanizeCron('fines de semana a las 10am', { locale: 'es' });
      expect(result.success).toBe(true);
      expect(result.cronExpression).toBe('0 10 * * 0,6');
    });

    it('should handle different Spanish day names', () => {
      expect(humanizeCron('todos los martes', { locale: 'es' }).cronExpression).toBe('0 0 * * 2');
      expect(humanizeCron('todos los miércoles', { locale: 'es' }).cronExpression).toBe(
        '0 0 * * 3'
      );
      expect(humanizeCron('todos los jueves', { locale: 'es' }).cronExpression).toBe('0 0 * * 4');
      expect(humanizeCron('todos los viernes', { locale: 'es' }).cronExpression).toBe('0 0 * * 5');
      expect(humanizeCron('todos los sábado', { locale: 'es' }).cronExpression).toBe('0 0 * * 6');
      expect(humanizeCron('todos los domingo', { locale: 'es' }).cronExpression).toBe('0 0 * * 0');
    });

    it('should handle case insensitivity', () => {
      const result = humanizeCron('TODOS LOS DÍAS A LAS 2AM', { locale: 'es' });
      expect(result.success).toBe(true);
      expect(result.cronExpression).toBe('0 2 * * *');
    });

    it('should handle extra whitespace', () => {
      const result = humanizeCron('  todos   los   días   a   las   2am  ', { locale: 'es' });
      expect(result.success).toBe(true);
      expect(result.cronExpression).toBe('0 2 * * *');
    });

    it('should fail on invalid input with Spanish error message', () => {
      const result = humanizeCron('texto inválido', { locale: 'es' });
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error).toContain('interpretar');
      expect(result.suggestions).toBeDefined();
    });

    it('should provide relevant suggestions', () => {
      const result = humanizeCron('algo con minuto', { locale: 'es' });
      expect(result.success).toBe(false);
      expect(result.suggestions).toContain('cada 5 minutos');
    });
  });
});
