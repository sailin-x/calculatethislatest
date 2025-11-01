import { describe, it, expect } from 'vitest';
import { CollegeCostCalculator } from './CollegeCostCalculator';
import { calculateCollegeCost } from './formulas';
import { validateCollegeCostInputs } from './validation';

describe('CollegeCostCalculator', () => {
  const testInputs = {
    studentAge: 17,
    yearsUntilCollege: 1,
    collegeStartYear: new Date().getFullYear() + 1,
    degreeType: 'bachelor' as const,
    collegeType: 'public_in_state' as const,
    annualTuition: 10000,
    annualRoomAndBoard: 12000,
    annualBooksAndSupplies: 1200,
    annualTransportation: 1500,
    annualPersonalExpenses: 2000,
    annualHealthInsurance: 2000,
    oneTimeFees: 500,
    expectedGrants: 5000,
    expectedScholarships: 2000,
    expectedWorkStudy: 2000,
    expectedStudentLoans: 5000,
    expectedParentLoans: 10000,
    expectedFamilyContribution: 5000,
    inflationRate: 3,
    investmentReturn: 7,
    taxRate: 25,
    planningHorizon: 4,
    optimisticGrowth: 8,
    pessimisticGrowth: 1,
    probabilityOptimistic: 20,
    probabilityPessimistic: 20,
    includeSummerSchool: false,
    summerSchoolCost: 3000,
    includeStudyAbroad: false,
    studyAbroadCost: 15000,
    includeInternships: true,
    internshipEarnings: 15000,
    location: 'State College, USA',
    currency: 'USD' as const
  };

  describe('Calculator Structure', () => {
    it('should have correct calculator properties', () => {
      expect(CollegeCostCalculator.id).toBe('CollegeCostCalculator');
      expect(CollegeCostCalculator.title).toBe('College Cost Calculator');
      expect(CollegeCostCalculator.category).toBe('finance');
      expect(CollegeCostCalculator.subcategory).toBe('Education');
      expect(CollegeCostCalculator.description).toBeTruthy();
      expect(CollegeCostCalculator.inputs).toBeInstanceOf(Array);
      expect(CollegeCostCalculator.outputs).toBeInstanceOf(Array);
    });

    it('should have required input fields', () => {
      const inputIds = CollegeCostCalculator.inputs.map(input => input.id);
      expect(inputIds).toContain('studentAge');
      expect(inputIds).toContain('annualTuition');
      expect(inputIds).toContain('inflationRate');
      expect(inputIds).toContain('expectedGrants');
    });

    it('should have required output fields', () => {
      const outputIds = CollegeCostCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('totalFourYearCost');
      expect(outputIds).toContain('requiredMonthlySavings');
      expect(outputIds).toContain('analysis');
    });
  });

  describe('Formulas', () => {
    it('should calculate total four year cost', () => {
      const result = calculateCollegeCost(testInputs);
      expect(result.totalFourYearCost).toBeGreaterThan(0);
      expect(typeof result.totalFourYearCost).toBe('number');
    });

    it('should calculate total degree cost', () => {
      const result = calculateCollegeCost(testInputs);
      expect(result.totalDegreeCost).toBeGreaterThan(0);
      expect(typeof result.totalDegreeCost).toBe('number');
    });

    it('should calculate required monthly savings', () => {
      const result = calculateCollegeCost(testInputs);
      expect(result.requiredMonthlySavings).toBeGreaterThan(0);
      expect(typeof result.requiredMonthlySavings).toBe('number');
    });

    it('should calculate net total cost after aid', () => {
      const result = calculateCollegeCost(testInputs);
      expect(result.netTotalCost).toBeGreaterThan(0);
      expect(typeof result.netTotalCost).toBe('number');
      expect(result.netTotalCost).toBeLessThanOrEqual(result.totalDegreeCost);
    });

    it('should calculate total aid', () => {
      const result = calculateCollegeCost(testInputs);
      expect(result.totalAid).toBeGreaterThan(0);
      expect(typeof result.totalAid).toBe('number');
    });

    it('should calculate aid gap', () => {
      const result = calculateCollegeCost(testInputs);
      expect(typeof result.aidGap).toBe('number');
    });

    it('should calculate scenario costs', () => {
      const result = calculateCollegeCost(testInputs);
      expect(result.optimisticTotalCost).toBeGreaterThan(0);
      expect(result.pessimisticTotalCost).toBeGreaterThan(0);
      expect(result.optimisticTotalCost).toBeGreaterThan(result.pessimisticTotalCost);
    });
  });

  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const validation = validateCollegeCostInputs(testInputs);
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should reject invalid student age', () => {
      const invalidInputs = { ...testInputs, studentAge: 10 };
      const validation = validateCollegeCostInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Student age must be between 14 and 25');
    });

    it('should reject invalid annual tuition', () => {
      const invalidInputs = { ...testInputs, annualTuition: -1000 };
      const validation = validateCollegeCostInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Annual tuition cannot be negative');
    });

    it('should reject invalid inflation rate', () => {
      const invalidInputs = { ...testInputs, inflationRate: 20 };
      const validation = validateCollegeCostInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Inflation rate must be between -5% and 15%');
    });

    it('should reject invalid investment return', () => {
      const invalidInputs = { ...testInputs, investmentReturn: 30 };
      const validation = validateCollegeCostInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Investment return must be between -10% and 25%');
    });

    it('should reject invalid planning horizon', () => {
      const invalidInputs = { ...testInputs, planningHorizon: 25 };
      const validation = validateCollegeCostInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Planning horizon must be between 1 and 20 years');
    });

    it('should reject invalid probability combination', () => {
      const invalidInputs = { ...testInputs, probabilityOptimistic: 60, probabilityPessimistic: 60 };
      const validation = validateCollegeCostInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Combined optimistic and pessimistic probabilities cannot exceed 100%');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero financial aid', () => {
      const edgeCaseInputs = {
        ...testInputs,
        expectedGrants: 0,
        expectedScholarships: 0,
        expectedWorkStudy: 0,
        expectedStudentLoans: 0,
        expectedParentLoans: 0,
        expectedFamilyContribution: 0
      };
      const result = calculateCollegeCost(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.netTotalCost).toBe(result.totalDegreeCost);
      expect(result.totalAid).toBe(0);
    });

    it('should handle high tuition costs', () => {
      const edgeCaseInputs = { ...testInputs, annualTuition: 60000 };
      const result = calculateCollegeCost(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.totalDegreeCost).toBeGreaterThan(testInputs.annualTuition * 4);
    });

    it('should handle long planning horizon', () => {
      const edgeCaseInputs = { ...testInputs, planningHorizon: 8 };
      const result = calculateCollegeCost(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.totalDegreeCost).toBeGreaterThan(testInputs.annualTuition * 4);
    });

    it('should handle short time until college', () => {
      const edgeCaseInputs = { ...testInputs, yearsUntilCollege: 0 };
      const result = calculateCollegeCost(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.requiredMonthlySavings).toBeGreaterThan(0);
    });

    it('should handle summer school inclusion', () => {
      const edgeCaseInputs = { ...testInputs, includeSummerSchool: true };
      const result = calculateCollegeCost(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.totalDegreeCost).toBeGreaterThan(testInputs.annualTuition * 4);
    });

    it('should handle study abroad inclusion', () => {
      const edgeCaseInputs = { ...testInputs, includeStudyAbroad: true };
      const result = calculateCollegeCost(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.totalDegreeCost).toBeGreaterThan(testInputs.annualTuition * 4 + testInputs.studyAbroadCost);
    });

    it('should handle internship earnings', () => {
      const edgeCaseInputs = { ...testInputs, includeInternships: true };
      const result = calculateCollegeCost(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.netTotalCost).toBeLessThan(testInputs.annualTuition * 4);
    });
  });

  describe('Analysis', () => {
    it('should provide affordability assessment', () => {
      const result = calculateCollegeCost(testInputs);
      expect(result.analysis).toBeDefined();
      expect(result.analysis.affordabilityAssessment).toBeDefined();
      expect(result.analysis.recommendation).toBeDefined();
    });

    it('should provide savings plan', () => {
      const result = calculateCollegeCost(testInputs);
      expect(result.analysis.savingsPlan).toBeDefined();
      expect(typeof result.analysis.savingsPlan).toBe('string');
    });

    it('should provide cost reduction strategies', () => {
      const result = calculateCollegeCost(testInputs);
      expect(result.analysis.costReductionStrategies).toBeInstanceOf(Array);
      expect(result.analysis.costReductionStrategies.length).toBeGreaterThan(0);
    });

    it('should provide next steps', () => {
      const result = calculateCollegeCost(testInputs);
      expect(result.analysis.nextSteps).toBeInstanceOf(Array);
      expect(result.analysis.nextSteps.length).toBeGreaterThan(0);
    });

    it('should provide financial aid optimization', () => {
      const result = calculateCollegeCost(testInputs);
      expect(result.analysis.aidOptimization).toBeDefined();
      expect(typeof result.analysis.aidOptimization).toBe('string');
    });
  });

  describe('Examples', () => {
    it('should have valid examples', () => {
      expect(CollegeCostCalculator.examples).toBeInstanceOf(Array);
      expect(CollegeCostCalculator.examples.length).toBeGreaterThan(0);

      CollegeCostCalculator.examples.forEach(example => {
        expect(example.title).toBeTruthy();
        expect(example.description).toBeTruthy();
        expect(example.inputs).toBeDefined();
        expect(example.expectedOutputs).toBeDefined();
      });
    });

    it('should calculate examples correctly', () => {
      CollegeCostCalculator.examples.forEach(example => {
        const result = calculateCollegeCost(example.inputs as any);
        expect(result).toBeDefined();
        expect(result.totalDegreeCost).toBeDefined();
        expect(result.requiredMonthlySavings).toBeDefined();
      });
    });
  });

  describe('Usage Instructions', () => {
    it('should have comprehensive usage instructions', () => {
      expect(CollegeCostCalculator.usageInstructions).toBeInstanceOf(Array);
      expect(CollegeCostCalculator.usageInstructions.length).toBeGreaterThan(0);

      CollegeCostCalculator.usageInstructions.forEach(instruction => {
        expect(typeof instruction).toBe('string');
        expect(instruction.length).toBeGreaterThan(0);
      });
    });
  });
});