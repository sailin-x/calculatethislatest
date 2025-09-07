import { describe, it, expect } from 'vitest';
import { EmergencyFundCalculator } from './EmergencyFundCalculator';
import { calculateEmergencyFundCalculator } from './formulas';
import { validateEmergencyFundCalculatorInputs } from './validation';

describe('EmergencyFundCalculator', () => {
  const testInputs = {
    monthlyIncome: 5000,
    monthlyExpenses: 3500,
    dependents: 2,
    employmentType: 'salaried' as const,
    includeJobLoss: true,
    includeMedicalEmergency: true,
    includeHomeRepair: true,
    includeCarRepair: true,
    includeFamilyEmergency: true,
    currentSavings: 10000,
    currentEmergencyFund: 5000,
    monthlyDebtPayments: 800,
    creditScore: 720,
    jobStability: 'stable' as const,
    healthStatus: 'good' as const,
    locationRisk: 'moderate' as const,
    industryRisk: 'moderate' as const,
    housingType: 'rented' as const,
    transportationType: 'owned' as const,
    insuranceCoverage: 'comprehensive' as const,
    timeToFindNewJob: 3,
    desiredCoveragePeriod: 6,
    inflationRate: 0.025,
    emergencyFundInvestmentType: 'high_yield_savings' as const,
    expectedReturnRate: 0.015,
    liquidityNeeds: 'immediate' as const,
    costOfLivingIndex: 100,
    localUnemploymentRate: 0.045,
    riskTolerance: 'moderate' as const,
    analysisPeriod: 24,
    stateOfResidence: 'California',
    currency: 'USD' as const
  };

  describe('Calculator Structure', () => {
    it('should have correct calculator properties', () => {
      expect(EmergencyFundCalculator.id).toBe('emergency-fund-calculator');
      expect(EmergencyFundCalculator.title).toBe('Emergency Fund Calculator');
      expect(EmergencyFundCalculator.category).toBe('finance');
      expect(EmergencyFundCalculator.subcategory).toBe('Personal Finance');
      expect(EmergencyFundCalculator.description).toBeTruthy();
      expect(EmergencyFundCalculator.inputs).toBeInstanceOf(Array);
      expect(EmergencyFundCalculator.outputs).toBeInstanceOf(Array);
    });

    it('should have required input fields', () => {
      const inputIds = EmergencyFundCalculator.inputs.map(input => input.id);
      expect(inputIds).toContain('monthlyIncome');
      expect(inputIds).toContain('monthlyExpenses');
      expect(inputIds).toContain('currentEmergencyFund');
    });

    it('should have required output fields', () => {
      const outputIds = EmergencyFundCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('recommendedAmount');
      expect(outputIds).toContain('monthlySavingsTarget');
    });
  });

  describe('Formulas', () => {
    it('should calculate recommended emergency fund', () => {
      const result = calculateEmergencyFundCalculator(testInputs);
      expect(result.recommendedAmount).toBeGreaterThan(0);
      expect(typeof result.recommendedAmount).toBe('number');
    });

    it('should calculate monthly savings target', () => {
      const result = calculateEmergencyFundCalculator(testInputs);
      expect(result.monthlySavingsTarget).toBeGreaterThan(0);
      expect(typeof result.monthlySavingsTarget).toBe('number');
    });

    it('should calculate time to goal', () => {
      const result = calculateEmergencyFundCalculator(testInputs);
      expect(result.timeToGoal).toBeGreaterThan(0);
      expect(typeof result.timeToGoal).toBe('number');
    });

    it('should provide comprehensive metrics', () => {
      const result = calculateEmergencyFundCalculator(testInputs);
      expect(result.metrics).toBeDefined();
      expect(result.metrics.recommendedEmergencyFund).toBeDefined();
      expect(result.metrics.coverageScore).toBeDefined();
    });

    it('should provide detailed analysis', () => {
      const result = calculateEmergencyFundCalculator(testInputs);
      expect(result.analysis).toBeDefined();
      expect(result.analysis.emergencyFundRating).toBeDefined();
      expect(result.analysis.recommendation).toBeDefined();
    });
  });

  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const validation = validateEmergencyFundCalculatorInputs(testInputs);
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should reject invalid monthly income', () => {
      const invalidInputs = { ...testInputs, monthlyIncome: -1000 };
      const validation = validateEmergencyFundCalculatorInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Monthly income must be greater than 0');
    });

    it('should reject invalid monthly expenses', () => {
      const invalidInputs = { ...testInputs, monthlyExpenses: -500 };
      const validation = validateEmergencyFundCalculatorInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Monthly expenses must be greater than 0');
    });

    it('should reject invalid dependents', () => {
      const invalidInputs = { ...testInputs, dependents: -1 };
      const validation = validateEmergencyFundCalculatorInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Number of dependents must be between 0 and 15');
    });
  });

  describe('Edge Cases', () => {
    it('should handle high risk factors', () => {
      const edgeCaseInputs = {
        ...testInputs,
        jobStability: 'very_unstable' as const,
        healthStatus: 'critical' as const,
        locationRisk: 'very_high' as const
      };
      const result = calculateEmergencyFundCalculator(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.recommendedAmount).toBeGreaterThan(testInputs.monthlyExpenses * 6);
    });

    it('should handle low income', () => {
      const edgeCaseInputs = { ...testInputs, monthlyIncome: 2000, monthlyExpenses: 1800 };
      const result = calculateEmergencyFundCalculator(edgeCaseInputs);
      expect(result).toBeDefined();
    });

    it('should handle high expenses', () => {
      const edgeCaseInputs = { ...testInputs, monthlyIncome: 6000, monthlyExpenses: 5500 };
      const result = calculateEmergencyFundCalculator(edgeCaseInputs);
      expect(result).toBeDefined();
    });

    it('should handle self-employed', () => {
      const edgeCaseInputs = { ...testInputs, employmentType: 'self_employed' as const };
      const result = calculateEmergencyFundCalculator(edgeCaseInputs);
      expect(result).toBeDefined();
    });

    it('should handle high cost of living', () => {
      const edgeCaseInputs = { ...testInputs, costOfLivingIndex: 150 };
      const result = calculateEmergencyFundCalculator(edgeCaseInputs);
      expect(result).toBeDefined();
    });
  });

  describe('Risk Assessment', () => {
    it('should calculate coverage score', () => {
      const result = calculateEmergencyFundCalculator(testInputs);
      expect(result.metrics.coverageScore).toBeDefined();
      expect(result.metrics.coverageScore).toBeGreaterThanOrEqual(0);
      expect(result.metrics.coverageScore).toBeLessThanOrEqual(100);
    });

    it('should assess overall risk score', () => {
      const result = calculateEmergencyFundCalculator(testInputs);
      expect(result.metrics.overallRiskScore).toBeDefined();
      expect(result.metrics.overallRiskScore).toBeGreaterThanOrEqual(0);
      expect(result.metrics.overallRiskScore).toBeLessThanOrEqual(100);
    });

    it('should provide risk-adjusted coverage', () => {
      const result = calculateEmergencyFundCalculator(testInputs);
      expect(result.metrics.riskAdjustedCoverage).toBeDefined();
    });
  });

  describe('Scenario Analysis', () => {
    it('should calculate scenario impacts', () => {
      const result = calculateEmergencyFundCalculator(testInputs);
      expect(result.analysis.scenarioAnalysis).toBeDefined();
      expect(result.analysis.scenarioAnalysis).toBeInstanceOf(Array);
    });

    it('should provide best and worst case scenarios', () => {
      const result = calculateEmergencyFundCalculator(testInputs);
      expect(result.metrics.bestCaseCoverage).toBeDefined();
      expect(result.metrics.worstCaseCoverage).toBeDefined();
      expect(result.metrics.averageCaseCoverage).toBeDefined();
    });
  });

  describe('Examples', () => {
    it('should have valid examples', () => {
      expect(EmergencyFundCalculator.examples).toBeInstanceOf(Array);
      expect(EmergencyFundCalculator.examples.length).toBeGreaterThan(0);

      EmergencyFundCalculator.examples.forEach(example => {
        expect(example.title).toBeTruthy();
        expect(example.description).toBeTruthy();
        expect(example.inputs).toBeDefined();
        expect(example.expectedOutputs).toBeDefined();
      });
    });

    it('should calculate examples correctly', () => {
      EmergencyFundCalculator.examples.forEach(example => {
        const result = calculateEmergencyFundCalculator(example.inputs as any);
        expect(result).toBeDefined();
        expect(result.recommendedAmount).toBeDefined();
      });
    });
  });

  describe('Usage Instructions', () => {
    it('should have comprehensive usage instructions', () => {
      expect(EmergencyFundCalculator.usageInstructions).toBeInstanceOf(Array);
      expect(EmergencyFundCalculator.usageInstructions.length).toBeGreaterThan(0);

      EmergencyFundCalculator.usageInstructions.forEach(instruction => {
        expect(typeof instruction).toBe('string');
        expect(instruction.length).toBeGreaterThan(0);
      });
    });
  });
});