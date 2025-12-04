/**
 * Tests for questions data module
 */

import {
  questions,
  getQuestionsByCategory,
  getQuestionsForState,
  getQuestionsForLicenseType,
  getRandomQuestions,
  getQuestionById,
} from '../../src/data/questions';
import { CATEGORIES } from '../../src/constants/categories';

describe('Questions Data', () => {
  describe('questions array', () => {
    it('should have questions loaded', () => {
      expect(questions.length).toBeGreaterThan(0);
    });

    it('should have all required fields in each question', () => {
      questions.forEach(question => {
        expect(question).toHaveProperty('id');
        expect(question).toHaveProperty('text');
        expect(question).toHaveProperty('options');
        expect(question).toHaveProperty('correctIndex');
        expect(question).toHaveProperty('explanation');
        expect(question).toHaveProperty('categoryId');
        expect(question).toHaveProperty('states');
        expect(question).toHaveProperty('licenseTypes');
      });
    });

    it('should have exactly 4 options per question', () => {
      questions.forEach(question => {
        expect(question.options).toHaveLength(4);
      });
    });

    it('should have valid correctIndex (0-3)', () => {
      questions.forEach(question => {
        expect(question.correctIndex).toBeGreaterThanOrEqual(0);
        expect(question.correctIndex).toBeLessThanOrEqual(3);
      });
    });

    it('should have unique IDs', () => {
      const ids = questions.map(q => q.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe('getQuestionsByCategory', () => {
    it('should return questions for a valid category', () => {
      const roadSignQuestions = getQuestionsByCategory('road_signs');
      expect(roadSignQuestions.length).toBeGreaterThan(0);
      roadSignQuestions.forEach(q => {
        expect(q.categoryId).toBe('road_signs');
      });
    });

    it('should return empty array for invalid category', () => {
      const result = getQuestionsByCategory('invalid_category');
      expect(result).toHaveLength(0);
    });

    it('should have questions for all defined categories', () => {
      CATEGORIES.forEach(category => {
        const categoryQuestions = getQuestionsByCategory(category.id);
        expect(categoryQuestions.length).toBeGreaterThan(0);
      });
    });
  });

  describe('getQuestionsForState', () => {
    it('should return all questions for ALL states', () => {
      const caQuestions = getQuestionsForState('CA');
      expect(caQuestions.length).toBeGreaterThan(0);
    });

    it('should include questions marked as ALL', () => {
      const result = getQuestionsForState('NY');
      const allStateQuestions = result.filter(q => q.states.includes('ALL'));
      expect(allStateQuestions.length).toBeGreaterThan(0);
    });
  });

  describe('getQuestionsForLicenseType', () => {
    it('should return questions for car license', () => {
      const carQuestions = getQuestionsForLicenseType('car');
      expect(carQuestions.length).toBeGreaterThan(0);
      carQuestions.forEach(q => {
        expect(q.licenseTypes).toContain('car');
      });
    });

    it('should return questions for motorcycle license', () => {
      const motorcycleQuestions = getQuestionsForLicenseType('motorcycle');
      expect(motorcycleQuestions.length).toBeGreaterThan(0);
    });
  });

  describe('getRandomQuestions', () => {
    it('should return requested number of questions', () => {
      const result = getRandomQuestions(10);
      expect(result).toHaveLength(10);
    });

    it('should not exceed available questions', () => {
      const result = getRandomQuestions(1000);
      expect(result.length).toBeLessThanOrEqual(questions.length);
    });

    it('should return random order', () => {
      const result1 = getRandomQuestions(20);
      const result2 = getRandomQuestions(20);
      // Very unlikely to be exactly the same order
      const sameOrder = result1.every((q, i) => q.id === result2[i]?.id);
      // This could theoretically fail, but probability is extremely low
      expect(sameOrder).toBe(false);
    });

    it('should filter by category when provided', () => {
      const result = getRandomQuestions(5, 'traffic_signals');
      expect(result.length).toBeLessThanOrEqual(5);
      result.forEach(q => {
        expect(q.categoryId).toBe('traffic_signals');
      });
    });
  });

  describe('getQuestionById', () => {
    it('should return question for valid ID', () => {
      const firstQuestion = questions[0];
      const result = getQuestionById(firstQuestion.id);
      expect(result).toEqual(firstQuestion);
    });

    it('should return undefined for invalid ID', () => {
      const result = getQuestionById('invalid_id');
      expect(result).toBeUndefined();
    });
  });
});
