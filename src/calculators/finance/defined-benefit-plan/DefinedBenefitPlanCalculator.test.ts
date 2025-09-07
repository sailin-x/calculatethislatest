import { describe, it, expect } from 'vitest';
import { DefinedBenefitPlanCalculator } from './DefinedBenefitPlanCalculator';
import { calculateDefinedBenefitPlan } from './formulas';
import { validateDefinedBenefitPlanInputs } from './validation';

describe('DefinedBenefitPlanCalculator', () => {
  const testInputs = {
    currentAge: 45,
    retirementAge: 65,
    lifeExpectancy: 90,
    gender: 'male' as const,
    currentSalary: 75000,
    yearsOfService: 15,
    expectedSalaryIncrease: 0.03,
    finalAverageSalary: 85000,
    planType: 'traditional' as const,
    benefitFormula: 'final_average' as const,
    vestingSchedule: 'graded' as const,
    benefitMultiplier: 0.015,
    yearsOfServiceRequired: 30,
    minimumRetirementAge: 55,
    earlyRetirementReduction: 0.06,
    currentAccountBalance: 100000,
    employerContribution: 10000,
    employeeContribution: 2000,
    expectedReturnRate: 0.06,
    colaRate: 0.02,
    colaStartAge: 62,
    spouseAge: 45,
    survivorBenefitPercentage: 0.5,
    taxBracket: 0.24,
    stateTaxRate: 0.05,
    analysisPeriod: 30,
    inflationRate: 0.025,
    discountRate: 0.04,
    currency: 'USD' as const
  };

  describe('Calculator Structure', () => {
    it('should have correct calculator properties', () => {
      expect(DefinedBenefitPlanCalculator.id).toBe('defined-benefit-plan-calculator');
      expect(DefinedBenefitPlanCalculator.title).toBe('Defined Benefit Plan Calculator');
      expect(DefinedBenefitPlanCalculator.category).toBe('finance');
      expect(DefinedBenefitPlanCalculator.subcategory).toBe('Retirement');
      expect(DefinedBenefitPlanCalculator.description).toBeTruthy();
      expect(DefinedBenefitPlanCalculator.inputs).toBeInstanceOf(Array);
      expect(DefinedBenefitPlanCalculator.outputs).toBeInstanceOf(Array);
    });

    it('should have required input fields', () => {
      const inputIds = DefinedBenefitPlanCalculator.inputs.map(input => input.id);
      expect(inputIds).toContain('currentAge');
      expect(inputIds).toContain('retirementAge');
      expect(inputIds).toContain('finalAverageSalary');
    });

    it('should have required output fields', () => {
      const outputIds = DefinedBenefitPlanCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('monthlyRetirementIncome');
      expect(outputIds).toContain('annualRetirementIncome');
      expect(outputIds).toContain('analysis');
    });
  });

  describe('Formulas', () => {
    it('should calculate monthly retirement income', () => {
      const result = calculateDefinedBenefitPlan(testInputs);
      expect(result.monthlyRetirementIncome).toBeGreaterThan(0);
      expect(typeof result.monthlyRetirementIncome).toBe('number');
    });

    it('should calculate annual retirement income', () => {
      const result = calculateDefinedBenefitPlan(testInputs);
      expect(result.annualRetirementIncome).toBeGreaterThan(0);
      expect(typeof result.annualRetirementIncome).toBe('number');
    });

    it('should calculate total plan value', () => {
      const result = calculateDefinedBenefitPlan(testInputs);
      expect(typeof result.totalValue).toBe('number');
    });

    it('should calculate net benefit', () => {
      const result = calculateDefinedBenefitPlan(testInputs);
      expect(typeof result.netBenefit).toBe('number');
    });

    it('should provide plan metrics', () => {
      const result = calculateDefinedBenefitPlan(testInputs);
      expect(result.metrics).toBeDefined();
      expect(result.metrics.monthlyBenefit).toBeDefined();
      expect(result.metrics.annualBenefit).toBeDefined();
    });
  });

  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const validation = validateDefinedBenefitPlanInputs(testInputs);
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should reject invalid current age', () => {
      const invalidInputs = { ...testInputs, currentAge: 15 };
      const validation = validateDefinedBenefitPlanInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Current age must be between 18 and 80');
    });

    it('should reject invalid retirement age', () => {
      const invalidInputs = { ...testInputs, retirementAge: 40 };
      const validation = validateDefinedBenefitPlanInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Retirement age must be greater than current age and less than 100');
    });

    it('should reject invalid final average salary', () => {
      const invalidInputs = { ...testInputs, finalAverageSalary: -1000 };
      const validation = validateDefinedBenefitPlanInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Final average salary must be greater than 0');
    });
  });

  describe('Edge Cases', () => {
    it('should handle early retirement', () => {
      const edgeCaseInputs = { ...testInputs, retirementAge: 50 };
      const result = calculateDefinedBenefitPlan(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.monthlyRetirementIncome).toBeLessThan(testInputs.finalAverageSalary * testInputs.benefitMultiplier / 100);
    });

    it('should handle high vesting percentage', () => {
      const edgeCaseInputs = { ...testInputs, yearsOfService: 25 };
      const result = calculateDefinedBenefitPlan(edgeCaseInputs);
      expect(result).toBeDefined();
    });

    it('should handle low benefit multiplier', () => {
      const edgeCaseInputs = { ...testInputs, benefitMultiplier: 0.005 };
      const result = calculateDefinedBenefitPlan(edgeCaseInputs);
      expect(result).toBeDefined();
    });

    it('should handle high COLA rate', () => {
      const edgeCaseInputs = { ...testInputs, colaRate: 0.04 };
      const result = calculateDefinedBenefitPlan(edgeCaseInputs);
      expect(result).toBeDefined();
    });

    it('should handle cash balance plan type', () => {
      const edgeCaseInputs = { ...testInputs, planType: 'cash_balance' as const };
      const result = calculateDefinedBenefitPlan(edgeCaseInputs);
      expect(result).toBeDefined();
    });

    it('should handle cliff vesting', () => {
      const edgeCaseInputs = { ...testInputs, vestingSchedule: 'cliff' as const, yearsOfService: 2 };
      const result = calculateDefinedBenefitPlan(edgeCaseInputs);
      expect(result).toBeDefined();
    });
  });

  describe('Analysis', () => {
    it('should provide plan rating assessment', () => {
      const result = calculateDefinedBenefitPlan(testInputs);
      expect(result.analysis).toBeDefined();
      expect(result.analysis.planRating).toBeDefined();
      expect(result.analysis.recommendation).toBeDefined();
    });

    it('should provide vesting analysis', () => {
      const result = calculateDefinedBenefitPlan(testInputs);
      expect(result.analysis.vestingAnalysis).toBeDefined();
    });

    it('should provide retirement readiness assessment', () => {
      const result = calculateDefinedBenefitPlan(testInputs);
      expect(result.analysis.retirementReadiness).toBeDefined();
    });

    it('should provide next steps', () => {
      const result = calculateDefinedBenefitPlan(testInputs);
      expect(result.analysis.nextSteps).toBeInstanceOf(Array);
      expect(result.analysis.nextSteps.length).toBeGreaterThan(0);
    });
  });

  describe('Examples', () => {
    it('should have valid examples', () => {
      expect(DefinedBenefitPlanCalculator.examples).toBeInstanceOf(Array);
      expect(DefinedBenefitPlanCalculator.examples.length).toBeGreaterThan(0);

      DefinedBenefitPlanCalculator.examples.forEach(example => {
        expect(example.title).toBeTruthy();
        expect(example.description).toBeTruthy();
        expect(example.inputs).toBeDefined();
        expect(example.expectedOutputs).toBeDefined();
      });
    });

    it('should calculate examples correctly', () => {
      DefinedBenefitPlanCalculator.examples.forEach(example => {
        const result = calculateDefinedBenefitPlan(example.inputs as any);
        expect(result).toBeDefined();
        expect(result.monthlyRetirementIncome).toBeDefined();
      });
    });
  });

  describe('Usage Instructions', () => {
    it('should have comprehensive usage instructions', () => {
      expect(DefinedBenefitPlanCalculator.usageInstructions).toBeInstanceOf(Array);
      expect(DefinedBenefitPlanCalculator.usageInstructions.length).toBeGreaterThan(0);

      DefinedBenefitPlanCalculator.usageInstructions.forEach(instruction => {
        expect(typeof instruction).toBe('string');
        expect(instruction.length).toBeGreaterThan(0);
      });
    });
  });
});