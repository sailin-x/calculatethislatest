import { describe, it, expect } from 'vitest';
import { calculateMortgagePayoff, analyzePayoffStrategies, calculatePayoffScenarios } from './formulas';
import { validateMortgagePayoffInputs } from './validation';
import { quickValidateCurrentBalance, quickValidateInterestRate, quickValidateAllInputs } from './quickValidation';
import { mortgagePayoffCalculator } from './MortgagePayoffCalculator';

describe('Mortgage Payoff Calculator - Core Calculations', () => {
  it('should calculate standard mortgage payoff', () => {
    const inputs = {
      currentBalance: 250000,
      interestRate: 4.5,
      remainingTerm: 25,
      monthlyPayment: 1500,
      extraPayment: 0,
      lumpSumPayment: 0,
      payoffStrategy: 'standard',
      propertyValue: 350000,
      taxRate: 22,
      investmentReturn: 7,
      inflationRate: 2.5
    };

    const result = calculateMortgagePayoff(inputs);

    expect(result.payoffDate).toBeDefined();
    expect(result.totalInterest).toBeGreaterThan(0);
    expect(result.interestSavings).toBe(0); // No savings with standard payment
    expect(result.timeSaved).toBe(0); // No time saved with standard payment
    expect(result.monthlyPaymentNew).toBe(1500);
    expect(result.payoffSchedule.length).toBeGreaterThan(0);
    expect(result.costBenefitAnalysis).toBeDefined();
    expect(result.recommendations).toBeDefined();
  });

  it('should calculate extra monthly payment strategy', () => {
    const inputs = {
      currentBalance: 250000,
      interestRate: 4.5,
      remainingTerm: 25,
      monthlyPayment: 1500,
      extraPayment: 200,
      lumpSumPayment: 0,
      payoffStrategy: 'extra-monthly',
      propertyValue: 350000,
      taxRate: 22,
      investmentReturn: 7,
      inflationRate: 2.5
    };

    const result = calculateMortgagePayoff(inputs);

    expect(result.payoffDate).toBeDefined();
    expect(result.totalInterest).toBeGreaterThan(0);
    expect(result.interestSavings).toBeGreaterThan(0);
    expect(result.timeSaved).toBeGreaterThan(0);
    expect(result.monthlyPaymentNew).toBe(1700);
    expect(result.payoffSchedule.length).toBeGreaterThan(0);
  });

  it('should calculate lump sum payment strategy', () => {
    const inputs = {
      currentBalance: 250000,
      interestRate: 4.5,
      remainingTerm: 25,
      monthlyPayment: 1500,
      extraPayment: 0,
      lumpSumPayment: 20000,
      payoffStrategy: 'lump-sum',
      propertyValue: 350000,
      taxRate: 22,
      investmentReturn: 7,
      inflationRate: 2.5
    };

    const result = calculateMortgagePayoff(inputs);

    expect(result.payoffDate).toBeDefined();
    expect(result.totalInterest).toBeGreaterThan(0);
    expect(result.interestSavings).toBeGreaterThan(0);
    expect(result.timeSaved).toBeGreaterThan(0);
    expect(result.monthlyPaymentNew).toBe(1500);
    expect(result.payoffSchedule.length).toBeGreaterThan(0);
  });

  it('should calculate bi-weekly payment strategy', () => {
    const inputs = {
      currentBalance: 250000,
      interestRate: 4.5,
      remainingTerm: 25,
      monthlyPayment: 1500,
      extraPayment: 0,
      lumpSumPayment: 0,
      payoffStrategy: 'biweekly',
      propertyValue: 350000,
      taxRate: 22,
      investmentReturn: 7,
      inflationRate: 2.5
    };

    const result = calculateMortgagePayoff(inputs);

    expect(result.payoffDate).toBeDefined();
    expect(result.totalInterest).toBeGreaterThan(0);
    expect(result.interestSavings).toBeGreaterThan(0);
    expect(result.timeSaved).toBeGreaterThan(0);
    expect(result.monthlyPaymentNew).toBe(750); // Half payment every 2 weeks
    expect(result.payoffSchedule.length).toBeGreaterThan(0);
  });

  it('should calculate custom strategy', () => {
    const inputs = {
      currentBalance: 250000,
      interestRate: 4.5,
      remainingTerm: 25,
      monthlyPayment: 1500,
      extraPayment: 150,
      lumpSumPayment: 10000,
      payoffStrategy: 'custom',
      propertyValue: 350000,
      taxRate: 22,
      investmentReturn: 7,
      inflationRate: 2.5
    };

    const result = calculateMortgagePayoff(inputs);

    expect(result.payoffDate).toBeDefined();
    expect(result.totalInterest).toBeGreaterThan(0);
    expect(result.interestSavings).toBeGreaterThan(0);
    expect(result.timeSaved).toBeGreaterThan(0);
    expect(result.monthlyPaymentNew).toBe(1650);
    expect(result.payoffSchedule.length).toBeGreaterThan(0);
  });
});

