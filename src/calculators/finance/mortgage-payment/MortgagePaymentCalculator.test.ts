import { describe, it, expect } from 'vitest';
import { calculateMortgagePayment, generateAmortizationSchedule, calculatePaymentBreakdown, generateRecommendations, calculateBiweeklySavings } from './formulas';
import { validateMortgagePaymentInputs, validateCrossFieldDependencies } from './validation';
import { quickValidateLoanAmount, quickValidateInterestRate, quickValidateLoanTerm, quickValidateAllInputs } from './quickValidation';
import { mortgagePaymentCalculator } from './MortgagePaymentCalculator';

describe('Mortgage Payment Calculator - Core Calculations', () => {
  it('should calculate monthly payment correctly for standard 30-year loan', () => {
    const inputs = {
      loanAmount: 300000,
      interestRate: 4.5,
      loanTerm: '30',
      propertyTax: 3600,
      homeInsurance: 1200,
      pmiRate: 0,
      downPayment: 60000,
      loanType: 'conventional',
      paymentFrequency: 'monthly'
    };

    const result = calculateMortgagePayment(inputs);

    expect(result.monthlyPayment).toBeCloseTo(1520.06, 2);
    expect(result.principalAndInterest).toBeCloseTo(1219.08, 2);
    expect(result.propertyTaxMonthly).toBe(300);
    expect(result.insuranceMonthly).toBe(100);
    expect(result.totalInterest).toBeCloseTo(138868.80, 2);
  });

  it('should calculate monthly payment correctly for 15-year loan', () => {
    const inputs = {
      loanAmount: 200000,
      interestRate: 3.75,
      loanTerm: '15',
      propertyTax: 2400,
      homeInsurance: 800,
      pmiRate: 0,
      downPayment: 40000,
      loanType: 'conventional',
      paymentFrequency: 'monthly'
    };

    const result = calculateMortgagePayment(inputs);

    expect(result.monthlyPayment).toBeCloseTo(1689.58, 2);
    expect(result.principalAndInterest).toBeCloseTo(1455.58, 2);
    expect(result.propertyTaxMonthly).toBe(200);
    expect(result.insuranceMonthly).toBeCloseTo(34.00, 2);
  });

  it('should calculate PMI correctly for low down payment', () => {
    const inputs = {
      loanAmount: 250000,
      interestRate: 5.0,
      loanTerm: '30',
      propertyTax: 3000,
      homeInsurance: 1000,
      pmiRate: 0.85,
      downPayment: 8750,
      loanType: 'fha',
      paymentFrequency: 'monthly'
    };

    const result = calculateMortgagePayment(inputs);

    expect(result.monthlyPayment).toBeCloseTo(1589.45, 2);
    expect(result.principalAndInterest).toBeCloseTo(1342.05, 2);
    expect(result.insuranceMonthly).toBeCloseTo(177.40, 2); // Home insurance + PMI
  });

  it('should handle zero interest rate correctly', () => {
    const inputs = {
      loanAmount: 100000,
      interestRate: 0,
      loanTerm: '30',
      propertyTax: 0,
      homeInsurance: 0,
      pmiRate: 0,
      downPayment: 0,
      loanType: 'conventional',
      paymentFrequency: 'monthly'
    };

    const result = calculateMortgagePayment(inputs);

    expect(result.principalAndInterest).toBeCloseTo(277.78, 2); // 100000 / (30 * 12)
    expect(result.totalInterest).toBe(0);
  });

  it('should calculate bi-weekly payment correctly', () => {
    const inputs = {
      loanAmount: 300000,
      interestRate: 4.5,
      loanTerm: '30',
      propertyTax: 3600,
      homeInsurance: 1200,
      pmiRate: 0,
      downPayment: 60000,
      loanType: 'conventional',
      paymentFrequency: 'biweekly'
    };

    const result = calculateMortgagePayment(inputs);

    // Bi-weekly payment should be monthly payment * 12 / 26
    const expectedBiweeklyPayment = 1520.06 * 12 / 26;
    expect(result.monthlyPayment).toBeCloseTo(expectedBiweeklyPayment, 2);
  });
});

