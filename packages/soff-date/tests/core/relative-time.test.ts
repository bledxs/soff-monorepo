import { describe, it, expect } from 'vitest';
import { formatRelativeTime } from '../../src/core/relative-time';

describe('formatRelativeTime', () => {
  const now = new Date('2024-01-01T12:00:00Z');

  it('should format seconds ago', () => {
    const past = new Date(now.getTime() - 5000); // 5 seconds ago
    expect(formatRelativeTime(past, { baseDate: now, locale: 'en' })).toBe('5 seconds ago');
  });

  it('should format future seconds', () => {
    const future = new Date(now.getTime() + 10000); // 10 seconds in future
    expect(formatRelativeTime(future, { baseDate: now, locale: 'en' })).toBe('in 10 seconds');
  });

  it('should format minutes ago', () => {
    const past = new Date(now.getTime() - 60 * 1000 * 5); // 5 minutes ago
    expect(formatRelativeTime(past, { baseDate: now, locale: 'en' })).toBe('5 minutes ago');
  });

  it('should format hours ago', () => {
    const past = new Date(now.getTime() - 60 * 60 * 1000 * 2); // 2 hours ago
    expect(formatRelativeTime(past, { baseDate: now, locale: 'en' })).toBe('2 hours ago');
  });

  it('should format days ago', () => {
    const past = new Date(now.getTime() - 24 * 60 * 60 * 1000 * 3); // 3 days ago
    expect(formatRelativeTime(past, { baseDate: now, locale: 'en' })).toBe('3 days ago');
  });

  it('should support different locales (es)', () => {
    const past = new Date(now.getTime() - 24 * 60 * 60 * 1000 * 1); // 1 day ago
    expect(formatRelativeTime(past, { baseDate: now, locale: 'es' })).toBe('hace 1 día');
  });

  it('should support numeric auto formatting', () => {
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    expect(formatRelativeTime(yesterday, { baseDate: now, locale: 'en', numeric: 'auto' })).toBe(
      'yesterday',
    );
  });

  it('should support short style formatting', () => {
    const future = new Date(now.getTime() + 2 * 60 * 60 * 1000);
    expect(formatRelativeTime(future, { baseDate: now, locale: 'en', style: 'short' })).toBe(
      'in 2 hr.',
    );
  });

  it('should handle "just now" for very small diffs if configured', () => {
    // Default behavior might just be seconds, but good to test small values
    const past = new Date(now.getTime() - 500); // 0.5s ago
    // Intl.RelativeTimeFormat usually says "0 seconds ago" or "now" depending on config/implementation choice.
    // Let's expect our implementation to handle seconds by default.
    expect(formatRelativeTime(past, { baseDate: now, locale: 'en' })).toMatch(/second/);
  });

  it('should return empty string for invalid dates', () => {
    expect(formatRelativeTime(new Date('invalid'), { baseDate: now, locale: 'en' })).toBe('');
  });

  it('should return empty string for invalid base dates', () => {
    expect(formatRelativeTime(now, { baseDate: new Date('invalid'), locale: 'en' })).toBe('');
  });
});
