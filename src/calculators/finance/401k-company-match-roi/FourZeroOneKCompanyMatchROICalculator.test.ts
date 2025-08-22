import { describe, it, expect } from 'vitest';
import { FourZeroOneKCompanyMatchROICalculator } from './FourZeroOneKCompanyMatchROICalculator';
import { calculate401kCompanyMatchROI, generate401kCompanyMatchROIAnalysis } from './formulas';
import { validateFourZeroOneKCompanyMatchROIInputs } from './validation';
import {
  validateCurrentAge,
  validateRetirementAge,
  validateCurrentSalary,
  validateEmployeeContribution,
  validateEmployerMatch,
  validateEmployerMatchLimit,
  validateMatchVestingSchedule,
  validateYearsOfService,
  validateSalaryGrowthRate,
  validateInvestmentReturn,
  validateInflationRate,
  validateTaxRate,
  validateRetirementTaxRate,
  validateAlternativeInvestmentReturn,
  validatePlanToStay,
  validateCompanyStability,
  validateJobSatisfaction,
  validateMarketConditions,
  validateAllFourZeroOneKCompanyMatchROIInputs
} from './quickValidation';

describe('FourZeroOneKCompanyMatchROICalculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(FourZeroOneKCompanyMatchROICalculator.id).toBe('401k-company-match-roi-calculator');
      expect(FourZeroOneKCompanyMatchROICalculator.name).toBe('401(k) Company Match ROI Calculator');
      expect(FourZeroOneKCompanyMatchROICalculator.category).toBe('finance');
      expect(FourZeroOneKCompanyMatchROICalculator.subcategory).toBe('retirement');
    });

    it('should have required methods', () => {
      expect(typeof FourZeroOneKCompanyMatchROICalculator.calculate).toBe('function');
      expect(typeof FourZeroOneKCompanyMatchROICalculator.generateReport).toBe('function');
    });

    it('should have inputs defined as an object', () => {
      expect(typeof FourZeroOneKCompanyMatchROICalculator.inputs).toBe('object');
      expect(Array.isArray(FourZeroOneKCompanyMatchROICalculator.inputs)).toBe(false);
    });

    it('should have outputs defined as an array', () => {
      expect(Array.isArray(FourZeroOneKCompanyMatchROICalculator.outputs)).toBe(true);
    });
  });

  describe('Input Validation', () => {
    it('should validate current age correctly', () => {
      expect(validateCurrentAge(30)).toEqual({ isValid: true });
      expect(validateCurrentAge(15)).toEqual({ 
        isValid: false, 
        error: 'Current age must be at least 18 years' 
      });
      expect(validateCurrentAge(85)).toEqual({ 
        isValid: false, 
        error: 'Current age cannot exceed 80 years' 
      });
      expect(validateCurrentAge('invalid')).toEqual({ 
        isValid: false, 
        error: 'Current age must be a valid number' 
      });
    });

    it('should validate retirement age correctly', () => {
      expect(validateRetirementAge(65, { currentAge: 30 })).toEqual({ isValid: true });
      expect(validateRetirementAge(40, { currentAge: 30 })).toEqual({ 
        isValid: false, 
        error: 'Retirement age must be at least 45 years' 
      });
      expect(validateRetirementAge(90, { currentAge: 30 })).toEqual({ 
        isValid: false, 
        error: 'Retirement age cannot exceed 85 years' 
      });
      expect(validateRetirementAge(25, { currentAge: 30 })).toEqual({ 
        isValid: false, 
        error: 'Retirement age must be greater than current age' 
      });
    });

    it('should validate current salary correctly', () => {
      expect(validateCurrentSalary(75000)).toEqual({ isValid: true });
      expect(validateCurrentSalary(5000)).toEqual({ 
        isValid: false, 
        error: 'Current salary must be at least $10,000' 
      });
      expect(validateCurrentSalary(2000000)).toEqual({ 
        isValid: false, 
        error: 'Current salary cannot exceed $1,000,000' 
      });
    });

    it('should validate employee contribution correctly', () => {
      expect(validateEmployeeContribution(6)).toEqual({ isValid: true });
      expect(validateEmployeeContribution(3)).toEqual({ 
        isValid: true, 
        warning: 'Low contribution rate - consider increasing to at least 6%' 
      });
      expect(validateEmployeeContribution(-5)).toEqual({ 
        isValid: false, 
        error: 'Employee contribution percentage cannot be negative' 
      });
      expect(validateEmployeeContribution(150)).toEqual({ 
        isValid: false, 
        error: 'Employee contribution percentage cannot exceed 100%' 
      });
    });

    it('should validate employer match correctly', () => {
      expect(validateEmployerMatch(3)).toEqual({ isValid: true });
      expect(validateEmployerMatch(0)).toEqual({ 
        isValid: true, 
        warning: 'No employer match - consider negotiating for better benefits' 
      });
      expect(validateEmployerMatch(-2)).toEqual({ 
        isValid: false, 
        error: 'Employer match percentage cannot be negative' 
      });
    });

    it('should validate match vesting schedule correctly', () => {
      expect(validateMatchVestingSchedule('immediate')).toEqual({ isValid: true });
      expect(validateMatchVestingSchedule('cliff-3')).toEqual({ isValid: true });
      expect(validateMatchVestingSchedule('graded-5')).toEqual({ isValid: true });
      expect(validateMatchVestingSchedule('invalid')).toEqual({ 
        isValid: false, 
        error: 'Vesting schedule must be a valid option' 
      });
      expect(validateMatchVestingSchedule('cliff-5', { yearsOfService: 2 })).toEqual({ 
        isValid: true, 
        warning: 'Long vesting schedule - significant value at risk if you leave early' 
      });
    });

    it('should validate years of service correctly', () => {
      expect(validateYearsOfService(2)).toEqual({ isValid: true });
      expect(validateYearsOfService(-1)).toEqual({ 
        isValid: false, 
        error: 'Years of service cannot be negative' 
      });
      expect(validateYearsOfService(60)).toEqual({ 
        isValid: false, 
        error: 'Years of service cannot exceed 50 years' 
      });
    });

    it('should validate investment return correctly', () => {
      expect(validateInvestmentReturn(7)).toEqual({ isValid: true });
      expect(validateInvestmentReturn(3)).toEqual({ 
        isValid: true, 
        warning: 'Low expected return - consider reviewing investment strategy' 
      });
      expect(validateInvestmentReturn(15)).toEqual({ 
        isValid: true, 
        warning: 'Very high expected return - consider more conservative estimate' 
      });
      expect(validateInvestmentReturn(0)).toEqual({ 
        isValid: false, 
        error: 'Expected investment return must be at least 1%' 
      });
    });

    it('should validate plan to stay correctly', () => {
      expect(validatePlanToStay(true)).toEqual({ isValid: true });
      expect(validatePlanToStay(false)).toEqual({ isValid: true });
      expect(validatePlanToStay('yes')).toEqual({ 
        isValid: false, 
        error: 'Plan to stay must be true or false' 
      });
    });

    it('should validate company stability correctly', () => {
      expect(validateCompanyStability('stable')).toEqual({ isValid: true });
      expect(validateCompanyStability('very-risky')).toEqual({ 
        isValid: true, 
        warning: 'High company risk - factor this into your vesting decisions' 
      });
      expect(validateCompanyStability('invalid')).toEqual({ 
        isValid: false, 
        error: 'Company stability must be a valid option' 
      });
    });

    it('should validate job satisfaction correctly', () => {
      expect(validateJobSatisfaction('high')).toEqual({ isValid: true });
      expect(validateJobSatisfaction('very-low')).toEqual({ 
        isValid: true, 
        warning: 'Low job satisfaction - consider this against financial benefits' 
      });
      expect(validateJobSatisfaction('invalid')).toEqual({ 
        isValid: false, 
        error: 'Job satisfaction must be a valid option' 
      });
    });

    it('should validate market conditions correctly', () => {
      expect(validateMarketConditions('good')).toEqual({ isValid: true });
      expect(validateMarketConditions('excellent')).toEqual({ isValid: true });
      expect(validateMarketConditions('invalid')).toEqual({ 
        isValid: false, 
        error: 'Market conditions must be a valid option' 
      });
    });
  });

  describe('Comprehensive Validation', () => {
    it('should validate all inputs correctly', () => {
      const validInputs = {
        currentAge: 30,
        retirementAge: 65,
        currentSalary: 75000,
        employeeContribution: 6,
        employerMatch: 3,
        employerMatchLimit: 6,
        matchVestingSchedule: 'graded-3',
        yearsOfService: 2,
        salaryGrowthRate: 3,
        investmentReturn: 7,
        inflationRate: 2.5,
        taxRate: 22,
        retirementTaxRate: 15,
        alternativeInvestmentReturn: 6,
        planToStay: true,
        companyStability: 'stable',
        jobSatisfaction: 'high',
        marketConditions: 'good'
      };

      const result = validateAllFourZeroOneKCompanyMatchROIInputs(validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should catch validation errors', () => {
      const invalidInputs = {
        currentAge: 15, // Too young
        retirementAge: 65,
        currentSalary: 75000,
        employeeContribution: 6,
        employerMatch: 3,
        employerMatchLimit: 6,
        matchVestingSchedule: 'graded-3',
        yearsOfService: 2,
        salaryGrowthRate: 3,
        investmentReturn: 7,
        inflationRate: 2.5,
        taxRate: 22,
        retirementTaxRate: 15,
        alternativeInvestmentReturn: 6,
        planToStay: true,
        companyStability: 'stable',
        jobSatisfaction: 'high',
        marketConditions: 'good'
      };

      const result = validateAllFourZeroOneKCompanyMatchROIInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Current age must be at least 18 years');
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate 401(k) company match ROI correctly', () => {
      const inputs = {
        currentAge: 30,
        retirementAge: 65,
        currentSalary: 75000,
        employeeContribution: 6,
        employerMatch: 3,
        employerMatchLimit: 6,
        matchVestingSchedule: 'graded-3',
        yearsOfService: 2,
        salaryGrowthRate: 3,
        investmentReturn: 7,
        inflationRate: 2.5,
        taxRate: 22,
        retirementTaxRate: 15,
        alternativeInvestmentReturn: 6,
        planToStay: true,
        companyStability: 'stable',
        jobSatisfaction: 'high',
        marketConditions: 'good'
      };

      const outputs = calculate401kCompanyMatchROI(inputs);

      expect(outputs).toHaveProperty('annualEmployerMatch');
      expect(outputs).toHaveProperty('effectiveMatchRate');
      expect(outputs).toHaveProperty('vestingPercentage');
      expect(outputs).toHaveProperty('vestedMatchAmount');
      expect(outputs).toHaveProperty('unvestedMatchAmount');
      expect(outputs).toHaveProperty('yearsToFullVesting');
      expect(outputs).toHaveProperty('totalProjectedMatch');
      expect(outputs).toHaveProperty('totalVestedMatch');
      expect(outputs).toHaveProperty('matchGrowthValue');
      expect(outputs).toHaveProperty('taxSavings');
      expect(outputs).toHaveProperty('matchROI');
      expect(outputs).toHaveProperty('stayRecommendation');
      expect(outputs).toHaveProperty('vestingRisk');
      expect(outputs).toHaveProperty('matchQuality');

      expect(typeof outputs.annualEmployerMatch).toBe('number');
      expect(typeof outputs.vestingPercentage).toBe('number');
      expect(typeof outputs.matchROI).toBe('number');
      expect(typeof outputs.stayRecommendation).toBe('string');
    });

    it('should handle different vesting scenarios', () => {
      const immediateVestingInputs = {
        currentAge: 30,
        retirementAge: 65,
        currentSalary: 75000,
        employeeContribution: 6,
        employerMatch: 3,
        employerMatchLimit: 6,
        matchVestingSchedule: 'immediate',
        yearsOfService: 2,
        salaryGrowthRate: 3,
        investmentReturn: 7,
        inflationRate: 2.5,
        taxRate: 22,
        retirementTaxRate: 15,
        alternativeInvestmentReturn: 6,
        planToStay: true,
        companyStability: 'stable',
        jobSatisfaction: 'high',
        marketConditions: 'good'
      };

      const cliffVestingInputs = {
        currentAge: 30,
        retirementAge: 65,
        currentSalary: 75000,
        employeeContribution: 6,
        employerMatch: 3,
        employerMatchLimit: 6,
        matchVestingSchedule: 'cliff-5',
        yearsOfService: 2,
        salaryGrowthRate: 3,
        investmentReturn: 7,
        inflationRate: 2.5,
        taxRate: 22,
        retirementTaxRate: 15,
        alternativeInvestmentReturn: 6,
        planToStay: true,
        companyStability: 'stable',
        jobSatisfaction: 'high',
        marketConditions: 'good'
      };

      const immediateOutputs = calculate401kCompanyMatchROI(immediateVestingInputs);
      const cliffOutputs = calculate401kCompanyMatchROI(cliffVestingInputs);

      expect(immediateOutputs.vestingPercentage).toBe(100);
      expect(cliffOutputs.vestingPercentage).toBe(0);
      expect(immediateOutputs.unvestedMatchAmount).toBe(0);
      expect(cliffOutputs.unvestedMatchAmount).toBeGreaterThan(0);
    });

    it('should calculate vesting percentages correctly', () => {
      // Test different vesting schedules
      const testCases = [
        { schedule: 'immediate', years: 0, expected: 100 },
        { schedule: 'cliff-1', years: 0, expected: 0 },
        { schedule: 'cliff-1', years: 1, expected: 100 },
        { schedule: 'cliff-3', years: 2, expected: 0 },
        { schedule: 'cliff-3', years: 3, expected: 100 },
        { schedule: 'graded-3', years: 1, expected: 33 },
        { schedule: 'graded-3', years: 2, expected: 66 },
        { schedule: 'graded-3', years: 3, expected: 100 },
        { schedule: 'graded-5', years: 2, expected: 40 },
        { schedule: 'graded-5', years: 5, expected: 100 }
      ];

      testCases.forEach(({ schedule, years, expected }) => {
        const inputs = {
          currentAge: 30,
          retirementAge: 65,
          currentSalary: 75000,
          employeeContribution: 6,
          employerMatch: 3,
          employerMatchLimit: 6,
          matchVestingSchedule: schedule,
          yearsOfService: years,
          salaryGrowthRate: 3,
          investmentReturn: 7,
          inflationRate: 2.5,
          taxRate: 22,
          retirementTaxRate: 15,
          alternativeInvestmentReturn: 6,
          planToStay: true,
          companyStability: 'stable',
          jobSatisfaction: 'high',
          marketConditions: 'good'
        };

        const outputs = calculate401kCompanyMatchROI(inputs);
        expect(outputs.vestingPercentage).toBe(expected);
      });
    });

    it('should handle different employer match scenarios', () => {
      const noMatchInputs = {
        currentAge: 30,
        retirementAge: 65,
        currentSalary: 75000,
        employeeContribution: 6,
        employerMatch: 0,
        employerMatchLimit: 6,
        matchVestingSchedule: 'immediate',
        yearsOfService: 2,
        salaryGrowthRate: 3,
        investmentReturn: 7,
        inflationRate: 2.5,
        taxRate: 22,
        retirementTaxRate: 15,
        alternativeInvestmentReturn: 6,
        planToStay: true,
        companyStability: 'stable',
        jobSatisfaction: 'high',
        marketConditions: 'good'
      };

      const highMatchInputs = {
        currentAge: 30,
        retirementAge: 65,
        currentSalary: 75000,
        employeeContribution: 6,
        employerMatch: 6,
        employerMatchLimit: 6,
        matchVestingSchedule: 'immediate',
        yearsOfService: 2,
        salaryGrowthRate: 3,
        investmentReturn: 7,
        inflationRate: 2.5,
        taxRate: 22,
        retirementTaxRate: 15,
        alternativeInvestmentReturn: 6,
        planToStay: true,
        companyStability: 'stable',
        jobSatisfaction: 'high',
        marketConditions: 'good'
      };

      const noMatchOutputs = calculate401kCompanyMatchROI(noMatchInputs);
      const highMatchOutputs = calculate401kCompanyMatchROI(highMatchInputs);

      expect(noMatchOutputs.annualEmployerMatch).toBe(0);
      expect(highMatchOutputs.annualEmployerMatch).toBeGreaterThan(0);
      expect(highMatchOutputs.matchQuality).toBeGreaterThan(noMatchOutputs.matchQuality);
    });

    it('should calculate risk scores correctly', () => {
      const lowRiskInputs = {
        currentAge: 30,
        retirementAge: 65,
        currentSalary: 75000,
        employeeContribution: 6,
        employerMatch: 3,
        employerMatchLimit: 6,
        matchVestingSchedule: 'immediate',
        yearsOfService: 2,
        salaryGrowthRate: 3,
        investmentReturn: 7,
        inflationRate: 2.5,
        taxRate: 22,
        retirementTaxRate: 15,
        alternativeInvestmentReturn: 6,
        planToStay: true,
        companyStability: 'very-stable',
        jobSatisfaction: 'very-high',
        marketConditions: 'poor'
      };

      const highRiskInputs = {
        currentAge: 30,
        retirementAge: 65,
        currentSalary: 75000,
        employeeContribution: 6,
        employerMatch: 3,
        employerMatchLimit: 6,
        matchVestingSchedule: 'cliff-5',
        yearsOfService: 1,
        salaryGrowthRate: 3,
        investmentReturn: 7,
        inflationRate: 2.5,
        taxRate: 22,
        retirementTaxRate: 15,
        alternativeInvestmentReturn: 6,
        planToStay: false,
        companyStability: 'very-risky',
        jobSatisfaction: 'very-low',
        marketConditions: 'excellent'
      };

      const lowRiskOutputs = calculate401kCompanyMatchROI(lowRiskInputs);
      const highRiskOutputs = calculate401kCompanyMatchROI(highRiskInputs);

      expect(lowRiskOutputs.vestingRisk).toBeLessThan(highRiskOutputs.vestingRisk);
    });
  });

  describe('Report Generation', () => {
    it('should generate comprehensive analysis report', () => {
      const inputs = {
        currentAge: 30,
        retirementAge: 65,
        currentSalary: 75000,
        employeeContribution: 6,
        employerMatch: 3,
        employerMatchLimit: 6,
        matchVestingSchedule: 'graded-3',
        yearsOfService: 2,
        salaryGrowthRate: 3,
        investmentReturn: 7,
        inflationRate: 2.5,
        taxRate: 22,
        retirementTaxRate: 15,
        alternativeInvestmentReturn: 6,
        planToStay: true,
        companyStability: 'stable',
        jobSatisfaction: 'high',
        marketConditions: 'good'
      };

      const outputs = calculate401kCompanyMatchROI(inputs);
      const report = generate401kCompanyMatchROIAnalysis(inputs, outputs);

      expect(report).toContain('401(k) Company Match ROI Analysis');
      expect(report).toContain('Summary');
      expect(report).toContain('Current Employer Match');
      expect(report).toContain('Vesting Status');
      expect(report).toContain('Long-term Projections');
      expect(report).toContain('Financial Analysis');
      expect(report).toContain('Tax Benefits');
      expect(report).toContain('Assessment Scores');
      expect(report).toContain('Key Insights');
      expect(report).toContain('Stay Recommendation');
      expect(report).toContain('Recommendations');

      expect(report).toContain(`$${outputs.annualEmployerMatch.toLocaleString()}`);
      expect(report).toContain(`${outputs.vestingPercentage}%`);
      expect(report).toContain(`${outputs.matchQuality}/100`);
    });
  });

  describe('Edge Cases', () => {
    it('should handle minimum values', () => {
      const inputs = {
        currentAge: 18,
        retirementAge: 45,
        currentSalary: 10000,
        employeeContribution: 1,
        employerMatch: 0,
        employerMatchLimit: 0,
        matchVestingSchedule: 'immediate',
        yearsOfService: 0,
        salaryGrowthRate: 0,
        investmentReturn: 1,
        inflationRate: 0,
        taxRate: 10,
        retirementTaxRate: 10,
        alternativeInvestmentReturn: 1,
        planToStay: false,
        companyStability: 'very-risky',
        jobSatisfaction: 'very-low',
        marketConditions: 'very-poor'
      };

      const outputs = calculate401kCompanyMatchROI(inputs);
      expect(outputs.annualEmployerMatch).toBe(0);
      expect(outputs.vestingPercentage).toBe(100);
      expect(outputs.matchQuality).toBeLessThan(50); // Should be low score
    });

    it('should handle maximum values', () => {
      const inputs = {
        currentAge: 80,
        retirementAge: 85,
        currentSalary: 1000000,
        employeeContribution: 100,
        employerMatch: 100,
        employerMatchLimit: 100,
        matchVestingSchedule: 'immediate',
        yearsOfService: 50,
        salaryGrowthRate: 20,
        investmentReturn: 15,
        inflationRate: 10,
        taxRate: 50,
        retirementTaxRate: 50,
        alternativeInvestmentReturn: 15,
        planToStay: true,
        companyStability: 'very-stable',
        jobSatisfaction: 'very-high',
        marketConditions: 'excellent'
      };

      const outputs = calculate401kCompanyMatchROI(inputs);
      expect(outputs.annualEmployerMatch).toBeGreaterThan(0);
      expect(outputs.vestingPercentage).toBe(100);
      expect(outputs.matchQuality).toBeGreaterThan(80); // Should be high score
    });

    it('should handle different company stability scenarios', () => {
      const stableCompanyInputs = {
        currentAge: 30,
        retirementAge: 65,
        currentSalary: 75000,
        employeeContribution: 6,
        employerMatch: 3,
        employerMatchLimit: 6,
        matchVestingSchedule: 'cliff-3',
        yearsOfService: 1,
        salaryGrowthRate: 3,
        investmentReturn: 7,
        inflationRate: 2.5,
        taxRate: 22,
        retirementTaxRate: 15,
        alternativeInvestmentReturn: 6,
        planToStay: true,
        companyStability: 'very-stable',
        jobSatisfaction: 'high',
        marketConditions: 'good'
      };

      const riskyCompanyInputs = {
        currentAge: 30,
        retirementAge: 65,
        currentSalary: 75000,
        employeeContribution: 6,
        employerMatch: 3,
        employerMatchLimit: 6,
        matchVestingSchedule: 'cliff-3',
        yearsOfService: 1,
        salaryGrowthRate: 3,
        investmentReturn: 7,
        inflationRate: 2.5,
        taxRate: 22,
        retirementTaxRate: 15,
        alternativeInvestmentReturn: 6,
        planToStay: true,
        companyStability: 'very-risky',
        jobSatisfaction: 'high',
        marketConditions: 'good'
      };

      const stableOutputs = calculate401kCompanyMatchROI(stableCompanyInputs);
      const riskyOutputs = calculate401kCompanyMatchROI(riskyCompanyInputs);

      expect(stableOutputs.vestingRisk).toBeLessThan(riskyOutputs.vestingRisk);
    });
  });

  describe('Integration Tests', () => {
    it('should work with calculator interface', () => {
      const inputs = {
        currentAge: 30,
        retirementAge: 65,
        currentSalary: 75000,
        employeeContribution: 6,
        employerMatch: 3,
        employerMatchLimit: 6,
        matchVestingSchedule: 'graded-3',
        yearsOfService: 2,
        salaryGrowthRate: 3,
        investmentReturn: 7,
        inflationRate: 2.5,
        taxRate: 22,
        retirementTaxRate: 15,
        alternativeInvestmentReturn: 6,
        planToStay: true,
        companyStability: 'stable',
        jobSatisfaction: 'high',
        marketConditions: 'good'
      };

      const outputs = FourZeroOneKCompanyMatchROICalculator.calculate(inputs);
      const report = FourZeroOneKCompanyMatchROICalculator.generateReport(inputs, outputs);

      expect(outputs).toBeDefined();
      expect(report).toBeDefined();
      expect(typeof report).toBe('string');
      expect(report.length).toBeGreaterThan(100);
    });
  });
});
