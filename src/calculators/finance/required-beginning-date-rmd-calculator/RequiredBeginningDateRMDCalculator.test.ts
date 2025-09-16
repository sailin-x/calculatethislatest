import { describe, it, expect } from 'vitest';
import { requiredBeginningDateRMDCalculator } from './RequiredBeginningDateRMDCalculator';
import { calculateRBDRMD, calculateRBDRMDMetrics, validateRBDRMDInputs } from './formulas';

describe('Required Beginning Date (RBD) for RMDs Calculator', () => {
  describe('calculateRBDRMD', () => {
    it('should calculate RMD for traditional IRA', () => {
      const inputs = {
        birthYear: 1952,
        currentYear: 2024,
        accountBalance: 750000,
        lifeExpectancy: 87,
        accountType: 'traditional_ira' as const,
        beneficiaryType: 'non_spouse' as const,
        includeSpouse: false,
        spouseBirthYear: 1950,
        taxBracket: 28,
        expectedReturn: 6,
        inflationRate: 2.5
      };

      const result = calculateRBDRMD(inputs);

      expect(result.requiredBeginningDate).toBe(2025);
      expect(result.annualRMD).toBeGreaterThan(0);
      expect(result.monthlyRMD).toBeGreaterThan(0);
      expect(result.remainingLifeExpectancy).toBe(23);
      expect(typeof result.rmdStrategy).toBe('string');
    });

    it('should calculate no RMDs for Roth IRA during lifetime', () => {
      const inputs = {
        birthYear: 1960,
        currentYear: 2024,
        accountBalance: 600000,
        lifeExpectancy: 88,
        accountType: 'roth_ira' as const,
        beneficiaryType: 'spouse' as const,
        includeSpouse: true,
        spouseBirthYear: 1962,
        taxBracket: 25,
        expectedReturn: 7,
        inflationRate: 2.5
      };

      const result = calculateRBDRMD(inputs);

      expect(result.requiredBeginningDate).toBe(2033);
      expect(result.annualRMD).toBe(0);
      expect(result.monthlyRMD).toBe(0);
      expect(result.taxOnRMD).toBe(0);
      expect(result.netRMD).toBe(0);
    });
  });

  describe('validateRBDRMDInputs', () => {
    it('should validate valid inputs', () => {
      const inputs = {
        birthYear: 1952,
        currentYear: 2024,
        accountBalance: 750000,
        lifeExpectancy: 87,
        accountType: 'traditional_ira' as const,
        beneficiaryType: 'non_spouse' as const,
        includeSpouse: false,
        spouseBirthYear: 1950,
        taxBracket: 28,
        expectedReturn: 6,
        inflationRate: 2.5
      };

      const errors = validateRBDRMDInputs(inputs);
      expect(errors).toHaveLength(0);
    });

    it('should validate life expectancy greater than current age', () => {
      const inputs = {
        birthYear: 1952,
        currentYear: 2024,
        accountBalance: 750000,
        lifeExpectancy: 70,
        accountType: 'traditional_ira' as const,
        beneficiaryType: 'non_spouse' as const,
        includeSpouse: false,
        spouseBirthYear: 1950,
        taxBracket: 28,
        expectedReturn: 6,
        inflationRate: 2.5
      };

      const errors = validateRBDRMDInputs(inputs);
      expect(errors).toContain('Life expectancy must be greater than current age');
    });
  });

  describe('Calculator Definition', () => {
    it('should have correct calculator properties', () => {
      expect(requiredBeginningDateRMDCalculator.id).toBe('required-beginning-date-rmd-calculator');
      expect(requiredBeginningDateRMDCalculator.title).toBe('Required Beginning Date (RBD) for RMDs Calculator');
      expect(requiredBeginningDateRMDCalculator.category).toBe('finance');
      expect(requiredBeginningDateRMDCalculator.subcategory).toBe('Retirement & Savings');
    });

    it('should have required inputs', () => {
      const requiredInputs = requiredBeginningDateRMDCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(8);
    });

    it('should have expected outputs', () => {
      expect(requiredBeginningDateRMDCalculator.outputs).toHaveLength(9);
      const outputIds = requiredBeginningDateRMDCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('requiredBeginningDate');
      expect(outputIds).toContain('annualRMD');
      expect(outputIds).toContain('rmdStrategy');
    });

    it('should have validation rules', () => {
      expect(requiredBeginningDateRMDCalculator.validationRules).toHaveLength(16);
    });

    it('should have examples', () => {
      expect(requiredBeginningDateRMDCalculator.examples).toHaveLength(2);
    });
  });
});