import { describe, it, expect } from 'vitest';
import { calculateMortgageLifeInsurance, analyzeCoverageNeeds, calculatePremiums, calculateCostBenefitAnalysis, compareCoverageOptions } from './formulas';
import { validateMortgageLifeInputs, validateCrossFieldDependencies } from './validation';
import { quickValidateMortgageBalance, quickValidateAge, quickValidateAllInputs } from './quickValidation';
import { mortgageLifeCalculator } from './MortgageLifeCalculator';

describe('Mortgage Life Calculator - Core Calculations', () => {
  it('should calculate mortgage life insurance for young family', () => {
    const inputs = {
      mortgageBalance: 250000,
      propertyValue: 350000,
      monthlyPayment: 1500,
      age: 35,
      healthStatus: 'good',
      smoker: 'non-smoker',
      occupation: 'low',
      familyIncome: 75000,
      dependents: 2,
      existingLifeInsurance: 100000,
      otherDebts: 25000,
      funeralExpenses: 15000,
      coverageType: 'decreasing',
      termLength: '20'
    };

    const result = calculateMortgageLifeInsurance(inputs);

    expect(result.recommendedCoverage).toBe(250000);
    expect(result.monthlyPremium).toBeGreaterThan(0);
    expect(result.annualPremium).toBeGreaterThan(0);
    expect(result.totalCost).toBeGreaterThan(0);
    expect(result.affordabilityAnalysis).toBeGreaterThan(0);
    expect(result.coverageGap).toBeGreaterThan(0);
    expect(result.recommendations.length).toBeGreaterThan(0);
  });

  it('should calculate coverage needs analysis', () => {
    const inputs = {
      mortgageBalance: 250000,
      propertyValue: 350000,
      monthlyPayment: 1500,
      age: 35,
      healthStatus: 'good',
      smoker: 'non-smoker',
      occupation: 'low',
      familyIncome: 75000,
      dependents: 2,
      existingLifeInsurance: 100000,
      otherDebts: 25000,
      funeralExpenses: 15000,
      coverageType: 'decreasing',
      termLength: '20'
    };

    const result = analyzeCoverageNeeds(inputs);

    expect(result.totalNeeds).toBeGreaterThan(0);
    expect(result.mortgageProtection).toBe(250000);
    expect(result.debtProtection).toBe(25000);
    expect(result.incomeReplacement).toBeGreaterThan(0);
    expect(result.finalExpenses).toBe(15000);
    expect(result.existingCoverage).toBe(100000);
    expect(result.coverageGap).toBeGreaterThan(0);
  });

  it('should calculate premiums with risk factors', () => {
    const inputs = {
      mortgageBalance: 250000,
      propertyValue: 350000,
      monthlyPayment: 1500,
      age: 35,
      healthStatus: 'good',
      smoker: 'non-smoker',
      occupation: 'low',
      familyIncome: 75000,
      dependents: 2,
      existingLifeInsurance: 100000,
      otherDebts: 25000,
      funeralExpenses: 15000,
      coverageType: 'decreasing',
      termLength: '20'
    };

    const result = calculatePremiums(inputs);

    expect(result.basePremium).toBeGreaterThan(0);
    expect(result.riskMultiplier).toBeGreaterThan(0);
    expect(result.finalPremium).toBeGreaterThan(0);
    expect(result.riskFactors.length).toBeGreaterThanOrEqual(0);
  });

  it('should handle different coverage types', () => {
    const baseInputs = {
      mortgageBalance: 250000,
      propertyValue: 350000,
      monthlyPayment: 1500,
      age: 35,
      healthStatus: 'good',
      smoker: 'non-smoker',
      occupation: 'low',
      familyIncome: 75000,
      dependents: 2,
      existingLifeInsurance: 100000,
      otherDebts: 25000,
      funeralExpenses: 15000,
      termLength: '20'
    };

    const decreasingResult = calculateMortgageLifeInsurance({ ...baseInputs, coverageType: 'decreasing' });
    const levelResult = calculateMortgageLifeInsurance({ ...baseInputs, coverageType: 'level' });
    const familyResult = calculateMortgageLifeInsurance({ ...baseInputs, coverageType: 'family' });

    expect(decreasingResult.recommendedCoverage).toBe(250000);
    expect(levelResult.recommendedCoverage).toBe(250000);
    expect(familyResult.recommendedCoverage).toBeGreaterThan(250000); // Includes income replacement
  });

  it('should handle different age groups', () => {
    const baseInputs = {
      mortgageBalance: 250000,
      propertyValue: 350000,
      monthlyPayment: 1500,
      healthStatus: 'good',
      smoker: 'non-smoker',
      occupation: 'low',
      familyIncome: 75000,
      dependents: 2,
      existingLifeInsurance: 100000,
      otherDebts: 25000,
      funeralExpenses: 15000,
      coverageType: 'decreasing',
      termLength: '20'
    };

    const youngResult = calculateMortgageLifeInsurance({ ...baseInputs, age: 25 });
    const middleResult = calculateMortgageLifeInsurance({ ...baseInputs, age: 45 });
    const olderResult = calculateMortgageLifeInsurance({ ...baseInputs, age: 55 });

    expect(youngResult.monthlyPremium).toBeLessThan(middleResult.monthlyPremium);
    expect(middleResult.monthlyPremium).toBeLessThan(olderResult.monthlyPremium);
  });
});