describe('Mortgage Payoff Calculator - Strategy Analysis', () => {
  it('should analyze different payoff strategies', () => {
    const inputs = {
      currentBalance: 300000,
      interestRate: 4.0,
      remainingTerm: 30,
      monthlyPayment: 1432,
      extraPayment: 200,
      lumpSumPayment: 15000,
      payoffStrategy: 'standard',
      propertyValue: 400000,
      taxRate: 24,
      investmentReturn: 8,
      inflationRate: 2.0
    };

    const strategies = analyzePayoffStrategies(inputs);

    expect(strategies.length).toBeGreaterThan(0);
    expect(strategies[0].name).toBe('Standard Payment');
    expect(strategies.every(s => s.payoffDate)).toBe(true);
    expect(strategies.every(s => s.totalInterest > 0)).toBe(true);
  });

  it('should compare strategy effectiveness', () => {
    const inputs = {
      currentBalance: 200000,
      interestRate: 3.75,
      remainingTerm: 20,
      monthlyPayment: 1185,
      extraPayment: 300,
      lumpSumPayment: 10000,
      payoffStrategy: 'standard',
      propertyValue: 280000,
      taxRate: 22,
      investmentReturn: 6.5,
      inflationRate: 2.5
    };

    const strategies = analyzePayoffStrategies(inputs);

    // Extra monthly payment should save more interest than standard
    const extraStrategy = strategies.find(s => s.name === 'Extra Monthly Payment');
    const standardStrategy = strategies.find(s => s.name === 'Standard Payment');
    
    if (extraStrategy && standardStrategy) {
      expect(extraStrategy.interestSavings).toBeGreaterThan(0);
      expect(extraStrategy.timeSaved).toBeGreaterThan(0);
      expect(extraStrategy.totalInterest).toBeLessThan(standardStrategy.totalInterest);
    }
  });

  it('should calculate payoff scenarios', () => {
    const inputs = {
      currentBalance: 250000,
      interestRate: 4.5,
      remainingTerm: 25,
      monthlyPayment: 1500,
      extraPayment: 200,
      lumpSumPayment: 10000,
      payoffStrategy: 'standard',
      propertyValue: 350000,
      taxRate: 22,
      investmentReturn: 7,
      inflationRate: 2.5
    };

    const scenarios = calculatePayoffScenarios(inputs);

    expect(scenarios.scenarios.length).toBeGreaterThan(0);
    expect(scenarios.bestStrategy).toBeDefined();
    expect(scenarios.worstStrategy).toBeDefined();
    expect(scenarios.bestStrategy.costBenefit).toBeGreaterThanOrEqual(scenarios.worstStrategy.costBenefit);
  });
});

