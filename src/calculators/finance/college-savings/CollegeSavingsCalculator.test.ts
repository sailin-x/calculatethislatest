import { describe, it, expect } from 'vitest';
import { CollegeSavingsCalculator } from './CollegeSavingsCalculator';
import { calculateCollegeSavings } from './formulas';
import { validateCollegeSavingsInputs } from './validation';

describe('CollegeSavingsCalculator', () => {
  const testInputs = {
    childAge: 5,
    yearsUntilCollege: 13,
    currentSavings: 10000,
    monthlyContribution: 200,
    annualContribution: 2400,
    oneTimeContributions: 5000,
    expectedReturnRate: 0.07,
    inflationRate: 0.025,
    riskTolerance: 'moderate' as const,
    expectedCollegeCost: 50000,
    yearsInCollege: 4,
    costIncreaseRate: 0.03,
    taxBracket: 0.22,
    use529Plan: true,
    useCoverdellESA: false,
    expectedFinancialAid: 15000,
    expectedScholarships: 5000,
    analysisPeriod: 18,
    includeStateTaxBenefits: true,
    currency: 'USD' as const
  };

  describe('Calculator Structure', () => {
    it('should have correct calculator properties', () => {
      expect(CollegeSavingsCalculator.id).toBe('CollegeSavingsCalculator');
      expect(CollegeSavingsCalculator.title).toBe('College Savings Calculator');
      expect(CollegeSavingsCalculator.category).toBe('finance');
      expect(CollegeSavingsCalculator.subcategory).toBe('Education');
      expect(CollegeSavingsCalculator.description).toBeTruthy();
      expect(CollegeSavingsCalculator.inputs).toBeInstanceOf(Array);
      expect(CollegeSavingsCalculator.outputs).toBeInstanceOf(Array);
    });

    it('should have required input fields', () => {
      const inputIds = CollegeSavingsCalculator.inputs.map(input => input.id);
      expect(inputIds).toContain('childAge');
      expect(inputIds).toContain('expectedCollegeCost');
      expect(inputIds).toContain('expectedReturnRate');
    });

    it('should have required output fields', () => {
      const outputIds = CollegeSavingsCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('totalProjectedSavings');
      expect(outputIds).toContain('projectedShortfall');
      expect(outputIds).toContain('analysis');
    });
  });

  describe('Formulas', () => {
    it('should calculate total projected savings', () => {
      const result = calculateCollegeSavings(testInputs);
      expect(result.totalProjectedSavings).toBeGreaterThan(0);
      expect(typeof result.totalProjectedSavings).toBe('number');
    });

    it('should calculate projected shortfall', () => {
      const result = calculateCollegeSavings(testInputs);
      expect(typeof result.projectedShortfall).toBe('number');
    });

    it('should calculate recommended monthly contribution', () => {
      const result = calculateCollegeSavings(testInputs);
      expect(typeof result.recommendedMonthlyContribution).toBe('number');
    });

    it('should calculate years to goal', () => {
      const result = calculateCollegeSavings(testInputs);
      expect(typeof result.yearsToGoal).toBe('number');
    });

    it('should provide savings metrics', () => {
      const result = calculateCollegeSavings(testInputs);
      expect(result.metrics).toBeDefined();
      expect(result.metrics.totalSavingsAtCollege).toBeDefined();
      expect(result.metrics.monthlySavingsNeeded).toBeDefined();
    });
  });

  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const validation = validateCollegeSavingsInputs(testInputs);
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should reject invalid child age', () => {
      const invalidInputs = { ...testInputs, childAge: -1 };
      const validation = validateCollegeSavingsInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Child age must be between 0 and 18');
    });

    it('should reject invalid expected return rate', () => {
      const invalidInputs = { ...testInputs, expectedReturnRate: 0.25 };
      const validation = validateCollegeSavingsInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Expected return rate must be between -10% and 20%');
    });

    it('should reject invalid college cost', () => {
      const invalidInputs = { ...testInputs, expectedCollegeCost: -1000 };
      const validation = validateCollegeSavingsInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Expected college cost must be greater than 0');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero current savings', () => {
      const edgeCaseInputs = { ...testInputs, currentSavings: 0 };
      const result = calculateCollegeSavings(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.totalProjectedSavings).toBeGreaterThan(0);
    });

    it('should handle high return rate', () => {
      const edgeCaseInputs = { ...testInputs, expectedReturnRate: 0.12 };
      const result = calculateCollegeSavings(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.totalProjectedSavings).toBeGreaterThan(testInputs.currentSavings);
    });

    it('should handle low return rate', () => {
      const edgeCaseInputs = { ...testInputs, expectedReturnRate: 0.02 };
      const result = calculateCollegeSavings(edgeCaseInputs);
      expect(result).toBeDefined();
    });

    it('should handle 529 plan benefits', () => {
      const edgeCaseInputs = { ...testInputs, use529Plan: true, taxBracket: 0.35 };
      const result = calculateCollegeSavings(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.metrics.taxSavings).toBeGreaterThan(0);
    });

    it('should handle Coverdell ESA benefits', () => {
      const edgeCaseInputs = { ...testInputs, useCoverdellESA: true, use529Plan: false };
      const result = calculateCollegeSavings(edgeCaseInputs);
      expect(result).toBeDefined();
    });
  });

  describe('Analysis', () => {
    it('should provide savings readiness assessment', () => {
      const result = calculateCollegeSavings(testInputs);
      expect(result.analysis).toBeDefined();
      expect(result.analysis.savingsReadiness).toBeDefined();
      expect(result.analysis.recommendation).toBeDefined();
    });

    it('should provide investment recommendations', () => {
      const result = calculateCollegeSavings(testInputs);
      expect(result.analysis.investmentRecommendations).toBeInstanceOf(Array);
      expect(result.analysis.investmentRecommendations.length).toBeGreaterThan(0);
    });

    it('should provide next steps', () => {
      const result = calculateCollegeSavings(testInputs);
      expect(result.analysis.nextSteps).toBeInstanceOf(Array);
      expect(result.analysis.nextSteps.length).toBeGreaterThan(0);
    });

    it('should provide action timeline', () => {
      const result = calculateCollegeSavings(testInputs);
      expect(result.analysis.immediateActions).toBeInstanceOf(Array);
      expect(result.analysis.immediateActions.length).toBeGreaterThan(0);
    });
  });

  describe('Examples', () => {
    it('should have valid examples', () => {
      expect(CollegeSavingsCalculator.examples).toBeInstanceOf(Array);
      expect(CollegeSavingsCalculator.examples.length).toBeGreaterThan(0);

      CollegeSavingsCalculator.examples.forEach(example => {
        expect(example.title).toBeTruthy();
        expect(example.description).toBeTruthy();
        expect(example.inputs).toBeDefined();
        expect(example.expectedOutputs).toBeDefined();
      });
    });

    it('should calculate examples correctly', () => {
      CollegeSavingsCalculator.examples.forEach(example => {
        const result = calculateCollegeSavings(example.inputs as any);
        expect(result).toBeDefined();
        expect(result.totalProjectedSavings).toBeDefined();
      });
    });
  });

  describe('Usage Instructions', () => {
    it('should have comprehensive usage instructions', () => {
      expect(CollegeSavingsCalculator.usageInstructions).toBeInstanceOf(Array);
      expect(CollegeSavingsCalculator.usageInstructions.length).toBeGreaterThan(0);

      CollegeSavingsCalculator.usageInstructions.forEach(instruction => {
        expect(typeof instruction).toBe('string');
        expect(instruction.length).toBeGreaterThan(0);
      });
    });
  });
});