describe('Mortgage Life Calculator - Risk Factor Calculations', () => {
  it('should calculate different premiums for health statuses', () => {
    const baseInputs = {
      mortgageBalance: 250000,
      propertyValue: 350000,
      monthlyPayment: 1500,
      age: 35,
      smoker: 'non-smoker',
      occupation: 'low',
      familyIncome: 75000,
      dependents: 2,
      existingLifeInsurance: 100000,
      otherDebts: 25000,
      funeralExpenses: 15000,
      coverageType: 'decreasing',
      termLength: '20'
    };

    const excellentResult = calculateMortgageLifeInsurance({ ...baseInputs, healthStatus: 'excellent' });
    const goodResult = calculateMortgageLifeInsurance({ ...baseInputs, healthStatus: 'good' });
    const fairResult = calculateMortgageLifeInsurance({ ...baseInputs, healthStatus: 'fair' });
    const poorResult = calculateMortgageLifeInsurance({ ...baseInputs, healthStatus: 'poor' });

    expect(excellentResult.monthlyPremium).toBeLessThan(goodResult.monthlyPremium);
    expect(goodResult.monthlyPremium).toBeLessThan(fairResult.monthlyPremium);
    expect(fairResult.monthlyPremium).toBeLessThan(poorResult.monthlyPremium);
  });

  it('should calculate different premiums for smoking status', () => {
    const baseInputs = {
      mortgageBalance: 250000,
      propertyValue: 350000,
      monthlyPayment: 1500,
      age: 35,
      healthStatus: 'good',
      occupation: 'low',
      familyIncome: 75000,
      dependents: 2,
      existingLifeInsurance: 100000,
      otherDebts: 25000,
      funeralExpenses: 15000,
      coverageType: 'decreasing',
      termLength: '20'
    };

    const nonSmokerResult = calculateMortgageLifeInsurance({ ...baseInputs, smoker: 'non-smoker' });
    const formerSmokerResult = calculateMortgageLifeInsurance({ ...baseInputs, smoker: 'former-smoker' });
    const smokerResult = calculateMortgageLifeInsurance({ ...baseInputs, smoker: 'smoker' });

    expect(nonSmokerResult.monthlyPremium).toBeLessThan(formerSmokerResult.monthlyPremium);
    expect(formerSmokerResult.monthlyPremium).toBeLessThan(smokerResult.monthlyPremium);
  });

  it('should calculate different premiums for occupation risk', () => {
    const baseInputs = {
      mortgageBalance: 250000,
      propertyValue: 350000,
      monthlyPayment: 1500,
      age: 35,
      healthStatus: 'good',
      smoker: 'non-smoker',
      familyIncome: 75000,
      dependents: 2,
      existingLifeInsurance: 100000,
      otherDebts: 25000,
      funeralExpenses: 15000,
      coverageType: 'decreasing',
      termLength: '20'
    };

    const lowRiskResult = calculateMortgageLifeInsurance({ ...baseInputs, occupation: 'low' });
    const mediumRiskResult = calculateMortgageLifeInsurance({ ...baseInputs, occupation: 'medium' });
    const highRiskResult = calculateMortgageLifeInsurance({ ...baseInputs, occupation: 'high' });

    expect(lowRiskResult.monthlyPremium).toBeLessThan(mediumRiskResult.monthlyPremium);
    expect(mediumRiskResult.monthlyPremium).toBeLessThan(highRiskResult.monthlyPremium);
  });
});

