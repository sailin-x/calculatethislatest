import { describe, it, expect } from 'vitest';
import {
  calculateTotalPoints,
  calculateTotalPointCost,
  calculatePointValue,
  calculateEffectiveRate,
  calculateMonthlyPayment,
  calculateMonthlyPaymentSavings,
  calculateAnnualPaymentSavings,
  calculateTotalPaymentSavings,
  calculateTotalInterestPaid,
  calculateInterestSavings,
  calculateInterestSavingsPercentage,
  calculateTotalCost,
  calculateNetSavings,
  calculateBreakEvenPoint,
  calculateBreakEvenMonths,
  calculateTaxDeduction,
  calculateAfterTaxCost,
  calculateAfterTaxSavings,
  calculateReturnOnInvestment,
  calculateNetPresentValue,
  calculateRiskScore,
  calculateProbabilityOfBenefit
} from './formulas';
import { validateMortgagePointsInputs } from './validation';

describe('Mortgage Points Calculator', () => {
  const mockInputs = {
    loanAmount: 300000,
    baseInterestRate: 7.0,
    loanTerm: 30,
    discountPoints: 2,
    originationPoints: 0,
    pointCost: 2000,
    propertyValue: 400000,
    borrowerIncome: 80000,
    borrowerCreditScore: 750,
    borrowerTaxRate: 25,
    loanType: 'conventional' as const,
    marketCondition: 'stable' as const,
    marketGrowthRate: 3,
    analysisPeriod: 5,
    discountRate: 8,
    paymentType: 'principal_interest' as const,
    borrowerEmploymentType: 'employed' as const,
    borrowerDebtToIncomeRatio: 35,
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
    marketLocation: 'Suburban',
    inflationRate: 3,
    propertyAppreciationRate: 4,
    taxDeductionPeriod: 30,
    currency: 'USD' as const,
    displayFormat: 'percentage' as const,
    includeCharts: true,
    rateOptions: [],
    pointValue: 0.5,
    mortgageInsuranceRate: 0.5
  };

  describe('Points Calculations', () => {
    it('calculates total points correctly', () => {
      const result = calculateTotalPoints(mockInputs);
      expect(result).toBe(2);
    });

    it('calculates total point cost correctly', () => {
      const result = calculateTotalPointCost(mockInputs);
      expect(result).toBe(4000);
    });

    it('calculates point value correctly', () => {
      const result = calculatePointValue(mockInputs);
      expect(result).toBe(0.5); // 2 points * 0.25%
    });

    it('calculates effective rate correctly', () => {
      const result = calculateEffectiveRate(mockInputs);
      expect(result).toBe(6.5); // 7.0% - 0.5%
    });
  });

  describe('Payment Calculations', () => {
    it('calculates monthly payment correctly', () => {
      const result = calculateMonthlyPayment(mockInputs);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeCloseTo(1996, 0); // Approximate expected value
    });

    it('calculates monthly payment savings correctly', () => {
      const result = calculateMonthlyPaymentSavings(mockInputs);
      expect(result).toBeGreaterThan(0);
    });

    it('calculates annual payment savings correctly', () => {
      const result = calculateAnnualPaymentSavings(mockInputs);
      expect(result).toBe(calculateMonthlyPaymentSavings(mockInputs) * 12);
    });

    it('calculates total payment savings correctly', () => {
      const result = calculateTotalPaymentSavings(mockInputs);
      expect(result).toBe(calculateAnnualPaymentSavings(mockInputs) * mockInputs.loanTerm);
    });
  });

  describe('Interest Calculations', () => {
    it('calculates total interest paid correctly', () => {
      const result = calculateTotalInterestPaid(mockInputs);
      expect(result).toBeGreaterThan(0);
    });

    it('calculates interest savings correctly', () => {
      const result = calculateInterestSavings(mockInputs);
      expect(result).toBeGreaterThan(0);
    });

    it('calculates interest savings percentage correctly', () => {
      const result = calculateInterestSavingsPercentage(mockInputs);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThan(100);
    });
  });

  describe('Cost and Savings Calculations', () => {
    it('calculates total cost correctly', () => {
      const result = calculateTotalCost(mockInputs);
      const expected = calculateTotalPointCost(mockInputs) + (calculateMonthlyPayment(mockInputs) * mockInputs.loanTerm * 12);
      expect(result).toBe(expected);
    });

    it('calculates net savings correctly', () => {
      const result = calculateNetSavings(mockInputs);
      const totalSavings = calculateTotalPaymentSavings(mockInputs);
      const pointCost = calculateTotalPointCost(mockInputs);
      expect(result).toBe(totalSavings - pointCost);
    });
  });

  describe('Break-Even Calculations', () => {
    it('calculates break-even point correctly', () => {
      const result = calculateBreakEvenPoint(mockInputs);
      const monthlySavings = calculateMonthlyPaymentSavings(mockInputs);
      const pointCost = calculateTotalPointCost(mockInputs);
      expect(result).toBe(pointCost / monthlySavings);
    });

    it('calculates break-even months correctly', () => {
      const result = calculateBreakEvenMonths(mockInputs);
      expect(result).toBe(Math.ceil(calculateBreakEvenPoint(mockInputs)));
    });
  });

  describe('Tax Calculations', () => {
    it('calculates tax deduction correctly', () => {
      const result = calculateTaxDeduction(mockInputs);
      const pointCost = calculateTotalPointCost(mockInputs);
      expect(result).toBe(pointCost * (mockInputs.borrowerTaxRate / 100));
    });

    it('calculates after-tax cost correctly', () => {
      const result = calculateAfterTaxCost(mockInputs);
      const pointCost = calculateTotalPointCost(mockInputs);
      const taxDeduction = calculateTaxDeduction(mockInputs);
      expect(result).toBe(pointCost - taxDeduction);
    });

    it('calculates after-tax savings correctly', () => {
      const result = calculateAfterTaxSavings(mockInputs);
      const netSavings = calculateNetSavings(mockInputs);
      const taxDeduction = calculateTaxDeduction(mockInputs);
      expect(result).toBe(netSavings + taxDeduction);
    });
  });

  describe('ROI Calculations', () => {
    it('calculates return on investment correctly', () => {
      const result = calculateReturnOnInvestment(mockInputs);
      const netSavings = calculateNetSavings(mockInputs);
      const pointCost = calculateTotalPointCost(mockInputs);
      expect(result).toBe((netSavings / pointCost) * 100);
    });

    it('calculates net present value correctly', () => {
      const result = calculateNetPresentValue(mockInputs);
      expect(typeof result).toBe('number');
    });
  });

  describe('Risk Calculations', () => {
    it('calculates risk score correctly', () => {
      const result = calculateRiskScore(mockInputs);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(100);
    });

    it('calculates probability of benefit correctly', () => {
      const result = calculateProbabilityOfBenefit(mockInputs);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(1);
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validateMortgagePointsInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates loan amount cannot be zero', () => {
      const invalidInputs = { ...mockInputs, loanAmount: 0 };
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates discount points range', () => {
      const invalidInputs = { ...mockInputs, discountPoints: 15 };
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates point cost cannot be zero', () => {
      const invalidInputs = { ...mockInputs, pointCost: 0 };
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates credit score range', () => {
      const invalidInputs = { ...mockInputs, borrowerCreditScore: 200 };
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates tax rate range', () => {
      const invalidInputs = { ...mockInputs, borrowerTaxRate: 60 };
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles zero discount points', () => {
      const result = calculateTotalPoints({ ...mockInputs, discountPoints: 0 });
      expect(result).toBe(0);
    });

    it('handles high credit score', () => {
      const result = calculateRiskScore({ ...mockInputs, borrowerCreditScore: 800 });
      expect(result).toBeLessThan(calculateRiskScore(mockInputs));
    });

    it('handles low credit score', () => {
      const result = calculateRiskScore({ ...mockInputs, borrowerCreditScore: 600 });
      expect(result).toBeGreaterThan(calculateRiskScore(mockInputs));
    });

    it('handles zero tax rate', () => {
      const result = calculateTaxDeduction({ ...mockInputs, borrowerTaxRate: 0 });
      expect(result).toBe(0);
    });

    it('handles high tax rate', () => {
      const result = calculateTaxDeduction({ ...mockInputs, borrowerTaxRate: 37 });
      expect(result).toBeGreaterThan(calculateTaxDeduction(mockInputs));
    });
  });

  describe('Different Scenarios', () => {
    it('handles FHA loan type', () => {
      const result = validateMortgagePointsInputs({ ...mockInputs, loanType: 'fha' as const });
      expect(result.length).toBe(0);
    });

    it('handles VA loan type', () => {
      const result = validateMortgagePointsInputs({ ...mockInputs, loanType: 'va' as const });
      expect(result.length).toBe(0);
    });

    it('handles declining market', () => {
      const result = calculateRiskScore({ ...mockInputs, marketCondition: 'declining' as const });
      expect(result).toBeGreaterThan(calculateRiskScore(mockInputs));
    });

    it('handles hot market', () => {
      const result = calculateRiskScore({ ...mockInputs, marketCondition: 'hot' as const });
      expect(result).toBeGreaterThan(calculateRiskScore(mockInputs));
    });
  });
});