describe('Mortgage Payoff Calculator - Schedule Calculations', () => {
  it('should generate accurate payoff schedule', () => {
    const inputs = {
      currentBalance: 100000,
      interestRate: 5.0,
      remainingTerm: 10,
      monthlyPayment: 1060,
      extraPayment: 0,
      lumpSumPayment: 0,
      payoffStrategy: 'standard',
      propertyValue: 150000,
      taxRate: 22,
      investmentReturn: 7,
      inflationRate: 2.5
    };

    const result = calculateMortgagePayoff(inputs);

    expect(result.payoffSchedule.length).toBeGreaterThan(0);
    
    // Check first entry
    const firstEntry = result.payoffSchedule[0];
    expect(firstEntry.month).toBe(1);
    expect(firstEntry.beginningBalance).toBe(100000);
    expect(firstEntry.payment).toBe(1060);
    expect(firstEntry.interest).toBeGreaterThan(0);
    expect(firstEntry.principal).toBeGreaterThan(0);
    expect(firstEntry.endingBalance).toBeLessThan(firstEntry.beginningBalance);
    expect(firstEntry.cumulativeInterest).toBe(firstEntry.interest);

    // Check last entry
    const lastEntry = result.payoffSchedule[result.payoffSchedule.length - 1];
    expect(lastEntry.endingBalance).toBeLessThanOrEqual(0);
  });

  it('should handle early payoff with extra payments', () => {
    const inputs = {
      currentBalance: 50000,
      interestRate: 4.0,
      remainingTerm: 15,
      monthlyPayment: 370,
      extraPayment: 200,
      lumpSumPayment: 0,
      payoffStrategy: 'extra-monthly',
      propertyValue: 100000,
      taxRate: 22,
      investmentReturn: 7,
      inflationRate: 2.5
    };

    const result = calculateMortgagePayoff(inputs);

    expect(result.payoffSchedule.length).toBeLessThan(15 * 12); // Should pay off early
    expect(result.timeSaved).toBeGreaterThan(0);
    expect(result.interestSavings).toBeGreaterThan(0);
  });
});

describe('Mortgage Payoff Calculator - Input Validation', () => {
  it('should validate required fields correctly', () => {
    const inputs = {
      currentBalance: undefined,
      interestRate: undefined,
      remainingTerm: undefined,
      monthlyPayment: undefined,
      payoffStrategy: undefined
    };

    const errors = validateMortgagePayoffInputs(inputs);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some(e => e.field === 'currentBalance')).toBe(true);
    expect(errors.some(e => e.field === 'interestRate')).toBe(true);
    expect(errors.some(e => e.field === 'remainingTerm')).toBe(true);
    expect(errors.some(e => e.field === 'monthlyPayment')).toBe(true);
    expect(errors.some(e => e.field === 'payoffStrategy')).toBe(true);
  });

  it('should validate range constraints', () => {
    const inputs = {
      currentBalance: 500, // Too low
      interestRate: 25, // Too high
      remainingTerm: 60, // Too high
      monthlyPayment: 50, // Too low
      payoffStrategy: 'standard'
    };

    const errors = validateMortgagePayoffInputs(inputs);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some(e => e.field === 'currentBalance' && e.message.includes('range'))).toBe(true);
    expect(errors.some(e => e.field === 'interestRate' && e.message.includes('range'))).toBe(true);
    expect(errors.some(e => e.field === 'remainingTerm' && e.message.includes('range'))).toBe(true);
    expect(errors.some(e => e.field === 'monthlyPayment' && e.message.includes('range'))).toBe(true);
  });

  it('should validate payoff strategy correctly', () => {
    const inputs = {
      currentBalance: 250000,
      interestRate: 4.5,
      remainingTerm: 25,
      monthlyPayment: 1500,
      payoffStrategy: 'invalid-strategy'
    };

    const errors = validateMortgagePayoffInputs(inputs);

    expect(errors.some(e => e.field === 'payoffStrategy' && e.message.includes('standard, extra-monthly, lump-sum, biweekly, or custom'))).toBe(true);
  });

  it('should validate cross-field dependencies', () => {
    const inputs = {
      currentBalance: 250000,
      interestRate: 4.5,
      remainingTerm: 25,
      monthlyPayment: 1500,
      payoffStrategy: 'standard',
      lumpSumPayment: 300000 // Exceeds current balance
    };

    const errors = validateMortgagePayoffInputs(inputs);

    expect(errors.some(e => e.field === 'lumpSumPayment' && e.message.includes('cannot exceed current mortgage balance'))).toBe(true);
  });
});