describe('Mortgage Life Calculator - Cost-Benefit Analysis', () => {
  it('should calculate cost-benefit analysis', () => {
    const inputs = {
      mortgageBalance: 250000,
      propertyValue: 350000,
      monthlyPayment: 1500,
      age: 35,
      healthStatus: 'good',
      smoker: 'non-smoker',
      occupation: 'low',
      familyIncome: 75000,
      dependents: 2,
      existingLifeInsurance: 100000,
      otherDebts: 25000,
      funeralExpenses: 15000,
      coverageType: 'decreasing',
      termLength: '20'
    };

    const result = calculateCostBenefitAnalysis(inputs);

    expect(result.totalPremiums).toBeGreaterThan(0);
    expect(result.coverageValue).toBe(250000);
    expect(result.benefitRatio).toBeGreaterThan(1);
    expect(result.yearsToBreakEven).toBeGreaterThan(0);
  });

  it('should compare different coverage options', () => {
    const inputs = {
      mortgageBalance: 250000,
      propertyValue: 350000,
      monthlyPayment: 1500,
      age: 35,
      healthStatus: 'good',
      smoker: 'non-smoker',
      occupation: 'low',
      familyIncome: 75000,
      dependents: 2,
      existingLifeInsurance: 100000,
      otherDebts: 25000,
      funeralExpenses: 15000,
      coverageType: 'decreasing',
      termLength: '20'
    };

    const comparison = compareCoverageOptions(inputs);

    expect(comparison.decreasing.recommendedCoverage).toBe(250000);
    expect(comparison.level.recommendedCoverage).toBe(250000);
    expect(comparison.family.recommendedCoverage).toBeGreaterThan(250000);
  });
});

describe('Mortgage Life Calculator - Input Validation', () => {
  it('should validate required fields correctly', () => {
    const inputs = {
      mortgageBalance: undefined,
      propertyValue: undefined,
      monthlyPayment: undefined,
      age: undefined,
      healthStatus: undefined,
      smoker: undefined,
      occupation: undefined,
      familyIncome: undefined,
      dependents: undefined,
      coverageType: undefined,
      termLength: undefined
    };

    const errors = validateMortgageLifeInputs(inputs);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some(e => e.field === 'mortgageBalance')).toBe(true);
    expect(errors.some(e => e.field === 'propertyValue')).toBe(true);
    expect(errors.some(e => e.field === 'monthlyPayment')).toBe(true);
    expect(errors.some(e => e.field === 'age')).toBe(true);
    expect(errors.some(e => e.field === 'healthStatus')).toBe(true);
    expect(errors.some(e => e.field === 'smoker')).toBe(true);
    expect(errors.some(e => e.field === 'occupation')).toBe(true);
    expect(errors.some(e => e.field === 'familyIncome')).toBe(true);
    expect(errors.some(e => e.field === 'dependents')).toBe(true);
    expect(errors.some(e => e.field === 'coverageType')).toBe(true);
    expect(errors.some(e => e.field === 'termLength')).toBe(true);
  });

  it('should validate age requirements', () => {
    const inputs = {
      mortgageBalance: 250000,
      propertyValue: 350000,
      monthlyPayment: 1500,
      age: 15, // Too young
      healthStatus: 'good',
      smoker: 'non-smoker',
      occupation: 'low',
      familyIncome: 75000,
      dependents: 2,
      coverageType: 'decreasing',
      termLength: '20'
    };

    const errors = validateMortgageLifeInputs(inputs);

    expect(errors.some(e => e.field === 'age' && e.message.includes('18'))).toBe(true);
  });

  it('should validate health status correctly', () => {
    const inputs = {
      mortgageBalance: 250000,
      propertyValue: 350000,
      monthlyPayment: 1500,
      age: 35,
      healthStatus: 'invalid',
      smoker: 'non-smoker',
      occupation: 'low',
      familyIncome: 75000,
      dependents: 2,
      coverageType: 'decreasing',
      termLength: '20'
    };

    const errors = validateMortgageLifeInputs(inputs);

    expect(errors.some(e => e.field === 'healthStatus' && e.message.includes('excellent, good, fair, or poor'))).toBe(true);
  });
});

