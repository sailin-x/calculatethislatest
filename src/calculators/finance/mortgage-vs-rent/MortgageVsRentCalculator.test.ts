import { describe, it, expect, beforeEach } from 'vitest';
import { calculateMortgageVsRent } from './formulas';
import { validateMortgageVsRentInputs } from './validation';
import { validateField } from './quickValidation';
import { MortgageVsRentInputs } from './types';

describe('Mortgage vs. Rent Calculator', () => {
  let validInputs: MortgageVsRentInputs;

  beforeEach(() => {
    validInputs = {
      // Property Information
      propertyValue: 350000,
      propertyAddress: '123 Main St, Anytown, USA',
      propertyType: 'single_family',
      propertySize: 2000,
      propertyAge: 15,
      
      // Mortgage Information
      loanAmount: 280000,
      interestRate: 4.5,
      loanTerm: 30,
      loanType: 'conventional',
      paymentType: 'principal_interest',
      
      // Down Payment Information
      downPayment: 70000,
      downPaymentPercentage: 20,
      downPaymentSource: 'savings',
      
      // Rent Information
      monthlyRent: 2000,
      annualRent: 24000,
      rentIncreaseRate: 3.0,
      rentEscalationClause: false,
      rentEscalationRate: 2.5,
      
      // Insurance and Taxes
      propertyInsurance: 1200,
      propertyTaxes: 3500,
      hoaFees: 0,
      floodInsurance: 0,
      mortgageInsurance: 0,
      rentersInsurance: 300,
      
      // Maintenance and Utilities
      maintenanceCosts: 2400,
      utilityCosts: 1800,
      rentIncludesUtilities: false,
      utilitiesIncluded: [],
      
      // Closing Costs and Fees
      closingCosts: 5000,
      originationFee: 1000,
      appraisalFee: 500,
      titleInsuranceFee: 800,
      recordingFee: 200,
      attorneyFee: 300,
      otherFees: 2200,
      
      // Market Information
      marketLocation: 'Suburban',
      marketCondition: 'stable',
      marketGrowthRate: 3.0,
      propertyAppreciationRate: 3.0,
      rentGrowthRate: 2.5,
      
      // Borrower Information
      borrowerIncome: 80000,
      borrowerCreditScore: 750,
      borrowerDebtToIncomeRatio: 35,
      borrowerEmploymentType: 'employed',
      borrowerTaxRate: 25,
      
      // Investment Assumptions
      investmentReturnRate: 7.0,
      inflationRate: 2.5,
      discountRate: 5.0,
      analysisPeriod: 30,
      
      // Lifestyle Factors
      expectedStayDuration: 7,
      flexibilityNeeded: false,
      maintenancePreference: 'medium',
      locationStability: 'stable',
      
      // Reporting Preferences
      currency: 'USD',
      displayFormat: 'currency',
      includeCharts: true,
    };
  });

  describe('calculateMortgageVsRent', () => {
    it('should calculate basic comparison metrics correctly', () => {
      const result = calculateMortgageVsRent(validInputs);

      expect(result.monthlyCostDifference).toBeDefined();
      expect(result.breakEvenMonths).toBeGreaterThanOrEqual(0);
      expect(result.totalCostDifference).toBeDefined();
      expect(result.equityBuildUp).toBeGreaterThan(0);
      expect(result.opportunityCost).toBeGreaterThan(0);
      expect(result.riskScore).toBeGreaterThanOrEqual(0);
      expect(result.riskScore).toBeLessThanOrEqual(100);
      expect(result.probabilityOfBenefit).toBeGreaterThanOrEqual(0);
      expect(result.probabilityOfBenefit).toBeLessThanOrEqual(100);
    });

    it('should calculate monthly payments correctly', () => {
      const result = calculateMortgageVsRent(validInputs);

      expect(result.monthlyMortgagePayment).toBeGreaterThan(0);
      expect(result.monthlyRentPayment).toBeGreaterThan(0);
      expect(result.monthlyCostDifference).toBe(result.monthlyRentPayment - result.monthlyMortgagePayment);
    });

    it('should calculate total costs correctly', () => {
      const result = calculateMortgageVsRent(validInputs);

      expect(result.totalMortgageCost).toBeGreaterThan(0);
      expect(result.totalRentCost).toBeGreaterThan(0);
      expect(result.totalCostDifference).toBe(result.totalRentCost - result.totalMortgageCost);
      expect(result.costSavings).toBe(result.totalMortgageCost - result.totalRentCost);
    });

    it('should calculate break-even analysis correctly', () => {
      const result = calculateMortgageVsRent(validInputs);

      expect(result.breakEvenMonths).toBeGreaterThanOrEqual(0);
      expect(result.breakEvenPoint).toBeGreaterThanOrEqual(0);
      expect(result.breakEvenYears).toBeGreaterThanOrEqual(0);
      expect(result.breakEvenPropertyValue).toBeGreaterThan(0);
    });

    it('should calculate equity analysis correctly', () => {
      const result = calculateMortgageVsRent(validInputs);

      expect(result.equityBuildUp).toBeGreaterThan(0);
      expect(result.equityPercentage).toBeGreaterThan(0);
      expect(result.totalEquity).toBeGreaterThan(0);
      expect(result.equityGrowth).toBeGreaterThan(0);
    });

    it('should calculate investment analysis correctly', () => {
      const result = calculateMortgageVsRent(validInputs);

      expect(result.opportunityCost).toBeGreaterThan(0);
      expect(result.investmentGrowth).toBeGreaterThan(0);
      expect(result.totalInvestmentValue).toBeGreaterThan(0);
      expect(result.netInvestmentBenefit).toBeDefined();
    });

    it('should calculate tax analysis correctly', () => {
      const result = calculateMortgageVsRent(validInputs);

      expect(result.mortgageTaxDeduction).toBeGreaterThan(0);
      expect(result.rentTaxDeduction).toBe(0);
      expect(result.taxBenefit).toBeGreaterThan(0);
      expect(result.afterTaxCost).toBeDefined();
    });

    it('should calculate cash flow analysis correctly', () => {
      const result = calculateMortgageVsRent(validInputs);

      expect(result.monthlyCashFlow).toBeDefined();
      expect(result.annualCashFlow).toBeDefined();
      expect(result.totalCashFlow).toBeDefined();
      expect(result.cashFlowImprovement).toBeDefined();
    });

    it('should generate recommendation correctly', () => {
      const result = calculateMortgageVsRent(validInputs);

      expect(['Buy', 'Rent', 'Consider Buying', 'Consider Renting', 'Requires Review']).toContain(result.recommendation);
    });

    it('should generate analysis reports', () => {
      const result = calculateMortgageVsRent(validInputs);

      expect(result.analysis).toBeDefined();
      expect(result.analysis.recommendation).toBeDefined();
      expect(result.analysis.valueRating).toBeDefined();
      expect(result.analysis.confidenceRating).toBeDefined();
      expect(result.analysis.keyStrengths).toBeDefined();
      expect(result.analysis.keyWeaknesses).toBeDefined();
    });

    it('should generate sensitivity and scenario analyses', () => {
      const result = calculateMortgageVsRent(validInputs);

      expect(result.sensitivityMatrix).toBeDefined();
      expect(Array.isArray(result.sensitivityMatrix)).toBe(true);
      expect(result.scenarios).toBeDefined();
      expect(Array.isArray(result.scenarios)).toBe(true);
      expect(result.timelineAnalysis).toBeDefined();
      expect(Array.isArray(result.timelineAnalysis)).toBe(true);
      expect(result.comparisonAnalysis).toBeDefined();
      expect(Array.isArray(result.comparisonAnalysis)).toBe(true);
      expect(result.marketAnalysis).toBeDefined();
      expect(Array.isArray(result.marketAnalysis)).toBe(true);
    });
  });

  describe('validateMortgageVsRentInputs', () => {
    it('should validate correct inputs', () => {
      const result = validateMortgageVsRentInputs(validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid property values', () => {
      const invalidInputs = { ...validInputs, propertyValue: -1000 };
      const result = validateMortgageVsRentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertyValue).toBeDefined();
    });

    it('should reject invalid loan amounts', () => {
      const invalidInputs = { ...validInputs, loanAmount: 0 };
      const result = validateMortgageVsRentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.loanAmount).toBeDefined();
    });

    it('should reject loan amount exceeding property value', () => {
      const invalidInputs = { ...validInputs, loanAmount: 400000 };
      const result = validateMortgageVsRentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.loanAmount).toBeDefined();
    });

    it('should reject invalid interest rates', () => {
      const invalidInputs = { ...validInputs, interestRate: 30 };
      const result = validateMortgageVsRentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.interestRate).toBeDefined();
    });

    it('should reject invalid loan terms', () => {
      const invalidInputs = { ...validInputs, loanTerm: 60 };
      const result = validateMortgageVsRentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.loanTerm).toBeDefined();
    });

    it('should reject invalid monthly rent', () => {
      const invalidInputs = { ...validInputs, monthlyRent: -500 };
      const result = validateMortgageVsRentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.monthlyRent).toBeDefined();
    });

    it('should reject invalid annual rent', () => {
      const invalidInputs = { ...validInputs, annualRent: 0 };
      const result = validateMortgageVsRentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.annualRent).toBeDefined();
    });

    it('should reject mismatched monthly and annual rent', () => {
      const invalidInputs = { ...validInputs, monthlyRent: 2000, annualRent: 25000 };
      const result = validateMortgageVsRentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.annualRent).toBeDefined();
    });

    it('should reject invalid credit scores', () => {
      const invalidInputs = { ...validInputs, borrowerCreditScore: 200 };
      const result = validateMortgageVsRentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.borrowerCreditScore).toBeDefined();
    });

    it('should reject invalid DTI ratios', () => {
      const invalidInputs = { ...validInputs, borrowerDebtToIncomeRatio: 120 };
      const result = validateMortgageVsRentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.borrowerDebtToIncomeRatio).toBeDefined();
    });

    it('should reject invalid analysis periods', () => {
      const invalidInputs = { ...validInputs, analysisPeriod: 60 };
      const result = validateMortgageVsRentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.analysisPeriod).toBeDefined();
    });

    it('should reject invalid property types', () => {
      const invalidInputs = { ...validInputs, propertyType: 'invalid_type' as any };
      const result = validateMortgageVsRentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertyType).toBeDefined();
    });

    it('should reject invalid loan types', () => {
      const invalidInputs = { ...validInputs, loanType: 'invalid_type' as any };
      const result = validateMortgageVsRentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.loanType).toBeDefined();
    });

    it('should reject invalid market conditions', () => {
      const invalidInputs = { ...validInputs, marketCondition: 'invalid_condition' as any };
      const result = validateMortgageVsRentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.marketCondition).toBeDefined();
    });
  });

  describe('validateField', () => {
    it('should validate property value', () => {
      const result = validateField('propertyValue', 350000, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid property value', () => {
      const result = validateField('propertyValue', -1000, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate loan amount with cross-field validation', () => {
      const result = validateField('loanAmount', 280000, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject loan amount exceeding property value', () => {
      const result = validateField('loanAmount', 400000, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('cannot exceed property value');
    });

    it('should validate down payment with cross-field validation', () => {
      const result = validateField('downPayment', 70000, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject down payment exceeding property value', () => {
      const result = validateField('downPayment', 400000, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('cannot exceed property value');
    });

    it('should validate annual rent with cross-field validation', () => {
      const result = validateField('annualRent', 24000, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject mismatched annual rent', () => {
      const result = validateField('annualRent', 25000, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('should equal monthly rent times 12');
    });

    it('should validate utility costs with cross-field validation', () => {
      const result = validateField('utilityCosts', 1800, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject utility costs when rent includes utilities', () => {
      const modifiedInputs = { ...validInputs, rentIncludesUtilities: true };
      const result = validateField('utilityCosts', 1800, modifiedInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('should be 0 when rent includes utilities');
    });

    it('should validate analysis period with cross-field validation', () => {
      const result = validateField('analysisPeriod', 30, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject analysis period shorter than expected stay', () => {
      const result = validateField('analysisPeriod', 5, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('should be at least as long as expected stay duration');
    });

    it('should validate rent escalation rate with cross-field validation', () => {
      const result = validateField('rentEscalationRate', 2.5, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject zero escalation rate when clause is enabled', () => {
      const modifiedInputs = { ...validInputs, rentEscalationClause: true };
      const result = validateField('rentEscalationRate', 0, modifiedInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('must be specified when escalation clause is enabled');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero closing costs', () => {
      const zeroCostInputs = { ...validInputs, closingCosts: 0 };
      const result = calculateMortgageVsRent(zeroCostInputs);
      expect(result.breakEvenMonths).toBe(0);
    });

    it('should handle very high interest rates', () => {
      const highRateInputs = { ...validInputs, interestRate: 20 };
      const result = calculateMortgageVsRent(highRateInputs);
      expect(result.monthlyMortgagePayment).toBeGreaterThan(0);
      expect(result.monthlyCostDifference).toBeDefined();
    });

    it('should handle very low interest rates', () => {
      const lowRateInputs = { ...validInputs, interestRate: 1 };
      const result = calculateMortgageVsRent(lowRateInputs);
      expect(result.monthlyMortgagePayment).toBeGreaterThan(0);
      expect(result.monthlyCostDifference).toBeDefined();
    });

    it('should handle equal monthly costs', () => {
      const equalCostInputs = { ...validInputs, monthlyRent: 1500 };
      const result = calculateMortgageVsRent(equalCostInputs);
      expect(result.monthlyCostDifference).toBeDefined();
    });

    it('should handle very short loan terms', () => {
      const shortTermInputs = { ...validInputs, loanTerm: 5 };
      const result = calculateMortgageVsRent(shortTermInputs);
      expect(result.monthlyMortgagePayment).toBeGreaterThan(0);
    });

    it('should handle very long loan terms', () => {
      const longTermInputs = { ...validInputs, loanTerm: 50 };
      const result = calculateMortgageVsRent(longTermInputs);
      expect(result.monthlyMortgagePayment).toBeGreaterThan(0);
    });

    it('should handle zero down payment', () => {
      const zeroDownInputs = { ...validInputs, downPayment: 0, downPaymentPercentage: 0 };
      const result = calculateMortgageVsRent(zeroDownInputs);
      expect(result.equityBuildUp).toBeDefined();
    });

    it('should handle 100% down payment', () => {
      const fullDownInputs = { ...validInputs, downPayment: 350000, downPaymentPercentage: 100, loanAmount: 0 };
      const result = calculateMortgageVsRent(fullDownInputs);
      expect(result.monthlyMortgagePayment).toBe(0);
    });

    it('should handle negative rent increase rates', () => {
      const negativeRentInputs = { ...validInputs, rentIncreaseRate: -5 };
      const result = calculateMortgageVsRent(negativeRentInputs);
      expect(result.totalRentCost).toBeDefined();
    });

    it('should handle high property appreciation rates', () => {
      const highAppreciationInputs = { ...validInputs, propertyAppreciationRate: 20 };
      const result = calculateMortgageVsRent(highAppreciationInputs);
      expect(result.equityBuildUp).toBeGreaterThan(0);
    });
  });

  describe('Business Logic', () => {
    it('should validate property type constraints', () => {
      const result = validateField('propertyType', 'invalid_type', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid property type');
    });

    it('should validate loan type constraints', () => {
      const result = validateField('loanType', 'invalid_type', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid loan type');
    });

    it('should validate payment type constraints', () => {
      const result = validateField('paymentType', 'invalid_type', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid payment type');
    });

    it('should validate down payment source constraints', () => {
      const result = validateField('downPaymentSource', 'invalid_source', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid down payment source');
    });

    it('should validate market condition constraints', () => {
      const result = validateField('marketCondition', 'invalid_condition', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid market condition');
    });

    it('should validate employment type constraints', () => {
      const result = validateField('borrowerEmploymentType', 'invalid_type', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid employment type');
    });

    it('should validate maintenance preference constraints', () => {
      const result = validateField('maintenancePreference', 'invalid_preference', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid maintenance preference');
    });

    it('should validate location stability constraints', () => {
      const result = validateField('locationStability', 'invalid_stability', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid location stability');
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

    it('should validate boolean fields', () => {
      const result = validateField('includeCharts', 'not_boolean', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('must be a boolean');
    });

    it('should validate array fields', () => {
      const result = validateField('utilitiesIncluded', 'not_array', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('must be an array');
    });
  });

  describe('Recommendation Logic', () => {
    it('should recommend buying for favorable conditions', () => {
      const buyFavorableInputs = {
        ...validInputs,
        interestRate: 3.0,
        propertyAppreciationRate: 5.0,
        rentIncreaseRate: 4.0,
        expectedStayDuration: 10,
        marketCondition: 'growing'
      };
      const result = calculateMortgageVsRent(buyFavorableInputs);
      expect(['Buy', 'Consider Buying']).toContain(result.recommendation);
    });

    it('should recommend renting for unfavorable conditions', () => {
      const rentFavorableInputs = {
        ...validInputs,
        interestRate: 8.0,
        propertyAppreciationRate: 1.0,
        rentIncreaseRate: 1.0,
        expectedStayDuration: 2,
        marketCondition: 'declining'
      };
      const result = calculateMortgageVsRent(rentFavorableInputs);
      expect(['Rent', 'Consider Renting']).toContain(result.recommendation);
    });

    it('should require review for mixed conditions', () => {
      const mixedInputs = {
        ...validInputs,
        interestRate: 5.0,
        propertyAppreciationRate: 2.0,
        rentIncreaseRate: 2.5,
        expectedStayDuration: 5,
        marketCondition: 'stable'
      };
      const result = calculateMortgageVsRent(mixedInputs);
      expect(result.recommendation).toBeDefined();
    });
  });
});