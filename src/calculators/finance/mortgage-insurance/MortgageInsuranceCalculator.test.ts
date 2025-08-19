import { describe, it, expect } from 'vitest';
import { calculateMortgageInsurance, calculateLTVAndInsurance, analyzeInsuranceCancellation, getPMIRate, getMIPRate, getVAFundingFee, generateInsuranceRecommendations } from './formulas';
import { validateMortgageInsuranceInputs, validateCrossFieldDependencies, validateLTVRequirements } from './validation';
import { quickValidateLoanAmount, quickValidatePropertyValue, quickValidateLTVRatio, quickValidateAllInputs } from './quickValidation';
import { mortgageInsuranceCalculator } from './MortgageInsuranceCalculator';

describe('Mortgage Insurance Calculator - Core Calculations', () => {
  it('should calculate PMI for conventional loan with high LTV', () => {
    const inputs = {
      loanAmount: 300000,
      propertyValue: 333333,
      downPayment: 33333,
      loanType: 'conventional',
      creditScore: 720,
      occupancyType: 'primary',
      loanTerm: '30',
      pmiRate: 0.5,
      mipRate: 0.85,
      fundingFee: 2.3,
      guaranteeFee: 1.0
    };

    const result = calculateMortgageInsurance(inputs);

    expect(result.loanToValueRatio).toBeCloseTo(90.0, 1);
    expect(result.insuranceRequired).toBe(true);
    expect(result.insuranceType).toBe('PMI');
    expect(result.annualInsuranceCost).toBeCloseTo(1500.00, 2);
    expect(result.monthlyInsuranceCost).toBeCloseTo(125.00, 2);
    expect(result.totalInsuranceCost).toBeGreaterThan(0);
  });

  it('should calculate MIP for FHA loan', () => {
    const inputs = {
      loanAmount: 250000,
      propertyValue: 259067,
      downPayment: 9067,
      loanType: 'fha',
      creditScore: 680,
      occupancyType: 'primary',
      loanTerm: '30',
      pmiRate: 0.5,
      mipRate: 0.85,
      fundingFee: 2.3,
      guaranteeFee: 1.0
    };

    const result = calculateMortgageInsurance(inputs);

    expect(result.loanToValueRatio).toBeCloseTo(96.5, 1);
    expect(result.insuranceRequired).toBe(true);
    expect(result.insuranceType).toBe('MIP');
    expect(result.annualInsuranceCost).toBeCloseTo(2125.00, 2);
    expect(result.monthlyInsuranceCost).toBeCloseTo(177.08, 2);
  });

  it('should calculate VA funding fee', () => {
    const inputs = {
      loanAmount: 350000,
      propertyValue: 350000,
      downPayment: 0,
      loanType: 'va',
      creditScore: 750,
      occupancyType: 'primary',
      loanTerm: '30',
      pmiRate: 0.5,
      mipRate: 0.85,
      fundingFee: 2.3,
      guaranteeFee: 1.0
    };

    const result = calculateMortgageInsurance(inputs);

    expect(result.loanToValueRatio).toBe(100.0);
    expect(result.insuranceRequired).toBe(true);
    expect(result.insuranceType).toBe('VA Funding Fee');
    expect(result.annualInsuranceCost).toBeCloseTo(8050.00, 2);
    expect(result.monthlyInsuranceCost).toBe(0); // One-time fee
  });

  it('should calculate USDA guarantee fee', () => {
    const inputs = {
      loanAmount: 200000,
      propertyValue: 200000,
      downPayment: 0,
      loanType: 'usda',
      creditScore: 700,
      occupancyType: 'primary',
      loanTerm: '30',
      pmiRate: 0.5,
      mipRate: 0.85,
      fundingFee: 2.3,
      guaranteeFee: 1.0
    };

    const result = calculateMortgageInsurance(inputs);

    expect(result.loanToValueRatio).toBe(100.0);
    expect(result.insuranceRequired).toBe(true);
    expect(result.insuranceType).toBe('USDA Guarantee Fee');
    expect(result.annualInsuranceCost).toBeCloseTo(2000.00, 2);
    expect(result.monthlyInsuranceCost).toBeCloseTo(166.67, 2);
  });

  it('should not require insurance for conventional loan with 20% down', () => {
    const inputs = {
      loanAmount: 300000,
      propertyValue: 375000,
      downPayment: 75000,
      loanType: 'conventional',
      creditScore: 720,
      occupancyType: 'primary',
      loanTerm: '30',
      pmiRate: 0.5,
      mipRate: 0.85,
      fundingFee: 2.3,
      guaranteeFee: 1.0
    };

    const result = calculateMortgageInsurance(inputs);

    expect(result.loanToValueRatio).toBe(80.0);
    expect(result.insuranceRequired).toBe(false);
    expect(result.insuranceType).toBe('None');
    expect(result.annualInsuranceCost).toBe(0);
    expect(result.monthlyInsuranceCost).toBe(0);
  });
});

