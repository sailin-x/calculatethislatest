import { describe, it, expect } from 'vitest';
import { CommercialRealEstateLoanAmortizationCalculator } from './CommercialRealEstateLoanAmortizationCalculator';
import { calculateAmortization } from './formulas';
import { validateAmortizationInputs } from './validation';
import { validateAllAmortizationInputs } from './quickValidation';

describe('Commercial Real Estate Loan Amortization Calculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(CommercialRealEstateLoanAmortizationCalculator.id).toBe('CommercialRealEstate-LoanAmortizationCalculator');
      expect(CommercialRealEstateLoanAmortizationCalculator.name).toBe('Commercial Real Estate Loan Amortization Calculator');
      expect(CommercialRealEstateLoanAmortizationCalculator.category).toBe('finance');
      expect(CommercialRealEstateLoanAmortizationCalculator.subcategory).toBe('business');
    });

    it('should have required input fields', () => {
      const requiredInputs = [
        'propertyType', 'loanAmount', 'interestRate', 'loanTerm', 'paymentFrequency',
        'startDate', 'balloonPayment', 'prepaymentPenalty', 'originationFee', 'closingCosts',
        'propertyValue', 'loanToValue', 'debtServiceCoverage', 'annualNOI', 'taxRate',
        'inflationRate', 'appreciationRate'
      ];

      const inputIds = CommercialRealEstateLoanAmortizationCalculator.inputs.map(input => input.id);
      requiredInputs.forEach(required => {
        expect(inputIds).toContain(required);
      });
    });

    it('should have required output fields', () => {
      const requiredOutputs = [
        'monthlyPayment', 'totalPayments', 'totalInterest', 'totalPrincipal',
        'amortizationSchedule', 'interestToPrincipalRatio', 'effectiveInterestRate',
        'debtServiceCoverageRatio', 'loanToValueRatio', 'breakEvenPoint',
        'prepaymentAnalysis', 'refinancingAnalysis', 'taxBenefits', 'totalCost',
        'monthlyBreakdown', 'loanSummary'
      ];

      const outputIds = CommercialRealEstateLoanAmortizationCalculator.outputs.map(output => output.id);
      requiredOutputs.forEach(required => {
        expect(outputIds).toContain(required);
      });
    });
  });

  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const validInputs = {
        propertyType: 'office',
        loanAmount: 2000000,
        interestRate: 6.5,
        loanTerm: 25,
        paymentFrequency: 'monthly',
        startDate: '20240101',
        balloonPayment: 0,
        prepaymentPenalty: 0,
        originationFee: 15000,
        closingCosts: 25000,
        propertyValue: 2500000,
        loanToValue: 80,
        debtServiceCoverage: 1.25,
        annualNOI: 200000,
        taxRate: 25.0,
        inflationRate: 2.5,
        appreciationRate: 3.0
      };

      const validation = validateAmortizationInputs(validInputs);
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should reject balloon payment exceeding loan amount', () => {
      const invalidInputs = {
        propertyType: 'office',
        loanAmount: 2000000,
        interestRate: 6.5,
        loanTerm: 25,
        paymentFrequency: 'monthly',
        startDate: '20240101',
        balloonPayment: 2500000, // Exceeds loan amount
        prepaymentPenalty: 0,
        originationFee: 15000,
        closingCosts: 25000,
        propertyValue: 2500000,
        loanToValue: 80,
        debtServiceCoverage: 1.25,
        annualNOI: 200000,
        taxRate: 25.0,
        inflationRate: 2.5,
        appreciationRate: 3.0
      };

      const validation = validateAmortizationInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Balloon payment cannot exceed loan amount');
    });

    it('should reject loan amount exceeding property value', () => {
      const invalidInputs = {
        propertyType: 'office',
        loanAmount: 3000000, // Exceeds property value
        interestRate: 6.5,
        loanTerm: 25,
        paymentFrequency: 'monthly',
        startDate: '20240101',
        balloonPayment: 0,
        prepaymentPenalty: 0,
        originationFee: 15000,
        closingCosts: 25000,
        propertyValue: 2500000,
        loanToValue: 80,
        debtServiceCoverage: 1.25,
        annualNOI: 200000,
        taxRate: 25.0,
        inflationRate: 2.5,
        appreciationRate: 3.0
      };

      const validation = validateAmortizationInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Loan amount cannot exceed property value');
    });

    it('should reject invalid property type', () => {
      const invalidInputs = {
        propertyType: 'invalid-type',
        loanAmount: 2000000,
        interestRate: 6.5,
        loanTerm: 25,
        paymentFrequency: 'monthly',
        startDate: '20240101',
        balloonPayment: 0,
        prepaymentPenalty: 0,
        originationFee: 15000,
        closingCosts: 25000,
        propertyValue: 2500000,
        loanToValue: 80,
        debtServiceCoverage: 1.25,
        annualNOI: 200000,
        taxRate: 25.0,
        inflationRate: 2.5,
        appreciationRate: 3.0
      };

      const validation = validateAmortizationInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Invalid property type selected');
    });

    it('should reject invalid payment frequency', () => {
      const invalidInputs = {
        propertyType: 'office',
        loanAmount: 2000000,
        interestRate: 6.5,
        loanTerm: 25,
        paymentFrequency: 'invalid-frequency',
        startDate: '20240101',
        balloonPayment: 0,
        prepaymentPenalty: 0,
        originationFee: 15000,
        closingCosts: 25000,
        propertyValue: 2500000,
        loanToValue: 80,
        debtServiceCoverage: 1.25,
        annualNOI: 200000,
        taxRate: 25.0,
        inflationRate: 2.5,
        appreciationRate: 3.0
      };

      const validation = validateAmortizationInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Invalid payment frequency selected');
    });

    it('should reject invalid start date format', () => {
      const invalidInputs = {
        propertyType: 'office',
        loanAmount: 2000000,
        interestRate: 6.5,
        loanTerm: 25,
        paymentFrequency: 'monthly',
        startDate: '01/01/2024', // Wrong format
        balloonPayment: 0,
        prepaymentPenalty: 0,
        originationFee: 15000,
        closingCosts: 25000,
        propertyValue: 2500000,
        loanToValue: 80,
        debtServiceCoverage: 1.25,
        annualNOI: 200000,
        taxRate: 25.0,
        inflationRate: 2.5,
        appreciationRate: 3.0
      };

      const validation = validateAmortizationInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Start date must be in YyyyMmDd format');
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate office building loan amortization correctly', () => {
      const inputs = {
        propertyType: 'office',
        loanAmount: 2000000,
        interestRate: 6.5,
        loanTerm: 25,
        paymentFrequency: 'monthly',
        startDate: '20240101',
        balloonPayment: 0,
        prepaymentPenalty: 0,
        originationFee: 15000,
        closingCosts: 25000,
        propertyValue: 2500000,
        loanToValue: 80,
        debtServiceCoverage: 1.25,
        annualNOI: 200000,
        taxRate: 25.0,
        inflationRate: 2.5,
        appreciationRate: 3.0
      };

      const outputs = calculateAmortization(inputs);

      expect(outputs.monthlyPayment).toBeGreaterThan(0);
      expect(outputs.totalPayments).toBeGreaterThan(0);
      expect(outputs.totalInterest).toBeGreaterThan(0);
      expect(outputs.totalPrincipal).toBeGreaterThan(0);
      expect(outputs.interestToPrincipalRatio).toBeGreaterThan(0);
      expect(outputs.effectiveInterestRate).toBeGreaterThan(0);
      expect(outputs.debtServiceCoverageRatio).toBeGreaterThan(0);
      expect(outputs.loanToValueRatio).toBeGreaterThan(0);
      expect(outputs.breakEvenPoint).toBeGreaterThan(0);
      expect(outputs.taxBenefits).toBeGreaterThan(0);
      expect(outputs.totalCost).toBeGreaterThan(0);
      expect(typeof outputs.amortizationSchedule).toBe('string');
      expect(typeof outputs.prepaymentAnalysis).toBe('string');
      expect(typeof outputs.refinancingAnalysis).toBe('string');
      expect(typeof outputs.monthlyBreakdown).toBe('string');
      expect(typeof outputs.loanSummary).toBe('string');
    });

    it('should calculate apartment building loan with balloon payment correctly', () => {
      const inputs = {
        propertyType: 'apartment',
        loanAmount: 2800000,
        interestRate: 5.75,
        loanTerm: 20,
        paymentFrequency: 'monthly',
        startDate: '20240101',
        balloonPayment: 1000000,
        prepaymentPenalty: 2.0,
        originationFee: 20000,
        closingCosts: 35000,
        propertyValue: 3500000,
        loanToValue: 80,
        debtServiceCoverage: 1.35,
        annualNOI: 280000,
        taxRate: 25.0,
        inflationRate: 2.5,
        appreciationRate: 3.5
      };

      const outputs = calculateAmortization(inputs);

      expect(outputs.monthlyPayment).toBeGreaterThan(0);
      expect(outputs.totalPayments).toBeGreaterThan(0);
      expect(outputs.totalInterest).toBeGreaterThan(0);
      expect(outputs.totalPrincipal).toBeGreaterThan(0);
      expect(outputs.interestToPrincipalRatio).toBeGreaterThan(0);
      expect(outputs.effectiveInterestRate).toBeGreaterThan(0);
      expect(outputs.debtServiceCoverageRatio).toBeGreaterThan(0);
      expect(outputs.loanToValueRatio).toBeGreaterThan(0);
      expect(outputs.breakEvenPoint).toBeGreaterThan(0);
      expect(outputs.taxBenefits).toBeGreaterThan(0);
      expect(outputs.totalCost).toBeGreaterThan(0);
    });

    it('should calculate monthly payment correctly', () => {
      const inputs = {
        propertyType: 'office',
        loanAmount: 2000000,
        interestRate: 6.5,
        loanTerm: 25,
        paymentFrequency: 'monthly',
        startDate: '20240101',
        balloonPayment: 0,
        prepaymentPenalty: 0,
        originationFee: 15000,
        closingCosts: 25000,
        propertyValue: 2500000,
        loanToValue: 80,
        debtServiceCoverage: 1.25,
        annualNOI: 200000,
        taxRate: 25.0,
        inflationRate: 2.5,
        appreciationRate: 3.0
      };

      const outputs = calculateAmortization(inputs);
      
      // Manual calculation verification
      const monthlyRate = 6.5 / 100 / 12;
      const numberOfPayments = 25 * 12;
      const expectedMonthlyPayment = 2000000 * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                                    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      
      expect(outputs.monthlyPayment).toBeCloseTo(expectedMonthlyPayment, -1);
    });

    it('should calculate total payments correctly', () => {
      const inputs = {
        propertyType: 'office',
        loanAmount: 2000000,
        interestRate: 6.5,
        loanTerm: 25,
        paymentFrequency: 'monthly',
        startDate: '20240101',
        balloonPayment: 0,
        prepaymentPenalty: 0,
        originationFee: 15000,
        closingCosts: 25000,
        propertyValue: 2500000,
        loanToValue: 80,
        debtServiceCoverage: 1.25,
        annualNOI: 200000,
        taxRate: 25.0,
        inflationRate: 2.5,
        appreciationRate: 3.0
      };

      const outputs = calculateAmortization(inputs);
      
      // Manual calculation verification
      const expectedTotalPayments = outputs.monthlyPayment * 25 * 12;
      
      expect(outputs.totalPayments).toBeCloseTo(expectedTotalPayments, -1);
    });

    it('should calculate total interest correctly', () => {
      const inputs = {
        propertyType: 'office',
        loanAmount: 2000000,
        interestRate: 6.5,
        loanTerm: 25,
        paymentFrequency: 'monthly',
        startDate: '20240101',
        balloonPayment: 0,
        prepaymentPenalty: 0,
        originationFee: 15000,
        closingCosts: 25000,
        propertyValue: 2500000,
        loanToValue: 80,
        debtServiceCoverage: 1.25,
        annualNOI: 200000,
        taxRate: 25.0,
        inflationRate: 2.5,
        appreciationRate: 3.0
      };

      const outputs = calculateAmortization(inputs);
      
      // Manual calculation verification
      const expectedTotalInterest = outputs.totalPayments - 2000000;
      
      expect(outputs.totalInterest).toBeCloseTo(expectedTotalInterest, -1);
    });

    it('should calculate total principal correctly', () => {
      const inputs = {
        propertyType: 'office',
        loanAmount: 2000000,
        interestRate: 6.5,
        loanTerm: 25,
        paymentFrequency: 'monthly',
        startDate: '20240101',
        balloonPayment: 0,
        prepaymentPenalty: 0,
        originationFee: 15000,
        closingCosts: 25000,
        propertyValue: 2500000,
        loanToValue: 80,
        debtServiceCoverage: 1.25,
        annualNOI: 200000,
        taxRate: 25.0,
        inflationRate: 2.5,
        appreciationRate: 3.0
      };

      const outputs = calculateAmortization(inputs);
      
      // Manual calculation verification
      const expectedTotalPrincipal = 2000000 - 0; // No balloon payment
      
      expect(outputs.totalPrincipal).toBe(expectedTotalPrincipal);
    });

    it('should calculate interest to principal ratio correctly', () => {
      const inputs = {
        propertyType: 'office',
        loanAmount: 2000000,
        interestRate: 6.5,
        loanTerm: 25,
        paymentFrequency: 'monthly',
        startDate: '20240101',
        balloonPayment: 0,
        prepaymentPenalty: 0,
        originationFee: 15000,
        closingCosts: 25000,
        propertyValue: 2500000,
        loanToValue: 80,
        debtServiceCoverage: 1.25,
        annualNOI: 200000,
        taxRate: 25.0,
        inflationRate: 2.5,
        appreciationRate: 3.0
      };

      const outputs = calculateAmortization(inputs);
      
      // Manual calculation verification
      const expectedRatio = outputs.totalInterest / outputs.totalPrincipal;
      
      expect(outputs.interestToPrincipalRatio).toBeCloseTo(expectedRatio, 3);
    });

    it('should calculate debt service coverage ratio correctly', () => {
      const inputs = {
        propertyType: 'office',
        loanAmount: 2000000,
        interestRate: 6.5,
        loanTerm: 25,
        paymentFrequency: 'monthly',
        startDate: '20240101',
        balloonPayment: 0,
        prepaymentPenalty: 0,
        originationFee: 15000,
        closingCosts: 25000,
        propertyValue: 2500000,
        loanToValue: 80,
        debtServiceCoverage: 1.25,
        annualNOI: 200000,
        taxRate: 25.0,
        inflationRate: 2.5,
        appreciationRate: 3.0
      };

      const outputs = calculateAmortization(inputs);
      
      // Manual calculation verification
      const annualDebtService = outputs.monthlyPayment * 12;
      const expectedDSCR = 200000 / annualDebtService;
      
      expect(outputs.debtServiceCoverageRatio).toBeCloseTo(expectedDSCR, 2);
    });

    it('should calculate LoanToValue ratio correctly', () => {
      const inputs = {
        propertyType: 'office',
        loanAmount: 2000000,
        interestRate: 6.5,
        loanTerm: 25,
        paymentFrequency: 'monthly',
        startDate: '20240101',
        balloonPayment: 0,
        prepaymentPenalty: 0,
        originationFee: 15000,
        closingCosts: 25000,
        propertyValue: 2500000,
        loanToValue: 80,
        debtServiceCoverage: 1.25,
        annualNOI: 200000,
        taxRate: 25.0,
        inflationRate: 2.5,
        appreciationRate: 3.0
      };

      const outputs = calculateAmortization(inputs);
      
      // Manual calculation verification
      const expectedLTV = (2000000 / 2500000) * 100;
      
      expect(outputs.loanToValueRatio).toBe(expectedLTV);
    });
  });

  describe('Loan Analysis', () => {
    it('should calculate effective interest rate correctly', () => {
      const inputs = {
        propertyType: 'office',
        loanAmount: 2000000,
        interestRate: 6.5,
        loanTerm: 25,
        paymentFrequency: 'monthly',
        startDate: '20240101',
        balloonPayment: 0,
        prepaymentPenalty: 0,
        originationFee: 15000,
        closingCosts: 25000,
        propertyValue: 2500000,
        loanToValue: 80,
        debtServiceCoverage: 1.25,
        annualNOI: 200000,
        taxRate: 25.0,
        inflationRate: 2.5,
        appreciationRate: 3.0
      };

      const outputs = calculateAmortization(inputs);
      
      expect(outputs.effectiveInterestRate).toBeGreaterThan(6.5); // Should be higher due to fees
    });

    it('should calculate break-even point correctly', () => {
      const inputs = {
        propertyType: 'office',
        loanAmount: 2000000,
        interestRate: 6.5,
        loanTerm: 25,
        paymentFrequency: 'monthly',
        startDate: '20240101',
        balloonPayment: 0,
        prepaymentPenalty: 0,
        originationFee: 15000,
        closingCosts: 25000,
        propertyValue: 2500000,
        loanToValue: 80,
        debtServiceCoverage: 1.25,
        annualNOI: 200000,
        taxRate: 25.0,
        inflationRate: 2.5,
        appreciationRate: 3.0
      };

      const outputs = calculateAmortization(inputs);
      
      expect(outputs.breakEvenPoint).toBeGreaterThan(0);
      expect(outputs.breakEvenPoint).toBeLessThan(25); // Should be less than loan term
    });

    it('should calculate tax benefits correctly', () => {
      const inputs = {
        propertyType: 'office',
        loanAmount: 2000000,
        interestRate: 6.5,
        loanTerm: 25,
        paymentFrequency: 'monthly',
        startDate: '20240101',
        balloonPayment: 0,
        prepaymentPenalty: 0,
        originationFee: 15000,
        closingCosts: 25000,
        propertyValue: 2500000,
        loanToValue: 80,
        debtServiceCoverage: 1.25,
        annualNOI: 200000,
        taxRate: 25.0,
        inflationRate: 2.5,
        appreciationRate: 3.0
      };

      const outputs = calculateAmortization(inputs);
      
      // Manual calculation verification
      const annualInterest = outputs.totalInterest / 25;
      const expectedTaxBenefits = annualInterest * 0.25;
      
      expect(outputs.taxBenefits).toBeCloseTo(expectedTaxBenefits, -1);
    });

    it('should calculate total cost correctly', () => {
      const inputs = {
        propertyType: 'office',
        loanAmount: 2000000,
        interestRate: 6.5,
        loanTerm: 25,
        paymentFrequency: 'monthly',
        startDate: '20240101',
        balloonPayment: 0,
        prepaymentPenalty: 0,
        originationFee: 15000,
        closingCosts: 25000,
        propertyValue: 2500000,
        loanToValue: 80,
        debtServiceCoverage: 1.25,
        annualNOI: 200000,
        taxRate: 25.0,
        inflationRate: 2.5,
        appreciationRate: 3.0
      };

      const outputs = calculateAmortization(inputs);
      
      // Manual calculation verification
      const expectedTotalCost = outputs.totalPayments + 15000 + 25000;
      
      expect(outputs.totalCost).toBe(expectedTotalCost);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero balloon payment', () => {
      const inputs = {
        propertyType: 'office',
        loanAmount: 2000000,
        interestRate: 6.5,
        loanTerm: 25,
        paymentFrequency: 'monthly',
        startDate: '20240101',
        balloonPayment: 0,
        prepaymentPenalty: 0,
        originationFee: 15000,
        closingCosts: 25000,
        propertyValue: 2500000,
        loanToValue: 80,
        debtServiceCoverage: 1.25,
        annualNOI: 200000,
        taxRate: 25.0,
        inflationRate: 2.5,
        appreciationRate: 3.0
      };

      const outputs = calculateAmortization(inputs);
      expect(outputs.totalPrincipal).toBe(2000000);
    });

    it('should handle zero prepayment penalty', () => {
      const inputs = {
        propertyType: 'office',
        loanAmount: 2000000,
        interestRate: 6.5,
        loanTerm: 25,
        paymentFrequency: 'monthly',
        startDate: '20240101',
        balloonPayment: 0,
        prepaymentPenalty: 0,
        originationFee: 15000,
        closingCosts: 25000,
        propertyValue: 2500000,
        loanToValue: 80,
        debtServiceCoverage: 1.25,
        annualNOI: 200000,
        taxRate: 25.0,
        inflationRate: 2.5,
        appreciationRate: 3.0
      };

      const outputs = calculateAmortization(inputs);
      expect(outputs.prepaymentAnalysis).toContain('No prepayment penalty');
    });

    it('should handle zero origination fee', () => {
      const inputs = {
        propertyType: 'office',
        loanAmount: 2000000,
        interestRate: 6.5,
        loanTerm: 25,
        paymentFrequency: 'monthly',
        startDate: '20240101',
        balloonPayment: 0,
        prepaymentPenalty: 0,
        originationFee: 0,
        closingCosts: 25000,
        propertyValue: 2500000,
        loanToValue: 80,
        debtServiceCoverage: 1.25,
        annualNOI: 200000,
        taxRate: 25.0,
        inflationRate: 2.5,
        appreciationRate: 3.0
      };

      const outputs = calculateAmortization(inputs);
      expect(outputs.totalCost).toBe(outputs.totalPayments + 25000);
    });

    it('should handle zero closing costs', () => {
      const inputs = {
        propertyType: 'office',
        loanAmount: 2000000,
        interestRate: 6.5,
        loanTerm: 25,
        paymentFrequency: 'monthly',
        startDate: '20240101',
        balloonPayment: 0,
        prepaymentPenalty: 0,
        originationFee: 15000,
        closingCosts: 0,
        propertyValue: 2500000,
        loanToValue: 80,
        debtServiceCoverage: 1.25,
        annualNOI: 200000,
        taxRate: 25.0,
        inflationRate: 2.5,
        appreciationRate: 3.0
      };

      const outputs = calculateAmortization(inputs);
      expect(outputs.totalCost).toBe(outputs.totalPayments + 15000);
    });
  });

  describe('Quick Validation', () => {
    it('should validate individual fields correctly', () => {
      const { validateLoanAmount, validateInterestRate } = require('./quickValidation');

      expect(validateLoanAmount(2000000).isValid).toBe(true);
      expect(validateLoanAmount(50000).isValid).toBe(false);
      expect(validateInterestRate(6.5).isValid).toBe(true);
      expect(validateInterestRate(25).isValid).toBe(false);
    });

    it('should validate all inputs comprehensively', () => {
      const validInputs = {
        propertyType: 'office',
        loanAmount: 2000000,
        interestRate: 6.5,
        loanTerm: 25,
        paymentFrequency: 'monthly',
        startDate: '20240101',
        balloonPayment: 0,
        prepaymentPenalty: 0,
        originationFee: 15000,
        closingCosts: 25000,
        propertyValue: 2500000,
        loanToValue: 80,
        debtServiceCoverage: 1.25,
        annualNOI: 200000,
        taxRate: 25.0,
        inflationRate: 2.5,
        appreciationRate: 3.0
      };

      const validation = validateAllAmortizationInputs(validInputs);
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });
  });
});
