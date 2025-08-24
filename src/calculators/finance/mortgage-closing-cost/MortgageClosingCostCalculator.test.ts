import { describe, it, expect } from 'vitest';
import { calculateMortgageClosingCost, generateMortgageClosingCostAnalysis } from './formulas';
import { validateMortgageClosingCostInputs } from './validation';
import { validateLoanAmount, validateHomePrice, validateDownPayment, validateInterestRate, validateLoanTerm } from './quickValidation';

describe('Mortgage Closing Cost Calculator', () => {
  describe('Formulas', () => {
    it('should calculate basic closing costs correctly', () => {
      const inputs = {
        loanAmount: 300000,
        homePrice: 375000,
        downPayment: 75000,
        interestRate: 6.5,
        loanTerm: 30,
        originationFee: 1500,
        discountPoints: 0,
        appraisalFee: 500,
        creditReportFee: 50,
        floodCertificationFee: 20,
        taxServiceFee: 100,
        titleInsurance: 800,
        escrowFee: 400,
        recordingFee: 150,
        transferTax: 1875,
        homeownersInsurance: 1200,
        propertyTax: 3750,
        prepaidInterest: 1083.33,
        escrowReserves: 2475
      };

      const result = calculateMortgageClosingCost(inputs);
      
      expect(result).toBeDefined();
      expect(result.totalClosingCosts).toBeGreaterThan(0);
      expect(result.lenderFees).toBeGreaterThan(0);
      expect(result.thirdPartyFees).toBeGreaterThan(0);
      expect(result.prepaidItems).toBeGreaterThan(0);
      expect(result.escrowReserves).toBeGreaterThan(0);
    });

    it('should handle zero down payment scenarios', () => {
      const inputs = {
        loanAmount: 300000,
        homePrice: 300000,
        downPayment: 0,
        interestRate: 6.5,
        loanTerm: 30,
        originationFee: 1500,
        discountPoints: 0,
        appraisalFee: 500,
        creditReportFee: 50,
        floodCertificationFee: 20,
        taxServiceFee: 100,
        titleInsurance: 800,
        escrowFee: 400,
        recordingFee: 150,
        transferTax: 1500,
        homeownersInsurance: 1200,
        propertyTax: 3000,
        prepaidInterest: 1083.33,
        escrowReserves: 2100
      };

      const result = calculateMortgageClosingCost(inputs);
      
      expect(result).toBeDefined();
      expect(result.totalClosingCosts).toBeGreaterThan(0);
    });

    it('should calculate with discount points', () => {
      const inputs = {
        loanAmount: 300000,
        homePrice: 375000,
        downPayment: 75000,
        interestRate: 6.0,
        loanTerm: 30,
        originationFee: 1500,
        discountPoints: 2,
        appraisalFee: 500,
        creditReportFee: 50,
        floodCertificationFee: 20,
        taxServiceFee: 100,
        titleInsurance: 800,
        escrowFee: 400,
        recordingFee: 150,
        transferTax: 1875,
        homeownersInsurance: 1200,
        propertyTax: 3750,
        prepaidInterest: 1000,
        escrowReserves: 2475
      };

      const result = calculateMortgageClosingCost(inputs);
      
      expect(result).toBeDefined();
      expect(result.discountPointsCost).toBe(6000); // 2% of 300000
    });

    it('should generate analysis correctly', () => {
      const inputs = {
        loanAmount: 300000,
        homePrice: 375000,
        downPayment: 75000,
        interestRate: 6.5,
        loanTerm: 30,
        originationFee: 1500,
        discountPoints: 0,
        appraisalFee: 500,
        creditReportFee: 50,
        floodCertificationFee: 20,
        taxServiceFee: 100,
        titleInsurance: 800,
        escrowFee: 400,
        recordingFee: 150,
        transferTax: 1875,
        homeownersInsurance: 1200,
        propertyTax: 3750,
        prepaidInterest: 1083.33,
        escrowReserves: 2475
      };

      const analysis = generateMortgageClosingCostAnalysis(inputs);
      
      expect(analysis).toBeDefined();
      expect(analysis.summary).toBeDefined();
      expect(analysis.recommendations).toBeDefined();
      expect(analysis.breakdown).toBeDefined();
    });
  });

  describe('Validation', () => {
    it('should validate required inputs', () => {
      const inputs = {
        loanAmount: 300000,
        homePrice: 375000,
        downPayment: 75000,
        interestRate: 6.5,
        loanTerm: 30
      };

      const result = validateMortgageClosingCostInputs(inputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid loan amount', () => {
      const result = validateLoanAmount(-1000);
      expect(result.isValid).toBe(false);
    });

    it('should reject invalid home price', () => {
      const result = validateHomePrice(0);
      expect(result.isValid).toBe(false);
    });

    it('should reject invalid down payment', () => {
      const result = validateDownPayment(-5000);
      expect(result.isValid).toBe(false);
    });

    it('should reject invalid interest rate', () => {
      const result = validateInterestRate(25);
      expect(result.isValid).toBe(false);
    });

    it('should reject invalid loan term', () => {
      const result = validateLoanTerm(60);
      expect(result.isValid).toBe(false);
    });
  });

  describe('Edge Cases', () => {
    it('should handle minimum loan amounts', () => {
      const inputs = {
        loanAmount: 10000,
        homePrice: 12500,
        downPayment: 2500,
        interestRate: 6.5,
        loanTerm: 30,
        originationFee: 500,
        discountPoints: 0,
        appraisalFee: 300,
        creditReportFee: 30,
        floodCertificationFee: 15,
        taxServiceFee: 50,
        titleInsurance: 400,
        escrowFee: 200,
        recordingFee: 100,
        transferTax: 62.5,
        homeownersInsurance: 600,
        propertyTax: 125,
        prepaidInterest: 36.11,
        escrowReserves: 362.5
      };

      const result = calculateMortgageClosingCost(inputs);
      expect(result).toBeDefined();
    });

    it('should handle maximum loan amounts', () => {
      const inputs = {
        loanAmount: 10000000,
        homePrice: 12500000,
        downPayment: 2500000,
        interestRate: 6.5,
        loanTerm: 30,
        originationFee: 50000,
        discountPoints: 0,
        appraisalFee: 2000,
        creditReportFee: 100,
        floodCertificationFee: 50,
        taxServiceFee: 500,
        titleInsurance: 5000,
        escrowFee: 2000,
        recordingFee: 500,
        transferTax: 62500,
        homeownersInsurance: 5000,
        propertyTax: 125000,
        prepaidInterest: 3611.11,
        escrowReserves: 65000
      };

      const result = calculateMortgageClosingCost(inputs);
      expect(result).toBeDefined();
    });
  });
});