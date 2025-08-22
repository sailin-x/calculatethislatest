import { describe, it, expect } from 'vitest';
import { FourZeroOneKCalculator } from './401kCalculator';
import { calculate401k, generate401kAnalysis } from './formulas';
import { validateFourZeroOneKInputs } from './validation';
import {
  validateCurrentAge,
  validateRetirementAge,
  validateCurrentSalary,
  validateCurrent401kBalance,
  validateEmployeeContribution,
  validateEmployerMatch,
  validateEmployerMatchLimit,
  validateSalaryGrowthRate,
  validateInvestmentReturn,
  validateInflationRate,
  validateContributionIncrease,
  validateCatchUpContribution,
  validateTaxRate,
  validateRetirementTaxRate,
  validateLifeExpectancy,
  validateSocialSecurityIncome,
  validateOtherRetirementIncome,
  validateAllFourZeroOneKInputs
} from './quickValidation';

describe('FourZeroOneKCalculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(FourZeroOneKCalculator.id).toBe('401k-calculator');
      expect(FourZeroOneKCalculator.name).toBe('401(k) Retirement Calculator');
      expect(FourZeroOneKCalculator.category).toBe('finance');
      expect(FourZeroOneKCalculator.subcategory).toBe('retirement');
    });

    it('should have required methods', () => {
      expect(typeof FourZeroOneKCalculator.calculate).toBe('function');
      expect(typeof FourZeroOneKCalculator.generateReport).toBe('function');
    });

    it('should have inputs defined as an object', () => {
      expect(typeof FourZeroOneKCalculator.inputs).toBe('object');
      expect(Array.isArray(FourZeroOneKCalculator.inputs)).toBe(false);
    });

    it('should have outputs defined as an array', () => {
      expect(Array.isArray(FourZeroOneKCalculator.outputs)).toBe(true);
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

    it('should validate current 401(k) balance correctly', () => {
      expect(validateCurrent401kBalance(25000)).toEqual({ isValid: true });
      expect(validateCurrent401kBalance(-1000)).toEqual({ 
        isValid: false, 
        error: 'Current 401(k) balance cannot be negative' 
      });
      expect(validateCurrent401kBalance(15000000)).toEqual({ 
        isValid: false, 
        error: 'Current 401(k) balance cannot exceed $10,000,000' 
      });
    });

    it('should validate employee contribution correctly', () => {
      expect(validateEmployeeContribution(6, { currentSalary: 75000, currentAge: 30 })).toEqual({ isValid: true });
      expect(validateEmployeeContribution(3, { currentSalary: 75000, currentAge: 30 })).toEqual({ 
        isValid: true, 
        warning: 'Low contribution rate - consider increasing to at least 6%' 
      });
      expect(validateEmployeeContribution(-5, { currentSalary: 75000, currentAge: 30 })).toEqual({ 
        isValid: false, 
        error: 'Employee contribution percentage cannot be negative' 
      });
      expect(validateEmployeeContribution(150, { currentSalary: 75000, currentAge: 30 })).toEqual({ 
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

    it('should validate catch-up contribution correctly', () => {
      expect(validateCatchUpContribution(true, { currentAge: 55 })).toEqual({ isValid: true });
      expect(validateCatchUpContribution(false, { currentAge: 55 })).toEqual({ 
        isValid: true, 
        warning: 'Consider catch-up contributions to maximize retirement savings' 
      });
      expect(validateCatchUpContribution('yes', { currentAge: 55 })).toEqual({ 
        isValid: false, 
        error: 'Catch-up contribution must be true or false' 
      });
    });

    it('should validate tax rate correctly', () => {
      expect(validateTaxRate(22)).toEqual({ isValid: true });
      expect(validateTaxRate(5)).toEqual({ 
        isValid: false, 
        error: 'Current tax rate must be at least 10%' 
      });
      expect(validateTaxRate(60)).toEqual({ 
        isValid: false, 
        error: 'Current tax rate cannot exceed 50%' 
      });
    });

    it('should validate life expectancy correctly', () => {
      expect(validateLifeExpectancy(85, { retirementAge: 65 })).toEqual({ isValid: true });
      expect(validateLifeExpectancy(65, { retirementAge: 65 })).toEqual({ 
        isValid: true, 
        warning: 'Short retirement period - consider longer life expectancy' 
      });
      expect(validateLifeExpectancy(60)).toEqual({ 
        isValid: false, 
        error: 'Life expectancy must be at least 70 years' 
      });
    });
  });

  describe('Comprehensive Validation', () => {
    it('should validate all inputs correctly', () => {
      const validInputs = {
        currentAge: 30,
        retirementAge: 65,
        currentSalary: 75000,
        current401kBalance: 25000,
        employeeContribution: 6,
        employerMatch: 3,
        employerMatchLimit: 6,
        salaryGrowthRate: 3,
        investmentReturn: 7,
        inflationRate: 2.5,
        contributionIncrease: 0.5,
        catchUpContribution: false,
        taxRate: 22,
        retirementTaxRate: 15,
        lifeExpectancy: 85,
        socialSecurityIncome: 25000,
        otherRetirementIncome: 0
      };

      const result = validateAllFourZeroOneKInputs(validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should catch validation errors', () => {
      const invalidInputs = {
        currentAge: 15, // Too young
        retirementAge: 65,
        currentSalary: 75000,
        current401kBalance: 25000,
        employeeContribution: 6,
        employerMatch: 3,
        employerMatchLimit: 6,
        salaryGrowthRate: 3,
        investmentReturn: 7,
        inflationRate: 2.5,
        contributionIncrease: 0.5,
        catchUpContribution: false,
        taxRate: 22,
        retirementTaxRate: 15,
        lifeExpectancy: 85,
        socialSecurityIncome: 25000,
        otherRetirementIncome: 0
      };

      const result = validateAllFourZeroOneKInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Current age must be at least 18 years');
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate 401(k) correctly', () => {
      const inputs = {
        currentAge: 30,
        retirementAge: 65,
        currentSalary: 75000,
        current401kBalance: 25000,
        employeeContribution: 6,
        employerMatch: 3,
        employerMatchLimit: 6,
        salaryGrowthRate: 3,
        investmentReturn: 7,
        inflationRate: 2.5,
        contributionIncrease: 0.5,
        catchUpContribution: false,
        taxRate: 22,
        retirementTaxRate: 15,
        lifeExpectancy: 85,
        socialSecurityIncome: 25000,
        otherRetirementIncome: 0
      };

      const outputs = calculate401k(inputs);

      expect(outputs).toHaveProperty('totalContributions');
      expect(outputs).toHaveProperty('totalEmployerMatch');
      expect(outputs).toHaveProperty('total401kBalance');
      expect(outputs).toHaveProperty('annualContribution');
      expect(outputs).toHaveProperty('annualEmployerMatch');
      expect(outputs).toHaveProperty('taxSavings');
      expect(outputs).toHaveProperty('monthlyRetirementIncome');
      expect(outputs).toHaveProperty('replacementRatio');
      expect(outputs).toHaveProperty('retirementScore');
      expect(outputs).toHaveProperty('savingsScore');
      expect(outputs).toHaveProperty('investmentScore');
      expect(outputs).toHaveProperty('taxEfficiencyScore');

      expect(typeof outputs.totalContributions).toBe('number');
      expect(typeof outputs.total401kBalance).toBe('number');
      expect(typeof outputs.replacementRatio).toBe('number');
      expect(typeof outputs.retirementScore).toBe('number');
    });

    it('should handle different contribution scenarios', () => {
      const lowContributionInputs = {
        currentAge: 30,
        retirementAge: 65,
        currentSalary: 75000,
        current401kBalance: 25000,
        employeeContribution: 3,
        employerMatch: 0,
        employerMatchLimit: 6,
        salaryGrowthRate: 3,
        investmentReturn: 7,
        inflationRate: 2.5,
        contributionIncrease: 0,
        catchUpContribution: false,
        taxRate: 22,
        retirementTaxRate: 15,
        lifeExpectancy: 85,
        socialSecurityIncome: 25000,
        otherRetirementIncome: 0
      };

      const highContributionInputs = {
        currentAge: 30,
        retirementAge: 65,
        currentSalary: 75000,
        current401kBalance: 25000,
        employeeContribution: 15,
        employerMatch: 6,
        employerMatchLimit: 6,
        salaryGrowthRate: 3,
        investmentReturn: 7,
        inflationRate: 2.5,
        contributionIncrease: 1,
        catchUpContribution: true,
        taxRate: 22,
        retirementTaxRate: 15,
        lifeExpectancy: 85,
        socialSecurityIncome: 25000,
        otherRetirementIncome: 0
      };

      const lowOutputs = calculate401k(lowContributionInputs);
      const highOutputs = calculate401k(highContributionInputs);

      expect(highOutputs.total401kBalance).toBeGreaterThan(lowOutputs.total401kBalance);
      expect(highOutputs.replacementRatio).toBeGreaterThan(lowOutputs.replacementRatio);
      expect(highOutputs.retirementScore).toBeGreaterThan(lowOutputs.retirementScore);
    });

    it('should calculate contribution limits correctly', () => {
      const youngInputs = {
        currentAge: 30,
        retirementAge: 65,
        currentSalary: 75000,
        current401kBalance: 25000,
        employeeContribution: 6,
        employerMatch: 3,
        employerMatchLimit: 6,
        salaryGrowthRate: 3,
        investmentReturn: 7,
        inflationRate: 2.5,
        contributionIncrease: 0.5,
        catchUpContribution: false,
        taxRate: 22,
        retirementTaxRate: 15,
        lifeExpectancy: 85,
        socialSecurityIncome: 25000,
        otherRetirementIncome: 0
      };

      const olderInputs = {
        currentAge: 55,
        retirementAge: 65,
        currentSalary: 75000,
        current401kBalance: 250000,
        employeeContribution: 6,
        employerMatch: 3,
        employerMatchLimit: 6,
        salaryGrowthRate: 3,
        investmentReturn: 7,
        inflationRate: 2.5,
        contributionIncrease: 0.5,
        catchUpContribution: true,
        taxRate: 22,
        retirementTaxRate: 15,
        lifeExpectancy: 85,
        socialSecurityIncome: 25000,
        otherRetirementIncome: 0
      };

      const youngOutputs = calculate401k(youngInputs);
      const olderOutputs = calculate401k(olderInputs);

      expect(youngOutputs.maxContribution).toBe(22500); // 2024 limit
      expect(olderOutputs.maxContribution).toBe(30000); // 2024 limit with catch-up
      expect(olderOutputs.catchUpAmount).toBe(7500); // 2024 catch-up limit
    });

    it('should calculate tax benefits correctly', () => {
      const inputs = {
        currentAge: 30,
        retirementAge: 65,
        currentSalary: 75000,
        current401kBalance: 25000,
        employeeContribution: 6,
        employerMatch: 3,
        employerMatchLimit: 6,
        salaryGrowthRate: 3,
        investmentReturn: 7,
        inflationRate: 2.5,
        contributionIncrease: 0.5,
        catchUpContribution: false,
        taxRate: 22,
        retirementTaxRate: 15,
        lifeExpectancy: 85,
        socialSecurityIncome: 25000,
        otherRetirementIncome: 0
      };

      const outputs = calculate401k(inputs);

      expect(outputs.taxSavings).toBeGreaterThan(0);
      expect(outputs.totalTaxSavings).toBeGreaterThan(outputs.taxSavings);
      expect(outputs.taxEfficiencyScore).toBeGreaterThan(0);
    });
  });

  describe('Report Generation', () => {
    it('should generate comprehensive analysis report', () => {
      const inputs = {
        currentAge: 30,
        retirementAge: 65,
        currentSalary: 75000,
        current401kBalance: 25000,
        employeeContribution: 6,
        employerMatch: 3,
        employerMatchLimit: 6,
        salaryGrowthRate: 3,
        investmentReturn: 7,
        inflationRate: 2.5,
        contributionIncrease: 0.5,
        catchUpContribution: false,
        taxRate: 22,
        retirementTaxRate: 15,
        lifeExpectancy: 85,
        socialSecurityIncome: 25000,
        otherRetirementIncome: 0
      };

      const outputs = calculate401k(inputs);
      const report = generate401kAnalysis(inputs, outputs);

      expect(report).toContain('401(k) Retirement Analysis');
      expect(report).toContain('Summary');
      expect(report).toContain('Current Contributions');
      expect(report).toContain('Projected Results');
      expect(report).toContain('Tax Benefits');
      expect(report).toContain('Retirement Income');
      expect(report).toContain('Contribution Limits');
      expect(report).toContain('Assessment Scores');
      expect(report).toContain('Key Insights');
      expect(report).toContain('Recommendations');

      expect(report).toContain(`$${outputs.total401kBalance.toLocaleString()}`);
      expect(report).toContain(`${outputs.replacementRatio}%`);
      expect(report).toContain(`${outputs.retirementScore}/100`);
    });
  });

  describe('Edge Cases', () => {
    it('should handle minimum values', () => {
      const inputs = {
        currentAge: 18,
        retirementAge: 45,
        currentSalary: 10000,
        current401kBalance: 0,
        employeeContribution: 1,
        employerMatch: 0,
        employerMatchLimit: 0,
        salaryGrowthRate: 0,
        investmentReturn: 1,
        inflationRate: 0,
        contributionIncrease: 0,
        catchUpContribution: false,
        taxRate: 10,
        retirementTaxRate: 10,
        lifeExpectancy: 70,
        socialSecurityIncome: 0,
        otherRetirementIncome: 0
      };

      const outputs = calculate401k(inputs);
      expect(outputs.total401kBalance).toBeGreaterThan(0);
      expect(outputs.retirementScore).toBeLessThan(50); // Should be low score
    });

    it('should handle maximum values', () => {
      const inputs = {
        currentAge: 80,
        retirementAge: 85,
        currentSalary: 1000000,
        current401kBalance: 10000000,
        employeeContribution: 100,
        employerMatch: 100,
        employerMatchLimit: 100,
        salaryGrowthRate: 20,
        investmentReturn: 15,
        inflationRate: 10,
        contributionIncrease: 5,
        catchUpContribution: true,
        taxRate: 50,
        retirementTaxRate: 50,
        lifeExpectancy: 100,
        socialSecurityIncome: 100000,
        otherRetirementIncome: 500000
      };

      const outputs = calculate401k(inputs);
      expect(outputs.total401kBalance).toBeGreaterThan(0);
      expect(outputs.replacementRatio).toBeGreaterThan(100); // Should be very high
    });

    it('should handle catch-up contributions', () => {
      const inputs = {
        currentAge: 55,
        retirementAge: 65,
        currentSalary: 100000,
        current401kBalance: 500000,
        employeeContribution: 15,
        employerMatch: 6,
        employerMatchLimit: 6,
        salaryGrowthRate: 3,
        investmentReturn: 7,
        inflationRate: 2.5,
        contributionIncrease: 0,
        catchUpContribution: true,
        taxRate: 24,
        retirementTaxRate: 15,
        lifeExpectancy: 85,
        socialSecurityIncome: 30000,
        otherRetirementIncome: 0
      };

      const outputs = calculate401k(inputs);
      expect(outputs.catchUpAmount).toBe(7500);
      expect(outputs.maxContribution).toBe(30000);
      expect(outputs.savingsScore).toBeGreaterThan(70); // Should be good score
    });
  });

  describe('Integration Tests', () => {
    it('should work with calculator interface', () => {
      const inputs = {
        currentAge: 30,
        retirementAge: 65,
        currentSalary: 75000,
        current401kBalance: 25000,
        employeeContribution: 6,
        employerMatch: 3,
        employerMatchLimit: 6,
        salaryGrowthRate: 3,
        investmentReturn: 7,
        inflationRate: 2.5,
        contributionIncrease: 0.5,
        catchUpContribution: false,
        taxRate: 22,
        retirementTaxRate: 15,
        lifeExpectancy: 85,
        socialSecurityIncome: 25000,
        otherRetirementIncome: 0
      };

      const outputs = FourZeroOneKCalculator.calculate(inputs);
      const report = FourZeroOneKCalculator.generateReport(inputs, outputs);

      expect(outputs).toBeDefined();
      expect(report).toBeDefined();
      expect(typeof report).toBe('string');
      expect(report.length).toBeGreaterThan(100);
    });
  });
});
