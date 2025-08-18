import { describe, it, expect, beforeEach } from 'vitest';
import { CashOutRefinanceCalculator } from './CashOutRefinanceCalculator';
import { calculateCashOutRefinance, generateRefinanceAnalysis } from './formulas';
import { validateCashOutRefinanceInputs } from './validation';

describe('Cash-Out Refinance Calculator', () => {
  let validInputs: Record<string, any>;

  beforeEach(() => {
    validInputs = {
      currentHomeValue: 450000,
      currentLoanBalance: 280000,
      currentInterestRate: 4.25,
      currentMonthlyPayment: 1375,
      currentLoanTerm: 22,
      newLoanAmount: 360000,
      newInterestRate: 5.5,
      newLoanTerm: 30,
      closingCosts: 8000,
      cashOutAmount: 80000,
      propertyTax: 5400,
      insurance: 1800,
      pmi: 0,
      hoaFees: 0,
      investmentReturn: 7.0,
      taxRate: 22.0
    };
  });

  describe('Calculator Definition', () => {
    it('should have correct basic properties', () => {
      expect(CashOutRefinanceCalculator.id).toBe('cash-out-refinance-calculator');
      expect(CashOutRefinanceCalculator.name).toBe('Cash-Out Refinance Calculator');
      expect(CashOutRefinanceCalculator.category).toBe('finance');
      expect(CashOutRefinanceCalculator.subcategory).toBe('mortgage');
    });

    it('should have all required inputs', () => {
      const inputIds = CashOutRefinanceCalculator.inputs.map(input => input.id);
      const requiredInputs = [
        'currentHomeValue', 'currentLoanBalance', 'currentInterestRate', 'currentMonthlyPayment',
        'currentLoanTerm', 'newLoanAmount', 'newInterestRate', 'newLoanTerm', 'closingCosts',
        'cashOutAmount', 'propertyTax', 'insurance', 'pmi', 'hoaFees', 'investmentReturn', 'taxRate'
      ];
      
      requiredInputs.forEach(inputId => {
        expect(inputIds).toContain(inputId);
      });
    });

    it('should have all required outputs', () => {
      const outputIds = CashOutRefinanceCalculator.outputs.map(output => output.id);
      const requiredOutputs = [
        'currentEquity', 'newMonthlyPayment', 'paymentDifference', 'netCashReceived',
        'newLoanToValue', 'totalInterestPaid', 'breakEvenMonths', 'monthlySavings',
        'annualSavings', 'investmentOpportunity', 'afterTaxCost', 'refinanceGrade',
        'riskAssessment', 'recommendations'
      ];
      
      requiredOutputs.forEach(outputId => {
        expect(outputIds).toContain(outputId);
      });
    });

    it('should have comprehensive examples', () => {
      expect(CashOutRefinanceCalculator.examples.length).toBeGreaterThan(0);
      CashOutRefinanceCalculator.examples.forEach(example => {
        expect(example.name).toBeDefined();
        expect(example.description).toBeDefined();
        expect(example.inputs).toBeDefined();
        expect(example.expectedOutputs).toBeDefined();
      });
    });
  });

  describe('Input Validation', () => {
    it('should validate required fields', () => {
      const incompleteInputs = { currentHomeValue: 450000 };
      const result = validateCashOutRefinanceInputs(incompleteInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should validate current home value range', () => {
      const lowValueInputs = { ...validInputs, currentHomeValue: 25000 };
      const result = validateCashOutRefinanceInputs(lowValueInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('home value'))).toBe(true);
    });

    it('should validate current loan balance range', () => {
      const lowBalanceInputs = { ...validInputs, currentLoanBalance: 500 };
      const result = validateCashOutRefinanceInputs(lowBalanceInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('loan balance'))).toBe(true);
    });

    it('should validate interest rate range', () => {
      const highRateInputs = { ...validInputs, newInterestRate: 20 };
      const result = validateCashOutRefinanceInputs(highRateInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('interest rate'))).toBe(true);
    });

    it('should validate loan-to-value ratio', () => {
      const highLTVInputs = { ...validInputs, newLoanAmount: 450000 };
      const result = validateCashOutRefinanceInputs(highLTVInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('loan-to-value'))).toBe(true);
    });

    it('should validate current equity', () => {
      const negativeEquityInputs = { ...validInputs, currentLoanBalance: 500000 };
      const result = validateCashOutRefinanceInputs(negativeEquityInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('equity'))).toBe(true);
    });

    it('should provide warnings for business rule violations', () => {
      const highClosingCostsInputs = { ...validInputs, closingCosts: 20000 };
      const result = validateCashOutRefinanceInputs(highClosingCostsInputs);
      expect(result.warnings.length).toBeGreaterThan(0);
    });

    it('should accept valid inputs', () => {
      const result = validateCashOutRefinanceInputs(validInputs);
      expect(result.isValid).toBe(true);
    });
  });

  describe('Formula Calculations', () => {
    it('should calculate cash-out refinance metrics correctly', () => {
      const metrics = calculateCashOutRefinance(validInputs);
      
      expect(metrics.currentEquity).toBeGreaterThan(0);
      expect(metrics.newMonthlyPayment).toBeGreaterThan(0);
      expect(metrics.paymentDifference).toBeDefined();
      expect(metrics.netCashReceived).toBeDefined();
      expect(metrics.newLoanToValue).toBeGreaterThan(0);
      expect(metrics.totalInterestPaid).toBeGreaterThan(0);
      expect(metrics.breakEvenMonths).toBeGreaterThanOrEqual(0);
      expect(metrics.monthlySavings).toBeGreaterThanOrEqual(0);
      expect(metrics.annualSavings).toBeGreaterThanOrEqual(0);
      expect(metrics.investmentOpportunity).toBeGreaterThanOrEqual(0);
      expect(metrics.afterTaxCost).toBeGreaterThan(0);
    });

    it('should calculate current equity correctly', () => {
      const metrics = calculateCashOutRefinance(validInputs);
      
      const expectedEquity = validInputs.currentHomeValue - validInputs.currentLoanBalance;
      expect(metrics.currentEquity).toBe(expectedEquity);
    });

    it('should calculate new loan-to-value correctly', () => {
      const metrics = calculateCashOutRefinance(validInputs);
      
      const expectedLTV = (validInputs.newLoanAmount / validInputs.currentHomeValue) * 100;
      expect(Math.abs(metrics.newLoanToValue - expectedLTV)).toBeLessThan(0.01);
    });

    it('should calculate net cash received correctly', () => {
      const metrics = calculateCashOutRefinance(validInputs);
      
      const expectedNetCash = validInputs.cashOutAmount - validInputs.closingCosts;
      expect(metrics.netCashReceived).toBe(expectedNetCash);
    });

    it('should calculate break-even months correctly', () => {
      const metrics = calculateCashOutRefinance(validInputs);
      
      if (metrics.monthlySavings > 0) {
        const expectedBreakEven = validInputs.closingCosts / metrics.monthlySavings;
        expect(Math.abs(metrics.breakEvenMonths - expectedBreakEven)).toBeLessThan(0.01);
      } else {
        expect(metrics.breakEvenMonths).toBe(0);
      }
    });

    it('should handle rate reduction scenarios correctly', () => {
      const rateReductionInputs = { ...validInputs, newInterestRate: 3.5, newLoanAmount: 300000 };
      const rateReductionResult = calculateCashOutRefinance(rateReductionInputs);
      
      // Should have monthly savings with lower rate
      expect(rateReductionResult.monthlySavings).toBeGreaterThan(0);
    });

    it('should handle payment increase scenarios correctly', () => {
      const paymentIncreaseInputs = { ...validInputs, newInterestRate: 6.5 };
      const paymentIncreaseResult = calculateCashOutRefinance(paymentIncreaseInputs);
      
      // Should have payment increase with higher rate
      expect(paymentIncreaseResult.paymentDifference).toBeGreaterThan(0);
    });

    it('should handle different loan terms correctly', () => {
      const shortTermInputs = { ...validInputs, newLoanTerm: 15 };
      const longTermInputs = { ...validInputs, newLoanTerm: 30 };
      
      const shortTermResult = calculateCashOutRefinance(shortTermInputs);
      const longTermResult = calculateCashOutRefinance(longTermInputs);
      
      // Shorter term should have higher payment
      expect(shortTermResult.newMonthlyPayment).toBeGreaterThan(longTermResult.newMonthlyPayment);
    });
  });

  describe('Refinance Analysis', () => {
    it('should generate refinance analysis', () => {
      const refinanceMetrics = calculateCashOutRefinance(validInputs);
      const analysis = generateRefinanceAnalysis(validInputs, refinanceMetrics);
      
      expect(analysis.refinanceGrade).toBeDefined();
      expect(analysis.riskAssessment).toBeDefined();
      expect(analysis.recommendations).toBeDefined();
    });

    it('should provide meaningful refinance grade', () => {
      const refinanceMetrics = calculateCashOutRefinance(validInputs);
      const analysis = generateRefinanceAnalysis(validInputs, refinanceMetrics);
      
      expect(analysis.refinanceGrade).toMatch(/[A-C][+-]?/);
      expect(analysis.refinanceGrade.length).toBeGreaterThan(20);
    });

    it('should provide risk assessment', () => {
      const refinanceMetrics = calculateCashOutRefinance(validInputs);
      const analysis = generateRefinanceAnalysis(validInputs, refinanceMetrics);
      
      expect(analysis.riskAssessment).toContain('Risk Assessment');
      expect(analysis.riskAssessment.length).toBeGreaterThan(50);
    });

    it('should provide recommendations', () => {
      const refinanceMetrics = calculateCashOutRefinance(validInputs);
      const analysis = generateRefinanceAnalysis(validInputs, refinanceMetrics);
      
      expect(analysis.recommendations).toContain('Recommendations');
      expect(analysis.recommendations.length).toBeGreaterThan(50);
    });
  });

  describe('Main Calculator Function', () => {
    it('should calculate all outputs correctly', () => {
      const result = CashOutRefinanceCalculator.calculate(validInputs);
      
      expect(result.currentEquity).toBeGreaterThan(0);
      expect(result.newMonthlyPayment).toBeGreaterThan(0);
      expect(result.paymentDifference).toBeDefined();
      expect(result.netCashReceived).toBeDefined();
      expect(result.newLoanToValue).toBeGreaterThan(0);
      expect(result.totalInterestPaid).toBeGreaterThan(0);
      expect(result.breakEvenMonths).toBeGreaterThanOrEqual(0);
      expect(result.monthlySavings).toBeGreaterThanOrEqual(0);
      expect(result.annualSavings).toBeGreaterThanOrEqual(0);
      expect(result.investmentOpportunity).toBeGreaterThanOrEqual(0);
      expect(result.afterTaxCost).toBeGreaterThan(0);
      expect(result.refinanceGrade).toBeDefined();
      expect(result.riskAssessment).toBeDefined();
      expect(result.recommendations).toBeDefined();
    });

    it('should throw error for invalid inputs', () => {
      const invalidInputs = { ...validInputs, currentHomeValue: -1000 };
      
      expect(() => {
        CashOutRefinanceCalculator.calculate(invalidInputs);
      }).toThrow();
    });

    it('should handle edge cases gracefully', () => {
      const edgeCaseInputs = { ...validInputs, cashOutAmount: 0, closingCosts: 0 };
      const result = CashOutRefinanceCalculator.calculate(edgeCaseInputs);
      
      expect(result.netCashReceived).toBeDefined();
      expect(result.newLoanToValue).toBeDefined();
    });

    it('should match example calculations within tolerance', () => {
      const example = CashOutRefinanceCalculator.examples[0];
      const result = CashOutRefinanceCalculator.calculate(example.inputs);
      
      const equityAccuracy = Math.abs((result.currentEquity - example.expectedOutputs.currentEquity) / example.expectedOutputs.currentEquity) * 100;
      const paymentAccuracy = Math.abs((result.newMonthlyPayment - example.expectedOutputs.newMonthlyPayment) / example.expectedOutputs.newMonthlyPayment) * 100;
      
      expect(equityAccuracy).toBeLessThan(20);
      expect(paymentAccuracy).toBeLessThan(20);
    });
  });

  describe('Performance', () => {
    it('should complete calculations quickly', () => {
      const startTime = performance.now();
      
      for (let i = 0; i < 100; i++) {
        CashOutRefinanceCalculator.calculate(validInputs);
      }
      
      const endTime = performance.now();
      const avgTime = (endTime - startTime) / 100;
      
      expect(avgTime).toBeLessThan(10); // Should complete in less than 10ms per calculation
    });
  });

  describe('Business Logic', () => {
    it('should show realistic refinance values', () => {
      const result = CashOutRefinanceCalculator.calculate(validInputs);
      
      // Current equity should be reasonable
      expect(result.currentEquity).toBeGreaterThan(0);
      expect(result.currentEquity).toBeLessThan(validInputs.currentHomeValue);
    });

    it('should handle positive and negative payment differences', () => {
      const rateReductionInputs = { ...validInputs, newInterestRate: 3.5, newLoanAmount: 300000 };
      const rateIncreaseInputs = { ...validInputs, newInterestRate: 6.5 };
      
      const reductionResult = CashOutRefinanceCalculator.calculate(rateReductionInputs);
      const increaseResult = CashOutRefinanceCalculator.calculate(rateIncreaseInputs);
      
      expect(reductionResult.paymentDifference).toBeLessThan(increaseResult.paymentDifference);
    });

    it('should calculate loan-to-value ratio appropriately', () => {
      const result = CashOutRefinanceCalculator.calculate(validInputs);
      
      // LTV should be reasonable
      expect(result.newLoanToValue).toBeGreaterThan(0);
      expect(result.newLoanToValue).toBeLessThan(100);
    });

    it('should provide meaningful break-even analysis', () => {
      const result = CashOutRefinanceCalculator.calculate(validInputs);
      
      // Break-even should be reasonable
      expect(result.breakEvenMonths).toBeGreaterThanOrEqual(0);
      expect(result.breakEvenMonths).toBeLessThan(200);
    });

    it('should calculate net cash received correctly', () => {
      const result = CashOutRefinanceCalculator.calculate(validInputs);
      
      // Net cash should not exceed cash-out amount
      expect(result.netCashReceived).toBeLessThanOrEqual(validInputs.cashOutAmount);
    });

    it('should calculate after-tax cost correctly', () => {
      const result = CashOutRefinanceCalculator.calculate(validInputs);
      
      // After-tax cost should be less than or equal to monthly payment
      expect(result.afterTaxCost).toBeLessThanOrEqual(result.newMonthlyPayment);
    });
  });
});
