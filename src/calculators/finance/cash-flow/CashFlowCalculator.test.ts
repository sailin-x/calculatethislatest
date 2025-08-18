import { describe, it, expect, beforeEach } from 'vitest';
import { CashFlowCalculator } from './CashFlowCalculator';
import { calculateCashFlow, generateCashFlowAnalysis } from './formulas';
import { validateCashFlowInputs } from './validation';

describe('Cash Flow Calculator', () => {
  let validInputs: Record<string, any>;

  beforeEach(() => {
    validInputs = {
      propertyValue: 350000,
      purchasePrice: 320000,
      downPayment: 64000,
      loanAmount: 256000,
      interestRate: 4.5,
      loanTerm: 30,
      monthlyRent: 2500,
      vacancyRate: 5.0,
      propertyTax: 7000,
      insurance: 2500,
      utilities: 0,
      maintenance: 4000,
      propertyManagement: 8.0,
      hoaFees: 0,
      otherExpenses: 1500,
      appreciationRate: 3.0,
      inflationRate: 2.5
    };
  });

  describe('Calculator Definition', () => {
    it('should have correct basic properties', () => {
      expect(CashFlowCalculator.id).toBe('cash-flow-calculator');
      expect(CashFlowCalculator.name).toBe('Cash Flow Calculator');
      expect(CashFlowCalculator.category).toBe('finance');
      expect(CashFlowCalculator.subcategory).toBe('investment');
    });

    it('should have all required inputs', () => {
      const inputIds = CashFlowCalculator.inputs.map(input => input.id);
      const requiredInputs = [
        'propertyValue', 'purchasePrice', 'downPayment', 'loanAmount', 'interestRate',
        'loanTerm', 'monthlyRent', 'vacancyRate', 'propertyTax', 'insurance',
        'utilities', 'maintenance', 'propertyManagement', 'hoaFees', 'otherExpenses',
        'appreciationRate', 'inflationRate'
      ];
      
      requiredInputs.forEach(inputId => {
        expect(inputIds).toContain(inputId);
      });
    });

    it('should have all required outputs', () => {
      const outputIds = CashFlowCalculator.outputs.map(output => output.id);
      const requiredOutputs = [
        'monthlyPayment', 'monthlyRentalIncome', 'monthlyExpenses', 'monthlyCashFlow',
        'annualCashFlow', 'cashOnCashReturn', 'capRate', 'totalReturn', 'breakEvenRent',
        'profitabilityIndex', 'paybackPeriod', 'cashFlowAnalysis', 'riskAssessment', 'recommendations'
      ];
      
      requiredOutputs.forEach(outputId => {
        expect(outputIds).toContain(outputId);
      });
    });

    it('should have comprehensive examples', () => {
      expect(CashFlowCalculator.examples.length).toBeGreaterThan(0);
      CashFlowCalculator.examples.forEach(example => {
        expect(example.name).toBeDefined();
        expect(example.description).toBeDefined();
        expect(example.inputs).toBeDefined();
        expect(example.expectedOutputs).toBeDefined();
      });
    });
  });

  describe('Input Validation', () => {
    it('should validate required fields', () => {
      const incompleteInputs = { propertyValue: 350000 };
      const result = validateCashFlowInputs(incompleteInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should validate property value range', () => {
      const lowValueInputs = { ...validInputs, propertyValue: 25000 };
      const result = validateCashFlowInputs(lowValueInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('property value'))).toBe(true);
    });

    it('should validate monthly rent range', () => {
      const lowRentInputs = { ...validInputs, monthlyRent: 300 };
      const result = validateCashFlowInputs(lowRentInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('monthly rent'))).toBe(true);
    });

    it('should validate interest rate range', () => {
      const highRateInputs = { ...validInputs, interestRate: 20 };
      const result = validateCashFlowInputs(highRateInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('interest rate'))).toBe(true);
    });

    it('should validate loan-to-value ratio', () => {
      const highLTVInputs = { ...validInputs, loanAmount: 340000 };
      const result = validateCashFlowInputs(highLTVInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('Loan-to-value'))).toBe(true);
    });

    it('should provide warnings for business rule violations', () => {
      const highExpenseInputs = { ...validInputs, propertyTax: 50000 };
      const result = validateCashFlowInputs(highExpenseInputs);
      expect(result.warnings.length).toBeGreaterThan(0);
    });

    it('should accept valid inputs', () => {
      const result = validateCashFlowInputs(validInputs);
      expect(result.isValid).toBe(true);
    });
  });

  describe('Formula Calculations', () => {
    it('should calculate cash flow metrics correctly', () => {
      const metrics = calculateCashFlow(validInputs);
      
      expect(metrics.monthlyPayment).toBeGreaterThan(0);
      expect(metrics.monthlyRentalIncome).toBeGreaterThan(0);
      expect(metrics.monthlyExpenses).toBeGreaterThan(0);
      expect(metrics.monthlyCashFlow).toBeDefined();
      expect(metrics.annualCashFlow).toBeDefined();
      expect(metrics.cashOnCashReturn).toBeDefined();
      expect(metrics.capRate).toBeGreaterThan(0);
      expect(metrics.totalReturn).toBeDefined();
      expect(metrics.breakEvenRent).toBeGreaterThan(0);
      expect(metrics.profitabilityIndex).toBeGreaterThan(0);
      expect(metrics.paybackPeriod).toBeGreaterThan(0);
    });

    it('should calculate monthly payment correctly', () => {
      const metrics = calculateCashFlow(validInputs);
      
      // Verify monthly payment calculation
      const monthlyInterestRate = validInputs.interestRate / 100 / 12;
      const totalPayments = validInputs.loanTerm * 12;
      const expectedPayment = validInputs.loanAmount * 
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments)) /
        (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
      
      expect(Math.abs(metrics.monthlyPayment - expectedPayment)).toBeLessThan(0.01);
    });

    it('should calculate cash flow correctly', () => {
      const metrics = calculateCashFlow(validInputs);
      
      const expectedCashFlow = metrics.monthlyRentalIncome - metrics.monthlyExpenses - metrics.monthlyPayment;
      expect(Math.abs(metrics.monthlyCashFlow - expectedCashFlow)).toBeLessThan(0.01);
    });

    it('should calculate cash-on-cash return correctly', () => {
      const metrics = calculateCashFlow(validInputs);
      
      const expectedCashOnCash = (metrics.annualCashFlow / validInputs.downPayment) * 100;
      expect(Math.abs(metrics.cashOnCashReturn - expectedCashOnCash)).toBeLessThan(0.01);
    });

    it('should handle different interest rates correctly', () => {
      const lowRateInputs = { ...validInputs, interestRate: 3.0 };
      const highRateInputs = { ...validInputs, interestRate: 6.0 };
      
      const lowRateResult = calculateCashFlow(lowRateInputs);
      const highRateResult = calculateCashFlow(highRateInputs);
      
      // Lower interest rate should result in higher cash flow
      expect(lowRateResult.monthlyCashFlow).toBeGreaterThan(highRateResult.monthlyCashFlow);
    });

    it('should handle different rental rates correctly', () => {
      const lowRentInputs = { ...validInputs, monthlyRent: 2000 };
      const highRentInputs = { ...validInputs, monthlyRent: 3000 };
      
      const lowRentResult = calculateCashFlow(lowRentInputs);
      const highRentResult = calculateCashFlow(highRentInputs);
      
      // Higher rent should result in higher cash flow
      expect(highRentResult.monthlyCashFlow).toBeGreaterThan(lowRentResult.monthlyCashFlow);
    });

    it('should handle different down payments correctly', () => {
      const lowDownInputs = { ...validInputs, downPayment: 32000, loanAmount: 288000 };
      const highDownInputs = { ...validInputs, downPayment: 96000, loanAmount: 224000 };
      
      const lowDownResult = calculateCashFlow(lowDownInputs);
      const highDownResult = calculateCashFlow(highDownInputs);
      
      // Higher down payment should result in lower monthly payment and higher cash flow
      expect(highDownResult.monthlyPayment).toBeLessThan(lowDownResult.monthlyPayment);
      expect(highDownResult.monthlyCashFlow).toBeGreaterThan(lowDownResult.monthlyCashFlow);
    });
  });

  describe('Cash Flow Analysis', () => {
    it('should generate cash flow analysis', () => {
      const cashFlowMetrics = calculateCashFlow(validInputs);
      const analysis = generateCashFlowAnalysis(validInputs, cashFlowMetrics);
      
      expect(analysis.cashFlowAnalysis).toBeDefined();
      expect(analysis.riskAssessment).toBeDefined();
      expect(analysis.recommendations).toBeDefined();
    });

    it('should provide meaningful cash flow analysis', () => {
      const cashFlowMetrics = calculateCashFlow(validInputs);
      const analysis = generateCashFlowAnalysis(validInputs, cashFlowMetrics);
      
      expect(analysis.cashFlowAnalysis).toContain('Cash Flow Analysis');
      expect(analysis.cashFlowAnalysis.length).toBeGreaterThan(100);
    });

    it('should provide risk assessment', () => {
      const cashFlowMetrics = calculateCashFlow(validInputs);
      const analysis = generateCashFlowAnalysis(validInputs, cashFlowMetrics);
      
      expect(analysis.riskAssessment).toContain('Risk Assessment');
      expect(analysis.riskAssessment.length).toBeGreaterThan(50);
    });

    it('should provide recommendations', () => {
      const cashFlowMetrics = calculateCashFlow(validInputs);
      const analysis = generateCashFlowAnalysis(validInputs, cashFlowMetrics);
      
      expect(analysis.recommendations).toContain('Recommendations');
      expect(analysis.recommendations.length).toBeGreaterThan(50);
    });
  });

  describe('Main Calculator Function', () => {
    it('should calculate all outputs correctly', () => {
      const result = CashFlowCalculator.calculate(validInputs);
      
      expect(result.monthlyPayment).toBeGreaterThan(0);
      expect(result.monthlyRentalIncome).toBeGreaterThan(0);
      expect(result.monthlyExpenses).toBeGreaterThan(0);
      expect(result.monthlyCashFlow).toBeDefined();
      expect(result.annualCashFlow).toBeDefined();
      expect(result.cashOnCashReturn).toBeDefined();
      expect(result.capRate).toBeGreaterThan(0);
      expect(result.totalReturn).toBeDefined();
      expect(result.breakEvenRent).toBeGreaterThan(0);
      expect(result.profitabilityIndex).toBeGreaterThan(0);
      expect(result.paybackPeriod).toBeGreaterThan(0);
      expect(result.cashFlowAnalysis).toBeDefined();
      expect(result.riskAssessment).toBeDefined();
      expect(result.recommendations).toBeDefined();
    });

    it('should throw error for invalid inputs', () => {
      const invalidInputs = { ...validInputs, propertyValue: -1000 };
      
      expect(() => {
        CashFlowCalculator.calculate(invalidInputs);
      }).toThrow();
    });

    it('should handle edge cases gracefully', () => {
      const edgeCaseInputs = { ...validInputs, monthlyRent: 1000, propertyValue: 50000 };
      const result = CashFlowCalculator.calculate(edgeCaseInputs);
      
      expect(result.monthlyCashFlow).toBeDefined();
      expect(result.annualCashFlow).toBeDefined();
    });

    it('should match example calculations within tolerance', () => {
      const example = CashFlowCalculator.examples[0];
      const result = CashFlowCalculator.calculate(example.inputs);
      
      const cashFlowAccuracy = Math.abs((result.monthlyCashFlow - example.expectedOutputs.monthlyCashFlow) / example.expectedOutputs.monthlyCashFlow) * 100;
      const cashOnCashAccuracy = Math.abs((result.cashOnCashReturn - example.expectedOutputs.cashOnCashReturn) / example.expectedOutputs.cashOnCashReturn) * 100;
      
      expect(cashFlowAccuracy).toBeLessThan(20);
      expect(cashOnCashAccuracy).toBeLessThan(20);
    });
  });

  describe('Performance', () => {
    it('should complete calculations quickly', () => {
      const startTime = performance.now();
      
      for (let i = 0; i < 100; i++) {
        CashFlowCalculator.calculate(validInputs);
      }
      
      const endTime = performance.now();
      const avgTime = (endTime - startTime) / 100;
      
      expect(avgTime).toBeLessThan(10); // Should complete in less than 10ms per calculation
    });
  });

  describe('Business Logic', () => {
    it('should show realistic cash flow values', () => {
      const result = CashFlowCalculator.calculate(validInputs);
      
      // Monthly payment should be reasonable
      expect(result.monthlyPayment).toBeGreaterThan(500);
      expect(result.monthlyPayment).toBeLessThan(5000);
    });

    it('should handle positive and negative cash flow', () => {
      const negativeCashFlowInputs = { ...validInputs, monthlyRent: 2000 };
      const positiveCashFlowInputs = { ...validInputs, monthlyRent: 3000 };
      
      const negativeResult = CashFlowCalculator.calculate(negativeCashFlowInputs);
      const positiveResult = CashFlowCalculator.calculate(positiveCashFlowInputs);
      
      expect(negativeResult.monthlyCashFlow).toBeLessThan(positiveResult.monthlyCashFlow);
    });

    it('should calculate break-even rent correctly', () => {
      const result = CashFlowCalculator.calculate(validInputs);
      
      // Break-even rent should be greater than monthly expenses
      expect(result.breakEvenRent).toBeGreaterThan(result.monthlyExpenses);
    });

    it('should provide meaningful payback period', () => {
      const result = CashFlowCalculator.calculate(validInputs);
      
      // Payback period should be reasonable
      expect(result.paybackPeriod).toBeGreaterThan(0);
      expect(result.paybackPeriod).toBeLessThan(100);
    });

    it('should calculate profitability index appropriately', () => {
      const result = CashFlowCalculator.calculate(validInputs);
      
      // Profitability index should be reasonable
      expect(result.profitabilityIndex).toBeGreaterThan(0);
      expect(result.profitabilityIndex).toBeLessThan(10);
    });
  });
});