describe('Mortgage Insurance Calculator - LTV and Insurance Analysis', () => {
  it('should calculate LTV and determine insurance requirements correctly', () => {
    const inputs = {
      loanAmount: 300000,
      propertyValue: 333333,
      downPayment: 33333,
      loanType: 'conventional',
      creditScore: 720,
      occupancyType: 'primary',
      loanTerm: '30',
      pmiRate: 0.5,
      mipRate: 0.85,
      fundingFee: 2.3,
      guaranteeFee: 1.0
    };

    const result = calculateLTVAndInsurance(inputs);

    expect(result.ltvRatio).toBeCloseTo(90.0, 1);
    expect(result.insuranceRequired).toBe(true);
    expect(result.insuranceType).toBe('PMI');
    expect(result.downPaymentPercent).toBeCloseTo(10.0, 1);
  });

  it('should handle FHA loan insurance requirements', () => {
    const inputs = {
      loanAmount: 250000,
      propertyValue: 259067,
      downPayment: 9067,
      loanType: 'fha',
      creditScore: 680,
      occupancyType: 'primary',
      loanTerm: '30',
      pmiRate: 0.5,
      mipRate: 0.85,
      fundingFee: 2.3,
      guaranteeFee: 1.0
    };

    const result = calculateLTVAndInsurance(inputs);

    expect(result.ltvRatio).toBeCloseTo(96.5, 1);
    expect(result.insuranceRequired).toBe(true);
    expect(result.insuranceType).toBe('MIP');
  });
});

describe('Mortgage Insurance Calculator - Insurance Cancellation Analysis', () => {
  it('should analyze PMI cancellation for conventional loan', () => {
    const inputs = {
      loanAmount: 300000,
      propertyValue: 333333,
      downPayment: 33333,
      loanType: 'conventional',
      creditScore: 720,
      occupancyType: 'primary',
      loanTerm: '30',
      pmiRate: 0.5,
      mipRate: 0.85,
      fundingFee: 2.3,
      guaranteeFee: 1.0
    };

    const result = analyzeInsuranceCancellation(inputs);

    expect(result.canCancel).toBe(true);
    expect(result.equityNeeded).toBeGreaterThan(0);
    expect(result.costsSaved).toBeGreaterThan(0);
  });

  it('should handle FHA loan cancellation analysis', () => {
    const inputs = {
      loanAmount: 250000,
      propertyValue: 259067,
      downPayment: 9067,
      loanType: 'fha',
      creditScore: 680,
      occupancyType: 'primary',
      loanTerm: '30',
      pmiRate: 0.5,
      mipRate: 0.85,
      fundingFee: 2.3,
      guaranteeFee: 1.0
    };

    const result = analyzeInsuranceCancellation(inputs);

    expect(result.canCancel).toBe(false); // FHA MIP has different cancellation rules
  });
});

