import { describe, it, expect } from 'vitest';
import { CharitableRemainderTrustCalculator } from './CharitableRemainderTrustCalculator';
import { calculateCharitableRemainderTrust } from './formulas';
import { validateCharitableRemainderTrustInputs } from './validation';

describe('CharitableRemainderTrustCalculator', () => {
  const testInputs = {
    donorAge: 65,
    lifeExpectancy: 85,
    filingStatus: 'single' as const,
    trustType: 'charitable_remainder_annuity_trust' as const,
    trustValue: 1000000,
    payoutRate: 6,
    trustTerm: 20,
    remainderBeneficiary: 'Local University Foundation',
    assetType: 'securities' as const,
    fairMarketValue: 1000000,
    costBasis: 200000,
    unrealizedGains: 800000,
    marginalTaxRate: 32,
    stateTaxRate: 6,
    capitalGainsTaxRate: 15,
    includeStateTaxes: true,
    expectedReturn: 7,
    inflationRate: 2.5,
    discountRate: 5,
    trusteeFees: 0.75,
    administrativeCosts: 2000,
    taxPreparationFees: 1000,
    analysisPeriod: 20,
    survivorBenefit: false,
    survivorAge: 60,
    taxAdvantaged: true,
    currency: 'USD' as const
  };

  describe('Calculator Structure', () => {
    it('should have correct calculator properties', () => {
      expect(CharitableRemainderTrustCalculator.id).toBe('CharitableRemainderTrust-calculator');
      expect(CharitableRemainderTrustCalculator.title).toBe('Charitable Remainder Trust Calculator');
      expect(CharitableRemainderTrustCalculator.category).toBe('finance');
      expect(CharitableRemainderTrustCalculator.subcategory).toBe('Retirement');
      expect(CharitableRemainderTrustCalculator.description).toBeTruthy();
      expect(CharitableRemainderTrustCalculator.inputs).toBeInstanceOf(Array);
      expect(CharitableRemainderTrustCalculator.outputs).toBeInstanceOf(Array);
    });

    it('should have required input fields', () => {
      const inputIds = CharitableRemainderTrustCalculator.inputs.map(input => input.id);
      expect(inputIds).toContain('donorAge');
      expect(inputIds).toContain('trustValue');
      expect(inputIds).toContain('payoutRate');
      expect(inputIds).toContain('marginalTaxRate');
    });

    it('should have required output fields', () => {
      const outputIds = CharitableRemainderTrustCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('taxDeduction');
      expect(outputIds).toContain('annualPayout');
      expect(outputIds).toContain('netPresentValue');
      expect(outputIds).toContain('analysis');
    });
  });

  describe('Formulas', () => {
    it('should calculate tax deduction', () => {
      const result = calculateCharitableRemainderTrust(testInputs);
      expect(result.taxDeduction).toBeGreaterThan(0);
      expect(typeof result.taxDeduction).toBe('number');
    });

    it('should calculate annual payout', () => {
      const result = calculateCharitableRemainderTrust(testInputs);
      expect(result.annualPayout).toBeGreaterThan(0);
      expect(typeof result.annualPayout).toBe('number');
    });

    it('should calculate net present value', () => {
      const result = calculateCharitableRemainderTrust(testInputs);
      expect(typeof result.netPresentValue).toBe('number');
    });

    it('should calculate breakeven period', () => {
      const result = calculateCharitableRemainderTrust(testInputs);
      expect(result.breakevenPeriod).toBeGreaterThan(0);
      expect(typeof result.breakevenPeriod).toBe('number');
    });

    it('should calculate capital gains tax savings', () => {
      const result = calculateCharitableRemainderTrust(testInputs);
      expect(result.capitalGainsTaxSavings).toBeGreaterThan(0);
      expect(typeof result.capitalGainsTaxSavings).toBe('number');
    });

    it('should calculate internal rate of return', () => {
      const result = calculateCharitableRemainderTrust(testInputs);
      expect(typeof result.internalRateOfReturn).toBe('number');
    });

    it('should calculate alternative investment value', () => {
      const result = calculateCharitableRemainderTrust(testInputs);
      expect(result.alternativeInvestmentValue).toBeGreaterThan(testInputs.trustValue);
      expect(typeof result.alternativeInvestmentValue).toBe('number');
    });

    it('should calculate remainder value', () => {
      const result = calculateCharitableRemainderTrust(testInputs);
      expect(result.remainderValue).toBeGreaterThan(0);
      expect(typeof result.remainderValue).toBe('number');
    });

    it('should calculate charity benefit', () => {
      const result = calculateCharitableRemainderTrust(testInputs);
      expect(result.charityBenefit).toBeGreaterThan(0);
      expect(typeof result.charityBenefit).toBe('number');
    });
  });

  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const validation = validateCharitableRemainderTrustInputs(testInputs);
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should reject invalid donor age', () => {
      const invalidInputs = { ...testInputs, donorAge: 15 };
      const validation = validateCharitableRemainderTrustInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Donor age must be between 18 and 100');
    });

    it('should reject invalid trust value', () => {
      const invalidInputs = { ...testInputs, trustValue: 50000 };
      const validation = validateCharitableRemainderTrustInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Trust value must be greater than 0');
    });

    it('should reject invalid payout rate', () => {
      const invalidInputs = { ...testInputs, payoutRate: 60 };
      const validation = validateCharitableRemainderTrustInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Payout rate must be between 0 and 50 percent');
    });

    it('should reject invalid marginal tax rate', () => {
      const invalidInputs = { ...testInputs, marginalTaxRate: 60 };
      const validation = validateCharitableRemainderTrustInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Marginal tax rate must be between 0 and 50 percent');
    });

    it('should reject invalid expected return', () => {
      const invalidInputs = { ...testInputs, expectedReturn: 25 };
      const validation = validateCharitableRemainderTrustInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Expected return must be between -20% and 30%');
    });

    it('should reject invalid analysis period', () => {
      const invalidInputs = { ...testInputs, analysisPeriod: 60 };
      const validation = validateCharitableRemainderTrustInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Analysis period must be between 1 and 50 years');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero cost basis', () => {
      const edgeCaseInputs = { ...testInputs, costBasis: 0 };
      const result = calculateCharitableRemainderTrust(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.capitalGainsTaxSavings).toBeGreaterThan(0);
    });

    it('should handle high trust values', () => {
      const edgeCaseInputs = { ...testInputs, trustValue: 5000000 };
      const result = calculateCharitableRemainderTrust(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.annualPayout).toBeGreaterThan(0);
    });

    it('should handle low payout rates', () => {
      const edgeCaseInputs = { ...testInputs, payoutRate: 3 };
      const result = calculateCharitableRemainderTrust(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.annualPayout).toBeLessThan(testInputs.payoutRate * testInputs.trustValue / 100);
    });

    it('should handle high payout rates', () => {
      const edgeCaseInputs = { ...testInputs, payoutRate: 10 };
      const result = calculateCharitableRemainderTrust(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.annualPayout).toBeGreaterThan(0);
    });

    it('should handle short trust terms', () => {
      const edgeCaseInputs = { ...testInputs, trustTerm: 5 };
      const result = calculateCharitableRemainderTrust(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.remainderValue).toBeGreaterThan(0);
    });

    it('should handle long trust terms', () => {
      const edgeCaseInputs = { ...testInputs, trustTerm: 30 };
      const result = calculateCharitableRemainderTrust(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.remainderValue).toBeLessThan(testInputs.trustValue);
    });

    it('should handle unitrust type', () => {
      const unitrustInputs = { ...testInputs, trustType: 'charitable_remainder_unitrust' as const };
      const result = calculateCharitableRemainderTrust(unitrustInputs);
      expect(result).toBeDefined();
    });
  });

  describe('Analysis', () => {
    it('should provide strategy viability assessment', () => {
      const result = calculateCharitableRemainderTrust(testInputs);
      expect(result.analysis).toBeDefined();
      expect(result.analysis.strategyViability).toBeDefined();
      expect(result.analysis.taxEfficiency).toBeDefined();
      expect(result.analysis.recommendation).toBeDefined();
    });

    it('should provide tax analysis', () => {
      const result = calculateCharitableRemainderTrust(testInputs);
      expect(result.analysis.taxDeductionSummary).toBeDefined();
      expect(result.analysis.capitalGainsAnalysis).toBeDefined();
      expect(result.analysis.taxEfficiencyAnalysis).toBeDefined();
    });

    it('should provide implementation steps', () => {
      const result = calculateCharitableRemainderTrust(testInputs);
      expect(result.analysis.implementationSteps).toBeInstanceOf(Array);
      expect(result.analysis.implementationSteps.length).toBeGreaterThan(0);
    });

    it('should provide recommendations', () => {
      const result = calculateCharitableRemainderTrust(testInputs);
      expect(result.analysis.contributionRecommendations).toBeInstanceOf(Array);
      expect(result.analysis.trustRecommendations).toBeInstanceOf(Array);
      expect(result.analysis.taxPlanningRecommendations).toBeInstanceOf(Array);
    });
  });

  describe('Examples', () => {
    it('should have valid examples', () => {
      expect(CharitableRemainderTrustCalculator.examples).toBeInstanceOf(Array);
      expect(CharitableRemainderTrustCalculator.examples.length).toBeGreaterThan(0);

      CharitableRemainderTrustCalculator.examples.forEach(example => {
        expect(example.title).toBeTruthy();
        expect(example.description).toBeTruthy();
        expect(example.inputs).toBeDefined();
        expect(example.expectedOutputs).toBeDefined();
      });
    });

    it('should calculate examples correctly', () => {
      CharitableRemainderTrustCalculator.examples.forEach(example => {
        const result = calculateCharitableRemainderTrust(example.inputs as any);
        expect(result).toBeDefined();
        expect(result.taxDeduction).toBeDefined();
        expect(result.annualPayout).toBeDefined();
      });
    });
  });

  describe('Usage Instructions', () => {
    it('should have comprehensive usage instructions', () => {
      expect(CharitableRemainderTrustCalculator.usageInstructions).toBeInstanceOf(Array);
      expect(CharitableRemainderTrustCalculator.usageInstructions.length).toBeGreaterThan(0);

      CharitableRemainderTrustCalculator.usageInstructions.forEach(instruction => {
        expect(typeof instruction).toBe('string');
        expect(instruction.length).toBeGreaterThan(0);
      });
    });
  });
});