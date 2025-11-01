import { describe, it, expect, beforeEach } from 'vitest';
import { BridgeLoanCalculator } from './BridgeLoanCalculator';
import { calculateBridgeLoan, calculateComparison, generatePaymentSchedule } from './formulas';
import { validateBridgeLoanInputs } from './validation';

describe('Bridge Loan Calculator', () => {
  let validInputs: Record<string, any>;

  beforeEach(() => {
    validInputs = {
      currentHomeValue: 450000,
      currentMortgageBalance: 280000,
      newHomePrice: 650000,
      downPayment: 130000,
      bridgeLoanAmount: 320000,
      bridgeLoanRate: 8.5,
      bridgeLoanTerm: 12,
      expectedSalePrice: 450000,
      expectedSaleTime: 6,
      closingCosts: 5000,
      originationFee: 1.0,
      monthlyRentalIncome: 2500,
      monthlyRentalExpenses: 800,
      alternativeFinancingRate: 6.5
    };
  });

  describe('Calculator Definition', () => {
    it('should have correct basic properties', () => {
      expect(BridgeLoanCalculator.id).toBe('BridgeLoanCalculator');
      expect(BridgeLoanCalculator.name).toBe('Bridge Loan Calculator');
      expect(BridgeLoanCalculator.category).toBe('finance');
      expect(BridgeLoanCalculator.subcategory).toBe('mortgage');
    });

    it('should have all required inputs', () => {
      const inputIds = BridgeLoanCalculator.inputs.map(input => input.id);
      const requiredInputs = [
        'currentHomeValue', 'currentMortgageBalance', 'newHomePrice', 'downPayment',
        'bridgeLoanAmount', 'bridgeLoanRate', 'bridgeLoanTerm', 'expectedSalePrice', 'expectedSaleTime',
        'closingCosts', 'originationFee', 'monthlyRentalIncome', 'monthlyRentalExpenses', 'alternativeFinancingRate'
      ];
      
      requiredInputs.forEach(inputId => {
        expect(inputIds).toContain(inputId);
      });
    });

    it('should have all required outputs', () => {
      const outputIds = BridgeLoanCalculator.outputs.map(output => output.id);
      const requiredOutputs = [
        'monthlyBridgePayment', 'totalBridgeCost', 'totalInterest', 'netProceeds',
        'monthlyCashFlow', 'breakEvenTime', 'totalCostSavings', 'riskAssessment',
        'recommendation', 'paymentSchedule', 'equityUtilization', 'debtToIncomeRatio'
      ];
      
      requiredOutputs.forEach(outputId => {
        expect(outputIds).toContain(outputId);
      });
    });

    it('should have comprehensive examples', () => {
      expect(BridgeLoanCalculator.examples.length).toBeGreaterThan(0);
      BridgeLoanCalculator.examples.forEach(example => {
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
      const result = validateBridgeLoanInputs(incompleteInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should validate current home value range', () => {
      const lowValueInputs = { ...validInputs, currentHomeValue: 25000 };
      const result = validateBridgeLoanInputs(lowValueInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('home value'))).toBe(true);
    });

    it('should validate mortgage balance constraints', () => {
      const highBalanceInputs = { ...validInputs, currentMortgageBalance: 500000 };
      const result = validateBridgeLoanInputs(highBalanceInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('mortgage balance'))).toBe(true);
    });

    it('should validate bridge loan amount constraints', () => {
      const highLoanInputs = { ...validInputs, bridgeLoanAmount: 6000000 };
      const result = validateBridgeLoanInputs(highLoanInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('bridge loan amount'))).toBe(true);
    });

    it('should validate bridge loan rate range', () => {
      const highRateInputs = { ...validInputs, bridgeLoanRate: 20 };
      const result = validateBridgeLoanInputs(highRateInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('bridge loan rate'))).toBe(true);
    });

    it('should validate sale timeline constraints', () => {
      const longTimelineInputs = { ...validInputs, expectedSaleTime: 18, bridgeLoanTerm: 12 };
      const result = validateBridgeLoanInputs(longTimelineInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('sale time'))).toBe(true);
    });

    it('should provide warnings for business rule violations', () => {
      const highEquityInputs = { ...validInputs, bridgeLoanAmount: 150000 };
      const result = validateBridgeLoanInputs(highEquityInputs);
      expect(result.warnings.length).toBeGreaterThan(0);
    });

    it('should accept valid inputs', () => {
      const result = validateBridgeLoanInputs(validInputs);
      expect(result.isValid).toBe(true);
    });
  });

  describe('Formula Calculations', () => {
    it('should calculate bridge loan metrics correctly', () => {
      const metrics = calculateBridgeLoan(validInputs);
      
      expect(metrics.monthlyPayment).toBeGreaterThan(0);
      expect(metrics.totalCost).toBeGreaterThan(0);
      expect(metrics.totalInterest).toBeGreaterThan(0);
      expect(metrics.netProceeds).toBeGreaterThan(0);
      expect(metrics.monthlyCashFlow).toBeDefined();
      expect(metrics.breakEvenTime).toBeGreaterThan(0);
      expect(metrics.equityUtilization).toBeGreaterThan(0);
      expect(metrics.equityUtilization).toBeLessThanOrEqual(100);
      expect(metrics.debtToIncomeRatio).toBeGreaterThan(0);
      expect(metrics.loanToValueRatio).toBeGreaterThan(0);
      expect(metrics.totalFees).toBeGreaterThan(0);
    });

    it('should calculate comparison metrics correctly', () => {
      const bridgeMetrics = calculateBridgeLoan(validInputs);
      const comparison = calculateComparison(validInputs, bridgeMetrics);
      
      expect(comparison.costSavings).toBeDefined();
      expect(comparison.riskAssessment).toBeDefined();
      expect(comparison.recommendation).toBeDefined();
      expect(comparison.alternativeCost).toBeGreaterThan(0);
      expect(comparison.breakevenAnalysis.timeToBreakeven).toBeGreaterThan(0);
      expect(comparison.breakevenAnalysis.totalSavings).toBeDefined();
      expect(comparison.breakevenAnalysis.riskLevel).toBeDefined();
    });

    it('should calculate equity utilization correctly', () => {
      const metrics = calculateBridgeLoan(validInputs);
      const availableEquity = validInputs.currentHomeValue - validInputs.currentMortgageBalance;
      const expectedUtilization = (validInputs.bridgeLoanAmount / availableEquity) * 100;
      
      expect(Math.abs(metrics.equityUtilization - expectedUtilization)).toBeLessThan(0.1);
    });

    it('should calculate net proceeds correctly', () => {
      const metrics = calculateBridgeLoan(validInputs);
      const expectedNetProceeds = validInputs.expectedSalePrice - validInputs.currentMortgageBalance - 
        (validInputs.bridgeLoanAmount - (metrics.monthlyPayment * validInputs.expectedSaleTime - validInputs.bridgeLoanAmount));
      
      expect(Math.abs(metrics.netProceeds - expectedNetProceeds)).toBeLessThan(1000);
    });

    it('should handle zero optional values', () => {
      const zeroOptionalInputs = {
        ...validInputs,
        closingCosts: 0,
        originationFee: 0,
        monthlyRentalIncome: 0,
        monthlyRentalExpenses: 0
      };
      
      const metrics = calculateBridgeLoan(zeroOptionalInputs);
      expect(metrics.totalFees).toBe(0);
      expect(metrics.monthlyCashFlow).toBe(-metrics.monthlyPayment);
    });

    it('should calculate total cost correctly', () => {
      const metrics = calculateBridgeLoan(validInputs);
      const expectedTotalCost = metrics.totalInterest + metrics.totalFees;
      
      expect(Math.abs(metrics.totalCost - expectedTotalCost)).toBeLessThan(1);
    });
  });

  describe('Payment Schedule', () => {
    it('should generate payment schedule', () => {
      const bridgeMetrics = calculateBridgeLoan(validInputs);
      const schedule = generatePaymentSchedule(validInputs, bridgeMetrics);
      
      expect(schedule.payments.length).toBe(validInputs.bridgeLoanTerm);
      expect(schedule.summary).toBeDefined();
      
      // Check first payment
      const firstPayment = schedule.payments[0];
      expect(firstPayment.paymentNumber).toBe(1);
      expect(firstPayment.payment).toBe(bridgeMetrics.monthlyPayment);
      expect(firstPayment.remainingBalance).toBeLessThan(validInputs.bridgeLoanAmount);
      
      // Check last payment
      const lastPayment = schedule.payments[schedule.payments.length - 1];
      expect(lastPayment.remainingBalance).toBeLessThan(0.02); // Should be nearly zero
    });

    it('should have correct payment progression', () => {
      const bridgeMetrics = calculateBridgeLoan(validInputs);
      const schedule = generatePaymentSchedule(validInputs, bridgeMetrics);
      
      for (let i = 1; i < schedule.payments.length; i++) {
        expect(schedule.payments[i].remainingBalance).toBeLessThanOrEqual(schedule.payments[i-1].remainingBalance);
        expect(schedule.payments[i].interest).toBeLessThanOrEqual(schedule.payments[i-1].interest);
        expect(schedule.payments[i].principal).toBeGreaterThanOrEqual(schedule.payments[i-1].principal);
      }
    });

    it('should calculate balance at sale correctly', () => {
      const bridgeMetrics = calculateBridgeLoan(validInputs);
      const schedule = generatePaymentSchedule(validInputs, bridgeMetrics);
      
      const saleMonth = Math.min(validInputs.expectedSaleTime, validInputs.bridgeLoanTerm);
      const balanceAtSale = schedule.payments[saleMonth - 1]?.remainingBalance || 0;
      
      expect(balanceAtSale).toBeGreaterThan(0);
      expect(balanceAtSale).toBeLessThan(validInputs.bridgeLoanAmount);
    });
  });

  describe('Main Calculator Function', () => {
    it('should calculate all outputs correctly', () => {
      const result = BridgeLoanCalculator.calculate(validInputs);
      
      expect(result.monthlyBridgePayment).toBeGreaterThan(0);
      expect(result.totalBridgeCost).toBeGreaterThan(0);
      expect(result.totalInterest).toBeGreaterThan(0);
      expect(result.netProceeds).toBeGreaterThan(0);
      expect(result.monthlyCashFlow).toBeDefined();
      expect(result.breakEvenTime).toBeGreaterThan(0);
      expect(result.totalCostSavings).toBeDefined();
      expect(result.riskAssessment).toBeDefined();
      expect(result.recommendation).toBeDefined();
      expect(result.paymentSchedule).toBeDefined();
      expect(result.equityUtilization).toBeGreaterThan(0);
      expect(result.debtToIncomeRatio).toBeGreaterThan(0);
    });

    it('should throw error for invalid inputs', () => {
      const invalidInputs = { ...validInputs, bridgeLoanAmount: -1000 };
      
      expect(() => {
        BridgeLoanCalculator.calculate(invalidInputs);
      }).toThrow();
    });

    it('should handle edge cases gracefully', () => {
      const edgeCaseInputs = { ...validInputs, bridgeLoanTerm: 3, expectedSaleTime: 2 };
      const result = BridgeLoanCalculator.calculate(edgeCaseInputs);
      
      expect(result.monthlyBridgePayment).toBeGreaterThan(0);
      expect(result.totalBridgeCost).toBeGreaterThan(0);
    });

    it('should match example calculations within tolerance', () => {
      const example = BridgeLoanCalculator.examples[0];
      const result = BridgeLoanCalculator.calculate(example.inputs);
      
      const monthlyPaymentAccuracy = Math.abs((result.monthlyBridgePayment - example.expectedOutputs.monthlyBridgePayment) / example.expectedOutputs.monthlyBridgePayment) * 100;
      const totalCostAccuracy = Math.abs((result.totalBridgeCost - example.expectedOutputs.totalBridgeCost) / example.expectedOutputs.totalBridgeCost) * 100;
      
      expect(monthlyPaymentAccuracy).toBeLessThan(5);
      expect(totalCostAccuracy).toBeLessThan(5);
    });
  });

  describe('Performance', () => {
    it('should complete calculations quickly', () => {
      const startTime = performance.now();
      
      for (let i = 0; i < 100; i++) {
        BridgeLoanCalculator.calculate(validInputs);
      }
      
      const endTime = performance.now();
      const avgTime = (endTime - startTime) / 100;
      
      expect(avgTime).toBeLessThan(10); // Should complete in less than 10ms per calculation
    });
  });

  describe('Business Logic', () => {
    it('should show realistic bridge loan costs', () => {
      const result = BridgeLoanCalculator.calculate(validInputs);
      
      // Bridge loan costs should be reasonable
      const costRatio = (result.totalBridgeCost / validInputs.bridgeLoanAmount) * 100;
      expect(costRatio).toBeGreaterThan(5);
      expect(costRatio).toBeLessThan(25);
    });

    it('should handle different property values correctly', () => {
      const lowValueInputs = { ...validInputs, currentHomeValue: 200000, bridgeLoanAmount: 100000 };
      const highValueInputs = { ...validInputs, currentHomeValue: 1000000, bridgeLoanAmount: 500000 };
      
      const lowValueResult = BridgeLoanCalculator.calculate(lowValueInputs);
      const highValueResult = BridgeLoanCalculator.calculate(highValueInputs);
      
      // Higher loan amounts should have higher payments
      expect(highValueResult.monthlyBridgePayment).toBeGreaterThan(lowValueResult.monthlyBridgePayment);
      
      // But equity utilization should be reasonable in both cases
      expect(lowValueResult.equityUtilization).toBeLessThan(100);
      expect(highValueResult.equityUtilization).toBeLessThan(100);
    });

    it('should handle different interest rates correctly', () => {
      const lowRateInputs = { ...validInputs, bridgeLoanRate: 5.0 };
      const highRateInputs = { ...validInputs, bridgeLoanRate: 12.0 };
      
      const lowRateResult = BridgeLoanCalculator.calculate(lowRateInputs);
      const highRateResult = BridgeLoanCalculator.calculate(highRateInputs);
      
      // Higher rates should have higher payments
      expect(highRateResult.monthlyBridgePayment).toBeGreaterThan(lowRateResult.monthlyBridgePayment);
      
      // Higher rates should have higher total costs
      expect(highRateResult.totalBridgeCost).toBeGreaterThan(lowRateResult.totalBridgeCost);
    });

    it('should calculate break-even time correctly', () => {
      const result = BridgeLoanCalculator.calculate(validInputs);
      
      // Break-even time should be reasonable
      expect(result.breakEvenTime).toBeGreaterThan(0);
      expect(result.breakEvenTime).toBeLessThan(validInputs.bridgeLoanTerm);
    });

    it('should provide meaningful risk assessment', () => {
      const result = BridgeLoanCalculator.calculate(validInputs);
      
      expect(result.riskAssessment).toContain('Risk');
      expect(result.riskAssessment.length).toBeGreaterThan(50);
    });

    it('should provide actionable recommendations', () => {
      const result = BridgeLoanCalculator.calculate(validInputs);
      
      expect(result.recommendation).toContain('Consult');
      expect(result.recommendation.length).toBeGreaterThan(100);
    });
  });
});
