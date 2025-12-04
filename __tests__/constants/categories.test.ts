/**
 * Tests for categories constants
 */

import { CATEGORIES, getCategoryById } from '../../src/constants/categories';

describe('Categories Constants', () => {
  describe('CATEGORIES array', () => {
    it('should have 9 categories', () => {
      expect(CATEGORIES).toHaveLength(9);
    });

    it('should have all required fields for each category', () => {
      CATEGORIES.forEach(category => {
        expect(category).toHaveProperty('id');
        expect(category).toHaveProperty('name');
        expect(category).toHaveProperty('description');
        expect(category).toHaveProperty('icon');
        expect(category).toHaveProperty('color');
      });
    });

    it('should have unique IDs', () => {
      const ids = CATEGORIES.map(c => c.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have valid hex colors', () => {
      const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;
      CATEGORIES.forEach(category => {
        expect(category.color).toMatch(hexColorRegex);
      });
    });

    it('should include expected categories', () => {
      const expectedIds = [
        'road_signs',
        'traffic_signals',
        'right_of_way',
        'parking_rules',
        'safe_driving',
        'alcohol_drugs',
        'special_situations',
        'vehicle_equipment',
        'road_markings',
      ];

      expectedIds.forEach(id => {
        const category = CATEGORIES.find(c => c.id === id);
        expect(category).toBeDefined();
      });
    });
  });

  describe('getCategoryById', () => {
    it('should return category for valid ID', () => {
      const result = getCategoryById('road_signs');
      expect(result).toBeDefined();
      expect(result?.name).toBe('Road Signs');
    });

    it('should return undefined for invalid ID', () => {
      const result = getCategoryById('invalid_category');
      expect(result).toBeUndefined();
    });

    it('should find all categories correctly', () => {
      CATEGORIES.forEach(category => {
        const found = getCategoryById(category.id);
        expect(found).toEqual(category);
      });
    });
  });
});
