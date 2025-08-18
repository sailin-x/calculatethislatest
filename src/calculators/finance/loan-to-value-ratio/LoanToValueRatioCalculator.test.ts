import { describe, it, expect } from 'vitest';
import { calculateLoanToValueRatio } from './formulas';
import { validateLoanToValueRatioInputs } from './validation';
import { quickValidateAllInputs } from './quickValidation';

describe('Loan-to-Value (LTV) Ratio Calculator', () => {
  describe('Core LTV Calculations', () => {
    it('should calculate basic LTV ratio correctly', () => {
      const inputs = {
        propertyValue: 500000,
        loanAmount: 400000
      };
      
      const result = calculateLoanToValueRatio(inputs);
      
      expect(result.ltvRatio).toBe(80);
      expect(result.equityAmount).toBe(100000);
      expect(result.equityPercentage).toBe(20);
    });

    it('should handle high LTV ratio scenarios', () => {
      const inputs = {
        propertyValue: 300000,
        loanAmount: 285000
      };
      
      const result = calculateLoanToValueRatio(inputs);
      
      expect(result.ltvRatio).toBe(95);
      expect(result.equityAmount).toBe(15000);
      expect(result.equityPercentage).toBe(5);
    });

    it('should handle low LTV ratio scenarios', () => {
      const inputs = {
        propertyValue: 750000,
        loanAmount: 375000
      };
      
      const result = calculateLoanToValueRatio(inputs);
      
      expect(result.ltvRatio).toBe(50);
      expect(result.equityAmount).toBe(375000);
      expect(result.equityPercentage).toBe(50);
    });

    it('should round LTV ratio to 2 decimal places', () => {
      const inputs = {
        propertyValue: 333333,
        loanAmount: 250000
      };
      
      const result = calculateLoanToValueRatio(inputs);
      
      expect(result.ltvRatio).toBe(75.01);
    });
  });

  describe('PMI Calculations', () => {
    it('should not require PMI for LTV <= 80% on conventional loans', () => {
      const inputs = {
        propertyValue: 500000,
        loanAmount: 400000,
        loanType: 'Conventional',
        occupancyType: 'Primary Residence'
      };
      
      const result = calculateLoanToValueRatio(inputs);
      
      expect(result.pmiRequired).toBe(false);
      expect(result.pmiCost).toBe(0);
    });

    it('should require PMI for LTV > 80% on conventional loans', () => {
      const inputs = {
        propertyValue: 500000,
        loanAmount: 425000,
        loanType: 'Conventional',
        occupancyType: 'Primary Residence'
      };
      
      const result = calculateLoanToValueRatio(inputs);
      
      expect(result.pmiRequired).toBe(true);
      expect(result.pmiCost).toBeGreaterThan(0);
    });

    it('should require PMI for LTV > 75% on investment properties', () => {
      const inputs = {
        propertyValue: 500000,
        loanAmount: 380000,
        loanType: 'Conventional',
        occupancyType: 'Investment Property'
      };
      
      const result = calculateLoanToValueRatio(inputs);
      
      expect(result.pmiRequired).toBe(true);
    });

    it('should require FHA MIP for LTV > 78%', () => {
      const inputs = {
        propertyValue: 300000,
        loanAmount: 240000,
        loanType: 'FHA',
        occupancyType: 'Primary Residence'
      };
      
      const result = calculateLoanToValueRatio(inputs);
      
      expect(result.pmiRequired).toBe(true);
      expect(result.pmiCost).toBeGreaterThan(0);
    });

    it('should not require PMI for VA loans', () => {
      const inputs = {
        propertyValue: 500000,
        loanAmount: 500000,
        loanType: 'VA',
        occupancyType: 'Primary Residence'
      };
      
      const result = calculateLoanToValueRatio(inputs);
      
      expect(result.pmiRequired).toBe(false);
      expect(result.pmiCost).toBe(0);
    });
  });

  describe('Risk Assessment', () => {
    it('should assess low risk for LTV <= 70%', () => {
      const inputs = {
        propertyValue: 500000,
        loanAmount: 350000,
        creditScore: 750
      };
      
      const result = calculateLoanToValueRatio(inputs);
      
      expect(result.riskAssessment).toBe('Low Risk');
    });

    it('should assess moderate risk for LTV 80-90%', () => {
      const inputs = {
        propertyValue: 500000,
        loanAmount: 425000,
        creditScore: 720
      };
      
      const result = calculateLoanToValueRatio(inputs);
      
      expect(result.riskAssessment).toBe('Moderate Risk');
    });

    it('should assess high risk for LTV > 90%', () => {
      const inputs = {
        propertyValue: 500000,
        loanAmount: 475000,
        creditScore: 680
      };
      
      const result = calculateLoanToValueRatio(inputs);
      
      expect(result.riskAssessment).toBe('Higher Risk');
    });

    it('should assess higher risk for investment properties', () => {
      const inputs = {
        propertyValue: 500000,
        loanAmount: 400000,
        occupancyType: 'Investment Property',
        creditScore: 750
      };
      
      const result = calculateLoanToValueRatio(inputs);
      
      expect(result.riskAssessment).toBe('Moderate Risk');
    });

    it('should assess higher risk for low credit scores', () => {
      const inputs = {
        propertyValue: 500000,
        loanAmount: 400000,
        creditScore: 620
      };
      
      const result = calculateLoanToValueRatio(inputs);
      
      expect(result.riskAssessment).toBe('Moderate Risk');
    });
  });

  describe('Lending Score Calculation', () => {
    it('should calculate high lending score for excellent profile', () => {
      const inputs = {
        propertyValue: 500000,
        loanAmount: 350000,
        creditScore: 780,
        debtToIncomeRatio: 28,
        reserves: 12,
        propertyCondition: 'Excellent',
        marketCondition: 'Strong',
        occupancyType: 'Primary Residence'
      };
      
      const result = calculateLoanToValueRatio(inputs);
      
      expect(result.lendingScore).toBeGreaterThan(85);
    });

    it('should calculate lower lending score for high LTV', () => {
      const inputs = {
        propertyValue: 500000,
        loanAmount: 475000,
        creditScore: 750
      };
      
      const result = calculateLoanToValueRatio(inputs);
      
      expect(result.lendingScore).toBeLessThan(75);
    });

    it('should calculate lower lending score for low credit', () => {
      const inputs = {
        propertyValue: 500000,
        loanAmount: 400000,
        creditScore: 620
      };
      
      const result = calculateLoanToValueRatio(inputs);
      
      expect(result.lendingScore).toBeLessThan(75);
    });

    it('should calculate lower lending score for high DTI', () => {
      const inputs = {
        propertyValue: 500000,
        loanAmount: 400000,
        debtToIncomeRatio: 50
      };
      
      const result = calculateLoanToValueRatio(inputs);
      
      expect(result.lendingScore).toBeLessThan(80);
    });
  });

  describe('Approval Probability', () => {
    it('should calculate high approval probability for excellent profile', () => {
      const inputs = {
        propertyValue: 500000,
        loanAmount: 350000,
        creditScore: 780,
        debtToIncomeRatio: 28,
        loanType: 'Conventional',
        occupancyType: 'Primary Residence'
      };
      
      const result = calculateLoanToValueRatio(inputs);
      
      expect(result.approvalProbability).toBeGreaterThan(90);
    });

    it('should calculate lower approval probability for FHA loans', () => {
      const inputs = {
        propertyValue: 500000,
        loanAmount: 400000,
        creditScore: 750,
        loanType: 'FHA'
      };
      
      const result = calculateLoanToValueRatio(inputs);
      
      expect(result.approvalProbability).toBeGreaterThan(result.lendingScore);
    });

    it('should calculate lower approval probability for hard money loans', () => {
      const inputs = {
        propertyValue: 500000,
        loanAmount: 350000,
        creditScore: 750,
        loanType: 'Hard Money'
      };
      
      const result = calculateLoanToValueRatio(inputs);
      
      expect(result.approvalProbability).toBeLessThan(result.lendingScore);
    });
  });

  describe('Maximum Loan Amount', () => {
    it('should calculate max loan amount for conventional loans', () => {
      const inputs = {
        propertyValue: 500000,
        loanAmount: 400000,
        loanType: 'Conventional',
        occupancyType: 'Primary Residence'
      };
      
      const result = calculateLoanToValueRatio(inputs);
      
      expect(result.maxLoanAmount).toBe(400000); // 80% of 500000
    });

    it('should calculate max loan amount for FHA loans', () => {
      const inputs = {
        propertyValue: 500000,
        loanAmount: 400000,
        loanType: 'FHA',
        occupancyType: 'Primary Residence'
      };
      
      const result = calculateLoanToValueRatio(inputs);
      
      expect(result.maxLoanAmount).toBe(482500); // 96.5% of 500000
    });

    it('should calculate max loan amount for investment properties', () => {
      const inputs = {
        propertyValue: 500000,
        loanAmount: 400000,
        loanType: 'Conventional',
        occupancyType: 'Investment Property'
      };
      
      const result = calculateLoanToValueRatio(inputs);
      
      expect(result.maxLoanAmount).toBe(375000); // 75% of 500000
    });
  });

  describe('Recommendations', () => {
    it('should recommend larger down payment for high LTV', () => {
      const inputs = {
        propertyValue: 500000,
        loanAmount: 475000
      };
      
      const result = calculateLoanToValueRatio(inputs);
      
      expect(result.recommendations).toContain('larger down payment');
    });

    it('should recommend PMI elimination for LTV > 80%', () => {
      const inputs = {
        propertyValue: 500000,
        loanAmount: 425000
      };
      
      const result = calculateLoanToValueRatio(inputs);
      
      expect(result.recommendations).toContain('PMI');
    });

    it('should recommend credit improvement for low scores', () => {
      const inputs = {
        propertyValue: 500000,
        loanAmount: 400000,
        creditScore: 680
      };
      
      const result = calculateLoanToValueRatio(inputs);
      
      expect(result.recommendations).toContain('credit score');
    });
  });

  describe('Input Validation', () => {
    it('should validate required fields', () => {
      const inputs = {
        propertyValue: 0,
        loanAmount: undefined
      };
      
      const errors = validateLoanToValueRatioInputs(inputs as any);
      
      expect(errors).toContain('Property value is required');
      expect(errors).toContain('Loan amount is required');
    });

    it('should validate LTV ratio limits', () => {
      const inputs = {
        propertyValue: 500000,
        loanAmount: 600000,
        loanType: 'Conventional'
      };
      
      const errors = validateLoanToValueRatioInputs(inputs);
      
      expect(errors).toContain('Loan amount cannot exceed property value for conventional loans');
    });

    it('should validate FHA LTV limits', () => {
      const inputs = {
        propertyValue: 500000,
        loanAmount: 485000,
        loanType: 'FHA'
      };
      
      const errors = validateLoanToValueRatioInputs(inputs);
      
      expect(errors).toContain('FHA loans have a maximum LTV ratio of 96.5%');
    });

    it('should validate investment property LTV limits', () => {
      const inputs = {
        propertyValue: 500000,
        loanAmount: 380000,
        loanType: 'Conventional',
        occupancyType: 'Investment Property'
      };
      
      const errors = validateLoanToValueRatioInputs(inputs);
      
      expect(errors).toContain('Investment properties typically have a maximum LTV ratio of 75%');
    });
  });

  describe('Quick Validation', () => {
    it('should provide real-time validation for property value', () => {
      const results = quickValidateAllInputs({ propertyValue: 5000 });
      
      const propertyValueResult = results.find(r => r.message?.includes('Property value'));
      expect(propertyValueResult?.severity).toBe('warning');
    });

    it('should provide real-time validation for loan amount', () => {
      const results = quickValidateAllInputs({ 
        propertyValue: 500000,
        loanAmount: 600000 
      });
      
      const loanAmountResult = results.find(r => r.message?.includes('Loan amount cannot exceed'));
      expect(loanAmountResult?.severity).toBe('error');
    });

    it('should provide real-time validation for LTV ratio', () => {
      const results = quickValidateAllInputs({ 
        propertyValue: 500000,
        loanAmount: 475000 
      });
      
      const ltvResult = results.find(r => r.message?.includes('Very high LTV ratio'));
      expect(ltvResult?.severity).toBe('warning');
    });

    it('should provide real-time validation for credit score', () => {
      const results = quickValidateAllInputs({ creditScore: 600 });
      
      const creditResult = results.find(r => r.message?.includes('Fair credit score'));
      expect(creditResult?.severity).toBe('warning');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero property value', () => {
      const inputs = {
        propertyValue: 0,
        loanAmount: 100000
      };
      
      expect(() => calculateLoanToValueRatio(inputs)).toThrow();
    });

    it('should handle very large numbers', () => {
      const inputs = {
        propertyValue: 10000000,
        loanAmount: 8000000
      };
      
      const result = calculateLoanToValueRatio(inputs);
      
      expect(result.ltvRatio).toBe(80);
      expect(result.equityAmount).toBe(2000000);
    });

    it('should handle very small numbers', () => {
      const inputs = {
        propertyValue: 100000,
        loanAmount: 80000
      };
      
      const result = calculateLoanToValueRatio(inputs);
      
      expect(result.ltvRatio).toBe(80);
      expect(result.equityAmount).toBe(20000);
    });

    it('should handle missing optional fields', () => {
      const inputs = {
        propertyValue: 500000,
        loanAmount: 400000
      };
      
      const result = calculateLoanToValueRatio(inputs);
      
      expect(result.ltvRatio).toBe(80);
      expect(result.riskAssessment).toBe('Moderate Risk');
    });
  });

  describe('Integration Tests', () => {
    it('should provide complete analysis for conventional home purchase', () => {
      const inputs = {
        propertyValue: 500000,
        loanAmount: 400000,
        downPayment: 100000,
        propertyType: 'Single Family Home',
        loanType: 'Conventional',
        occupancyType: 'Primary Residence',
        creditScore: 750,
        debtToIncomeRatio: 36,
        reserves: 6,
        marketCondition: 'Stable',
        location: 'Suburban',
        propertyAge: 15,
        propertyCondition: 'Good',
        appraisalType: 'Full Appraisal',
        lenderType: 'Commercial Bank',
        loanPurpose: 'Purchase',
        loanTerm: 30,
        interestRate: 6.5,
        points: 0,
        closingCosts: 8000
      };
      
      const result = calculateLoanToValueRatio(inputs);
      
      expect(result.ltvRatio).toBe(80);
      expect(result.equityAmount).toBe(100000);
      expect(result.equityPercentage).toBe(20);
      expect(result.pmiRequired).toBe(false);
      expect(result.pmiCost).toBe(0);
      expect(result.riskAssessment).toBe('Moderate Risk');
      expect(result.lendingScore).toBeGreaterThan(70);
      expect(result.approvalProbability).toBeGreaterThan(80);
      expect(result.recommendations).toBeTruthy();
      expect(result.ltvAnalysis).toBeTruthy();
    });

    it('should provide complete analysis for FHA loan', () => {
      const inputs = {
        propertyValue: 300000,
        loanAmount: 285000,
        downPayment: 15000,
        propertyType: 'Single Family Home',
        loanType: 'FHA',
        occupancyType: 'Primary Residence',
        creditScore: 680,
        debtToIncomeRatio: 43,
        reserves: 3,
        marketCondition: 'Stable',
        location: 'Suburban',
        propertyAge: 10,
        propertyCondition: 'Good',
        appraisalType: 'Full Appraisal',
        lenderType: 'Mortgage Bank',
        loanPurpose: 'Purchase',
        loanTerm: 30,
        interestRate: 6.8,
        points: 0,
        closingCosts: 6000
      };
      
      const result = calculateLoanToValueRatio(inputs);
      
      expect(result.ltvRatio).toBe(95);
      expect(result.equityAmount).toBe(15000);
      expect(result.equityPercentage).toBe(5);
      expect(result.pmiRequired).toBe(true);
      expect(result.pmiCost).toBeGreaterThan(0);
      expect(result.riskAssessment).toBe('Higher Risk');
      expect(result.lendingScore).toBeLessThan(70);
      expect(result.approvalProbability).toBeLessThan(80);
    });
  });
});