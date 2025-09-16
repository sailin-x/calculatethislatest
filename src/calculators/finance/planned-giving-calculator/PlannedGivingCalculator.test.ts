import { describe, it, expect } from 'vitest';
import { plannedGivingCalculator } from './PlannedGivingCalculator';
import { calculatePlannedGiving, calculatePlannedGivingMetrics, validatePlannedGivingInputs } from './formulas';

describe('Planned Giving Calculator', () => {
  describe('calculatePlannedGiving', () => {
    it('should calculate planned giving for charitable remainder trust', () => {
      const inputs = {
        giftAmount: 500000,
        donorAge: 65,
        lifeExpectancy: 85,
        givingMethod: 'charitable_remainder_trust' as const,
        taxBracket: 35,
        expectedReturn: 7,
        inflationRate: 2.5,
        charitableDeductionRate: 50,
        trustType: 'annuity' as const,
        payoutRate: 5,
        trustTerm: 20,
        includeSpouse: false,
        spouseAge: 62
      };

      const result = calculatePlannedGiving(inputs);

      expect(result.taxSavings).toBeGreaterThan(0);
      expect(result.netCost).toBeLessThan(inputs.giftAmount);
      expect(result.charitableImpact).toBe(inputs.giftAmount);
      expect(result.incomeGenerated).toBeGreaterThan(0);
      expect(result.remainderValue).toBeGreaterThan(0);
      expect(typeof result.optimalGivingStrategy).toBe('string');
    });

    it('should calculate different results for different giving methods', () => {
      const baseInputs = {
        giftAmount: 250000,
        donorAge: 60,
        lifeExpectancy: 80,
        taxBracket: 32,
        expectedReturn: 6,
        inflationRate: 2.5,
        charitableDeductionRate: 45,
        trustType: 'annuity' as const,
        payoutRate: 5,
        trustTerm: 20,
        includeSpouse: false,
        spouseAge: 58
      };

      const outrightResult = calculatePlannedGiving({ ...baseInputs, givingMethod: 'outright' });
      const crtResult = calculatePlannedGiving({ ...baseInputs, givingMethod: 'charitable_remainder_trust' });

      expect(outrightResult.incomeGenerated).toBe(0);
      expect(crtResult.incomeGenerated).toBeGreaterThan(0);
      expect(crtResult.remainderValue).toBeGreaterThan(0);
    });
  });

  describe('validatePlannedGivingInputs', () => {
    it('should validate valid inputs', () => {
      const inputs = {
        giftAmount: 500000,
        donorAge: 65,
        lifeExpectancy: 85,
        givingMethod: 'charitable_remainder_trust' as const,
        taxBracket: 35,
        expectedReturn: 7,
        inflationRate: 2.5,
        charitableDeductionRate: 50,
        trustType: 'annuity' as const,
        payoutRate: 5,
        trustTerm: 20,
        includeSpouse: false,
        spouseAge: 62
      };

      const errors = validatePlannedGivingInputs(inputs);
      expect(errors).toHaveLength(0);
    });

    it('should validate life expectancy greater than donor age', () => {
      const inputs = {
        giftAmount: 500000,
        donorAge: 80,
        lifeExpectancy: 75,
        givingMethod: 'charitable_remainder_trust' as const,
        taxBracket: 35,
        expectedReturn: 7,
        inflationRate: 2.5,
        charitableDeductionRate: 50,
        trustType: 'annuity' as const,
        payoutRate: 5,
        trustTerm: 20,
        includeSpouse: false,
        spouseAge: 62
      };

      const errors = validatePlannedGivingInputs(inputs);
      expect(errors).toContain('Life expectancy must be greater than donor age');
    });
  });

  describe('Calculator Definition', () => {
    it('should have correct calculator properties', () => {
      expect(plannedGivingCalculator.id).toBe('planned-giving-calculator');
      expect(plannedGivingCalculator.title).toBe('Planned Giving Calculator');
      expect(plannedGivingCalculator.category).toBe('finance');
      expect(plannedGivingCalculator.subcategory).toBe('Retirement & Savings');
    });

    it('should have required inputs', () => {
      const requiredInputs = plannedGivingCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(7);
    });

    it('should have expected outputs', () => {
      expect(plannedGivingCalculator.outputs).toHaveLength(9);
      const outputIds = plannedGivingCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('taxSavings');
      expect(outputIds).toContain('charitableImpact');
      expect(outputIds).toContain('optimalGivingStrategy');
    });

    it('should have validation rules', () => {
      expect(plannedGivingCalculator.validationRules).toHaveLength(16);
    });

    it('should have examples', () => {
      expect(plannedGivingCalculator.examples).toHaveLength(2);
    });
  });
});