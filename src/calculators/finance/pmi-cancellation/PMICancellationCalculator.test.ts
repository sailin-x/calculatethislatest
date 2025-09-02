import { describe, it, expect, beforeEach } from 'vitest';
import { calculatePMICancellation } from './formulas';
import { validatePMICancellationInputs } from './validation';
import { validateField } from './quickValidation';
import { PMICancellationInputs } from './types';

describe('PMI Cancellation Calculator', () => {
  let validInputs: PMICancellationInputs;

  beforeEach(() => {
    validInputs = {
      // Loan Information
      originalLoanAmount: 300000,
      currentLoanBalance: 280000,
      interestRate: 4.5,
      loanTerm: 30,
      loanType: 'conventional',
      paymentType: 'principal_interest',

      // Property Information
      originalPropertyValue: 375000,
      currentPropertyValue: 400000,
      propertyType: 'single_family',
      propertySize: 2000,
      propertyAge: 15,

      // PMI Information
      pmiRate: 0.8,
      pmiMonthlyPayment: 200,
      pmiStartDate: '2020-01-15',
      pmiCancellationMethod: 'automatic',

      // Loan History
      loanStartDate: '2020-01-01',
      originalDownPayment: 75000,
      originalDownPaymentPercentage: 20,
      paymentsMade: 36,
      monthsSinceLoanStart: 36,

      // Appraisal Information
      appraisalValue: 400000,
      appraisalCost: 500,
      appraisalRequired: true,

      // Market Information
      marketLocation: 'San Francisco, CA',
      marketCondition: 'growing',
      marketGrowthRate: 5.2,
      comparableSales: [
        {
          address: '123 Main St',
          salePrice: 395000,
          saleDate: '2023-12-01',
          condition: 'good'
        },
        {
          address: '456 Oak Ave',
          salePrice: 410000,
          saleDate: '2023-11-15',
          condition: 'excellent'
        }
      ],

      // Borrower Information
      borrowerIncome: 85000,
      borrowerCreditScore: 750,
      borrowerDebtToIncomeRatio: 35,
      borrowerEmploymentType: 'employed',

      // Cancellation Requirements
      ltvThreshold: 80,
      paymentHistory: [
        {
          paymentNumber: 1,
          paymentDate: '2020-02-01',
          paymentAmount: 1520,
          principal: 395,
          interest: 1125,
          balance: 299605,
          onTime: true
        },
        {
          paymentNumber: 2,
          paymentDate: '2020-03-01',
          paymentAmount: 1520,
          principal: 396,
          interest: 1124,
          balance: 299209,
          onTime: true
        }
      ],

      // Analysis Parameters
      analysisPeriod: 60,
      inflationRate: 2.5,
      propertyAppreciationRate: 3.0,
      discountRate: 5.0,

      // Reporting Preferences
      currency: 'USD',
      displayFormat: 'currency',
      includeCharts: true
    };
  });

  describe('calculatePMICancellation', () => {
    it('should calculate PMI cancellation metrics correctly', () => {
      const result = calculatePMICancellation(validInputs);

      expect(result.pmiEligibility).toBe(true);
      expect(result.currentLtvRatio).toBeCloseTo(70, 1);
      expect(result.monthlyPMISavings).toBe(200);
      expect(result.totalPMISavings).toBeGreaterThan(0);
      expect(result.breakEvenMonths).toBeGreaterThan(0);
      expect(result.riskScore).toBeGreaterThan(0);
      expect(result.riskScore).toBeLessThanOrEqual(100);
    });

    it('should calculate automatic cancellation date correctly', () => {
      const result = calculatePMICancellation(validInputs);

      expect(result.automaticCancellationDate).toBeDefined();
      expect(new Date(result.automaticCancellationDate)).toBeInstanceOf(Date);
    });

    it('should calculate request cancellation date correctly', () => {
      const result = calculatePMICancellation(validInputs);

      expect(result.requestCancellationDate).toBeDefined();
      expect(new Date(result.requestCancellationDate)).toBeInstanceOf(Date);
    });

    it('should generate analysis with cancellation rating', () => {
      const result = calculatePMICancellation(validInputs);

      expect(result.analysis.cancellationRating).toBeDefined();
      expect(['excellent', 'good', 'fair', 'poor']).toContain(result.analysis.cancellationRating);
      expect(result.analysis.recommendation).toBeDefined();
      expect(result.analysis.recommendation.length).toBeGreaterThan(0);
    });

    it('should generate timeline analysis', () => {
      const result = calculatePMICancellation(validInputs);

      expect(result.timelineAnalysis).toBeInstanceOf(Array);
      expect(result.timelineAnalysis.length).toBeGreaterThan(0);
      expect(result.timelineAnalysis[0]).toHaveProperty('month');
      expect(result.timelineAnalysis[0]).toHaveProperty('ltvRatio');
      expect(result.timelineAnalysis[0]).toHaveProperty('pmiStatus');
    });

    it('should generate comparison analysis', () => {
      const result = calculatePMICancellation(validInputs);

      expect(result.comparisonAnalysis).toBeInstanceOf(Array);
      expect(result.comparisonAnalysis.length).toBeGreaterThan(0);
      expect(result.comparisonAnalysis[0]).toHaveProperty('scenario');
      expect(result.comparisonAnalysis[0]).toHaveProperty('savings');
    });

    it('should calculate metrics correctly', () => {
      const result = calculatePMICancellation(validInputs);

      expect(result.metrics).toBeDefined();
      expect(result.metrics.totalPMIPaid).toBeGreaterThan(0);
      expect(result.metrics.remainingPMICost).toBeGreaterThan(0);
      expect(result.metrics.monthlyPrincipalPayment).toBeGreaterThan(0);
      expect(result.metrics.monthlyTotalPayment).toBeGreaterThan(0);
      expect(result.metrics.totalPaymentSavings).toBeGreaterThan(0);
    });

    it('should handle high LTV ratio correctly', () => {
      const highLTVInputs = { ...validInputs, currentLoanBalance: 320000 };
      const result = calculatePMICancellation(highLTVInputs);

      expect(result.currentLtvRatio).toBeCloseTo(80, 1);
      expect(result.pmiEligibility).toBe(false);
    });

    it('should handle low property value correctly', () => {
      const lowValueInputs = { ...validInputs, currentPropertyValue: 300000 };
      const result = calculatePMICancellation(lowValueInputs);

      expect(result.currentLtvRatio).toBeCloseTo(93.3, 1);
      expect(result.pmiEligibility).toBe(false);
    });

    it('should handle zero PMI payment correctly', () => {
      const zeroPMIInputs = { ...validInputs, pmiMonthlyPayment: 0 };
      const result = calculatePMICancellation(zeroPMIInputs);

      expect(result.monthlyPMISavings).toBe(0);
      expect(result.totalPMISavings).toBe(0);
      expect(result.breakEvenMonths).toBe(0);
    });
  });

  describe('validatePMICancellationInputs', () => {
    it('should validate correct inputs successfully', () => {
      const result = validatePMICancellationInputs(validInputs);

      expect(result.isValid).toBe(true);
      expect(result.errors).toBeUndefined();
    });

    it('should reject invalid loan amount', () => {
      const invalidInputs = { ...validInputs, originalLoanAmount: -1000 };
      const result = validatePMICancellationInputs(invalidInputs);

      expect(result.isValid).toBe(false);
      expect(result.errors?.originalLoanAmount).toBeDefined();
    });

    it('should reject current loan balance exceeding original amount', () => {
      const invalidInputs = { ...validInputs, currentLoanBalance: 350000 };
      const result = validatePMICancellationInputs(invalidInputs);

      expect(result.isValid).toBe(false);
      expect(result.errors?.currentLoanBalance).toBeDefined();
    });

    it('should reject invalid interest rate', () => {
      const invalidInputs = { ...validInputs, interestRate: 25 };
      const result = validatePMICancellationInputs(invalidInputs);

      expect(result.isValid).toBe(false);
      expect(result.errors?.interestRate).toBeDefined();
    });

    it('should reject invalid loan type', () => {
      const invalidInputs = { ...validInputs, loanType: 'invalid' as any };
      const result = validatePMICancellationInputs(invalidInputs);

      expect(result.isValid).toBe(false);
      expect(result.errors?.loanType).toBeDefined();
    });

    it('should reject invalid property value', () => {
      const invalidInputs = { ...validInputs, currentPropertyValue: -50000 };
      const result = validatePMICancellationInputs(invalidInputs);

      expect(result.isValid).toBe(false);
      expect(result.errors?.currentPropertyValue).toBeDefined();
    });

    it('should reject invalid PMI rate', () => {
      const invalidInputs = { ...validInputs, pmiRate: 10 };
      const result = validatePMICancellationInputs(invalidInputs);

      expect(result.isValid).toBe(false);
      expect(result.errors?.pmiRate).toBeDefined();
    });

    it('should reject missing required dates', () => {
      const invalidInputs = { ...validInputs, loanStartDate: '' as any };
      const result = validatePMICancellationInputs(invalidInputs);

      expect(result.isValid).toBe(false);
      expect(result.errors?.loanStartDate).toBeDefined();
    });

    it('should reject invalid credit score', () => {
      const invalidInputs = { ...validInputs, borrowerCreditScore: 200 };
      const result = validatePMICancellationInputs(invalidInputs);

      expect(result.isValid).toBe(false);
      expect(result.errors?.borrowerCreditScore).toBeDefined();
    });

    it('should reject invalid debt-to-income ratio', () => {
      const invalidInputs = { ...validInputs, borrowerDebtToIncomeRatio: 150 };
      const result = validatePMICancellationInputs(invalidInputs);

      expect(result.isValid).toBe(false);
      expect(result.errors?.borrowerDebtToIncomeRatio).toBeDefined();
    });

    it('should reject empty comparable sales', () => {
      const invalidInputs = { ...validInputs, comparableSales: [] };
      const result = validatePMICancellationInputs(invalidInputs);

      expect(result.isValid).toBe(false);
      expect(result.errors?.comparableSales).toBeDefined();
    });

    it('should reject invalid payment history', () => {
      const invalidInputs = { ...validInputs, paymentHistory: [] };
      const result = validatePMICancellationInputs(invalidInputs);

      expect(result.isValid).toBe(false);
      expect(result.errors?.paymentHistory).toBeDefined();
    });

    it('should validate business logic constraints', () => {
      const invalidInputs = { 
        ...validInputs, 
        currentPropertyValue: 100000, // Too low relative to original
        originalPropertyValue: 375000 
      };
      const result = validatePMICancellationInputs(invalidInputs);

      expect(result.isValid).toBe(false);
      expect(result.errors?.currentPropertyValue).toBeDefined();
    });
  });

  describe('validateField', () => {
    it('should validate individual fields correctly', () => {
      const result = validateField('originalLoanAmount', 300000, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate loan amount with cross-field validation', () => {
      const result = validateField('currentLoanBalance', 350000, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('cannot exceed original loan amount');
    });

    it('should validate property value with cross-field validation', () => {
      const result = validateField('currentPropertyValue', 100000, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('unusually low');
    });

    it('should validate PMI rate with loan type context', () => {
      const result = validateField('pmiRate', 2.0, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('unusually high for conventional loans');
    });

    it('should validate PMI payment with rate consistency', () => {
      const result = validateField('pmiMonthlyPayment', 1000, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('inconsistent with PMI rate');
    });

    it('should validate down payment percentage consistency', () => {
      const result = validateField('originalDownPaymentPercentage', 50, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('does not match down payment amount');
    });

    it('should validate payments made consistency', () => {
      const result = validateField('paymentsMade', 50, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('should closely match months since loan start');
    });

    it('should validate date relationships', () => {
      const result = validateField('pmiStartDate', '2019-01-01', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('cannot be before loan start date');
    });

    it('should validate comparable sales structure', () => {
      const invalidSales = [{ address: '', salePrice: 0, saleDate: '', condition: '' }];
      const result = validateField('comparableSales', invalidSales, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('address is required');
    });

    it('should validate payment history structure', () => {
      const invalidHistory = [{ 
        paymentNumber: 0, 
        paymentDate: '', 
        paymentAmount: 0, 
        principal: -1, 
        interest: -1, 
        balance: -1, 
        onTime: 'invalid' as any 
      }];
      const result = validateField('paymentHistory', invalidHistory, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('number must be greater than 0');
    });

    it('should validate enum fields correctly', () => {
      const result = validateField('loanType', 'invalid', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Valid loan type is required');
    });

    it('should validate boolean fields correctly', () => {
      const result = validateField('appraisalRequired', 'invalid', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('must be true or false');
    });

    it('should validate string fields correctly', () => {
      const result = validateField('marketLocation', '', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('is required');
    });

    it('should validate numeric range fields correctly', () => {
      const result = validateField('interestRate', 25, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('cannot exceed 20%');
    });
  });

  describe('Edge Cases', () => {
    it('should handle very small loan amounts', () => {
      const smallLoanInputs = { ...validInputs, originalLoanAmount: 1000, currentLoanBalance: 900 };
      const result = calculatePMICancellation(smallLoanInputs);

      expect(result.currentLtvRatio).toBeCloseTo(90, 1);
      expect(result.pmiEligibility).toBe(false);
    });

    it('should handle very large loan amounts', () => {
      const largeLoanInputs = { ...validInputs, originalLoanAmount: 5000000, currentLoanBalance: 4800000 };
      const result = calculatePMICancellation(largeLoanInputs);

      expect(result.currentLtvRatio).toBeCloseTo(96, 1);
      expect(result.pmiEligibility).toBe(false);
    });

    it('should handle zero interest rate', () => {
      const zeroInterestInputs = { ...validInputs, interestRate: 0 };
      const result = calculatePMICancellation(zeroInterestInputs);

      expect(result.metrics.monthlyPrincipalPayment).toBeGreaterThan(0);
      expect(result.metrics.monthlyTotalPayment).toBeGreaterThan(0);
    });

    it('should handle very high property appreciation', () => {
      const highAppreciationInputs = { ...validInputs, propertyAppreciationRate: 50 };
      const result = calculatePMICancellation(highAppreciationInputs);

      expect(result.analysis.cancellationRating).toBeDefined();
      expect(result.timelineAnalysis.length).toBeGreaterThan(0);
    });

    it('should handle negative property appreciation', () => {
      const negativeAppreciationInputs = { ...validInputs, propertyAppreciationRate: -20 };
      const result = calculatePMICancellation(negativeAppreciationInputs);

      expect(result.analysis.cancellationRating).toBeDefined();
      expect(result.timelineAnalysis.length).toBeGreaterThan(0);
    });
  });

  describe('Business Logic', () => {
    it('should correctly identify PMI eligibility based on LTV', () => {
      // Test case where LTV is below threshold
      const eligibleInputs = { ...validInputs, currentLoanBalance: 240000 };
      const eligibleResult = calculatePMICancellation(eligibleInputs);
      expect(eligibleResult.pmiEligibility).toBe(true);

      // Test case where LTV is above threshold
      const ineligibleInputs = { ...validInputs, currentLoanBalance: 320000 };
      const ineligibleResult = calculatePMICancellation(ineligibleInputs);
      expect(ineligibleResult.pmiEligibility).toBe(false);
    });

    it('should calculate break-even point correctly', () => {
      const result = calculatePMICancellation(validInputs);
      
      // Break-even should be positive if there are appraisal costs
      if (validInputs.appraisalCost > 0) {
        expect(result.breakEvenMonths).toBeGreaterThan(0);
      }
    });

    it('should generate appropriate risk scores', () => {
      const result = calculatePMICancellation(validInputs);
      
      expect(result.riskScore).toBeGreaterThanOrEqual(0);
      expect(result.riskScore).toBeLessThanOrEqual(100);
    });

    it('should provide meaningful analysis recommendations', () => {
      const result = calculatePMICancellation(validInputs);
      
      expect(result.analysis.recommendation).toBeDefined();
      expect(result.analysis.recommendation.length).toBeGreaterThan(10);
    });
  });

  describe('Analysis Generation', () => {
    it('should generate timeline analysis with correct structure', () => {
      const result = calculatePMICancellation(validInputs);
      
      expect(result.timelineAnalysis).toBeInstanceOf(Array);
      expect(result.timelineAnalysis.length).toBeGreaterThan(0);
      
      const firstEntry = result.timelineAnalysis[0];
      expect(firstEntry).toHaveProperty('month');
      expect(firstEntry).toHaveProperty('ltvRatio');
      expect(firstEntry).toHaveProperty('pmiStatus');
      expect(firstEntry).toHaveProperty('cumulativeSavings');
    });

    it('should generate comparison analysis with different scenarios', () => {
      const result = calculatePMICancellation(validInputs);
      
      expect(result.comparisonAnalysis).toBeInstanceOf(Array);
      expect(result.comparisonAnalysis.length).toBeGreaterThan(0);
      
      const scenarios = result.comparisonAnalysis.map(item => item.scenario);
      expect(scenarios).toContain('Current Scenario');
      expect(scenarios).toContain('Appraisal Required');
      expect(scenarios).toContain('Automatic Cancellation');
    });

    it('should calculate metrics breakdown correctly', () => {
      const result = calculatePMICancellation(validInputs);
      
      expect(result.metrics.totalPMIPaid).toBeGreaterThan(0);
      expect(result.metrics.remainingPMICost).toBeGreaterThan(0);
      expect(result.metrics.monthlyPrincipalPayment).toBeGreaterThan(0);
      expect(result.metrics.monthlyTotalPayment).toBeGreaterThan(0);
      expect(result.metrics.totalPaymentSavings).toBeGreaterThan(0);
    });
  });
});