describe('Mortgage Payment Calculator - Amortization Schedule', () => {
  it('should generate correct amortization schedule for 30-year loan', () => {
    const inputs = {
      loanAmount: 300000,
      interestRate: 4.5,
      loanTerm: '30',
      propertyTax: 0,
      homeInsurance: 0,
      pmiRate: 0,
      downPayment: 0,
      loanType: 'conventional',
      paymentFrequency: 'monthly'
    };

    const schedule = generateAmortizationSchedule(inputs);

    expect(schedule).toHaveLength(30);
    expect(schedule[0].year).toBe(1);
    expect(schedule[0].beginningBalance).toBe(300000);
    expect(schedule[0].payment).toBeCloseTo(1219.08 * 12, 2);
    expect(schedule[29].endingBalance).toBeCloseTo(0, 2);
  });

  it('should generate correct amortization schedule for 15-year loan', () => {
    const inputs = {
      loanAmount: 200000,
      interestRate: 3.75,
      loanTerm: '15',
      propertyTax: 0,
      homeInsurance: 0,
      pmiRate: 0,
      downPayment: 0,
      loanType: 'conventional',
      paymentFrequency: 'monthly'
    };

    const schedule = generateAmortizationSchedule(inputs);

    expect(schedule).toHaveLength(15);
    expect(schedule[0].year).toBe(1);
    expect(schedule[0].beginningBalance).toBe(200000);
    expect(schedule[14].endingBalance).toBeCloseTo(0, 2);
  });
});

describe('Mortgage Payment Calculator - Payment Breakdown', () => {
  it('should calculate payment breakdown correctly', () => {
    const inputs = {
      loanAmount: 300000,
      interestRate: 4.5,
      loanTerm: '30',
      propertyTax: 3600,
      homeInsurance: 1200,
      pmiRate: 0.5,
      downPayment: 30000,
      loanType: 'conventional',
      paymentFrequency: 'monthly'
    };

    const breakdown = calculatePaymentBreakdown(inputs);

    expect(breakdown.principalAndInterest).toBeCloseTo(1219.08, 2);
    expect(breakdown.propertyTaxMonthly).toBe(300);
    expect(breakdown.homeInsuranceMonthly).toBe(100);
    expect(breakdown.pmiMonthly).toBeCloseTo(125, 2); // 300000 * 0.005 / 12
    expect(breakdown.totalMonthlyPayment).toBeCloseTo(1744.08, 2);
  });

  it('should handle zero PMI when down payment is 20% or more', () => {
    const inputs = {
      loanAmount: 300000,
      interestRate: 4.5,
      loanTerm: '30',
      propertyTax: 3600,
      homeInsurance: 1200,
      pmiRate: 0.5,
      downPayment: 75000, // 20% down payment
      loanType: 'conventional',
      paymentFrequency: 'monthly'
    };

    const breakdown = calculatePaymentBreakdown(inputs);

    expect(breakdown.pmiMonthly).toBe(0);
    expect(breakdown.totalMonthlyPayment).toBeCloseTo(1619.08, 2);
  });
});

describe('Mortgage Payment Calculator - Recommendations', () => {
  it('should generate recommendations for low down payment', () => {
    const inputs = {
      loanAmount: 300000,
      interestRate: 4.5,
      loanTerm: '30',
      propertyTax: 3600,
      homeInsurance: 1200,
      pmiRate: 0.5,
      downPayment: 15000, // 5% down payment
      loanType: 'conventional',
      paymentFrequency: 'monthly'
    };

    const recommendations = generateRecommendations(inputs);

    expect(recommendations).toContain('Consider a 20% down payment to avoid PMI and reduce monthly payments.');
    expect(recommendations).toContain('PMI increases your monthly payment. Consider paying down the loan to 80% LTV to remove PMI.');
  });

  it('should generate recommendations for high interest rate', () => {
    const inputs = {
      loanAmount: 300000,
      interestRate: 7.5,
      loanTerm: '30',
      propertyTax: 3600,
      homeInsurance: 1200,
      pmiRate: 0,
      downPayment: 60000,
      loanType: 'conventional',
      paymentFrequency: 'monthly'
    };

    const recommendations = generateRecommendations(inputs);

    expect(recommendations).toContain('Current interest rates are high. Consider waiting for rates to improve or shopping around for better rates.');
  });

  it('should generate recommendations for 30-year loan', () => {
    const inputs = {
      loanAmount: 300000,
      interestRate: 4.5,
      loanTerm: '30',
      propertyTax: 3600,
      homeInsurance: 1200,
      pmiRate: 0,
      downPayment: 60000,
      loanType: 'conventional',
      paymentFrequency: 'monthly'
    };

    const recommendations = generateRecommendations(inputs);

    expect(recommendations).toContain('A 15-year loan would save significant interest but increase monthly payments.');
  });
});

