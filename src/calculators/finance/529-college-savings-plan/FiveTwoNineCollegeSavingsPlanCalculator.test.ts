import { describe, it, expect } from 'vitest';
import { FiveTwoNineCollegeSavingsPlanCalculator } from './FiveTwoNineCollegeSavingsPlanCalculator';
import { calculateFiveTwoNine } from './formulas';
import { validateFiveTwoNineInputs } from './validation';

describe('FiveTwoNineCollegeSavingsPlanCalculator', () => {
  const testInputs = {
    currentAge: 35,
    childAge: 5,
    collegeStartAge: 18,
    yearsUntilCollege: 13,
    currentBalance: 10000,
    monthlyContribution: 200,
    annualContribution: 2400,
    contributionFrequency: 'monthly' as const,
    expectedAnnualReturn: 7,
    inflationRate: 2.5,
    investmentStrategy: 'moderate' as const,
    currentAnnualCost: 25000,
    costIncreaseRate: 5,
    yearsOfCollege: 4,
    collegeType: 'public_in_state' as const,
    stateTaxRate: 6,
    federalTaxRate: 22,
    includeStateTaxBenefits: true,
    includeFederalTaxBenefits: true,
    taxAdvantaged: true,
    expectedAidPercentage: 30,
    scholarshipAmount: 5000,
    workStudyAmount: 2000,
    analysisPeriod: 13,
    accountFees: 50,
    managementFees: 0.5,
    currency: 'USD' as const
  };

  describe('Calculator Structure', () => {
    it('should have correct calculator properties', () => {
      expect(FiveTwoNineCollegeSavingsPlanCalculator.id).toBe('529-college-savings-plan-calculator');
      expect(FiveTwoNineCollegeSavingsPlanCalculator.title).toBe('529 College Savings Plan Calculator');
      expect(FiveTwoNineCollegeSavingsPlanCalculator.category).toBe('finance');
      expect(FiveTwoNineCollegeSavingsPlanCalculator.subcategory).toBe('Education');
      expect(FiveTwoNineCollegeSavingsPlanCalculator.description).toBeTruthy();
      expect(FiveTwoNineCollegeSavingsPlanCalculator.inputs).toBeInstanceOf(Array);
      expect(FiveTwoNineCollegeSavingsPlanCalculator.outputs).toBeInstanceOf(Array);
    });

    it('should have required input fields', () => {
      const inputIds = FiveTwoNineCollegeSavingsPlanCalculator.inputs.map(input => input.id);
      expect(inputIds).toContain('currentAge');
      expect(inputIds).toContain('childAge');
      expect(inputIds).toContain('currentAnnualCost');
      expect(inputIds).toContain('expectedAnnualReturn');
    });

    it('should have required output fields', () => {
      const outputIds = FiveTwoNineCollegeSavingsPlanCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('projectedBalance');
      expect(outputIds).toContain('futureCollegeCost');
      expect(outputIds).toContain('fundingGap');
      expect(outputIds).toContain('totalTaxSavings');
      expect(outputIds).toContain('fundingRatio');
    });
  });

  describe('Formulas', () => {
    it('should calculate projected balance correctly', () => {
      const result = calculateFiveTwoNine(testInputs);
      expect(result.projectedBalance).toBeGreaterThan(testInputs.currentBalance);
      expect(typeof result.projectedBalance).toBe('number');
    });

    it('should calculate future college cost', () => {
      const result = calculateFiveTwoNine(testInputs);
      expect(result.futureCollegeCost).toBeGreaterThan(testInputs.currentAnnualCost * testInputs.yearsOfCollege);
      expect(typeof result.futureCollegeCost).toBe('number');
    });

    it('should calculate funding gap', () => {
      const result = calculateFiveTwoNine(testInputs);
      expect(typeof result.fundingGap).toBe('number');
    });

    it('should calculate total tax savings', () => {
      const result = calculateFiveTwoNine(testInputs);
      expect(result.totalTaxSavings).toBeGreaterThanOrEqual(0);
      expect(typeof result.totalTaxSavings).toBe('number');
    });

    it('should calculate funding ratio', () => {
      const result = calculateFiveTwoNine(testInputs);
      expect(result.fundingRatio).toBeGreaterThanOrEqual(0);
      expect(result.fundingRatio).toBeLessThanOrEqual(200);
    });

    it('should calculate total contributions', () => {
      const result = calculateFiveTwoNine(testInputs);
      expect(result.totalContributions).toBeGreaterThan(0);
      expect(typeof result.totalContributions).toBe('number');
    });
  });

  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const validation = validateFiveTwoNineInputs(testInputs);
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should reject invalid current age', () => {
      const invalidInputs = { ...testInputs, currentAge: 15 };
      const validation = validateFiveTwoNineInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Current age must be between 18 and 100');
    });

    it('should reject invalid child age', () => {
      const invalidInputs = { ...testInputs, childAge: -1 };
      const validation = validateFiveTwoNineInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Child age must be between 0 and 25');
    });

    it('should reject college start age before child age', () => {
      const invalidInputs = { ...testInputs, collegeStartAge: 3 };
      const validation = validateFiveTwoNineInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('College start age must be greater than child age');
    });

    it('should reject negative current balance', () => {
      const invalidInputs = { ...testInputs, currentBalance: -1000 };
      const validation = validateFiveTwoNineInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Current balance cannot be negative');
    });

    it('should reject invalid expected return', () => {
      const invalidInputs = { ...testInputs, expectedAnnualReturn: 25 };
      const validation = validateFiveTwoNineInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Expected annual return must be between 0 and 20 percent');
    });

    it('should reject zero current annual cost', () => {
      const invalidInputs = { ...testInputs, currentAnnualCost: 0 };
      const validation = validateFiveTwoNineInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Current annual cost must be greater than 0');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero current balance', () => {
      const edgeCaseInputs = { ...testInputs, currentBalance: 0 };
      const result = calculateFiveTwoNine(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.projectedBalance).toBeGreaterThan(0);
    });

    it('should handle high contribution amounts', () => {
      const edgeCaseInputs = { ...testInputs, monthlyContribution: 1000 };
      const result = calculateFiveTwoNine(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.totalContributions).toBeGreaterThan(0);
    });

    it('should handle no financial aid', () => {
      const edgeCaseInputs = { ...testInputs, expectedAidPercentage: 0, scholarshipAmount: 0, workStudyAmount: 0 };
      const result = calculateFiveTwoNine(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.fundingGap).toBeGreaterThan(0);
    });

    it('should handle high expected return', () => {
      const edgeCaseInputs = { ...testInputs, expectedAnnualReturn: 12 };
      const result = calculateFiveTwoNine(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.projectedBalance).toBeGreaterThan(testInputs.currentBalance);
    });

    it('should handle low expected return', () => {
      const edgeCaseInputs = { ...testInputs, expectedAnnualReturn: 3 };
      const result = calculateFiveTwoNine(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.projectedBalance).toBeGreaterThan(testInputs.currentBalance);
    });
  });

  describe('Analysis', () => {
    it('should provide college readiness assessment', () => {
      const result = calculateFiveTwoNine(testInputs);
      expect(result.analysis).toBeDefined();
      expect(result.analysis.collegeReadiness).toBeDefined();
      expect(result.analysis.riskLevel).toBeDefined();
      expect(result.analysis.recommendation).toBeDefined();
    });

    it('should provide contribution analysis', () => {
      const result = calculateFiveTwoNine(testInputs);
      expect(result.analysis.contributionSummary).toBeDefined();
      expect(result.analysis.savingsEfficiency).toBeDefined();
    });

    it('should provide tax analysis', () => {
      const result = calculateFiveTwoNine(testInputs);
      expect(result.analysis.taxEfficiencySummary).toBeDefined();
      expect(result.analysis.stateBenefitAnalysis).toBeDefined();
      expect(result.analysis.federalBenefitAnalysis).toBeDefined();
    });

    it('should provide recommendations', () => {
      const result = calculateFiveTwoNine(testInputs);
      expect(result.analysis.contributionRecommendations).toBeInstanceOf(Array);
      expect(result.analysis.investmentRecommendations).toBeInstanceOf(Array);
      expect(result.analysis.immediateActions).toBeInstanceOf(Array);
    });
  });

  describe('Scenarios', () => {
    it('should provide scenario projections', () => {
      const result = calculateFiveTwoNine(testInputs);
      expect(result.conservativeProjection).toBeDefined();
      expect(result.moderateProjection).toBeDefined();
      expect(result.aggressiveProjection).toBeDefined();
      expect(result.conservativeProjection).toBeLessThan(result.aggressiveProjection);
    });

    it('should handle different college start ages', () => {
      const earlyCollegeInputs = { ...testInputs, collegeStartAge: 17, yearsUntilCollege: 12 };
      const lateCollegeInputs = { ...testInputs, collegeStartAge: 20, yearsUntilCollege: 15 };

      const earlyResult = calculateFiveTwoNine(earlyCollegeInputs);
      const lateResult = calculateFiveTwoNine(lateCollegeInputs);

      expect(earlyResult.projectedBalance).toBeLessThan(lateResult.projectedBalance);
    });
  });
});