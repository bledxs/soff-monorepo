import { describe, it, expect } from 'vitest';
import * as ar from '../../src/locales/ar';

describe('Argentina Geography', () => {
  describe('Provinces', () => {
    it('should return all provinces', () => {
      const provinces = ar.getProvinces();
      expect(provinces.length).toBeGreaterThan(0);
      expect(provinces.find((p) => p.code === 'C')).toBeDefined(); // CABA
      expect(provinces.find((p) => p.code === 'X')).toBeDefined(); // Cordoba
    });

    it('should find province by code', () => {
      const province = ar.getProvince('M');
      expect(province?.name).toBe('Mendoza');
    });

    it('should search provinces', () => {
      const results = ar.searchProvinces('santa');
      expect(results.length).toBeGreaterThan(0);
      expect(results.some((r) => r.item.name.includes('Santa Fe'))).toBe(true);
    });
  });

  describe('Municipalities/Cities', () => {
    it('should return municipalities', () => {
      const munis = ar.getMunicipalities();
      expect(munis.length).toBeGreaterThan(0);
    });

    it('should get municipalities by province', () => {
      const cordobaCities = ar.getProvinceMunicipalities('X');
      expect(cordobaCities.length).toBeGreaterThan(0);
      expect(cordobaCities.some((c) => c.name === 'Villa Carlos Paz')).toBe(true);
    });

    it('should search municipalities', () => {
      const results = ar.searchMunicipalities('Plata');
      expect(results.some((r) => r.item.name === 'La Plata')).toBe(true);
      expect(results.some((r) => r.item.name === 'Mar del Plata')).toBe(true);
    });
  });
});
