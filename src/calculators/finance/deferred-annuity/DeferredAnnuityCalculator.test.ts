import { describe, it, expect } from 'vitest';
import { DeferredAnnuityCalculator } from './DeferredAnnuityCalculator';
import { calculateDeferredAnnuity } from './formulas';
import { validateDeferredAnnuityInputs } from './validation';

describe('DeferredAnnuityCalculator', () => {
  const testInputs = {
    initialInvestment: 100000,
    monthlyContribution: 500,
    annualContribution: 6000,
    currentAccountValue: 50000,
    currentAge: 45,
    retirementAge: 65,
    annuityStartAge: 65,
    lifeExpectancy: 90,
    expectedReturnRate: 0.06,
    riskTolerance: 'moderate' as const,
    investmentType: 'fixed' as const,
    annuityType: 'deferred' as const,
    payoutType: 'lifetime' as const,
    payoutFrequency: 'monthly' as const,
    taxBracket: 0.24,
    accountType: 'traditional' as const,
    stateTaxRate: 0.05,
    annualFees: 200,
    expenseRatio: 0.015,
    surrenderCharges: 0.07,
    inflationRate: 0.025,
    annuityGrowthRate: 0.04,
    analysisPeriod: 30,
    includeSocialSecurity: true,
    socialSecurityBenefit: 20000,
    currency: 'USD' as const
  };

  describe('Calculator Structure', () => {
    it('should have correct calculator properties', () => {
      expect(DeferredAnnuityCalculator.id).toBe('DeferredAnnuityCalculator');
      expect(DeferredAnnuityCalculator.title).toBe('Deferred Annuity Calculator');
      expect(DeferredAnnuityCalculator.category).toBe('finance');
      expect(DeferredAnnuityCalculator.subcategory).toBe('Retirement');
      expect(DeferredAnnuityCalculator.description).toBeTruthy();
      expect(DeferredAnnuityCalculator.inputs).toBeInstanceOf(Array);
      expect(DeferredAnnuityCalculator.outputs).toBeInstanceOf(Array);
    });

    it('should have required input fields', () => {
      const inputIds = DeferredAnnuityCalculator.inputs.map(input => input.id);
      expect(inputIds).toContain('initialInvestment');
      expect(inputIds).toContain('currentAge');
      expect(inputIds).toContain('expectedReturnRate');
    });

    it('should have required output fields', () => {
      const outputIds = DeferredAnnuityCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('projectedValue');
      expect(outputIds).toContain('monthlyIncome');
      expect(outputIds).toContain('analysis');
    });
  });

  describe('Formulas', () => {
    it('should calculate projected value', () => {
      const result = calculateDeferredAnnuity(testInputs);
      expect(result.projectedValue).toBeGreaterThan(0);
      expect(typeof result.projectedValue).toBe('number');
    });

    it('should calculate monthly income', () => {
      const result = calculateDeferredAnnuity(testInputs);
      expect(typeof result.monthlyIncome).toBe('number');
    });

    it('should calculate total tax savings', () => {
      const result = calculateDeferredAnnuity(testInputs);
      expect(typeof result.totalTaxSavings).toBe('number');
    });

    it('should calculate net benefit', () => {
      const result = calculateDeferredAnnuity(testInputs);
      expect(typeof result.netBenefit).toBe('number');
    });

    it('should provide account metrics', () => {
      const result = calculateDeferredAnnuity(testInputs);
      expect(result.metrics).toBeDefined();
      expect(result.metrics.totalContributions).toBeDefined();
      expect(result.metrics.projectedAccountValue).toBeDefined();
    });
  });

  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const validation = validateDeferredAnnuityInputs(testInputs);
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should reject invalid current age', () => {
      const invalidInputs = { ...testInputs, currentAge: 15 };
      const validation = validateDeferredAnnuityInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Current age must be between 18 and 80');
    });

    it('should reject invalid retirement age', () => {
      const invalidInputs = { ...testInputs, retirementAge: 40 };
      const validation = validateDeferredAnnuityInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Retirement age must be greater than current age and less than 100');
    });

    it('should reject invalid expected return rate', () => {
      const invalidInputs = { ...testInputs, expectedReturnRate: 0.25 };
      const validation = validateDeferredAnnuityInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Expected return rate must be between -10% and 20%');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero initial investment', () => {
      const edgeCaseInputs = { ...testInputs, initialInvestment: 0 };
      const result = calculateDeferredAnnuity(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.projectedValue).toBeGreaterThan(0);
    });

    it('should handle high expense ratio', () => {
      const edgeCaseInputs = { ...testInputs, expenseRatio: 0.05 };
      const result = calculateDeferredAnnuity(edgeCaseInputs);
      expect(result).toBeDefined();
    });

    it('should handle conservative risk tolerance', () => {
      const edgeCaseInputs = { ...testInputs, riskTolerance: 'conservative' as const, expectedReturnRate: 0.03 };
      const result = calculateDeferredAnnuity(edgeCaseInputs);
      expect(result).toBeDefined();
    });

    it('should handle aggressive risk tolerance', () => {
      const edgeCaseInputs = { ...testInputs, riskTolerance: 'aggressive' as const, expectedReturnRate: 0.10 };
      const result = calculateDeferredAnnuity(edgeCaseInputs);
      expect(result).toBeDefined();
    });

    it('should handle Roth account type', () => {
      const edgeCaseInputs = { ...testInputs, accountType: 'roth' as const };
      const result = calculateDeferredAnnuity(edgeCaseInputs);
      expect(result).toBeDefined();
    });

    it('should handle variable annuity type', () => {
      const edgeCaseInputs = { ...testInputs, annuityType: 'variable' as const, investmentType: 'variable' as const };
      const result = calculateDeferredAnnuity(edgeCaseInputs);
      expect(result).toBeDefined();
    });
  });

  describe('Analysis', () => {
    it('should provide annuity rating assessment', () => {
      const result = calculateDeferredAnnuity(testInputs);
      expect(result.analysis).toBeDefined();
      expect(result.analysis.annuityRating).toBeDefined();
      expect(result.analysis.recommendation).toBeDefined();
    });

    it('should provide investment recommendations', () => {
      const result = calculateDeferredAnnuity(testInputs);
      expect(result.analysis.investmentRecommendations).toBeInstanceOf(Array);
      expect(result.analysis.investmentRecommendations.length).toBeGreaterThan(0);
    });

    it('should provide tax strategy', () => {
      const result = calculateDeferredAnnuity(testInputs);
      expect(result.analysis.taxStrategy).toBeDefined();
    });

    it('should provide next steps', () => {
      const result = calculateDeferredAnnuity(testInputs);
      expect(result.analysis.nextSteps).toBeInstanceOf(Array);
      expect(result.analysis.nextSteps.length).toBeGreaterThan(0);
    });
  });

  describe('Examples', () => {
    it('should have valid examples', () => {
      expect(DeferredAnnuityCalculator.examples).toBeInstanceOf(Array);
      expect(DeferredAnnuityCalculator.examples.length).toBeGreaterThan(0);

      DeferredAnnuityCalculator.examples.forEach(example => {
        expect(example.title).toBeTruthy();
        expect(example.description).toBeTruthy();
        expect(example.inputs).toBeDefined();
        expect(example.expectedOutputs).toBeDefined();
      });
    });

    it('should calculate examples correctly', () => {
      DeferredAnnuityCalculator.examples.forEach(example => {
        const result = calculateDeferredAnnuity(example.inputs as any);
        expect(result).toBeDefined();
        expect(result.projectedValue).toBeDefined();
      });
    });
  });

  describe('Usage Instructions', () => {
    it('should have comprehensive usage instructions', () => {
      expect(DeferredAnnuityCalculator.usageInstructions).toBeInstanceOf(Array);
      expect(DeferredAnnuityCalculator.usageInstructions.length).toBeGreaterThan(0);

      DeferredAnnuityCalculator.usageInstructions.forEach(instruction => {
        expect(typeof instruction).toBe('string');
        expect(instruction.length).toBeGreaterThan(0);
      });
    });
  });
});