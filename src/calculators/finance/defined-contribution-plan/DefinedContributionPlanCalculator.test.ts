import { describe, it, expect } from 'vitest';
import { DefinedContributionPlanCalculator } from './DefinedContributionPlanCalculator';
import { calculateDefinedContributionPlan } from './formulas';
import { validateDefinedContributionPlanInputs } from './validation';

describe('DefinedContributionPlanCalculator', () => {
  const testInputs = {
    currentAge: 35,
    retirementAge: 65,
    lifeExpectancy: 90,
    gender: 'male' as const,
    currentAccountBalance: 50000,
    monthlyContribution: 500,
    annualContribution: 2000,
    employerMatch: 0.5,
    employerMatchLimit: 6000,
    expectedReturnRate: 0.07,
    riskTolerance: 'moderate' as const,
    investmentType: 'target_date' as const,
    planType: '401k' as const,
    contributionLimit: 23000,
    catchUpContribution: 1000,
    vestingSchedule: 'immediate' as const,
    taxBracket: 0.24,
    stateTaxRate: 0.05,
    accountType: 'traditional' as const,
    yearsToRetirement: 30,
    analysisPeriod: 30,
    annualFees: 100,
    expenseRatio: 0.005,
    transactionFees: 50,
    inflationRate: 0.025,
    salaryIncreaseRate: 0.03,
    includeSocialSecurity: true,
    socialSecurityBenefit: 20000,
    socialSecurityStartAge: 67,
    withdrawalRate: 0.04,
    withdrawalStartAge: 65,
    requiredMinimumDistribution: true,
    currency: 'USD' as const
  };

  describe('Calculator Structure', () => {
    it('should have correct calculator properties', () => {
      expect(DefinedContributionPlanCalculator.id).toBe('DefinedContributionPlan-calculator');
      expect(DefinedContributionPlanCalculator.title).toBe('Defined Contribution Plan Calculator');
      expect(DefinedContributionPlanCalculator.category).toBe('finance');
      expect(DefinedContributionPlanCalculator.subcategory).toBe('Retirement');
      expect(DefinedContributionPlanCalculator.description).toBeTruthy();
      expect(DefinedContributionPlanCalculator.inputs).toBeInstanceOf(Array);
      expect(DefinedContributionPlanCalculator.outputs).toBeInstanceOf(Array);
    });

    it('should have required input fields', () => {
      const inputIds = DefinedContributionPlanCalculator.inputs.map(input => input.id);
      expect(inputIds).toContain('currentAge');
      expect(inputIds).toContain('retirementAge');
      expect(inputIds).toContain('currentAccountBalance');
    });

    it('should have required output fields', () => {
      const outputIds = DefinedContributionPlanCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('projectedRetirementBalance');
      expect(outputIds).toContain('monthlyRetirementIncome');
      expect(outputIds).toContain('analysis');
    });
  });

  describe('Formulas', () => {
    it('should calculate projected retirement balance', () => {
      const result = calculateDefinedContributionPlan(testInputs);
      expect(result.projectedRetirementBalance).toBeGreaterThan(0);
      expect(typeof result.projectedRetirementBalance).toBe('number');
    });

    it('should calculate monthly retirement income', () => {
      const result = calculateDefinedContributionPlan(testInputs);
      expect(result.monthlyRetirementIncome).toBeGreaterThan(0);
      expect(typeof result.monthlyRetirementIncome).toBe('number');
    });

    it('should calculate annual retirement income', () => {
      const result = calculateDefinedContributionPlan(testInputs);
      expect(result.annualRetirementIncome).toBeGreaterThan(0);
      expect(typeof result.annualRetirementIncome).toBe('number');
    });

    it('should calculate total account value', () => {
      const result = calculateDefinedContributionPlan(testInputs);
      expect(typeof result.totalValue).toBe('number');
    });

    it('should provide plan metrics', () => {
      const result = calculateDefinedContributionPlan(testInputs);
      expect(result.metrics).toBeDefined();
      expect(result.metrics.projectedBalance).toBeDefined();
      expect(result.metrics.totalContributions).toBeDefined();
    });
  });

  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const validation = validateDefinedContributionPlanInputs(testInputs);
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should reject invalid current age', () => {
      const invalidInputs = { ...testInputs, currentAge: 15 };
      const validation = validateDefinedContributionPlanInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Current age must be between 18 and 80');
    });

    it('should reject invalid retirement age', () => {
      const invalidInputs = { ...testInputs, retirementAge: 40 };
      const validation = validateDefinedContributionPlanInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Retirement age must be greater than current age and less than 100');
    });

    it('should reject invalid expected return rate', () => {
      const invalidInputs = { ...testInputs, expectedReturnRate: -0.5 };
      const validation = validateDefinedContributionPlanInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Expected return rate must be between -10% and 20%');
    });
  });

  describe('Edge Cases', () => {
    it('should handle high contribution amounts', () => {
      const edgeCaseInputs = { ...testInputs, monthlyContribution: 2000 };
      const result = calculateDefinedContributionPlan(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.projectedRetirementBalance).toBeGreaterThan(testInputs.currentAccountBalance);
    });

    it('should handle low expected return rate', () => {
      const edgeCaseInputs = { ...testInputs, expectedReturnRate: 0.02 };
      const result = calculateDefinedContributionPlan(edgeCaseInputs);
      expect(result).toBeDefined();
    });

    it('should handle high expense ratio', () => {
      const edgeCaseInputs = { ...testInputs, expenseRatio: 0.03 };
      const result = calculateDefinedContributionPlan(edgeCaseInputs);
      expect(result).toBeDefined();
    });

    it('should handle Roth account type', () => {
      const edgeCaseInputs = { ...testInputs, accountType: 'roth' as const };
      const result = calculateDefinedContributionPlan(edgeCaseInputs);
      expect(result).toBeDefined();
    });

    it('should handle short time to retirement', () => {
      const edgeCaseInputs = { ...testInputs, yearsToRetirement: 5 };
      const result = calculateDefinedContributionPlan(edgeCaseInputs);
      expect(result).toBeDefined();
    });

    it('should handle high withdrawal rate', () => {
      const edgeCaseInputs = { ...testInputs, withdrawalRate: 0.08 };
      const result = calculateDefinedContributionPlan(edgeCaseInputs);
      expect(result).toBeDefined();
    });
  });

  describe('Analysis', () => {
    it('should provide plan rating assessment', () => {
      const result = calculateDefinedContributionPlan(testInputs);
      expect(result.analysis).toBeDefined();
      expect(result.analysis.planRating).toBeDefined();
      expect(result.analysis.recommendation).toBeDefined();
    });

    it('should provide contribution analysis', () => {
      const result = calculateDefinedContributionPlan(testInputs);
      expect(result.analysis.contributionAnalysis).toBeDefined();
    });

    it('should provide retirement readiness assessment', () => {
      const result = calculateDefinedContributionPlan(testInputs);
      expect(result.analysis.retirementReadiness).toBeDefined();
    });

    it('should provide next steps', () => {
      const result = calculateDefinedContributionPlan(testInputs);
      expect(result.analysis.nextSteps).toBeInstanceOf(Array);
      expect(result.analysis.nextSteps.length).toBeGreaterThan(0);
    });
  });

  describe('Examples', () => {
    it('should have valid examples', () => {
      expect(DefinedContributionPlanCalculator.examples).toBeInstanceOf(Array);
      expect(DefinedContributionPlanCalculator.examples.length).toBeGreaterThan(0);

      DefinedContributionPlanCalculator.examples.forEach(example => {
        expect(example.title).toBeTruthy();
        expect(example.description).toBeTruthy();
        expect(example.inputs).toBeDefined();
        expect(example.expectedOutputs).toBeDefined();
      });
    });

    it('should calculate examples correctly', () => {
      DefinedContributionPlanCalculator.examples.forEach(example => {
        const result = calculateDefinedContributionPlan(example.inputs as any);
        expect(result).toBeDefined();
        expect(result.projectedRetirementBalance).toBeDefined();
      });
    });
  });

  describe('Usage Instructions', () => {
    it('should have comprehensive usage instructions', () => {
      expect(DefinedContributionPlanCalculator.usageInstructions).toBeInstanceOf(Array);
      expect(DefinedContributionPlanCalculator.usageInstructions.length).toBeGreaterThan(0);

      DefinedContributionPlanCalculator.usageInstructions.forEach(instruction => {
        expect(typeof instruction).toBe('string');
        expect(instruction.length).toBeGreaterThan(0);
      });
    });
  });
});