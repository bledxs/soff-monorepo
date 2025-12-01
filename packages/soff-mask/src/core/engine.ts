import type { MaskToken, TokenType, MaskResult, MaskOptions, DynamicMaskRule } from './types.js';

/**
 * Token definitions
 */
const TOKEN_MAP: Record<string, TokenType> = {
  '#': 'digit',
  A: 'letter',
  S: 'alphanumeric',
  '*': 'any',
};

/**
 * Regex patterns for token types
 */
const TOKEN_PATTERNS: Record<TokenType, RegExp> = {
  digit: /\d/,
  letter: /[a-zA-Z]/,
  alphanumeric: /[a-zA-Z0-9]/,
  any: /./,
  literal: /./,
};

/**
 * Parse a mask pattern into tokens
 */
export function parsePattern(pattern: string): MaskToken[] {
  const tokens: MaskToken[] = [];
  let escaped = false;

  for (let i = 0; i < pattern.length; i++) {
    const char = pattern[i];

    if (escaped) {
      tokens.push({ type: 'literal', char, index: i });
      escaped = false;
      continue;
    }

    if (char === '\\') {
      escaped = true;
      continue;
    }

    const tokenType = TOKEN_MAP[char];
    if (tokenType) {
      tokens.push({ type: tokenType, char, index: i });
    } else {
      tokens.push({ type: 'literal', char, index: i });
    }
  }

  return tokens;
}

/**
 * Check if a character matches a token type
 */
function matchesToken(char: string, token: MaskToken): boolean {
  if (token.type === 'literal') {
    return char === token.char;
  }
  return TOKEN_PATTERNS[token.type].test(char);
}

/**
 * Apply a mask pattern to a value
 */
export function mask(value: string, pattern: string, options: MaskOptions = {}): string {
  const { guide } = options;
  const tokens = parsePattern(pattern);

  let result = '';
  let valueIndex = 0;

  for (const token of tokens) {
    if (valueIndex >= value.length && !guide) {
      break;
    }

    if (token.type === 'literal') {
      result += token.char;
      // Skip literal in input if it matches
      if (value[valueIndex] === token.char) {
        valueIndex++;
      }
    } else {
      // Find next matching character in input
      while (valueIndex < value.length) {
        const inputChar = value[valueIndex];
        valueIndex++;

        if (matchesToken(inputChar, token)) {
          result += inputChar;
          break;
        }
      }

      // If no match found and guide is enabled, add guide char
      if (result.length <= tokens.indexOf(token) && guide) {
        result += guide;
      }
    }
  }

  return result;
}

/**
 * Remove mask from a value
 */
export function unmask(value: string, pattern: string): string {
  const tokens = parsePattern(pattern);
  let result = '';
  let valueIndex = 0;

  for (const token of tokens) {
    if (valueIndex >= value.length) {
      break;
    }

    const char = value[valueIndex];
    valueIndex++;

    if (token.type !== 'literal') {
      if (matchesToken(char, token)) {
        result += char;
      }
    }
  }

  return result;
}

/**
 * Apply mask and return detailed result
 */
export function maskWithResult(
  value: string,
  pattern: string,
  options: MaskOptions = {}
): MaskResult {
  const tokens = parsePattern(pattern);
  const masked = mask(value, pattern, options);
  const raw = unmask(masked, pattern);

  // Count required positions (non-literals)
  const requiredPositions = tokens.filter((t) => t.type !== 'literal').length;
  const filledPositions = raw.length;

  return {
    value: masked,
    raw,
    complete: filledPositions >= requiredPositions,
    cursorPosition: masked.length,
  };
}

/**
 * Create a dynamic mask that changes based on input length
 */
export function createDynamicMask(rules: DynamicMaskRule[]): (value: string) => string {
  // Sort rules by maxLength ascending
  const sortedRules = [...rules].sort((a, b) => a.maxLength - b.maxLength);

  return (value: string) => {
    // Get raw value first
    const raw = value.replace(/\D/g, ''); // Simple digit extraction for length check

    // Find appropriate pattern
    const rule =
      sortedRules.find((r) => raw.length <= r.maxLength) || sortedRules[sortedRules.length - 1];

    return mask(value, rule.pattern);
  };
}

/**
 * Check if a value matches a pattern completely
 */
export function isComplete(value: string, pattern: string): boolean {
  const result = maskWithResult(value, pattern);
  return result.complete;
}

/**
 * Get the raw value length required for a pattern
 */
export function getPatternLength(pattern: string): number {
  const tokens = parsePattern(pattern);
  return tokens.filter((t) => t.type !== 'literal').length;
}

/**
 * Get a placeholder string for a pattern
 * @param pattern - The mask pattern
 * @param placeholder - The placeholder character (default: '_')
 * @returns A string with placeholders for input positions
 */
export function getPlaceholder(pattern: string, placeholder: string = '_'): string {
  const tokens = parsePattern(pattern);
  return tokens.map((t) => (t.type === 'literal' ? t.char : placeholder)).join('');
}

/**
 * Validate if a value matches a pattern format
 * @param value - The value to validate (can be masked or raw)
 * @param pattern - The mask pattern
 * @returns true if the value matches the pattern format
 */
export function isValidFormat(value: string, pattern: string): boolean {
  const masked = mask(value, pattern);
  const result = maskWithResult(masked, pattern);
  return result.complete && masked === value;
}

/**
 * Get the next cursor position after masking
 * @param value - The current input value
 * @param pattern - The mask pattern
 * @param cursorPosition - The current cursor position
 * @returns The adjusted cursor position
 */
export function getNextCursorPosition(
  value: string,
  pattern: string,
  cursorPosition: number
): number {
  const tokens = parsePattern(pattern);
  const masked = mask(value, pattern);

  // Don't exceed masked length
  if (cursorPosition >= masked.length) {
    return masked.length;
  }

  // Skip over literals
  let pos = cursorPosition;
  while (pos < tokens.length && tokens[pos]?.type === 'literal') {
    pos++;
  }

  return Math.min(pos, masked.length);
}

/**
 * Extract only the raw characters from a masked value
 * Alternative to unmask that doesn't require pattern matching
 * @param value - The masked value
 * @param extractType - Type of characters to extract ('digits' | 'letters' | 'alphanumeric' | 'all')
 */
export function extractRaw(
  value: string,
  extractType: 'digits' | 'letters' | 'alphanumeric' | 'all' = 'all'
): string {
  switch (extractType) {
    case 'digits':
      return value.replace(/\D/g, '');
    case 'letters':
      return value.replace(/[^a-zA-Z]/g, '');
    case 'alphanumeric':
      return value.replace(/[^a-zA-Z0-9]/g, '');
    case 'all':
    default:
      return value;
  }
}
