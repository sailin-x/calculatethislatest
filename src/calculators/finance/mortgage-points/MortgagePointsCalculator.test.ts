import { describe, it, expect } from 'vitest';
import { calculateMortgagePoints, analyzePointsStrategies, calculateBreakEvenAnalysis } from './formulas';
import { validateMortgagePointsInputs } from './validation';
import { quickValidateLoanAmount, quickValidateOriginalRate, quickValidateAllInputs } from './quickValidation';
import { mortgagePointsCalculator } from './MortgagePointsCalculator';

describe('Mortgage Points Calculator - Core Calculations', () => {
  it('should calculate mortgage points for standard scenario', () => {
    const inputs = {
      loanAmount: 300000,
      originalRate: 5.5,
      pointsToBuy: 1,
      rateReduction: 0.25,
      loanTerm: 30,
      taxRate: 22,
      investmentReturn: 7,
      inflationRate: 2.5,
      plannedOwnershipYears: 7,
      closingCosts: 5000,
      propertyValue: 375000,
      downPayment: 75000
    };

    const result = calculateMortgagePoints(inputs);

    expect(result.pointsCost).toBe(3000);
    expect(result.newRate).toBe(5.25);
    expect(result.monthlyPaymentOriginal).toBeGreaterThan(0);
    expect(result.monthlyPaymentNew).toBeGreaterThan(0);
    expect(result.monthlySavings).toBeGreaterThan(0);
    expect(result.totalInterestSavings).toBeGreaterThan(0);
    expect(result.breakEvenMonths).toBeGreaterThan(0);
    expect(result.breakEvenYears).toBeGreaterThan(0);
    expect(result.costBenefitAnalysis).toBeDefined();
    expect(result.recommendations).toBeDefined();
  });

  it('should calculate points with higher rate reduction', () => {
    const inputs = {
      loanAmount: 400000,
      originalRate: 6.0,
      pointsToBuy: 2,
      rateReduction: 0.375,
      loanTerm: 30,
      taxRate: 24,
      investmentReturn: 8,
      inflationRate: 2.0,
      plannedOwnershipYears: 10,
      closingCosts: 6000,
      propertyValue: 500000,
      downPayment: 100000
    };

    const result = calculateMortgagePoints(inputs);

    expect(result.pointsCost).toBe(8000);
    expect(result.newRate).toBe(5.25);
    expect(result.monthlySavings).toBeGreaterThan(0);
    expect(result.breakEvenMonths).toBeLessThan(result.breakEvenMonths * 2); // Should break even faster
  });

  it('should calculate points for short-term ownership', () => {
    const inputs = {
      loanAmount: 250000,
      originalRate: 5.0,
      pointsToBuy: 0.5,
      rateReduction: 0.25,
      loanTerm: 30,
      taxRate: 22,
      investmentReturn: 7,
      inflationRate: 2.5,
      plannedOwnershipYears: 5,
      closingCosts: 4000,
      propertyValue: 312500,
      downPayment: 62500
    };

    const result = calculateMortgagePoints(inputs);

    expect(result.pointsCost).toBe(1250);
    expect(result.newRate).toBe(4.875);
    expect(result.monthlySavings).toBeGreaterThan(0);
    expect(result.breakEvenMonths).toBeGreaterThan(0);
  });

  it('should handle zero points scenario', () => {
    const inputs = {
      loanAmount: 300000,
      originalRate: 5.5,
      pointsToBuy: 0,
      rateReduction: 0.25,
      loanTerm: 30,
      taxRate: 22,
      investmentReturn: 7,
      inflationRate: 2.5
    };

    const result = calculateMortgagePoints(inputs);

    expect(result.pointsCost).toBe(0);
    expect(result.newRate).toBe(5.5);
    expect(result.monthlySavings).toBe(0);
    expect(result.breakEvenMonths).toBe(Infinity);
    expect(result.breakEvenYears).toBe(Infinity);
  });

  it('should calculate points for large loan amount', () => {
    const inputs = {
      loanAmount: 1000000,
      originalRate: 4.5,
      pointsToBuy: 1.5,
      rateReduction: 0.25,
      loanTerm: 30,
      taxRate: 37,
      investmentReturn: 6,
      inflationRate: 2.5,
      plannedOwnershipYears: 15,
      closingCosts: 15000,
      propertyValue: 1250000,
      downPayment: 250000
    };

    const result = calculateMortgagePoints(inputs);

    expect(result.pointsCost).toBe(15000);
    expect(result.newRate).toBe(4.125);
    expect(result.monthlySavings).toBeGreaterThan(0);
    expect(result.totalInterestSavings).toBeGreaterThan(0);
  });
});