describe('Mortgage Payment Calculator - Bi-weekly Savings', () => {
  it('should calculate bi-weekly savings correctly', () => {
    const inputs = {
      loanAmount: 300000,
      interestRate: 4.5,
      loanTerm: '30',
      propertyTax: 3600,
      homeInsurance: 1200,
      pmiRate: 0,
      downPayment: 60000,
      loanType: 'conventional',
      paymentFrequency: 'monthly'
    };

    const savings = calculateBiweeklySavings(inputs);

    expect(savings.monthlyPayment).toBeCloseTo(1520.06, 2);
    expect(savings.biweeklyPayment).toBeCloseTo(701.57, 2); // 1520.06 * 12 / 26
    expect(savings.annualSavings).toBeGreaterThan(0);
    expect(savings.yearsSaved).toBeGreaterThan(0);
  });
});

describe('Mortgage Payment Calculator - Input Validation', () => {
  it('should validate required fields correctly', () => {
    const inputs = {
      loanAmount: undefined,
      interestRate: undefined,
      loanTerm: undefined,
      loanType: undefined,
      paymentFrequency: undefined
    };

    const errors = validateMortgagePaymentInputs(inputs);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some(e => e.field === 'loanAmount')).toBe(true);
    expect(errors.some(e => e.field === 'interestRate')).toBe(true);
    expect(errors.some(e => e.field === 'loanTerm')).toBe(true);
    expect(errors.some(e => e.field === 'loanType')).toBe(true);
    expect(errors.some(e => e.field === 'paymentFrequency')).toBe(true);
  });

  it('should validate loan amount range correctly', () => {
    const inputs = {
      loanAmount: 500,
      interestRate: 4.5,
      loanTerm: '30',
      loanType: 'conventional',
      paymentFrequency: 'monthly'
    };

    const errors = validateMortgagePaymentInputs(inputs);

    expect(errors.some(e => e.field === 'loanAmount' && e.message.includes('range'))).toBe(true);
  });

  it('should validate interest rate range correctly', () => {
    const inputs = {
      loanAmount: 300000,
      interestRate: 25,
      loanTerm: '30',
      loanType: 'conventional',
      paymentFrequency: 'monthly'
    };

    const errors = validateMortgagePaymentInputs(inputs);

    expect(errors.some(e => e.field === 'interestRate' && e.message.includes('range'))).toBe(true);
  });

  it('should validate loan term correctly', () => {
    const inputs = {
      loanAmount: 300000,
      interestRate: 4.5,
      loanTerm: '25',
      loanType: 'conventional',
      paymentFrequency: 'monthly'
    };

    const errors = validateMortgagePaymentInputs(inputs);

    expect(errors.some(e => e.field === 'loanTerm' && e.message.includes('10, 15, 20, 30, or 40 years'))).toBe(true);
  });

  it('should validate loan type correctly', () => {
    const inputs = {
      loanAmount: 300000,
      interestRate: 4.5,
      loanTerm: '30',
      loanType: 'invalid',
      paymentFrequency: 'monthly'
    };

    const errors = validateMortgagePaymentInputs(inputs);

    expect(errors.some(e => e.field === 'loanType' && e.message.includes('conventional, FHA, VA, or USDA'))).toBe(true);
  });

  it('should validate payment frequency correctly', () => {
    const inputs = {
      loanAmount: 300000,
      interestRate: 4.5,
      loanTerm: '30',
      loanType: 'conventional',
      paymentFrequency: 'invalid'
    };

    const errors = validateMortgagePaymentInputs(inputs);

    expect(errors.some(e => e.field === 'paymentFrequency' && e.message.includes('monthly, biweekly, or weekly'))).toBe(true);
  });

  it('should validate FHA loan requirements', () => {
    const inputs = {
      loanAmount: 300000,
      interestRate: 4.5,
      loanTerm: '30',
      loanType: 'fha',
      paymentFrequency: 'monthly',
      downPayment: 5000 // Less than 3.5%
    };

    const errors = validateMortgagePaymentInputs(inputs);

    expect(errors.some(e => e.field === 'downPayment' && e.message.includes('FHA loans require a minimum 3.5% down payment'))).toBe(true);
  });

  it('should validate PMI requirements', () => {
    const inputs = {
      loanAmount: 300000,
      interestRate: 4.5,
      loanTerm: '30',
      loanType: 'conventional',
      paymentFrequency: 'monthly',
      downPayment: 75000, // 20% down payment
      pmiRate: 0.5 // PMI with 20% down payment
    };

    const errors = validateMortgagePaymentInputs(inputs);

    expect(errors.some(e => e.field === 'pmiRate' && e.message.includes('PMI is not required with 20% or more down payment'))).toBe(true);
  });
});

