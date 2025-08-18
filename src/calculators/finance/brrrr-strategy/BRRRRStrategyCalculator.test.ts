import { describe, it, expect, beforeEach } from 'vitest';
import { BRRRRStrategyCalculator } from './BRRRRStrategyCalculator';
import { calculateBRRRRStrategy, calculateRefinanceAnalysis, generateInvestmentTimeline } from './formulas';
import { validateBRRRRStrategyInputs } from './validation';

describe('BRRRR Strategy Calculator', () => {
  let validInputs: Record<string, any>;

  beforeEach(() => {
    validInputs = {
      purchasePrice: 150000,
      downPayment: 30000,
      purchaseLoanRate: 7.5,
      purchaseLoanTerm: 30,
      rehabCost: 25000,
      rehabTime: 3,
      afterRepairValue: 220000,
      monthlyRent: 1800,
      monthlyExpenses: 400,
      refinanceRate: 6.5,
      refinanceTerm: 30,
      refinanceLTV: 75,
      closingCosts: 8000,
      vacancyRate: 5,
      propertyManagement: 8,
      appreciationRate: 3,
      inflationRate: 2.5
    };
  });

  describe('Calculator Definition', () => {
    it('should have correct basic properties', () => {
      expect(BRRRRStrategyCalculator.id).toBe('brrrr-strategy-calculator');
      expect(BRRRRStrategyCalculator.name).toBe('BRRRR Strategy Calculator');
      expect(BRRRRStrategyCalculator.category).toBe('finance');
      expect(BRRRRStrategyCalculator.subcategory).toBe('investment');
    });

    it('should have all required inputs', () => {
      const inputIds = BRRRRStrategyCalculator.inputs.map(input => input.id);
      const requiredInputs = [
        'purchasePrice', 'downPayment', 'purchaseLoanRate', 'purchaseLoanTerm',
        'rehabCost', 'rehabTime', 'afterRepairValue', 'monthlyRent', 'monthlyExpenses',
        'refinanceRate', 'refinanceTerm', 'refinanceLTV', 'closingCosts', 'vacancyRate',
        'propertyManagement', 'appreciationRate', 'inflationRate'
      ];
      
      requiredInputs.forEach(inputId => {
        expect(inputIds).toContain(inputId);
      });
    });

    it('should have all required outputs', () => {
      const outputIds = BRRRRStrategyCalculator.outputs.map(output => output.id);
      const requiredOutputs = [
        'totalInvestment', 'monthlyPayment', 'monthlyCashFlow', 'cashOnCashReturn',
        'capRate', 'refinanceProceeds', 'equityExtracted', 'totalROI', 'breakEvenTime',
        'investmentTimeline', 'riskAssessment', 'scalabilityAnalysis'
      ];
      
      requiredOutputs.forEach(outputId => {
        expect(outputIds).toContain(outputId);
      });
    });

    it('should have comprehensive examples', () => {
      expect(BRRRRStrategyCalculator.examples.length).toBeGreaterThan(0);
      BRRRRStrategyCalculator.examples.forEach(example => {
        expect(example.name).toBeDefined();
        expect(example.description).toBeDefined();
        expect(example.inputs).toBeDefined();
        expect(example.expectedOutputs).toBeDefined();
      });
    });
  });

  describe('Input Validation', () => {
    it('should validate required fields', () => {
      const incompleteInputs = { purchasePrice: 150000 };
      const result = validateBRRRRStrategyInputs(incompleteInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should validate purchase price range', () => {
      const lowPriceInputs = { ...validInputs, purchasePrice: 25000 };
      const result = validateBRRRRStrategyInputs(lowPriceInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('purchase price'))).toBe(true);
    });

    it('should validate down payment constraints', () => {
      const highDownPaymentInputs = { ...validInputs, downPayment: 200000 };
      const result = validateBRRRRStrategyInputs(highDownPaymentInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('down payment'))).toBe(true);
    });

    it('should validate rehab cost range', () => {
      const highRehabInputs = { ...validInputs, rehabCost: 600000 };
      const result = validateBRRRRStrategyInputs(highRehabInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('rehab cost'))).toBe(true);
    });

    it('should validate refinance LTV range', () => {
      const highLTVInputs = { ...validInputs, refinanceLTV: 90 };
      const result = validateBRRRRStrategyInputs(highLTVInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('LTV'))).toBe(true);
    });

    it('should provide warnings for business rule violations', () => {
      const highRehabRatioInputs = { ...validInputs, rehabCost: 100000 };
      const result = validateBRRRRStrategyInputs(highRehabRatioInputs);
      expect(result.warnings.length).toBeGreaterThan(0);
    });

    it('should accept valid inputs', () => {
      const result = validateBRRRRStrategyInputs(validInputs);
      expect(result.isValid).toBe(true);
    });
  });

  describe('Formula Calculations', () => {
    it('should calculate BRRRR metrics correctly', () => {
      const metrics = calculateBRRRRStrategy(validInputs);
      
      expect(metrics.totalInvestment).toBeGreaterThan(0);
      expect(metrics.monthlyPayment).toBeGreaterThan(0);
      expect(metrics.monthlyCashFlow).toBeDefined();
      expect(metrics.cashOnCashReturn).toBeDefined();
      expect(metrics.capRate).toBeGreaterThan(0);
      expect(metrics.totalROI).toBeDefined();
      expect(metrics.breakEvenTime).toBeGreaterThan(0);
      expect(metrics.riskAssessment).toBeDefined();
      expect(metrics.netOperatingIncome).toBeGreaterThan(0);
      expect(metrics.annualCashFlow).toBeDefined();
      expect(metrics.purchaseLoanAmount).toBeGreaterThan(0);
      expect(metrics.purchaseMonthlyPayment).toBeGreaterThan(0);
    });

    it('should calculate refinance analysis correctly', () => {
      const brrrrMetrics = calculateBRRRRStrategy(validInputs);
      const refinanceAnalysis = calculateRefinanceAnalysis(validInputs, brrrrMetrics);
      
      expect(refinanceAnalysis.refinanceProceeds).toBeGreaterThan(0);
      expect(refinanceAnalysis.equityExtracted).toBeGreaterThan(0);
      expect(refinanceAnalysis.refinanceLoanAmount).toBeGreaterThan(0);
      expect(refinanceAnalysis.refinanceMonthlyPayment).toBeGreaterThan(0);
      expect(refinanceAnalysis.scalabilityAnalysis).toBeDefined();
      expect(refinanceAnalysis.remainingLoanBalance).toBeGreaterThan(0);
      expect(refinanceAnalysis.equityPosition).toBeGreaterThan(0);
    });

    it('should calculate total investment correctly', () => {
      const metrics = calculateBRRRRStrategy(validInputs);
      const expectedTotalInvestment = validInputs.downPayment + validInputs.rehabCost + validInputs.closingCosts;
      
      expect(Math.abs(metrics.totalInvestment - expectedTotalInvestment)).toBeLessThan(1);
    });

    it('should calculate cash-on-cash return correctly', () => {
      const metrics = calculateBRRRRStrategy(validInputs);
      const expectedCocReturn = (metrics.annualCashFlow / metrics.totalInvestment) * 100;
      
      expect(Math.abs(metrics.cashOnCashReturn - expectedCocReturn)).toBeLessThan(0.1);
    });

    it('should calculate cap rate correctly', () => {
      const metrics = calculateBRRRRStrategy(validInputs);
      const expectedCapRate = (metrics.netOperatingIncome / validInputs.afterRepairValue) * 100;
      
      expect(Math.abs(metrics.capRate - expectedCapRate)).toBeLessThan(0.1);
    });

    it('should handle zero optional values', () => {
      const zeroOptionalInputs = {
        ...validInputs,
        closingCosts: 0,
        vacancyRate: 0,
        propertyManagement: 0,
        appreciationRate: 0,
        inflationRate: 0
      };
      
      const metrics = calculateBRRRRStrategy(zeroOptionalInputs);
      expect(metrics.totalInvestment).toBe(validInputs.downPayment + validInputs.rehabCost);
    });

    it('should calculate break-even time correctly', () => {
      const metrics = calculateBRRRRStrategy(validInputs);
      const expectedBreakEvenTime = metrics.totalInvestment / metrics.monthlyCashFlow;
      
      expect(Math.abs(metrics.breakEvenTime - expectedBreakEvenTime)).toBeLessThan(1);
    });
  });

  describe('Investment Timeline', () => {
    it('should generate investment timeline', () => {
      const brrrrMetrics = calculateBRRRRStrategy(validInputs);
      const timeline = generateInvestmentTimeline(validInputs, brrrrMetrics);
      
      expect(timeline.phases.length).toBe(4); // Purchase, Rehab, Rent, Refinance
      expect(timeline.summary).toBeDefined();
      
      // Check phases
      const phaseNames = timeline.phases.map(phase => phase.phase);
      expect(phaseNames).toContain('Purchase');
      expect(phaseNames).toContain('Rehab');
      expect(phaseNames).toContain('Rent');
      expect(phaseNames).toContain('Refinance');
    });

    it('should have correct phase durations', () => {
      const brrrrMetrics = calculateBRRRRStrategy(validInputs);
      const timeline = generateInvestmentTimeline(validInputs, brrrrMetrics);
      
      const rehabPhase = timeline.phases.find(phase => phase.phase === 'Rehab');
      expect(rehabPhase?.duration).toBe(validInputs.rehabTime);
      
      const totalDuration = timeline.phases.reduce((sum, phase) => sum + phase.duration, 0);
      expect(totalDuration).toBe(2 + validInputs.rehabTime); // Purchase(1) + Rehab + Rent(1) + Refinance(1)
    });

    it('should have correct phase costs', () => {
      const brrrrMetrics = calculateBRRRRStrategy(validInputs);
      const timeline = generateInvestmentTimeline(validInputs, brrrrMetrics);
      
      const purchasePhase = timeline.phases.find(phase => phase.phase === 'Purchase');
      const expectedPurchaseCost = validInputs.downPayment + (validInputs.closingCosts * 0.5);
      expect(purchasePhase?.cost).toBe(expectedPurchaseCost);
      
      const rehabPhase = timeline.phases.find(phase => phase.phase === 'Rehab');
      expect(rehabPhase?.cost).toBe(validInputs.rehabCost);
    });
  });

  describe('Main Calculator Function', () => {
    it('should calculate all outputs correctly', () => {
      const result = BRRRRStrategyCalculator.calculate(validInputs);
      
      expect(result.totalInvestment).toBeGreaterThan(0);
      expect(result.monthlyPayment).toBeGreaterThan(0);
      expect(result.monthlyCashFlow).toBeDefined();
      expect(result.cashOnCashReturn).toBeDefined();
      expect(result.capRate).toBeGreaterThan(0);
      expect(result.refinanceProceeds).toBeGreaterThan(0);
      expect(result.equityExtracted).toBeGreaterThan(0);
      expect(result.totalROI).toBeDefined();
      expect(result.breakEvenTime).toBeGreaterThan(0);
      expect(result.investmentTimeline).toBeDefined();
      expect(result.riskAssessment).toBeDefined();
      expect(result.scalabilityAnalysis).toBeDefined();
    });

    it('should throw error for invalid inputs', () => {
      const invalidInputs = { ...validInputs, purchasePrice: -1000 };
      
      expect(() => {
        BRRRRStrategyCalculator.calculate(invalidInputs);
      }).toThrow();
    });

    it('should handle edge cases gracefully', () => {
      const edgeCaseInputs = { ...validInputs, rehabTime: 1, rehabCost: 5000 };
      const result = BRRRRStrategyCalculator.calculate(edgeCaseInputs);
      
      expect(result.totalInvestment).toBeGreaterThan(0);
      expect(result.monthlyCashFlow).toBeDefined();
    });

    it('should match example calculations within tolerance', () => {
      const example = BRRRRStrategyCalculator.examples[0];
      const result = BRRRRStrategyCalculator.calculate(example.inputs);
      
      const totalInvestmentAccuracy = Math.abs((result.totalInvestment - example.expectedOutputs.totalInvestment) / example.expectedOutputs.totalInvestment) * 100;
      const cashFlowAccuracy = Math.abs((result.monthlyCashFlow - example.expectedOutputs.monthlyCashFlow) / example.expectedOutputs.monthlyCashFlow) * 100;
      
      expect(totalInvestmentAccuracy).toBeLessThan(5);
      expect(cashFlowAccuracy).toBeLessThan(5);
    });
  });

  describe('Performance', () => {
    it('should complete calculations quickly', () => {
      const startTime = performance.now();
      
      for (let i = 0; i < 100; i++) {
        BRRRRStrategyCalculator.calculate(validInputs);
      }
      
      const endTime = performance.now();
      const avgTime = (endTime - startTime) / 100;
      
      expect(avgTime).toBeLessThan(10); // Should complete in less than 10ms per calculation
    });
  });

  describe('Business Logic', () => {
    it('should show realistic BRRRR returns', () => {
      const result = BRRRRStrategyCalculator.calculate(validInputs);
      
      // Cash-on-cash return should be reasonable
      expect(result.cashOnCashReturn).toBeGreaterThan(0);
      expect(result.cashOnCashReturn).toBeLessThan(25); // Very high returns may be unrealistic
    });

    it('should handle different property values correctly', () => {
      const lowValueInputs = { ...validInputs, purchasePrice: 80000, afterRepairValue: 120000 };
      const highValueInputs = { ...validInputs, purchasePrice: 400000, afterRepairValue: 600000 };
      
      const lowValueResult = BRRRRStrategyCalculator.calculate(lowValueInputs);
      const highValueResult = BRRRRStrategyCalculator.calculate(highValueInputs);
      
      // Higher value properties should have higher payments
      expect(highValueResult.monthlyPayment).toBeGreaterThan(lowValueResult.monthlyPayment);
      
      // But cash-on-cash returns should be reasonable in both cases
      expect(lowValueResult.cashOnCashReturn).toBeGreaterThan(0);
      expect(highValueResult.cashOnCashReturn).toBeGreaterThan(0);
    });

    it('should handle different rehab costs correctly', () => {
      const lowRehabInputs = { ...validInputs, rehabCost: 10000 };
      const highRehabInputs = { ...validInputs, rehabCost: 50000 };
      
      const lowRehabResult = BRRRRStrategyCalculator.calculate(lowRehabInputs);
      const highRehabResult = BRRRRStrategyCalculator.calculate(highRehabInputs);
      
      // Higher rehab costs should result in higher total investment
      expect(highRehabResult.totalInvestment).toBeGreaterThan(lowRehabResult.totalInvestment);
      
      // But cash-on-cash returns should be reasonable
      expect(lowRehabResult.cashOnCashReturn).toBeGreaterThan(0);
      expect(highRehabResult.cashOnCashReturn).toBeGreaterThan(0);
    });

    it('should calculate equity extraction correctly', () => {
      const result = BRRRRStrategyCalculator.calculate(validInputs);
      
      // Equity extraction should be reasonable
      expect(result.equityExtracted).toBeGreaterThan(0);
      expect(result.equityExtracted).toBeLessThan(100); // Cannot extract more than 100%
    });

    it('should provide meaningful risk assessment', () => {
      const result = BRRRRStrategyCalculator.calculate(validInputs);
      
      expect(result.riskAssessment).toContain('Risk');
      expect(result.riskAssessment.length).toBeGreaterThan(50);
    });

    it('should provide actionable scalability analysis', () => {
      const result = BRRRRStrategyCalculator.calculate(validInputs);
      
      expect(result.scalabilityAnalysis).toContain('equity');
      expect(result.scalabilityAnalysis.length).toBeGreaterThan(100);
    });
  });
});