describe('Mortgage Insurance Calculator - Rate Calculations', () => {
  it('should calculate PMI rate based on LTV and credit score', () => {
    const rate1 = getPMIRate(85, 750);
    const rate2 = getPMIRate(95, 650);
    const rate3 = getPMIRate(90, 600);

    expect(rate1).toBeLessThan(rate2);
    expect(rate2).toBeLessThan(rate3);
    expect(rate1).toBeGreaterThan(0);
    expect(rate3).toBeLessThanOrEqual(2.0);
  });

  it('should calculate MIP rate based on LTV and loan term', () => {
    const rate15 = getMIPRate(85, '15');
    const rate30 = getMIPRate(85, '30');
    const rateHighLTV = getMIPRate(95, '30');

    expect(rate15).toBeLessThan(rate30);
    expect(rate30).toBeLessThan(rateHighLTV);
  });

  it('should calculate VA funding fee based on down payment', () => {
    const fee1 = getVAFundingFee(35000, 350000, true); // 10% down
    const fee2 = getVAFundingFee(0, 350000, true); // 0% down
    const fee3 = getVAFundingFee(0, 350000, false); // 0% down, not first time

    expect(fee1).toBeLessThan(fee2);
    expect(fee2).toBeLessThan(fee3);
  });
});

describe('Mortgage Insurance Calculator - Recommendations', () => {
  it('should generate recommendations for high LTV loan', () => {
    const inputs = {
      loanAmount: 300000,
      propertyValue: 333333,
      downPayment: 33333,
      loanType: 'conventional',
      creditScore: 680,
      occupancyType: 'primary',
      loanTerm: '30',
      pmiRate: 0.5,
      mipRate: 0.85,
      fundingFee: 2.3,
      guaranteeFee: 1.0
    };

    const recommendations = generateInsuranceRecommendations(inputs);

    expect(recommendations).toContain('Consider increasing your down payment to 20% to avoid PMI.');
    expect(recommendations).toContain('Improving your credit score can reduce PMI rates.');
  });

  it('should generate recommendations for FHA loan', () => {
    const inputs = {
      loanAmount: 250000,
      propertyValue: 259067,
      downPayment: 9067,
      loanType: 'fha',
      creditScore: 680,
      occupancyType: 'primary',
      loanTerm: '30',
      pmiRate: 0.5,
      mipRate: 0.85,
      fundingFee: 2.3,
      guaranteeFee: 1.0
    };

    const recommendations = generateInsuranceRecommendations(inputs);

    expect(recommendations).toContain('FHA loans with LTV > 90% require MIP for the life of the loan.');
  });
});

