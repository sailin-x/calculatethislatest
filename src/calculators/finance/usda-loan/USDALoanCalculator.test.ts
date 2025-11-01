import { describe, it, expect, beforeEach } from 'vitest';
import { USDALoanCalculator } from './USDALoanCalculator';
import { calculateUSDALoan, generateUSDALoanAnalysis } from './formulas';
import { validateUSDALoanInputs } from './validation';
import { validateAllUSDALoanInputs } from './quickValidation';

describe('USDALoanCalculator', () => {
  let validInputs: any;

  beforeEach(() => {
    validInputs = {
      purchasePrice: 250000,
      downPayment: 0,
      interestRate: 6.5,
      loanTerm: 30,
      annualIncome: 75000,
      householdSize: 4,
      propertyLocation: 'rural',
      propertyType: 'single-family',
      propertyAge: 10,
      propertySize: 2000,
      propertyTaxes: 3000,
      homeownersInsurance: 1200,
      monthlyDebts: 500,
      creditScore: 680,
      guaranteeFee: 1.0,
      annualFee: 0.35,
      closingCosts: 5000,
      prepaidItems: 2000,
      sellerCredits: 0,
      analysisPeriod: 30
    };
  });

  describe('Calculator Structure', () => {
    it('should have correct metadata', () => {
      expect(USDALoanCalculator.name).toBe('USDA Loan Calculator');
      expect(USDALoanCalculator.category).toBe('finance');
      expect(USDALoanCalculator.description).toContain('USDA');
    });

    it('should have all required input fields', () => {
      const inputFields = USDALoanCalculator.inputs;
      expect(inputFields).toBeDefined();
      expect(inputFields.purchasePrice).toBeDefined();
      expect(inputFields.downPayment).toBeDefined();
      expect(inputFields.interestRate).toBeDefined();
      expect(inputFields.loanTerm).toBeDefined();
      expect(inputFields.annualIncome).toBeDefined();
      expect(inputFields.householdSize).toBeDefined();
      expect(inputFields.propertyLocation).toBeDefined();
      expect(inputFields.propertyType).toBeDefined();
      expect(inputFields.propertyAge).toBeDefined();
      expect(inputFields.propertySize).toBeDefined();
      expect(inputFields.propertyTaxes).toBeDefined();
      expect(inputFields.homeownersInsurance).toBeDefined();
      expect(inputFields.monthlyDebts).toBeDefined();
      expect(inputFields.creditScore).toBeDefined();
      expect(inputFields.guaranteeFee).toBeDefined();
      expect(inputFields.annualFee).toBeDefined();
      expect(inputFields.closingCosts).toBeDefined();
      expect(inputFields.prepaidItems).toBeDefined();
      expect(inputFields.sellerCredits).toBeDefined();
      expect(inputFields.analysisPeriod).toBeDefined();
    });

    it('should have all required output fields', () => {
      const outputFields = USDALoanCalculator.outputs;
      expect(outputFields).toBeDefined();
      expect(outputFields.loanAmount).toBeDefined();
      expect(outputFields.monthlyPayment).toBeDefined();
      expect(outputFields.monthlyEscrow).toBeDefined();
      expect(outputFields.monthlyUSDAFee).toBeDefined();
      expect(outputFields.totalMonthlyPayment).toBeDefined();
      expect(outputFields.guaranteeFeeAmount).toBeDefined();
      expect(outputFields.totalClosingCosts).toBeDefined();
      expect(outputFields.cashToClose).toBeDefined();
      expect(outputFields.debtToIncomeRatio).toBeDefined();
      expect(outputFields.housingRatio).toBeDefined();
      expect(outputFields.incomeEligibility).toBeDefined();
      expect(outputFields.locationEligibility).toBeDefined();
      expect(outputFields.propertyEligibility).toBeDefined();
      expect(outputFields.totalInterestPaid).toBeDefined();
      expect(outputFields.totalUSDAFees).toBeDefined();
      expect(outputFields.totalCost).toBeDefined();
      expect(outputFields.savingsVsConventional).toBeDefined();
      expect(outputFields.eligibilityScore).toBeDefined();
      expect(outputFields.recommendation).toBeDefined();
    });

    it('should have calculation and report generation functions', () => {
      expect(USDALoanCalculator.calculate).toBe(calculateUSDALoan);
      expect(USDALoanCalculator.generateReport).toBe(generateUSDALoanAnalysis);
    });
  });

  describe('Input Validation', () => {
    it('should validate correct inputs', () => {
      const result = validateUSDALoanInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect missing required fields', () => {
      const invalidInputs = { ...validInputs };
      delete invalidInputs.purchasePrice;
      
      const result = validateUSDALoanInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Purchase price must be a valid number');
    });

    it('should detect OutOfRange values', () => {
      const invalidInputs = { ...validInputs, purchasePrice: -100 };
      
      const result = validateUSDALoanInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Purchase price must be greater than 0');
    });

    it('should detect logical errors', () => {
      const invalidInputs = { ...validInputs, downPayment: 300000 };
      
      const result = validateUSDALoanInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Down payment must be less than purchase price');
    });

    it('should provide warnings for unusual values', () => {
      const warningInputs = { ...validInputs, interestRate: 20 };
      
      const result = validateUSDALoanInputs(warningInputs);
      expect(result.isValid).toBe(true);
      expect(result.warnings).toContain('Interest rate is very high. Verify the value is correct');
    });

    it('should validate USDA income limits', () => {
      const highIncomeInputs = { ...validInputs, annualIncome: 200000, householdSize: 4 };
      
      const result = validateUSDALoanInputs(highIncomeInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Annual income exceeds USDA limits for household size of 4');
    });
  });

  describe('Quick Validation', () => {
    it('should validate individual fields correctly', () => {
      const result = validateAllUSDALoanInputs(validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should handle invalid purchase price', () => {
      const invalidInputs = { ...validInputs, purchasePrice: -100 };
      const result = validateAllUSDALoanInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('Purchase price must be greater than 0');
    });

    it('should handle USDA-specific warnings', () => {
      const urbanInputs = { ...validInputs, propertyLocation: 'urban' };
      const result = validateAllUSDALoanInputs(urbanInputs);
      expect(result.isValid).toBe(true);
      expect(result.message).toContain('Urban properties typically have limited USDA eligibility');
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate basic financial metrics correctly', () => {
      const outputs = calculateUSDALoan(validInputs);
      
      expect(outputs.loanAmount).toBeGreaterThan(0);
      expect(outputs.monthlyPayment).toBeGreaterThan(0);
      expect(outputs.totalMonthlyPayment).toBeGreaterThan(0);
      expect(outputs.debtToIncomeRatio).toBeGreaterThan(0);
      expect(outputs.housingRatio).toBeGreaterThan(0);
    });

    it('should calculate USDA-specific fees', () => {
      const outputs = calculateUSDALoan(validInputs);
      
      expect(outputs.guaranteeFeeAmount).toBeGreaterThan(0);
      expect(outputs.monthlyUSDAFee).toBeGreaterThan(0);
      expect(outputs.totalUSDAFees).toBeGreaterThan(0);
    });

    it('should calculate eligibility assessments', () => {
      const outputs = calculateUSDALoan(validInputs);
      
      expect(outputs.incomeEligibility).toBeDefined();
      expect(outputs.locationEligibility).toBeDefined();
      expect(outputs.propertyEligibility).toBeDefined();
      expect(outputs.eligibilityScore).toBeGreaterThanOrEqual(0);
      expect(outputs.eligibilityScore).toBeLessThanOrEqual(100);
    });

    it('should generate recommendations', () => {
      const outputs = calculateUSDALoan(validInputs);
      
      expect(outputs.recommendation).toBeDefined();
      expect(typeof outputs.recommendation).toBe('string');
      expect(outputs.recommendation.length).toBeGreaterThan(0);
    });

    it('should handle different property locations', () => {
      const ruralInputs = { ...validInputs, propertyLocation: 'rural' };
      const suburbanInputs = { ...validInputs, propertyLocation: 'suburban' };
      const urbanInputs = { ...validInputs, propertyLocation: 'urban' };
      
      const ruralOutputs = calculateUSDALoan(ruralInputs);
      const suburbanOutputs = calculateUSDALoan(suburbanInputs);
      const urbanOutputs = calculateUSDALoan(urbanInputs);
      
      expect(ruralOutputs.locationEligibility).toBe('Highly Eligible');
      expect(suburbanOutputs.locationEligibility).toBe('Moderately Eligible');
      expect(urbanOutputs.locationEligibility).toBe('Limited Eligibility');
    });

    it('should handle different property types', () => {
      const singleFamilyInputs = { ...validInputs, propertyType: 'single-family' };
      const condoInputs = { ...validInputs, propertyType: 'condo' };
      
      const singleFamilyOutputs = calculateUSDALoan(singleFamilyInputs);
      const condoOutputs = calculateUSDALoan(condoInputs);
      
      expect(singleFamilyOutputs.propertyEligibility).toBe('Highly Eligible');
      expect(condoOutputs.propertyEligibility).toBe('Moderately Eligible');
    });

    it('should handle income eligibility correctly', () => {
      const eligibleInputs = { ...validInputs, annualIncome: 70000, householdSize: 4 };
      const ineligibleInputs = { ...validInputs, annualIncome: 200000, householdSize: 4 };
      
      const eligibleOutputs = calculateUSDALoan(eligibleInputs);
      const ineligibleOutputs = calculateUSDALoan(ineligibleInputs);
      
      expect(eligibleOutputs.incomeEligibility).toBe('Eligible');
      expect(ineligibleOutputs.incomeEligibility).toBe('Not Eligible');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero down payment', () => {
      const zeroDownInputs = { ...validInputs, downPayment: 0 };
      const outputs = calculateUSDALoan(zeroDownInputs);
      
      expect(outputs).toBeDefined();
      expect(outputs.loanAmount).toBeGreaterThan(validInputs.purchasePrice);
    });

    it('should handle very high property values', () => {
      const highValueInputs = { ...validInputs, purchasePrice: 1000000 };
      const outputs = calculateUSDALoan(highValueInputs);
      
      expect(outputs).toBeDefined();
      expect(outputs.loanAmount).toBeGreaterThan(0);
    });

    it('should handle very low credit scores', () => {
      const lowCreditInputs = { ...validInputs, creditScore: 550 };
      const outputs = calculateUSDALoan(lowCreditInputs);
      
      expect(outputs).toBeDefined();
      expect(outputs.eligibilityScore).toBeLessThan(80);
    });

    it('should handle high DebtToIncome ratios', () => {
      const highDebtInputs = { ...validInputs, monthlyDebts: 2000 };
      const outputs = calculateUSDALoan(highDebtInputs);
      
      expect(outputs).toBeDefined();
      expect(outputs.debtToIncomeRatio).toBeGreaterThan(40);
    });
  });

  describe('Report Generation', () => {
    it('should generate a comprehensive analysis report', () => {
      const outputs = calculateUSDALoan(validInputs);
      const report = generateUSDALoanAnalysis(validInputs, outputs);
      
      expect(report).toContain('USDA Rural Development Loan Analysis');
      expect(report).toContain('Executive Summary');
      expect(report).toContain('Financial Performance');
      expect(report).toContain('Property Details');
      expect(report).toContain('Financial Terms');
      expect(report).toContain('Borrower Information');
      expect(report).toContain('USDA Eligibility Assessment');
      expect(report).toContain('Monthly Payment Breakdown');
      expect(report).toContain('Closing Costs');
      expect(report).toContain('USDA Loan Benefits');
      expect(report).toContain('Cost Comparison');
      expect(report).toContain('USDA Program Requirements');
      expect(report).toContain('Recommendations');
      expect(report).toContain('Investment Decision');
    });

    it('should include all key metrics in the report', () => {
      const outputs = calculateUSDALoan(validInputs);
      const report = generateUSDALoanAnalysis(validInputs, outputs);
      
      expect(report).toContain(outputs.monthlyPayment.toString());
      expect(report).toContain(outputs.totalMonthlyPayment.toString());
      expect(report).toContain(outputs.debtToIncomeRatio.toString());
      expect(report).toContain(outputs.housingRatio.toString());
      expect(report).toContain(outputs.eligibilityScore.toString());
    });

    it('should include property and financial details', () => {
      const outputs = calculateUSDALoan(validInputs);
      const report = generateUSDALoanAnalysis(validInputs, outputs);
      
      expect(report).toContain(validInputs.propertyType.replace('-', ' ').toUpperCase());
      expect(report).toContain(validInputs.propertyLocation.toUpperCase());
      expect(report).toContain(validInputs.purchasePrice.toString());
      expect(report).toContain(validInputs.annualIncome.toString());
    });

    it('should include USDA-specific information', () => {
      const outputs = calculateUSDALoan(validInputs);
      const report = generateUSDALoanAnalysis(validInputs, outputs);
      
      expect(report).toContain('USDA Rural Development');
      expect(report).toContain('USDA Guarantee Fee');
      expect(report).toContain('USDA Annual Fee');
      expect(report).toContain('USDA Loan Benefits');
      expect(report).toContain('No Down Payment Required');
    });
  });

  describe('Integration Tests', () => {
    it('should work with the complete calculator flow', () => {
      // Test the complete flow from inputs to outputs
      const validation = validateUSDALoanInputs(validInputs);
      expect(validation.isValid).toBe(true);
      
      const outputs = calculateUSDALoan(validInputs);
      expect(outputs).toBeDefined();
      
      const report = generateUSDALoanAnalysis(validInputs, outputs);
      expect(report).toBeDefined();
    });

    it('should handle realistic USDA loan scenarios', () => {
      const realisticInputs = {
        purchasePrice: 300000,
        downPayment: 0,
        interestRate: 5.5,
        loanTerm: 30,
        annualIncome: 65000,
        householdSize: 3,
        propertyLocation: 'rural',
        propertyType: 'single-family',
        propertyAge: 5,
        propertySize: 1800,
        propertyTaxes: 3500,
        homeownersInsurance: 1400,
        monthlyDebts: 300,
        creditScore: 720,
        guaranteeFee: 1.0,
        annualFee: 0.35,
        closingCosts: 6000,
        prepaidItems: 2500,
        sellerCredits: 0,
        analysisPeriod: 30
      };
      
      const outputs = calculateUSDALoan(realisticInputs);
      
      expect(outputs.debtToIncomeRatio).toBeGreaterThan(20);
      expect(outputs.debtToIncomeRatio).toBeLessThan(50);
      expect(outputs.housingRatio).toBeGreaterThan(20);
      expect(outputs.housingRatio).toBeLessThan(35);
      expect(outputs.eligibilityScore).toBeGreaterThan(70); // Good rural property with decent income
    });

    it('should handle challenging scenarios', () => {
      const challengingInputs = {
        purchasePrice: 400000,
        downPayment: 0,
        interestRate: 7.0,
        loanTerm: 30,
        annualIncome: 85000,
        householdSize: 6,
        propertyLocation: 'suburban',
        propertyType: 'condo',
        propertyAge: 25,
        propertySize: 1500,
        propertyTaxes: 5000,
        homeownersInsurance: 1800,
        monthlyDebts: 800,
        creditScore: 650,
        guaranteeFee: 1.0,
        annualFee: 0.35,
        closingCosts: 8000,
        prepaidItems: 3000,
        sellerCredits: 0,
        analysisPeriod: 30
      };
      
      const outputs = calculateUSDALoan(challengingInputs);
      
      expect(outputs.eligibilityScore).toBeLessThan(70); // More challenging scenario
      expect(outputs.locationEligibility).toBe('Moderately Eligible');
      expect(outputs.propertyEligibility).toBe('Moderately Eligible');
    });
  });
});