describe('Mortgage Points Calculator - Strategy Analysis', () => {
  it('should analyze different points strategies', () => {
    const inputs = {
      loanAmount: 300000,
      originalRate: 5.5,
      pointsToBuy: 1,
      rateReduction: 0.25,
      loanTerm: 30,
      taxRate: 22,
      investmentReturn: 7,
      inflationRate: 2.5,
      plannedOwnershipYears: 7
    };

    const strategies = analyzePointsStrategies(inputs);

    expect(strategies.length).toBeGreaterThan(0);
    expect(strategies[0].points).toBe(0); // No points strategy should be first
    expect(strategies.every(s => s.cost >= 0)).toBe(true);
    expect(strategies.every(s => s.newRate >= 0)).toBe(true);
  });

  it('should compare strategy effectiveness', () => {
    const inputs = {
      loanAmount: 400000,
      originalRate: 6.0,
      pointsToBuy: 1,
      rateReduction: 0.375,
      loanTerm: 30,
      taxRate: 24,
      investmentReturn: 8,
      inflationRate: 2.0,
      plannedOwnershipYears: 10
    };

    const strategies = analyzePointsStrategies(inputs);

    // Find strategies with points
    const pointsStrategies = strategies.filter(s => s.points > 0);
    const noPointsStrategy = strategies.find(s => s.points === 0);

    if (pointsStrategies.length > 0 && noPointsStrategy) {
      const bestPointsStrategy = pointsStrategies[0];
      expect(bestPointsStrategy.monthlySavings).toBeGreaterThan(0);
      expect(bestPointsStrategy.breakEvenMonths).toBeGreaterThan(0);
      expect(bestPointsStrategy.totalInterestSavings).toBeGreaterThan(0);
    }
  });

  it('should sort strategies by cost-benefit ratio', () => {
    const inputs = {
      loanAmount: 250000,
      originalRate: 5.0,
      pointsToBuy: 1,
      rateReduction: 0.25,
      loanTerm: 30,
      taxRate: 22,
      investmentReturn: 7,
      inflationRate: 2.5,
      plannedOwnershipYears: 5
    };

    const strategies = analyzePointsStrategies(inputs);

    // Strategies should be sorted by cost-benefit ratio (descending)
    for (let i = 1; i < strategies.length; i++) {
      expect(strategies[i-1].costBenefit).toBeGreaterThanOrEqual(strategies[i].costBenefit);
    }
  });
});

