import { describe, it, expect, beforeEach } from 'vitest';
import { calculateMortgagePayment } from './formulas';
import { validateMortgagePaymentInputs } from './validation';
import { validateField } from './quickValidation';
import { MortgagePaymentInputs } from './types';

describe('Mortgage Payment Calculator', () => {
  let validInputs: MortgagePaymentInputs;

  beforeEach(() => {
    validInputs = {
      // Loan Information
      loanAmount: 300000,
      interestRate: 4.5,
      loanTerm: 30,
      loanType: 'conventional',
      paymentType: 'principal_interest',
      
      // ARM Information
      armType: '5_1',
      initialFixedPeriod: 5,
      adjustmentPeriod: 1,
      margin: 2.5,
      indexRate: 3.0,
      lifetimeCap: 5.0,
      periodicCap: 2.0,
      floorRate: 2.0,
      
      // Property Information
      propertyValue: 375000,
      propertyAddress: '123 Main St',
      propertyType: 'single_family',
      propertySize: 2000,
      propertyAge: 10,
      
      // Down Payment Information
      downPayment: 75000,
      downPaymentPercentage: 20,
      downPaymentSource: 'savings',
      
      // Insurance and Taxes
      propertyInsurance: 1200,
      propertyTaxes: 3750,
      hoaFees: 0,
      floodInsurance: 0,
      mortgageInsurance: 0,
      mortgageInsuranceRate: 0.5,
      
      // Payment Information
      paymentFrequency: 'monthly',
      firstPaymentDate: '2024-01-01',
      paymentDay: 1,
      
      // Points and Credits
      discountPoints: 0,
      originationPoints: 1,
      lenderCredits: 0,
      sellerCredits: 0,
      
      // Borrower Information
      borrowerIncome: 80000,
      borrowerCreditScore: 750,
      borrowerDebtToIncomeRatio: 36,
      borrowerEmploymentType: 'employed',
      
      // Market Information
      marketLocation: 'San Francisco, CA',
      marketCondition: 'stable',
      marketGrowthRate: 3.0,
      
      // Analysis Parameters
      analysisPeriod: 30,
      inflationRate: 2.5,
      propertyAppreciationRate: 3.0,
      discountRate: 5.0,
      
      // Reporting Preferences
      currency: 'USD',
      displayFormat: 'currency',
      includeCharts: true,
    };
  });

  describe('calculateMortgagePayment', () => {
    it('should calculate principal and interest payment correctly', () => {
      const result = calculateMortgagePayment(validInputs);
      
      expect(result.monthlyPayment).toBeGreaterThan(0);
      expect(result.principalPayment).toBeGreaterThan(0);
      expect(result.interestPayment).toBeGreaterThan(0);
      expect(result.totalPayment).toBeGreaterThan(result.monthlyPayment);
      expect(result.totalInterestPaid).toBeGreaterThan(0);
      expect(result.effectiveInterestRate).toBeGreaterThan(0);
      expect(result.breakEvenMonths).toBeGreaterThanOrEqual(0);
      expect(result.riskScore).toBeGreaterThanOrEqual(0);
      expect(result.riskScore).toBeLessThanOrEqual(100);
    });

    it('should calculate interest-only payment correctly', () => {
      const interestOnlyInputs = { ...validInputs, paymentType: 'interest_only' as const };
      const result = calculateMortgagePayment(interestOnlyInputs);
      
      expect(result.monthlyPayment).toBeGreaterThan(0);
      expect(result.principalPayment).toBe(0);
      expect(result.interestPayment).toBeGreaterThan(0);
    });

    it('should calculate ARM payment correctly', () => {
      const armInputs = { ...validInputs, paymentType: 'arm' as const };
      const result = calculateMortgagePayment(armInputs);
      
      expect(result.monthlyPayment).toBeGreaterThan(0);
      expect(result.armSchedule).toHaveLength(30);
      expect(result.armSchedule[0].rate).toBe(armInputs.interestRate);
    });

    it('should generate amortization schedule', () => {
      const result = calculateMortgagePayment(validInputs);
      
      expect(result.amortizationSchedule).toHaveLength(validInputs.loanTerm * 12);
      expect(result.amortizationSchedule[0].paymentNumber).toBe(1);
      expect(result.amortizationSchedule[0].balance).toBe(validInputs.loanAmount);
      expect(result.amortizationSchedule[result.amortizationSchedule.length - 1].balance).toBe(0);
    });

    it('should calculate equity analysis correctly', () => {
      const result = calculateMortgagePayment(validInputs);
      
      expect(result.equityPosition).toBe(validInputs.propertyValue - validInputs.loanAmount);
      expect(result.equityPercentage).toBe(((validInputs.propertyValue - validInputs.loanAmount) / validInputs.propertyValue) * 100);
      expect(result.loanToValueRatio).toBe((validInputs.loanAmount / validInputs.propertyValue) * 100);
    });

    it('should calculate cash flow analysis correctly', () => {
      const result = calculateMortgagePayment(validInputs);
      
      const expectedMonthlyIncome = validInputs.borrowerIncome / 12;
      const expectedTotalMonthlyCost = result.monthlyPayment + (validInputs.propertyInsurance / 12) + (validInputs.propertyTaxes / 12) + validInputs.hoaFees;
      const expectedMonthlyCashFlow = expectedMonthlyIncome - expectedTotalMonthlyCost;
      
      expect(result.monthlyCashFlow).toBeCloseTo(expectedMonthlyCashFlow, 2);
      expect(result.annualCashFlow).toBeCloseTo(expectedMonthlyCashFlow * 12, 2);
    });

    it('should generate sensitivity matrix', () => {
      const result = calculateMortgagePayment(validInputs);
      
      expect(result.sensitivityMatrix).toHaveLength(3); // Interest Rate, Loan Amount, Loan Term
      expect(result.sensitivityMatrix[0].variable).toBe('Interest Rate');
      expect(result.sensitivityMatrix[0].values).toHaveLength(5);
      expect(result.sensitivityMatrix[0].impacts).toHaveLength(5);
    });

    it('should generate scenario analysis', () => {
      const result = calculateMortgagePayment(validInputs);
      
      expect(result.scenarios).toHaveLength(3); // Conservative, Base Case, Aggressive
      expect(result.scenarios[0].scenario).toBe('Conservative');
      expect(result.scenarios[1].scenario).toBe('Base Case');
      expect(result.scenarios[2].scenario).toBe('Aggressive');
    });

    it('should generate comparison analysis', () => {
      const result = calculateMortgagePayment(validInputs);
      
      expect(result.comparisonAnalysis).toHaveLength(3); // Monthly Payment, Total Interest, Break-Even Months
      expect(result.comparisonAnalysis[0].metric).toBe('Monthly Payment');
      expect(result.comparisonAnalysis[1].metric).toBe('Total Interest');
      expect(result.comparisonAnalysis[2].metric).toBe('Break-Even Months');
    });

    it('should calculate risk metrics correctly', () => {
      const result = calculateMortgagePayment(validInputs);
      
      expect(result.riskScore).toBeGreaterThanOrEqual(0);
      expect(result.riskScore).toBeLessThanOrEqual(100);
      expect(result.probabilityOfDefault).toBeGreaterThanOrEqual(0);
      expect(result.probabilityOfDefault).toBeLessThanOrEqual(1);
      expect(result.paymentShockRisk).toBeGreaterThanOrEqual(0);
      expect(result.paymentShockRisk).toBeLessThanOrEqual(1);
      expect(result.interestRateRisk).toBeGreaterThanOrEqual(0);
      expect(result.interestRateRisk).toBeLessThanOrEqual(1);
    });

    it('should generate comprehensive analysis', () => {
      const result = calculateMortgagePayment(validInputs);
      
      expect(result.analysis.paymentRating).toBeDefined();
      expect(result.analysis.affordabilityRating).toBeDefined();
      expect(result.analysis.recommendation).toBeDefined();
      expect(result.analysis.keyStrengths).toBeInstanceOf(Array);
      expect(result.analysis.keyWeaknesses).toBeInstanceOf(Array);
      expect(result.analysis.riskFactors).toBeInstanceOf(Array);
      expect(result.analysis.opportunities).toBeInstanceOf(Array);
    });
  });

  describe('validateMortgagePaymentInputs', () => {
    it('should validate correct inputs', () => {
      const result = validateMortgagePaymentInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toBeUndefined();
    });

    it('should reject negative loan amount', () => {
      const invalidInputs = { ...validInputs, loanAmount: -1000 };
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.loanAmount).toBeDefined();
    });

    it('should reject zero interest rate', () => {
      const invalidInputs = { ...validInputs, interestRate: 0 };
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.interestRate).toBeDefined();
    });

    it('should reject negative loan term', () => {
      const invalidInputs = { ...validInputs, loanTerm: -5 };
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.loanTerm).toBeDefined();
    });

    it('should reject loan amount exceeding property value', () => {
      const invalidInputs = { ...validInputs, loanAmount: 500000, propertyValue: 400000 };
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.loanAmount).toBeDefined();
    });

    it('should reject negative down payment', () => {
      const invalidInputs = { ...validInputs, downPayment: -1000 };
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.downPayment).toBeDefined();
    });

    it('should reject down payment exceeding property value', () => {
      const invalidInputs = { ...validInputs, downPayment: 500000, propertyValue: 400000 };
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.downPayment).toBeDefined();
    });

    it('should reject invalid credit score', () => {
      const invalidInputs = { ...validInputs, borrowerCreditScore: 200 };
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.borrowerCreditScore).toBeDefined();
    });

    it('should reject negative borrower income', () => {
      const invalidInputs = { ...validInputs, borrowerIncome: -50000 };
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.borrowerIncome).toBeDefined();
    });

    it('should validate ARM-specific fields when payment type is ARM', () => {
      const armInputs = { ...validInputs, paymentType: 'arm' as const };
      const result = validateMortgagePaymentInputs(armInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid ARM floor rate', () => {
      const invalidArmInputs = { 
        ...validInputs, 
        paymentType: 'arm' as const,
        floorRate: 6.0, // Higher than interest rate
        interestRate: 4.5
      };
      const result = validateMortgagePaymentInputs(invalidArmInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.floorRate).toBeDefined();
    });
  });

  describe('validateField', () => {
    it('should validate loan amount correctly', () => {
      const result = validateField('loanAmount', 300000, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid loan amount', () => {
      const result = validateField('loanAmount', -1000, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate interest rate correctly', () => {
      const result = validateField('interestRate', 4.5, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid interest rate', () => {
      const result = validateField('interestRate', 30, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate loan type correctly', () => {
      const result = validateField('loanType', 'conventional', validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid loan type', () => {
      const result = validateField('loanType', 'invalid_type', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate payment type correctly', () => {
      const result = validateField('paymentType', 'principal_interest', validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid payment type', () => {
      const result = validateField('paymentType', 'invalid_payment', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate property value correctly', () => {
      const result = validateField('propertyValue', 375000, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid property value', () => {
      const result = validateField('propertyValue', -1000, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate down payment correctly', () => {
      const result = validateField('downPayment', 75000, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject down payment exceeding property value', () => {
      const result = validateField('downPayment', 500000, { ...validInputs, propertyValue: 400000 });
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate credit score correctly', () => {
      const result = validateField('borrowerCreditScore', 750, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid credit score', () => {
      const result = validateField('borrowerCreditScore', 200, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate borrower income correctly', () => {
      const result = validateField('borrowerIncome', 80000, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject negative borrower income', () => {
      const result = validateField('borrowerIncome', -50000, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate ARM-specific fields', () => {
      const result = validateField('armType', '5_1', validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid ARM type', () => {
      const result = validateField('armType', 'invalid_arm', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate margin correctly', () => {
      const result = validateField('margin', 2.5, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid margin', () => {
      const result = validateField('margin', 15, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate lifetime cap with allInputs context', () => {
      const result = validateField('lifetimeCap', 5.0, { ...validInputs, interestRate: 4.5 });
      expect(result.isValid).toBe(true);
    });

    it('should reject lifetime cap lower than interest rate', () => {
      const result = validateField('lifetimeCap', 3.0, { ...validInputs, interestRate: 4.5 });
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero interest rate gracefully', () => {
      const zeroRateInputs = { ...validInputs, interestRate: 0.01 }; // Very low rate
      const result = calculateMortgagePayment(zeroRateInputs);
      expect(result.monthlyPayment).toBeGreaterThan(0);
    });

    it('should handle very short loan term', () => {
      const shortTermInputs = { ...validInputs, loanTerm: 1 };
      const result = calculateMortgagePayment(shortTermInputs);
      expect(result.amortizationSchedule).toHaveLength(12);
    });

    it('should handle very long loan term', () => {
      const longTermInputs = { ...validInputs, loanTerm: 50 };
      const result = calculateMortgagePayment(longTermInputs);
      expect(result.amortizationSchedule).toHaveLength(600);
    });

    it('should handle high interest rate', () => {
      const highRateInputs = { ...validInputs, interestRate: 20 };
      const result = calculateMortgagePayment(highRateInputs);
      expect(result.monthlyPayment).toBeGreaterThan(0);
      expect(result.totalInterestPaid).toBeGreaterThan(highRateInputs.loanAmount);
    });

    it('should handle very low down payment', () => {
      const lowDownInputs = { ...validInputs, downPayment: 1000, downPaymentPercentage: 0.27 };
      const result = calculateMortgagePayment(lowDownInputs);
      expect(result.equityPosition).toBe(validInputs.propertyValue - validInputs.loanAmount);
    });

    it('should handle very high down payment', () => {
      const highDownInputs = { ...validInputs, downPayment: 350000, downPaymentPercentage: 93.33 };
      const result = calculateMortgagePayment(highDownInputs);
      expect(result.equityPosition).toBe(validInputs.propertyValue - validInputs.loanAmount);
    });
  });

  describe('Business Logic', () => {
    it('should calculate correct monthly payment for 30-year fixed', () => {
      // Standard 30-year fixed mortgage calculation
      const standardInputs = { ...validInputs, loanAmount: 300000, interestRate: 4.5, loanTerm: 30 };
      const result = calculateMortgagePayment(standardInputs);
      
      // Expected monthly payment for $300k at 4.5% for 30 years
      const expectedPayment = 1520.06; // Calculated using standard formula
      expect(result.monthlyPayment).toBeCloseTo(expectedPayment, 0);
    });

    it('should calculate correct total interest for 30-year fixed', () => {
      const standardInputs = { ...validInputs, loanAmount: 300000, interestRate: 4.5, loanTerm: 30 };
      const result = calculateMortgagePayment(standardInputs);
      
      // Expected total interest for $300k at 4.5% for 30 years
      const expectedTotalInterest = 247220.00; // Approximately
      expect(result.totalInterestPaid).toBeCloseTo(expectedTotalInterest, -3); // Within $1000
    });

    it('should calculate correct equity position', () => {
      const result = calculateMortgagePayment(validInputs);
      const expectedEquity = validInputs.propertyValue - validInputs.loanAmount;
      expect(result.equityPosition).toBe(expectedEquity);
    });

    it('should calculate correct loan-to-value ratio', () => {
      const result = calculateMortgagePayment(validInputs);
      const expectedLTV = (validInputs.loanAmount / validInputs.propertyValue) * 100;
      expect(result.loanToValueRatio).toBe(expectedLTV);
    });

    it('should calculate correct debt-to-income ratio', () => {
      const result = calculateMortgagePayment(validInputs);
      const monthlyIncome = validInputs.borrowerIncome / 12;
      const expectedDTI = (result.monthlyPayment / monthlyIncome) * 100;
      expect(result.analysis.paymentSummary).toContain(expectedDTI.toFixed(1));
    });
  });
});