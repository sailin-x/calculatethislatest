import { describe, it, expect } from 'vitest';
import { VALoanCalculator } from './VALoanCalculator';
import { calculateVALoan, generateVALoanAnalysis } from './formulas';
import { validateVALoanInputs } from './validation';
import { validateAllVALoanInputs } from './quickValidation';

describe('VA Loan Calculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct metadata', () => {
      expect(VALoanCalculator.id).toBe('va-loan');
      expect(VALoanCalculator.name).toBe('VA Loan Calculator');
      expect(VALoanCalculator.category).toBe('finance');
      expect(VALoanCalculator.description).toContain('VA home loan');
    });

    it('should have all required inputs', () => {
      const inputKeys = Object.keys(VALoanCalculator.inputs);
      expect(inputKeys).toContain('purchasePrice');
      expect(inputKeys).toContain('downPayment');
      expect(inputKeys).toContain('interestRate');
      expect(inputKeys).toContain('loanTerm');
      expect(inputKeys).toContain('veteranStatus');
      expect(inputKeys).toContain('serviceYears');
      expect(inputKeys).toContain('disabilityRating');
      expect(inputKeys).toContain('firstTimeUse');
      expect(inputKeys).toContain('propertyType');
      expect(inputKeys).toContain('propertyLocation');
      expect(inputKeys).toContain('propertyAge');
      expect(inputKeys).toContain('propertySize');
      expect(inputKeys).toContain('propertyTaxes');
      expect(inputKeys).toContain('homeownersInsurance');
      expect(inputKeys).toContain('monthlyDebts');
      expect(inputKeys).toContain('creditScore');
      expect(inputKeys).toContain('annualIncome');
      expect(inputKeys).toContain('closingCosts');
      expect(inputKeys).toContain('prepaidItems');
      expect(inputKeys).toContain('sellerCredits');
      expect(inputKeys).toContain('analysisPeriod');
    });

    it('should have all required outputs', () => {
      const outputKeys = Object.keys(VALoanCalculator.outputs);
      expect(outputKeys).toContain('loanAmount');
      expect(outputKeys).toContain('monthlyPayment');
      expect(outputKeys).toContain('monthlyEscrow');
      expect(outputKeys).toContain('totalMonthlyPayment');
      expect(outputKeys).toContain('fundingFeeAmount');
      expect(outputKeys).toContain('fundingFeeRate');
      expect(outputKeys).toContain('totalClosingCosts');
      expect(outputKeys).toContain('cashToClose');
      expect(outputKeys).toContain('debtToIncomeRatio');
      expect(outputKeys).toContain('housingRatio');
      expect(outputKeys).toContain('veteranEligibility');
      expect(outputKeys).toContain('propertyEligibility');
      expect(outputKeys).toContain('fundingFeeExemption');
      expect(outputKeys).toContain('totalInterestPaid');
      expect(outputKeys).toContain('totalFundingFees');
      expect(outputKeys).toContain('totalCost');
      expect(outputKeys).toContain('savingsVsConventional');
      expect(outputKeys).toContain('eligibilityScore');
      expect(outputKeys).toContain('recommendation');
    });

    it('should have calculation and report functions', () => {
      expect(typeof VALoanCalculator.calculate).toBe('function');
      expect(typeof VALoanCalculator.generateReport).toBe('function');
    });
  });

  describe('Input Validation', () => {
    it('should validate valid inputs', () => {
      const validInputs = {
        purchasePrice: 300000,
        downPayment: 0,
        interestRate: 6.5,
        loanTerm: 30,
        veteranStatus: 'veteran',
        serviceYears: 4,
        disabilityRating: 0,
        firstTimeUse: 'yes',
        propertyType: 'single-family',
        propertyLocation: 'suburban',
        propertyAge: 10,
        propertySize: 2000,
        propertyTaxes: 3000,
        homeownersInsurance: 1200,
        monthlyDebts: 500,
        creditScore: 720,
        annualIncome: 80000,
        closingCosts: 5000,
        prepaidItems: 2000,
        sellerCredits: 0,
        analysisPeriod: 30
      };

      const result = validateVALoanInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject invalid purchase price', () => {
      const invalidInputs = {
        purchasePrice: -1000,
        downPayment: 0,
        interestRate: 6.5,
        loanTerm: 30,
        veteranStatus: 'veteran',
        serviceYears: 4,
        disabilityRating: 0,
        firstTimeUse: 'yes',
        propertyType: 'single-family',
        propertyLocation: 'suburban',
        propertyAge: 10,
        propertySize: 2000,
        propertyTaxes: 3000,
        homeownersInsurance: 1200,
        monthlyDebts: 500,
        creditScore: 720,
        annualIncome: 80000,
        closingCosts: 5000,
        prepaidItems: 2000,
        sellerCredits: 0,
        analysisPeriod: 30
      };

      const result = validateVALoanInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Purchase price must be greater than 0');
    });

    it('should reject insufficient service years for reserves', () => {
      const invalidInputs = {
        purchasePrice: 300000,
        downPayment: 0,
        interestRate: 6.5,
        loanTerm: 30,
        veteranStatus: 'reserves',
        serviceYears: 3,
        disabilityRating: 0,
        firstTimeUse: 'yes',
        propertyType: 'single-family',
        propertyLocation: 'suburban',
        propertyAge: 10,
        propertySize: 2000,
        propertyTaxes: 3000,
        homeownersInsurance: 1200,
        monthlyDebts: 500,
        creditScore: 720,
        annualIncome: 80000,
        closingCosts: 5000,
        prepaidItems: 2000,
        sellerCredits: 0,
        analysisPeriod: 30
      };

      const result = validateVALoanInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Reserves/National Guard members must have at least 6 years of service');
    });

    it('should reject invalid credit score', () => {
      const invalidInputs = {
        purchasePrice: 300000,
        downPayment: 0,
        interestRate: 6.5,
        loanTerm: 30,
        veteranStatus: 'veteran',
        serviceYears: 4,
        disabilityRating: 0,
        firstTimeUse: 'yes',
        propertyType: 'single-family',
        propertyLocation: 'suburban',
        propertyAge: 10,
        propertySize: 2000,
        propertyTaxes: 3000,
        homeownersInsurance: 1200,
        monthlyDebts: 500,
        creditScore: 400,
        annualIncome: 80000,
        closingCosts: 5000,
        prepaidItems: 2000,
        sellerCredits: 0,
        analysisPeriod: 30
      };

      const result = validateVALoanInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Credit score cannot be less than 500');
    });
  });

  describe('Quick Validation', () => {
    it('should validate individual fields correctly', () => {
      const { validatePurchasePrice, validateCreditScore } = require('./quickValidation');
      
      expect(validatePurchasePrice(300000).isValid).toBe(true);
      expect(validatePurchasePrice(-1000).isValid).toBe(false);
      expect(validateCreditScore(720).isValid).toBe(true);
      expect(validateCreditScore(400).isValid).toBe(false);
    });

    it('should validate all inputs together', () => {
      const validInputs = {
        purchasePrice: 300000,
        downPayment: 0,
        interestRate: 6.5,
        loanTerm: 30,
        veteranStatus: 'veteran',
        serviceYears: 4,
        disabilityRating: 0,
        firstTimeUse: 'yes',
        propertyType: 'single-family',
        propertyLocation: 'suburban',
        propertyAge: 10,
        propertySize: 2000,
        propertyTaxes: 3000,
        homeownersInsurance: 1200,
        monthlyDebts: 500,
        creditScore: 720,
        annualIncome: 80000,
        closingCosts: 5000,
        prepaidItems: 2000,
        sellerCredits: 0,
        analysisPeriod: 30
      };

      const result = validateAllVALoanInputs(validInputs);
      expect(result.isValid).toBe(true);
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate VA loan correctly', () => {
      const inputs = {
        purchasePrice: 300000,
        downPayment: 0,
        interestRate: 6.5,
        loanTerm: 30,
        veteranStatus: 'veteran',
        serviceYears: 4,
        disabilityRating: 0,
        firstTimeUse: 'yes',
        propertyType: 'single-family',
        propertyLocation: 'suburban',
        propertyAge: 10,
        propertySize: 2000,
        propertyTaxes: 3000,
        homeownersInsurance: 1200,
        monthlyDebts: 500,
        creditScore: 720,
        annualIncome: 80000,
        closingCosts: 5000,
        prepaidItems: 2000,
        sellerCredits: 0,
        analysisPeriod: 30
      };

      const outputs = calculateVALoan(inputs);

      expect(outputs.loanAmount).toBeGreaterThan(300000); // Includes funding fee
      expect(outputs.monthlyPayment).toBeGreaterThan(0);
      expect(outputs.totalMonthlyPayment).toBeGreaterThan(outputs.monthlyPayment);
      expect(outputs.fundingFeeAmount).toBeGreaterThan(0);
      expect(outputs.fundingFeeRate).toBe(2.15); // First time use rate
      expect(outputs.debtToIncomeRatio).toBeGreaterThan(0);
      expect(outputs.housingRatio).toBeGreaterThan(0);
      expect(outputs.veteranEligibility).toContain('Eligible');
      expect(outputs.propertyEligibility).toBe('Highly Eligible');
      expect(outputs.fundingFeeExemption).toContain('Not Exempt');
      expect(outputs.eligibilityScore).toBeGreaterThan(0);
      expect(outputs.eligibilityScore).toBeLessThanOrEqual(100);
      expect(outputs.recommendation).toContain('VA Loan');
    });

    it('should calculate funding fee exemption for disabled veterans', () => {
      const inputs = {
        purchasePrice: 300000,
        downPayment: 0,
        interestRate: 6.5,
        loanTerm: 30,
        veteranStatus: 'veteran',
        serviceYears: 4,
        disabilityRating: 20,
        firstTimeUse: 'yes',
        propertyType: 'single-family',
        propertyLocation: 'suburban',
        propertyAge: 10,
        propertySize: 2000,
        propertyTaxes: 3000,
        homeownersInsurance: 1200,
        monthlyDebts: 500,
        creditScore: 720,
        annualIncome: 80000,
        closingCosts: 5000,
        prepaidItems: 2000,
        sellerCredits: 0,
        analysisPeriod: 30
      };

      const outputs = calculateVALoan(inputs);

      expect(outputs.fundingFeeExemption).toContain('Exempt');
      expect(outputs.fundingFeeAmount).toBe(0);
      expect(outputs.fundingFeeRate).toBe(0);
    });

    it('should calculate higher funding fee for subsequent use', () => {
      const inputs = {
        purchasePrice: 300000,
        downPayment: 0,
        interestRate: 6.5,
        loanTerm: 30,
        veteranStatus: 'veteran',
        serviceYears: 4,
        disabilityRating: 0,
        firstTimeUse: 'no',
        propertyType: 'single-family',
        propertyLocation: 'suburban',
        propertyAge: 10,
        propertySize: 2000,
        propertyTaxes: 3000,
        homeownersInsurance: 1200,
        monthlyDebts: 500,
        creditScore: 720,
        annualIncome: 80000,
        closingCosts: 5000,
        prepaidItems: 2000,
        sellerCredits: 0,
        analysisPeriod: 30
      };

      const outputs = calculateVALoan(inputs);

      expect(outputs.fundingFeeRate).toBe(3.3); // Subsequent use rate
      expect(outputs.fundingFeeAmount).toBeGreaterThan(0);
    });

    it('should calculate eligibility score correctly', () => {
      const inputs = {
        purchasePrice: 300000,
        downPayment: 0,
        interestRate: 6.5,
        loanTerm: 30,
        veteranStatus: 'veteran',
        serviceYears: 4,
        disabilityRating: 20,
        firstTimeUse: 'yes',
        propertyType: 'single-family',
        propertyLocation: 'suburban',
        propertyAge: 10,
        propertySize: 2000,
        propertyTaxes: 3000,
        homeownersInsurance: 1200,
        monthlyDebts: 500,
        creditScore: 720,
        annualIncome: 80000,
        closingCosts: 5000,
        prepaidItems: 2000,
        sellerCredits: 0,
        analysisPeriod: 30
      };

      const outputs = calculateVALoan(inputs);

      expect(outputs.eligibilityScore).toBeGreaterThan(60); // Should be high for this scenario
      expect(outputs.veteranEligibility).toContain('Highly Eligible');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero down payment', () => {
      const inputs = {
        purchasePrice: 300000,
        downPayment: 0,
        interestRate: 6.5,
        loanTerm: 30,
        veteranStatus: 'veteran',
        serviceYears: 4,
        disabilityRating: 0,
        firstTimeUse: 'yes',
        propertyType: 'single-family',
        propertyLocation: 'suburban',
        propertyAge: 10,
        propertySize: 2000,
        propertyTaxes: 3000,
        homeownersInsurance: 1200,
        monthlyDebts: 500,
        creditScore: 720,
        annualIncome: 80000,
        closingCosts: 5000,
        prepaidItems: 2000,
        sellerCredits: 0,
        analysisPeriod: 30
      };

      const outputs = calculateVALoan(inputs);

      expect(outputs.loanAmount).toBe(300000 + outputs.fundingFeeAmount);
      expect(outputs.cashToClose).toBe(outputs.totalClosingCosts + inputs.prepaidItems);
    });

    it('should handle high income scenario', () => {
      const inputs = {
        purchasePrice: 500000,
        downPayment: 0,
        interestRate: 6.5,
        loanTerm: 30,
        veteranStatus: 'veteran',
        serviceYears: 4,
        disabilityRating: 0,
        firstTimeUse: 'yes',
        propertyType: 'single-family',
        propertyLocation: 'suburban',
        propertyAge: 10,
        propertySize: 2500,
        propertyTaxes: 5000,
        homeownersInsurance: 2000,
        monthlyDebts: 1000,
        creditScore: 750,
        annualIncome: 150000,
        closingCosts: 8000,
        prepaidItems: 3000,
        sellerCredits: 0,
        analysisPeriod: 30
      };

      const outputs = calculateVALoan(inputs);

      expect(outputs.debtToIncomeRatio).toBeLessThan(50);
      expect(outputs.housingRatio).toBeLessThan(35);
      expect(outputs.eligibilityScore).toBeGreaterThan(70);
    });

    it('should handle low credit score scenario', () => {
      const inputs = {
        purchasePrice: 250000,
        downPayment: 0,
        interestRate: 7.5,
        loanTerm: 30,
        veteranStatus: 'veteran',
        serviceYears: 4,
        disabilityRating: 0,
        firstTimeUse: 'yes',
        propertyType: 'single-family',
        propertyLocation: 'suburban',
        propertyAge: 15,
        propertySize: 1800,
        propertyTaxes: 2500,
        homeownersInsurance: 1000,
        monthlyDebts: 800,
        creditScore: 620,
        annualIncome: 60000,
        closingCosts: 4000,
        prepaidItems: 1500,
        sellerCredits: 0,
        analysisPeriod: 30
      };

      const outputs = calculateVALoan(inputs);

      expect(outputs.eligibilityScore).toBeLessThan(60);
      expect(outputs.recommendation).toContain('credit score');
    });
  });

  describe('Report Generation', () => {
    it('should generate comprehensive analysis report', () => {
      const inputs = {
        purchasePrice: 300000,
        downPayment: 0,
        interestRate: 6.5,
        loanTerm: 30,
        veteranStatus: 'veteran',
        serviceYears: 4,
        disabilityRating: 0,
        firstTimeUse: 'yes',
        propertyType: 'single-family',
        propertyLocation: 'suburban',
        propertyAge: 10,
        propertySize: 2000,
        propertyTaxes: 3000,
        homeownersInsurance: 1200,
        monthlyDebts: 500,
        creditScore: 720,
        annualIncome: 80000,
        closingCosts: 5000,
        prepaidItems: 2000,
        sellerCredits: 0,
        analysisPeriod: 30
      };

      const outputs = calculateVALoan(inputs);
      const report = generateVALoanAnalysis(inputs, outputs);

      expect(report).toContain('VA Home Loan Analysis');
      expect(report).toContain('Executive Summary');
      expect(report).toContain('Financial Performance');
      expect(report).toContain('Property Details');
      expect(report).toContain('Veteran Information');
      expect(report).toContain('VA Eligibility Assessment');
      expect(report).toContain('Monthly Payment Breakdown');
      expect(report).toContain('Closing Costs');
      expect(report).toContain('VA Loan Benefits');
      expect(report).toContain('Cost Comparison');
      expect(report).toContain('VA Program Requirements');
      expect(report).toContain('Recommendations');
      expect(report).toContain('Investment Decision');
      expect(report).toContain(inputs.purchasePrice.toString());
      expect(report).toContain(outputs.monthlyPayment.toString());
      expect(report).toContain(outputs.eligibilityScore.toString());
    });

    it('should include veteran-specific information in report', () => {
      const inputs = {
        purchasePrice: 300000,
        downPayment: 0,
        interestRate: 6.5,
        loanTerm: 30,
        veteranStatus: 'veteran',
        serviceYears: 4,
        disabilityRating: 20,
        firstTimeUse: 'yes',
        propertyType: 'single-family',
        propertyLocation: 'suburban',
        propertyAge: 10,
        propertySize: 2000,
        propertyTaxes: 3000,
        homeownersInsurance: 1200,
        monthlyDebts: 500,
        creditScore: 720,
        annualIncome: 80000,
        closingCosts: 5000,
        prepaidItems: 2000,
        sellerCredits: 0,
        analysisPeriod: 30
      };

      const outputs = calculateVALoan(inputs);
      const report = generateVALoanAnalysis(inputs, outputs);

      expect(report).toContain('VETERAN');
      expect(report).toContain('4 years');
      expect(report).toContain('20%');
      expect(report).toContain('Exempt');
      expect(report).toContain('service-connected disability');
    });
  });

  describe('Calculator Integration', () => {
    it('should work with calculator interface', () => {
      const inputs = {
        purchasePrice: 300000,
        downPayment: 0,
        interestRate: 6.5,
        loanTerm: 30,
        veteranStatus: 'veteran',
        serviceYears: 4,
        disabilityRating: 0,
        firstTimeUse: 'yes',
        propertyType: 'single-family',
        propertyLocation: 'suburban',
        propertyAge: 10,
        propertySize: 2000,
        propertyTaxes: 3000,
        homeownersInsurance: 1200,
        monthlyDebts: 500,
        creditScore: 720,
        annualIncome: 80000,
        closingCosts: 5000,
        prepaidItems: 2000,
        sellerCredits: 0,
        analysisPeriod: 30
      };

      const outputs = VALoanCalculator.calculate(inputs);
      const report = VALoanCalculator.generateReport(inputs, outputs);

      expect(outputs).toBeDefined();
      expect(report).toBeDefined();
      expect(typeof report).toBe('string');
      expect(report.length).toBeGreaterThan(1000);
    });
  });
});