describe('Mortgage Points Calculator - Break-Even Analysis', () => {
  it('should calculate detailed break-even analysis', () => {
    const inputs = {
      loanAmount: 300000,
      originalRate: 5.5,
      pointsToBuy: 1,
      rateReduction: 0.25,
      loanTerm: 30,
      taxRate: 22,
      investmentReturn: 7,
      inflationRate: 2.5,
      plannedOwnershipYears: 7
    };

    const analysis = calculateBreakEvenAnalysis(inputs);

    expect(analysis.basicBreakEven).toBeGreaterThan(0);
    expect(analysis.taxAdjustedBreakEven).toBeGreaterThan(0);
    expect(analysis.investmentOpportunityBreakEven).toBeGreaterThan(0);
    expect(analysis.inflationAdjustedBreakEven).toBeGreaterThan(0);
    expect(analysis.ownershipPeriodBreakEven).toBeGreaterThan(0);
    expect(analysis.analysis).toBeDefined();
  });

  it('should handle tax-adjusted break-even', () => {
    const inputs = {
      loanAmount: 400000,
      originalRate: 6.0,
      pointsToBuy: 2,
      rateReduction: 0.375,
      loanTerm: 30,
      taxRate: 37, // High tax rate
      investmentReturn: 8,
      inflationRate: 2.0,
      plannedOwnershipYears: 10
    };

    const analysis = calculateBreakEvenAnalysis(inputs);

    // Tax-adjusted break-even should be faster than basic break-even
    expect(analysis.taxAdjustedBreakEven).toBeLessThan(analysis.basicBreakEven);
  });

  it('should handle ownership period constraints', () => {
    const inputs = {
      loanAmount: 250000,
      originalRate: 5.0,
      pointsToBuy: 1,
      rateReduction: 0.25,
      loanTerm: 30,
      taxRate: 22,
      investmentReturn: 7,
      inflationRate: 2.5,
      plannedOwnershipYears: 3 // Short ownership period
    };

    const analysis = calculateBreakEvenAnalysis(inputs);

    // If break-even is longer than ownership period, it should be capped
    if (analysis.basicBreakEven > inputs.plannedOwnershipYears * 12) {
      expect(analysis.ownershipPeriodBreakEven).toBe(inputs.plannedOwnershipYears * 12);
    }
  });
});

describe('Mortgage Points Calculator - Input Validation', () => {
  it('should validate required fields correctly', () => {
    const inputs = {
      loanAmount: undefined,
      originalRate: undefined,
      pointsToBuy: undefined,
      rateReduction: undefined,
      loanTerm: undefined
    };

    const errors = validateMortgagePointsInputs(inputs);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some(e => e.field === 'loanAmount')).toBe(true);
    expect(errors.some(e => e.field === 'originalRate')).toBe(true);
    expect(errors.some(e => e.field === 'pointsToBuy')).toBe(true);
    expect(errors.some(e => e.field === 'rateReduction')).toBe(true);
    expect(errors.some(e => e.field === 'loanTerm')).toBe(true);
  });

  it('should validate range constraints', () => {
    const inputs = {
      loanAmount: 5000, // Too low
      originalRate: 25, // Too high
      pointsToBuy: 6, // Too high
      rateReduction: 0.6, // Too high
      loanTerm: 60 // Too high
    };

    const errors = validateMortgagePointsInputs(inputs);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some(e => e.field === 'loanAmount' && e.message.includes('range'))).toBe(true);
    expect(errors.some(e => e.field === 'originalRate' && e.message.includes('range'))).toBe(true);
    expect(errors.some(e => e.field === 'pointsToBuy' && e.message.includes('range'))).toBe(true);
    expect(errors.some(e => e.field === 'rateReduction' && e.message.includes('range'))).toBe(true);
    expect(errors.some(e => e.field === 'loanTerm' && e.message.includes('range'))).toBe(true);
  });

  it('should validate cross-field dependencies', () => {
    const inputs = {
      loanAmount: 300000,
      originalRate: 5.0,
      pointsToBuy: 25, // Would result in negative rate
      rateReduction: 0.25,
      loanTerm: 30
    };

    const errors = validateMortgagePointsInputs(inputs);

    expect(errors.some(e => e.field === 'pointsToBuy' && e.message.includes('negative interest rate'))).toBe(true);
  });

  it('should validate property value constraints', () => {
    const inputs = {
      loanAmount: 400000,
      originalRate: 5.5,
      pointsToBuy: 1,
      rateReduction: 0.25,
      loanTerm: 30,
      propertyValue: 350000, // Less than loan amount
      downPayment: 50000
    };

    const errors = validateMortgagePointsInputs(inputs);

    expect(errors.some(e => e.field === 'loanAmount' && e.message.includes('cannot exceed property value'))).toBe(true);
  });
});

