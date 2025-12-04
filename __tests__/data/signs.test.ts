/**
 * Tests for signs data module
 */

import {
  signs,
  getSignsByCategory,
  searchSigns,
  getSignById,
  getSignCategories,
} from '../../src/data/signs';

describe('Signs Data', () => {
  describe('signs array', () => {
    it('should have signs loaded', () => {
      expect(signs.length).toBeGreaterThan(0);
    });

    it('should have all required fields in each sign', () => {
      signs.forEach(sign => {
        expect(sign).toHaveProperty('id');
        expect(sign).toHaveProperty('name');
        expect(sign).toHaveProperty('category');
        expect(sign).toHaveProperty('description');
        expect(sign).toHaveProperty('relatedQuestionIds');
      });
    });

    it('should have unique IDs', () => {
      const ids = signs.map(s => s.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have valid category types', () => {
      const validCategories = ['regulatory', 'warning', 'guide', 'construction'];
      signs.forEach(sign => {
        expect(validCategories).toContain(sign.category);
      });
    });
  });

  describe('getSignsByCategory', () => {
    it('should return signs for regulatory category', () => {
      const result = getSignsByCategory('regulatory');
      expect(result.length).toBeGreaterThan(0);
      result.forEach(sign => {
        expect(sign.category).toBe('regulatory');
      });
    });

    it('should return signs for warning category', () => {
      const result = getSignsByCategory('warning');
      expect(result.length).toBeGreaterThan(0);
      result.forEach(sign => {
        expect(sign.category).toBe('warning');
      });
    });

    it('should return signs for guide category', () => {
      const result = getSignsByCategory('guide');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should return signs for construction category', () => {
      const result = getSignsByCategory('construction');
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('searchSigns', () => {
    it('should find signs by name', () => {
      const result = searchSigns('stop');
      expect(result.length).toBeGreaterThan(0);
      expect(result.some(s => s.name.toLowerCase().includes('stop'))).toBe(true);
    });

    it('should find signs by description', () => {
      const result = searchSigns('complete stop');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should be case insensitive', () => {
      const result1 = searchSigns('STOP');
      const result2 = searchSigns('stop');
      expect(result1.length).toBe(result2.length);
    });

    it('should return empty array for no matches', () => {
      const result = searchSigns('xyznonexistent');
      expect(result).toHaveLength(0);
    });
  });

  describe('getSignById', () => {
    it('should return sign for valid ID', () => {
      const firstSign = signs[0];
      const result = getSignById(firstSign.id);
      expect(result).toEqual(firstSign);
    });

    it('should return undefined for invalid ID', () => {
      const result = getSignById('invalid_sign_id');
      expect(result).toBeUndefined();
    });
  });

  describe('getSignCategories', () => {
    it('should return all four categories', () => {
      const categories = getSignCategories();
      expect(categories).toHaveLength(4);
      expect(categories).toContain('regulatory');
      expect(categories).toContain('warning');
      expect(categories).toContain('guide');
      expect(categories).toContain('construction');
    });
  });
});
