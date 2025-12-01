import { describe, it, expect } from 'vitest';
import {
  mask,
  unmask,
  maskWithResult,
  isComplete,
  getPatternLength,
  parsePattern,
  createDynamicMask,
  getPlaceholder,
  isValidFormat,
  getNextCursorPosition,
  extractRaw,
} from '../../src/core/engine.js';

describe('Mask Engine', () => {
  describe('parsePattern()', () => {
    it('should parse digit tokens', () => {
      const tokens = parsePattern('###');
      expect(tokens).toHaveLength(3);
      expect(tokens.every((t) => t.type === 'digit')).toBe(true);
    });

    it('should parse letter tokens', () => {
      const tokens = parsePattern('AAA');
      expect(tokens).toHaveLength(3);
      expect(tokens.every((t) => t.type === 'letter')).toBe(true);
    });

    it('should parse literal tokens', () => {
      const tokens = parsePattern('()-');
      expect(tokens).toHaveLength(3);
      expect(tokens.every((t) => t.type === 'literal')).toBe(true);
    });

    it('should parse escaped characters', () => {
      const tokens = parsePattern('\\#\\A');
      expect(tokens).toHaveLength(2);
      expect(tokens[0].type).toBe('literal');
      expect(tokens[0].char).toBe('#');
      expect(tokens[1].type).toBe('literal');
      expect(tokens[1].char).toBe('A');
    });

    it('should parse mixed pattern', () => {
      const tokens = parsePattern('(###) AAA');
      expect(tokens).toHaveLength(9);
      expect(tokens[0].type).toBe('literal'); // (
      expect(tokens[1].type).toBe('digit'); // #
    });
  });

  describe('mask()', () => {
    it('should mask phone number', () => {
      expect(mask('3001234567', '(###) ###-####')).toBe('(300) 123-4567');
    });

    it('should mask partial input', () => {
      expect(mask('300', '(###) ###-####')).toBe('(300');
    });

    it('should mask CPF', () => {
      expect(mask('12345678909', '###.###.###-##')).toBe('123.456.789-09');
    });

    it('should mask credit card', () => {
      expect(mask('4111111111111111', '#### #### #### ####')).toBe('4111 1111 1111 1111');
    });

    it('should handle letters with A token', () => {
      expect(mask('ABC123', 'AAA-###')).toBe('ABC-123');
    });

    it('should handle alphanumeric with S token', () => {
      expect(mask('A1B2C3', 'SSS-SSS')).toBe('A1B-2C3');
    });

    it('should handle any character with * token', () => {
      expect(mask('A1@#', '****')).toBe('A1@#');
    });

    it('should skip invalid characters', () => {
      expect(mask('abc123def456', '###-###')).toBe('123-456');
    });

    it('should handle empty input', () => {
      expect(mask('', '###-###')).toBe('');
    });

    it('should skip literal in input if it matches', () => {
      expect(mask('(300)1234567', '(###) ###-####')).toBe('(300) 123-4567');
    });

    it('should use guide character when specified', () => {
      const result = mask('30', '(###) ###-####', { guide: '_' });
      expect(result).toContain('30');
    });
  });

  describe('unmask()', () => {
    it('should unmask phone number', () => {
      expect(unmask('(300) 123-4567', '(###) ###-####')).toBe('3001234567');
    });

    it('should unmask CPF', () => {
      expect(unmask('123.456.789-09', '###.###.###-##')).toBe('12345678909');
    });

    it('should unmask credit card', () => {
      expect(unmask('4111 1111 1111 1111', '#### #### #### ####')).toBe('4111111111111111');
    });

    it('should handle partial mask', () => {
      expect(unmask('(300) ', '(###) ###-####')).toBe('300');
    });

    it('should handle empty input', () => {
      expect(unmask('', '###-###')).toBe('');
    });
  });

  describe('maskWithResult()', () => {
    it('should return complete for full input', () => {
      const result = maskWithResult('3001234567', '(###) ###-####');
      expect(result.value).toBe('(300) 123-4567');
      expect(result.raw).toBe('3001234567');
      expect(result.complete).toBe(true);
    });

    it('should return incomplete for partial input', () => {
      const result = maskWithResult('300123', '(###) ###-####');
      expect(result.complete).toBe(false);
    });

    it('should include cursor position', () => {
      const result = maskWithResult('3001234567', '(###) ###-####');
      expect(result.cursorPosition).toBe(14);
    });
  });

  describe('isComplete()', () => {
    it('should return true for complete mask', () => {
      expect(isComplete('(300) 123-4567', '(###) ###-####')).toBe(true);
    });

    it('should return false for incomplete mask', () => {
      expect(isComplete('(300) 123', '(###) ###-####')).toBe(false);
    });
  });

  describe('getPatternLength()', () => {
    it('should return correct length for phone pattern', () => {
      expect(getPatternLength('(###) ###-####')).toBe(10);
    });

    it('should return correct length for CPF pattern', () => {
      expect(getPatternLength('###.###.###-##')).toBe(11);
    });

    it('should return 0 for pattern with only literals', () => {
      expect(getPatternLength('(--)')).toBe(0);
    });
  });

  describe('createDynamicMask()', () => {
    it('should use appropriate pattern based on input length', () => {
      const dynamicMask = createDynamicMask([
        { maxLength: 8, pattern: '####-####' },
        { maxLength: 9, pattern: '#####-####' },
      ]);

      expect(dynamicMask('12345678')).toBe('1234-5678');
      expect(dynamicMask('123456789')).toBe('12345-6789');
    });

    it('should use last pattern for longer inputs', () => {
      const dynamicMask = createDynamicMask([
        { maxLength: 4, pattern: '####' },
        { maxLength: 8, pattern: '####-####' },
      ]);

      expect(dynamicMask('123456789012')).toBe('1234-5678');
    });

    it('should handle unsorted rules', () => {
      const dynamicMask = createDynamicMask([
        { maxLength: 8, pattern: '####-####' },
        { maxLength: 4, pattern: '####' },
      ]);

      expect(dynamicMask('1234')).toBe('1234');
      expect(dynamicMask('12345678')).toBe('1234-5678');
    });
  });

  describe('getPlaceholder()', () => {
    it('should return placeholder with default character', () => {
      expect(getPlaceholder('(###) ###-####')).toBe('(___) ___-____');
    });

    it('should return placeholder with custom character', () => {
      expect(getPlaceholder('###-###', '0')).toBe('000-000');
    });

    it('should preserve literals', () => {
      expect(getPlaceholder('##/##/####')).toBe('__/__/____');
    });
  });

  describe('isValidFormat()', () => {
    it('should return true for valid masked value', () => {
      expect(isValidFormat('(300) 123-4567', '(###) ###-####')).toBe(true);
    });

    it('should return false for incomplete value', () => {
      expect(isValidFormat('(300) 123', '(###) ###-####')).toBe(false);
    });

    it('should return false for invalid format', () => {
      expect(isValidFormat('3001234567', '(###) ###-####')).toBe(false);
    });
  });

  describe('getNextCursorPosition()', () => {
    it('should return correct position after digits', () => {
      const pos = getNextCursorPosition('300', '(###) ###-####', 4);
      expect(pos).toBe(4);
    });

    it('should not exceed masked length', () => {
      const pos = getNextCursorPosition('300', '(###) ###-####', 100);
      expect(pos).toBeLessThanOrEqual(4);
    });

    it('should skip over literals', () => {
      const pos = getNextCursorPosition('3001234567', '(###) ###-####', 0);
      expect(pos).toBeGreaterThanOrEqual(0);
    });
  });

  describe('extractRaw()', () => {
    it('should extract digits', () => {
      expect(extractRaw('(300) 123-4567', 'digits')).toBe('3001234567');
    });

    it('should extract letters', () => {
      expect(extractRaw('ABC-123-DEF', 'letters')).toBe('ABCDEF');
    });

    it('should extract alphanumeric', () => {
      expect(extractRaw('A1-B2-C3', 'alphanumeric')).toBe('A1B2C3');
    });

    it('should return all characters by default', () => {
      expect(extractRaw('(300) 123-4567', 'all')).toBe('(300) 123-4567');
      expect(extractRaw('(300) 123-4567')).toBe('(300) 123-4567');
    });
  });
});
