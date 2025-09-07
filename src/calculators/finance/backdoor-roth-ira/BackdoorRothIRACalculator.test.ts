import { describe, it, expect } from 'vitest';
import { BackdoorRothIRACalculator } from './BackdoorRothIRACalculator';
import { calculateBackdoorRothIRA } from './formulas';
import { validateBackdoorRothIRAInputs } from './validation';

describe('BackdoorRothIRACalculator', () => {
  const testInputs = {
    currentAge: 35,
    filingStatus: 'single' as const,
    modifiedAGILimit: 140000,
    traditionalIRABalance: 50000,
    rothIRABalance: 25000,
    annualContribution: 6000,
    conversionAmount: 25000,
    marginalTaxRate: 32,
    capitalGainsTaxRate: 15,
    stateTaxRate: 6,
    includeStateTaxes: true,
    expectedReturn: 7,
    inflationRate: 2.5,
    conversionFrequency: 'annual' as const,
    recharacterizationStrategy: false,
    fiveYearRule: true,
    analysisPeriod: 25,
    includeRequiredMinimumDistributions: true,
    taxAdvantaged: true,
    conversionFees: 50,
    accountFees: 100,
    currency: 'USD' as const
  };

  describe('Calculator Structure', () => {
    it('should have correct calculator properties', () => {
      expect(BackdoorRothIRACalculator.id).toBe('backdoor-roth-ira-calculator');
      expect(BackdoorRothIRACalculator.title).toBe('Backdoor Roth IRA Calculator');
      expect(BackdoorRothIRACalculator.category).toBe('finance');
      expect(BackdoorRothIRACalculator.subcategory).toBe('Retirement');
      expect(BackdoorRothIRACalculator.description).toBeTruthy();
      expect(BackdoorRothIRACalculator.inputs).toBeInstanceOf(Array);
      expect(BackdoorRothIRACalculator.outputs).toBeInstanceOf(Array);
    });

    it('should have required input fields', () => {
      const inputIds = BackdoorRothIRACalculator.inputs.map(input => input.id);
      expect(inputIds).toContain('currentAge');
      expect(inputIds).toContain('conversionAmount');
      expect(inputIds).toContain('marginalTaxRate');
      expect(inputIds).toContain('expectedReturn');
    });

    it('should have required output fields', () => {
      const outputIds = BackdoorRothIRACalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('totalConverted');
      expect(outputIds).toContain('netBenefit');
      expect(outputIds).toContain('breakevenPeriod');
      expect(outputIds).toContain('analysis');
    });
  });

  describe('Formulas', () => {
    it('should calculate conversion tax impact', () => {
      const result = calculateBackdoorRothIRA(testInputs);
      expect(result.totalTaxesPaid).toBeGreaterThan(0);
      expect(typeof result.totalTaxesPaid).toBe('number');
    });

    it('should calculate future values', () => {
      const result = calculateBackdoorRothIRA(testInputs);
      expect(result.traditionalIRAFutureValue).toBeGreaterThan(testInputs.traditionalIRABalance);
      expect(result.rothIRAFutureValue).toBeGreaterThan(testInputs.rothIRABalance);
    });

    it('should calculate net benefit', () => {
      const result = calculateBackdoorRothIRA(testInputs);
      expect(typeof result.netBenefit).toBe('number');
    });

    it('should calculate breakeven period', () => {
      const result = calculateBackdoorRothIRA(testInputs);
      expect(result.breakevenPeriod).toBeGreaterThan(0);
      expect(typeof result.breakevenPeriod).toBe('number');
    });

    it('should calculate tax savings', () => {
      const result = calculateBackdoorRothIRA(testInputs);
      expect(result.totalTaxSavings).toBeGreaterThanOrEqual(0);
      expect(typeof result.totalTaxSavings).toBe('number');
    });

    it('should calculate internal rate of return', () => {
      const result = calculateBackdoorRothIRA(testInputs);
      expect(typeof result.internalRateOfReturn).toBe('number');
    });
  });

  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const validation = validateBackdoorRothIRAInputs(testInputs);
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should reject invalid current age', () => {
      const invalidInputs = { ...testInputs, currentAge: 15 };
      const validation = validateBackdoorRothIRAInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Current age must be between 18 and 100');
    });

    it('should reject invalid conversion amount', () => {
      const invalidInputs = { ...testInputs, conversionAmount: 500 };
      const validation = validateBackdoorRothIRAInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Conversion amount must be greater than 0');
    });

    it('should reject invalid marginal tax rate', () => {
      const invalidInputs = { ...testInputs, marginalTaxRate: 60 };
      const validation = validateBackdoorRothIRAInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Marginal tax rate must be between 0 and 50 percent');
    });

    it('should reject invalid expected return', () => {
      const invalidInputs = { ...testInputs, expectedReturn: 25 };
      const validation = validateBackdoorRothIRAInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Expected return must be between -20% and 30%');
    });

    it('should reject invalid analysis period', () => {
      const invalidInputs = { ...testInputs, analysisPeriod: 60 };
      const validation = validateBackdoorRothIRAInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Analysis period must be between 1 and 50 years');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero traditional IRA balance', () => {
      const edgeCaseInputs = { ...testInputs, traditionalIRABalance: 0 };
      const result = calculateBackdoorRothIRA(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.traditionalIRAFutureValue).toBeGreaterThan(0);
    });

    it('should handle high conversion amounts', () => {
      const edgeCaseInputs = { ...testInputs, conversionAmount: 100000 };
      const result = calculateBackdoorRothIRA(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.totalTaxesPaid).toBeGreaterThan(0);
    });

    it('should handle low tax rates', () => {
      const edgeCaseInputs = { ...testInputs, marginalTaxRate: 10 };
      const result = calculateBackdoorRothIRA(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.totalTaxesPaid).toBeLessThan(testInputs.marginalTaxRate * testInputs.conversionAmount / 100);
    });

    it('should handle high tax rates', () => {
      const edgeCaseInputs = { ...testInputs, marginalTaxRate: 45 };
      const result = calculateBackdoorRothIRA(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.totalTaxesPaid).toBeGreaterThan(0);
    });

    it('should handle short analysis period', () => {
      const edgeCaseInputs = { ...testInputs, analysisPeriod: 5 };
      const result = calculateBackdoorRothIRA(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.breakevenPeriod).toBeLessThanOrEqual(5);
    });

    it('should handle long analysis period', () => {
      const edgeCaseInputs = { ...testInputs, analysisPeriod: 40 };
      const result = calculateBackdoorRothIRA(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.traditionalIRAFutureValue).toBeGreaterThan(testInputs.traditionalIRABalance);
    });
  });

  describe('Analysis', () => {
    it('should provide strategy viability assessment', () => {
      const result = calculateBackdoorRothIRA(testInputs);
      expect(result.analysis).toBeDefined();
      expect(result.analysis.strategyViability).toBeDefined();
      expect(result.analysis.riskLevel).toBeDefined();
      expect(result.analysis.recommendation).toBeDefined();
    });

    it('should provide tax efficiency analysis', () => {
      const result = calculateBackdoorRothIRA(testInputs);
      expect(result.analysis.taxEfficiencyAnalysis).toBeDefined();
      expect(result.analysis.federalBenefitAnalysis).toBeDefined();
    });

    it('should provide implementation steps', () => {
      const result = calculateBackdoorRothIRA(testInputs);
      expect(result.analysis.implementationSteps).toBeInstanceOf(Array);
      expect(result.analysis.implementationSteps.length).toBeGreaterThan(0);
    });

    it('should provide recommendations', () => {
      const result = calculateBackdoorRothIRA(testInputs);
      expect(result.analysis.contributionRecommendations).toBeInstanceOf(Array);
      expect(result.analysis.conversionRecommendations).toBeInstanceOf(Array);
      expect(result.analysis.taxPlanningRecommendations).toBeInstanceOf(Array);
    });
  });

  describe('Scenarios', () => {
    it('should handle different filing statuses', () => {
      const marriedInputs = { ...testInputs, filingStatus: 'married_filing_jointly' as const };
      const result = calculateBackdoorRothIRA(marriedInputs);
      expect(result).toBeDefined();
    });

    it('should handle different conversion frequencies', () => {
      const quarterlyInputs = { ...testInputs, conversionFrequency: 'quarterly' as const };
      const result = calculateBackdoorRothIRA(quarterlyInputs);
      expect(result).toBeDefined();
    });

    it('should handle recharacterization strategy', () => {
      const recharInputs = { ...testInputs, recharacterizationStrategy: true };
      const result = calculateBackdoorRothIRA(recharInputs);
      expect(result).toBeDefined();
    });

    it('should handle 5-year rule scenarios', () => {
      const fiveYearInputs = { ...testInputs, fiveYearRule: false };
      const result = calculateBackdoorRothIRA(fiveYearInputs);
      expect(result).toBeDefined();
    });
  });

  describe('Examples', () => {
    it('should have valid examples', () => {
      expect(BackdoorRothIRACalculator.examples).toBeInstanceOf(Array);
      expect(BackdoorRothIRACalculator.examples.length).toBeGreaterThan(0);

      BackdoorRothIRACalculator.examples.forEach(example => {
        expect(example.title).toBeTruthy();
        expect(example.description).toBeTruthy();
        expect(example.inputs).toBeDefined();
        expect(example.expectedOutputs).toBeDefined();
      });
    });

    it('should calculate examples correctly', () => {
      BackdoorRothIRACalculator.examples.forEach(example => {
        const result = calculateBackdoorRothIRA(example.inputs as any);
        expect(result).toBeDefined();