describe('Mortgage Insurance Calculator - Input Validation', () => {
  it('should validate required fields correctly', () => {
    const inputs = {
      loanAmount: undefined,
      propertyValue: undefined,
      downPayment: undefined,
      loanType: undefined,
      occupancyType: undefined,
      loanTerm: undefined
    };

    const errors = validateMortgageInsuranceInputs(inputs);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some(e => e.field === 'loanAmount')).toBe(true);
    expect(errors.some(e => e.field === 'propertyValue')).toBe(true);
    expect(errors.some(e => e.field === 'downPayment')).toBe(true);
    expect(errors.some(e => e.field === 'loanType')).toBe(true);
    expect(errors.some(e => e.field === 'occupancyType')).toBe(true);
    expect(errors.some(e => e.field === 'loanTerm')).toBe(true);
  });

  it('should validate loan amount range correctly', () => {
    const inputs = {
      loanAmount: 500,
      propertyValue: 100000,
      downPayment: 20000,
      loanType: 'conventional',
      occupancyType: 'primary',
      loanTerm: '30'
    };

    const errors = validateMortgageInsuranceInputs(inputs);

    expect(errors.some(e => e.field === 'loanAmount' && e.message.includes('range'))).toBe(true);
  });

  it('should validate property value range correctly', () => {
    const inputs = {
      loanAmount: 300000,
      propertyValue: 500,
      downPayment: 75000,
      loanType: 'conventional',
      occupancyType: 'primary',
      loanTerm: '30'
    };

    const errors = validateMortgageInsuranceInputs(inputs);

    expect(errors.some(e => e.field === 'propertyValue' && e.message.includes('range'))).toBe(true);
  });

  it('should validate loan type correctly', () => {
    const inputs = {
      loanAmount: 300000,
      propertyValue: 375000,
      downPayment: 75000,
      loanType: 'invalid',
      occupancyType: 'primary',
      loanTerm: '30'
    };

    const errors = validateMortgageInsuranceInputs(inputs);

    expect(errors.some(e => e.field === 'loanType' && e.message.includes('conventional, FHA, VA, or USDA'))).toBe(true);
  });

  it('should validate FHA loan requirements', () => {
    const inputs = {
      loanAmount: 300000,
      propertyValue: 333333,
      downPayment: 5000, // Less than 3.5%
      loanType: 'fha',
      occupancyType: 'primary',
      loanTerm: '30'
    };

    const errors = validateMortgageInsuranceInputs(inputs);

    expect(errors.some(e => e.field === 'downPayment' && e.message.includes('FHA loans require a minimum 3.5% down payment'))).toBe(true);
  });

  it('should validate credit score range correctly', () => {
    const inputs = {
      loanAmount: 300000,
      propertyValue: 375000,
      downPayment: 75000,
      loanType: 'conventional',
      creditScore: 200, // Too low
      occupancyType: 'primary',
      loanTerm: '30'
    };

    const errors = validateMortgageInsuranceInputs(inputs);

    expect(errors.some(e => e.field === 'creditScore' && e.message.includes('range'))).toBe(true);
  });
});

describe('Mortgage Insurance Calculator - Cross-field Validation', () => {
  it('should validate down payment vs loan amount relationship', () => {
    const inputs = {
      loanAmount: 300000,
      downPayment: 350000
    };

    const errors = validateCrossFieldDependencies(inputs);

    expect(errors.some(e => e.field === 'downPayment' && e.message.includes('should be less than loan amount'))).toBe(true);
  });

  it('should validate property value vs loan amount relationship', () => {
    const inputs = {
      loanAmount: 300000,
      propertyValue: 250000
    };

    const errors = validateCrossFieldDependencies(inputs);

    expect(errors.some(e => e.field === 'loanAmount' && e.message.includes('cannot exceed property value'))).toBe(true);
  });

  it('should validate credit score requirements for conventional loans', () => {
    const inputs = {
      loanType: 'conventional',
      creditScore: 600
    };

    const errors = validateCrossFieldDependencies(inputs);

    expect(errors.some(e => e.field === 'creditScore' && e.message.includes('620 or higher'))).toBe(true);
  });

  it('should validate credit score requirements for FHA loans', () => {
    const inputs = {
      loanType: 'fha',
      creditScore: 550
    };

    const errors = validateCrossFieldDependencies(inputs);

    expect(errors.some(e => e.field === 'creditScore' && e.message.includes('580 or higher'))).toBe(true);
  });
});

describe('Mortgage Insurance Calculator - LTV Validation', () => {
  it('should validate LTV ratio cannot exceed 100%', () => {
    const inputs = {
      loanAmount: 400000,
      propertyValue: 350000
    };

    const errors = validateLTVRequirements(inputs);

    expect(errors.some(e => e.field === 'loanAmount' && e.message.includes('cannot exceed 100%'))).toBe(true);
  });

  it('should validate conventional loan LTV limits', () => {
    const inputs = {
      loanAmount: 300000,
      propertyValue: 300000, // 100% LTV
      loanType: 'conventional'
    };

    const errors = validateLTVRequirements(inputs);

    expect(errors.some(e => e.field === 'loanAmount' && e.message.includes('maximum LTV of 97%'))).toBe(true);
  });

  it('should validate FHA loan LTV limits', () => {
    const inputs = {
      loanAmount: 250000,
      propertyValue: 259067, // 96.5% LTV
      loanType: 'fha'
    };

    const errors = validateLTVRequirements(inputs);

    expect(errors.some(e => e.field === 'loanAmount' && e.message.includes('maximum LTV of 96.5%'))).toBe(true);
  });
});

