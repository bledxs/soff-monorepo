import { describe, it, expect } from 'vitest';
import { Money } from '../../src/core/money.js';
import { USD } from '../../src/locales/us.js';
import { COP } from '../../src/locales/co.js';

describe('Money', () => {
  describe('creation', () => {
    it('should create money from cents', () => {
      const money = Money.fromCents(1000, USD);
      expect(money.cents).toBe(1000);
      expect(money.toDecimal()).toBe(10);
    });

    it('should create money from decimal', () => {
      const money = Money.fromDecimal(10.5, USD);
      expect(money.cents).toBe(1050);
      expect(money.toDecimal()).toBe(10.5);
    });

    it('should create zero money', () => {
      const money = Money.zero(USD);
      expect(money.cents).toBe(0);
      expect(money.isZero()).toBe(true);
    });

    it('should round when creating from decimal', () => {
      const money = Money.fromDecimal(10.555, USD);
      expect(money.cents).toBe(1056); // Rounds to nearest
    });

    it('should round float cents when creating from fromCents', () => {
      const money = Money.fromCents(100.7, USD);
      expect(money.cents).toBe(101); // Rounds to nearest integer
    });

    it('should create money from a formatted string (USD)', () => {
      const money = Money.fromString('$1,500.50', USD);
      expect(money.cents).toBe(150050);
      expect(money.toDecimal()).toBe(1500.5);
    });

    it('should create money from a formatted string with spaces and different separators (COP)', () => {
      const money = Money.fromString('$ 1.500.000', COP);
      expect(money.cents).toBe(150000000);
      expect(money.toDecimal()).toBe(1500000);
    });

    it('should handle negative formatted strings', () => {
      const money = Money.fromString('-$1,500.50', USD);
      expect(money.cents).toBe(-150050);
      expect(money.toDecimal()).toBe(-1500.5);
    });

    it('should throw an error for invalid money strings', () => {
      expect(() => Money.fromString('not-a-number', USD)).toThrow(
        'Cannot parse "not-a-number" as money'
      );
    });
  });

  describe('arithmetic', () => {
    it('should add money correctly', () => {
      const a = Money.fromCents(1000, USD);
      const b = Money.fromCents(500, USD);
      const result = a.add(b);
      expect(result.cents).toBe(1500);
    });

    it('should subtract money correctly', () => {
      const a = Money.fromCents(1000, USD);
      const b = Money.fromCents(300, USD);
      const result = a.subtract(b);
      expect(result.cents).toBe(700);
    });

    it('should multiply correctly', () => {
      const money = Money.fromCents(1000, USD);
      const result = money.multiply(1.5);
      expect(result.cents).toBe(1500);
    });

    it('should divide correctly', () => {
      const money = Money.fromCents(1000, USD);
      const result = money.divide(4);
      expect(result.cents).toBe(250);
    });

    it('should throw when dividing by zero', () => {
      const money = Money.fromCents(1000, USD);
      expect(() => money.divide(0)).toThrow('Cannot divide by zero');
    });

    it('should throw when adding different currencies', () => {
      const usd = Money.fromCents(1000, USD);
      const cop = Money.fromCents(1000, COP);
      expect(() => usd.add(cop)).toThrow('different currencies');
    });
  });

  describe('distribution', () => {
    it('should distribute evenly', () => {
      const money = Money.fromCents(1000, USD);
      const parts = money.distribute(4);
      expect(parts).toHaveLength(4);
      expect(parts.every((p) => p.cents === 250)).toBe(true);
    });

    it('should distribute remainder to first parts', () => {
      const money = Money.fromCents(1000, USD); // $10.00
      const parts = money.distribute(3);
      expect(parts).toHaveLength(3);
      expect(parts[0].cents).toBe(334); // Gets extra cent
      expect(parts[1].cents).toBe(333);
      expect(parts[2].cents).toBe(333);
      // Total should be exactly 1000
      expect(parts.reduce((sum, p) => sum + p.cents, 0)).toBe(1000);
    });

    it('should distribute $100 among 3 people correctly', () => {
      const money = Money.fromCents(10000, USD); // $100.00
      const parts = money.distribute(3);
      expect(parts[0].cents).toBe(3334); // $33.34
      expect(parts[1].cents).toBe(3333); // $33.33
      expect(parts[2].cents).toBe(3333); // $33.33
      expect(parts.reduce((sum, p) => sum + p.cents, 0)).toBe(10000);
    });

    it('should distribute by ratios', () => {
      const money = Money.fromCents(10000, USD); // $100.00
      const parts = money.distributeByRatios([1, 2, 2]); // 20%, 40%, 40%
      expect(parts[0].cents).toBe(2000); // $20.00
      expect(parts[1].cents).toBe(4000); // $40.00
      expect(parts[2].cents).toBe(4000); // $40.00
    });

    it('should throw for invalid parts', () => {
      const money = Money.fromCents(1000, USD);
      expect(() => money.distribute(0)).toThrow('positive integer');
      expect(() => money.distribute(-1)).toThrow('positive integer');
    });

    it('should throw for empty ratios array', () => {
      const money = Money.fromCents(1000, USD);
      expect(() => money.distributeByRatios([])).toThrow('empty');
    });

    it('should throw for zero sum ratios', () => {
      const money = Money.fromCents(1000, USD);
      expect(() => money.distributeByRatios([0, 0, 0])).toThrow('positive');
    });

    it('should handle negative ratios that sum to positive', () => {
      const money = Money.fromCents(1000, USD);
      // -1 + 3 + 2 = 4
      const parts = money.distributeByRatios([1, 2, 1]);
      expect(parts.reduce((sum, p) => sum + p.cents, 0)).toBe(1000);
    });
  });

  describe('comparisons', () => {
    it('should check equality', () => {
      const a = Money.fromCents(1000, USD);
      const b = Money.fromCents(1000, USD);
      const c = Money.fromCents(500, USD);
      expect(a.equals(b)).toBe(true);
      expect(a.equals(c)).toBe(false);
    });

    it('should check equality with different currencies', () => {
      const usd = Money.fromCents(1000, USD);
      const cop = Money.fromCents(1000, COP);
      expect(usd.equals(cop)).toBe(false);
    });

    it('should compare greater than', () => {
      const a = Money.fromCents(1000, USD);
      const b = Money.fromCents(500, USD);
      expect(a.greaterThan(b)).toBe(true);
      expect(b.greaterThan(a)).toBe(false);
    });

    it('should compare less than', () => {
      const a = Money.fromCents(500, USD);
      const b = Money.fromCents(1000, USD);
      expect(a.lessThan(b)).toBe(true);
      expect(b.lessThan(a)).toBe(false);
    });

    it('should compare greater than or equal', () => {
      const a = Money.fromCents(1000, USD);
      const b = Money.fromCents(1000, USD);
      const c = Money.fromCents(500, USD);
      expect(a.greaterThanOrEqual(b)).toBe(true);
      expect(a.greaterThanOrEqual(c)).toBe(true);
      expect(c.greaterThanOrEqual(a)).toBe(false);
    });

    it('should compare less than or equal', () => {
      const a = Money.fromCents(1000, USD);
      const b = Money.fromCents(1000, USD);
      const c = Money.fromCents(500, USD);
      expect(a.lessThanOrEqual(b)).toBe(true);
      expect(c.lessThanOrEqual(a)).toBe(true);
      expect(a.lessThanOrEqual(c)).toBe(false);
    });

    it('should check zero, positive, negative', () => {
      const zero = Money.zero(USD);
      const positive = Money.fromCents(100, USD);
      const negative = Money.fromCents(-100, USD);

      expect(zero.isZero()).toBe(true);
      expect(positive.isPositive()).toBe(true);
      expect(negative.isNegative()).toBe(true);
    });

    it('should throw when comparing different currencies', () => {
      const usd = Money.fromCents(1000, USD);
      const cop = Money.fromCents(1000, COP);
      expect(() => usd.greaterThan(cop)).toThrow('different currencies');
      expect(() => usd.lessThan(cop)).toThrow('different currencies');
      expect(() => usd.greaterThanOrEqual(cop)).toThrow('different currencies');
      expect(() => usd.lessThanOrEqual(cop)).toThrow('different currencies');
    });
  });

  describe('utilities', () => {
    it('should get absolute value', () => {
      const negative = Money.fromCents(-1000, USD);
      expect(negative.abs().cents).toBe(1000);
    });

    it('should negate', () => {
      const positive = Money.fromCents(1000, USD);
      expect(positive.negate().cents).toBe(-1000);
    });

    it('should serialize to JSON', () => {
      const money = Money.fromCents(1000, USD);
      expect(money.toJSON()).toEqual({ cents: 1000, currency: 'USD' });
    });

    it('should get cents with toCents()', () => {
      const money = Money.fromDecimal(10.5, USD);
      expect(money.toCents()).toBe(1050);
    });
  });

  describe('percentage operations', () => {
    it('should calculate percentage', () => {
      const money = Money.fromCents(10000, USD); // $100.00
      expect(money.percentage(10).cents).toBe(1000); // $10.00
      expect(money.percentage(50).cents).toBe(5000); // $50.00
      expect(money.percentage(100).cents).toBe(10000); // $100.00
    });

    it('should add percentage (tax)', () => {
      const money = Money.fromCents(10000, USD); // $100.00
      const withTax = money.addPercentage(19); // Add 19% tax
      expect(withTax.cents).toBe(11900); // $119.00
    });

    it('should subtract percentage (discount)', () => {
      const money = Money.fromCents(10000, USD); // $100.00
      const discounted = money.subtractPercentage(10); // 10% off
      expect(discounted.cents).toBe(9000); // $90.00
    });
  });

  describe('min/max operations', () => {
    it('should get minimum of two values', () => {
      const a = Money.fromCents(1000, USD);
      const b = Money.fromCents(500, USD);
      expect(a.min(b).cents).toBe(500);
      expect(b.min(a).cents).toBe(500);
    });

    it('should get maximum of two values', () => {
      const a = Money.fromCents(1000, USD);
      const b = Money.fromCents(500, USD);
      expect(a.max(b).cents).toBe(1000);
      expect(b.max(a).cents).toBe(1000);
    });

    it('should clamp value between min and max', () => {
      const min = Money.fromCents(100, USD);
      const max = Money.fromCents(1000, USD);

      const low = Money.fromCents(50, USD);
      const mid = Money.fromCents(500, USD);
      const high = Money.fromCents(2000, USD);

      expect(low.clamp(min, max).cents).toBe(100);
      expect(mid.clamp(min, max).cents).toBe(500);
      expect(high.clamp(min, max).cents).toBe(1000);
    });

    it('should check if between range', () => {
      const min = Money.fromCents(100, USD);
      const max = Money.fromCents(1000, USD);
      const mid = Money.fromCents(500, USD);
      const low = Money.fromCents(50, USD);

      expect(mid.isBetween(min, max)).toBe(true);
      expect(min.isBetween(min, max)).toBe(true); // inclusive
      expect(max.isBetween(min, max)).toBe(true); // inclusive
      expect(low.isBetween(min, max)).toBe(false);
    });
  });

  describe('static methods', () => {
    it('should sum array of money', () => {
      const values = [
        Money.fromCents(100, USD),
        Money.fromCents(200, USD),
        Money.fromCents(300, USD),
      ];
      expect(Money.sum(values).cents).toBe(600);
    });

    it('should throw when summing empty array', () => {
      expect(() => Money.sum([])).toThrow('empty');
    });

    it('should throw when summing different currencies', () => {
      const values = [Money.fromCents(100, USD), Money.fromCents(100, COP)];
      expect(() => Money.sum(values)).toThrow('different currencies');
    });

    it('should get minimum from array', () => {
      const values = [
        Money.fromCents(300, USD),
        Money.fromCents(100, USD),
        Money.fromCents(200, USD),
      ];
      expect(Money.minimum(values).cents).toBe(100);
    });

    it('should get maximum from array', () => {
      const values = [
        Money.fromCents(300, USD),
        Money.fromCents(100, USD),
        Money.fromCents(200, USD),
      ];
      expect(Money.maximum(values).cents).toBe(300);
    });

    it('should throw when getting min/max of empty array', () => {
      expect(() => Money.minimum([])).toThrow('empty');
      expect(() => Money.maximum([])).toThrow('empty');
    });

    it('should calculate average', () => {
      const values = [
        Money.fromCents(100, USD),
        Money.fromCents(200, USD),
        Money.fromCents(300, USD),
      ];
      expect(Money.average(values).cents).toBe(200);
    });

    it('should throw when calculating average of empty array', () => {
      expect(() => Money.average([])).toThrow('empty');
    });
  });
});
