import { describe, it, expect, beforeEach } from 'vitest';
import { calculateMortgageQualification } from './formulas';
import { validateMortgageQualificationInputs } from './validation';
import { validateField } from './quickValidation';
import { MortgageQualificationInputs } from './types';

describe('Mortgage Qualification Calculator', () => {
  let validInputs: MortgageQualificationInputs;

  beforeEach(() => {
    validInputs = {
      // Borrower Information
      borrowerIncome: 75000,
      coBorrowerIncome: 50000,
      borrowerCreditScore: 720,
      coBorrowerCreditScore: 680,
      borrowerEmploymentType: 'employed',
      coBorrowerEmploymentType: 'employed',
      borrowerEmploymentLength: 5,
      coBorrowerEmploymentLength: 3,

      // Income Details
      baseSalary: 70000,
      overtimeIncome: 5000,
      bonusIncome: 10000,
      commissionIncome: 0,
      rentalIncome: 0,
      investmentIncome: 2000,
      otherIncome: 0,

      // Assets and Liabilities
      borrowerAssets: 50000,
      coBorrowerAssets: 30000,
      borrowerLiquidity: 25000,
      coBorrowerLiquidity: 15000,
      borrowerDebts: 15000,
      coBorrowerDebts: 10000,

      // Property Information
      propertyValue: 300000,
      propertyAddress: '123 Main St, Anytown, USA',
      propertyType: 'single_family',
      propertySize: 2000,
      propertyAge: 15,

      // Loan Information
      loanAmount: 240000,
      interestRate: 4.5,
      loanTerm: 30,
      loanType: 'conventional',
      paymentType: 'principal_interest',

      // Down Payment Information
      downPayment: 60000,
      downPaymentPercentage: 20,
      downPaymentSource: 'savings',

      // Insurance and Taxes
      propertyInsurance: 1200,
      propertyTaxes: 3600,
      hoaFees: 0,
      floodInsurance: 0,
      mortgageInsurance: 0,
      mortgageInsuranceRate: 0,

      // Debt Information
      creditCardDebt: 5000,
      autoLoanDebt: 15000,
      studentLoanDebt: 25000,
      personalLoanDebt: 0,
      otherDebt: 0,

      // Loan Program Requirements
      maxDebtToIncomeRatio: 43,
      maxHousingExpenseRatio: 28,
      minCreditScore: 620,
      minDownPayment: 3.5,
      maxLoanAmount: 548250,

      // Market Information
      marketLocation: 'Suburban',
      marketCondition: 'stable',
      marketGrowthRate: 3,

      // Analysis Parameters
      analysisPeriod: 30,
      inflationRate: 2.5,
      propertyAppreciationRate: 3.5,
      discountRate: 5,

      // Reporting Preferences
      currency: 'USD',
      displayFormat: 'currency',
      includeCharts: true,
    };
  });

  describe('calculateMortgageQualification', () => {
    it('should calculate basic qualification metrics correctly', () => {
      const result = calculateMortgageQualification(validInputs);

      expect(result.qualificationScore).toBeGreaterThan(0);
      expect(result.qualificationScore).toBeLessThanOrEqual(100);
      expect(result.qualificationStatus).toBeDefined();
      expect(result.debtToIncomeRatio).toBeGreaterThan(0);
      expect(result.housingExpenseRatio).toBeGreaterThan(0);
      expect(result.averageCreditScore).toBeGreaterThanOrEqual(300);
      expect(result.averageCreditScore).toBeLessThanOrEqual(850);
      expect(result.maxAffordableLoan).toBeGreaterThan(0);
      expect(result.monthlyPayment).toBeGreaterThan(0);
      expect(result.probabilityOfApproval).toBeGreaterThanOrEqual(0);
      expect(result.probabilityOfApproval).toBeLessThanOrEqual(100);
    });

    it('should calculate income metrics correctly', () => {
      const result = calculateMortgageQualification(validInputs);

      expect(result.totalIncome).toBe(125000); // 75000 + 50000
      expect(result.qualifyingIncome).toBeGreaterThan(0);
      expect(result.incomeStabilityScore).toBeGreaterThan(0);
      expect(result.incomeStabilityScore).toBeLessThanOrEqual(100);
    });

    it('should calculate debt metrics correctly', () => {
      const result = calculateMortgageQualification(validInputs);

      expect(result.totalDebt).toBe(55000); // 15000 + 10000 + 5000 + 15000 + 25000
      expect(result.monthlyDebtPayments).toBeGreaterThan(0);
      expect(result.debtToIncomeRatio).toBeGreaterThan(0);
    });

    it('should calculate credit metrics correctly', () => {
      const result = calculateMortgageQualification(validInputs);

      expect(result.averageCreditScore).toBe(700); // (720 + 680) / 2
      expect(result.creditScoreRating).toBeDefined();
      expect(result.creditRiskScore).toBeGreaterThan(0);
      expect(result.creditRiskScore).toBeLessThanOrEqual(100);
    });

    it('should calculate property metrics correctly', () => {
      const result = calculateMortgageQualification(validInputs);

      expect(result.loanToValueRatio).toBe(80); // (240000 / 300000) * 100
      expect(result.propertyValueRating).toBeDefined();
      expect(result.propertyRiskScore).toBeGreaterThan(0);
      expect(result.propertyRiskScore).toBeLessThanOrEqual(100);
    });

    it('should generate analysis correctly', () => {
      const result = calculateMortgageQualification(validInputs);

      expect(result.analysis).toBeDefined();
      expect(result.analysis.qualificationRating).toBeDefined();
      expect(result.analysis.approvalRating).toBeDefined();
      expect(result.analysis.recommendation).toBeDefined();
      expect(result.analysis.strengths).toBeInstanceOf(Array);
      expect(result.analysis.weaknesses).toBeInstanceOf(Array);
      expect(result.analysis.improvements).toBeInstanceOf(Array);
    });

    it('should handle zero co-borrower income', () => {
      const inputs = { ...validInputs, coBorrowerIncome: 0 };
      const result = calculateMortgageQualification(inputs);

      expect(result.totalIncome).toBe(75000);
      expect(result.qualificationScore).toBeLessThan(result.qualificationScore);
    });

    it('should handle high debt-to-income ratio', () => {
      const inputs = { ...validInputs, borrowerDebts: 100000 };
      const result = calculateMortgageQualification(inputs);

      expect(result.debtToIncomeRatio).toBeGreaterThan(43);
      expect(result.qualificationScore).toBeLessThan(validInputs.borrowerDebts);
    });

    it('should handle low credit score', () => {
      const inputs = { ...validInputs, borrowerCreditScore: 580 };
      const result = calculateMortgageQualification(inputs);

      expect(result.averageCreditScore).toBeLessThan(700);
      expect(result.qualificationScore).toBeLessThan(validInputs.borrowerCreditScore);
    });
  });

  describe('validateMortgageQualificationInputs', () => {
    it('should validate correct inputs', () => {
      const result = validateMortgageQualificationInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toBeUndefined();
    });

    it('should reject negative borrower income', () => {
      const inputs = { ...validInputs, borrowerIncome: -1000 };
      const result = validateMortgageQualificationInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.borrowerIncome).toBeDefined();
    });

    it('should reject invalid credit score', () => {
      const inputs = { ...validInputs, borrowerCreditScore: 200 };
      const result = validateMortgageQualificationInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.borrowerCreditScore).toBeDefined();
    });

    it('should reject invalid employment type', () => {
      const inputs = { ...validInputs, borrowerEmploymentType: 'invalid' as any };
      const result = validateMortgageQualificationInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.borrowerEmploymentType).toBeDefined();
    });

    it('should reject loan amount exceeding property value', () => {
      const inputs = { ...validInputs, loanAmount: 400000 };
      const result = validateMortgageQualificationInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.loanAmount).toBeDefined();
    });

    it('should reject invalid property type', () => {
      const inputs = { ...validInputs, propertyType: 'invalid' as any };
      const result = validateMortgageQualificationInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertyType).toBeDefined();
    });

    it('should reject invalid loan type', () => {
      const inputs = { ...validInputs, loanType: 'invalid' as any };
      const result = validateMortgageQualificationInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.loanType).toBeDefined();
    });

    it('should reject down payment exceeding property value', () => {
      const inputs = { ...validInputs, downPayment: 400000 };
      const result = validateMortgageQualificationInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.downPayment).toBeDefined();
    });

    it('should reject invalid market condition', () => {
      const inputs = { ...validInputs, marketCondition: 'invalid' as any };
      const result = validateMortgageQualificationInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.marketCondition).toBeDefined();
    });

    it('should reject invalid currency', () => {
      const inputs = { ...validInputs, currency: 'INVALID' as any };
      const result = validateMortgageQualificationInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.currency).toBeDefined();
    });

    it('should validate business logic constraints', () => {
      // Test LTV ratio constraint
      const inputs = { ...validInputs, loanAmount: 350000, propertyValue: 300000 };
      const result = validateMortgageQualificationInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.loanAmount).toBeDefined();
    });
  });

  describe('validateField', () => {
    it('should validate borrower income correctly', () => {
      const result = validateField('borrowerIncome', 75000, validInputs);
      expect(result.isValid).toBe(true);

      const invalidResult = validateField('borrowerIncome', -1000, validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBeDefined();
    });

    it('should validate credit score with loan type requirements', () => {
      // Test jumbo loan requirement
      const jumboInputs = { ...validInputs, loanType: 'jumbo' };
      const result = validateField('borrowerCreditScore', 650, jumboInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('700 or higher');

      // Test FHA loan requirement
      const fhaInputs = { ...validInputs, loanType: 'fha' };
      const fhaResult = validateField('borrowerCreditScore', 550, fhaInputs);
      expect(fhaResult.isValid).toBe(false);
      expect(fhaResult.error).toContain('580 or higher');
    });

    it('should validate loan amount with property value constraint', () => {
      const result = validateField('loanAmount', 400000, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('cannot exceed property value');
    });

    it('should validate down payment consistency', () => {
      const inputs = { ...validInputs, downPayment: 50000, downPaymentPercentage: 25 };
      const result = validateField('downPayment', 50000, inputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('consistent');
    });

    it('should validate liquidity against assets', () => {
      const result = validateField('borrowerLiquidity', 60000, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('cannot exceed total assets');
    });

    it('should validate property address', () => {
      const result = validateField('propertyAddress', '', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();

      const validResult = validateField('propertyAddress', '123 Main St', validInputs);
      expect(validResult.isValid).toBe(true);
    });

    it('should validate employment type', () => {
      const result = validateField('borrowerEmploymentType', 'invalid', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();

      const validResult = validateField('borrowerEmploymentType', 'employed', validInputs);
      expect(validResult.isValid).toBe(true);
    });

    it('should validate interest rate range', () => {
      const result = validateField('interestRate', 30, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('cannot exceed 25%');

      const validResult = validateField('interestRate', 4.5, validInputs);
      expect(validResult.isValid).toBe(true);
    });

    it('should validate loan term range', () => {
      const result = validateField('loanTerm', 60, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('cannot exceed 50 years');

      const validResult = validateField('loanTerm', 30, validInputs);
      expect(validResult.isValid).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero values appropriately', () => {
      const inputs = {
        ...validInputs,
        coBorrowerIncome: 0,
        coBorrowerCreditScore: 0,
        coBorrowerAssets: 0,
        coBorrowerDebts: 0,
        overtimeIncome: 0,
        bonusIncome: 0,
        commissionIncome: 0,
        rentalIncome: 0,
        investmentIncome: 0,
        otherIncome: 0,
      };

      const result = calculateMortgageQualification(inputs);
      expect(result.totalIncome).toBe(75000);
      expect(result.averageCreditScore).toBe(720);
    });

    it('should handle maximum values', () => {
      const inputs = {
        ...validInputs,
        borrowerIncome: 10000000,
        propertyValue: 50000000,
        loanAmount: 10000000,
      };

      const result = calculateMortgageQualification(inputs);
      expect(result.qualificationScore).toBeDefined();
    });

    it('should handle minimum down payment scenarios', () => {
      const inputs = {
        ...validInputs,
        downPayment: 10500, // 3.5% of 300000
        downPaymentPercentage: 3.5,
        loanAmount: 289500,
      };

      const result = calculateMortgageQualification(inputs);
      expect(result.loanToValueRatio).toBe(96.5);
    });
  });

  describe('Business Logic', () => {
    it('should correctly calculate DTI ratio', () => {
      const result = calculateMortgageQualification(validInputs);
      const expectedDTI = (result.monthlyDebtPayments / (result.totalIncome / 12)) * 100;
      expect(result.debtToIncomeRatio).toBeCloseTo(expectedDTI, 1);
    });

    it('should correctly calculate housing expense ratio', () => {
      const result = calculateMortgageQualification(validInputs);
      const expectedHousingRatio = (result.monthlyPayment / (result.totalIncome / 12)) * 100;
      expect(result.housingExpenseRatio).toBeCloseTo(expectedHousingRatio, 1);
    });

    it('should handle FHA loan requirements', () => {
      const fhaInputs = {
        ...validInputs,
        loanType: 'fha',
        downPayment: 10500, // 3.5%
        downPaymentPercentage: 3.5,
        minDownPayment: 3.5,
      };

      const result = calculateMortgageQualification(fhaInputs);
      expect(result.loanToValueRatio).toBe(96.5);
    });

    it('should handle VA loan requirements', () => {
      const vaInputs = {
        ...validInputs,
        loanType: 'va',
        downPayment: 0,
        downPaymentPercentage: 0,
        minDownPayment: 0,
      };

      const result = calculateMortgageQualification(vaInputs);
      expect(result.loanToValueRatio).toBe(100);
    });

    it('should handle jumbo loan requirements', () => {
      const jumboInputs = {
        ...validInputs,
        loanType: 'jumbo',
        loanAmount: 600000,
        propertyValue: 750000,
        borrowerCreditScore: 750,
      };

      const result = calculateMortgageQualification(jumboInputs);
      expect(result.loanToValueRatio).toBe(80);
    });
  });
});