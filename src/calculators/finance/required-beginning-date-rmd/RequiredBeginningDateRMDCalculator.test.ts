import { describe, it, expect } from 'vitest';
import { calculateRequiredBeginningDate } from './formulas';
import { validateRequiredBeginningDateRMDInputs } from './validation';

describe('Required Beginning Date (RBD) for RMDs Calculator', () => {
  describe('RBD Calculations', () => {
    it('calculates RBD for someone born in 1960 (age 72 rule)', () => {
      const inputs = {
        birthYear: 1960,
        accountType: 'traditional_ira' as const
      };
      const result = calculateRequiredBeginningDate(inputs);
      expect(result.requiredBeginningDate).toBe('April 1, 2032');
      expect(result.ageAtRBD).toBe(72);
      expect(result.rbdExplanation).toContain('SECURE Act 2.0');
    });

    it('calculates RBD for someone born in 1945 (age 70½ rule)', () => {
      const inputs = {
        birthYear: 1945,
        accountType: '401k' as const
      };
      const result = calculateRequiredBeginningDate(inputs);
      expect(result.requiredBeginningDate).toBe('April 1, 2016');
      expect(result.ageAtRBD).toBe(70.5);
      expect(result.rbdExplanation).toContain('pre-SECURE Act rules');
    });

    it('handles Roth IRA (no RBD required)', () => {
      const inputs = {
        birthYear: 1970,
        accountType: 'roth_ira' as const
      };
      const result = calculateRequiredBeginningDate(inputs);
      expect(result.requiredBeginningDate).toBe('No RBD - Lifetime distributions not required');
      expect(result.ageAtRBD).toBe(0);
      expect(result.yearsUntilRBD).toBe(0);
    });

    it('applies spouse beneficiary rule when spouse is more than 10 years younger', () => {
      const inputs = {
        birthYear: 1955,
        accountType: 'traditional_ira' as const,
        spouseBirthYear: 1970,
        isSpouseBeneficialOwner: true
      };
      const result = calculateRequiredBeginningDate(inputs);
      // Should use spouse's RBD (1970 + 72 = 2042) instead of owner's (1955 + 72 = 2027)
      expect(result.requiredBeginningDate).toBe('April 1, 2042');
      expect(result.ageAtRBD).toBe(87); // 2042 - 1955
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const inputs = {
        birthYear: 1960,
        accountType: 'traditional_ira' as const
      };
      const result = validateRequiredBeginningDateRMDInputs(inputs);
      expect(result.length).toBe(0);
    });

    it('validates birth year is not in future', () => {
      const futureYear = new Date().getFullYear() + 1;
      const inputs = {
        birthYear: futureYear,
        accountType: 'traditional_ira' as const
      };
      const result = validateRequiredBeginningDateRMDInputs(inputs);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].message).toContain('future');
    });

    it('validates account type is valid', () => {
      const inputs = {
        birthYear: 1960,
        accountType: 'invalid_type' as any
      };
      const result = validateRequiredBeginningDateRMDInputs(inputs);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].message).toContain('valid account type');
    });

    it('validates spouse birth year when provided', () => {
      const inputs = {
        birthYear: 1960,
        accountType: 'traditional_ira' as const,
        spouseBirthYear: 1800
      };
      const result = validateRequiredBeginningDateRMDInputs(inputs);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].message).toContain('1900 or later');
    });
  });

  describe('Edge Cases', () => {
    it('handles very old birth years', () => {
      const inputs = {
        birthYear: 1900,
        accountType: 'traditional_ira' as const
      };
      const result = calculateRequiredBeginningDate(inputs);
      expect(result.requiredBeginningDate).toBe('April 1, 1971');
      expect(result.ageAtRBD).toBe(70.5);
    });

    it('handles recent birth years', () => {
      const currentYear = new Date().getFullYear();
      const inputs = {
        birthYear: currentYear - 20,
        accountType: 'traditional_ira' as const
      };
      const result = calculateRequiredBeginningDate(inputs);
      expect(result.yearsUntilRBD).toBeGreaterThan(50);
    });

    it('handles spouse beneficiary rule edge case', () => {
      const inputs = {
        birthYear: 1950,
        accountType: 'traditional_ira' as const,
        spouseBirthYear: 1961, // Exactly 11 years younger
        isSpouseBeneficialOwner: true
      };
      const result = calculateRequiredBeginningDate(inputs);
      // Should use owner's RBD since spouse is not more than 10 years younger
      expect(result.requiredBeginningDate).toBe('April 1, 2021');
    });
  });
});