describe('Mortgage Insurance Calculator - Quick Validation', () => {
  it('should validate loan amount quickly', () => {
    const result = quickValidateLoanAmount(500);
    expect(result.isValid).toBe(false);
    expect(result.message).toContain('range');

    const result2 = quickValidateLoanAmount(300000);
    expect(result2.isValid).toBe(true);
  });

  it('should validate property value quickly', () => {
    const result = quickValidatePropertyValue(500);
    expect(result.isValid).toBe(false);
    expect(result.message).toContain('range');

    const result2 = quickValidatePropertyValue(375000);
    expect(result2.isValid).toBe(true);
  });

  it('should validate LTV ratio quickly', () => {
    const result = quickValidateLTVRatio(300000, 300000);
    expect(result.isValid).toBe(true);
    expect(result.message).toContain('LTV above 80% will require mortgage insurance');

    const result2 = quickValidateLTVRatio(240000, 300000);
    expect(result2.isValid).toBe(true);
    expect(result2.message).toContain('no mortgage insurance required');
  });

  it('should validate all inputs quickly', () => {
    const inputs = {
      loanAmount: 300000,
      propertyValue: 375000,
      downPayment: 75000,
      loanType: 'conventional',
      creditScore: 720,
      occupancyType: 'primary',
      loanTerm: '30',
      pmiRate: 0.5,
      mipRate: 0.85,
      fundingFee: 2.3,
      guaranteeFee: 1.0
    };

    const results = quickValidateAllInputs(inputs);

    expect(results).toHaveLength(11);
    expect(results.every(r => r.isValid)).toBe(true);
  });
});

describe('Mortgage Insurance Calculator - Edge Cases', () => {
  it('should handle very large loan amounts', () => {
    const inputs = {
      loanAmount: 5000000,
      propertyValue: 6250000,
      downPayment: 1250000,
      loanType: 'conventional',
      creditScore: 750,
      occupancyType: 'primary',
      loanTerm: '30',
      pmiRate: 0.5,
      mipRate: 0.85,
      fundingFee: 2.3,
      guaranteeFee: 1.0
    };

    const result = calculateMortgageInsurance(inputs);

    expect(result.loanToValueRatio).toBe(80.0);
    expect(result.insuranceRequired).toBe(false);
  });

  it('should handle very small loan amounts', () => {
    const inputs = {
      loanAmount: 50000,
      propertyValue: 62500,
      downPayment: 12500,
      loanType: 'conventional',
      creditScore: 720,
      occupancyType: 'primary',
      loanTerm: '30',
      pmiRate: 0.5,
      mipRate: 0.85,
      fundingFee: 2.3,
      guaranteeFee: 1.0
    };

    const result = calculateMortgageInsurance(inputs);

    expect(result.loanToValueRatio).toBe(80.0);
    expect(result.insuranceRequired).toBe(false);
  });

  it('should handle zero down payment for VA loans', () => {
    const inputs = {
      loanAmount: 350000,
      propertyValue: 350000,
      downPayment: 0,
      loanType: 'va',
      creditScore: 750,
      occupancyType: 'primary',
      loanTerm: '30',
      pmiRate: 0.5,
      mipRate: 0.85,
      fundingFee: 2.3,
      guaranteeFee: 1.0
    };

    const result = calculateMortgageInsurance(inputs);

    expect(result.loanToValueRatio).toBe(100.0);
    expect(result.insuranceRequired).toBe(true);
    expect(result.insuranceType).toBe('VA Funding Fee');
  });
});