describe('Mortgage Payment Calculator - Cross-field Validation', () => {
  it('should validate down payment vs loan amount relationship', () => {
    const inputs = {
      loanAmount: 300000,
      downPayment: 350000
    };

    const errors = validateCrossFieldDependencies(inputs);

    expect(errors.some(e => e.field === 'downPayment' && e.message.includes('should be less than loan amount'))).toBe(true);
  });

  it('should validate conventional loan down payment requirements', () => {
    const inputs = {
      loanAmount: 300000,
      downPayment: 3000, // 1% down payment
      loanType: 'conventional'
    };

    const errors = validateCrossFieldDependencies(inputs);

    expect(errors.some(e => e.field === 'loanType' && e.message.includes('typically require at least 3% down payment'))).toBe(true);
  });
});

describe('Mortgage Payment Calculator - Quick Validation', () => {
  it('should validate loan amount quickly', () => {
    const result = quickValidateLoanAmount(500);
    expect(result.isValid).toBe(false);
    expect(result.message).toContain('range');

    const result2 = quickValidateLoanAmount(300000);
    expect(result2.isValid).toBe(true);
  });

  it('should validate interest rate quickly', () => {
    const result = quickValidateInterestRate(25);
    expect(result.isValid).toBe(false);
    expect(result.message).toContain('range');

    const result2 = quickValidateInterestRate(4.5);
    expect(result2.isValid).toBe(true);
  });

  it('should validate loan term quickly', () => {
    const result = quickValidateLoanTerm('25');
    expect(result.isValid).toBe(false);
    expect(result.message).toContain('10, 15, 20, 30, or 40 years');

    const result2 = quickValidateLoanTerm('30');
    expect(result2.isValid).toBe(true);
  });

  it('should validate all inputs quickly', () => {
    const inputs = {
      loanAmount: 300000,
      interestRate: 4.5,
      loanTerm: '30',
      propertyTax: 3600,
      homeInsurance: 1200,
      pmiRate: 0,
      downPayment: 60000,
      loanType: 'conventional',
      paymentFrequency: 'monthly'
    };

    const results = quickValidateAllInputs(inputs);

    expect(results).toHaveLength(9);
    expect(results.every(r => r.isValid)).toBe(true);
  });
});

describe('Mortgage Payment Calculator - Edge Cases', () => {
  it('should handle very large loan amounts', () => {
    const inputs = {
      loanAmount: 5000000,
      interestRate: 4.5,
      loanTerm: '30',
      propertyTax: 60000,
      homeInsurance: 2000,
      pmiRate: 0,
      downPayment: 1000000,
      loanType: 'conventional',
      paymentFrequency: 'monthly'
    };

    const result = calculateMortgagePayment(inputs);

    expect(result.monthlyPayment).toBeGreaterThan(0);
    expect(result.totalInterest).toBeGreaterThan(0);
  });

  it('should handle very small loan amounts', () => {
    const inputs = {
      loanAmount: 50000,
      interestRate: 4.5,
      loanTerm: '15',
      propertyTax: 600,
      homeInsurance: 400,
      pmiRate: 0,
      downPayment: 10000,
      loanType: 'conventional',
      paymentFrequency: 'monthly'
    };

    const result = calculateMortgagePayment(inputs);

    expect(result.monthlyPayment).toBeGreaterThan(0);
    expect(result.totalInterest).toBeGreaterThan(0);
  });

  it('should handle very high interest rates', () => {
    const inputs = {
      loanAmount: 300000,
      interestRate: 15,
      loanTerm: '30',
      propertyTax: 3600,
      homeInsurance: 1200,
      pmiRate: 0,
      downPayment: 60000,
      loanType: 'conventional',
      paymentFrequency: 'monthly'
    };

    const result = calculateMortgagePayment(inputs);

    expect(result.monthlyPayment).toBeGreaterThan(0);
    expect(result.totalInterest).toBeGreaterThan(0);
  });
});

