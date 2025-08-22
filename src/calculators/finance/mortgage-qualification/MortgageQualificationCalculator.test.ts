import { describe, it, expect } from 'vitest';
import { calculateMortgageQualification, generateMortgageQualificationAnalysis } from './formulas';
import { validateMortgageQualificationInputs } from './validation';
import { quickValidateMortgageQualification } from './quickValidation';
import { MortgageQualificationInputs } from './validation';

describe('Mortgage Qualification Calculator', () => {
  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const inputs: MortgageQualificationInputs = {
        annualIncome: 75000,
        downPayment: 50000,
        propertyPrice: 250000,
        interestRate: 4.5,
        loanTerm: 30,
        loanType: 'conventional',
        creditScore: 720,
        monthlyDebts: 500,
        propertyTax: 3000,
        homeInsurance: 1200,
        hoa: 0,
        pmi: 0,
        closingCosts: 5000,
        cashReserves: 15000,
        employmentType: 'full-time',
        employmentLength: 5,
        debtTypes: ['credit cards', 'car loan'],
        bankruptcyHistory: false,
        foreclosureHistory: false,
        includePropertyTax: true,
        includeHomeInsurance: true,
        includeHOA: false,
        includePMI: false,
        includeClosingCosts: false,
        qualificationMethod: 'standard'
      };

      const result = validateMortgageQualificationInputs(inputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject missing required fields', () => {
      const inputs = {
        annualIncome: 75000,
        downPayment: 50000
        // Missing other required fields
      };

      const result = validateMortgageQualificationInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should reject invalid credit score', () => {
      const inputs: Partial<MortgageQualificationInputs> = {
        annualIncome: 75000,
        downPayment: 50000,
        propertyPrice: 250000,
        interestRate: 4.5,
        loanTerm: 30,
        loanType: 'conventional',
        creditScore: 200, // Invalid
        monthlyDebts: 500,
        propertyTax: 3000,
        homeInsurance: 1200,
        hoa: 0,
        pmi: 0,
        closingCosts: 5000,
        cashReserves: 15000,
        employmentType: 'full-time',
        employmentLength: 5,
        debtTypes: ['credit cards'],
        bankruptcyHistory: false,
        foreclosureHistory: false,
        includePropertyTax: true,
        includeHomeInsurance: true,
        includeHOA: false,
        includePMI: false,
        includeClosingCosts: false,
        qualificationMethod: 'standard'
      };

      const result = validateMortgageQualificationInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Credit score must be between 300 and 850');
    });

    it('should reject down payment exceeding property price', () => {
      const inputs: Partial<MortgageQualificationInputs> = {
        annualIncome: 75000,
        downPayment: 300000, // Exceeds property price
        propertyPrice: 250000,
        interestRate: 4.5,
        loanTerm: 30,
        loanType: 'conventional',
        creditScore: 720,
        monthlyDebts: 500,
        propertyTax: 3000,
        homeInsurance: 1200,
        hoa: 0,
        pmi: 0,
        closingCosts: 5000,
        cashReserves: 15000,
        employmentType: 'full-time',
        employmentLength: 5,
        debtTypes: ['credit cards'],
        bankruptcyHistory: false,
        foreclosureHistory: false,
        includePropertyTax: true,
        includeHomeInsurance: true,
        includeHOA: false,
        includePMI: false,
        includeClosingCosts: false,
        qualificationMethod: 'standard'
      };

      const result = validateMortgageQualificationInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Down payment cannot exceed property price');
    });
  });

  describe('Quick Validation', () => {
    it('should pass quick validation with valid inputs', () => {
      const inputs: Partial<MortgageQualificationInputs> = {
        annualIncome: 75000,
        downPayment: 50000,
        propertyPrice: 250000,
        interestRate: 4.5,
        loanTerm: 30,
        loanType: 'conventional',
        creditScore: 720,
        monthlyDebts: 500,
        propertyTax: 3000,
        homeInsurance: 1200,
        hoa: 0,
        pmi: 0,
        closingCosts: 5000,
        cashReserves: 15000,
        employmentType: 'full-time',
        employmentLength: 5,
        debtTypes: ['credit cards'],
        bankruptcyHistory: false,
        foreclosureHistory: false,
        includePropertyTax: true,
        includeHomeInsurance: true,
        includeHOA: false,
        includePMI: false,
        includeClosingCosts: false,
        qualificationMethod: 'standard'
      };

      expect(quickValidateMortgageQualification(inputs)).toBe(true);
    });

    it('should fail quick validation with missing income', () => {
      const inputs: Partial<MortgageQualificationInputs> = {
        downPayment: 50000,
        propertyPrice: 250000,
        interestRate: 4.5,
        loanTerm: 30,
        loanType: 'conventional',
        creditScore: 720,
        monthlyDebts: 500,
        propertyTax: 3000,
        homeInsurance: 1200,
        hoa: 0,
        pmi: 0,
        closingCosts: 5000,
        cashReserves: 15000,
        employmentType: 'full-time',
        employmentLength: 5,
        debtTypes: ['credit cards'],
        bankruptcyHistory: false,
        foreclosureHistory: false,
        includePropertyTax: true,
        includeHomeInsurance: true,
        includeHOA: false,
        includePMI: false,
        includeClosingCosts: false,
        qualificationMethod: 'standard'
      };

      expect(quickValidateMortgageQualification(inputs)).toBe(false);
    });
  });

  describe('Calculations', () => {
    it('should calculate qualification for conventional loan', () => {
      const inputs: MortgageQualificationInputs = {
        annualIncome: 75000,
        downPayment: 50000,
        propertyPrice: 250000,
        interestRate: 4.5,
        loanTerm: 30,
        loanType: 'conventional',
        creditScore: 720,
        monthlyDebts: 500,
        propertyTax: 3000,
        homeInsurance: 1200,
        hoa: 0,
        pmi: 0,
        closingCosts: 5000,
        cashReserves: 15000,
        employmentType: 'full-time',
        employmentLength: 5,
        debtTypes: ['credit cards', 'car loan'],
        bankruptcyHistory: false,
        foreclosureHistory: false,
        includePropertyTax: true,
        includeHomeInsurance: true,
        includeHOA: false,
        includePMI: false,
        includeClosingCosts: false,
        qualificationMethod: 'standard'
      };

      const result = calculateMortgageQualification(inputs);
      
      expect(result.qualified).toBe(true);
      expect(result.frontEndRatio).toBeLessThan(0.28);
      expect(result.backEndRatio).toBeLessThan(0.36);
      expect(result.maxLoanAmount).toBeGreaterThan(200000);
      expect(result.maxHomePrice).toBeGreaterThan(250000);
      expect(result.riskLevel).toBe('low');
    });

    it('should calculate qualification for FHA loan', () => {
      const inputs: MortgageQualificationInputs = {
        annualIncome: 60000,
        downPayment: 8750, // 3.5% of 250000
        propertyPrice: 250000,
        interestRate: 4.0,
        loanTerm: 30,
        loanType: 'fha',
        creditScore: 650,
        monthlyDebts: 800,
        propertyTax: 3000,
        homeInsurance: 1200,
        hoa: 0,
        pmi: 100,
        closingCosts: 5000,
        cashReserves: 10000,
        employmentType: 'full-time',
        employmentLength: 3,
        debtTypes: ['student loans', 'credit cards'],
        bankruptcyHistory: false,
        foreclosureHistory: false,
        includePropertyTax: true,
        includeHomeInsurance: true,
        includeHOA: false,
        includePMI: true,
        includeClosingCosts: false,
        qualificationMethod: 'standard'
      };

      const result = calculateMortgageQualification(inputs);
      
      expect(result.frontEndRatio).toBeLessThan(0.31);
      expect(result.backEndRatio).toBeLessThan(0.43);
      expect(result.loanOptions.fha).toBe(true);
    });

    it('should handle high debt-to-income ratio', () => {
      const inputs: MortgageQualificationInputs = {
        annualIncome: 50000,
        downPayment: 25000,
        propertyPrice: 250000,
        interestRate: 5.0,
        loanTerm: 30,
        loanType: 'conventional',
        creditScore: 680,
        monthlyDebts: 1500, // High debt
        propertyTax: 3000,
        homeInsurance: 1200,
        hoa: 0,
        pmi: 0,
        closingCosts: 5000,
        cashReserves: 8000,
        employmentType: 'full-time',
        employmentLength: 2,
        debtTypes: ['student loans', 'car loan', 'credit cards'],
        bankruptcyHistory: false,
        foreclosureHistory: false,
        includePropertyTax: true,
        includeHomeInsurance: true,
        includeHOA: false,
        includePMI: false,
        includeClosingCosts: false,
        qualificationMethod: 'standard'
      };

      const result = calculateMortgageQualification(inputs);
      
      expect(result.backEndRatio).toBeGreaterThan(0.36);
      expect(result.qualified).toBe(false);
      expect(result.recommendations.length).toBeGreaterThan(0);
    });

    it('should handle co-borrower scenario', () => {
      const inputs: MortgageQualificationInputs = {
        annualIncome: 40000,
        downPayment: 40000,
        propertyPrice: 250000,
        interestRate: 4.5,
        loanTerm: 30,
        loanType: 'conventional',
        creditScore: 700,
        monthlyDebts: 300,
        propertyTax: 3000,
        homeInsurance: 1200,
        hoa: 0,
        pmi: 0,
        closingCosts: 5000,
        cashReserves: 12000,
        employmentType: 'full-time',
        employmentLength: 4,
        debtTypes: ['credit cards'],
        bankruptcyHistory: false,
        foreclosureHistory: false,
        coBorrowerIncome: 35000,
        coBorrowerDebts: 200,
        coBorrowerCreditScore: 720,
        includePropertyTax: true,
        includeHomeInsurance: true,
        includeHOA: false,
        includePMI: false,
        includeClosingCosts: false,
        qualificationMethod: 'standard'
      };

      const result = calculateMortgageQualification(inputs);
      
      expect(result.qualified).toBe(true);
      expect(result.maxLoanAmount).toBeGreaterThan(210000);
    });

    it('should handle custom qualification ratios', () => {
      const inputs: MortgageQualificationInputs = {
        annualIncome: 80000,
        downPayment: 60000,
        propertyPrice: 300000,
        interestRate: 4.0,
        loanTerm: 30,
        loanType: 'conventional',
        creditScore: 750,
        monthlyDebts: 600,
        propertyTax: 3600,
        homeInsurance: 1500,
        hoa: 0,
        pmi: 0,
        closingCosts: 6000,
        cashReserves: 20000,
        employmentType: 'full-time',
        employmentLength: 6,
        debtTypes: ['car loan'],
        bankruptcyHistory: false,
        foreclosureHistory: false,
        includePropertyTax: true,
        includeHomeInsurance: true,
        includeHOA: false,
        includePMI: false,
        includeClosingCosts: false,
        qualificationMethod: 'custom',
        customFrontEndRatio: 25,
        customBackEndRatio: 35
      };

      const result = calculateMortgageQualification(inputs);
      
      expect(result.frontEndRatio).toBeLessThan(0.25);
      expect(result.backEndRatio).toBeLessThan(0.35);
    });
  });

  describe('Risk Assessment', () => {
    it('should identify low risk borrower', () => {
      const inputs: MortgageQualificationInputs = {
        annualIncome: 100000,
        downPayment: 75000,
        propertyPrice: 300000,
        interestRate: 3.5,
        loanTerm: 30,
        loanType: 'conventional',
        creditScore: 780,
        monthlyDebts: 400,
        propertyTax: 3600,
        homeInsurance: 1500,
        hoa: 0,
        pmi: 0,
        closingCosts: 6000,
        cashReserves: 30000,
        employmentType: 'full-time',
        employmentLength: 8,
        debtTypes: ['car loan'],
        bankruptcyHistory: false,
        foreclosureHistory: false,
        includePropertyTax: true,
        includeHomeInsurance: true,
        includeHOA: false,
        includePMI: false,
        includeClosingCosts: false,
        qualificationMethod: 'standard'
      };

      const result = calculateMortgageQualification(inputs);
      expect(result.riskLevel).toBe('low');
    });

    it('should identify high risk borrower with poor credit', () => {
      const inputs: MortgageQualificationInputs = {
        annualIncome: 60000,
        downPayment: 15000,
        propertyPrice: 250000,
        interestRate: 6.0,
        loanTerm: 30,
        loanType: 'fha',
        creditScore: 580,
        monthlyDebts: 1000,
        propertyTax: 3000,
        homeInsurance: 1200,
        hoa: 0,
        pmi: 150,
        closingCosts: 5000,
        cashReserves: 5000,
        employmentType: 'full-time',
        employmentLength: 1,
        debtTypes: ['credit cards', 'student loans'],
        bankruptcyHistory: true,
        foreclosureHistory: false,
        includePropertyTax: true,
        includeHomeInsurance: true,
        includeHOA: false,
        includePMI: true,
        includeClosingCosts: false,
        qualificationMethod: 'standard'
      };

      const result = calculateMortgageQualification(inputs);
      expect(result.riskLevel).toBe('high');
      expect(result.qualificationAnalysis.riskFactors).toContain('Recent bankruptcy history');
    });
  });

  describe('Loan Options', () => {
    it('should identify available loan options', () => {
      const inputs: MortgageQualificationInputs = {
        annualIncome: 70000,
        downPayment: 50000,
        propertyPrice: 250000,
        interestRate: 4.5,
        loanTerm: 30,
        loanType: 'conventional',
        creditScore: 720,
        monthlyDebts: 500,
        propertyTax: 3000,
        homeInsurance: 1200,
        hoa: 0,
        pmi: 0,
        closingCosts: 5000,
        cashReserves: 15000,
        employmentType: 'full-time',
        employmentLength: 5,
        debtTypes: ['credit cards'],
        bankruptcyHistory: false,
        foreclosureHistory: false,
        includePropertyTax: true,
        includeHomeInsurance: true,
        includeHOA: false,
        includePMI: false,
        includeClosingCosts: false,
        qualificationMethod: 'standard'
      };

      const result = calculateMortgageQualification(inputs);
      
      expect(result.loanOptions.conventional).toBe(true);
      expect(result.loanOptions.fha).toBe(true);
    });

    it('should restrict loan options for poor credit', () => {
      const inputs: MortgageQualificationInputs = {
        annualIncome: 60000,
        downPayment: 8750,
        propertyPrice: 250000,
        interestRate: 5.0,
        loanTerm: 30,
        loanType: 'fha',
        creditScore: 550,
        monthlyDebts: 800,
        propertyTax: 3000,
        homeInsurance: 1200,
        hoa: 0,
        pmi: 100,
        closingCosts: 5000,
        cashReserves: 10000,
        employmentType: 'full-time',
        employmentLength: 3,
        debtTypes: ['student loans'],
        bankruptcyHistory: false,
        foreclosureHistory: false,
        includePropertyTax: true,
        includeHomeInsurance: true,
        includeHOA: false,
        includePMI: true,
        includeClosingCosts: false,
        qualificationMethod: 'standard'
      };

      const result = calculateMortgageQualification(inputs);
      
      expect(result.loanOptions.conventional).toBe(false);
      expect(result.loanOptions.fha).toBe(false);
    });
  });

  describe('Recommendations', () => {
    it('should provide recommendations for improvement', () => {
      const inputs: MortgageQualificationInputs = {
        annualIncome: 45000,
        downPayment: 10000,
        propertyPrice: 250000,
        interestRate: 5.5,
        loanTerm: 30,
        loanType: 'conventional',
        creditScore: 600,
        monthlyDebts: 1200,
        propertyTax: 3000,
        homeInsurance: 1200,
        hoa: 0,
        pmi: 200,
        closingCosts: 5000,
        cashReserves: 5000,
        employmentType: 'full-time',
        employmentLength: 2,
        debtTypes: ['student loans', 'credit cards', 'car loan'],
        bankruptcyHistory: false,
        foreclosureHistory: false,
        includePropertyTax: true,
        includeHomeInsurance: true,
        includeHOA: false,
        includePMI: true,
        includeClosingCosts: false,
        qualificationMethod: 'standard'
      };

      const result = calculateMortgageQualification(inputs);
      
      expect(result.recommendations.length).toBeGreaterThan(0);
      expect(result.recommendations.some(rec => rec.includes('credit score'))).toBe(true);
      expect(result.recommendations.some(rec => rec.includes('down payment'))).toBe(true);
    });
  });

  describe('Report Generation', () => {
    it('should generate comprehensive analysis report', () => {
      const inputs: MortgageQualificationInputs = {
        annualIncome: 75000,
        downPayment: 50000,
        propertyPrice: 250000,
        interestRate: 4.5,
        loanTerm: 30,
        loanType: 'conventional',
        creditScore: 720,
        monthlyDebts: 500,
        propertyTax: 3000,
        homeInsurance: 1200,
        hoa: 0,
        pmi: 0,
        closingCosts: 5000,
        cashReserves: 15000,
        employmentType: 'full-time',
        employmentLength: 5,
        debtTypes: ['credit cards', 'car loan'],
        bankruptcyHistory: false,
        foreclosureHistory: false,
        includePropertyTax: true,
        includeHomeInsurance: true,
        includeHOA: false,
        includePMI: false,
        includeClosingCosts: false,
        qualificationMethod: 'standard'
      };

      const result = calculateMortgageQualification(inputs);
      const analysis = generateMortgageQualificationAnalysis(inputs, result);
      
      expect(analysis).toContain('Mortgage Qualification Analysis');
      expect(analysis).toContain('Qualification Status');
      expect(analysis).toContain('Key Metrics');
      expect(analysis).toContain('Property Analysis');
      expect(analysis).toContain('Risk Assessment');
      expect(analysis).toContain('✅ QUALIFIED');
    });

    it('should generate analysis for non-qualified borrower', () => {
      const inputs: MortgageQualificationInputs = {
        annualIncome: 40000,
        downPayment: 10000,
        propertyPrice: 300000,
        interestRate: 6.0,
        loanTerm: 30,
        loanType: 'conventional',
        creditScore: 580,
        monthlyDebts: 1500,
        propertyTax: 3600,
        homeInsurance: 1500,
        hoa: 0,
        pmi: 300,
        closingCosts: 6000,
        cashReserves: 5000,
        employmentType: 'full-time',
        employmentLength: 1,
        debtTypes: ['student loans', 'credit cards'],
        bankruptcyHistory: true,
        foreclosureHistory: false,
        includePropertyTax: true,
        includeHomeInsurance: true,
        includeHOA: false,
        includePMI: true,
        includeClosingCosts: false,
        qualificationMethod: 'standard'
      };

      const result = calculateMortgageQualification(inputs);
      const analysis = generateMortgageQualificationAnalysis(inputs, result);
      
      expect(analysis).toContain('❌ NOT QUALIFIED');
      expect(analysis).toContain('Recommendations');
      expect(analysis).toContain('High Risk');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero down payment for VA loans', () => {
      const inputs: MortgageQualificationInputs = {
        annualIncome: 80000,
        downPayment: 0,
        propertyPrice: 300000,
        interestRate: 4.0,
        loanTerm: 30,
        loanType: 'va',
        creditScore: 700,
        monthlyDebts: 600,
        propertyTax: 3600,
        homeInsurance: 1500,
        hoa: 0,
        pmi: 0,
        closingCosts: 6000,
        cashReserves: 20000,
        employmentType: 'full-time',
        employmentLength: 5,
        debtTypes: ['car loan'],
        bankruptcyHistory: false,
        foreclosureHistory: false,
        includePropertyTax: true,
        includeHomeInsurance: true,
        includeHOA: false,
        includePMI: false,
        includeClosingCosts: false,
        qualificationMethod: 'standard'
      };

      const result = calculateMortgageQualification(inputs);
      expect(result.maxLoanAmount).toBe(300000);
    });

    it('should handle very high income scenario', () => {
      const inputs: MortgageQualificationInputs = {
        annualIncome: 200000,
        downPayment: 100000,
        propertyPrice: 500000,
        interestRate: 3.5,
        loanTerm: 30,
        loanType: 'conventional',
        creditScore: 800,
        monthlyDebts: 1000,
        propertyTax: 6000,
        homeInsurance: 2000,
        hoa: 0,
        pmi: 0,
        closingCosts: 10000,
        cashReserves: 50000,
        employmentType: 'full-time',
        employmentLength: 10,
        debtTypes: ['car loan'],
        bankruptcyHistory: false,
        foreclosureHistory: false,
        includePropertyTax: true,
        includeHomeInsurance: true,
        includeHOA: false,
        includePMI: false,
        includeClosingCosts: false,
        qualificationMethod: 'standard'
      };

      const result = calculateMortgageQualification(inputs);
      expect(result.qualified).toBe(true);
      expect(result.riskLevel).toBe('low');
      expect(result.frontEndRatio).toBeLessThan(0.15);
    });

    it('should handle monthly income input', () => {
      const inputs: MortgageQualificationInputs = {
        monthlyIncome: 6250, // 75000 / 12
        downPayment: 50000,
        propertyPrice: 250000,
        interestRate: 4.5,
        loanTerm: 30,
        loanType: 'conventional',
        creditScore: 720,
        monthlyDebts: 500,
        propertyTax: 3000,
        homeInsurance: 1200,
        hoa: 0,
        pmi: 0,
        closingCosts: 5000,
        cashReserves: 15000,
        employmentType: 'full-time',
        employmentLength: 5,
        debtTypes: ['credit cards'],
        bankruptcyHistory: false,
        foreclosureHistory: false,
        includePropertyTax: true,
        includeHomeInsurance: true,
        includeHOA: false,
        includePMI: false,
        includeClosingCosts: false,
        qualificationMethod: 'standard'
      };

      const result = calculateMortgageQualification(inputs);
      expect(result.qualified).toBe(true);
    });
  });
});