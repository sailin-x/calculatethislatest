import { describe, it, expect } from 'vitest';
import {
  calculateMonthlyPayment,
  calculatePrincipalPayment,
  calculateInterestPayment,
  calculateTotalPayment,
  calculateTotalPayments,
  calculateTotalInterestPaid,
  calculateEffectiveInterestRate,
  calculateBreakEvenPoint,
  calculateBreakEvenMonths,
  calculateEquityPosition,
  calculateEquityPercentage,
  calculateLoanToValueRatio,
  calculateMonthlyCashFlow,
  calculateAnnualCashFlow,
  calculateRiskScore,
  calculateProbabilityOfDefault
} from './formulas';
import { validateMortgagePaymentInputs } from './validation';

describe('Mortgage Payment Calculator', () => {
  const mockInputs = {
    loanAmount: 300000,
    interestRate: 6.5,
    loanTerm: 30,
    loanType: 'conventional' as const,
    paymentType: 'principal_interest' as const,
    propertyValue: 400000,
    propertyAddress: '123 Main St',
    propertyType: 'single_family' as const,
    propertySize: 2000,
    propertyAge: 10,
    downPayment: 100000,
    downPaymentPercentage: 25,
    downPaymentSource: 'savings' as const,
    propertyInsurance: 1200,
    propertyTaxes: 4800,
    hoaFees: 0,
    floodInsurance: 0,
    mortgageInsurance: 0,
    borrowerIncome: 80000,
    borrowerCreditScore: 750,
    borrowerDebtToIncomeRatio: 35,
    borrowerEmploymentType: 'employed' as const,
    firstPaymentDate: '2024-02-01',
    paymentDay: 1,
    discountPoints: 0,
    originationPoints: 0,
    lenderCredits: 0,
    sellerCredits: 0,
    initialFixedPeriod: 0,
    adjustmentPeriod: 0,
    margin: 0,
    indexRate: 0,
    lifetimeCap: 0,
    periodicCap: 0,
    floorRate: 0,
    marketLocation: 'Suburban',
    marketCondition: 'stable' as const,
    marketGrowthRate: 3,
    analysisPeriod: 5,
    inflationRate: 3,
    propertyAppreciationRate: 4,
    discountRate: 8,
    currency: 'USD' as const,
    displayFormat: 'percentage' as const,
    includeCharts: true,
    armType: '3_1' as const,
    mortgageInsuranceRate: 0.5,
    paymentFrequency: 'monthly' as const
  };

  describe('Core Payment Calculations', () => {
    it('calculates monthly payment correctly', () => {
      const result = calculateMonthlyPayment(mockInputs);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeCloseTo(1918, 0); // Approximate expected value
    });

    it('calculates principal payment correctly', () => {
      const result = calculatePrincipalPayment(mockInputs);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThan(calculateMonthlyPayment(mockInputs));
    });

    it('calculates interest payment correctly', () => {
      const result = calculateInterestPayment(mockInputs);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeCloseTo(1625, 0); // 6.5% of $300,000 / 12
    });

    it('calculates total payment correctly', () => {
      const result = calculateTotalPayment(mockInputs);
      const expected = calculateMonthlyPayment(mockInputs) +
                      mockInputs.propertyTaxes / 12 +
                      mockInputs.propertyInsurance / 12 +
                      mockInputs.hoaFees +
                      mockInputs.floodInsurance / 12 +
                      mockInputs.mortgageInsurance / 12;
      expect(result).toBe(expected);
    });

    it('calculates total payments correctly', () => {
      const result = calculateTotalPayments(mockInputs);
      const monthlyPayment = calculateMonthlyPayment(mockInputs);
      expect(result).toBe(monthlyPayment * mockInputs.loanTerm * 12);
    });

    it('calculates total interest paid correctly', () => {
      const result = calculateTotalInterestPaid(mockInputs);
      expect(result).toBeGreaterThan(0);
      expect(result).toBe(calculateTotalPayments(mockInputs) - mockInputs.loanAmount);
    });
  });

  describe('Equity and LTV Calculations', () => {
    it('calculates equity position correctly', () => {
      const result = calculateEquityPosition(mockInputs);
      expect(result).toBe(mockInputs.propertyValue - mockInputs.loanAmount);
    });

    it('calculates equity percentage correctly', () => {
      const result = calculateEquityPercentage(mockInputs);
      const expected = ((mockInputs.propertyValue - mockInputs.loanAmount) / mockInputs.propertyValue) * 100;
      expect(result).toBe(expected);
    });

    it('calculates loan-to-value ratio correctly', () => {
      const result = calculateLoanToValueRatio(mockInputs);
      const expected = (mockInputs.loanAmount / mockInputs.propertyValue) * 100;
      expect(result).toBe(expected);
    });
  });

  describe('Cash Flow Calculations', () => {
    it('calculates monthly cash flow correctly', () => {
      const result = calculateMonthlyCashFlow(mockInputs);
      const monthlyIncome = mockInputs.borrowerIncome / 12;
      const monthlyExpenses = calculateTotalPayment(mockInputs);
      expect(result).toBe(monthlyIncome - monthlyExpenses);
    });

    it('calculates annual cash flow correctly', () => {
      const result = calculateAnnualCashFlow(mockInputs);
      expect(result).toBe(calculateMonthlyCashFlow(mockInputs) * 12);
    });
  });

  describe('Risk Calculations', () => {
    it('calculates risk score correctly', () => {
      const result = calculateRiskScore(mockInputs);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(100);
    });

    it('calculates probability of default correctly', () => {
      const result = calculateProbabilityOfDefault(mockInputs);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(0.5);
    });
  });

  describe('Break-Even Calculations', () => {
    it('calculates break-even point correctly', () => {
      const result = calculateBreakEvenPoint(mockInputs);
      const monthlyPayment = calculateTotalPayment(mockInputs);
      const monthlyIncome = mockInputs.borrowerIncome / 12;
      expect(result).toBe((monthlyPayment / monthlyIncome) * 100);
    });

    it('calculates break-even months correctly', () => {
      const result = calculateBreakEvenMonths(mockInputs);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThanOrEqual(mockInputs.loanTerm * 12);
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validateMortgagePaymentInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates loan amount cannot exceed property value', () => {
      const invalidInputs = { ...mockInputs, loanAmount: 500000 };
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].message).toContain('cannot exceed');
    });

    it('validates required fields', () => {
      const invalidInputs = { ...mockInputs, loanAmount: 0 };
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates credit score range', () => {
      const invalidInputs = { ...mockInputs, borrowerCreditScore: 200 };
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates interest rate range', () => {
      const invalidInputs = { ...mockInputs, interestRate: 35 };
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles zero down payment', () => {
      const result = calculateEquityPosition({ ...mockInputs, downPayment: 0 });
      expect(result).toBe(mockInputs.propertyValue - mockInputs.loanAmount);
    });

    it('handles 100% financing', () => {
      const result = calculateLoanToValueRatio({ ...mockInputs, loanAmount: mockInputs.propertyValue });
      expect(result).toBe(100);
    });

    it('handles high credit score', () => {
      const result = calculateRiskScore({ ...mockInputs, borrowerCreditScore: 800 });
      expect(result).toBeLessThan(calculateRiskScore(mockInputs));
    });

    it('handles low credit score', () => {
      const result = calculateRiskScore({ ...mockInputs, borrowerCreditScore: 600 });
      expect(result).toBeGreaterThan(calculateRiskScore(mockInputs));
    });

    it('handles interest-only loans', () => {
      const interestOnlyInputs = { ...mockInputs, paymentType: 'interest_only' as const };
      const result = calculatePrincipalPayment(interestOnlyInputs);
      expect(result).toBe(0);
    });
  });

  describe('ARM Loan Calculations', () => {
    const armInputs = {
      ...mockInputs,
      paymentType: 'arm' as const,
      initialFixedPeriod: 5,
      adjustmentPeriod: 1,
      lifetimeCap: 9.5,
      periodicCap: 2
    };

    it('handles ARM loans correctly', () => {
      const result = calculateMonthlyPayment(armInputs);
      expect(result).toBeGreaterThan(0);
    });

    it('validates ARM-specific fields', () => {
      const result = validateMortgagePaymentInputs(armInputs);
      expect(result.length).toBe(0);
    });
  });
});