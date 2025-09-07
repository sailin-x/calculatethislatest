import { describe, it, expect } from 'vitest';
import { FourZeroThreeBPlanCalculator } from './FourZeroThreeBPlanCalculator';
import { calculateFourZeroThreeB } from './formulas';
import { validateFourZeroThreeBInputs } from './validation';

describe('FourZeroThreeBPlanCalculator', () => {
  const testInputs = {
    currentAge: 35,
    retirementAge: 65,
    lifeExpectancy: 90,
    currentBalance: 50000,
    yearsOfService: 10,
    annualSalary: 55000,
    employeeContributionPercent: 6,
    employerMatchPercent: 3,
    catchUpContributions: false,
    expectedAnnualReturn: 7,
    inflationRate: 2.5,
    currentTaxRate: 25,
    retirementTaxRate: 20,
    annualContributionLimit: 22000,
    lifetimeContributionLimit: 1000000,
    vestingSchedule: 'graded' as const,
    analysisPeriod: 30,
    includeSocialSecurity: true,
    socialSecurityBenefit: 1800,
    otherRetirementIncome: 8000,
    withdrawalStrategy: 'required_minimum' as const,
    annualWithdrawalAmount: 35000,
    withdrawalPercentage: 4,
    annualFees: 0.5,
    administrativeFees: 50,
    currency: 'USD' as const
  };

  describe('Calculator Structure', () => {
    it('should have correct calculator properties', () => {
      expect(FourZeroThreeBPlanCalculator.id).toBe('403b-plan-calculator');
      expect(FourZeroThreeBPlanCalculator.title).toBe('403(b) Plan Calculator');
      expect(FourZeroThreeBPlanCalculator.category).toBe('finance');
      expect(FourZeroThreeBPlanCalculator.subcategory).toBe('Retirement');
      expect(FourZeroThreeBPlanCalculator.description).toBeTruthy();
      expect(FourZeroThreeBPlanCalculator.inputs).toBeInstanceOf(Array);
      expect(FourZeroThreeBPlanCalculator.outputs).toBeInstanceOf(Array);
    });

    it('should have required input fields', () => {
      const inputIds = FourZeroThreeBPlanCalculator.inputs.map(input => input.id);
      expect(inputIds).toContain('currentAge');
      expect(inputIds).toContain('retirementAge');
      expect(inputIds).toContain('annualSalary');
      expect(inputIds).toContain('employeeContributionPercent');
      expect(inputIds).toContain('expectedAnnualReturn');
    });

    it('should have required output fields', () => {
      const outputIds = FourZeroThreeBPlanCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('projectedBalance');
      expect(outputIds).toContain('monthlyRetirementIncome');
      expect(outputIds).toContain('totalContributions');
      expect(outputIds).toContain('totalTaxSavings');
      expect(outputIds).toContain('replacementRatio');
    });
  });

  describe('Formulas', () => {
    it('should calculate projected balance correctly', () => {
      const result = calculateFourZeroThreeB(testInputs);
      expect(result.projectedBalance).toBeGreaterThan(testInputs.currentBalance);
      expect(typeof result.projectedBalance).toBe('number');
    });

    it('should calculate monthly retirement income', () => {
      const result = calculateFourZeroThreeB(testInputs);
      expect(result.monthlyRetirementIncome).toBeGreaterThan(0);
      expect(typeof result.monthlyRetirementIncome).toBe('number');
    });

    it('should calculate total contributions', () => {
      const result = calculateFourZeroThreeB(testInputs);
      expect(result.totalContributions).toBeGreaterThan(0);
      expect(typeof result.totalContributions).toBe('number');
    });

    it('should calculate tax savings', () => {
      const result = calculateFourZeroThreeB(testInputs);
      expect(result.totalTaxSavings).toBeGreaterThan(0);
      expect(typeof result.totalTaxSavings).toBe('number');
    });

    it('should calculate replacement ratio', () => {
      const result = calculateFourZeroThreeB(testInputs);
      expect(result.replacementRatio).toBeGreaterThan(0);
      expect(result.replacementRatio).toBeLessThanOrEqual(200);
    });

    it('should calculate safe withdrawal rate', () => {
      const result = calculateFourZeroThreeB(testInputs);
      expect(result.safeWithdrawalRate).toBeGreaterThan(0);
      expect(result.safeWithdrawalRate).toBeLessThanOrEqual(10);
    });
  });

  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const validation = validateFourZeroThreeBInputs(testInputs);
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should reject invalid current age', () => {
      const invalidInputs = { ...testInputs, currentAge: 15 };
      const validation = validateFourZeroThreeBInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Current age must be between 18 and 100');
    });

    it('should reject retirement age before current age', () => {
      const invalidInputs = { ...testInputs, retirementAge: 30 };
      const validation = validateFourZeroThreeBInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Retirement age must be greater than current age');
    });

    it('should reject negative salary', () => {
      const invalidInputs = { ...testInputs, annualSalary: -1000 };
      const validation = validateFourZeroThreeBInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Annual salary must be greater than 0');
    });

    it('should reject invalid contribution percentage', () => {
      const invalidInputs = { ...testInputs, employeeContributionPercent: 150 };
      const validation = validateFourZeroThreeBInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Employee contribution percentage must be between 0 and 100');
    });

    it('should reject invalid expected return', () => {
      const invalidInputs = { ...testInputs, expectedAnnualReturn: 25 };
      const validation = validateFourZeroThreeBInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Expected annual return must be between 0 and 20 percent');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero current balance', () => {
      const edgeCaseInputs = { ...testInputs, currentBalance: 0 };
      const result = calculateFourZeroThreeB(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.projectedBalance).toBeGreaterThan(0);
    });

    it('should handle high contribution percentage', () => {
      const edgeCaseInputs = { ...testInputs, employeeContributionPercent: 15 };
      const result = calculateFourZeroThreeB(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.totalContributions).toBeGreaterThan(0);
    });

    it('should handle catch-up contributions', () => {
      const edgeCaseInputs = { ...testInputs, currentAge: 52, catchUpContributions: true };
      const result = calculateFourZeroThreeB(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.totalContributions).toBeGreaterThan(0);
    });

    it('should handle high expected return', () => {
      const edgeCaseInputs = { ...testInputs, expectedAnnualReturn: 12 };
      const result = calculateFourZeroThreeB(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.projectedBalance).toBeGreaterThan(testInputs.currentBalance);
    });

    it('should handle low expected return', () => {
      const edgeCaseInputs = { ...testInputs, expectedAnnualReturn: 3 };
      const result = calculateFourZeroThreeB(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.projectedBalance).toBeGreaterThan(testInputs.currentBalance);
    });
  });

  describe('Analysis', () => {
    it('should provide retirement readiness assessment', () => {
      const result = calculateFourZeroThreeB(testInputs);
      expect(result.analysis).toBeDefined();
      expect(result.analysis.retirementReadiness).toBeDefined();
      expect(result.analysis.riskLevel).toBeDefined();
      expect(result.analysis.recommendation).toBeDefined();
    });

    it('should provide contribution analysis', () => {
      const result = calculateFourZeroThreeB(testInputs);
      expect(result.analysis.contributionSummary).toBeDefined();
      expect(result.analysis.employerMatchAnalysis).toBeDefined();
    });

    it('should provide tax analysis', () => {
      const result = calculateFourZeroThreeB(testInputs);
      expect(result.analysis.taxEfficiencySummary).toBeDefined();
      expect(result.analysis.taxSavingsAnalysis).toBeDefined();
    });

    it('should provide recommendations', () => {
      const result = calculateFourZeroThreeB(testInputs);
      expect(result.analysis.contributionRecommendations).toBeInstanceOf(Array);
      expect(result.analysis.investmentRecommendations).toBeInstanceOf(Array);
      expect(result.analysis.immediateActions).toBeInstanceOf(Array);
    });
  });

  describe('Scenarios', () => {
    it('should provide scenario projections', () => {
      const result = calculateFourZeroThreeB(testInputs);
      expect(result.conservativeProjection).toBeDefined();
      expect(result.moderateProjection).toBeDefined();
      expect(result.aggressiveProjection).toBeDefined();
      expect(result.conservativeProjection).toBeLessThan(result.aggressiveProjection);
    });

    it('should handle different retirement ages', () => {
      const earlyRetirementInputs = { ...testInputs, retirementAge: 55 };
      const lateRetirementInputs = { ...testInputs, retirementAge: 70 };

      const earlyResult = calculateFourZeroThreeB(earlyRetirementInputs);
      const lateResult = calculateFourZeroThreeB(lateRetirementInputs);

      expect(earlyResult.projectedBalance).toBeLessThan(lateResult.projectedBalance);
    });
  });
});