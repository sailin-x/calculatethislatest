import { describe, it, expect, beforeEach } from 'vitest';
import { CashOnCashReturnCalculator } from './CashOnCashReturnCalculator';
import { calculateCashOnCashReturn, generateInvestmentAnalysis } from './formulas';
import { validateCashOnCashReturnInputs } from './validation';

describe('CashOnCash Return Calculator', () => {
  let validInputs: Record<string, any>;

  beforeEach(() => {
    validInputs = {
      purchasePrice: 300000,
      downPayment: 60000,
      closingCosts: 8000,
      renovationCosts: 15000,
      monthlyRent: 2500,
      vacancyRate: 5.0,
      propertyTax: 6000,
      insurance: 2400,
      utilities: 0,
      maintenance: 3600,
      propertyManagement: 8.0,
      hoaFees: 0,
      otherExpenses: 1200,
      loanAmount: 240000,
      interestRate: 4.5,
      loanTerm: 30,
      appreciationRate: 3.0,
      inflationRate: 2.5
    };
  });

  describe('Calculator Definition', () => {
    it('should have correct basic properties', () => {
      expect(CashOnCashReturnCalculator.id).toBe('CashOnCash-return-calculator');
      expect(CashOnCashReturnCalculator.name).toBe('CashOnCash Return Calculator');
      expect(CashOnCashReturnCalculator.category).toBe('finance');
      expect(CashOnCashReturnCalculator.subcategory).toBe('investment');
    });

    it('should have all required inputs', () => {
      const inputIds = CashOnCashReturnCalculator.inputs.map(input => input.id);
      const requiredInputs = [
        'purchasePrice', 'downPayment', 'closingCosts', 'renovationCosts', 'monthlyRent',
        'vacancyRate', 'propertyTax', 'insurance', 'utilities', 'maintenance',
        'propertyManagement', 'hoaFees', 'otherExpenses', 'loanAmount', 'interestRate',
        'loanTerm', 'appreciationRate', 'inflationRate'
      ];
      
      requiredInputs.forEach(inputId => {
        expect(inputIds).toContain(inputId);
      });
    });

    it('should have all required outputs', () => {
      const outputIds = CashOnCashReturnCalculator.outputs.map(output => output.id);
      const requiredOutputs = [
        'totalCashInvested', 'monthlyPayment', 'monthlyRentalIncome', 'monthlyExpenses',
        'monthlyCashFlow', 'annualCashFlow', 'cashOnCashReturn', 'totalReturn', 'capRate',
        'breakEvenRent', 'paybackPeriod', 'investmentGrade', 'riskAssessment', 'recommendations'
      ];
      
      requiredOutputs.forEach(outputId => {
        expect(outputIds).toContain(outputId);
      });
    });

    it('should have comprehensive examples', () => {
      expect(CashOnCashReturnCalculator.examples.length).toBeGreaterThan(0);
      CashOnCashReturnCalculator.examples.forEach(example => {
        expect(example.name).toBeDefined();
        expect(example.description).toBeDefined();
        expect(example.inputs).toBeDefined();
        expect(example.expectedOutputs).toBeDefined();
      });
    });
  });

  describe('Input Validation', () => {
    it('should validate required fields', () => {
      const incompleteInputs = { purchasePrice: 300000 };
      const result = validateCashOnCashReturnInputs(incompleteInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should validate purchase price range', () => {
      const lowPriceInputs = { ...validInputs, purchasePrice: 25000 };
      const result = validateCashOnCashReturnInputs(lowPriceInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('purchase price'))).toBe(true);
    });

    it('should validate monthly rent range', () => {
      const lowRentInputs = { ...validInputs, monthlyRent: 300 };
      const result = validateCashOnCashReturnInputs(lowRentInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('monthly rent'))).toBe(true);
    });

    it('should validate interest rate range', () => {
      const highRateInputs = { ...validInputs, interestRate: 20 };
      const result = validateCashOnCashReturnInputs(highRateInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('interest rate'))).toBe(true);
    });

    it('should validate LoanToValue ratio', () => {
      const highLTVInputs = { ...validInputs, loanAmount: 290000 };
      const result = validateCashOnCashReturnInputs(highLTVInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('LoanToValue'))).toBe(true);
    });

    it('should provide warnings for business rule violations', () => {
      const highExpenseInputs = { ...validInputs, propertyTax: 50000 };
      const result = validateCashOnCashReturnInputs(highExpenseInputs);
      expect(result.warnings.length).toBeGreaterThan(0);
    });

    it('should accept valid inputs', () => {
      const result = validateCashOnCashReturnInputs(validInputs);
      expect(result.isValid).toBe(true);
    });
  });

  describe('Formula Calculations', () => {
    it('should calculate CashOnCash return metrics correctly', () => {
      const metrics = calculateCashOnCashReturn(validInputs);
      
      expect(metrics.totalCashInvested).toBeGreaterThan(0);
      expect(metrics.monthlyPayment).toBeGreaterThan(0);
      expect(metrics.monthlyRentalIncome).toBeGreaterThan(0);
      expect(metrics.monthlyExpenses).toBeGreaterThan(0);
      expect(metrics.monthlyCashFlow).toBeDefined();
      expect(metrics.annualCashFlow).toBeDefined();
      expect(metrics.cashOnCashReturn).toBeDefined();
      expect(metrics.totalReturn).toBeDefined();
      expect(metrics.capRate).toBeGreaterThan(0);
      expect(metrics.breakEvenRent).toBeGreaterThan(0);
      expect(metrics.paybackPeriod).toBeGreaterThan(0);
    });

    it('should calculate total cash invested correctly', () => {
      const metrics = calculateCashOnCashReturn(validInputs);
      
      const expectedTotalCash = validInputs.downPayment + validInputs.closingCosts + validInputs.renovationCosts;
      expect(metrics.totalCashInvested).toBe(expectedTotalCash);
    });

    it('should calculate CashOnCash return correctly', () => {
      const metrics = calculateCashOnCashReturn(validInputs);
      
      const expectedCashOnCash = (metrics.annualCashFlow / metrics.totalCashInvested) * 100;
      expect(Math.abs(metrics.cashOnCashReturn - expectedCashOnCash)).toBeLessThan(0.01);
    });

    it('should calculate total return correctly', () => {
      const metrics = calculateCashOnCashReturn(validInputs);
      
      const annualAppreciation = validInputs.purchasePrice * (validInputs.appreciationRate / 100);
      const expectedTotalReturn = ((metrics.annualCashFlow + annualAppreciation) / metrics.totalCashInvested) * 100;
      expect(Math.abs(metrics.totalReturn - expectedTotalReturn)).toBeLessThan(0.01);
    });

    it('should handle different down payments correctly', () => {
      const lowDownInputs = { ...validInputs, downPayment: 30000, loanAmount: 270000 };
      const highDownInputs = { ...validInputs, downPayment: 90000, loanAmount: 210000 };
      
      const lowDownResult = calculateCashOnCashReturn(lowDownInputs);
      const highDownResult = calculateCashOnCashReturn(highDownInputs);
      
      // Higher down payment should result in lower monthly payment and potentially higher cash flow
      expect(highDownResult.monthlyPayment).toBeLessThan(lowDownResult.monthlyPayment);
    });

    it('should handle different rental rates correctly', () => {
      const lowRentInputs = { ...validInputs, monthlyRent: 2000 };
      const highRentInputs = { ...validInputs, monthlyRent: 3000 };
      
      const lowRentResult = calculateCashOnCashReturn(lowRentInputs);
      const highRentResult = calculateCashOnCashReturn(highRentInputs);
      
      // Higher rent should result in higher cash flow and CashOnCash return
      expect(highRentResult.monthlyCashFlow).toBeGreaterThan(lowRentResult.monthlyCashFlow);
      expect(highRentResult.cashOnCashReturn).toBeGreaterThan(lowRentResult.cashOnCashReturn);
    });

    it('should handle different interest rates correctly', () => {
      const lowRateInputs = { ...validInputs, interestRate: 3.0 };
      const highRateInputs = { ...validInputs, interestRate: 6.0 };
      
      const lowRateResult = calculateCashOnCashReturn(lowRateInputs);
      const highRateResult = calculateCashOnCashReturn(highRateInputs);
      
      // Lower interest rate should result in higher cash flow
      expect(lowRateResult.monthlyCashFlow).toBeGreaterThan(highRateResult.monthlyCashFlow);
    });
  });

  describe('Investment Analysis', () => {
    it('should generate investment analysis', () => {
      const cashOnCashMetrics = calculateCashOnCashReturn(validInputs);
      const analysis = generateInvestmentAnalysis(validInputs, cashOnCashMetrics);
      
      expect(analysis.investmentGrade).toBeDefined();
      expect(analysis.riskAssessment).toBeDefined();
      expect(analysis.recommendations).toBeDefined();
    });

    it('should provide meaningful investment grade', () => {
      const cashOnCashMetrics = calculateCashOnCashReturn(validInputs);
      const analysis = generateInvestmentAnalysis(validInputs, cashOnCashMetrics);
      
      expect(analysis.investmentGrade).toMatch(/[A-D][+-]?/);
      expect(analysis.investmentGrade.length).toBeGreaterThan(20);
    });

    it('should provide risk assessment', () => {
      const cashOnCashMetrics = calculateCashOnCashReturn(validInputs);
      const analysis = generateInvestmentAnalysis(validInputs, cashOnCashMetrics);
      
      expect(analysis.riskAssessment).toContain('Risk Assessment');
      expect(analysis.riskAssessment.length).toBeGreaterThan(50);
    });

    it('should provide recommendations', () => {
      const cashOnCashMetrics = calculateCashOnCashReturn(validInputs);
      const analysis = generateInvestmentAnalysis(validInputs, cashOnCashMetrics);
      
      expect(analysis.recommendations).toContain('Recommendations');
      expect(analysis.recommendations.length).toBeGreaterThan(50);
    });
  });

  describe('Main Calculator Function', () => {
    it('should calculate all outputs correctly', () => {
      const result = CashOnCashReturnCalculator.calculate(validInputs);
      
      expect(result.totalCashInvested).toBeGreaterThan(0);
      expect(result.monthlyPayment).toBeGreaterThan(0);
      expect(result.monthlyRentalIncome).toBeGreaterThan(0);
      expect(result.monthlyExpenses).toBeGreaterThan(0);
      expect(result.monthlyCashFlow).toBeDefined();
      expect(result.annualCashFlow).toBeDefined();
      expect(result.cashOnCashReturn).toBeDefined();
      expect(result.totalReturn).toBeDefined();
      expect(result.capRate).toBeGreaterThan(0);
      expect(result.breakEvenRent).toBeGreaterThan(0);
      expect(result.paybackPeriod).toBeGreaterThan(0);
      expect(result.investmentGrade).toBeDefined();
      expect(result.riskAssessment).toBeDefined();
      expect(result.recommendations).toBeDefined();
    });

    it('should throw error for invalid inputs', () => {
      const invalidInputs = { ...validInputs, purchasePrice: -1000 };
      
      expect(() => {
        CashOnCashReturnCalculator.calculate(invalidInputs);
      }).toThrow();
    });

    it('should handle edge cases gracefully', () => {
      const edgeCaseInputs = { ...validInputs, monthlyRent: 1000, purchasePrice: 50000 };
      const result = CashOnCashReturnCalculator.calculate(edgeCaseInputs);
      
      expect(result.cashOnCashReturn).toBeDefined();
      expect(result.totalReturn).toBeDefined();
    });

    it('should match example calculations within tolerance', () => {
      const example = CashOnCashReturnCalculator.examples[0];
      const result = CashOnCashReturnCalculator.calculate(example.inputs);
      
      const cashOnCashAccuracy = Math.abs((result.cashOnCashReturn - example.expectedOutputs.cashOnCashReturn) / example.expectedOutputs.cashOnCashReturn) * 100;
      const totalReturnAccuracy = Math.abs((result.totalReturn - example.expectedOutputs.totalReturn) / example.expectedOutputs.totalReturn) * 100;
      
      expect(cashOnCashAccuracy).toBeLessThan(20);
      expect(totalReturnAccuracy).toBeLessThan(20);
    });
  });

  describe('Performance', () => {
    it('should complete calculations quickly', () => {
      const startTime = performance.now();
      
      for (let i = 0; i < 100; i++) {
        CashOnCashReturnCalculator.calculate(validInputs);
      }
      
      const endTime = performance.now();
      const avgTime = (endTime - startTime) / 100;
      
      expect(avgTime).toBeLessThan(10); // Should complete in less than 10ms per calculation
    });
  });

  describe('Business Logic', () => {
    it('should show realistic CashOnCash return values', () => {
      const result = CashOnCashReturnCalculator.calculate(validInputs);
      
      // CashOnCash return should be reasonable
      expect(result.cashOnCashReturn).toBeGreaterThan(-20);
      expect(result.cashOnCashReturn).toBeLessThan(30);
    });

    it('should handle positive and negative cash flow', () => {
      const negativeCashFlowInputs = { ...validInputs, monthlyRent: 2000 };
      const positiveCashFlowInputs = { ...validInputs, monthlyRent: 3000 };
      
      const negativeResult = CashOnCashReturnCalculator.calculate(negativeCashFlowInputs);
      const positiveResult = CashOnCashReturnCalculator.calculate(positiveCashFlowInputs);
      
      expect(negativeResult.monthlyCashFlow).toBeLessThan(positiveResult.monthlyCashFlow);
    });

    it('should calculate break-even rent correctly', () => {
      const result = CashOnCashReturnCalculator.calculate(validInputs);
      
      // Break-even rent should be greater than monthly expenses
      expect(result.breakEvenRent).toBeGreaterThan(result.monthlyExpenses);
    });

    it('should provide meaningful payback period', () => {
      const result = CashOnCashReturnCalculator.calculate(validInputs);
      
      // Payback period should be reasonable
      expect(result.paybackPeriod).toBeGreaterThan(0);
      expect(result.paybackPeriod).toBeLessThan(100);
    });

    it('should calculate total cash invested correctly', () => {
      const result = CashOnCashReturnCalculator.calculate(validInputs);
      
      const expectedTotalCash = validInputs.downPayment + validInputs.closingCosts + validInputs.renovationCosts;
      expect(result.totalCashInvested).toBe(expectedTotalCash);
    });
  });
});
