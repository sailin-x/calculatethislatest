import { AngelInvestmentDilutionCalculator } from './AngelInvestmentDilutionCalculator';
import { calculateAngelInvestmentDilution } from './formulas';
import { validateAngelInvestmentDilutionInputs } from './validation';
import { AngelInvestmentDilutionInputs } from './types';

describe('AngelInvestmentDilutionCalculator', () => {
  const validInputs: AngelInvestmentDilutionInputs = {
    companyName: 'TechStartup Inc.',
    currentValuation: 5000000,
    totalSharesOutstanding: 10000000,
    investmentAmount: 500000,
    investmentType: 'equity',
    antiDilutionProtection: true,
    antiDilutionType: 'weighted_average',
    participationRights: false,
    liquidationPreference: 1.0,
    optionPoolSize: 2000000,
    optionPoolPercentage: 15.0,
    vestingSchedule: 'standard',
    vestingPeriod: 48,
    cliffPeriod: 12,
    analysisPeriod: 5,
    discountRate: 25.0
  };

  test('should have correct calculator properties', () => {
    expect(AngelInvestmentDilutionCalculator.id).toBe('angel-investment-dilution-calculator');
    expect(AngelInvestmentDilutionCalculator.name).toBe('Angel Investment Dilution Calculator');
    expect(AngelInvestmentDilutionCalculator.category).toBe('finance');
    expect(AngelInvestmentDilutionCalculator.subcategory).toBe('investment');
    expect(AngelInvestmentDilutionCalculator.description).toContain('startup investment');
  });

  test('should have required inputs', () => {
    const requiredInputs = AngelInvestmentDilutionCalculator.inputs.filter(input => input.required);
    expect(requiredInputs.length).toBeGreaterThan(0);
    
    const inputIds = AngelInvestmentDilutionCalculator.inputs.map(input => input.id);
    expect(inputIds).toContain('companyName');
    expect(inputIds).toContain('currentValuation');
    expect(inputIds).toContain('totalSharesOutstanding');
    expect(inputIds).toContain('investmentAmount');
  });

  test('should have comprehensive outputs', () => {
    const outputIds = AngelInvestmentDilutionCalculator.outputs.map(output => output.id);
    expect(outputIds).toContain('preMoneyValuation');
    expect(outputIds).toContain('postMoneyValuation');
    expect(outputIds).toContain('newSharesIssued');
    expect(outputIds).toContain('expectedIRR');
    expect(outputIds).toContain('expectedMOIC');
  });

  test('should calculate pre-investment metrics correctly', () => {
    const outputs = calculateAngelInvestmentDilution(validInputs);
    
    expect(outputs.preMoneyValuation).toBe(5000000);
    expect(outputs.preMoneyShares).toBe(10000000);
    expect(outputs.preMoneyOwnership).toEqual({ 'Investor': 0, 'Founders': 100 });
  });

  test('should calculate post-investment metrics correctly', () => {
    const outputs = calculateAngelInvestmentDilution(validInputs);
    
    expect(outputs.postMoneyValuation).toBe(5500000);
    expect(outputs.newSharesIssued).toBe(1000000);
    expect(outputs.effectivePricePerShare).toBe(0.5);
    expect(outputs.ownershipDilution['Investor']).toBeCloseTo(9.09, 1);
    expect(outputs.ownershipDilution['Founders']).toBeCloseTo(90.91, 1);
  });

  test('should calculate convertible security metrics correctly', () => {
    const convertibleInputs = {
      ...validInputs,
      investmentType: 'safe' as const,
      cap: 10000000,
      discountRate: 20
    };
    
    const outputs = calculateAngelInvestmentDilution(convertibleInputs);
    
    expect(outputs.conversionShares).toBeGreaterThan(0);
    expect(outputs.conversionPrice).toBeLessThanOrEqual(1.0);
    expect(outputs.effectiveDiscount).toBe(20);
  });

  test('should calculate anti-dilution adjustments correctly', () => {
    const outputs = calculateAngelInvestmentDilution(validInputs);
    
    expect(outputs.antiDilutionAdjustment).toBeGreaterThanOrEqual(0);
    expect(outputs.adjustedShares).toBeGreaterThanOrEqual(outputs.conversionShares || 0);
  });

  test('should calculate exit scenarios correctly', () => {
    const outputs = calculateAngelInvestmentDilution(validInputs);
    
    expect(Array.isArray(outputs.exitReturns)).toBe(true);
    expect(outputs.exitReturns.length).toBeGreaterThan(0);
    
    const firstScenario = outputs.exitReturns[0];
    expect(firstScenario).toHaveProperty('scenario');
    expect(firstScenario).toHaveProperty('investorReturn');
    expect(firstScenario).toHaveProperty('investorIRR');
    expect(firstScenario).toHaveProperty('investorMOIC');
    expect(firstScenario).toHaveProperty('founderReturn');
  });

  test('should calculate risk-adjusted returns correctly', () => {
    const outputs = calculateAngelInvestmentDilution(validInputs);
    
    expect(typeof outputs.expectedReturn).toBe('number');
    expect(typeof outputs.expectedIRR).toBe('number');
    expect(typeof outputs.expectedMOIC).toBe('number');
    expect(typeof outputs.riskAdjustedReturn).toBe('number');
    
    expect(outputs.expectedMOIC).toBeGreaterThan(0);
    expect(outputs.expectedIRR).toBeGreaterThan(-1);
  });

  test('should generate comprehensive analysis', () => {
    const outputs = calculateAngelInvestmentDilution(validInputs);
    
    expect(outputs.analysis).toHaveProperty('investmentRating');
    expect(outputs.analysis).toHaveProperty('riskRating');
    expect(outputs.analysis).toHaveProperty('recommendation');
    
    expect(['Excellent', 'Good', 'Average', 'Poor', 'Very Poor']).toContain(outputs.analysis.investmentRating);
    expect(['Low', 'Moderate', 'High', 'Very High']).toContain(outputs.analysis.riskRating);
    expect(['Invest', 'Pass', 'Negotiate', 'Strong Invest', 'Strong Pass']).toContain(outputs.analysis.recommendation);
  });

  test('should handle different investment types', () => {
    const equityInputs = { ...validInputs, investmentType: 'equity' as const };
    const safeInputs = { ...validInputs, investmentType: 'safe' as const, cap: 10000000 };
    const convertibleInputs = { ...validInputs, investmentType: 'convertible_note' as const, conversionPrice: 0.6 };
    
    const equityOutputs = calculateAngelInvestmentDilution(equityInputs);
    const safeOutputs = calculateAngelInvestmentDilution(safeInputs);
    const convertibleOutputs = calculateAngelInvestmentDilution(convertibleInputs);
    
    expect(equityOutputs.postMoneyValuation).toBe(5500000);
    expect(safeOutputs.conversionShares).toBeGreaterThan(0);
    expect(convertibleOutputs.conversionShares).toBeGreaterThan(0);
  });

  test('should handle anti-dilution protection', () => {
    const withAntiDilution = { ...validInputs, antiDilutionProtection: true, antiDilutionType: 'weighted_average' as const };
    const withoutAntiDilution = { ...validInputs, antiDilutionProtection: false };
    
    const withOutputs = calculateAngelInvestmentDilution(withAntiDilution);
    const withoutOutputs = calculateAngelInvestmentDilution(withoutAntiDilution);
    
    expect(withOutputs.antiDilutionAdjustment).toBeGreaterThan(0);
    expect(withoutOutputs.antiDilutionAdjustment).toBe(0);
  });

  test('should calculate quality metrics', () => {
    const outputs = calculateAngelInvestmentDilution(validInputs);
    
    expect(typeof outputs.dataQuality).toBe('number');
    expect(typeof outputs.modelAccuracy).toBe('number');
    expect(typeof outputs.confidenceLevel).toBe('number');
    
    expect(outputs.dataQuality).toBeGreaterThanOrEqual(0);
    expect(outputs.dataQuality).toBeLessThanOrEqual(100);
    expect(outputs.modelAccuracy).toBeGreaterThanOrEqual(0);
    expect(outputs.modelAccuracy).toBeLessThanOrEqual(100);
    expect(outputs.confidenceLevel).toBeGreaterThanOrEqual(0);
    expect(outputs.confidenceLevel).toBeLessThanOrEqual(100);
  });

  test('should handle edge case with minimal investment', () => {
    const minimalInputs: AngelInvestmentDilutionInputs = {
      ...validInputs,
      investmentAmount: 10000,
      currentValuation: 100000,
      totalSharesOutstanding: 1000000
    };
    
    const outputs = calculateAngelInvestmentDilution(minimalInputs);
    expect(outputs.postMoneyValuation).toBe(110000);
    expect(outputs.newSharesIssued).toBe(100000);
  });

  test('should handle large investment scenario', () => {
    const largeInputs: AngelInvestmentDilutionInputs = {
      ...validInputs,
      investmentAmount: 2000000,
      currentValuation: 8000000
    };
    
    const outputs = calculateAngelInvestmentDilution(largeInputs);
    expect(outputs.postMoneyValuation).toBe(10000000);
    expect(outputs.ownershipDilution['Investor']).toBeGreaterThan(15);
  });

  test('should validate inputs correctly', () => {
    const validation = validateAngelInvestmentDilutionInputs(validInputs);
    expect(validation.isValid).toBe(true);
    expect(validation.errors).toHaveLength(0);
  });

  test('should detect invalid inputs', () => {
    const invalidInputs = {
      ...validInputs,
      currentValuation: -1000000,
      investmentAmount: 0
    };
    
    const validation = validateAngelInvestmentDilutionInputs(invalidInputs);
    expect(validation.isValid).toBe(false);
    expect(validation.errors.length).toBeGreaterThan(0);
  });

  test('should detect unrealistic valuations', () => {
    const unrealisticInputs = {
      ...validInputs,
      currentValuation: 2000000000
    };
    
    const validation = validateAngelInvestmentDilutionInputs(unrealisticInputs);
    expect(validation.isValid).toBe(false);
    expect(validation.errors.some(error => error.includes('unrealistic'))).toBe(true);
  });

  test('should detect excessive investment amounts', () => {
    const excessiveInputs = {
      ...validInputs,
      investmentAmount: 15000000
    };
    
    const validation = validateAngelInvestmentDilutionInputs(excessiveInputs);
    expect(validation.isValid).toBe(false);
    expect(validation.errors.some(error => error.includes('excessive') || error.includes('high'))).toBe(true);
  });

  test('should detect missing convertible security parameters', () => {
    const missingParamsInputs = {
      ...validInputs,
      investmentType: 'safe' as const
    };
    
    const validation = validateAngelInvestmentDilutionInputs(missingParamsInputs);
    expect(validation.isValid).toBe(false);
    expect(validation.errors.some(error => error.includes('conversion price') || error.includes('valuation cap'))).toBe(true);
  });

  test('should generate report correctly', () => {
    const outputs = calculateAngelInvestmentDilution(validInputs);
    const report = AngelInvestmentDilutionCalculator.generateReport(validInputs, outputs);
    
    expect(typeof report).toBe('string');
    expect(report.length).toBeGreaterThan(0);
    expect(report).toContain('Angel Investment Dilution Analysis Report');
    expect(report).toContain('Executive Summary');
    expect(report).toContain('Investment Structure');
  });

  test('should have correct formulas', () => {
    expect(AngelInvestmentDilutionCalculator.formulas.length).toBeGreaterThan(0);
    
    const formulaNames = AngelInvestmentDilutionCalculator.formulas.map(f => f.name);
    expect(formulaNames).toContain('Post-Money Valuation');
    expect(formulaNames).toContain('Price Per Share');
    expect(formulaNames).toContain('New Shares Issued');
    expect(formulaNames).toContain('Ownership Percentage');
  });

  test('should have examples', () => {
    expect(AngelInvestmentDilutionCalculator.examples.length).toBeGreaterThan(0);
    
    const firstExample = AngelInvestmentDilutionCalculator.examples[0];
    expect(firstExample).toHaveProperty('name');
    expect(firstExample).toHaveProperty('description');
    expect(firstExample).toHaveProperty('inputs');
  });

  test('should have appropriate tags', () => {
    expect(AngelInvestmentDilutionCalculator.tags.length).toBeGreaterThan(0);
    expect(AngelInvestmentDilutionCalculator.tags).toContain('Startup Investment');
    expect(AngelInvestmentDilutionCalculator.tags).toContain('Angel Investment');
    expect(AngelInvestmentDilutionCalculator.tags).toContain('Dilution Analysis');
  });

  test('should have category info', () => {
    expect(AngelInvestmentDilutionCalculator.category_info).toHaveProperty('name');
    expect(AngelInvestmentDilutionCalculator.category_info).toHaveProperty('description');
    expect(AngelInvestmentDilutionCalculator.category_info.name).toBe('Startup Investment');
  });

  test('should handle different liquidation preferences', () => {
    const lowPreference = { ...validInputs, liquidationPreference: 1.0 };
    const highPreference = { ...validInputs, liquidationPreference: 3.0 };
    
    const lowOutputs = calculateAngelInvestmentDilution(lowPreference);
    const highOutputs = calculateAngelInvestmentDilution(highPreference);
    
    expect(lowOutputs.exitReturns[0].investorReturn).toBeLessThan(highOutputs.exitReturns[0].investorReturn);
  });

  test('should handle different option pool sizes', () => {
    const smallPool = { ...validInputs, optionPoolSize: 1000000, optionPoolPercentage: 10.0 };
    const largePool = { ...validInputs, optionPoolSize: 3000000, optionPoolPercentage: 20.0 };
    
    const smallOutputs = calculateAngelInvestmentDilution(smallPool);
    const largeOutputs = calculateAngelInvestmentDilution(largePool);
    
    expect(smallOutputs.ownershipDilution['Investor']).toBeGreaterThan(largeOutputs.ownershipDilution['Investor']);
  });

  test('should handle different vesting schedules', () => {
    const standardVesting = { ...validInputs, vestingSchedule: 'standard' as const, vestingPeriod: 48, cliffPeriod: 12 };
    const acceleratedVesting = { ...validInputs, vestingSchedule: 'accelerated' as const, vestingPeriod: 36, cliffPeriod: 6 };
    
    const standardOutputs = calculateAngelInvestmentDilution(standardVesting);
    const acceleratedOutputs = calculateAngelInvestmentDilution(acceleratedVesting);
    
    expect(typeof standardOutputs.analysis.vestingSchedule).toBe('string');
    expect(typeof acceleratedOutputs.analysis.vestingSchedule).toBe('string');
  });
});
