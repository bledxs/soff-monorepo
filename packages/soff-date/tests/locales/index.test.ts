import { describe, expect, it } from 'vitest';
import { ar, br, co, mx, us, pe, cl, ec } from '../../src/locales';

describe('locales barrel', () => {
  it('exports all locale namespaces', () => {
    expect(co.getHolidays(2025).length).toBeGreaterThan(0);
    expect(us.getHolidays(2025).length).toBeGreaterThan(0);
    expect(mx.getHolidays(2025).length).toBeGreaterThan(0);
    expect(ar.getHolidays(2025).length).toBeGreaterThan(0);
    expect(br.getHolidays(2025).length).toBeGreaterThan(0);
    expect(pe.getHolidays(2025).length).toBeGreaterThan(0);
    expect(cl.getHolidays(2025).length).toBeGreaterThan(0);
    expect(ec.getHolidays(2025).length).toBeGreaterThan(0);
  });

  it('preserves each locale API shape', () => {
    expect(typeof co.isHoliday).toBe('function');
    expect(typeof us.getNextHoliday).toBe('function');
    expect(typeof mx.isBusinessDay).toBe('function');
    expect(typeof ar.businessDays).toBe('function');
    expect(typeof br.diffBusinessDays).toBe('function');
    expect(typeof pe.businessHours).toBe('function');
    expect(typeof cl.diffBusinessHours).toBe('function');
    expect(typeof ec.getHolidays).toBe('function');
  });
});
