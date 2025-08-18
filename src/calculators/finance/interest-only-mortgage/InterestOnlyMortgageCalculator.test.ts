import { describe, it, expect } from 'vitest';
import { InterestOnlyMortgageCalculator } from './InterestOnlyMortgageCalculator';
import { calculateInterestOnlyMortgage } from './formulas';
import { validateInterestOnlyMortgageInputs } from './validation';
import { validateAllInterestOnlyMortgageInputs } from './quickValidation';

describe('Interest-Only Mortgage Calculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(InterestOnlyMortgageCalculator.id).toBe('interest-only-mortgage-calculator');
      expect(InterestOnlyMortgageCalculator.name).toBe('Interest-Only Mortgage Calculator');
      expect(InterestOnlyMortgageCalculator.category).toBe('finance');
      expect(InterestOnlyMortgageCalculator.subcategory).toBe('investment');
    });

    it('should have required inputs', () => {
      const requiredInputs = InterestOnlyMortgageCalculator.inputs.filter(input => input.required);
      expect(requiredInputs.length).toBeGreaterThan(0);
      expect(requiredInputs.some(input => input.id === 'loanAmount')).toBe(true);
      expect(requiredInputs.some(input => input.id === 'interestRate')).toBe(true);
      expect(requiredInputs.some(input => input.id === 'interestOnlyPeriod')).toBe(true);
      expect(requiredInputs.some(input => input.id === 'totalLoanTerm')).toBe(true);
    });

    it('should have expected outputs', () => {
      const outputIds = InterestOnlyMortgageCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('monthlyInterestPayment');
      expect(outputIds).toContain('balloonPayment');
      expect(outputIds).toContain('totalInterestPaid');
      expect(outputIds).toContain('debtToIncomeRatio');
      expect(outputIds).toContain('affordabilityScore');
      expect(outputIds).toContain('riskScore');
      expect(outputIds).toContain('suitabilityScore');
    });

    it('should have calculate and generateReport functions', () => {
      expect(typeof InterestOnlyMortgageCalculator.calculate).toBe('function');
      expect(typeof InterestOnlyMortgageCalculator.generateReport).toBe('function');
    });
  });

  describe('Validation', () => {
    it('should validate required fields', () => {
      const result = validateInterestOnlyMortgageInputs({});
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan amount is required');
      expect(result.errors).toContain('Interest rate is required');
      expect(result.errors).toContain('Interest-only period is required');
      expect(result.errors).toContain('Total loan term is required');
    });

    it('should validate loan amount range', () => {
      const result = validateInterestOnlyMortgageInputs({
        loanAmount: 5000
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan amount must be between $10,000 and $10,000,000');
    });

    it('should validate interest rate range', () => {
      const result = validateInterestOnlyMortgageInputs({
        loanAmount: 500000,
        interestRate: 25
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Interest rate must be between 0.1% and 20%');
    });

    it('should validate interest-only period range', () => {
      const result = validateInterestOnlyMortgageInputs({
        loanAmount: 500000,
        interestRate: 5.5,
        interestOnlyPeriod: 35
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Interest-only period must be between 1 and 30 years');
    });

    it('should validate total loan term range', () => {
      const result = validateInterestOnlyMortgageInputs({
        loanAmount: 500000,
        interestRate: 5.5,
        interestOnlyPeriod: 10,
        totalLoanTerm: 3
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Total loan term must be between 5 and 50 years');
    });

    it('should validate logical constraints', () => {
      const result = validateInterestOnlyMortgageInputs({
        loanAmount: 500000,
        interestRate: 5.5,
        interestOnlyPeriod: 30,
        totalLoanTerm: 25
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Interest-only period must be less than total loan term');
    });

    it('should accept valid inputs', () => {
      const result = validateInterestOnlyMortgageInputs({
        loanAmount: 500000,
        interestRate: 5.5,
        interestOnlyPeriod: 10,
        totalLoanTerm: 30
      });
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate basic metrics correctly', () => {
      const inputs = {
        loanAmount: 500000,
        interestRate: 5.5,
        interestOnlyPeriod: 10,
        totalLoanTerm: 30
      };

      const outputs = calculateInterestOnlyMortgage(inputs);

      expect(outputs.monthlyInterestPayment).toBeGreaterThan(0);
      expect(outputs.balloonPayment).toBe(500000);
      expect(outputs.totalInterestPaid).toBeGreaterThan(0);
      expect(outputs.affordabilityScore).toBeGreaterThan(0);
      expect(outputs.riskScore).toBeGreaterThan(0);
      expect(outputs.suitabilityScore).toBeGreaterThan(0);
    });

    it('should calculate monthly interest payment correctly', () => {
      const inputs = {
        loanAmount: 500000,
        interestRate: 6.0
      };

      const outputs = calculateInterestOnlyMortgage(inputs);
      const expectedMonthlyInterest = (500000 * 6.0 / 100) / 12; // $2,500
      expect(outputs.monthlyInterestPayment).toBe(Math.round(expectedMonthlyInterest));
    });

    it('should calculate balloon payment correctly', () => {
      const inputs = {
        loanAmount: 400000,
        interestRate: 5.5,
        interestOnlyPeriod: 7
      };

      const outputs = calculateInterestOnlyMortgage(inputs);
      expect(outputs.balloonPayment).toBe(400000); // Should equal original loan amount
    });

    it('should calculate debt-to-income ratio correctly', () => {
      const inputs = {
        loanAmount: 500000,
        interestRate: 5.5,
        interestOnlyPeriod: 10,
        totalLoanTerm: 30,
        monthlyIncome: 8000
      };

      const outputs = calculateInterestOnlyMortgage(inputs);
      expect(outputs.debtToIncomeRatio).toBeGreaterThan(0);
      expect(outputs.debtToIncomeRatio).toBeLessThan(100);
    });

    it('should calculate loan-to-value ratio correctly', () => {
      const inputs = {
        loanAmount: 400000,
        interestRate: 5.5,
        interestOnlyPeriod: 10,
        totalLoanTerm: 30,
        propertyValue: 500000
      };

      const outputs = calculateInterestOnlyMortgage(inputs);
      expect(outputs.loanToValueRatio).toBe(80); // 400,000 / 500,000 * 100
    });

    it('should calculate tax savings correctly', () => {
      const inputs = {
        loanAmount: 500000,
        interestRate: 6.0,
        interestOnlyPeriod: 10,
        totalLoanTerm: 30,
        incomeTaxRate: 24
      };

      const outputs = calculateInterestOnlyMortgage(inputs);
      const annualInterest = (500000 * 6.0 / 100);
      const expectedTaxSavings = (annualInterest * 24 / 100);
      expect(outputs.taxSavings).toBe(Math.round(expectedTaxSavings));
    });

    it('should calculate investment opportunity correctly', () => {
      const inputs = {
        loanAmount: 500000,
        interestRate: 5.5,
        interestOnlyPeriod: 10,
        totalLoanTerm: 30,
        alternativeInvestmentReturn: 7
      };

      const outputs = calculateInterestOnlyMortgage(inputs);
      expect(outputs.investmentOpportunity).toBeGreaterThan(0);
    });

    it('should calculate affordability score correctly', () => {
      const inputs = {
        loanAmount: 500000,
        interestRate: 5.5,
        interestOnlyPeriod: 10,
        totalLoanTerm: 30,
        monthlyIncome: 8000,
        monthlyDebts: 500,
        emergencyFund: 25000
      };

      const outputs = calculateInterestOnlyMortgage(inputs);
      expect(outputs.affordabilityScore).toBeGreaterThan(0);
      expect(outputs.affordabilityScore).toBeLessThanOrEqual(100);
    });

    it('should calculate risk score correctly', () => {
      const inputs = {
        loanAmount: 500000,
        interestRate: 5.5,
        interestOnlyPeriod: 10,
        totalLoanTerm: 30,
        propertyValue: 600000,
        monthlyIncome: 8000,
        monthlyDebts: 500,
        emergencyFund: 25000,
        creditScore: 750,
        exitStrategy: 'refinance',
        riskTolerance: 'moderate'
      };

      const outputs = calculateInterestOnlyMortgage(inputs);
      expect(outputs.riskScore).toBeGreaterThan(0);
      expect(outputs.riskScore).toBeLessThanOrEqual(100);
    });

    it('should calculate suitability score correctly', () => {
      const inputs = {
        loanAmount: 500000,
        interestRate: 5.5,
        interestOnlyPeriod: 10,
        totalLoanTerm: 30,
        investmentHorizon: 10,
        exitStrategy: 'refinance'
      };

      const outputs = calculateInterestOnlyMortgage(inputs);
      expect(outputs.suitabilityScore).toBeGreaterThan(0);
      expect(outputs.suitabilityScore).toBeLessThanOrEqual(100);
    });
  });

  describe('Interest-Only Mortgage Analysis', () => {
    it('should generate analysis report', () => {
      const inputs = {
        loanAmount: 500000,
        interestRate: 5.5,
        interestOnlyPeriod: 10,
        totalLoanTerm: 30
      };

      const outputs = calculateInterestOnlyMortgage(inputs);
      const report = InterestOnlyMortgageCalculator.generateReport(inputs, outputs);

      expect(report).toContain('Interest-Only Mortgage Analysis');
      expect(report).toContain('Executive Summary');
      expect(report).toContain('Payment Overview');
      expect(report).toContain('Key Metrics');
      expect(report).toContain('Payment Schedule');
      expect(report).toContain('Comparison Analysis');
    });

    it('should include recommendation in report', () => {
      const inputs = {
        loanAmount: 500000,
        interestRate: 5.5,
        interestOnlyPeriod: 10,
        totalLoanTerm: 30
      };

      const outputs = calculateInterestOnlyMortgage(inputs);
      const report = InterestOnlyMortgageCalculator.generateReport(inputs, outputs);

      expect(report).toContain('Recommendation:');
      expect(outputs.recommendation).toBeTruthy();
    });

    it('should include payment schedule in report', () => {
      const inputs = {
        loanAmount: 500000,
        interestRate: 5.5,
        interestOnlyPeriod: 10,
        totalLoanTerm: 30
      };

      const outputs = calculateInterestOnlyMortgage(inputs);
      const report = InterestOnlyMortgageCalculator.generateReport(inputs, outputs);

      expect(report).toContain('Payment Schedule');
      expect(report).toContain('Interest-Only Period');
      expect(report).toContain('Amortization Period');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero interest rate', () => {
      const inputs = {
        loanAmount: 500000,
        interestRate: 0,
        interestOnlyPeriod: 10,
        totalLoanTerm: 30
      };

      const outputs = calculateInterestOnlyMortgage(inputs);
      expect(outputs.monthlyInterestPayment).toBe(0);
    });

    it('should handle minimum loan amount', () => {
      const inputs = {
        loanAmount: 10000,
        interestRate: 5.5,
        interestOnlyPeriod: 5,
        totalLoanTerm: 30
      };

      const outputs = calculateInterestOnlyMortgage(inputs);
      expect(outputs.monthlyInterestPayment).toBeGreaterThan(0);
    });

    it('should handle maximum loan amount', () => {
      const inputs = {
        loanAmount: 10000000,
        interestRate: 5.5,
        interestOnlyPeriod: 10,
        totalLoanTerm: 30
      };

      const outputs = calculateInterestOnlyMortgage(inputs);
      expect(outputs.monthlyInterestPayment).toBeGreaterThan(0);
    });

    it('should handle short interest-only period', () => {
      const inputs = {
        loanAmount: 500000,
        interestRate: 5.5,
        interestOnlyPeriod: 1,
        totalLoanTerm: 30
      };

      const outputs = calculateInterestOnlyMortgage(inputs);
      expect(outputs.balloonPayment).toBe(500000);
    });

    it('should handle long interest-only period', () => {
      const inputs = {
        loanAmount: 500000,
        interestRate: 5.5,
        interestOnlyPeriod: 30,
        totalLoanTerm: 30
      };

      const outputs = calculateInterestOnlyMortgage(inputs);
      expect(outputs.balloonPayment).toBe(500000);
    });

    it('should handle high interest rate', () => {
      const inputs = {
        loanAmount: 500000,
        interestRate: 20,
        interestOnlyPeriod: 10,
        totalLoanTerm: 30
      };

      const outputs = calculateInterestOnlyMortgage(inputs);
      expect(outputs.monthlyInterestPayment).toBeGreaterThan(0);
    });
  });

  describe('Quick Validation', () => {
    it('should validate loan amount quickly', () => {
      const result = validateInterestOnlyMortgageInputs({ loanAmount: 5000 });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan amount must be between $10,000 and $10,000,000');

      const validResult = validateInterestOnlyMortgageInputs({ loanAmount: 500000 });
      expect(validResult.isValid).toBe(true);
    });

    it('should validate interest rate quickly', () => {
      const result = validateInterestOnlyMortgageInputs({
        loanAmount: 500000,
        interestRate: 25
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Interest rate must be between 0.1% and 20%');

      const validResult = validateInterestOnlyMortgageInputs({
        loanAmount: 500000,
        interestRate: 5.5
      });
      expect(validResult.isValid).toBe(true);
    });

    it('should validate interest-only period quickly', () => {
      const result = validateInterestOnlyMortgageInputs({
        loanAmount: 500000,
        interestRate: 5.5,
        interestOnlyPeriod: 35
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Interest-only period must be between 1 and 30 years');

      const validResult = validateInterestOnlyMortgageInputs({
        loanAmount: 500000,
        interestRate: 5.5,
        interestOnlyPeriod: 10
      });
      expect(validResult.isValid).toBe(true);
    });

    it('should validate all inputs quickly', () => {
      const inputs = {
        loanAmount: 5000,
        interestRate: 25,
        interestOnlyPeriod: 35
      };

      const result = validateAllInterestOnlyMortgageInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should pass validation for valid inputs', () => {
      const inputs = {
        loanAmount: 500000,
        interestRate: 5.5,
        interestOnlyPeriod: 10,
        totalLoanTerm: 30
      };

      const result = validateAllInterestOnlyMortgageInputs(inputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Comparison Analysis', () => {
    it('should compare with traditional mortgage', () => {
      const inputs = {
        loanAmount: 500000,
        interestRate: 5.5,
        interestOnlyPeriod: 10,
        totalLoanTerm: 30
      };

      const outputs = calculateInterestOnlyMortgage(inputs);
      expect(outputs.amortizationComparison).toBeGreaterThan(outputs.monthlyInterestPayment);
      expect(outputs.savingsDuringInterestOnly).toBeGreaterThan(0);
      expect(outputs.totalSavings).toBeGreaterThan(0);
    });

    it('should calculate break-even point', () => {
      const inputs = {
        loanAmount: 500000,
        interestRate: 5.5,
        interestOnlyPeriod: 10,
        totalLoanTerm: 30
      };

      const outputs = calculateInterestOnlyMortgage(inputs);
      expect(outputs.breakEvenPoint).toBeGreaterThan(0);
    });
  });

  describe('Risk Assessment', () => {
    it('should assess risk based on LTV', () => {
      const highLTVInputs = {
        loanAmount: 450000,
        interestRate: 5.5,
        interestOnlyPeriod: 10,
        totalLoanTerm: 30,
        propertyValue: 500000 // 90% LTV
      };

      const lowLTVInputs = {
        loanAmount: 300000,
        interestRate: 5.5,
        interestOnlyPeriod: 10,
        totalLoanTerm: 30,
        propertyValue: 500000 // 60% LTV
      };

      const highLTVOutputs = calculateInterestOnlyMortgage(highLTVInputs);
      const lowLTVOutputs = calculateInterestOnlyMortgage(lowLTVInputs);

      expect(highLTVOutputs.riskScore).toBeGreaterThan(lowLTVOutputs.riskScore);
    });

    it('should assess risk based on DTI', () => {
      const highDTIInputs = {
        loanAmount: 500000,
        interestRate: 5.5,
        interestOnlyPeriod: 10,
        totalLoanTerm: 30,
        monthlyIncome: 5000,
        monthlyDebts: 2000
      };

      const lowDTIInputs = {
        loanAmount: 500000,
        interestRate: 5.5,
        interestOnlyPeriod: 10,
        totalLoanTerm: 30,
        monthlyIncome: 15000,
        monthlyDebts: 500
      };

      const highDTIOutputs = calculateInterestOnlyMortgage(highDTIInputs);
      const lowDTIOutputs = calculateInterestOnlyMortgage(lowDTIInputs);

      expect(highDTIOutputs.riskScore).toBeGreaterThan(lowDTIOutputs.riskScore);
    });

    it('should assess risk based on credit score', () => {
      const lowCreditInputs = {
        loanAmount: 500000,
        interestRate: 5.5,
        interestOnlyPeriod: 10,
        totalLoanTerm: 30,
        creditScore: 650
      };

      const highCreditInputs = {
        loanAmount: 500000,
        interestRate: 5.5,
        interestOnlyPeriod: 10,
        totalLoanTerm: 30,
        creditScore: 800
      };

      const lowCreditOutputs = calculateInterestOnlyMortgage(lowCreditInputs);
      const highCreditOutputs = calculateInterestOnlyMortgage(highCreditInputs);

      expect(lowCreditOutputs.riskScore).toBeGreaterThan(highCreditOutputs.riskScore);
    });
  });

  describe('Exit Strategy Analysis', () => {
    it('should analyze different exit strategies', () => {
      const refinanceInputs = {
        loanAmount: 500000,
        interestRate: 5.5,
        interestOnlyPeriod: 10,
        totalLoanTerm: 30,
        exitStrategy: 'refinance',
        refinanceRate: 6.0
      };

      const sellInputs = {
        loanAmount: 500000,
        interestRate: 5.5,
        interestOnlyPeriod: 10,
        totalLoanTerm: 30,
        exitStrategy: 'sell'
      };

      const refinanceOutputs = calculateInterestOnlyMortgage(refinanceInputs);
      const sellOutputs = calculateInterestOnlyMortgage(sellInputs);

      expect(refinanceOutputs.riskScore).toBeLessThan(sellOutputs.riskScore);
    });
  });

  describe('Tax Implications', () => {
    it('should calculate after-tax cost correctly', () => {
      const inputs = {
        loanAmount: 500000,
        interestRate: 6.0,
        interestOnlyPeriod: 10,
        totalLoanTerm: 30,
        incomeTaxRate: 24
      };

      const outputs = calculateInterestOnlyMortgage(inputs);
      expect(outputs.afterTaxCost).toBeLessThan(outputs.monthlyPITI);
      expect(outputs.taxSavings).toBeGreaterThan(0);
    });
  });
});
