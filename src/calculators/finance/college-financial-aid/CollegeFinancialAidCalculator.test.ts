import { describe, it, expect } from 'vitest';
import { CollegeFinancialAidCalculator } from './CollegeFinancialAidCalculator';
import { calculateCollegeFinancialAid } from './formulas';
import { validateCollegeFinancialAidInputs } from './validation';

describe('CollegeFinancialAidCalculator', () => {
  const testInputs = {
    studentAge: 17,
    isDependent: true,
    maritalStatus: 'single' as const,
    hasChildren: false,
    numberOfChildren: 0,
    parentMaritalStatus: 'married' as const,
    numberOfParents: 2,
    hasSiblingInCollege: false,
    numberOfSiblingsInCollege: 0,
    studentIncome: 3000,
    spouseIncome: 0,
    parentIncome: 80000,
    parentSpouseIncome: 75000,
    studentAssets: 5000,
    parentAssets: 150000,
    homeEquity: 200000,
    gpa: 3.7,
    satScore: 1350,
    actScore: 0,
    costOfAttendance: 35000,
    otherScholarships: 2000,
    analysisYear: new Date().getFullYear(),
    inflationRate: 3,
    citizenshipStatus: 'us_citizen' as const,
    preferGrants: true,
    preferWorkStudy: false,
    willingToRelocate: true,
    willingToAttendTwoYear: false,
    currency: 'USD' as const
  };

  describe('Calculator Structure', () => {
    it('should have correct calculator properties', () => {
      expect(CollegeFinancialAidCalculator.id).toBe('college-financial-aid-calculator');
      expect(CollegeFinancialAidCalculator.title).toBe('College Financial Aid Calculator');
      expect(CollegeFinancialAidCalculator.category).toBe('finance');
      expect(CollegeFinancialAidCalculator.subcategory).toBe('Education');
      expect(CollegeFinancialAidCalculator.description).toBeTruthy();
      expect(CollegeFinancialAidCalculator.inputs).toBeInstanceOf(Array);
      expect(CollegeFinancialAidCalculator.outputs).toBeInstanceOf(Array);
    });

    it('should have required input fields', () => {
      const inputIds = CollegeFinancialAidCalculator.inputs.map(input => input.id);
      expect(inputIds).toContain('studentAge');
      expect(inputIds).toContain('costOfAttendance');
      expect(inputIds).toContain('gpa');
    });

    it('should have required output fields', () => {
      const outputIds = CollegeFinancialAidCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('totalExpectedAid');
      expect(outputIds).toContain('netCostAfterAid');
      expect(outputIds).toContain('analysis');
    });
  });

  describe('Formulas', () => {
    it('should calculate total expected aid', () => {
      const result = calculateCollegeFinancialAid(testInputs);
      expect(result.totalExpectedAid).toBeGreaterThan(0);
      expect(typeof result.totalExpectedAid).toBe('number');
    });

    it('should calculate net cost after aid', () => {
      const result = calculateCollegeFinancialAid(testInputs);
      expect(result.netCostAfterAid).toBeGreaterThan(0);
      expect(typeof result.netCostAfterAid).toBe('number');
      expect(result.netCostAfterAid).toBeLessThanOrEqual(testInputs.costOfAttendance);
    });

    it('should calculate aid gap', () => {
      const result = calculateCollegeFinancialAid(testInputs);
      expect(typeof result.aidGap).toBe('number');
    });

    it('should calculate loan burden', () => {
      const result = calculateCollegeFinancialAid(testInputs);
      expect(typeof result.loanBurden).toBe('number');
    });

    it('should calculate aid percentages', () => {
      const result = calculateCollegeFinancialAid(testInputs);
      expect(typeof result.grantPercentage).toBe('number');
      expect(typeof result.workStudyPercentage).toBe('number');
      expect(typeof result.loanPercentage).toBe('number');
      expect(result.grantPercentage + result.workStudyPercentage + result.loanPercentage).toBeCloseTo(100, 1);
    });
  });

  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const validation = validateCollegeFinancialAidInputs(testInputs);
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should reject invalid student age', () => {
      const invalidInputs = { ...testInputs, studentAge: 10 };
      const validation = validateCollegeFinancialAidInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Student age must be between 14 and 25');
    });

    it('should reject invalid cost of attendance', () => {
      const invalidInputs = { ...testInputs, costOfAttendance: -1000 };
      const validation = validateCollegeFinancialAidInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Cost of attendance must be greater than 0');
    });

    it('should reject invalid GPA', () => {
      const invalidInputs = { ...testInputs, gpa: 5.0 };
      const validation = validateCollegeFinancialAidInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('GPA must be between 0.0 and 4.0');
    });

    it('should reject invalid SAT score', () => {
      const invalidInputs = { ...testInputs, satScore: 1700 };
      const validation = validateCollegeFinancialAidInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('SAT score must be between 400 and 1600');
    });
  });

  describe('Edge Cases', () => {
    it('should handle independent student', () => {
      const edgeCaseInputs = { ...testInputs, isDependent: false, studentIncome: 25000 };
      const result = calculateCollegeFinancialAid(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.totalExpectedAid).toBeDefined();
    });

    it('should handle high income family', () => {
      const edgeCaseInputs = { ...testInputs, parentIncome: 200000, parentSpouseIncome: 200000 };
      const result = calculateCollegeFinancialAid(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.totalExpectedAid).toBeLessThan(testInputs.costOfAttendance);
    });

    it('should handle low income family', () => {
      const edgeCaseInputs = { ...testInputs, parentIncome: 25000, parentSpouseIncome: 0 };
      const result = calculateCollegeFinancialAid(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.totalExpectedAid).toBeGreaterThan(0);
    });

    it('should handle excellent academic performance', () => {
      const edgeCaseInputs = { ...testInputs, gpa: 4.0, satScore: 1550 };
      const result = calculateCollegeFinancialAid(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.totalExpectedAid).toBeGreaterThan(testInputs.costOfAttendance * 0.3);
    });

    it('should handle international student', () => {
      const edgeCaseInputs = { ...testInputs, citizenshipStatus: 'international' as const };
      const result = calculateCollegeFinancialAid(edgeCaseInputs);
      expect(result).toBeDefined();
    });
  });

  describe('Analysis', () => {
    it('should provide affordability assessment', () => {
      const result = calculateCollegeFinancialAid(testInputs);
      expect(result.analysis).toBeDefined();
      expect(result.analysis.affordabilityAssessment).toBeDefined();
      expect(result.analysis.recommendation).toBeDefined();
    });

    it('should provide aid optimization strategies', () => {
      const result = calculateCollegeFinancialAid(testInputs);
      expect(result.analysis.aidOptimization).toBeDefined();
      expect(typeof result.analysis.aidOptimization).toBe('string');
    });

    it('should provide next steps', () => {
      const result = calculateCollegeFinancialAid(testInputs);
      expect(result.analysis.nextSteps).toBeInstanceOf(Array);
      expect(result.analysis.nextSteps.length).toBeGreaterThan(0);
    });

    it('should provide action timeline', () => {
      const result = calculateCollegeFinancialAid(testInputs);
      expect(result.analysis.actionTimeline).toBeInstanceOf(Array);
      expect(result.analysis.actionTimeline.length).toBeGreaterThan(0);
    });
  });

  describe('Examples', () => {
    it('should have valid examples', () => {
      expect(CollegeFinancialAidCalculator.examples).toBeInstanceOf(Array);
      expect(CollegeFinancialAidCalculator.examples.length).toBeGreaterThan(0);

      CollegeFinancialAidCalculator.examples.forEach(example => {
        expect(example.title).toBeTruthy();
        expect(example.description).toBeTruthy();
        expect(example.inputs).toBeDefined();
        expect(example.expectedOutputs).toBeDefined();
      });
    });

    it('should calculate examples correctly', () => {
      CollegeFinancialAidCalculator.examples.forEach(example => {
        const result = calculateCollegeFinancialAid(example.inputs as any);
        expect(result).toBeDefined();
        expect(result.totalExpectedAid).toBeDefined();
        expect(result.netCostAfterAid).toBeDefined();
      });
    });
  });

  describe('Usage Instructions', () => {
    it('should have comprehensive usage instructions', () => {
      expect(CollegeFinancialAidCalculator.usageInstructions).toBeInstanceOf(Array);
      expect(CollegeFinancialAidCalculator.usageInstructions.length).toBeGreaterThan(0);

      CollegeFinancialAidCalculator.usageInstructions.forEach(instruction => {
        expect(typeof instruction).toBe('string');
        expect(instruction.length).toBeGreaterThan(0);
      });
    });
  });
});