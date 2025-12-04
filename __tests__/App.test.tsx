/**
 * Basic App test
 * Note: Full React Native component testing requires additional setup
 * These tests verify the app's structure and exports
 */

import { describe, it, expect } from '@jest/globals';

// Test the constants exports
import { colors, spacing, borderRadius } from '../src/constants/theme';
import { CATEGORIES } from '../src/constants/categories';
import { US_STATES } from '../src/constants/states';
import { questions } from '../src/data/questions';
import { signs } from '../src/data/signs';

describe('App Structure', () => {
  it('should have theme constants defined', () => {
    expect(colors).toBeDefined();
    expect(colors.primary).toBe('#D94B3A');
    expect(spacing).toBeDefined();
    expect(borderRadius).toBeDefined();
  });

  it('should have categories defined', () => {
    expect(CATEGORIES).toBeDefined();
    expect(CATEGORIES.length).toBe(9);
  });

  it('should have states defined', () => {
    expect(US_STATES).toBeDefined();
    expect(US_STATES.length).toBe(51);
  });

  it('should have questions loaded', () => {
    expect(questions).toBeDefined();
    expect(questions.length).toBeGreaterThan(50);
  });

  it('should have signs loaded', () => {
    expect(signs).toBeDefined();
    expect(signs.length).toBeGreaterThan(20);
  });
});

describe('Data Integrity', () => {
  it('should have questions for all categories', () => {
    const categoryIds = CATEGORIES.map(c => c.id);
    const questionCategoryIds = new Set(questions.map(q => q.categoryId));

    categoryIds.forEach(catId => {
      expect(questionCategoryIds.has(catId)).toBe(true);
    });
  });

  it('should have valid sign categories', () => {
    const validCategories = ['regulatory', 'warning', 'guide', 'construction'];
    signs.forEach(sign => {
      expect(validCategories).toContain(sign.category);
    });
  });
});