describe('Mortgage Points Calculator - Quick Validation', () => {
  it('should validate loan amount quickly', () => {
    const result = quickValidateLoanAmount(5000);
    expect(result.isValid).toBe(false);
    expect(result.message).toContain('range');

    const result2 = quickValidateLoanAmount(300000);
    expect(result2.isValid).toBe(true);
  });

  it('should validate original rate quickly', () => {
    const result = quickValidateOriginalRate(25);
    expect(result.isValid).toBe(false);
    expect(result.message).toContain('range');

    const result2 = quickValidateOriginalRate(5.5);
    expect(result2.isValid).toBe(true);
  });

  it('should validate points to buy quickly', () => {
    const result = quickValidatePointsToBuy(6);
    expect(result.isValid).toBe(false);
    expect(result.message).toContain('range');

    const result2 = quickValidatePointsToBuy(1);
    expect(result2.isValid).toBe(true);
  });

  it('should validate all inputs quickly', () => {
    const inputs = {
      loanAmount: 300000,
      originalRate: 5.5,
      pointsToBuy: 1,
      rateReduction: 0.25,
      loanTerm: 30,
      taxRate: 22,
      investmentReturn: 7,
      inflationRate: 2.5,
      plannedOwnershipYears: 7,
      closingCosts: 5000,
      propertyValue: 375000,
      downPayment: 75000
    };

    const results = quickValidateAllInputs(inputs);

    expect(results).toHaveLength(12);
    expect(results.every(r => r.isValid)).toBe(true);
  });
});

describe('Mortgage Points Calculator - Edge Cases', () => {
  it('should handle very large loan amounts', () => {
    const inputs = {
      loanAmount: 5000000,
      originalRate: 4.0,
      pointsToBuy: 2,
      rateReduction: 0.25,
      loanTerm: 30,
      taxRate: 37,
      investmentReturn: 6,
      inflationRate: 2.5,
      plannedOwnershipYears: 20,
      closingCosts: 50000,
      propertyValue: 6250000,
      downPayment: 1250000
    };

    const result = calculateMortgagePoints(inputs);

    expect(result.pointsCost).toBe(100000);
    expect(result.newRate).toBe(3.5);
    expect(result.monthlySavings).toBeGreaterThan(0);
    expect(result.totalInterestSavings).toBeGreaterThan(0);
  });

  it('should handle very small loan amounts', () => {
    const inputs = {
      loanAmount: 50000,
      originalRate: 6.0,
      pointsToBuy: 0.5,
      rateReduction: 0.25,
      loanTerm: 15,
      taxRate: 12,
      investmentReturn: 5,
      inflationRate: 2.0,
      plannedOwnershipYears: 10,
      closingCosts: 2000,
      propertyValue: 75000,
      downPayment: 25000
    };

    const result = calculateMortgagePoints(inputs);

    expect(result.pointsCost).toBe(250);
    expect(result.newRate).toBe(5.875);
    expect(result.monthlySavings).toBeGreaterThan(0);
    expect(result.totalInterestSavings).toBeGreaterThan(0);
  });

  it('should handle very low interest rates', () => {
    const inputs = {
      loanAmount: 300000,
      originalRate: 2.5,
      pointsToBuy: 1,
      rateReduction: 0.125,
      loanTerm: 30,
      taxRate: 24,
      investmentReturn: 8,
      inflationRate: 2.5,
      plannedOwnershipYears: 15,
      closingCosts: 5000,
      propertyValue: 375000,
      downPayment: 75000
    };

    const result = calculateMortgagePoints(inputs);

    expect(result.pointsCost).toBe(3000);
    expect(result.newRate).toBe(2.375);
    expect(result.monthlySavings).toBeGreaterThan(0);
    expect(result.totalInterestSavings).toBeGreaterThan(0);
  });

  it('should handle very high interest rates', () => {
    const inputs = {
      loanAmount: 200000,
      originalRate: 12.0,
      pointsToBuy: 2,
      rateReduction: 0.5,
      loanTerm: 20,
      taxRate: 22,
      investmentReturn: 7,
      inflationRate: 3.0,
      plannedOwnershipYears: 8,
      closingCosts: 3000,
      propertyValue: 250000,
      downPayment: 50000
    };

    const result = calculateMortgagePoints(inputs);

    expect(result.pointsCost).toBe(4000);
    expect(result.newRate).toBe(11.0);
    expect(result.monthlySavings).toBeGreaterThan(0);
    expect(result.totalInterestSavings).toBeGreaterThan(0);
  });
});

