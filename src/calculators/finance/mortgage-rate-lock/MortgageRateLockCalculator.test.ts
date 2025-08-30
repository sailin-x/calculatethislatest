import { describe, it, expect, beforeEach } from 'vitest';
import { calculateMortgageRateLock } from './formulas';
import { validateMortgageRateLockInputs } from './validation';
import { validateField } from './quickValidation';
import { MortgageRateLockInputs } from './types';

describe('Mortgage Rate Lock Calculator', () => {
  let validInputs: MortgageRateLockInputs;

  beforeEach(() => {
    validInputs = {
      // Loan Information
      loanAmount: 300000,
      lockedRate: 4.5,
      currentMarketRate: 4.75,
      loanTerm: 30,
      loanType: 'conventional',
      paymentType: 'principal_interest',

      // Rate Lock Information
      lockDate: '2024-01-15',
      lockExpirationDate: '2024-02-15',
      lockDuration: 30,
      lockType: 'free',
      lockFee: 0,
      lockFeeType: 'none',

      // Property Information
      propertyValue: 375000,
      propertyAddress: '123 Main St, Anytown, USA',
      propertyType: 'single_family',
      propertySize: 2000,
      propertyAge: 15,

      // Closing Information
      estimatedClosingDate: '2024-02-10',
      actualClosingDate: '',
      closingDelay: 0,
      extensionFee: 0,
      extensionFeeType: 'fixed',

      // Market Information
      marketLocation: 'Anytown, USA',
      marketCondition: 'stable',
      marketVolatility: 15,
      rateTrend: 'stable',

      // Rate Forecast
      rateForecast: [
        { date: '2024-02-01', predictedRate: 4.6, confidence: 80 },
        { date: '2024-02-15', predictedRate: 4.7, confidence: 75 },
        { date: '2024-03-01', predictedRate: 4.8, confidence: 70 }
      ],

      // Borrower Information
      borrowerIncome: 75000,
      borrowerCreditScore: 720,
      borrowerDebtToIncomeRatio: 35,
      borrowerEmploymentType: 'employed',

      // Analysis Parameters
      analysisPeriod: 30,
      inflationRate: 2.5,
      propertyAppreciationRate: 3.0,
      discountRate: 5.0,

      // Risk Tolerance
      riskTolerance: 'moderate',
      maxRateIncrease: 2.0,
      minRateDecrease: 1.0,

      // Reporting Preferences
      currency: 'USD',
      displayFormat: 'percentage',
      includeCharts: true
    };
  });

  describe('calculateMortgageRateLock', () => {
    it('should calculate basic rate lock metrics correctly', () => {
      const result = calculateMortgageRateLock(validInputs);

      expect(result.rateDifference).toBeCloseTo(0.25, 2);
      expect(result.rateSavings).toBeGreaterThan(0);
      expect(result.paymentDifference).toBeLessThan(0);
      expect(result.paymentSavings).toBeGreaterThan(0);
      expect(result.lockValue).toBeGreaterThan(0);
      expect(result.riskScore).toBeGreaterThanOrEqual(0);
      expect(result.riskScore).toBeLessThanOrEqual(100);
      expect(result.lockRemainingDays).toBeGreaterThan(0);
      expect(result.breakEvenPoint).toBeGreaterThan(0);
    });

    it('should calculate monthly payments correctly', () => {
      const result = calculateMortgageRateLock(validInputs);

      expect(result.lockedMonthlyPayment).toBeGreaterThan(0);
      expect(result.currentMonthlyPayment).toBeGreaterThan(0);
      expect(result.lockedMonthlyPayment).toBeLessThan(result.currentMonthlyPayment);
    });

    it('should calculate total interest correctly', () => {
      const result = calculateMortgageRateLock(validInputs);

      expect(result.totalInterestLocked).toBeGreaterThan(0);
      expect(result.totalInterestCurrent).toBeGreaterThan(0);
      expect(result.interestSavings).toBeGreaterThan(0);
    });

    it('should generate analysis correctly', () => {
      const result = calculateMortgageRateLock(validInputs);

      expect(result.analysis).toBeDefined();
      expect(result.analysis.lockRating).toBeDefined();
      expect(result.analysis.valueRating).toBeDefined();
      expect(result.analysis.recommendation).toBeDefined();
      expect(result.analysis.summary).toBeDefined();
    });

    it('should handle different lock types', () => {
      const paidLockInputs = { ...validInputs, lockType: 'paid', lockFee: 500 };
      const result = calculateMortgageRateLock(paidLockInputs);

      expect(result.lockCost).toBe(500);
      expect(result.netSavings).toBe(result.lockValue - 500);
    });

    it('should handle rate increases', () => {
      const rateIncreaseInputs = { ...validInputs, currentMarketRate: 5.0 };
      const result = calculateMortgageRateLock(rateIncreaseInputs);

      expect(result.rateDifference).toBeCloseTo(0.5, 2);
      expect(result.rateSavings).toBeGreaterThan(0);
      expect(result.lockValue).toBeGreaterThan(0);
    });

    it('should handle rate decreases', () => {
      const rateDecreaseInputs = { ...validInputs, currentMarketRate: 4.0 };
      const result = calculateMortgageRateLock(rateDecreaseInputs);

      expect(result.rateDifference).toBeCloseTo(-0.5, 2);
      expect(result.rateSavings).toBe(0);
      expect(result.lockValue).toBe(0);
    });
  });

  describe('validateMortgageRateLockInputs', () => {
    it('should validate correct inputs', () => {
      const result = validateMortgageRateLockInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toBeUndefined();
    });

    it('should reject invalid loan amount', () => {
      const invalidInputs = { ...validInputs, loanAmount: -1000 };
      const result = validateMortgageRateLockInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.loanAmount).toBeDefined();
    });

    it('should reject invalid rates', () => {
      const invalidInputs = { ...validInputs, lockedRate: 30 };
      const result = validateMortgageRateLockInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.lockedRate).toBeDefined();
    });

    it('should reject invalid dates', () => {
      const invalidInputs = { ...validInputs, lockDate: 'invalid-date' };
      const result = validateMortgageRateLockInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.lockDate).toBeDefined();
    });

    it('should reject expiration date before lock date', () => {
      const invalidInputs = { 
        ...validInputs, 
        lockDate: '2024-02-15',
        lockExpirationDate: '2024-01-15'
      };
      const result = validateMortgageRateLockInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.lockExpirationDate).toBeDefined();
    });

    it('should reject invalid loan type', () => {
      const invalidInputs = { ...validInputs, loanType: 'invalid' };
      const result = validateMortgageRateLockInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.loanType).toBeDefined();
    });

    it('should reject invalid property type', () => {
      const invalidInputs = { ...validInputs, propertyType: 'invalid' };
      const result = validateMortgageRateLockInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertyType).toBeDefined();
    });

    it('should reject invalid rate forecast', () => {
      const invalidInputs = { 
        ...validInputs, 
        rateForecast: [
          { date: '2024-02-15', predictedRate: 4.7, confidence: 75 },
          { date: '2024-02-01', predictedRate: 4.6, confidence: 80 } // Wrong order
        ]
      };
      const result = validateMortgageRateLockInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.['rateForecast[1].date']).toBeDefined();
    });

    it('should reject loan amount exceeding property value', () => {
      const invalidInputs = { ...validInputs, loanAmount: 500000, propertyValue: 400000 };
      const result = validateMortgageRateLockInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.loanAmount).toBeDefined();
    });
  });

  describe('validateField', () => {
    it('should validate loan amount correctly', () => {
      const result = validateField('loanAmount', 300000, validInputs);
      expect(result.isValid).toBe(true);

      const invalidResult = validateField('loanAmount', -1000, validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBeDefined();
    });

    it('should validate locked rate correctly', () => {
      const result = validateField('lockedRate', 4.5, validInputs);
      expect(result.isValid).toBe(true);

      const invalidResult = validateField('lockedRate', 30, validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBeDefined();
    });

    it('should validate lock date correctly', () => {
      const result = validateField('lockDate', '2024-01-15', validInputs);
      expect(result.isValid).toBe(true);

      const invalidResult = validateField('lockDate', 'invalid-date', validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBeDefined();
    });

    it('should validate lock expiration date with cross-field validation', () => {
      const allInputs = { ...validInputs, lockDate: '2024-02-15' };
      const result = validateField('lockExpirationDate', '2024-01-15', allInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate loan type correctly', () => {
      const result = validateField('loanType', 'conventional', validInputs);
      expect(result.isValid).toBe(true);

      const invalidResult = validateField('loanType', 'invalid', validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBeDefined();
    });

    it('should validate property value correctly', () => {
      const result = validateField('propertyValue', 375000, validInputs);
      expect(result.isValid).toBe(true);

      const invalidResult = validateField('propertyValue', -1000, validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBeDefined();
    });

    it('should validate rate forecast correctly', () => {
      const validForecast = [
        { date: '2024-02-01', predictedRate: 4.6, confidence: 80 },
        { date: '2024-02-15', predictedRate: 4.7, confidence: 75 }
      ];
      const result = validateField('rateForecast', validForecast, validInputs);
      expect(result.isValid).toBe(true);

      const invalidForecast = [
        { date: '2024-02-15', predictedRate: 4.7, confidence: 75 },
        { date: '2024-02-01', predictedRate: 4.6, confidence: 80 } // Wrong order
      ];
      const invalidResult = validateField('rateForecast', invalidForecast, validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBeDefined();
    });

    it('should validate borrower credit score correctly', () => {
      const result = validateField('borrowerCreditScore', 720, validInputs);
      expect(result.isValid).toBe(true);

      const invalidResult = validateField('borrowerCreditScore', 200, validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBeDefined();
    });

    it('should validate risk tolerance correctly', () => {
      const result = validateField('riskTolerance', 'moderate', validInputs);
      expect(result.isValid).toBe(true);

      const invalidResult = validateField('riskTolerance', 'invalid', validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBeDefined();
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero lock fee', () => {
      const zeroFeeInputs = { ...validInputs, lockFee: 0 };
      const result = calculateMortgageRateLock(zeroFeeInputs);
      expect(result.lockCost).toBe(0);
      expect(result.netSavings).toBe(result.lockValue);
    });

    it('should handle very high rates', () => {
      const highRateInputs = { ...validInputs, lockedRate: 20, currentMarketRate: 22 };
      const result = calculateMortgageRateLock(highRateInputs);
      expect(result.rateDifference).toBeCloseTo(2, 2);
      expect(result.rateSavings).toBeGreaterThan(0);
    });

    it('should handle very low rates', () => {
      const lowRateInputs = { ...validInputs, lockedRate: 2.5, currentMarketRate: 2.75 };
      const result = calculateMortgageRateLock(lowRateInputs);
      expect(result.rateDifference).toBeCloseTo(0.25, 2);
      expect(result.rateSavings).toBeGreaterThan(0);
    });

    it('should handle short loan terms', () => {
      const shortTermInputs = { ...validInputs, loanTerm: 5 };
      const result = calculateMortgageRateLock(shortTermInputs);
      expect(result.lockedMonthlyPayment).toBeGreaterThan(0);
      expect(result.currentMonthlyPayment).toBeGreaterThan(0);
    });

    it('should handle long loan terms', () => {
      const longTermInputs = { ...validInputs, loanTerm: 50 };
      const result = calculateMortgageRateLock(longTermInputs);
      expect(result.lockedMonthlyPayment).toBeGreaterThan(0);
      expect(result.currentMonthlyPayment).toBeGreaterThan(0);
    });
  });

  describe('Business Logic', () => {
    it('should calculate break-even point correctly', () => {
      const paidLockInputs = { ...validInputs, lockType: 'paid', lockFee: 1000 };
      const result = calculateMortgageRateLock(paidLockInputs);
      expect(result.breakEvenPoint).toBeGreaterThan(0);
    });

    it('should handle different market conditions', () => {
      const volatileMarketInputs = { ...validInputs, marketCondition: 'volatile', marketVolatility: 50 };
      const result = calculateMortgageRateLock(volatileMarketInputs);
      expect(result.riskScore).toBeGreaterThan(0);
    });

    it('should handle different rate trends', () => {
      const risingRatesInputs = { ...validInputs, rateTrend: 'rising' };
      const result = calculateMortgageRateLock(risingRatesInputs);
      expect(result.analysis.recommendation).toBeDefined();
    });

    it('should validate lock fee percentage limits', () => {
      const highPercentageInputs = { ...validInputs, lockFeeType: 'percentage', lockFee: 10 };
      const result = validateMortgageRateLockInputs(highPercentageInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.lockFee).toBeDefined();
    });

    it('should validate closing date proximity to lock expiration', () => {
      const farClosingInputs = { 
        ...validInputs, 
        lockExpirationDate: '2024-02-15',
        estimatedClosingDate: '2024-04-15'
      };
      const result = validateMortgageRateLockInputs(farClosingInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.estimatedClosingDate).toBeDefined();
    });
  });
});