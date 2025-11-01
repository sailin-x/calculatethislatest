import { describe, it, expect } from 'vitest';
import { CoverdellESACalculator } from './CoverdellESACalculator';
import { calculateCoverdellESA } from './formulas';
import { validateCoverdellESAInputs } from './validation';

describe('CoverdellESACalculator', () => {
  const testInputs = {
    currentBalance: 5000,
    annualContribution: 2000,
    contributionFrequency: 'annually' as const,
    accountAge: 2,
    beneficiaryAge: 8,
    relationshipToOwner: 'parent' as const,
    expectedReturnRate: 0.06,
    riskTolerance: 'moderate' as const,
    taxBracket: 0.22,
    stateTaxRate: 0.05,
    yearsUntilEducation: 10,
    expectedEducationCost: 50000,
    educationDuration: 4,
    useSpouseAccount: false,
    numberOfBeneficiaries: 1,
    analysisPeriod: 18,
    inflationRate: 0.025,
    includeStateTaxBenefits: true,
    currency: 'USD' as const
  };

  describe('Calculator Structure', () => {
    it('should have correct calculator properties', () => {
      expect(CoverdellESACalculator.id).toBe('CoverdellEsaCalculator');
      expect(CoverdellESACalculator.title).toBe('Coverdell ESA Calculator');
      expect(CoverdellESACalculator.category).toBe('finance');
      expect(CoverdellESACalculator.subcategory).toBe('Education');
      expect(CoverdellESACalculator.description).toBeTruthy();
      expect(CoverdellESACalculator.inputs).toBeInstanceOf(Array);
      expect(CoverdellESACalculator.outputs).toBeInstanceOf(Array);
    });

    it('should have required input fields', () => {
      const inputIds = CoverdellESACalculator.inputs.map(input => input.id);
      expect(inputIds).toContain('currentBalance');
      expect(inputIds).toContain('annualContribution');
      expect(inputIds).toContain('expectedEducationCost');
    });

    it('should have required output fields', () => {
      const outputIds = CoverdellESACalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('projectedBalance');
      expect(outputIds).toContain('totalTaxSavings');
      expect(outputIds).toContain('analysis');
    });
  });

  describe('Formulas', () => {
    it('should calculate projected balance', () => {
      const result = calculateCoverdellESA(testInputs);
      expect(result.projectedBalance).toBeGreaterThan(0);
      expect(typeof result.projectedBalance).toBe('number');
    });

    it('should calculate total tax savings', () => {
      const result = calculateCoverdellESA(testInputs);
      expect(typeof result.totalTaxSavings).toBe('number');
    });

    it('should calculate education funding potential', () => {
      const result = calculateCoverdellESA(testInputs);
      expect(typeof result.educationFundingPotential).toBe('number');
    });

    it('should calculate recommended annual contribution', () => {
      const result = calculateCoverdellESA(testInputs);
      expect(typeof result.recommendedAnnualContribution).toBe('number');
    });

    it('should provide account metrics', () => {
      const result = calculateCoverdellESA(testInputs);
      expect(result.metrics).toBeDefined();
      expect(result.metrics.totalContributions).toBeDefined();
      expect(result.metrics.projectedBalance).toBeDefined();
    });
  });

  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const validation = validateCoverdellESAInputs(testInputs);
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should reject invalid beneficiary age', () => {
      const invalidInputs = { ...testInputs, beneficiaryAge: 35 };
      const validation = validateCoverdellESAInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Beneficiary age must be between 0 and 30');
    });

    it('should reject invalid contribution amount', () => {
      const invalidInputs = { ...testInputs, annualContribution: 5000 };
      const validation = validateCoverdellESAInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Annual contribution cannot be negative');
    });

    it('should reject invalid expected return rate', () => {
      const invalidInputs = { ...testInputs, expectedReturnRate: 0.25 };
      const validation = validateCoverdellESAInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Expected return rate must be between -10% and 20%');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero current balance', () => {
      const edgeCaseInputs = { ...testInputs, currentBalance: 0 };
      const result = calculateCoverdellESA(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.projectedBalance).toBeGreaterThan(0);
    });

    it('should handle spouse account contribution limit', () => {
      const edgeCaseInputs = { ...testInputs, useSpouseAccount: true, annualContribution: 4000 };
      const result = calculateCoverdellESA(edgeCaseInputs);
      expect(result).toBeDefined();
    });

    it('should handle high tax bracket', () => {
      const edgeCaseInputs = { ...testInputs, taxBracket: 0.35 };
      const result = calculateCoverdellESA(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.totalTaxSavings).toBeGreaterThan(0);
    });

    it('should handle conservative risk tolerance', () => {
      const edgeCaseInputs = { ...testInputs, riskTolerance: 'conservative' as const, expectedReturnRate: 0.03 };
      const result = calculateCoverdellESA(edgeCaseInputs);
      expect(result).toBeDefined();
    });

    it('should handle aggressive risk tolerance', () => {
      const edgeCaseInputs = { ...testInputs, riskTolerance: 'aggressive' as const, expectedReturnRate: 0.10 };
      const result = calculateCoverdellESA(edgeCaseInputs);
      expect(result).toBeDefined();
    });
  });

  describe('Analysis', () => {
    it('should provide account health assessment', () => {
      const result = calculateCoverdellESA(testInputs);
      expect(result.analysis).toBeDefined();
      expect(result.analysis.accountHealth).toBeDefined();
      expect(result.analysis.recommendation).toBeDefined();
    });

    it('should provide contribution optimization', () => {
      const result = calculateCoverdellESA(testInputs);
      expect(result.analysis.contributionOptimization).toBeInstanceOf(Array);
      expect(result.analysis.contributionOptimization.length).toBeGreaterThan(0);
    });

    it('should provide tax strategy', () => {
      const result = calculateCoverdellESA(testInputs);
      expect(result.analysis.taxStrategy).toBeDefined();
    });

    it('should provide next steps', () => {
      const result = calculateCoverdellESA(testInputs);
      expect(result.analysis.nextSteps).toBeInstanceOf(Array);
      expect(result.analysis.nextSteps.length).toBeGreaterThan(0);
    });
  });

  describe('Examples', () => {
    it('should have valid examples', () => {
      expect(CoverdellESACalculator.examples).toBeInstanceOf(Array);
      expect(CoverdellESACalculator.examples.length).toBeGreaterThan(0);

      CoverdellESACalculator.examples.forEach(example => {
        expect(example.title).toBeTruthy();
        expect(example.description).toBeTruthy();
        expect(example.inputs).toBeDefined();
        expect(example.expectedOutputs).toBeDefined();
      });
    });

    it('should calculate examples correctly', () => {
      CoverdellESACalculator.examples.forEach(example => {
        const result = calculateCoverdellESA(example.inputs as any);
        expect(result).toBeDefined();
        expect(result.projectedBalance).toBeDefined();
      });
    });
  });

  describe('Usage Instructions', () => {
    it('should have comprehensive usage instructions', () => {
      expect(CoverdellESACalculator.usageInstructions).toBeInstanceOf(Array);
      expect(CoverdellESACalculator.usageInstructions.length).toBeGreaterThan(0);

      CoverdellESACalculator.usageInstructions.forEach(instruction => {
        expect(typeof instruction).toBe('string');
        expect(instruction.length).toBeGreaterThan(0);
      });
    });
  });
});