describe('Mortgage Life Calculator - Cross-field Validation', () => {
  it('should validate mortgage balance vs property value', () => {
    const inputs = {
      mortgageBalance: 400000,
      propertyValue: 350000
    };

    const errors = validateCrossFieldDependencies(inputs);

    expect(errors.some(e => e.field === 'mortgageBalance' && e.message.includes('cannot exceed property value'))).toBe(true);
  });

  it('should validate age and term length compatibility', () => {
    const inputs = {
      age: 80,
      termLength: '30'
    };

    const errors = validateCrossFieldDependencies(inputs);

    expect(errors.some(e => e.field === 'termLength' && e.message.includes('age limits'))).toBe(true);
  });
});

describe('Mortgage Life Calculator - Quick Validation', () => {
  it('should validate mortgage balance quickly', () => {
    const result = quickValidateMortgageBalance(500);
    expect(result.isValid).toBe(false);
    expect(result.message).toContain('range');

    const result2 = quickValidateMortgageBalance(250000);
    expect(result2.isValid).toBe(true);
  });

  it('should validate age quickly', () => {
    const result = quickValidateAge(15);
    expect(result.isValid).toBe(false);
    expect(result.message).toContain('range');

    const result2 = quickValidateAge(35);
    expect(result2.isValid).toBe(true);
  });

  it('should validate all inputs quickly', () => {
    const inputs = {
      mortgageBalance: 250000,
      propertyValue: 350000,
      monthlyPayment: 1500,
      age: 35,
      healthStatus: 'good',
      smoker: 'non-smoker',
      occupation: 'low',
      familyIncome: 75000,
      dependents: 2,
      existingLifeInsurance: 100000,
      otherDebts: 25000,
      funeralExpenses: 15000,
      coverageType: 'decreasing',
      termLength: '20'
    };

    const results = quickValidateAllInputs(inputs);

    expect(results).toHaveLength(11);
    expect(results.every(r => r.isValid)).toBe(true);
  });
});

describe('Mortgage Life Calculator - Edge Cases', () => {
  it('should handle very large mortgage amounts', () => {
    const inputs = {
      mortgageBalance: 5000000,
      propertyValue: 6250000,
      monthlyPayment: 25000,
      age: 35,
      healthStatus: 'excellent',
      smoker: 'non-smoker',
      occupation: 'low',
      familyIncome: 500000,
      dependents: 2,
      existingLifeInsurance: 1000000,
      otherDebts: 100000,
      funeralExpenses: 25000,
      coverageType: 'decreasing',
      termLength: '20'
    };

    const result = calculateMortgageLifeInsurance(inputs);

    expect(result.recommendedCoverage).toBe(5000000);
    expect(result.monthlyPremium).toBeGreaterThan(0);
    expect(result.affordabilityAnalysis).toBeGreaterThan(0);
  });

  it('should handle single person with no dependents', () => {
    const inputs = {
      mortgageBalance: 180000,
      propertyValue: 250000,
      monthlyPayment: 1200,
      age: 45,
      healthStatus: 'excellent',
      smoker: 'non-smoker',
      occupation: 'low',
      familyIncome: 60000,
      dependents: 0,
      existingLifeInsurance: 50000,
      otherDebts: 15000,
      funeralExpenses: 12000,
      coverageType: 'level',
      termLength: '15'
    };

    const result = calculateMortgageLifeInsurance(inputs);

    expect(result.recommendedCoverage).toBe(180000);
    expect(result.monthlyPremium).toBeGreaterThan(0);
    expect(result.recommendations.length).toBeGreaterThan(0);
  });

  it('should handle high-risk occupation', () => {
    const inputs = {
      mortgageBalance: 300000,
      propertyValue: 400000,
      monthlyPayment: 1800,
      age: 40,
      healthStatus: 'good',
      smoker: 'former-smoker',
      occupation: 'high',
      familyIncome: 85000,
      dependents: 3,
      existingLifeInsurance: 150000,
      otherDebts: 30000,
      funeralExpenses: 15000,
      coverageType: 'family',
      termLength: '25'
    };

    const result = calculateMortgageLifeInsurance(inputs);

    expect(result.recommendedCoverage).toBeGreaterThan(300000);
    expect(result.monthlyPremium).toBeGreaterThan(0);
    expect(result.affordabilityAnalysis).toBeGreaterThan(0);
  });
});