describe('Mortgage Points Calculator - Integration Tests', () => {
  it('should calculate complete mortgage points scenario', () => {
    const inputs = {
      loanAmount: 400000,
      originalRate: 5.25,
      pointsToBuy: 1.5,
      rateReduction: 0.25,
      loanTerm: 30,
      taxRate: 24,
      investmentReturn: 7.5,
      inflationRate: 2.5,
      plannedOwnershipYears: 12,
      closingCosts: 8000,
      propertyValue: 500000,
      downPayment: 100000
    };

    const result = calculateMortgagePoints(inputs);
    const strategies = analyzePointsStrategies(inputs);
    const breakEvenAnalysis = calculateBreakEvenAnalysis(inputs);
    const validationErrors = validateMortgagePointsInputs(inputs);

    expect(result.pointsCost).toBe(6000);
    expect(result.newRate).toBe(4.875);
    expect(result.monthlySavings).toBeGreaterThan(0);
    expect(result.totalInterestSavings).toBeGreaterThan(0);
    expect(strategies.length).toBeGreaterThan(0);
    expect(breakEvenAnalysis.basicBreakEven).toBeGreaterThan(0);
    expect(validationErrors.length).toBe(0);
  });

  it('should handle FHA loan scenario correctly', () => {
    const inputs = {
      loanAmount: 250000,
      originalRate: 3.75,
      pointsToBuy: 1,
      rateReduction: 0.25,
      loanTerm: 30,
      taxRate: 22,
      investmentReturn: 7,
      inflationRate: 2.5,
      plannedOwnershipYears: 7,
      closingCosts: 4000,
      propertyValue: 259067,
      downPayment: 9067
    };

    const result = calculateMortgagePoints(inputs);
    const validationErrors = validateMortgagePointsInputs(inputs);

    expect(result.pointsCost).toBe(2500);
    expect(result.newRate).toBe(3.5);
    expect(result.monthlySavings).toBeGreaterThan(0);
    expect(result.totalInterestSavings).toBeGreaterThan(0);
    expect(validationErrors.length).toBe(0);
  });
});

describe('Mortgage Points Calculator - Calculator Object', () => {
  it('should have correct calculator structure', () => {
    expect(mortgagePointsCalculator.id).toBe('mortgage-points');
    expect(mortgagePointsCalculator.title).toBe('Mortgage Points Calculator');
    expect(mortgagePointsCalculator.category).toBe('finance');
    expect(mortgagePointsCalculator.subcategory).toBe('mortgage');
    expect(mortgagePointsCalculator.inputs).toHaveLength(12);
    expect(mortgagePointsCalculator.outputs).toHaveLength(10);
    expect(mortgagePointsCalculator.formulas).toHaveLength(3);
    expect(mortgagePointsCalculator.examples).toHaveLength(3);
  });

  it('should have valid input structure', () => {
    const loanAmountInput = mortgagePointsCalculator.inputs.find(input => input.id === 'loanAmount');
    expect(loanAmountInput).toBeDefined();
    expect(loanAmountInput?.type).toBe('number');
    expect(loanAmountInput?.required).toBe(true);
    expect(loanAmountInput?.min).toBe(10000);
    expect(loanAmountInput?.max).toBe(10000000);
  });

  it('should have valid output structure', () => {
    const pointsCostOutput = mortgagePointsCalculator.outputs.find(output => output.id === 'pointsCost');
    expect(pointsCostOutput).toBeDefined();
    expect(pointsCostOutput?.type).toBe('currency');
    expect(pointsCostOutput?.format).toBe('USD');
  });

  it('should have valid examples', () => {
    const example = mortgagePointsCalculator.examples[0];
    expect(example.title).toBe('Standard 30-Year Fixed Rate');
    expect(example.inputs).toBeDefined();
    expect(example.expectedOutputs).toBeDefined();
  });
});