describe('Mortgage Payoff Calculator - Quick Validation', () => {
  it('should validate current balance quickly', () => {
    const result = quickValidateCurrentBalance(500);
    expect(result.isValid).toBe(false);
    expect(result.message).toContain('range');

    const result2 = quickValidateCurrentBalance(250000);
    expect(result2.isValid).toBe(true);
  });

  it('should validate interest rate quickly', () => {
    const result = quickValidateInterestRate(25);
    expect(result.isValid).toBe(false);
    expect(result.message).toContain('range');

    const result2 = quickValidateInterestRate(4.5);
    expect(result2.isValid).toBe(true);
  });

  it('should validate all inputs quickly', () => {
    const inputs = {
      currentBalance: 250000,
      interestRate: 4.5,
      remainingTerm: 25,
      monthlyPayment: 1500,
      extraPayment: 200,
      lumpSumPayment: 10000,
      payoffStrategy: 'extra-monthly',
      propertyValue: 350000,
      taxRate: 22,
      investmentReturn: 7,
      inflationRate: 2.5
    };

    const results = quickValidateAllInputs(inputs);

    expect(results).toHaveLength(11);
    expect(results.every(r => r.isValid)).toBe(true);
  });
});

describe('Mortgage Payoff Calculator - Edge Cases', () => {
  it('should handle very large mortgage amounts', () => {
    const inputs = {
      currentBalance: 5000000,
      interestRate: 3.5,
      remainingTerm: 30,
      monthlyPayment: 22450,
      extraPayment: 1000,
      lumpSumPayment: 100000,
      payoffStrategy: 'custom',
      propertyValue: 6250000,
      taxRate: 37,
      investmentReturn: 8,
      inflationRate: 2.5
    };

    const result = calculateMortgagePayoff(inputs);

    expect(result.payoffDate).toBeDefined();
    expect(result.totalInterest).toBeGreaterThan(0);
    expect(result.interestSavings).toBeGreaterThan(0);
    expect(result.timeSaved).toBeGreaterThan(0);
  });

  it('should handle very small mortgage amounts', () => {
    const inputs = {
      currentBalance: 50000,
      interestRate: 4.0,
      remainingTerm: 10,
      monthlyPayment: 506,
      extraPayment: 100,
      lumpSumPayment: 5000,
      payoffStrategy: 'custom',
      propertyValue: 100000,
      taxRate: 12,
      investmentReturn: 6,
      inflationRate: 2.0
    };

    const result = calculateMortgagePayoff(inputs);

    expect(result.payoffDate).toBeDefined();
    expect(result.totalInterest).toBeGreaterThan(0);
    expect(result.interestSavings).toBeGreaterThan(0);
    expect(result.timeSaved).toBeGreaterThan(0);
  });

  it('should handle very low interest rates', () => {
    const inputs = {
      currentBalance: 300000,
      interestRate: 2.5,
      remainingTerm: 30,
      monthlyPayment: 1185,
      extraPayment: 300,
      lumpSumPayment: 0,
      payoffStrategy: 'extra-monthly',
      propertyValue: 400000,
      taxRate: 24,
      investmentReturn: 8,
      inflationRate: 2.5
    };

    const result = calculateMortgagePayoff(inputs);

    expect(result.payoffDate).toBeDefined();
    expect(result.totalInterest).toBeGreaterThan(0);
    expect(result.interestSavings).toBeGreaterThan(0);
    expect(result.timeSaved).toBeGreaterThan(0);
  });

  it('should handle very high interest rates', () => {
    const inputs = {
      currentBalance: 200000,
      interestRate: 12.0,
      remainingTerm: 20,
      monthlyPayment: 2202,
      extraPayment: 500,
      lumpSumPayment: 15000,
      payoffStrategy: 'custom',
      propertyValue: 250000,
      taxRate: 22,
      investmentReturn: 7,
      inflationRate: 3.0
    };

    const result = calculateMortgagePayoff(inputs);

    expect(result.payoffDate).toBeDefined();
    expect(result.totalInterest).toBeGreaterThan(0);
    expect(result.interestSavings).toBeGreaterThan(0);
    expect(result.timeSaved).toBeGreaterThan(0);
  });
});