describe('Mortgage Payment Calculator - Integration Tests', () => {
  it('should calculate complete mortgage payment scenario', () => {
    const inputs = {
      loanAmount: 400000,
      interestRate: 5.25,
      loanTerm: '30',
      propertyTax: 4800,
      homeInsurance: 1600,
      pmiRate: 0.75,
      downPayment: 40000, // 10% down payment
      loanType: 'conventional',
      paymentFrequency: 'monthly'
    };

    const result = calculateMortgagePayment(inputs);
    const breakdown = calculatePaymentBreakdown(inputs);
    const recommendations = generateRecommendations(inputs);
    const validationErrors = validateMortgagePaymentInputs(inputs);

    expect(result.monthlyPayment).toBeGreaterThan(0);
    expect(result.totalInterest).toBeGreaterThan(0);
    expect(breakdown.totalMonthlyPayment).toBeCloseTo(result.monthlyPayment, 2);
    expect(recommendations.length).toBeGreaterThan(0);
    expect(validationErrors.length).toBe(0);
  });

  it('should handle FHA loan scenario correctly', () => {
    const inputs = {
      loanAmount: 250000,
      interestRate: 5.5,
      loanTerm: '30',
      propertyTax: 3000,
      homeInsurance: 1200,
      pmiRate: 0.85,
      downPayment: 8750, // 3.5% down payment
      loanType: 'fha',
      paymentFrequency: 'monthly'
    };

    const result = calculateMortgagePayment(inputs);
    const validationErrors = validateMortgagePaymentInputs(inputs);

    expect(result.monthlyPayment).toBeGreaterThan(0);
    expect(validationErrors.length).toBe(0);
  });

  it('should handle VA loan scenario correctly', () => {
    const inputs = {
      loanAmount: 350000,
      interestRate: 4.75,
      loanTerm: '30',
      propertyTax: 4200,
      homeInsurance: 1400,
      pmiRate: 0,
      downPayment: 0, // 0% down payment
      loanType: 'va',
      paymentFrequency: 'monthly'
    };

    const result = calculateMortgagePayment(inputs);
    const validationErrors = validateMortgagePaymentInputs(inputs);

    expect(result.monthlyPayment).toBeGreaterThan(0);
    expect(validationErrors.length).toBe(0);
  });
});

describe('Mortgage Payment Calculator - Calculator Object', () => {
  it('should have correct calculator structure', () => {
    expect(mortgagePaymentCalculator.id).toBe('mortgage-payment');
    expect(mortgagePaymentCalculator.title).toBe('Mortgage Payment Calculator');
    expect(mortgagePaymentCalculator.category).toBe('finance');
    expect(mortgagePaymentCalculator.subcategory).toBe('mortgage');
    expect(mortgagePaymentCalculator.inputs).toHaveLength(9);
    expect(mortgagePaymentCalculator.outputs).toHaveLength(8);
    expect(mortgagePaymentCalculator.formulas).toHaveLength(3);
    expect(mortgagePaymentCalculator.examples).toHaveLength(3);
  });

  it('should have valid input structure', () => {
    const loanAmountInput = mortgagePaymentCalculator.inputs.find(input => input.id === 'loanAmount');
    expect(loanAmountInput).toBeDefined();
    expect(loanAmountInput?.type).toBe('number');
    expect(loanAmountInput?.required).toBe(true);
    expect(loanAmountInput?.min).toBe(1000);
    expect(loanAmountInput?.max).toBe(10000000);
  });

  it('should have valid output structure', () => {
    const monthlyPaymentOutput = mortgagePaymentCalculator.outputs.find(output => output.id === 'monthlyPayment');
    expect(monthlyPaymentOutput).toBeDefined();
    expect(monthlyPaymentOutput?.type).toBe('currency');
    expect(monthlyPaymentOutput?.format).toBe('USD');
  });

  it('should have valid examples', () => {
    const example = mortgagePaymentCalculator.examples[0];
    expect(example.title).toBe('Standard 30-Year Fixed Mortgage');
    expect(example.inputs).toBeDefined();
    expect(example.expectedOutputs).toBeDefined();
  });
});