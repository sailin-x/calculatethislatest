import { describe, it, expect } from 'vitest';
import { FourFiveSevenPlanCalculator } from './FourFiveSevenPlanCalculator';
import { calculateFourFiveSeven } from './formulas';
import { validateFourFiveSevenInputs } from './validation';

describe('FourFiveSevenPlanCalculator', () => {
  const testInputs = {
    currentAge: 40,
    retirementAge: 65,
    lifeExpectancy: 90,
    currentBalance: 75000,
    yearsOfService: 15,
    annualSalary: 65000,
    employeeContributionPercent: 7,
    employerContributionPercent: 4,
    catchUpContributions: false,
    expectedAnnualReturn: 7,
    inflationRate: 2.5,
    currentTaxRate: 24,
    retirementTaxRate: 18,
    contributionLimit: 22000,
    lifetimeLimit: 1000000,
    vestingSchedule: 'graded' as const,
    analysisPeriod: 25,
    includeSocialSecurity: true,
    socialSecurityBenefit: 2200,
    otherRetirementIncome: 12000,
    withdrawalStrategy: 'required_minimum' as const,
    annualWithdrawalAmount: 45000,
    withdrawalPercentage: 4,
    annualFees: 0.4,
    administrativeFees: 45,
    currency: 'USD' as const
  };

  describe('Calculator Structure', () => {
    it('should have correct calculator properties', () => {
      expect(FourFiveSevenPlanCalculator.id).toBe('457-plan-calculator');
      expect(FourFiveSevenPlanCalculator.title).toBe('457 Plan Calculator');
      expect(FourFiveSevenPlanCalculator.category).toBe('finance');
      expect(FourFiveSevenPlanCalculator.subcategory).toBe('Retirement');
      expect(FourFiveSevenPlanCalculator.description).toBeTruthy();
      expect(FourFiveSevenPlanCalculator.inputs).toBeInstanceOf(Array);
      expect(FourFiveSevenPlanCalculator.outputs).toBeInstanceOf(Array);
    });

    it('should have required input fields', () => {
      const inputIds = FourFiveSevenPlanCalculator.inputs.map(input => input.id);
      expect(inputIds).toContain('currentAge');
      expect(inputIds).toContain('retirementAge');
      expect(inputIds).toContain('annualSalary');
      expect(inputIds).toContain('employeeContributionPercent');
      expect(inputIds).toContain('expectedAnnualReturn');
    });

    it('should have required output fields', () => {
      const outputIds = FourFiveSevenPlanCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('projectedBalance');
      expect(outputIds).toContain('monthlyRetirementIncome');
      expect(outputIds).toContain('totalContributions');
      expect(outputIds).toContain('totalTaxSavings');
      expect(outputIds).toContain('replacementRatio');
    });
  });

  describe('Formulas', () => {
    it('should calculate projected balance correctly', () => {
      const result = calculateFourFiveSeven(testInputs);
      expect(result.projectedBalance).toBeGreaterThan(testInputs.currentBalance);
      expect(typeof result.projectedBalance).toBe('number');
    });

    it('should calculate monthly retirement income', () => {
      const result = calculateFourFiveSeven(testInputs);
      expect(result.monthlyRetirementIncome).toBeGreaterThan(0);
      expect(typeof result.monthlyRetirementIncome).toBe('number');
    });

    it('should calculate total contributions', () => {
      const result = calculateFourFiveSeven(testInputs);
      expect(result.totalContributions).toBeGreaterThan(0);
      expect(typeof result.totalContributions).toBe('number');
    });

    it('should calculate tax savings', () => {
      const result = calculateFourFiveSeven(testInputs);
      expect(result.totalTaxSavings).toBeGreaterThan(0);
      expect(typeof result.totalTaxSavings).toBe('number');
    });

    it('should calculate replacement ratio', () => {
      const result = calculateFourFiveSeven(testInputs);
      expect(result.replacementRatio).toBeGreaterThan(0);
      expect(result.replacementRatio).toBeLessThanOrEqual(200);
    });

    it('should calculate safe withdrawal rate', () => {
      const result = calculateFourFiveSeven(testInputs);
      expect(result.safeWithdrawalRate).toBeGreaterThan(0);
      expect(result.safeWithdrawalRate).toBeLessThanOrEqual(10);
    });
  });

  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const validation = validateFourFiveSevenInputs(testInputs);
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should reject invalid current age', () => {
      const invalidInputs = { ...testInputs, currentAge: 15 };
      const validation = validateFourFiveSevenInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Current age must be between 18 and 100');
    });

    it('should reject retirement age before current age', () => {
      const invalidInputs = { ...testInputs, retirementAge: 30 };
      const validation = validateFourFiveSevenInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Retirement age must be greater than current age');
    });

    it('should reject negative salary', () => {
      const invalidInputs = { ...testInputs, annualSalary: -1000 };
      const validation = validateFourFiveSevenInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Annual salary must be greater than 0');
    });

    it('should reject invalid contribution percentage', () => {
      const invalidInputs = { ...testInputs, employeeContributionPercent: 150 };
      const validation = validateFourFiveSevenInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Employee contribution percentage must be between 0 and 100');
    });

    it('should reject invalid expected return', () => {
      const invalidInputs = { ...testInputs, expectedAnnualReturn: 25 };
      const validation = validateFourFiveSevenInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Expected annual return must be between 0 and 20 percent');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero current balance', () => {
      const edgeCaseInputs = { ...testInputs, currentBalance: 0 };
      const result = calculateFourFiveSeven(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.projectedBalance).toBeGreaterThan(0);
    });

    it('should handle high contribution percentage', () => {
      const edgeCaseInputs = { ...testInputs, employeeContributionPercent: 15 };
      const result = calculateFourFiveSeven(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.totalContributions).toBeGreaterThan(0);
    });

    it('should handle catch-up contributions', () => {
      const edgeCaseInputs = { ...testInputs, currentAge: 52, catchUpContributions: true };
      const result = calculateFourFiveSeven(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.totalContributions).toBeGreaterThan(0);
    });

    it('should handle high expected return', () => {
      const edgeCaseInputs = { ...testInputs, expectedAnnualReturn: 12 };
      const result = calculateFourFiveSeven(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.projectedBalance).toBeGreaterThan(testInputs.currentBalance);
    });

    it('should handle low expected return', () => {
      const edgeCaseInputs = { ...testInputs, expectedAnnualReturn: 3 };
      const result = calculateFourFiveSeven(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.projectedBalance).toBeGreaterThan(testInputs.currentBalance);
    });
  });

  describe('Analysis', () => {
    it('should provide retirement readiness assessment', () => {
      const result = calculateFourFiveSeven(testInputs);
      expect(result.analysis).toBeDefined();
      expect(result.analysis.retirementReadiness).toBeDefined();
      expect(result.analysis.riskLevel).toBeDefined();
      expect(result.analysis.recommendation).toBeDefined();
    });

    it('should provide contribution analysis', () => {
      const result = calculateFourFiveSeven(testInputs);
      expect(result.analysis.contributionSummary).toBeDefined();
      expect(result.analysis.employerMatchAnalysis).toBeDefined();
    });

    it('should provide tax analysis', () => {
      const result = calculateFourFiveSeven(testInputs);
      expect(result.analysis.taxEfficiencySummary).toBeDefined();
      expect(result.analysis.taxSavingsAnalysis).toBeDefined();
    });

    it('should provide recommendations', () => {
      const result = calculateFourFiveSeven(testInputs);
      expect(result.analysis.contributionRecommendations).toBeInstanceOf(Array);
      expect(result.analysis.investmentRecommendations).toBeInstanceOf(Array);
      expect(result.analysis.immediateActions).toBeInstanceOf(Array);
    });
  });

  describe('Scenarios', () => {
    it('should provide scenario projections', () => {
      const result = calculateFourFiveSeven(testInputs);
      expect(result.conservativeProjection).toBeDefined();
      expect(result.moderateProjection).toBeDefined();
      expect(result.aggressiveProjection).toBeDefined();
      expect(result.conservativeProjection).toBeLessThan(result.aggressiveProjection);
    });

    it('should handle different retirement ages', () => {
      const earlyRetirementInputs = { ...testInputs, retirementAge: 55 };
      const lateRetirementInputs = { ...testInputs, retirementAge: 70 };

      const earlyResult = calculateFourFiveSeven(earlyRetirementInputs);
      const lateResult = calculateFourFiveSeven(lateRetirementInputs);

      expect(earlyResult.projectedBalance).toBeLessThan(lateResult.projectedBalance);
    });
  });
});