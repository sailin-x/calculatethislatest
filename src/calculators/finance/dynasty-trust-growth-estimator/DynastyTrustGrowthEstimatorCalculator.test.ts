import { describe, it, expect } from 'vitest';
import { DynastyTrustGrowthEstimatorCalculator } from './DynastyTrustGrowthEstimatorCalculator';
import { calculateDynastyTrustGrowthEstimator } from './formulas';
import { validateDynastyTrustGrowthEstimatorInputs } from './validation';

describe('DynastyTrustGrowthEstimatorCalculator', () => {
  const testInputs = {
    initialTrustValue: 10000000,
    trustType: 'non_grantor' as const,
    stateOfCreation: 'Delaware',
    trustDuration: 100,
    expectedAnnualReturn: 0.06,
    inflationRate: 0.025,
    annualContributions: 50000,
    contributionGrowthRate: 0.03,
    generationSkippingTaxRate: 0.4,
    estateTaxRate: 0.4,
    incomeTaxRate: 0.37,
    gstExemptionAmount: 12900000,
    numberOfGenerations: 4,
    generationInterval: 25,
    beneficiaryLifeExpectancy: 85,
    annualAdministrativeFees: 5000,
    investmentManagementFees: 15000,
    trusteeFees: 8000,
    distributionStrategy: 'discretionary' as const,
    annualDistributionRate: 0.03,
    minimumDistributionAmount: 10000,
    marketVolatility: 0.15,
    longevityRisk: 0.1,
    regulatoryRisk: 0.05,
    analysisHorizon: 100,
    discountRate: 0.04,
    currency: 'USD' as const
  };

  describe('Calculator Structure', () => {
    it('should have correct calculator properties', () => {
      expect(DynastyTrustGrowthEstimatorCalculator.id).toBe('DynastyTrustGrowth-estimator');
      expect(DynastyTrustGrowthEstimatorCalculator.title).toBe('Dynasty Trust Growth Estimator');
      expect(DynastyTrustGrowthEstimatorCalculator.category).toBe('finance');
      expect(DynastyTrustGrowthEstimatorCalculator.subcategory).toBe('Retirement');
      expect(DynastyTrustGrowthEstimatorCalculator.description).toBeTruthy();
      expect(DynastyTrustGrowthEstimatorCalculator.inputs).toBeInstanceOf(Array);
      expect(DynastyTrustGrowthEstimatorCalculator.outputs).toBeInstanceOf(Array);
    });

    it('should have required input fields', () => {
      const inputIds = DynastyTrustGrowthEstimatorCalculator.inputs.map(input => input.id);
      expect(inputIds).toContain('initialTrustValue');
      expect(inputIds).toContain('expectedAnnualReturn');
      expect(inputIds).toContain('numberOfGenerations');
    });

    it('should have required output fields', () => {
      const outputIds = DynastyTrustGrowthEstimatorCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('finalTrustValue');
      expect(outputIds).toContain('totalTaxesPaid');
      expect(outputIds).toContain('trustEfficiency');
    });
  });

  describe('Formulas', () => {
    it('should calculate final trust value', () => {
      const result = calculateDynastyTrustGrowthEstimator(testInputs);
      expect(result.finalTrustValue).toBeGreaterThan(0);
      expect(typeof result.finalTrustValue).toBe('number');
    });

    it('should calculate total taxes paid', () => {
      const result = calculateDynastyTrustGrowthEstimator(testInputs);
      expect(result.totalTaxesPaid).toBeGreaterThan(0);
      expect(typeof result.totalTaxesPaid).toBe('number');
    });

    it('should calculate trust efficiency', () => {
      const result = calculateDynastyTrustGrowthEstimator(testInputs);
      expect(result.trustEfficiency).toBeGreaterThan(0);
      expect(result.trustEfficiency).toBeLessThanOrEqual(1);
    });

    it('should provide comprehensive metrics', () => {
      const result = calculateDynastyTrustGrowthEstimator(testInputs);
      expect(result.metrics).toBeDefined();
      expect(result.metrics.projectedValue).toBeDefined();
      expect(result.metrics.totalGSTPaid).toBeDefined();
    });

    it('should provide detailed analysis', () => {
      const result = calculateDynastyTrustGrowthEstimator(testInputs);
      expect(result.analysis).toBeDefined();
      expect(result.analysis.trustRating).toBeDefined();
      expect(result.analysis.recommendation).toBeDefined();
    });
  });

  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const validation = validateDynastyTrustGrowthEstimatorInputs(testInputs);
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should reject invalid initial trust value', () => {
      const invalidInputs = { ...testInputs, initialTrustValue: -1000 };
      const validation = validateDynastyTrustGrowthEstimatorInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Initial trust value must be greater than 0');
    });

    it('should reject invalid expected return rate', () => {
      const invalidInputs = { ...testInputs, expectedAnnualReturn: -0.5 };
      const validation = validateDynastyTrustGrowthEstimatorInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Expected annual return must be between -10% and 20%');
    });

    it('should reject invalid number of generations', () => {
      const invalidInputs = { ...testInputs, numberOfGenerations: 15 };
      const validation = validateDynastyTrustGrowthEstimatorInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Number of generations must be between 1 and 10');
    });
  });

  describe('Edge Cases', () => {
    it('should handle high GST tax rate', () => {
      const edgeCaseInputs = { ...testInputs, generationSkippingTaxRate: 0.45 };
      const result = calculateDynastyTrustGrowthEstimator(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.totalTaxesPaid).toBeGreaterThan(0);
    });

    it('should handle low expected return', () => {
      const edgeCaseInputs = { ...testInputs, expectedAnnualReturn: 0.02 };
      const result = calculateDynastyTrustGrowthEstimator(edgeCaseInputs);
      expect(result).toBeDefined();
    });

    it('should handle high inflation', () => {
      const edgeCaseInputs = { ...testInputs, inflationRate: 0.08 };
      const result = calculateDynastyTrustGrowthEstimator(edgeCaseInputs);
      expect(result).toBeDefined();
    });

    it('should handle long analysis horizon', () => {
      const edgeCaseInputs = { ...testInputs, analysisHorizon: 150 };
      const result = calculateDynastyTrustGrowthEstimator(edgeCaseInputs);
      expect(result).toBeDefined();
    });

    it('should handle high distribution rate', () => {
      const edgeCaseInputs = { ...testInputs, annualDistributionRate: 0.08 };
      const result = calculateDynastyTrustGrowthEstimator(edgeCaseInputs);
      expect(result).toBeDefined();
    });
  });

  describe('Multi-Generational Analysis', () => {
    it('should calculate generational value progression', () => {
      const result = calculateDynastyTrustGrowthEstimator(testInputs);
      expect(result.metrics.valuePerGeneration).toBeInstanceOf(Array);
      expect(result.metrics.valuePerGeneration.length).toBe(testInputs.numberOfGenerations);
    });

    it('should calculate GST utilization', () => {
      const result = calculateDynastyTrustGrowthEstimator(testInputs);
      expect(result.metrics.gstUtilization).toBeDefined();
      expect(typeof result.metrics.gstUtilization).toBe('number');
    });

    it('should assess trust efficiency', () => {
      const result = calculateDynastyTrustGrowthEstimator(testInputs);
      expect(result.trustEfficiency).toBeDefined();
      expect(result.trustEfficiency).toBeGreaterThan(0);
    });
  });

  describe('Risk Analysis', () => {
    it('should calculate volatility-adjusted value', () => {
      const result = calculateDynastyTrustGrowthEstimator(testInputs);
      expect(result.metrics.volatilityAdjustedValue).toBeDefined();
      expect(result.metrics.volatilityAdjustedValue).toBeLessThan(result.finalTrustValue);
    });

    it('should provide worst case scenario', () => {
      const result = calculateDynastyTrustGrowthEstimator(testInputs);
      expect(result.metrics.worstCaseScenario).toBeDefined();
      expect(result.metrics.worstCaseScenario).toBeLessThan(result.finalTrustValue);
    });

    it('should provide best case scenario', () => {
      const result = calculateDynastyTrustGrowthEstimator(testInputs);
      expect(result.metrics.bestCaseScenario).toBeDefined();
      expect(result.metrics.bestCaseScenario).toBeGreaterThan(result.finalTrustValue);
    });
  });

  describe('Examples', () => {
    it('should have valid examples', () => {
      expect(DynastyTrustGrowthEstimatorCalculator.examples).toBeInstanceOf(Array);
      expect(DynastyTrustGrowthEstimatorCalculator.examples.length).toBeGreaterThan(0);

      DynastyTrustGrowthEstimatorCalculator.examples.forEach(example => {
        expect(example.title).toBeTruthy();
        expect(example.description).toBeTruthy();
        expect(example.inputs).toBeDefined();
        expect(example.expectedOutputs).toBeDefined();
      });
    });

    it('should calculate examples correctly', () => {
      DynastyTrustGrowthEstimatorCalculator.examples.forEach(example => {
        const result = calculateDynastyTrustGrowthEstimator(example.inputs as any);
        expect(result).toBeDefined();
        expect(result.finalTrustValue).toBeDefined();
      });
    });
  });

  describe('Usage Instructions', () => {
    it('should have comprehensive usage instructions', () => {
      expect(DynastyTrustGrowthEstimatorCalculator.usageInstructions).toBeInstanceOf(Array);
      expect(DynastyTrustGrowthEstimatorCalculator.usageInstructions.length).toBeGreaterThan(0);

      DynastyTrustGrowthEstimatorCalculator.usageInstructions.forEach(instruction => {
        expect(typeof instruction).toBe('string');
        expect(instruction.length).toBeGreaterThan(0);
      });
    });
  });
});