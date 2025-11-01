import { describe, it, expect, beforeEach } from 'vitest';
import { CommercialLeaseBuyoutCalculator } from './CommercialLeaseBuyoutCalculator';
import { calculateLeaseBuyout, generateBuyoutAnalysis } from './formulas';
import { validateLeaseBuyoutInputs } from './validation';

describe('Commercial Lease Buyout Calculator', () => {
  let validInputs: Record<string, any>;

  beforeEach(() => {
    validInputs = {
      propertyValue: 2500000,
      buyoutPrice: 2200000,
      downPayment: 550000,
      loanAmount: 1650000,
      interestRate: 5.5,
      loanTerm: 25,
      currentRent: 15000,
      marketRent: 18000,
      remainingLeaseTerm: 5,
      closingCosts: 75000,
      propertyTax: 45000,
      insurance: 18000,
      maintenance: 36000,
      propertyManagement: 5.0,
      hoaFees: 0,
      otherExpenses: 12000,
      appreciationRate: 3.0,
      inflationRate: 2.5,
      taxRate: 25.0,
      propertyType: 'office'
    };
  });

  describe('Calculator Definition', () => {
    it('should have correct basic properties', () => {
      expect(CommercialLeaseBuyoutCalculator.id).toBe('CommercialLeaseBuyout-calculator');
      expect(CommercialLeaseBuyoutCalculator.name).toBe('Commercial Lease Buyout Calculator');
      expect(CommercialLeaseBuyoutCalculator.category).toBe('finance');
      expect(CommercialLeaseBuyoutCalculator.subcategory).toBe('business');
    });

    it('should have all required inputs', () => {
      const inputIds = CommercialLeaseBuyoutCalculator.inputs.map(input => input.id);
      const requiredInputs = [
        'propertyValue', 'buyoutPrice', 'downPayment', 'loanAmount', 'interestRate',
        'loanTerm', 'currentRent', 'marketRent', 'remainingLeaseTerm', 'closingCosts',
        'propertyTax', 'insurance', 'maintenance', 'propertyManagement', 'hoaFees',
        'otherExpenses', 'appreciationRate', 'inflationRate', 'taxRate', 'propertyType'
      ];
      
      requiredInputs.forEach(inputId => {
        expect(inputIds).toContain(inputId);
      });
    });

    it('should have all required outputs', () => {
      const outputIds = CommercialLeaseBuyoutCalculator.outputs.map(output => output.id);
      const requiredOutputs = [
        'monthlyPayment', 'totalCashInvested', 'monthlyExpenses', 'netOperatingIncome',
        'monthlyCashFlow', 'annualCashFlow', 'capRate', 'cashOnCashReturn', 'totalReturn',
        'rentSavings', 'annualRentSavings', 'breakEvenMonths', 'loanToValue',
        'debtServiceCoverage', 'buyoutGrade', 'riskAssessment', 'recommendations'
      ];
      
      requiredOutputs.forEach(outputId => {
        expect(outputIds).toContain(outputId);
      });
    });

    it('should have comprehensive examples', () => {
      expect(CommercialLeaseBuyoutCalculator.examples.length).toBeGreaterThan(0);
      CommercialLeaseBuyoutCalculator.examples.forEach(example => {
        expect(example.name).toBeDefined();
        expect(example.description).toBeDefined();
        expect(example.inputs).toBeDefined();
        expect(example.expectedOutputs).toBeDefined();
      });
    });
  });

  describe('Input Validation', () => {
    it('should validate required fields', () => {
      const incompleteInputs = { propertyValue: 2500000 };
      const result = validateLeaseBuyoutInputs(incompleteInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should validate property value range', () => {
      const lowValueInputs = { ...validInputs, propertyValue: 50000 };
      const result = validateLeaseBuyoutInputs(lowValueInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('property value'))).toBe(true);
    });

    it('should validate buyout price range', () => {
      const lowPriceInputs = { ...validInputs, buyoutPrice: 25000 };
      const result = validateLeaseBuyoutInputs(lowPriceInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('buyout price'))).toBe(true);
    });

    it('should validate current rent range', () => {
      const lowRentInputs = { ...validInputs, currentRent: 300 };
      const result = validateLeaseBuyoutInputs(lowRentInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('current rent'))).toBe(true);
    });

    it('should validate market rent range', () => {
      const lowMarketRentInputs = { ...validInputs, marketRent: 300 };
      const result = validateLeaseBuyoutInputs(lowMarketRentInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('market rent'))).toBe(true);
    });

    it('should validate LoanToValue ratio', () => {
      const highLTVInputs = { ...validInputs, loanAmount: 2200000 };
      const result = validateLeaseBuyoutInputs(highLTVInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('LoanToValue'))).toBe(true);
    });

    it('should validate down payment percentage', () => {
      const lowDownInputs = { ...validInputs, downPayment: 200000 };
      const result = validateLeaseBuyoutInputs(lowDownInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('Down payment'))).toBe(true);
    });

    it('should provide warnings for business rule violations', () => {
      const highClosingCostsInputs = { ...validInputs, closingCosts: 150000 };
      const result = validateLeaseBuyoutInputs(highClosingCostsInputs);
      expect(result.warnings.length).toBeGreaterThan(0);
    });

    it('should accept valid inputs', () => {
      const result = validateLeaseBuyoutInputs(validInputs);
      expect(result.isValid).toBe(true);
    });
  });

  describe('Formula Calculations', () => {
    it('should calculate lease buyout metrics correctly', () => {
      const metrics = calculateLeaseBuyout(validInputs);
      
      expect(metrics.monthlyPayment).toBeGreaterThan(0);
      expect(metrics.totalCashInvested).toBeGreaterThan(0);
      expect(metrics.monthlyExpenses).toBeGreaterThan(0);
      expect(metrics.netOperatingIncome).toBeDefined();
      expect(metrics.monthlyCashFlow).toBeDefined();
      expect(metrics.annualCashFlow).toBeDefined();
      expect(metrics.capRate).toBeGreaterThan(0);
      expect(metrics.cashOnCashReturn).toBeDefined();
      expect(metrics.totalReturn).toBeDefined();
      expect(metrics.rentSavings).toBeDefined();
      expect(metrics.annualRentSavings).toBeDefined();
      expect(metrics.breakEvenMonths).toBeGreaterThanOrEqual(0);
      expect(metrics.loanToValue).toBeGreaterThan(0);
      expect(metrics.debtServiceCoverage).toBeGreaterThan(0);
    });

    it('should calculate total cash invested correctly', () => {
      const metrics = calculateLeaseBuyout(validInputs);
      
      const expectedTotalCash = validInputs.downPayment + validInputs.closingCosts;
      expect(metrics.totalCashInvested).toBe(expectedTotalCash);
    });

    it('should calculate rent savings correctly', () => {
      const metrics = calculateLeaseBuyout(validInputs);
      
      const expectedRentSavings = validInputs.currentRent - metrics.monthlyPayment - metrics.monthlyExpenses;
      expect(Math.abs(metrics.rentSavings - expectedRentSavings)).toBeLessThan(0.01);
    });

    it('should calculate break-even months correctly', () => {
      const metrics = calculateLeaseBuyout(validInputs);
      
      if (metrics.rentSavings > 0) {
        const expectedBreakEven = metrics.totalCashInvested / metrics.rentSavings;
        expect(Math.abs(metrics.breakEvenMonths - expectedBreakEven)).toBeLessThan(0.01);
      } else {
        expect(metrics.breakEvenMonths).toBe(0);
      }
    });

    it('should calculate LoanToValue correctly', () => {
      const metrics = calculateLeaseBuyout(validInputs);
      
      const expectedLTV = (validInputs.loanAmount / validInputs.propertyValue) * 100;
      expect(Math.abs(metrics.loanToValue - expectedLTV)).toBeLessThan(0.01);
    });

    it('should handle different rent scenarios correctly', () => {
      const highMarketRentInputs = { ...validInputs, marketRent: 25000 };
      const lowMarketRentInputs = { ...validInputs, marketRent: 15000 };
      
      const highRentResult = calculateLeaseBuyout(highMarketRentInputs);
      const lowRentResult = calculateLeaseBuyout(lowMarketRentInputs);
      
      // Higher market rent should result in higher NOI and cap rate
      expect(highRentResult.netOperatingIncome).toBeGreaterThan(lowRentResult.netOperatingIncome);
      expect(highRentResult.capRate).toBeGreaterThan(lowRentResult.capRate);
    });

    it('should handle different interest rates correctly', () => {
      const lowRateInputs = { ...validInputs, interestRate: 4.0 };
      const highRateInputs = { ...validInputs, interestRate: 7.0 };
      
      const lowRateResult = calculateLeaseBuyout(lowRateInputs);
      const highRateResult = calculateLeaseBuyout(highRateInputs);
      
      // Lower interest rate should result in higher cash flow
      expect(lowRateResult.monthlyCashFlow).toBeGreaterThan(highRateResult.monthlyCashFlow);
    });

    it('should handle different property types correctly', () => {
      const officeInputs = { ...validInputs, propertyType: 'office' };
      const retailInputs = { ...validInputs, propertyType: 'retail' };
      
      const officeResult = calculateLeaseBuyout(officeInputs);
      const retailResult = calculateLeaseBuyout(retailInputs);
      
      // Should have same calculations for same inputs (property type doesn't affect calculation)
      expect(officeResult.capRate).toBe(retailResult.capRate);
    });
  });

  describe('Buyout Analysis', () => {
    it('should generate buyout analysis', () => {
      const buyoutMetrics = calculateLeaseBuyout(validInputs);
      const analysis = generateBuyoutAnalysis(validInputs, buyoutMetrics);
      
      expect(analysis.buyoutGrade).toBeDefined();
      expect(analysis.riskAssessment).toBeDefined();
      expect(analysis.recommendations).toBeDefined();
    });

    it('should provide meaningful buyout grade', () => {
      const buyoutMetrics = calculateLeaseBuyout(validInputs);
      const analysis = generateBuyoutAnalysis(validInputs, buyoutMetrics);
      
      expect(analysis.buyoutGrade).toMatch(/[A-C][+-]?/);
      expect(analysis.buyoutGrade.length).toBeGreaterThan(20);
    });

    it('should provide risk assessment', () => {
      const buyoutMetrics = calculateLeaseBuyout(validInputs);
      const analysis = generateBuyoutAnalysis(validInputs, buyoutMetrics);
      
      expect(analysis.riskAssessment).toContain('Risk Assessment');
      expect(analysis.riskAssessment.length).toBeGreaterThan(50);
    });

    it('should provide recommendations', () => {
      const buyoutMetrics = calculateLeaseBuyout(validInputs);
      const analysis = generateBuyoutAnalysis(validInputs, buyoutMetrics);
      
      expect(analysis.recommendations).toContain('Recommendations');
      expect(analysis.recommendations.length).toBeGreaterThan(50);
    });
  });

  describe('Main Calculator Function', () => {
    it('should calculate all outputs correctly', () => {
      const result = CommercialLeaseBuyoutCalculator.calculate(validInputs);
      
      expect(result.monthlyPayment).toBeGreaterThan(0);
      expect(result.totalCashInvested).toBeGreaterThan(0);
      expect(result.monthlyExpenses).toBeGreaterThan(0);
      expect(result.netOperatingIncome).toBeDefined();
      expect(result.monthlyCashFlow).toBeDefined();
      expect(result.annualCashFlow).toBeDefined();
      expect(result.capRate).toBeGreaterThan(0);
      expect(result.cashOnCashReturn).toBeDefined();
      expect(result.totalReturn).toBeDefined();
      expect(result.rentSavings).toBeDefined();
      expect(result.annualRentSavings).toBeDefined();
      expect(result.breakEvenMonths).toBeGreaterThanOrEqual(0);
      expect(result.loanToValue).toBeGreaterThan(0);
      expect(result.debtServiceCoverage).toBeGreaterThan(0);
      expect(result.buyoutGrade).toBeDefined();
      expect(result.riskAssessment).toBeDefined();
      expect(result.recommendations).toBeDefined();
    });

    it('should throw error for invalid inputs', () => {
      const invalidInputs = { ...validInputs, propertyValue: -1000 };
      
      expect(() => {
        CommercialLeaseBuyoutCalculator.calculate(invalidInputs);
      }).toThrow();
    });

    it('should handle edge cases gracefully', () => {
      const edgeCaseInputs = { ...validInputs, closingCosts: 0, currentRent: 5000 };
      const result = CommercialLeaseBuyoutCalculator.calculate(edgeCaseInputs);
      
      expect(result.totalCashInvested).toBeDefined();
      expect(result.rentSavings).toBeDefined();
    });

    it('should match example calculations within tolerance', () => {
      const example = CommercialLeaseBuyoutCalculator.examples[0];
      const result = CommercialLeaseBuyoutCalculator.calculate(example.inputs);
      
      const totalCashAccuracy = Math.abs((result.totalCashInvested - example.expectedOutputs.totalCashInvested) / example.expectedOutputs.totalCashInvested) * 100;
      const cashFlowAccuracy = Math.abs((result.monthlyCashFlow - example.expectedOutputs.monthlyCashFlow) / example.expectedOutputs.monthlyCashFlow) * 100;
      
      expect(totalCashAccuracy).toBeLessThan(20);
      expect(cashFlowAccuracy).toBeLessThan(20);
    });
  });

  describe('Performance', () => {
    it('should complete calculations quickly', () => {
      const startTime = performance.now();
      
      for (let i = 0; i < 100; i++) {
        CommercialLeaseBuyoutCalculator.calculate(validInputs);
      }
      
      const endTime = performance.now();
      const avgTime = (endTime - startTime) / 100;
      
      expect(avgTime).toBeLessThan(10); // Should complete in less than 10ms per calculation
    });
  });

  describe('Business Logic', () => {
    it('should show realistic lease buyout values', () => {
      const result = CommercialLeaseBuyoutCalculator.calculate(validInputs);
      
      // Total cash invested should be reasonable
      expect(result.totalCashInvested).toBeGreaterThan(0);
      expect(result.totalCashInvested).toBeLessThan(validInputs.propertyValue);
    });

    it('should handle positive and negative rent savings', () => {
      const positiveSavingsInputs = { ...validInputs, currentRent: 20000, marketRent: 18000 };
      const negativeSavingsInputs = { ...validInputs, currentRent: 12000, marketRent: 18000 };
      
      const positiveResult = CommercialLeaseBuyoutCalculator.calculate(positiveSavingsInputs);
      const negativeResult = CommercialLeaseBuyoutCalculator.calculate(negativeSavingsInputs);
      
      expect(positiveResult.rentSavings).toBeGreaterThan(negativeResult.rentSavings);
    });

    it('should calculate LoanToValue ratio appropriately', () => {
      const result = CommercialLeaseBuyoutCalculator.calculate(validInputs);
      
      // LTV should be reasonable
      expect(result.loanToValue).toBeGreaterThan(0);
      expect(result.loanToValue).toBeLessThan(100);
    });

    it('should provide meaningful break-even analysis', () => {
      const result = CommercialLeaseBuyoutCalculator.calculate(validInputs);
      
      // Break-even should be reasonable
      expect(result.breakEvenMonths).toBeGreaterThanOrEqual(0);
      expect(result.breakEvenMonths).toBeLessThan(500);
    });

    it('should calculate debt service coverage correctly', () => {
      const result = CommercialLeaseBuyoutCalculator.calculate(validInputs);
      
      // DSCR should be reasonable
      expect(result.debtServiceCoverage).toBeGreaterThan(0);
      expect(result.debtServiceCoverage).toBeLessThan(10);
    });

    it('should calculate annual rent savings correctly', () => {
      const result = CommercialLeaseBuyoutCalculator.calculate(validInputs);
      
      // Annual rent savings should be monthly savings * 12
      const expectedAnnualSavings = result.rentSavings * 12;
      expect(Math.abs(result.annualRentSavings - expectedAnnualSavings)).toBeLessThan(0.01);
    });
  });
});