describe('Mortgage Life Calculator - Integration Tests', () => {
  it('should calculate complete mortgage life insurance scenario', () => {
    const inputs = {
      mortgageBalance: 400000,
      propertyValue: 500000,
      monthlyPayment: 2000,
      age: 40,
      healthStatus: 'good',
      smoker: 'non-smoker',
      occupation: 'medium',
      familyIncome: 100000,
      dependents: 3,
      existingLifeInsurance: 200000,
      otherDebts: 50000,
      funeralExpenses: 20000,
      coverageType: 'family',
      termLength: '25'
    };

    const result = calculateMortgageLifeInsurance(inputs);
    const coverageNeeds = analyzeCoverageNeeds(inputs);
    const costBenefit = calculateCostBenefitAnalysis(inputs);
    const validationErrors = validateMortgageLifeInputs(inputs);

    expect(result.recommendedCoverage).toBeGreaterThan(400000);
    expect(result.monthlyPremium).toBeGreaterThan(0);
    expect(coverageNeeds.totalNeeds).toBeGreaterThan(0);
    expect(costBenefit.benefitRatio).toBeGreaterThan(1);
    expect(validationErrors.length).toBe(0);
  });

  it('should handle FHA loan scenario correctly', () => {
    const inputs = {
      mortgageBalance: 250000,
      propertyValue: 259067,
      monthlyPayment: 1500,
      age: 35,
      healthStatus: 'good',
      smoker: 'non-smoker',
      occupation: 'low',
      familyIncome: 75000,
      dependents: 2,
      existingLifeInsurance: 100000,
      otherDebts: 25000,
      funeralExpenses: 15000,
      coverageType: 'decreasing',
      termLength: '20'
    };

    const result = calculateMortgageLifeInsurance(inputs);
    const validationErrors = validateMortgageLifeInputs(inputs);

    expect(result.recommendedCoverage).toBe(250000);
    expect(result.monthlyPremium).toBeGreaterThan(0);
    expect(validationErrors.length).toBe(0);
  });
});

describe('Mortgage Life Calculator - Calculator Object', () => {
  it('should have correct calculator structure', () => {
    expect(mortgageLifeCalculator.id).toBe('mortgage-life');
    expect(mortgageLifeCalculator.title).toBe('Mortgage Life Calculator');
    expect(mortgageLifeCalculator.category).toBe('finance');
    expect(mortgageLifeCalculator.subcategory).toBe('mortgage');
    expect(mortgageLifeCalculator.inputs).toHaveLength(14);
    expect(mortgageLifeCalculator.outputs).toHaveLength(8);
    expect(mortgageLifeCalculator.formulas).toHaveLength(3);
    expect(mortgageLifeCalculator.examples).toHaveLength(3);
  });

  it('should have valid input structure', () => {
    const mortgageBalanceInput = mortgageLifeCalculator.inputs.find(input => input.id === 'mortgageBalance');
    expect(mortgageBalanceInput).toBeDefined();
    expect(mortgageBalanceInput?.type).toBe('number');
    expect(mortgageBalanceInput?.required).toBe(true);
    expect(mortgageBalanceInput?.min).toBe(1000);
    expect(mortgageBalanceInput?.max).toBe(10000000);
  });

  it('should have valid output structure', () => {
    const recommendedCoverageOutput = mortgageLifeCalculator.outputs.find(output => output.id === 'recommendedCoverage');
    expect(recommendedCoverageOutput).toBeDefined();
    expect(recommendedCoverageOutput?.type).toBe('currency');
    expect(recommendedCoverageOutput?.format).toBe('USD');
  });

  it('should have valid examples', () => {
    const example = mortgageLifeCalculator.examples[0];
    expect(example.title).toBe('Young Family with Mortgage');
    expect(example.inputs).toBeDefined();
    expect(example.expectedOutputs).toBeDefined();
  });
});