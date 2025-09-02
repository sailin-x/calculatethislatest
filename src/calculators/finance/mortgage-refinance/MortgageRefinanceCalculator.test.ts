import { describe, it, expect, beforeEach } from 'vitest';
import { calculateMortgageRefinance } from './formulas';
import { validateMortgageRefinanceInputs } from './validation';
import { validateField } from './quickValidation';
import { MortgageRefinanceInputs } from './types';

describe('Mortgage Refinance Calculator', () => {
  let validInputs: MortgageRefinanceInputs;

  beforeEach(() => {
    validInputs = {
      // Current Loan Info
      currentLoanAmount: 300000,
      currentInterestRate: 5.5,
      currentLoanTerm: 30,
      currentLoanType: 'conventional',
      currentPaymentType: 'principal_interest',
      currentMonthlyPayment: 1703.37,
      currentRemainingTerm: 25,
      currentPrincipalBalance: 280000,

      // New Loan Info
      newLoanAmount: 280000,
      newInterestRate: 4.0,
      newLoanTerm: 30,
      newLoanType: 'conventional',
      newPaymentType: 'principal_interest',

      // Refinance Type
      refinanceType: 'rate_term',

      // Property Info
      propertyValue: 350000,
      propertyAddress: '123 Main St, Anytown, USA',
      propertyType: 'single_family',
      propertySize: 2000,
      propertyAge: 15,

      // Refinance Costs
      closingCosts: 5000,
      originationFee: 1000,
      appraisalFee: 500,
      titleInsuranceFee: 800,
      recordingFee: 200,
      attorneyFee: 300,
      creditReportFee: 50,
      floodCertificationFee: 20,
      taxServiceFee: 100,
      otherFees: 1030,

      // Borrower Info
      borrowerIncome: 80000,
      borrowerCreditScore: 750,
      borrowerDebtToIncomeRatio: 35,
      borrowerEmploymentType: 'employed',
      borrowerTaxRate: 25,

      // Market Info
      marketLocation: 'Suburban',
      marketCondition: 'stable',
      marketGrowthRate: 3.0,

      // Analysis Parameters
      analysisPeriod: 30,
      inflationRate: 2.5,
      propertyAppreciationRate: 3.0,
      discountRate: 5.0,
      taxDeductionPeriod: 30,

      // Refinance Goals
      refinanceGoal: 'lower_payment',
      targetMonthlySavings: 200,
      targetRate: 4.0,
      cashOutAmount: 0,

      // Reporting Preferences
      currency: 'USD',
      displayFormat: 'currency',
      includeCharts: true,
    };
  });

  describe('calculateMortgageRefinance', () => {
    it('should calculate basic refinance metrics correctly', () => {
      const result = calculateMortgageRefinance(validInputs);

      expect(result.monthlyPaymentSavings).toBeGreaterThan(0);
      expect(result.interestSavings).toBeGreaterThan(0);
      expect(result.breakEvenMonths).toBeGreaterThan(0);
      expect(result.netSavings).toBeGreaterThan(0);
      expect(result.returnOnInvestment).toBeGreaterThan(0);
      expect(result.riskScore).toBeGreaterThanOrEqual(0);
      expect(result.riskScore).toBeLessThanOrEqual(100);
    });

    it('should calculate payment differences correctly', () => {
      const result = calculateMortgageRefinance(validInputs);

      expect(result.newMonthlyPayment).toBeLessThan(validInputs.currentMonthlyPayment);
      expect(result.monthlyPaymentSavings).toBe(validInputs.currentMonthlyPayment - result.newMonthlyPayment);
      expect(result.paymentSavingsPercentage).toBeGreaterThan(0);
    });

    it('should calculate interest savings correctly', () => {
      const result = calculateMortgageRefinance(validInputs);

      expect(result.interestSavings).toBeGreaterThan(0);
      expect(result.interestSavingsPercentage).toBeGreaterThan(0);
      expect(result.totalInterestPaid).toBeGreaterThan(0);
    });

    it('should calculate break-even analysis correctly', () => {
      const result = calculateMortgageRefinance(validInputs);

      expect(result.breakEvenMonths).toBeGreaterThan(0);
      expect(result.breakEvenDate).toBeDefined();
      expect(result.breakEvenAmount).toBeGreaterThan(0);
    });

    it('should calculate cash flow analysis correctly', () => {
      const result = calculateMortgageRefinance(validInputs);

      expect(result.monthlyCashFlow).toBeDefined();
      expect(result.annualCashFlow).toBeDefined();
      expect(result.totalCashFlow).toBeDefined();
    });

    it('should calculate equity analysis correctly', () => {
      const result = calculateMortgageRefinance(validInputs);

      expect(result.currentEquity).toBeGreaterThan(0);
      expect(result.newEquity).toBeGreaterThan(0);
      expect(result.equityChange).toBeDefined();
    });

    it('should calculate tax analysis correctly', () => {
      const result = calculateMortgageRefinance(validInputs);

      expect(result.taxDeductionSavings).toBeDefined();
      expect(result.afterTaxSavings).toBeDefined();
      expect(result.effectiveRate).toBeDefined();
    });

    it('should calculate ROI and NPV correctly', () => {
      const result = calculateMortgageRefinance(validInputs);

      expect(result.returnOnInvestment).toBeGreaterThan(0);
      expect(result.netPresentValue).toBeDefined();
      expect(result.internalRateOfReturn).toBeDefined();
    });

    it('should generate analysis reports', () => {
      const result = calculateMortgageRefinance(validInputs);

      expect(result.analysis).toBeDefined();
      expect(result.analysis.amortizationComparison).toBeDefined();
      expect(result.analysis.sensitivityAnalysis).toBeDefined();
      expect(result.analysis.scenarioAnalysis).toBeDefined();
      expect(result.analysis.comparisonAnalysis).toBeDefined();
    });
  });

  describe('validateMortgageRefinanceInputs', () => {
    it('should validate correct inputs', () => {
      const result = validateMortgageRefinanceInputs(validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid loan amounts', () => {
      const invalidInputs = { ...validInputs, currentLoanAmount: -1000 };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.currentLoanAmount).toBeDefined();
    });

    it('should reject invalid interest rates', () => {
      const invalidInputs = { ...validInputs, newInterestRate: 30 };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.newInterestRate).toBeDefined();
    });

    it('should reject invalid loan terms', () => {
      const invalidInputs = { ...validInputs, newLoanTerm: 60 };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.newLoanTerm).toBeDefined();
    });

    it('should reject invalid property values', () => {
      const invalidInputs = { ...validInputs, propertyValue: -50000 };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertyValue).toBeDefined();
    });

    it('should reject invalid credit scores', () => {
      const invalidInputs = { ...validInputs, borrowerCreditScore: 200 };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.borrowerCreditScore).toBeDefined();
    });

    it('should reject invalid DTI ratios', () => {
      const invalidInputs = { ...validInputs, borrowerDebtToIncomeRatio: 120 };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.borrowerDebtToIncomeRatio).toBeDefined();
    });

    it('should reject invalid tax rates', () => {
      const invalidInputs = { ...validInputs, borrowerTaxRate: 60 };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.borrowerTaxRate).toBeDefined();
    });

    it('should reject invalid analysis periods', () => {
      const invalidInputs = { ...validInputs, analysisPeriod: 60 };
      const result = validateMortgageRefinanceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.analysisPeriod).toBeDefined();
    });
  });

  describe('validateField', () => {
    it('should validate current loan amount', () => {
      const result = validateField('currentLoanAmount', 300000, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid current loan amount', () => {
      const result = validateField('currentLoanAmount', -1000, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate new loan amount with cross-field validation', () => {
      const result = validateField('newLoanAmount', 280000, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject new loan amount exceeding property value', () => {
      const result = validateField('newLoanAmount', 400000, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('cannot exceed property value');
    });

    it('should validate cash-out refinance requirements', () => {
      const cashOutInputs = { ...validInputs, refinanceType: 'cash_out' };
      const result = validateField('newLoanAmount', 290000, cashOutInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject cash-out refinance with insufficient loan amount', () => {
      const cashOutInputs = { ...validInputs, refinanceType: 'cash_out' };
      const result = validateField('newLoanAmount', 270000, cashOutInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Cash-out refinance requires');
    });

    it('should validate cash-in refinance requirements', () => {
      const cashInInputs = { ...validInputs, refinanceType: 'cash_in' };
      const result = validateField('newLoanAmount', 270000, cashInInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject cash-in refinance with excessive loan amount', () => {
      const cashInInputs = { ...validInputs, refinanceType: 'cash_in' };
      const result = validateField('newLoanAmount', 290000, cashInInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Cash-in refinance requires');
    });

    it('should validate rate and term refinance similarity', () => {
      const result = validateField('newLoanAmount', 285000, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject rate and term refinance with too different amounts', () => {
      const result = validateField('newLoanAmount', 200000, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Rate and term refinance should have similar loan amounts');
    });

    it('should validate remaining term constraints', () => {
      const result = validateField('currentRemainingTerm', 25, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject remaining term exceeding original term', () => {
      const result = validateField('currentRemainingTerm', 35, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Remaining term cannot exceed original loan term');
    });

    it('should validate principal balance constraints', () => {
      const result = validateField('currentPrincipalBalance', 280000, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject principal balance exceeding loan amount', () => {
      const result = validateField('currentPrincipalBalance', 310000, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Current principal balance cannot exceed current loan amount');
    });

    it('should validate cash out amount constraints', () => {
      const result = validateField('cashOutAmount', 10000, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject cash out amount exceeding new loan amount', () => {
      const result = validateField('cashOutAmount', 300000, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Cash out amount cannot exceed new loan amount');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero closing costs', () => {
      const zeroCostInputs = { ...validInputs, closingCosts: 0, originationFee: 0 };
      const result = calculateMortgageRefinance(zeroCostInputs);
      expect(result.breakEvenMonths).toBe(0);
      expect(result.totalRefinanceCost).toBe(0);
    });

    it('should handle very high interest rates', () => {
      const highRateInputs = { ...validInputs, currentInterestRate: 20, newInterestRate: 15 };
      const result = calculateMortgageRefinance(highRateInputs);
      expect(result.monthlyPaymentSavings).toBeGreaterThan(0);
      expect(result.interestSavings).toBeGreaterThan(0);
    });

    it('should handle very low interest rates', () => {
      const lowRateInputs = { ...validInputs, currentInterestRate: 2, newInterestRate: 1.5 };
      const result = calculateMortgageRefinance(lowRateInputs);
      expect(result.monthlyPaymentSavings).toBeGreaterThanOrEqual(0);
    });

    it('should handle short loan terms', () => {
      const shortTermInputs = { ...validInputs, currentLoanTerm: 10, newLoanTerm: 15 };
      const result = calculateMortgageRefinance(shortTermInputs);
      expect(result.monthlyPaymentSavings).toBeDefined();
    });

    it('should handle long loan terms', () => {
      const longTermInputs = { ...validInputs, currentLoanTerm: 40, newLoanTerm: 45 };
      const result = calculateMortgageRefinance(longTermInputs);
      expect(result.monthlyPaymentSavings).toBeDefined();
    });

    it('should handle equal interest rates', () => {
      const equalRateInputs = { ...validInputs, currentInterestRate: 4.0, newInterestRate: 4.0 };
      const result = calculateMortgageRefinance(equalRateInputs);
      expect(result.monthlyPaymentSavings).toBe(0);
      expect(result.interestSavings).toBe(0);
    });

    it('should handle higher new interest rate', () => {
      const higherRateInputs = { ...validInputs, currentInterestRate: 4.0, newInterestRate: 5.0 };
      const result = calculateMortgageRefinance(higherRateInputs);
      expect(result.monthlyPaymentSavings).toBeLessThan(0);
      expect(result.interestSavings).toBeLessThan(0);
    });
  });

  describe('Business Logic', () => {
    it('should validate refinance type constraints', () => {
      const result = validateField('refinanceType', 'invalid_type', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid refinance type');
    });

    it('should validate loan type constraints', () => {
      const result = validateField('newLoanType', 'invalid_type', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid new loan type');
    });

    it('should validate payment type constraints', () => {
      const result = validateField('newPaymentType', 'invalid_type', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid new payment type');
    });

    it('should validate property type constraints', () => {
      const result = validateField('propertyType', 'invalid_type', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid property type');
    });

    it('should validate employment type constraints', () => {
      const result = validateField('borrowerEmploymentType', 'invalid_type', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid employment type');
    });

    it('should validate market condition constraints', () => {
      const result = validateField('marketCondition', 'invalid_condition', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid market condition');
    });

    it('should validate refinance goal constraints', () => {
      const result = validateField('refinanceGoal', 'invalid_goal', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid refinance goal');
    });

    it('should validate currency constraints', () => {
      const result = validateField('currency', 'INVALID', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid currency');
    });

    it('should validate display format constraints', () => {
      const result = validateField('displayFormat', 'invalid_format', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid display format');
    });

    it('should validate include charts boolean', () => {
      const result = validateField('includeCharts', 'not_boolean', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Include charts must be a boolean');
    });
  });
});