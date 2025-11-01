import { describe, it, expect } from 'vitest';
import { JumboLoanCalculator } from './JumboLoanCalculator';
import { calculateJumboLoan } from './formulas';
import { validateJumboLoanInputs } from './validation';
import { validateAllJumboLoanInputs } from './quickValidation';

describe('Jumbo Loan Calculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(JumboLoanCalculator.id).toBe('JumboLoanCalculator');
      expect(JumboLoanCalculator.name).toBe('Jumbo Loan Calculator');
      expect(JumboLoanCalculator.category).toBe('finance');
      expect(JumboLoanCalculator.subcategory).toBe('investment');
    });

    it('should have required inputs', () => {
      const requiredInputs = JumboLoanCalculator.inputs.filter(input => input.required);
      expect(requiredInputs.length).toBeGreaterThan(0);
      expect(requiredInputs.some(input => input.id === 'loanAmount')).toBe(true);
      expect(requiredInputs.some(input => input.id === 'interestRate')).toBe(true);
      expect(requiredInputs.some(input => input.id === 'loanTerm')).toBe(true);
      expect(requiredInputs.some(input => input.id === 'downPayment')).toBe(true);
    });

    it('should have expected outputs', () => {
      const outputIds = JumboLoanCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('monthlyPayment');
      expect(outputIds).toContain('monthlyPITI');
      expect(outputIds).toContain('totalPayment');
      expect(outputIds).toContain('totalInterest');
      expect(outputIds).toContain('loanToValueRatio');
      expect(outputIds).toContain('debtToIncomeRatio');
      expect(outputIds).toContain('qualificationScore');
      expect(outputIds).toContain('riskScore');
      expect(outputIds).toContain('approvalProbability');
      expect(outputIds).toContain('jumboPremium');
    });

    it('should have calculate and generateReport functions', () => {
      expect(typeof JumboLoanCalculator.calculate).toBe('function');
      expect(typeof JumboLoanCalculator.generateReport).toBe('function');
    });
  });

  describe('Validation', () => {
    it('should validate required fields', () => {
      const result = validateJumboLoanInputs({});
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan amount is required');
      expect(result.errors).toContain('Interest rate is required');
      expect(result.errors).toContain('Loan term is required');
      expect(result.errors).toContain('Down payment is required');
    });

    it('should validate loan amount range', () => {
      const result = validateJumboLoanInputs({
        loanAmount: 500000
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan amount must be at least $548,250 for jumbo loans');
    });

    it('should validate interest rate range', () => {
      const result = validateJumboLoanInputs({
        loanAmount: 750000,
        interestRate: 25
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Interest rate must be between 0.1% and 20%');
    });

    it('should validate loan term range', () => {
      const result = validateJumboLoanInputs({
        loanAmount: 750000,
        interestRate: 6.5,
        loanTerm: 3
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan term must be between 5 and 50 years');
    });

    it('should validate down payment range', () => {
      const result = validateJumboLoanInputs({
        loanAmount: 750000,
        interestRate: 6.5,
        loanTerm: 30,
        downPayment: 6000000
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Down payment must be $5,000,000 or less');
    });

    it('should accept valid inputs', () => {
      const result = validateJumboLoanInputs({
        loanAmount: 750000,
        interestRate: 6.5,
        loanTerm: 30,
        downPayment: 150000
      });
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should validate property value range', () => {
      const result = validateJumboLoanInputs({
        loanAmount: 750000,
        interestRate: 6.5,
        loanTerm: 30,
        downPayment: 150000,
        propertyValue: 50000
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property value must be between $100,000 and $20,000,000');
    });

    it('should validate credit score range', () => {
      const result = validateJumboLoanInputs({
        loanAmount: 750000,
        interestRate: 6.5,
        loanTerm: 30,
        downPayment: 150000,
        creditScore: 200
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Credit score must be between 300 and 850');
    });

    it('should validate enum values', () => {
      const result = validateJumboLoanInputs({
        loanAmount: 750000,
        interestRate: 6.5,
        loanTerm: 30,
        downPayment: 150000,
        propertyType: 'Invalid Type'
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property type must be one of:');
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate basic metrics correctly', () => {
      const inputs = {
        loanAmount: 750000,
        interestRate: 6.5,
        loanTerm: 30,
        downPayment: 150000
      };

      const outputs = calculateJumboLoan(inputs);

      expect(outputs.monthlyPayment).toBeGreaterThan(0);
      expect(outputs.monthlyPITI).toBeGreaterThan(outputs.monthlyPayment);
      expect(outputs.totalPayment).toBeGreaterThan(0);
      expect(outputs.totalInterest).toBeGreaterThan(0);
      expect(outputs.qualificationScore).toBeGreaterThan(0);
      expect(outputs.riskScore).toBeGreaterThan(0);
      expect(outputs.approvalProbability).toBeGreaterThan(0);
    });

    it('should calculate monthly payment correctly', () => {
      const inputs = {
        loanAmount: 750000,
        interestRate: 6.5,
        loanTerm: 30
      };

      const outputs = calculateJumboLoan(inputs);
      expect(outputs.monthlyPayment).toBeGreaterThan(0);
      expect(outputs.monthlyPayment).toBeLessThan(10000);
    });

    it('should calculate LoanToValue ratio correctly', () => {
      const inputs = {
        loanAmount: 600000,
        interestRate: 6.5,
        loanTerm: 30,
        downPayment: 150000,
        propertyValue: 750000
      };

      const outputs = calculateJumboLoan(inputs);
      expect(outputs.loanToValueRatio).toBe(80); // 600,000 / 750,000 * 100
    });

    it('should calculate DebtToIncome ratio correctly', () => {
      const inputs = {
        loanAmount: 750000,
        interestRate: 6.5,
        loanTerm: 30,
        downPayment: 150000,
        annualIncome: 150000,
        monthlyDebts: 1500
      };

      const outputs = calculateJumboLoan(inputs);
      expect(outputs.debtToIncomeRatio).toBeGreaterThan(0);
      expect(outputs.debtToIncomeRatio).toBeLessThan(100);
    });

    it('should calculate down payment percentage correctly', () => {
      const inputs = {
        loanAmount: 600000,
        interestRate: 6.5,
        loanTerm: 30,
        downPayment: 150000,
        propertyValue: 750000
      };

      const outputs = calculateJumboLoan(inputs);
      expect(outputs.downPaymentPercent).toBe(20); // 150,000 / 750,000 * 100
    });

    it('should calculate jumbo premium correctly', () => {
      const inputs = {
        loanAmount: 750000,
        interestRate: 6.5,
        loanTerm: 30,
        downPayment: 150000
      };

      const outputs = calculateJumboLoan(inputs);
      expect(outputs.jumboPremium).toBeGreaterThan(0);
    });

    it('should calculate conforming comparison correctly', () => {
      const inputs = {
        loanAmount: 750000,
        interestRate: 6.5,
        loanTerm: 30,
        downPayment: 150000
      };

      const outputs = calculateJumboLoan(inputs);
      expect(outputs.conformingComparison).toBeGreaterThan(0);
    });

    it('should calculate qualification score correctly', () => {
      const inputs = {
        loanAmount: 750000,
        interestRate: 6.5,
        loanTerm: 30,
        downPayment: 150000,
        creditScore: 750,
        debtToIncomeRatio: 35,
        loanToValueRatio: 80,
        reserves: 50000
      };

      const outputs = calculateJumboLoan(inputs);
      expect(outputs.qualificationScore).toBeGreaterThan(0);
      expect(outputs.qualificationScore).toBeLessThanOrEqual(100);
    });

    it('should calculate risk score correctly', () => {
      const inputs = {
        loanAmount: 750000,
        interestRate: 6.5,
        loanTerm: 30,
        downPayment: 150000,
        propertyValue: 900000,
        annualIncome: 150000,
        monthlyDebts: 1500,
        creditScore: 750,
        reserves: 50000,
        employmentType: 'W-2 Employee'
      };

      const outputs = calculateJumboLoan(inputs);
      expect(outputs.riskScore).toBeGreaterThan(0);
      expect(outputs.riskScore).toBeLessThanOrEqual(100);
    });

    it('should calculate approval probability correctly', () => {
      const inputs = {
        loanAmount: 750000,
        interestRate: 6.5,
        loanTerm: 30,
        downPayment: 150000
      };

      const outputs = calculateJumboLoan(inputs);
      expect(outputs.approvalProbability).toBeGreaterThan(0);
      expect(outputs.approvalProbability).toBeLessThanOrEqual(100);
    });

    it('should calculate requirements correctly', () => {
      const inputs = {
        loanAmount: 750000,
        interestRate: 6.5,
        loanTerm: 30,
        downPayment: 150000,
        lenderType: 'Traditional Bank'
      };

      const outputs = calculateJumboLoan(inputs);
      expect(outputs.reserveRequirement).toBeGreaterThan(0);
      expect(outputs.incomeRequirement).toBeGreaterThan(0);
      expect(outputs.creditRequirement).toBeGreaterThan(0);
      expect(outputs.downPaymentRequirement).toBeGreaterThan(0);
    });
  });

  describe('Jumbo Loan Analysis', () => {
    it('should generate analysis report', () => {
      const inputs = {
        loanAmount: 750000,
        interestRate: 6.5,
        loanTerm: 30,
        downPayment: 150000
      };

      const outputs = calculateJumboLoan(inputs);
      const report = JumboLoanCalculator.generateReport(inputs, outputs);

      expect(report).toContain('Jumbo Loan Analysis');
      expect(report).toContain('Executive Summary');
      expect(report).toContain('Payment Overview');
      expect(report).toContain('Key Metrics');
      expect(report).toContain('Requirements Analysis');
      expect(report).toContain('Cost Comparison');
    });

    it('should include recommendation in report', () => {
      const inputs = {
        loanAmount: 750000,
        interestRate: 6.5,
        loanTerm: 30,
        downPayment: 150000
      };

      const outputs = calculateJumboLoan(inputs);
      const report = JumboLoanCalculator.generateReport(inputs, outputs);

      expect(report).toContain('Recommendation:');
      expect(outputs.recommendation).toBeTruthy();
    });

    it('should include payment breakdown in report', () => {
      const inputs = {
        loanAmount: 750000,
        interestRate: 6.5,
        loanTerm: 30,
        downPayment: 150000
      };

      const outputs = calculateJumboLoan(inputs);
      const report = JumboLoanCalculator.generateReport(inputs, outputs);

      expect(report).toContain('Payment Breakdown');
      expect(report).toContain('Cost Analysis');
    });
  });

  describe('Edge Cases', () => {
    it('should handle minimum jumbo loan amount', () => {
      const inputs = {
        loanAmount: 548250,
        interestRate: 6.5,
        loanTerm: 30,
        downPayment: 109650
      };

      const outputs = calculateJumboLoan(inputs);
      expect(outputs.monthlyPayment).toBeGreaterThan(0);
    });

    it('should handle maximum loan amount', () => {
      const inputs = {
        loanAmount: 10000000,
        interestRate: 6.5,
        loanTerm: 30,
        downPayment: 2000000
      };

      const outputs = calculateJumboLoan(inputs);
      expect(outputs.monthlyPayment).toBeGreaterThan(0);
    });

    it('should handle zero interest rate', () => {
      const inputs = {
        loanAmount: 750000,
        interestRate: 0,
        loanTerm: 30,
        downPayment: 150000
      };

      const outputs = calculateJumboLoan(inputs);
      expect(outputs.monthlyPayment).toBeGreaterThan(0);
    });

    it('should handle high interest rate', () => {
      const inputs = {
        loanAmount: 750000,
        interestRate: 20,
        loanTerm: 30,
        downPayment: 150000
      };

      const outputs = calculateJumboLoan(inputs);
      expect(outputs.monthlyPayment).toBeGreaterThan(0);
    });

    it('should handle short loan term', () => {
      const inputs = {
        loanAmount: 750000,
        interestRate: 6.5,
        loanTerm: 5,
        downPayment: 150000
      };

      const outputs = calculateJumboLoan(inputs);
      expect(outputs.monthlyPayment).toBeGreaterThan(0);
    });

    it('should handle long loan term', () => {
      const inputs = {
        loanAmount: 750000,
        interestRate: 6.5,
        loanTerm: 50,
        downPayment: 150000
      };

      const outputs = calculateJumboLoan(inputs);
      expect(outputs.monthlyPayment).toBeGreaterThan(0);
    });
  });

  describe('Quick Validation', () => {
    it('should validate loan amount quickly', () => {
      const result = validateLoanAmount(500000);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('at least $548,250 for jumbo loans');

      const validResult = validateLoanAmount(750000);
      expect(validResult.isValid).toBe(true);
    });

    it('should validate interest rate quickly', () => {
      const result = validateInterestRate(25);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('between 0.1% and 20%');

      const validResult = validateInterestRate(6.5);
      expect(validResult.isValid).toBe(true);
    });

    it('should validate loan term quickly', () => {
      const result = validateLoanTerm(3);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('between 5 and 50 years');

      const validResult = validateLoanTerm(30);
      expect(validResult.isValid).toBe(true);
    });

    it('should validate down payment quickly', () => {
      const result = validateDownPayment(6000000);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('$5,000,000 or less');

      const validResult = validateDownPayment(150000);
      expect(validResult.isValid).toBe(true);
    });

    it('should validate all inputs quickly', () => {
      const inputs = {
        loanAmount: 500000,
        interestRate: 25,
        loanTerm: 3,
        downPayment: 6000000
      };

      const result = validateAllJumboLoanInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should pass validation for valid inputs', () => {
      const inputs = {
        loanAmount: 750000,
        interestRate: 6.5,
        loanTerm: 30,
        downPayment: 150000
      };

      const result = validateAllJumboLoanInputs(inputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Lender Type Analysis', () => {
    it('should adjust requirements based on lender type', () => {
      const traditionalBankInputs = {
        loanAmount: 750000,
        interestRate: 6.5,
        loanTerm: 30,
        downPayment: 150000,
        lenderType: 'Traditional Bank'
      };

      const privateLenderInputs = {
        loanAmount: 750000,
        interestRate: 6.5,
        loanTerm: 30,
        downPayment: 150000,
        lenderType: 'Private Lender'
      };

      const traditionalOutputs = calculateJumboLoan(traditionalBankInputs);
      const privateOutputs = calculateJumboLoan(privateLenderInputs);

      expect(traditionalOutputs.creditRequirement).toBeGreaterThan(privateOutputs.creditRequirement);
      expect(traditionalOutputs.downPaymentRequirement).toBeGreaterThan(privateOutputs.downPaymentRequirement);
    });
  });

  describe('Market Conditions Analysis', () => {
    it('should adjust requirements based on market conditions', () => {
      const favorableInputs = {
        loanAmount: 750000,
        interestRate: 6.5,
        loanTerm: 30,
        downPayment: 150000,
        marketConditions: 'Favorable'
      };

      const tightInputs = {
        loanAmount: 750000,
        interestRate: 6.5,
        loanTerm: 30,
        downPayment: 150000,
        marketConditions: 'Tight'
      };

      const favorableOutputs = calculateJumboLoan(favorableInputs);
      const tightOutputs = calculateJumboLoan(tightInputs);

      expect(tightOutputs.creditRequirement).toBeGreaterThan(favorableOutputs.creditRequirement);
    });
  });

  describe('Employment Type Analysis', () => {
    it('should assess risk based on employment type', () => {
      const w2Inputs = {
        loanAmount: 750000,
        interestRate: 6.5,
        loanTerm: 30,
        downPayment: 150000,
        employmentType: 'W-2 Employee'
      };

      const selfEmployedInputs = {
        loanAmount: 750000,
        interestRate: 6.5,
        loanTerm: 30,
        downPayment: 150000,
        employmentType: 'Self-Employed'
      };

      const w2Outputs = calculateJumboLoan(w2Inputs);
      const selfEmployedOutputs = calculateJumboLoan(selfEmployedInputs);

      expect(selfEmployedOutputs.riskScore).toBeGreaterThan(w2Outputs.riskScore);
    });
  });

  describe('Property Type Analysis', () => {
    it('should adjust requirements based on property type', () => {
      const singleFamilyInputs = {
        loanAmount: 750000,
        interestRate: 6.5,
        loanTerm: 30,
        downPayment: 150000,
        propertyType: 'Single Family'
      };

      const investmentInputs = {
        loanAmount: 750000,
        interestRate: 6.5,
        loanTerm: 30,
        downPayment: 150000,
        propertyType: 'Investment Property'
      };

      const singleFamilyOutputs = calculateJumboLoan(singleFamilyInputs);
      const investmentOutputs = calculateJumboLoan(investmentInputs);

      expect(investmentOutputs.riskScore).toBeGreaterThan(singleFamilyOutputs.riskScore);
    });
  });

  describe('Income Verification Analysis', () => {
    it('should assess risk based on income verification type', () => {
      const fullDocInputs = {
        loanAmount: 750000,
        interestRate: 6.5,
        loanTerm: 30,
        downPayment: 150000,
        incomeVerification: 'Full Documentation'
      };

      const statedIncomeInputs = {
        loanAmount: 750000,
        interestRate: 6.5,
        loanTerm: 30,
        downPayment: 150000,
        incomeVerification: 'Stated Income'
      };

      const fullDocOutputs = calculateJumboLoan(fullDocInputs);
      const statedIncomeOutputs = calculateJumboLoan(statedIncomeInputs);

      expect(statedIncomeOutputs.riskScore).toBeGreaterThan(fullDocOutputs.riskScore);
    });
  });

  describe('Credit Score Impact', () => {
    it('should assess risk based on credit score', () => {
      const highCreditInputs = {
        loanAmount: 750000,
        interestRate: 6.5,
        loanTerm: 30,
        downPayment: 150000,
        creditScore: 800
      };

      const lowCreditInputs = {
        loanAmount: 750000,
        interestRate: 6.5,
        loanTerm: 30,
        downPayment: 150000,
        creditScore: 650
      };

      const highCreditOutputs = calculateJumboLoan(highCreditInputs);
      const lowCreditOutputs = calculateJumboLoan(lowCreditInputs);

      expect(lowCreditOutputs.riskScore).toBeGreaterThan(highCreditOutputs.riskScore);
      expect(highCreditOutputs.qualificationScore).toBeGreaterThan(lowCreditOutputs.qualificationScore);
    });
  });

  describe('DTI Impact', () => {
    it('should assess risk based on DebtToIncome ratio', () => {
      const lowDTIInputs = {
        loanAmount: 750000,
        interestRate: 6.5,
        loanTerm: 30,
        downPayment: 150000,
        annualIncome: 200000,
        monthlyDebts: 1000
      };

      const highDTIInputs = {
        loanAmount: 750000,
        interestRate: 6.5,
        loanTerm: 30,
        downPayment: 150000,
        annualIncome: 100000,
        monthlyDebts: 3000
      };

      const lowDTIOutputs = calculateJumboLoan(lowDTIInputs);
      const highDTIOutputs = calculateJumboLoan(highDTIInputs);

      expect(highDTIOutputs.riskScore).toBeGreaterThan(lowDTIOutputs.riskScore);
      expect(lowDTIOutputs.qualificationScore).toBeGreaterThan(highDTIOutputs.qualificationScore);
    });
  });

  describe('Reserve Requirements', () => {
    it('should calculate reserve requirements correctly', () => {
      const inputs = {
        loanAmount: 750000,
        interestRate: 6.5,
        loanTerm: 30,
        downPayment: 150000,
        lenderType: 'Traditional Bank'
      };

      const outputs = calculateJumboLoan(inputs);
      expect(outputs.reserveRequirement).toBeGreaterThan(0);
      expect(outputs.reserveRequirement).toBeLessThan(1000000);
    });
  });

  describe('Income Requirements', () => {
    it('should calculate income requirements correctly', () => {
      const inputs = {
        loanAmount: 750000,
        interestRate: 6.5,
        loanTerm: 30,
        downPayment: 150000,
        lenderType: 'Traditional Bank'
      };

      const outputs = calculateJumboLoan(inputs);
      expect(outputs.incomeRequirement).toBeGreaterThan(0);
      expect(outputs.incomeRequirement).toBeLessThan(100000);
    });
  });
});