describe('Mortgage Payoff Calculator - Integration Tests', () => {
  it('should calculate complete mortgage payoff scenario', () => {
    const inputs = {
      currentBalance: 400000,
      interestRate: 4.25,
      remainingTerm: 30,
      monthlyPayment: 1968,
      extraPayment: 400,
      lumpSumPayment: 25000,
      payoffStrategy: 'custom',
      propertyValue: 500000,
      taxRate: 24,
      investmentReturn: 7.5,
      inflationRate: 2.5
    };

    const result = calculateMortgagePayoff(inputs);
    const strategies = analyzePayoffStrategies(inputs);
    const scenarios = calculatePayoffScenarios(inputs);
    const validationErrors = validateMortgagePayoffInputs(inputs);

    expect(result.payoffDate).toBeDefined();
    expect(result.totalInterest).toBeGreaterThan(0);
    expect(result.interestSavings).toBeGreaterThan(0);
    expect(result.timeSaved).toBeGreaterThan(0);
    expect(strategies.length).toBeGreaterThan(0);
    expect(scenarios.bestStrategy).toBeDefined();
    expect(validationErrors.length).toBe(0);
  });

  it('should handle FHA loan scenario correctly', () => {
    const inputs = {
      currentBalance: 250000,
      interestRate: 3.75,
      remainingTerm: 30,
      monthlyPayment: 1158,
      extraPayment: 150,
      lumpSumPayment: 0,
      payoffStrategy: 'extra-monthly',
      propertyValue: 259067,
      taxRate: 22,
      investmentReturn: 7,
      inflationRate: 2.5
    };

    const result = calculateMortgagePayoff(inputs);
    const validationErrors = validateMortgagePayoffInputs(inputs);

    expect(result.payoffDate).toBeDefined();
    expect(result.totalInterest).toBeGreaterThan(0);
    expect(result.interestSavings).toBeGreaterThan(0);
    expect(result.timeSaved).toBeGreaterThan(0);
    expect(validationErrors.length).toBe(0);
  });
});

describe('Mortgage Payoff Calculator - Calculator Object', () => {
  it('should have correct calculator structure', () => {
    expect(mortgagePayoffCalculator.id).toBe('mortgage-payoff');
    expect(mortgagePayoffCalculator.title).toBe('Mortgage Payoff Calculator');
    expect(mortgagePayoffCalculator.category).toBe('finance');
    expect(mortgagePayoffCalculator.subcategory).toBe('mortgage');
    expect(mortgagePayoffCalculator.inputs).toHaveLength(12);
    expect(mortgagePayoffCalculator.outputs).toHaveLength(8);
    expect(mortgagePayoffCalculator.formulas).toHaveLength(3);
    expect(mortgagePayoffCalculator.examples).toHaveLength(3);
  });

  it('should have valid input structure', () => {
    const currentBalanceInput = mortgagePayoffCalculator.inputs.find(input => input.id === 'currentBalance');
    expect(currentBalanceInput).toBeDefined();
    expect(currentBalanceInput?.type).toBe('number');
    expect(currentBalanceInput?.required).toBe(true);
    expect(currentBalanceInput?.min).toBe(1000);
    expect(currentBalanceInput?.max).toBe(10000000);
  });

  it('should have valid output structure', () => {
    const payoffDateOutput = mortgagePayoffCalculator.outputs.find(output => output.id === 'payoffDate');
    expect(payoffDateOutput).toBeDefined();
    expect(payoffDateOutput?.type).toBe('date');
    expect(payoffDateOutput?.format).toBe('MM/DD/YYYY');
  });

  it('should have valid examples', () => {
    const example = mortgagePayoffCalculator.examples[0];
    expect(example.title).toBe('Standard 30-Year Mortgage');
    expect(example.inputs).toBeDefined();
    expect(example.expectedOutputs).toBeDefined();
  });
});