import { describe, it, expect, beforeEach } from 'vitest';
import { calculatePrivateMortgageInsurance } from './formulas';
import { validatePrivateMortgageInsuranceInputs } from './validation';
import { validateField } from './quickValidation';
import { PrivateMortgageInsuranceInputs } from './types';

describe('Private Mortgage Insurance Calculator', () => {
  let validInputs: PrivateMortgageInsuranceInputs;

  beforeEach(() => {
    validInputs = {
      // Loan Information
      loanAmount: 300000,
      interestRate: 4.5,
      loanTerm: 30,
      loanType: 'conventional',
      paymentType: 'principal_interest',
      
      // Property Information
      propertyValue: 375000,
      propertyAddress: '123 Main St, Anytown, USA',
      propertyType: 'single_family',
      propertySize: 2000,
      propertyAge: 15,
      
      // Down Payment Information
      downPayment: 75000,
      downPaymentPercentage: 20,
      downPaymentSource: 'savings',
      
      // PMI Information
      pmiRequired: true,
      pmiRate: 0.5,
      pmiType: 'monthly',
      pmiCancellationMethod: 'automatic',
      
      // Borrower Information
      borrowerIncome: 80000,
      borrowerCreditScore: 720,
      borrowerDebtToIncomeRatio: 35,
      borrowerEmploymentType: 'employed',
      borrowerTaxRate: 22,
      
      // Loan History
      loanStartDate: '2024-01-01',
      paymentsMade: 12,
      monthsSinceLoanStart: 12,
      currentPrincipalBalance: 295000,
      
      // Market Information
      marketLocation: 'Anytown, USA',
      marketCondition: 'stable',
      marketGrowthRate: 3.0,
      propertyAppreciationRate: 3.0,
      
      // PMI Requirements
      ltvThreshold: 80,
      paymentHistory: [
        {
          paymentNumber: 1,
          paymentDate: '2024-02-01',
          paymentAmount: 1520.06,
          principal: 395.06,
          interest: 1125.00,
          balance: 299604.94,
          onTime: true
        }
      ],
      
      // Analysis Parameters
      analysisPeriod: 60,
      inflationRate: 2.5,
      discountRate: 6.0,
      
      // Reporting Preferences
      currency: 'USD',
      displayFormat: 'currency',
      includeCharts: true
    };
  });

  describe('calculatePrivateMortgageInsurance', () => {
    it('should calculate basic PMI metrics correctly', () => {
      const result = calculatePrivateMortgageInsurance(validInputs);
      
      expect(result.pmiRequired).toBe(true);
      expect(result.loanToValueRatio).toBe(80); // 300000 / 375000 * 100
      expect(result.equityPosition).toBe(75000); // 375000 - 300000
      expect(result.equityPercentage).toBe(20); // 75000 / 375000 * 100
    });

    it('should calculate PMI costs correctly', () => {
      const result = calculatePrivateMortgageInsurance(validInputs);
      
      // PMI monthly payment = (300000 * 0.5) / 1200 = 125
      expect(result.pmiMonthlyPayment).toBe(125);
      expect(result.pmiAnnualCost).toBe(1500); // 125 * 12
      expect(result.pmiTotalCost).toBeGreaterThan(0);
    });

    it('should calculate loan payments correctly', () => {
      const result = calculatePrivateMortgageInsurance(validInputs);
      
      expect(result.monthlyPayment).toBeGreaterThan(0);
      expect(result.monthlyPaymentWithoutPMI).toBe(result.monthlyPayment - result.pmiMonthlyPayment);
      expect(result.paymentIncrease).toBe(result.pmiMonthlyPayment);
      expect(result.paymentIncreasePercentage).toBeGreaterThan(0);
    });

    it('should calculate effective interest rate correctly', () => {
      const result = calculatePrivateMortgageInsurance(validInputs);
      
      // Base rate: 4.5%
      // PMI equivalent rate: (125 * 12) / 300000 * 100 = 0.5%
      // Effective rate: 4.5% + 0.5% = 5.0%
      expect(result.effectiveInterestRate).toBeCloseTo(5.0, 1);
    });

    it('should calculate cancellation analysis correctly', () => {
      const result = calculatePrivateMortgageInsurance(validInputs);
      
      expect(result.cancellationEligibility).toBeDefined();
      expect(result.automaticCancellationDate).toBeDefined();
      expect(result.requestCancellationDate).toBeDefined();
      expect(result.monthsToAutomaticCancellation).toBeGreaterThan(0);
      expect(result.monthsToRequestCancellation).toBeGreaterThan(0);
    });

    it('should calculate break-even analysis correctly', () => {
      const result = calculatePrivateMortgageInsurance(validInputs);
      
      expect(result.breakEvenPoint).toBeGreaterThan(0);
      expect(result.breakEvenMonths).toBeGreaterThan(0);
      expect(result.breakEvenCost).toBeGreaterThan(0);
      expect(result.netSavings).toBeDefined();
    });

    it('should calculate risk score correctly', () => {
      const result = calculatePrivateMortgageInsurance(validInputs);
      
      expect(result.riskScore).toBeGreaterThan(0);
      expect(result.riskScore).toBeLessThanOrEqual(100);
    });

    it('should generate timeline analysis', () => {
      const result = calculatePrivateMortgageInsurance(validInputs);
      
      expect(result.timelineAnalysis).toBeInstanceOf(Array);
      expect(result.timelineAnalysis.length).toBeGreaterThan(0);
      expect(result.timelineAnalysis[0]).toHaveProperty('month');
      expect(result.timelineAnalysis[0]).toHaveProperty('date');
      expect(result.timelineAnalysis[0]).toHaveProperty('ltvRatio');
      expect(result.timelineAnalysis[0]).toHaveProperty('pmiPayment');
    });

    it('should generate sensitivity matrix', () => {
      const result = calculatePrivateMortgageInsurance(validInputs);
      
      expect(result.sensitivityMatrix).toBeInstanceOf(Array);
      expect(result.sensitivityMatrix.length).toBeGreaterThan(0);
      expect(result.sensitivityMatrix[0]).toHaveProperty('variable');
      expect(result.sensitivityMatrix[0]).toHaveProperty('values');
      expect(result.sensitivityMatrix[0]).toHaveProperty('impacts');
    });

    it('should generate scenarios', () => {
      const result = calculatePrivateMortgageInsurance(validInputs);
      
      expect(result.scenarios).toBeInstanceOf(Array);
      expect(result.scenarios.length).toBeGreaterThan(0);
      expect(result.scenarios[0]).toHaveProperty('scenario');
      expect(result.scenarios[0]).toHaveProperty('probability');
      expect(result.scenarios[0]).toHaveProperty('pmiCost');
    });

    it('should generate comparison analysis', () => {
      const result = calculatePrivateMortgageInsurance(validInputs);
      
      expect(result.comparisonAnalysis).toBeInstanceOf(Array);
      expect(result.comparisonAnalysis.length).toBeGreaterThan(0);
      expect(result.comparisonAnalysis[0]).toHaveProperty('option');
      expect(result.comparisonAnalysis[0]).toHaveProperty('pmiCost');
      expect(result.comparisonAnalysis[0]).toHaveProperty('totalCost');
    });

    it('should calculate probability of cancellation', () => {
      const result = calculatePrivateMortgageInsurance(validInputs);
      
      expect(result.probabilityOfCancellation).toBeGreaterThan(0);
      expect(result.probabilityOfCancellation).toBeLessThanOrEqual(1);
    });

    it('should calculate worst and best case scenarios', () => {
      const result = calculatePrivateMortgageInsurance(validInputs);
      
      expect(result.worstCaseScenario).toBeGreaterThan(0);
      expect(result.bestCaseScenario).toBeGreaterThan(0);
      expect(result.worstCaseScenario).toBeGreaterThanOrEqual(result.bestCaseScenario);
    });

    it('should calculate tax analysis', () => {
      const result = calculatePrivateMortgageInsurance(validInputs);
      
      expect(result.taxDeduction).toBeGreaterThan(0);
      expect(result.afterTaxCost).toBeGreaterThan(0);
      expect(result.taxBenefit).toBeGreaterThan(0);
    });

    it('should generate market analysis', () => {
      const result = calculatePrivateMortgageInsurance(validInputs);
      
      expect(result.marketAnalysis).toBeInstanceOf(Array);
      expect(result.marketAnalysis.length).toBeGreaterThan(0);
      expect(result.marketAnalysis[0]).toHaveProperty('factor');
      expect(result.marketAnalysis[0]).toHaveProperty('impact');
      expect(result.marketAnalysis[0]).toHaveProperty('risk');
    });

    it('should generate analysis correctly', () => {
      const result = calculatePrivateMortgageInsurance(validInputs);
      
      expect(result.analysis.pmiRating).toBeDefined();
      expect(result.analysis.costRating).toBeDefined();
      expect(result.analysis.recommendation).toBeDefined();
      expect(result.analysis.keyStrengths).toBeInstanceOf(Array);
      expect(result.analysis.keyWeaknesses).toBeInstanceOf(Array);
    });
  });

  describe('validatePrivateMortgageInsuranceInputs', () => {
    it('should validate correct inputs successfully', () => {
      const result = validatePrivateMortgageInsuranceInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toBeUndefined();
    });

    it('should reject invalid loan amount', () => {
      const invalidInputs = { ...validInputs, loanAmount: 0 };
      const result = validatePrivateMortgageInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.loanAmount).toBe('Loan amount must be greater than 0');
    });

    it('should reject loan amount exceeding property value', () => {
      const invalidInputs = { ...validInputs, loanAmount: 400000 };
      const result = validatePrivateMortgageInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.loanAmount).toBe('Loan amount cannot exceed property value');
    });

    it('should reject invalid interest rate', () => {
      const invalidInputs = { ...validInputs, interestRate: 25 };
      const result = validatePrivateMortgageInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.interestRate).toBe('Interest rate cannot exceed 20%');
    });

    it('should reject invalid loan type', () => {
      const invalidInputs = { ...validInputs, loanType: 'invalid' as any };
      const result = validatePrivateMortgageInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.loanType).toBe('Valid loan type is required');
    });

    it('should reject invalid property value', () => {
      const invalidInputs = { ...validInputs, propertyValue: 0 };
      const result = validatePrivateMortgageInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertyValue).toBe('Property value must be greater than 0');
    });

    it('should reject missing property address', () => {
      const invalidInputs = { ...validInputs, propertyAddress: '' };
      const result = validatePrivateMortgageInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertyAddress).toBe('Property address is required');
    });

    it('should reject invalid property type', () => {
      const invalidInputs = { ...validInputs, propertyType: 'invalid' as any };
      const result = validatePrivateMortgageInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertyType).toBe('Valid property type is required');
    });

    it('should reject invalid down payment', () => {
      const invalidInputs = { ...validInputs, downPayment: -1000 };
      const result = validatePrivateMortgageInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.downPayment).toBe('Down payment must be 0 or greater');
    });

    it('should reject down payment exceeding property value', () => {
      const invalidInputs = { ...validInputs, downPayment: 400000 };
      const result = validatePrivateMortgageInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.downPayment).toBe('Down payment cannot exceed property value');
    });

    it('should reject invalid PMI rate', () => {
      const invalidInputs = { ...validInputs, pmiRate: 6 };
      const result = validatePrivateMortgageInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.pmiRate).toBe('PMI rate cannot exceed 5%');
    });

    it('should reject invalid PMI type', () => {
      const invalidInputs = { ...validInputs, pmiType: 'invalid' as any };
      const result = validatePrivateMortgageInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.pmiType).toBe('Valid PMI type is required');
    });

    it('should reject invalid borrower income', () => {
      const invalidInputs = { ...validInputs, borrowerIncome: 0 };
      const result = validatePrivateMortgageInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.borrowerIncome).toBe('Borrower income must be greater than 0');
    });

    it('should reject invalid credit score', () => {
      const invalidInputs = { ...validInputs, borrowerCreditScore: 200 };
      const result = validatePrivateMortgageInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.borrowerCreditScore).toBe('Credit score must be 300 or greater');
    });

    it('should reject invalid debt-to-income ratio', () => {
      const invalidInputs = { ...validInputs, borrowerDebtToIncomeRatio: 150 };
      const result = validatePrivateMortgageInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.borrowerDebtToIncomeRatio).toBe('Debt-to-income ratio cannot exceed 100%');
    });

    it('should reject invalid employment type', () => {
      const invalidInputs = { ...validInputs, borrowerEmploymentType: 'invalid' as any };
      const result = validatePrivateMortgageInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.borrowerEmploymentType).toBe('Valid employment type is required');
    });

    it('should reject invalid tax rate', () => {
      const invalidInputs = { ...validInputs, borrowerTaxRate: 60 };
      const result = validatePrivateMortgageInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.borrowerTaxRate).toBe('Tax rate cannot exceed 50%');
    });

    it('should reject missing loan start date', () => {
      const invalidInputs = { ...validInputs, loanStartDate: '' };
      const result = validatePrivateMortgageInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.loanStartDate).toBe('Loan start date is required');
    });

    it('should reject invalid payments made', () => {
      const invalidInputs = { ...validInputs, paymentsMade: -5 };
      const result = validatePrivateMortgageInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.paymentsMade).toBe('Payments made must be 0 or greater');
    });

    it('should reject invalid current principal balance', () => {
      const invalidInputs = { ...validInputs, currentPrincipalBalance: 0 };
      const result = validatePrivateMortgageInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.currentPrincipalBalance).toBe('Current principal balance must be greater than 0');
    });

    it('should reject current principal balance exceeding loan amount', () => {
      const invalidInputs = { ...validInputs, currentPrincipalBalance: 350000 };
      const result = validatePrivateMortgageInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.currentPrincipalBalance).toBe('Current principal balance cannot exceed original loan amount');
    });

    it('should reject missing market location', () => {
      const invalidInputs = { ...validInputs, marketLocation: '' };
      const result = validatePrivateMortgageInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.marketLocation).toBe('Market location is required');
    });

    it('should reject invalid market condition', () => {
      const invalidInputs = { ...validInputs, marketCondition: 'invalid' as any };
      const result = validatePrivateMortgageInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.marketCondition).toBe('Valid market condition is required');
    });

    it('should reject invalid market growth rate', () => {
      const invalidInputs = { ...validInputs, marketGrowthRate: 150 };
      const result = validatePrivateMortgageInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.marketGrowthRate).toBe('Market growth rate cannot exceed 100%');
    });

    it('should reject invalid property appreciation rate', () => {
      const invalidInputs = { ...validInputs, propertyAppreciationRate: 150 };
      const result = validatePrivateMortgageInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertyAppreciationRate).toBe('Property appreciation rate cannot exceed 100%');
    });

    it('should reject invalid LTV threshold', () => {
      const invalidInputs = { ...validInputs, ltvThreshold: 0 };
      const result = validatePrivateMortgageInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.ltvThreshold).toBe('LTV threshold must be greater than 0');
    });

    it('should reject invalid payment history', () => {
      const invalidInputs = { ...validInputs, paymentHistory: 'invalid' as any };
      const result = validatePrivateMortgageInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.paymentHistory).toBe('Payment history must be an array');
    });

    it('should reject invalid analysis period', () => {
      const invalidInputs = { ...validInputs, analysisPeriod: 0 };
      const result = validatePrivateMortgageInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.analysisPeriod).toBe('Analysis period must be greater than 0');
    });

    it('should reject invalid inflation rate', () => {
      const invalidInputs = { ...validInputs, inflationRate: 150 };
      const result = validatePrivateMortgageInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.inflationRate).toBe('Inflation rate cannot exceed 100%');
    });

    it('should reject invalid discount rate', () => {
      const invalidInputs = { ...validInputs, discountRate: 1500 };
      const result = validatePrivateMortgageInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.discountRate).toBe('Discount rate cannot exceed 1000%');
    });

    it('should reject invalid currency', () => {
      const invalidInputs = { ...validInputs, currency: 'INVALID' as any };
      const result = validatePrivateMortgageInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.currency).toBe('Valid currency is required');
    });

    it('should reject invalid display format', () => {
      const invalidInputs = { ...validInputs, displayFormat: 'invalid' as any };
      const result = validatePrivateMortgageInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.displayFormat).toBe('Valid display format is required');
    });

    it('should reject invalid includeCharts type', () => {
      const invalidInputs = { ...validInputs, includeCharts: 'yes' as any };
      const result = validatePrivateMortgageInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.includeCharts).toBe('Include charts must be true or false');
    });
  });

  describe('validateField', () => {
    it('should validate loan amount correctly', () => {
      const result = validateField('loanAmount', 300000, validInputs);
      expect(result.isValid).toBe(true);
      
      const invalidResult = validateField('loanAmount', 0, validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Loan amount must be greater than 0');
    });

    it('should validate loan amount with cross-field validation', () => {
      const result = validateField('loanAmount', 400000, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Loan amount cannot exceed property value');
    });

    it('should validate interest rate correctly', () => {
      const result = validateField('interestRate', 4.5, validInputs);
      expect(result.isValid).toBe(true);
      
      const invalidResult = validateField('interestRate', 25, validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Interest rate cannot exceed 20%');
    });

    it('should validate loan type correctly', () => {
      const result = validateField('loanType', 'conventional', validInputs);
      expect(result.isValid).toBe(true);
      
      const invalidResult = validateField('loanType', 'invalid', validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Valid loan type is required');
    });

    it('should validate property value correctly', () => {
      const result = validateField('propertyValue', 375000, validInputs);
      expect(result.isValid).toBe(true);
      
      const invalidResult = validateField('propertyValue', 0, validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Property value must be greater than 0');
    });

    it('should validate property value with cross-field validation', () => {
      const result = validateField('propertyValue', 200000, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Property value cannot be less than loan amount');
    });

    it('should validate property address correctly', () => {
      const result = validateField('propertyAddress', '123 Main St', validInputs);
      expect(result.isValid).toBe(true);
      
      const invalidResult = validateField('propertyAddress', '', validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Property address is required');
    });

    it('should validate property type correctly', () => {
      const result = validateField('propertyType', 'single_family', validInputs);
      expect(result.isValid).toBe(true);
      
      const invalidResult = validateField('propertyType', 'invalid', validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Valid property type is required');
    });

    it('should validate property size with cross-field validation', () => {
      const result = validateField('propertySize', 2000, validInputs);
      expect(result.isValid).toBe(true);
      
      const invalidResult = validateField('propertySize', 15000, validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Property size seems unusually large for single family home');
    });

    it('should validate down payment correctly', () => {
      const result = validateField('downPayment', 75000, validInputs);
      expect(result.isValid).toBe(true);
      
      const invalidResult = validateField('downPayment', -1000, validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Down payment must be 0 or greater');
    });

    it('should validate down payment with cross-field validation', () => {
      const result = validateField('downPayment', 400000, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Down payment cannot exceed property value');
    });

    it('should validate down payment percentage with cross-field validation', () => {
      const result = validateField('downPaymentPercentage', 20, validInputs);
      expect(result.isValid).toBe(true);
      
      const invalidResult = validateField('downPaymentPercentage', 50, validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Down payment percentage should match down payment amount');
    });

    it('should validate PMI rate with cross-field validation', () => {
      const result = validateField('pmiRate', 0.5, validInputs);
      expect(result.isValid).toBe(true);
      
      const invalidResult = validateField('pmiRate', 2.0, validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('PMI rate seems unusually high for conventional loan');
    });

    it('should validate borrower credit score with cross-field validation', () => {
      const result = validateField('borrowerCreditScore', 720, validInputs);
      expect(result.isValid).toBe(true);
      
      const invalidResult = validateField('borrowerCreditScore', 600, validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Credit score seems low for conventional loan');
    });

    it('should validate debt-to-income ratio correctly', () => {
      const result = validateField('borrowerDebtToIncomeRatio', 35, validInputs);
      expect(result.isValid).toBe(true);
      
      const invalidResult = validateField('borrowerDebtToIncomeRatio', 60, validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Debt-to-income ratio seems unusually high');
    });

    it('should validate current principal balance with cross-field validation', () => {
      const result = validateField('currentPrincipalBalance', 295000, validInputs);
      expect(result.isValid).toBe(true);
      
      const invalidResult = validateField('currentPrincipalBalance', 350000, validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Current principal balance cannot exceed original loan amount');
    });

    it('should validate LTV threshold correctly', () => {
      const result = validateField('ltvThreshold', 80, validInputs);
      expect(result.isValid).toBe(true);
      
      const invalidResult = validateField('ltvThreshold', 60, validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('LTV threshold should typically be between 70% and 95%');
    });

    it('should validate analysis period with cross-field validation', () => {
      const result = validateField('analysisPeriod', 60, validInputs);
      expect(result.isValid).toBe(true);
      
      const invalidResult = validateField('analysisPeriod', 400, validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Analysis period should not exceed loan term');
    });

    it('should validate currency correctly', () => {
      const result = validateField('currency', 'USD', validInputs);
      expect(result.isValid).toBe(true);
      
      const invalidResult = validateField('currency', 'INVALID', validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Valid currency is required');
    });

    it('should validate display format correctly', () => {
      const result = validateField('displayFormat', 'currency', validInputs);
      expect(result.isValid).toBe(true);
      
      const invalidResult = validateField('displayFormat', 'invalid', validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Valid display format is required');
    });

    it('should validate includeCharts correctly', () => {
      const result = validateField('includeCharts', true, validInputs);
      expect(result.isValid).toBe(true);
      
      const invalidResult = validateField('includeCharts', 'yes' as any, validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Include charts must be true or false');
    });

    it('should handle unknown field gracefully', () => {
      const result = validateField('unknownField' as any, 'value', validInputs);
      expect(result.isValid).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero loan amount', () => {
      const inputs = { ...validInputs, loanAmount: 0 };
      const result = validatePrivateMortgageInsuranceInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.loanAmount).toBe('Loan amount must be greater than 0');
    });

    it('should handle very high interest rate', () => {
      const inputs = { ...validInputs, interestRate: 25 };
      const result = validatePrivateMortgageInsuranceInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.interestRate).toBe('Interest rate cannot exceed 20%');
    });

    it('should handle very long loan term', () => {
      const inputs = { ...validInputs, loanTerm: 60 };
      const result = validatePrivateMortgageInsuranceInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.loanTerm).toBe('Loan term cannot exceed 50 years');
    });

    it('should handle very large property size', () => {
      const inputs = { ...validInputs, propertySize: 200000 };
      const result = validatePrivateMortgageInsuranceInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertySize).toBe('Property size cannot exceed 100,000 sq ft');
    });

    it('should handle very old property', () => {
      const inputs = { ...validInputs, propertyAge: 250 };
      const result = validatePrivateMortgageInsuranceInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertyAge).toBe('Property age cannot exceed 200 years');
    });

    it('should handle very high PMI rate', () => {
      const inputs = { ...validInputs, pmiRate: 6 };
      const result = validatePrivateMortgageInsuranceInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.pmiRate).toBe('PMI rate cannot exceed 5%');
    });

    it('should handle very low credit score', () => {
      const inputs = { ...validInputs, borrowerCreditScore: 200 };
      const result = validatePrivateMortgageInsuranceInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.borrowerCreditScore).toBe('Credit score must be 300 or greater');
    });

    it('should handle very high debt-to-income ratio', () => {
      const inputs = { ...validInputs, borrowerDebtToIncomeRatio: 150 };
      const result = validatePrivateMortgageInsuranceInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.borrowerDebtToIncomeRatio).toBe('Debt-to-income ratio cannot exceed 100%');
    });

    it('should handle very high tax rate', () => {
      const inputs = { ...validInputs, borrowerTaxRate: 60 };
      const result = validatePrivateMortgageInsuranceInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.borrowerTaxRate).toBe('Tax rate cannot exceed 50%');
    });

    it('should handle very long analysis period', () => {
      const inputs = { ...validInputs, analysisPeriod: 500 };
      const result = validatePrivateMortgageInsuranceInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.analysisPeriod).toBe('Analysis period cannot exceed 360 months');
    });
  });

  describe('Business Logic', () => {
    it('should validate loan amount relative to property value', () => {
      const inputs = { ...validInputs, loanAmount: 400000 };
      const result = validatePrivateMortgageInsuranceInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.loanAmount).toBe('Loan amount cannot exceed property value');
    });

    it('should validate down payment consistency', () => {
      const inputs = { ...validInputs, downPayment: 50000, propertyValue: 375000, loanAmount: 300000 };
      const result = validatePrivateMortgageInsuranceInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.downPayment).toBe('Down payment should equal property value minus loan amount');
    });

    it('should validate down payment percentage consistency', () => {
      const inputs = { ...validInputs, downPayment: 75000, propertyValue: 375000, downPaymentPercentage: 30 };
      const result = validatePrivateMortgageInsuranceInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.downPaymentPercentage).toBe('Down payment percentage should match down payment amount');
    });

    it('should validate current principal balance limits', () => {
      const inputs = { ...validInputs, currentPrincipalBalance: 350000 };
      const result = validatePrivateMortgageInsuranceInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.currentPrincipalBalance).toBe('Current principal balance cannot exceed original loan amount');
    });

    it('should validate payments made consistency', () => {
      const inputs = { ...validInputs, paymentsMade: 15, monthsSinceLoanStart: 12 };
      const result = validatePrivateMortgageInsuranceInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.paymentsMade).toBe('Payments made cannot exceed months since loan start');
    });

    it('should validate PMI rate for loan type', () => {
      const inputs = { ...validInputs, loanType: 'conventional', pmiRate: 2.0 };
      const result = validatePrivateMortgageInsuranceInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.pmiRate).toBe('PMI rate seems unusually high for conventional loan');
    });

    it('should validate credit score for loan type', () => {
      const inputs = { ...validInputs, loanType: 'conventional', borrowerCreditScore: 600 };
      const result = validatePrivateMortgageInsuranceInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.borrowerCreditScore).toBe('Credit score seems low for conventional loan');
    });

    it('should validate property size for property type', () => {
      const inputs = { ...validInputs, propertyType: 'single_family', propertySize: 15000 };
      const result = validatePrivateMortgageInsuranceInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertySize).toBe('Property size seems unusually large for single family home');
    });

    it('should validate LTV threshold range', () => {
      const inputs = { ...validInputs, ltvThreshold: 60 };
      const result = validatePrivateMortgageInsuranceInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.ltvThreshold).toBe('LTV threshold should typically be between 70% and 95%');
    });

    it('should validate analysis period relative to loan term', () => {
      const inputs = { ...validInputs, analysisPeriod: 400, loanTerm: 30 };
      const result = validatePrivateMortgageInsuranceInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.analysisPeriod).toBe('Analysis period should not exceed loan term');
    });
  });

  describe('Analysis Generation', () => {
    it('should generate appropriate PMI rating for required PMI', () => {
      const result = calculatePrivateMortgageInsurance(validInputs);
      expect(['Required', 'Not Required', 'Eligible for Cancellation', 'Consider Refinance', 'Requires Review']).toContain(result.analysis.pmiRating);
    });

    it('should generate appropriate cost rating', () => {
      const result = calculatePrivateMortgageInsurance(validInputs);
      expect(['High Cost', 'Moderate Cost', 'Low Cost', 'No Cost']).toContain(result.analysis.costRating);
    });

    it('should generate recommendation', () => {
      const result = calculatePrivateMortgageInsurance(validInputs);
      expect(['Keep PMI', 'Cancel PMI', 'Refinance', 'Requires Review']).toContain(result.analysis.recommendation);
    });

    it('should generate key strengths and weaknesses', () => {
      const result = calculatePrivateMortgageInsurance(validInputs);
      expect(result.analysis.keyStrengths).toBeInstanceOf(Array);
      expect(result.analysis.keyWeaknesses).toBeInstanceOf(Array);
      expect(result.analysis.keyStrengths.length).toBeGreaterThan(0);
      expect(result.analysis.keyWeaknesses.length).toBeGreaterThan(0);
    });

    it('should generate cost factors', () => {
      const result = calculatePrivateMortgageInsurance(validInputs);
      expect(result.analysis.costFactors).toBeInstanceOf(Array);
      expect(result.analysis.costFactors.length).toBeGreaterThan(0);
    });

    it('should generate opportunities', () => {
      const result = calculatePrivateMortgageInsurance(validInputs);
      expect(result.analysis.opportunities).toBeInstanceOf(Array);
      expect(result.analysis.opportunities.length).toBeGreaterThan(0);
    });

    it('should generate PMI recommendations', () => {
      const result = calculatePrivateMortgageInsurance(validInputs);
      expect(result.analysis.pmiRecommendations).toBeInstanceOf(Array);
      expect(result.analysis.pmiRecommendations.length).toBeGreaterThan(0);
    });

    it('should generate cancellation recommendations', () => {
      const result = calculatePrivateMortgageInsurance(validInputs);
      expect(result.analysis.cancellationRecommendations).toBeInstanceOf(Array);
      expect(result.analysis.cancellationRecommendations.length).toBeGreaterThan(0);
    });

    it('should generate optimization suggestions', () => {
      const result = calculatePrivateMortgageInsurance(validInputs);
      expect(result.analysis.optimizationSuggestions).toBeInstanceOf(Array);
      expect(result.analysis.optimizationSuggestions.length).toBeGreaterThan(0);
    });

    it('should generate next steps', () => {
      const result = calculatePrivateMortgageInsurance(validInputs);
      expect(result.analysis.nextSteps).toBeInstanceOf(Array);
      expect(result.analysis.nextSteps.length).toBeGreaterThan(0);
    });

    it('should generate performance benchmarks', () => {
      const result = calculatePrivateMortgageInsurance(validInputs);
      expect(result.analysis.performanceBenchmarks).toBeInstanceOf(Array);
      expect(result.analysis.performanceBenchmarks.length).toBeGreaterThan(0);
      expect(result.analysis.performanceBenchmarks[0]).toHaveProperty('metric');
      expect(result.analysis.performanceBenchmarks[0]).toHaveProperty('target');
      expect(result.analysis.performanceBenchmarks[0]).toHaveProperty('benchmark');
      expect(result.analysis.performanceBenchmarks[0]).toHaveProperty('industry');
    });

    it('should generate presentation points', () => {
      const result = calculatePrivateMortgageInsurance(validInputs);
      expect(result.analysis.presentationPoints).toBeInstanceOf(Array);
      expect(result.analysis.presentationPoints.length).toBeGreaterThan(0);
    });

    it('should generate decision factors', () => {
      const result = calculatePrivateMortgageInsurance(validInputs);
      expect(result.analysis.decisionFactors).toBeInstanceOf(Array);
      expect(result.analysis.decisionFactors.length).toBeGreaterThan(0);
    });
  });
});