describe('Mortgage Insurance Calculator - Integration Tests', () => {
  it('should calculate complete mortgage insurance scenario', () => {
    const inputs = {
      loanAmount: 400000,
      propertyValue: 500000,
      downPayment: 100000,
      loanType: 'conventional',
      creditScore: 680,
      occupancyType: 'primary',
      loanTerm: '30',
      pmiRate: 0.75,
      mipRate: 0.85,
      fundingFee: 2.3,
      guaranteeFee: 1.0
    };

    const result = calculateMortgageInsurance(inputs);
    const ltvResult = calculateLTVAndInsurance(inputs);
    const cancellationResult = analyzeInsuranceCancellation(inputs);
    const validationErrors = validateMortgageInsuranceInputs(inputs);

    expect(result.loanToValueRatio).toBe(80.0);
    expect(result.insuranceRequired).toBe(false);
    expect(ltvResult.insuranceRequired).toBe(false);
    expect(validationErrors.length).toBe(0);
  });

  it('should handle FHA loan scenario correctly', () => {
    const inputs = {
      loanAmount: 250000,
      propertyValue: 259067,
      downPayment: 9067,
      loanType: 'fha',
      creditScore: 680,
      occupancyType: 'primary',
      loanTerm: '30',
      pmiRate: 0.5,
      mipRate: 0.85,
      fundingFee: 2.3,
      guaranteeFee: 1.0
    };

    const result = calculateMortgageInsurance(inputs);
    const validationErrors = validateMortgageInsuranceInputs(inputs);

    expect(result.insuranceRequired).toBe(true);
    expect(result.insuranceType).toBe('MIP');
    expect(validationErrors.length).toBe(0);
  });

  it('should handle VA loan scenario correctly', () => {
    const inputs = {
      loanAmount: 350000,
      propertyValue: 350000,
      downPayment: 0,
      loanType: 'va',
      creditScore: 750,
      occupancyType: 'primary',
      loanTerm: '30',
      pmiRate: 0.5,
      mipRate: 0.85,
      fundingFee: 2.3,
      guaranteeFee: 1.0
    };

    const result = calculateMortgageInsurance(inputs);
    const validationErrors = validateMortgageInsuranceInputs(inputs);

    expect(result.insuranceRequired).toBe(true);
    expect(result.insuranceType).toBe('VA Funding Fee');
    expect(validationErrors.length).toBe(0);
  });
});

describe('Mortgage Insurance Calculator - Calculator Object', () => {
  it('should have correct calculator structure', () => {
    expect(mortgageInsuranceCalculator.id).toBe('mortgage-insurance');
    expect(mortgageInsuranceCalculator.title).toBe('Mortgage Insurance Calculator');
    expect(mortgageInsuranceCalculator.category).toBe('finance');
    expect(mortgageInsuranceCalculator.subcategory).toBe('mortgage');
    expect(mortgageInsuranceCalculator.inputs).toHaveLength(11);
    expect(mortgageInsuranceCalculator.outputs).toHaveLength(10);
    expect(mortgageInsuranceCalculator.formulas).toHaveLength(3);
    expect(mortgageInsuranceCalculator.examples).toHaveLength(3);
  });

  it('should have valid input structure', () => {
    const loanAmountInput = mortgageInsuranceCalculator.inputs.find(input => input.id === 'loanAmount');
    expect(loanAmountInput).toBeDefined();
    expect(loanAmountInput?.type).toBe('number');
    expect(loanAmountInput?.required).toBe(true);
    expect(loanAmountInput?.min).toBe(1000);
    expect(loanAmountInput?.max).toBe(10000000);
  });

  it('should have valid output structure', () => {
    const ltvOutput = mortgageInsuranceCalculator.outputs.find(output => output.id === 'loanToValueRatio');
    expect(ltvOutput).toBeDefined();
    expect(ltvOutput?.type).toBe('percentage');
    expect(ltvOutput?.format).toBe('decimal');
  });

  it('should have valid examples', () => {
    const example = mortgageInsuranceCalculator.examples[0];
    expect(example.title).toBe('Conventional Loan with PMI');
    expect(example.inputs).toBeDefined();
    expect(example.expectedOutputs).toBeDefined();
  });
});