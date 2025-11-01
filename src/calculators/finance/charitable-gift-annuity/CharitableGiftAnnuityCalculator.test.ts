import { describe, it, expect } from 'vitest';
import { CharitableGiftAnnuityCalculator } from './CharitableGiftAnnuityCalculator';
import { calculateCharitableGiftAnnuity } from './formulas';
import { validateCharitableGiftAnnuityInputs } from './validation';

describe('CharitableGiftAnnuityCalculator', () => {
  const testInputs = {
    donorAge: 65,
    annuityAge: 65,
    lifeExpectancy: 85,
    filingStatus: 'single' as const,
    giftAmount: 100000,
    giftType: 'cash' as const,
    fairMarketValue: 100000,
    costBasis: 100000,
    giftDate: '20240115',
    annuityRate: 5.5,
    paymentFrequency: 'annual' as const,
    annuityType: 'immediate' as const,
    deferralPeriod: 0,
    marginalTaxRate: 32,
    stateTaxRate: 6,
    capitalGainsTaxRate: 15,
    includeStateTaxes: true,
    expectedReturn: 7,
    inflationRate: 2.5,
    discountRate: 5,
    charityType: 'public_charity' as const,
    charityLocation: 'Local Area',
    analysisPeriod: 20,
    survivorBenefit: false,
    survivorAge: 60,
    taxAdvantaged: true,
    currency: 'USD' as const
  };

  describe('Calculator Structure', () => {
    it('should have correct calculator properties', () => {
      expect(CharitableGiftAnnuityCalculator.id).toBe('CharitableGiftAnnuity-calculator');
      expect(CharitableGiftAnnuityCalculator.title).toBe('Charitable Gift Annuity Calculator');
      expect(CharitableGiftAnnuityCalculator.category).toBe('finance');
      expect(CharitableGiftAnnuityCalculator.subcategory).toBe('Retirement');
      expect(CharitableGiftAnnuityCalculator.description).toBeTruthy();
      expect(CharitableGiftAnnuityCalculator.inputs).toBeInstanceOf(Array);
      expect(CharitableGiftAnnuityCalculator.outputs).toBeInstanceOf(Array);
    });

    it('should have required input fields', () => {
      const inputIds = CharitableGiftAnnuityCalculator.inputs.map(input => input.id);
      expect(inputIds).toContain('donorAge');
      expect(inputIds).toContain('giftAmount');
      expect(inputIds).toContain('annuityRate');
      expect(inputIds).toContain('marginalTaxRate');
    });

    it('should have required output fields', () => {
      const outputIds = CharitableGiftAnnuityCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('taxDeduction');
      expect(outputIds).toContain('annualPayment');
      expect(outputIds).toContain('netPresentValue');
      expect(outputIds).toContain('analysis');
    });
  });

  describe('Formulas', () => {
    it('should calculate tax deduction', () => {
      const result = calculateCharitableGiftAnnuity(testInputs);
      expect(result.taxDeduction).toBeGreaterThan(0);
      expect(typeof result.taxDeduction).toBe('number');
    });

    it('should calculate annuity payments', () => {
      const result = calculateCharitableGiftAnnuity(testInputs);
      expect(result.annualPayment).toBeGreaterThan(0);
      expect(typeof result.annualPayment).toBe('number');
    });

    it('should calculate net present value', () => {
      const result = calculateCharitableGiftAnnuity(testInputs);
      expect(typeof result.netPresentValue).toBe('number');
    });

    it('should calculate breakeven period', () => {
      const result = calculateCharitableGiftAnnuity(testInputs);
      expect(result.breakevenPeriod).toBeGreaterThan(0);
      expect(typeof result.breakevenPeriod).toBe('number');
    });

    it('should calculate capital gains tax savings', () => {
      const result = calculateCharitableGiftAnnuity(testInputs);
      expect(result.capitalGainsTaxSavings).toBeGreaterThanOrEqual(0);
      expect(typeof result.capitalGainsTaxSavings).toBe('number');
    });

    it('should calculate internal rate of return', () => {
      const result = calculateCharitableGiftAnnuity(testInputs);
      expect(typeof result.internalRateOfReturn).toBe('number');
    });

    it('should calculate alternative investment value', () => {
      const result = calculateCharitableGiftAnnuity(testInputs);
      expect(result.alternativeInvestmentValue).toBeGreaterThan(testInputs.giftAmount);
      expect(typeof result.alternativeInvestmentValue).toBe('number');
    });
  });

  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const validation = validateCharitableGiftAnnuityInputs(testInputs);
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should reject invalid donor age', () => {
      const invalidInputs = { ...testInputs, donorAge: 15 };
      const validation = validateCharitableGiftAnnuityInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Donor age must be between 18 and 100');
    });

    it('should reject invalid gift amount', () => {
      const invalidInputs = { ...testInputs, giftAmount: 500 };
      const validation = validateCharitableGiftAnnuityInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Gift amount must be greater than 0');
    });

    it('should reject invalid annuity rate', () => {
      const invalidInputs = { ...testInputs, annuityRate: 25 };
      const validation = validateCharitableGiftAnnuityInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Annuity rate must be between 0 and 20 percent');
    });

    it('should reject invalid marginal tax rate', () => {
      const invalidInputs = { ...testInputs, marginalTaxRate: 60 };
      const validation = validateCharitableGiftAnnuityInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Marginal tax rate must be between 0 and 50 percent');
    });

    it('should reject invalid expected return', () => {
      const invalidInputs = { ...testInputs, expectedReturn: 25 };
      const validation = validateCharitableGiftAnnuityInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Expected return must be between -20% and 30%');
    });

    it('should reject invalid analysis period', () => {
      const invalidInputs = { ...testInputs, analysisPeriod: 60 };
      const validation = validateCharitableGiftAnnuityInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Analysis period must be between 1 and 50 years');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero cost basis', () => {
      const edgeCaseInputs = { ...testInputs, costBasis: 0 };
      const result = calculateCharitableGiftAnnuity(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.capitalGainsTaxSavings).toBeGreaterThan(0);
    });

    it('should handle high gift amounts', () => {
      const edgeCaseInputs = { ...testInputs, giftAmount: 1000000 };
      const result = calculateCharitableGiftAnnuity(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.annualPayment).toBeGreaterThan(0);
    });

    it('should handle low annuity rates', () => {
      const edgeCaseInputs = { ...testInputs, annuityRate: 3 };
      const result = calculateCharitableGiftAnnuity(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.annualPayment).toBeLessThan(testInputs.annuityRate * testInputs.giftAmount / 100);
    });

    it('should handle high annuity rates', () => {
      const edgeCaseInputs = { ...testInputs, annuityRate: 8 };
      const result = calculateCharitableGiftAnnuity(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.annualPayment).toBeGreaterThan(0);
    });

    it('should handle short analysis period', () => {
      const edgeCaseInputs = { ...testInputs, analysisPeriod: 5 };
      const result = calculateCharitableGiftAnnuity(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.breakevenPeriod).toBeLessThanOrEqual(5);
    });

    it('should handle long analysis period', () => {
      const edgeCaseInputs = { ...testInputs, analysisPeriod: 35 };
      const result = calculateCharitableGiftAnnuity(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.alternativeInvestmentValue).toBeGreaterThan(testInputs.giftAmount);
    });

    it('should handle deferred annuities', () => {
      const deferredInputs = { ...testInputs, annuityType: 'deferred' as const, deferralPeriod: 5 };
      const result = calculateCharitableGiftAnnuity(deferredInputs);
      expect(result).toBeDefined();
    });
  });

  describe('Analysis', () => {
    it('should provide strategy viability assessment', () => {
      const result = calculateCharitableGiftAnnuity(testInputs);
      expect(result.analysis).toBeDefined();
      expect(result.analysis.strategyViability).toBeDefined();
      expect(result.analysis.taxEfficiency).toBeDefined();
      expect(result.analysis.recommendation).toBeDefined();
    });

    it('should provide tax analysis', () => {
      const result = calculateCharitableGiftAnnuity(testInputs);
      expect(result.analysis.taxDeductionSummary).toBeDefined();
      expect(result.analysis.capitalGainsAnalysis).toBeDefined();
      expect(result.analysis.taxEfficiencyAnalysis).toBeDefined();
    });

    it('should provide implementation steps', () => {
      const result = calculateCharitableGiftAnnuity(testInputs);
      expect(result.analysis.implementationSteps).toBeInstanceOf(Array);
      expect(result.analysis.implementationSteps.length).toBeGreaterThan(0);
    });

    it('should provide recommendations', () => {
      const result = calculateCharitableGiftAnnuity(testInputs);
      expect(result.analysis.contributionRecommendations).toBeInstanceOf(Array);
      expect(result.analysis.annuityRecommendations).toBeInstanceOf(Array);
      expect(result.analysis.taxPlanningRecommendations).toBeInstanceOf(Array);
    });
  });

  describe('Examples', () => {
    it('should have valid examples', () => {
      expect(CharitableGiftAnnuityCalculator.examples).toBeInstanceOf(Array);
      expect(CharitableGiftAnnuityCalculator.examples.length).toBeGreaterThan(0);

      CharitableGiftAnnuityCalculator.examples.forEach(example => {
        expect(example.title).toBeTruthy();
        expect(example.description).toBeTruthy();
        expect(example.inputs).toBeDefined();
        expect(example.expectedOutputs).toBeDefined();
      });
    });

    it('should calculate examples correctly', () => {
      CharitableGiftAnnuityCalculator.examples.forEach(example => {
        const result = calculateCharitableGiftAnnuity(example.inputs as any);
        expect(result).toBeDefined();
        expect(result.taxDeduction).toBeDefined();
        expect(result.annualPayment).toBeDefined();
      });
    });
  });

  describe('Usage Instructions', () => {
    it('should have comprehensive usage instructions', () => {
      expect(CharitableGiftAnnuityCalculator.usageInstructions).toBeInstanceOf(Array);
      expect(CharitableGiftAnnuityCalculator.usageInstructions.length).toBeGreaterThan(0);

      CharitableGiftAnnuityCalculator.usageInstructions.forEach(instruction => {
        expect(typeof instruction).toBe('string');
        expect(instruction.length).toBeGreaterThan(0);
      });
    });
  });
});