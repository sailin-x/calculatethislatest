import { describe, it, expect } from 'vitest';
import { HELOCCalculator } from './HELOCCalculator';
import { calculateHELOC } from './formulas';
import { validateHELOCInputs } from './validation';
import { validateAllHELOCInputs } from './quickValidation';

describe('HELOC Calculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(HELOCCalculator.id).toBe('heloc-calculator');
      expect(HELOCCalculator.name).toBe('HELOC (Home Equity Line of Credit) Calculator');
      expect(HELOCCalculator.category).toBe('finance');
      expect(HELOCCalculator.subcategory).toBe('investment');
    });

    it('should have required input fields', () => {
      const requiredInputs = [
        'homeValue', 'currentMortgageBalance', 'requestedCreditLimit', 'interestRate',
        'drawPeriod', 'repaymentPeriod', 'propertyType', 'occupancyType', 'propertyLocation',
        'marketType', 'purpose'
      ];
      
      requiredInputs.forEach(inputId => {
        const input = HELOCCalculator.inputs.find(i => i.id === inputId);
        expect(input).toBeDefined();
        expect(input?.required).toBe(true);
      });
    });

    it('should have correct output fields', () => {
      const expectedOutputs = [
        'availableEquity', 'maxCreditLimit', 'approvedCreditLimit', 'currentLTV',
        'proposedCLTV', 'monthlyInterestOnlyPayment', 'monthlyPIPayment', 'totalFees',
        'apr', 'effectiveRate', 'totalInterest', 'totalCost', 'debtServiceCoverage',
        'paymentToIncomeRatio', 'breakEvenMonths', 'taxBenefits', 'inflationHedgeScore',
        'liquidityScore', 'flexibilityScore', 'riskScore', 'feasibilityScore',
        'maxBorrowingAmount', 'recommendedCreditLimit', 'monthlyCashFlowImpact',
        'annualCashFlowImpact', 'equityUtilization', 'costOfBorrowing', 'investmentGrade',
        'recommendedAction', 'helocAnalysis'
      ];
      
      expectedOutputs.forEach(outputId => {
        const output = HELOCCalculator.outputs.find(o => o.id === outputId);
        expect(output).toBeDefined();
      });
    });
  });

  describe('Validation', () => {
    it('should validate required fields', () => {
      const result = validateHELOCInputs({});
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Home value is required');
      expect(result.errors).toContain('Current mortgage balance is required');
      expect(result.errors).toContain('Requested credit limit is required');
    });

    it('should validate numerical ranges', () => {
      const result = validateHELOCInputs({
        homeValue: 500000,
        currentMortgageBalance: 300000,
        requestedCreditLimit: 100000,
        interestRate: 5.5,
        drawPeriod: 10,
        repaymentPeriod: 20,
        propertyType: 'primary-residence',
        occupancyType: 'owner-occupied',
        propertyLocation: 'suburban',
        marketType: 'stable',
        purpose: 'home-improvement',
        homeValue: -1000
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Home value must be between $10,000 and $10,000,000');
    });

    it('should validate logical relationships', () => {
      const result = validateHELOCInputs({
        homeValue: 500000,
        currentMortgageBalance: 600000,
        requestedCreditLimit: 100000,
        interestRate: 5.5,
        drawPeriod: 10,
        repaymentPeriod: 20,
        propertyType: 'primary-residence',
        occupancyType: 'owner-occupied',
        propertyLocation: 'suburban',
        marketType: 'stable',
        purpose: 'home-improvement'
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Current mortgage balance cannot exceed home value');
    });

    it('should validate enum values', () => {
      const result = validateHELOCInputs({
        homeValue: 500000,
        currentMortgageBalance: 300000,
        requestedCreditLimit: 100000,
        interestRate: 5.5,
        drawPeriod: 10,
        repaymentPeriod: 20,
        propertyType: 'invalid-type',
        occupancyType: 'owner-occupied',
        propertyLocation: 'suburban',
        marketType: 'stable',
        purpose: 'home-improvement'
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid property type');
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate basic HELOC metrics correctly', () => {
      const inputs = {
        homeValue: 500000,
        currentMortgageBalance: 300000,
        requestedCreditLimit: 100000,
        interestRate: 5.5,
        drawPeriod: 10,
        repaymentPeriod: 20,
        propertyType: 'primary-residence',
        occupancyType: 'owner-occupied',
        propertyLocation: 'suburban',
        marketType: 'stable',
        purpose: 'home-improvement'
      };

      const outputs = calculateHELOC(inputs);

      expect(outputs.availableEquity).toBe(200000);
      expect(outputs.currentLTV).toBe(60);
      expect(outputs.proposedCLTV).toBe(80);
      expect(outputs.monthlyInterestOnlyPayment).toBeGreaterThan(0);
      expect(outputs.totalFees).toBeGreaterThan(0);
    });

    it('should calculate risk and feasibility scores', () => {
      const inputs = {
        homeValue: 500000,
        currentMortgageBalance: 300000,
        requestedCreditLimit: 100000,
        interestRate: 5.5,
        drawPeriod: 10,
        repaymentPeriod: 20,
        propertyType: 'primary-residence',
        occupancyType: 'owner-occupied',
        propertyLocation: 'suburban',
        marketType: 'stable',
        purpose: 'home-improvement',
        creditScore: 750,
        debtToIncomeRatio: 35,
        monthlyIncome: 8000
      };

      const outputs = calculateHELOC(inputs);

      expect(outputs.riskScore).toBeGreaterThan(0);
      expect(outputs.riskScore).toBeLessThanOrEqual(100);
      expect(outputs.feasibilityScore).toBeGreaterThan(0);
      expect(outputs.feasibilityScore).toBeLessThanOrEqual(100);
    });

    it('should handle edge cases', () => {
      const inputs = {
        homeValue: 10000000,
        currentMortgageBalance: 5000000,
        requestedCreditLimit: 1000000,
        interestRate: 1,
        drawPeriod: 1,
        repaymentPeriod: 1,
        propertyType: 'investment-property',
        occupancyType: 'non-owner-occupied',
        propertyLocation: 'urban',
        marketType: 'hot',
        purpose: 'investment'
      };

      const outputs = calculateHELOC(inputs);

      expect(outputs.availableEquity).toBe(5000000);
      expect(outputs.currentLTV).toBe(50);
      expect(outputs.proposedCLTV).toBe(60);
    });
  });

  describe('HELOC Analysis', () => {
    it('should generate comprehensive analysis', () => {
      const inputs = {
        homeValue: 500000,
        currentMortgageBalance: 300000,
        requestedCreditLimit: 100000,
        interestRate: 5.5,
        drawPeriod: 10,
        repaymentPeriod: 20,
        propertyType: 'primary-residence',
        occupancyType: 'owner-occupied',
        propertyLocation: 'suburban',
        marketType: 'stable',
        purpose: 'home-improvement'
      };

      const outputs = calculateHELOC(inputs);
      const analysis = HELOCCalculator.generateReport(inputs, outputs);

      expect(analysis).toContain('HELOC Analysis');
      expect(analysis).toContain('Available Equity');
      expect(analysis).toContain('Risk Assessment');
      expect(analysis).toContain('Recommendations');
    });
  });

  describe('Edge Cases', () => {
    it('should handle maximum values', () => {
      const inputs = {
        homeValue: 10000000,
        currentMortgageBalance: 5000000,
        requestedCreditLimit: 1000000,
        interestRate: 20,
        drawPeriod: 30,
        repaymentPeriod: 30,
        propertyType: 'investment-property',
        occupancyType: 'non-owner-occupied',
        propertyLocation: 'urban',
        marketType: 'hot',
        purpose: 'investment'
      };

      const outputs = calculateHELOC(inputs);
      expect(outputs.availableEquity).toBe(5000000);
      expect(outputs.riskScore).toBeGreaterThan(0);
    });

    it('should handle minimum values', () => {
      const inputs = {
        homeValue: 10000,
        currentMortgageBalance: 0,
        requestedCreditLimit: 1000,
        interestRate: 1,
        drawPeriod: 1,
        repaymentPeriod: 1,
        propertyType: 'primary-residence',
        occupancyType: 'owner-occupied',
        propertyLocation: 'rural',
        marketType: 'declining',
        purpose: 'emergency-fund'
      };

      const outputs = calculateHELOC(inputs);
      expect(outputs.availableEquity).toBe(10000);
      expect(outputs.currentLTV).toBe(0);
    });
  });

  describe('Quick Validation', () => {
    it('should validate individual fields', () => {
      const { validateHomeValue, validateInterestRate } = require('./quickValidation');
      
      expect(validateHomeValue(500000).isValid).toBe(true);
      expect(validateHomeValue(-1000).isValid).toBe(false);
      expect(validateInterestRate(5.5).isValid).toBe(true);
      expect(validateInterestRate(25).isValid).toBe(false);
    });

    it('should validate all inputs together', () => {
      const inputs = {
        homeValue: 500000,
        currentMortgageBalance: 300000,
        requestedCreditLimit: 100000,
        interestRate: 5.5,
        drawPeriod: 10,
        repaymentPeriod: 20,
        propertyType: 'primary-residence',
        occupancyType: 'owner-occupied',
        propertyLocation: 'suburban',
        marketType: 'stable',
        purpose: 'home-improvement'
      };

      const result = validateAllHELOCInputs(inputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should catch validation errors in quick validation', () => {
      const inputs = {
        homeValue: -1000,
        currentMortgageBalance: 300000,
        requestedCreditLimit: 100000,
        interestRate: 25,
        propertyType: 'invalid-type'
      };

      const result = validateAllHELOCInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });
});
