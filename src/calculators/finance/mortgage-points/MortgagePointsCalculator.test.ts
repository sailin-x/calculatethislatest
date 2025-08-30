import { describe, it, expect, beforeEach } from 'vitest';
import { calculateMortgagePoints } from './formulas';
import { validateMortgagePointsInputs } from './validation';
import { validateField } from './quickValidation';
import { MortgagePointsInputs } from './types';

describe('Mortgage Points Calculator', () => {
  let validInputs: MortgagePointsInputs;

  beforeEach(() => {
    validInputs = {
      // Loan Details
      loanAmount: 300000,
      baseInterestRate: 6.5,
      loanTerm: 30,
      loanType: 'conventional',
      paymentType: 'principal_interest',
      
      // Points Information
      discountPoints: 2,
      originationPoints: 1,
      pointCost: 1000,
      pointValue: 0.25,
      rateOptions: [
        { points: 0, rate: 6.5, payment: 1896 },
        { points: 1, rate: 6.25, payment: 1847 },
        { points: 2, rate: 6.0, payment: 1799 },
        { points: 3, rate: 5.75, payment: 1751 }
      ],
      
      // Property Information
      propertyValue: 375000,
      downPayment: 75000,
      downPaymentPercentage: 20,
      propertyInsurance: 1200,
      propertyTaxes: 4500,
      hoaFees: 0,
      floodInsurance: 0,
      mortgageInsurance: 0,
      mortgageInsuranceRate: 0,
      propertyAddress: '123 Main St, Anytown, USA',
      propertyType: 'single_family',
      propertySize: 2000,
      propertyAge: 15,
      downPaymentSource: 'savings',
      
      // Borrower Information
      borrowerIncome: 80000,
      borrowerCreditScore: 750,
      borrowerDebtToIncomeRatio: 35,
      borrowerEmploymentType: 'employed',
      borrowerTaxRate: 25,
      
      // Market Information
      marketLocation: 'Suburban',
      marketCondition: 'stable',
      marketGrowthRate: 3,
      
      // Analysis Parameters
      analysisPeriod: 30,
      inflationRate: 2.5,
      propertyAppreciationRate: 3,
      discountRate: 5,
      taxDeductionPeriod: 30,
      
      // Reporting Preferences
      currency: 'USD',
      displayFormat: 'currency',
      includeCharts: true
    };
  });

  describe('calculateMortgagePoints', () => {
    it('should calculate basic mortgage points metrics correctly', () => {
      const result = calculateMortgagePoints(validInputs);
      
      expect(result.totalPoints).toBe(3); // 2 discount + 1 origination
      expect(result.totalPointCost).toBe(3000); // 3 points * $1000
      expect(result.effectiveRate).toBe(6.0); // 6.5 - (2 * 0.25)
      expect(result.monthlyPaymentSavings).toBeGreaterThan(0);
      expect(result.interestSavings).toBeGreaterThan(0);
      expect(result.breakEvenMonths).toBeGreaterThan(0);
      expect(result.returnOnInvestment).toBeDefined();
      expect(result.netPresentValue).toBeDefined();
    });

    it('should handle zero points correctly', () => {
      const inputs = { ...validInputs, discountPoints: 0, originationPoints: 0 };
      const result = calculateMortgagePoints(inputs);
      
      expect(result.totalPoints).toBe(0);
      expect(result.totalPointCost).toBe(0);
      expect(result.effectiveRate).toBe(6.5);
      expect(result.monthlyPaymentSavings).toBe(0);
      expect(result.interestSavings).toBe(0);
    });

    it('should calculate break-even analysis correctly', () => {
      const result = calculateMortgagePoints(validInputs);
      
      expect(result.breakEvenMonths).toBeGreaterThan(0);
      expect(result.breakEvenYears).toBeGreaterThan(0);
      expect(result.breakEvenPoint).toBeGreaterThan(result.totalPointCost);
    });

    it('should calculate tax analysis correctly', () => {
      const result = calculateMortgagePoints(validInputs);
      
      expect(result.taxDeduction).toBe(750); // 3000 * 0.25
      expect(result.afterTaxCost).toBe(2250); // 3000 - 750
      expect(result.effectiveTaxRate).toBe(25);
    });

    it('should generate comparison analysis', () => {
      const result = calculateMortgagePoints(validInputs);
      
      expect(result.comparisonAnalysis).toBeDefined();
      expect(Array.isArray(result.comparisonAnalysis)).toBe(true);
      expect(result.comparisonAnalysis.length).toBeGreaterThan(0);
    });

    it('should generate sensitivity matrix', () => {
      const result = calculateMortgagePoints(validInputs);
      
      expect(result.sensitivityMatrix).toBeDefined();
      expect(Array.isArray(result.sensitivityMatrix)).toBe(true);
    });

    it('should generate scenario analysis', () => {
      const result = calculateMortgagePoints(validInputs);
      
      expect(result.scenarios).toBeDefined();
      expect(Array.isArray(result.scenarios)).toBe(true);
    });

    it('should generate amortization comparison', () => {
      const result = calculateMortgagePoints(validInputs);
      
      expect(result.amortizationComparison).toBeDefined();
      expect(Array.isArray(result.amortizationComparison)).toBe(true);
    });

    it('should calculate risk metrics', () => {
      const result = calculateMortgagePoints(validInputs);
      
      expect(result.riskScore).toBeDefined();
      expect(result.probabilityOfBenefit).toBeDefined();
      expect(result.worstCaseScenario).toBeDefined();
      expect(result.bestCaseScenario).toBeDefined();
    });

    it('should generate comprehensive analysis', () => {
      const result = calculateMortgagePoints(validInputs);
      
      expect(result.analysis).toBeDefined();
      expect(result.analysis.pointsRating).toBeDefined();
      expect(result.analysis.valueRating).toBeDefined();
      expect(result.analysis.recommendation).toBeDefined();
      expect(result.analysis.summary).toBeDefined();
      expect(result.analysis.keyInsights).toBeDefined();
      expect(result.analysis.risks).toBeDefined();
      expect(result.analysis.opportunities).toBeDefined();
    });
  });

  describe('validateMortgagePointsInputs', () => {
    it('should validate correct inputs', () => {
      const result = validateMortgagePointsInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toBeUndefined();
    });

    it('should reject invalid loan amount', () => {
      const inputs = { ...validInputs, loanAmount: -1000 };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.loanAmount).toBeDefined();
    });

    it('should reject invalid interest rate', () => {
      const inputs = { ...validInputs, baseInterestRate: 30 };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.baseInterestRate).toBeDefined();
    });

    it('should reject invalid loan term', () => {
      const inputs = { ...validInputs, loanTerm: 60 };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.loanTerm).toBeDefined();
    });

    it('should reject invalid loan type', () => {
      const inputs = { ...validInputs, loanType: 'invalid' as any };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.loanType).toBeDefined();
    });

    it('should reject invalid payment type', () => {
      const inputs = { ...validInputs, paymentType: 'invalid' as any };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.paymentType).toBeDefined();
    });

    it('should reject negative discount points', () => {
      const inputs = { ...validInputs, discountPoints: -1 };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.discountPoints).toBeDefined();
    });

    it('should reject excessive discount points', () => {
      const inputs = { ...validInputs, discountPoints: 15 };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.discountPoints).toBeDefined();
    });

    it('should reject negative origination points', () => {
      const inputs = { ...validInputs, originationPoints: -1 };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.originationPoints).toBeDefined();
    });

    it('should reject negative point cost', () => {
      const inputs = { ...validInputs, pointCost: -100 };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.pointCost).toBeDefined();
    });

    it('should reject excessive point cost', () => {
      const inputs = { ...validInputs, pointCost: 15000 };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.pointCost).toBeDefined();
    });

    it('should reject negative point value', () => {
      const inputs = { ...validInputs, pointValue: -0.1 };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.pointValue).toBeDefined();
    });

    it('should reject excessive point value', () => {
      const inputs = { ...validInputs, pointValue: 1.5 };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.pointValue).toBeDefined();
    });

    it('should reject empty rate options', () => {
      const inputs = { ...validInputs, rateOptions: [] };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.rateOptions).toBeDefined();
    });

    it('should reject invalid rate options', () => {
      const inputs = { 
        ...validInputs, 
        rateOptions: [
          { points: -1, rate: 6.5, payment: 1896 }
        ]
      };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.['rateOptions[0].points']).toBeDefined();
    });

    it('should reject loan amount exceeding property value', () => {
      const inputs = { ...validInputs, loanAmount: 400000 };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.loanAmount).toBeDefined();
    });

    it('should reject down payment exceeding property value', () => {
      const inputs = { ...validInputs, downPayment: 400000 };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.downPayment).toBeDefined();
    });

    it('should reject invalid down payment percentage', () => {
      const inputs = { ...validInputs, downPaymentPercentage: 150 };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.downPaymentPercentage).toBeDefined();
    });

    it('should reject negative property insurance', () => {
      const inputs = { ...validInputs, propertyInsurance: -100 };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertyInsurance).toBeDefined();
    });

    it('should reject negative property taxes', () => {
      const inputs = { ...validInputs, propertyTaxes: -100 };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertyTaxes).toBeDefined();
    });

    it('should reject negative HOA fees', () => {
      const inputs = { ...validInputs, hoaFees: -100 };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.hoaFees).toBeDefined();
    });

    it('should reject negative flood insurance', () => {
      const inputs = { ...validInputs, floodInsurance: -100 };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.floodInsurance).toBeDefined();
    });

    it('should reject negative mortgage insurance', () => {
      const inputs = { ...validInputs, mortgageInsurance: -100 };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.mortgageInsurance).toBeDefined();
    });

    it('should reject negative mortgage insurance rate', () => {
      const inputs = { ...validInputs, mortgageInsuranceRate: -1 };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.mortgageInsuranceRate).toBeDefined();
    });

    it('should reject invalid borrower income', () => {
      const inputs = { ...validInputs, borrowerIncome: -1000 };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.borrowerIncome).toBeDefined();
    });

    it('should reject invalid credit score', () => {
      const inputs = { ...validInputs, borrowerCreditScore: 200 };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.borrowerCreditScore).toBeDefined();
    });

    it('should reject invalid debt-to-income ratio', () => {
      const inputs = { ...validInputs, borrowerDebtToIncomeRatio: 150 };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.borrowerDebtToIncomeRatio).toBeDefined();
    });

    it('should reject invalid employment type', () => {
      const inputs = { ...validInputs, borrowerEmploymentType: 'invalid' as any };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.borrowerEmploymentType).toBeDefined();
    });

    it('should reject invalid tax rate', () => {
      const inputs = { ...validInputs, borrowerTaxRate: 60 };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.borrowerTaxRate).toBeDefined();
    });

    it('should reject invalid market condition', () => {
      const inputs = { ...validInputs, marketCondition: 'invalid' as any };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.marketCondition).toBeDefined();
    });

    it('should reject invalid market growth rate', () => {
      const inputs = { ...validInputs, marketGrowthRate: 60 };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.marketGrowthRate).toBeDefined();
    });

    it('should reject invalid analysis period', () => {
      const inputs = { ...validInputs, analysisPeriod: 60 };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.analysisPeriod).toBeDefined();
    });

    it('should reject invalid inflation rate', () => {
      const inputs = { ...validInputs, inflationRate: 60 };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.inflationRate).toBeDefined();
    });

    it('should reject invalid property appreciation rate', () => {
      const inputs = { ...validInputs, propertyAppreciationRate: 60 };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertyAppreciationRate).toBeDefined();
    });

    it('should reject invalid discount rate', () => {
      const inputs = { ...validInputs, discountRate: 60 };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.discountRate).toBeDefined();
    });

    it('should reject invalid tax deduction period', () => {
      const inputs = { ...validInputs, taxDeductionPeriod: 60 };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.taxDeductionPeriod).toBeDefined();
    });

    it('should reject invalid currency', () => {
      const inputs = { ...validInputs, currency: 'INVALID' as any };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.currency).toBeDefined();
    });

    it('should reject invalid display format', () => {
      const inputs = { ...validInputs, displayFormat: 'invalid' as any };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.displayFormat).toBeDefined();
    });

    it('should reject invalid include charts', () => {
      const inputs = { ...validInputs, includeCharts: 'invalid' as any };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.includeCharts).toBeDefined();
    });

    it('should reject invalid property type', () => {
      const inputs = { ...validInputs, propertyType: 'invalid' as any };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertyType).toBeDefined();
    });

    it('should reject invalid property size', () => {
      const inputs = { ...validInputs, propertySize: -100 };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertySize).toBeDefined();
    });

    it('should reject invalid property age', () => {
      const inputs = { ...validInputs, propertyAge: -10 };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertyAge).toBeDefined();
    });

    it('should reject invalid down payment source', () => {
      const inputs = { ...validInputs, downPaymentSource: 'invalid' as any };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.downPaymentSource).toBeDefined();
    });

    it('should reject points reducing rate below zero', () => {
      const inputs = { ...validInputs, discountPoints: 30, pointValue: 0.25 };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.discountPoints).toBeDefined();
    });

    it('should reject excessive point cost relative to loan amount', () => {
      const inputs = { ...validInputs, pointCost: 20000 };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.pointCost).toBeDefined();
    });

    it('should reject rate options not in descending order', () => {
      const inputs = { 
        ...validInputs, 
        rateOptions: [
          { points: 2, rate: 6.0, payment: 1799 },
          { points: 1, rate: 6.25, payment: 1847 }
        ]
      };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.rateOptions).toBeDefined();
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

    it('should validate base interest rate correctly', () => {
      const result = validateField('baseInterestRate', 6.5, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid base interest rate', () => {
      const result = validateField('baseInterestRate', 30, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate loan term correctly', () => {
      const result = validateField('loanTerm', 30, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid loan term', () => {
      const result = validateField('loanTerm', 60, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate loan type correctly', () => {
      const result = validateField('loanType', 'conventional', validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid loan type', () => {
      const result = validateField('loanType', 'invalid', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate payment type correctly', () => {
      const result = validateField('paymentType', 'principal_interest', validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid payment type', () => {
      const result = validateField('paymentType', 'invalid', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate discount points correctly', () => {
      const result = validateField('discountPoints', 2, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid discount points', () => {
      const result = validateField('discountPoints', -1, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate origination points correctly', () => {
      const result = validateField('originationPoints', 1, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid origination points', () => {
      const result = validateField('originationPoints', -1, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate point cost correctly', () => {
      const result = validateField('pointCost', 1000, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid point cost', () => {
      const result = validateField('pointCost', -100, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate point value correctly', () => {
      const result = validateField('pointValue', 0.25, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid point value', () => {
      const result = validateField('pointValue', 1.5, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate rate options correctly', () => {
      const result = validateField('rateOptions', validInputs.rateOptions, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid rate options', () => {
      const result = validateField('rateOptions', [], validInputs);
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

    it('should reject invalid down payment', () => {
      const result = validateField('downPayment', -1000, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate down payment percentage correctly', () => {
      const result = validateField('downPaymentPercentage', 20, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid down payment percentage', () => {
      const result = validateField('downPaymentPercentage', 150, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate property insurance correctly', () => {
      const result = validateField('propertyInsurance', 1200, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid property insurance', () => {
      const result = validateField('propertyInsurance', -100, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate property taxes correctly', () => {
      const result = validateField('propertyTaxes', 4500, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid property taxes', () => {
      const result = validateField('propertyTaxes', -100, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate HOA fees correctly', () => {
      const result = validateField('hoaFees', 0, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid HOA fees', () => {
      const result = validateField('hoaFees', -100, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate flood insurance correctly', () => {
      const result = validateField('floodInsurance', 0, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid flood insurance', () => {
      const result = validateField('floodInsurance', -100, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate mortgage insurance correctly', () => {
      const result = validateField('mortgageInsurance', 0, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid mortgage insurance', () => {
      const result = validateField('mortgageInsurance', -100, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate mortgage insurance rate correctly', () => {
      const result = validateField('mortgageInsuranceRate', 0, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid mortgage insurance rate', () => {
      const result = validateField('mortgageInsuranceRate', -1, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate borrower income correctly', () => {
      const result = validateField('borrowerIncome', 80000, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid borrower income', () => {
      const result = validateField('borrowerIncome', -1000, validInputs);
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

    it('should validate debt-to-income ratio correctly', () => {
      const result = validateField('borrowerDebtToIncomeRatio', 35, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid debt-to-income ratio', () => {
      const result = validateField('borrowerDebtToIncomeRatio', 150, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate employment type correctly', () => {
      const result = validateField('borrowerEmploymentType', 'employed', validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid employment type', () => {
      const result = validateField('borrowerEmploymentType', 'invalid', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate tax rate correctly', () => {
      const result = validateField('borrowerTaxRate', 25, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid tax rate', () => {
      const result = validateField('borrowerTaxRate', 60, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate market location correctly', () => {
      const result = validateField('marketLocation', 'Suburban', validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid market location', () => {
      const result = validateField('marketLocation', '', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate market condition correctly', () => {
      const result = validateField('marketCondition', 'stable', validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid market condition', () => {
      const result = validateField('marketCondition', 'invalid', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate market growth rate correctly', () => {
      const result = validateField('marketGrowthRate', 3, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid market growth rate', () => {
      const result = validateField('marketGrowthRate', 60, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate analysis period correctly', () => {
      const result = validateField('analysisPeriod', 30, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid analysis period', () => {
      const result = validateField('analysisPeriod', 60, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate inflation rate correctly', () => {
      const result = validateField('inflationRate', 2.5, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid inflation rate', () => {
      const result = validateField('inflationRate', 60, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate property appreciation rate correctly', () => {
      const result = validateField('propertyAppreciationRate', 3, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid property appreciation rate', () => {
      const result = validateField('propertyAppreciationRate', 60, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate discount rate correctly', () => {
      const result = validateField('discountRate', 5, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid discount rate', () => {
      const result = validateField('discountRate', 60, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate tax deduction period correctly', () => {
      const result = validateField('taxDeductionPeriod', 30, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid tax deduction period', () => {
      const result = validateField('taxDeductionPeriod', 60, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate currency correctly', () => {
      const result = validateField('currency', 'USD', validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid currency', () => {
      const result = validateField('currency', 'INVALID', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate display format correctly', () => {
      const result = validateField('displayFormat', 'currency', validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid display format', () => {
      const result = validateField('displayFormat', 'invalid', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate include charts correctly', () => {
      const result = validateField('includeCharts', true, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid include charts', () => {
      const result = validateField('includeCharts', 'invalid', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate property address correctly', () => {
      const result = validateField('propertyAddress', '123 Main St', validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid property address', () => {
      const result = validateField('propertyAddress', '', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate property type correctly', () => {
      const result = validateField('propertyType', 'single_family', validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid property type', () => {
      const result = validateField('propertyType', 'invalid', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate property size correctly', () => {
      const result = validateField('propertySize', 2000, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid property size', () => {
      const result = validateField('propertySize', -100, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate property age correctly', () => {
      const result = validateField('propertyAge', 15, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid property age', () => {
      const result = validateField('propertyAge', -10, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate down payment source correctly', () => {
      const result = validateField('downPaymentSource', 'savings', validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid down payment source', () => {
      const result = validateField('downPaymentSource', 'invalid', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should handle unknown field gracefully', () => {
      const result = validateField('unknownField' as any, 'value', validInputs);
      expect(result.isValid).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero loan amount', () => {
      const inputs = { ...validInputs, loanAmount: 0 };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.loanAmount).toBeDefined();
    });

    it('should handle zero interest rate', () => {
      const inputs = { ...validInputs, baseInterestRate: 0 };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.baseInterestRate).toBeDefined();
    });

    it('should handle zero loan term', () => {
      const inputs = { ...validInputs, loanTerm: 0 };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.loanTerm).toBeDefined();
    });

    it('should handle maximum values', () => {
      const inputs = { 
        ...validInputs, 
        loanAmount: 10000000,
        baseInterestRate: 25,
        loanTerm: 50,
        discountPoints: 10,
        originationPoints: 10,
        pointCost: 10000,
        pointValue: 1,
        propertyValue: 50000000,
        propertyInsurance: 50000,
        propertyTaxes: 100000,
        hoaFees: 5000,
        floodInsurance: 20000,
        mortgageInsurance: 10000,
        mortgageInsuranceRate: 5,
        borrowerIncome: 10000000,
        borrowerCreditScore: 850,
        borrowerDebtToIncomeRatio: 100,
        borrowerTaxRate: 50,
        marketGrowthRate: 50,
        analysisPeriod: 50,
        inflationRate: 50,
        propertyAppreciationRate: 50,
        discountRate: 50,
        taxDeductionPeriod: 50,
        propertySize: 100000,
        propertyAge: 200
      };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(true);
    });

    it('should handle minimum values', () => {
      const inputs = { 
        ...validInputs, 
        discountPoints: 0,
        originationPoints: 0,
        pointCost: 0,
        pointValue: 0,
        downPayment: 0,
        downPaymentPercentage: 0,
        propertyInsurance: 0,
        propertyTaxes: 0,
        hoaFees: 0,
        floodInsurance: 0,
        mortgageInsurance: 0,
        mortgageInsuranceRate: 0,
        borrowerDebtToIncomeRatio: 0,
        borrowerTaxRate: 0,
        marketGrowthRate: -20,
        inflationRate: -10,
        propertyAppreciationRate: -20,
        discountRate: 0,
        propertySize: 0,
        propertyAge: 0
      };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(true);
    });
  });

  describe('Business Logic', () => {
    it('should validate loan amount vs property value relationship', () => {
      const inputs = { ...validInputs, loanAmount: 400000, propertyValue: 375000 };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.loanAmount).toBeDefined();
    });

    it('should validate down payment vs property value relationship', () => {
      const inputs = { ...validInputs, downPayment: 400000, propertyValue: 375000 };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.downPayment).toBeDefined();
    });

    it('should validate down payment vs down payment percentage consistency', () => {
      const inputs = { ...validInputs, downPayment: 50000, downPaymentPercentage: 20 };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.downPayment).toBeDefined();
    });

    it('should validate points reducing rate below zero', () => {
      const inputs = { ...validInputs, discountPoints: 30, pointValue: 0.25 };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.discountPoints).toBeDefined();
    });

    it('should validate point cost relative to loan amount', () => {
      const inputs = { ...validInputs, pointCost: 20000 };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.pointCost).toBeDefined();
    });

    it('should validate rate options ordering', () => {
      const inputs = { 
        ...validInputs, 
        rateOptions: [
          { points: 1, rate: 6.25, payment: 1847 },
          { points: 2, rate: 6.0, payment: 1799 }
        ]
      };
      const result = validateMortgagePointsInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.rateOptions).toBeDefined();
    });
  });
});