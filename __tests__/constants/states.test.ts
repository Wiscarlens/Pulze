/**
 * Tests for states constants
 */

import { US_STATES, getStateByCode } from '../../src/constants/states';

describe('States Constants', () => {
  describe('US_STATES array', () => {
    it('should have all 50 states plus DC', () => {
      expect(US_STATES).toHaveLength(51);
    });

    it('should have all required fields for each state', () => {
      US_STATES.forEach(state => {
        expect(state).toHaveProperty('code');
        expect(state).toHaveProperty('name');
        expect(state).toHaveProperty('passingScore');
        expect(state).toHaveProperty('questionCount');
        expect(state).toHaveProperty('timeLimit');
      });
    });

    it('should have unique state codes', () => {
      const codes = US_STATES.map(s => s.code);
      const uniqueCodes = new Set(codes);
      expect(uniqueCodes.size).toBe(codes.length);
    });

    it('should have 2-letter state codes', () => {
      US_STATES.forEach(state => {
        expect(state.code).toHaveLength(2);
        expect(state.code).toMatch(/^[A-Z]{2}$/);
      });
    });

    it('should have valid passing scores (between 70-90%)', () => {
      US_STATES.forEach(state => {
        expect(state.passingScore).toBeGreaterThanOrEqual(70);
        expect(state.passingScore).toBeLessThanOrEqual(90);
      });
    });

    it('should have valid question counts (between 18-50)', () => {
      US_STATES.forEach(state => {
        expect(state.questionCount).toBeGreaterThanOrEqual(18);
        expect(state.questionCount).toBeLessThanOrEqual(60);
      });
    });

    it('should have valid time limits (between 30-60 minutes)', () => {
      US_STATES.forEach(state => {
        expect(state.timeLimit).toBeGreaterThanOrEqual(30);
        expect(state.timeLimit).toBeLessThanOrEqual(60);
      });
    });
  });

  describe('getStateByCode', () => {
    it('should return state info for valid code', () => {
      const california = getStateByCode('CA');
      expect(california).toBeDefined();
      expect(california?.name).toBe('California');
      expect(california?.passingScore).toBe(83);
    });

    it('should return undefined for invalid code', () => {
      const result = getStateByCode('XX');
      expect(result).toBeUndefined();
    });

    it('should be case sensitive', () => {
      const result = getStateByCode('ca');
      expect(result).toBeUndefined();
    });

    it('should find all states correctly', () => {
      const testCases = [
        { code: 'NY', name: 'New York' },
        { code: 'TX', name: 'Texas' },
        { code: 'FL', name: 'Florida' },
        { code: 'DC', name: 'District of Columbia' },
      ];

      testCases.forEach(({ code, name }) => {
        const state = getStateByCode(code);
        expect(state?.name).toBe(name);
      });
    });
  });
});
