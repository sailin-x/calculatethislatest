import { AngelInvestmentCalculator } from './AngelInvestmentCalculator';
import { calculateAngelInvestment } from './formulas';
import { validateAngelInvestmentInputs } from './validation';
import { AngelInvestmentInputs } from './types';

describe('AngelInvestmentCalculator', () => {
  const validInputs: AngelInvestmentInputs = {
    investmentAmount: 100000,
    investmentType: 'equity',
    investmentStage: 'seed',
    companyName: 'CloudTech Solutions',
    industry: 'Technology',
    sector: 'SaaS',
    companyStage: 'early_traction',
    foundingYear: 2021,
    teamSize: 8,
    currentRevenue: 500000,
    revenueGrowthRate: 15,
    burnRate: 50000,
    runway: 12,
    customerCount: 1000,
    averageRevenuePerUser: 50,
    preMoneyValuation: 2000000,
    valuationMethod: 'revenue_multiple',
    revenueMultiple: 10,
    totalAddressableMarket: 10000000000,
    serviceableAddressableMarket: 1000000000,
    serviceableObtainableMarket: 100000000,
    marketGrowthRate: 8,
    founderExperience: 8,
    technicalTeam: true,
    productType: 'saas',
    productStage: 'launched',
    customerAcquisitionCost: 100,
    customerLifetimeValue: 500,
    churnRate: 5,
    investmentThesis: 'Strong team, large market opportunity, proven traction',
    expectedReturn: 25,
    expectedTimeline: 5,
    analysisPeriod: 5,
    discountRate: 25.0
  };

  test('should have correct calculator properties', () => {
    expect(AngelInvestmentCalculator.id).toBe('angel-investment-calculator');
    expect(AngelInvestmentCalculator.name).toBe('Angel Investment Calculator');
    expect(AngelInvestmentCalculator.category).toBe('finance');
    expect(AngelInvestmentCalculator.subcategory).toBe('investment');
    expect(AngelInvestmentCalculator.description).toContain('angel investment');
  });

  test('should have required inputs', () => {
    const requiredInputs = AngelInvestmentCalculator.inputs.filter(input => input.required);
    expect(requiredInputs.length).toBeGreaterThan(0);
    
    const inputIds = AngelInvestmentCalculator.inputs.map(input => input.id);
    expect(inputIds).toContain('investmentAmount');
    expect(inputIds).toContain('investmentType');
    expect(inputIds).toContain('investmentStage');
    expect(inputIds).toContain('companyName');
  });

  test('should have comprehensive outputs', () => {
    const outputIds = AngelInvestmentCalculator.outputs.map(output => output.id);
    expect(outputIds).toContain('investmentAmount');
    expect(outputIds).toContain('equityPercentage');
    expect(outputIds).toContain('preMoneyValuation');
    expect(outputIds).toContain('expectedIRR');
    expect(outputIds).toContain('expectedMOIC');
  });

  test('should calculate investment analysis correctly', () => {
    const outputs = calculateAngelInvestment(validInputs);
    
    expect(outputs.investmentAmount).toBe(100000);
    expect(outputs.equityPercentage).toBeCloseTo(4.76, 1);
    expect(outputs.preMoneyValuation).toBe(2000000);
    expect(outputs.postMoneyValuation).toBe(2100000);
  });

  test('should calculate financial metrics correctly', () => {
    const outputs = calculateAngelInvestment(validInputs);
    
    expect(outputs.ltvToCacRatio).toBe(5);
    expect(outputs.revenueMultiple).toBe(4.2);
    expect(outputs.burnRate).toBe(50000);
    expect(outputs.runway).toBe(12);
  });

  test('should calculate market analysis correctly', () => {
    const outputs = calculateAngelInvestment(validInputs);
    
    expect(outputs.marketPenetration).toBeCloseTo(0.05, 2);
    expect(outputs.marketShare).toBeCloseTo(0.005, 3);
    expect(outputs.competitivePosition).toBeGreaterThan(0);
    expect(outputs.competitivePosition).toBeLessThanOrEqual(10);
  });

  test('should calculate risk metrics correctly', () => {
    const outputs = calculateAngelInvestment(validInputs);
    
    expect(outputs.riskScore).toBeGreaterThan(0);
    expect(outputs.riskScore).toBeLessThanOrEqual(10);
    expect(outputs.probabilityOfSuccess).toBeGreaterThan(0);
    expect(outputs.probabilityOfSuccess).toBeLessThanOrEqual(100);
    expect(outputs.riskAdjustedReturn).toBeGreaterThan(0);
  });

  test('should calculate return analysis correctly', () => {
    const outputs = calculateAngelInvestment(validInputs);
    
    expect(outputs.expectedIRR).toBeGreaterThan(0);
    expect(outputs.expectedMOIC).toBeGreaterThan(0);
    expect(outputs.expectedReturn).toBeGreaterThan(0);
    expect(outputs.expectedExitValue).toBeGreaterThan(0);
  });

  test('should generate comprehensive analysis', () => {
    const outputs = calculateAngelInvestment(validInputs);
    
    expect(outputs.analysis).toHaveProperty('investmentRating');
    expect(outputs.analysis).toHaveProperty('riskRating');
    expect(outputs.analysis).toHaveProperty('recommendation');
    
    expect(['Excellent', 'Good', 'Average', 'Poor', 'Very Poor']).toContain(outputs.analysis.investmentRating);
    expect(['Low', 'Moderate', 'High', 'Very High']).toContain(outputs.analysis.riskRating);
    expect(['Invest', 'Pass', 'Negotiate', 'Strong Invest', 'Strong Pass']).toContain(outputs.analysis.recommendation);
  });

  test('should calculate exit scenarios correctly', () => {
    const outputs = calculateAngelInvestment(validInputs);
    
    expect(Array.isArray(outputs.exitReturns)).toBe(true);
    expect(outputs.exitReturns.length).toBeGreaterThan(0);
    
    const firstScenario = outputs.exitReturns[0];
    expect(firstScenario).toHaveProperty('scenario');
    expect(firstScenario).toHaveProperty('probability');
    expect(firstScenario).toHaveProperty('exitValue');
    expect(firstScenario).toHaveProperty('investorReturn');
    expect(firstScenario).toHaveProperty('investorIRR');
    expect(firstScenario).toHaveProperty('investorMOIC');
  });

  test('should handle different investment types', () => {
    const equityInputs = { ...validInputs, investmentType: 'equity' as const };
    const safeInputs = { ...validInputs, investmentType: 'safe' as const };
    const convertibleInputs = { ...validInputs, investmentType: 'convertible_note' as const };
    
    const equityOutputs = calculateAngelInvestment(equityInputs);
    const safeOutputs = calculateAngelInvestment(safeInputs);
    const convertibleOutputs = calculateAngelInvestment(convertibleInputs);
    
    expect(equityOutputs.postMoneyValuation).toBe(2100000);
    expect(safeOutputs.postMoneyValuation).toBe(2100000);
    expect(convertibleOutputs.postMoneyValuation).toBe(2100000);
  });

  test('should handle different company stages', () => {
    const earlyStageInputs = { ...validInputs, companyStage: 'idea' as const };
    const matureStageInputs = { ...validInputs, companyStage: 'mature' as const };
    
    const earlyOutputs = calculateAngelInvestment(earlyStageInputs);
    const matureOutputs = calculateAngelInvestment(matureStageInputs);
    
    expect(earlyOutputs.riskScore).toBeGreaterThan(matureOutputs.riskScore);
    expect(earlyOutputs.probabilityOfSuccess).toBeLessThan(matureOutputs.probabilityOfSuccess);
  });

  test('should handle different product types', () => {
    const saasInputs = { ...validInputs, productType: 'saas' as const };
    const fintechInputs = { ...validInputs, productType: 'fintech' as const };
    const hardwareInputs = { ...validInputs, productType: 'hardware' as const };
    
    const saasOutputs = calculateAngelInvestment(saasInputs);
    const fintechOutputs = calculateAngelInvestment(fintechInputs);
    const hardwareOutputs = calculateAngelInvestment(hardwareInputs);
    
    expect(saasOutputs.competitivePosition).toBeGreaterThan(0);
    expect(fintechOutputs.competitivePosition).toBeGreaterThan(0);
    expect(hardwareOutputs.competitivePosition).toBeGreaterThan(0);
  });

  test('should calculate quality metrics', () => {
    const outputs = calculateAngelInvestment(validInputs);
    
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
    const minimalInputs: AngelInvestmentInputs = {
      ...validInputs,
      investmentAmount: 10000,
      currentRevenue: 100000,
      preMoneyValuation: 500000
    };
    
    const outputs = calculateAngelInvestment(minimalInputs);
    expect(outputs.postMoneyValuation).toBe(510000);
    expect(outputs.equityPercentage).toBeCloseTo(1.96, 1);
  });

  test('should handle large investment scenario', () => {
    const largeInputs: AngelInvestmentInputs = {
      ...validInputs,
      investmentAmount: 500000,
      preMoneyValuation: 5000000
    };
    
    const outputs = calculateAngelInvestment(largeInputs);
    expect(outputs.postMoneyValuation).toBe(5500000);
    expect(outputs.equityPercentage).toBeCloseTo(9.09, 1);
  });

  test('should validate inputs correctly', () => {
    const validation = validateAngelInvestmentInputs(validInputs);
    expect(validation.isValid).toBe(true);
    expect(validation.errors).toHaveLength(0);
  });

  test('should detect invalid inputs', () => {
    const invalidInputs = {
      ...validInputs,
      investmentAmount: -100000,
      preMoneyValuation: 0
    };
    
    const validation = validateAngelInvestmentInputs(invalidInputs);
    expect(validation.isValid).toBe(false);
    expect(validation.errors.length).toBeGreaterThan(0);
  });

  test('should detect unrealistic valuations', () => {
    const unrealisticInputs = {
      ...validInputs,
      preMoneyValuation: 2000000000
    };
    
    const validation = validateAngelInvestmentInputs(unrealisticInputs);
    expect(validation.isValid).toBe(false);
    expect(validation.errors.some(error => error.includes('unrealistic') || error.includes('high'))).toBe(true);
  });

  test('should detect poor unit economics', () => {
    const poorEconomicsInputs = {
      ...validInputs,
      customerLifetimeValue: 50,
      customerAcquisitionCost: 1000
    };
    
    const validation = validateAngelInvestmentInputs(poorEconomicsInputs);
    expect(validation.isValid).toBe(false);
    expect(validation.errors.some(error => error.includes('unit economics'))).toBe(true);
  });

  test('should detect market size issues', () => {
    const marketSizeInputs = {
      ...validInputs,
      serviceableAddressableMarket: 6000000000 // 60% of TAM
    };
    
    const validation = validateAngelInvestmentInputs(marketSizeInputs);
    expect(validation.isValid).toBe(false);
    expect(validation.errors.some(error => error.includes('market size'))).toBe(true);
  });

  test('should generate report correctly', () => {
    const outputs = calculateAngelInvestment(validInputs);
    const report = AngelInvestmentCalculator.generateReport(validInputs, outputs);
    
    expect(typeof report).toBe('string');
    expect(report.length).toBeGreaterThan(0);
    expect(report).toContain('Angel Investment Analysis Report');
    expect(report).toContain('Executive Summary');
    expect(report).toContain('Investment Analysis');
  });

  test('should have correct formulas', () => {
    expect(AngelInvestmentCalculator.formulas.length).toBeGreaterThan(0);
    
    const formulaNames = AngelInvestmentCalculator.formulas.map(f => f.name);
    expect(formulaNames).toContain('Post-Money Valuation');
    expect(formulaNames).toContain('Equity Percentage');
    expect(formulaNames).toContain('LTV to CAC Ratio');
    expect(formulaNames).toContain('Market Penetration');
  });

  test('should have examples', () => {
    expect(AngelInvestmentCalculator.examples.length).toBeGreaterThan(0);
    
    const firstExample = AngelInvestmentCalculator.examples[0];
    expect(firstExample).toHaveProperty('name');
    expect(firstExample).toHaveProperty('description');
    expect(firstExample).toHaveProperty('inputs');
  });

  test('should have appropriate tags', () => {
    expect(AngelInvestmentCalculator.tags.length).toBeGreaterThan(0);
    expect(AngelInvestmentCalculator.tags).toContain('Angel Investment');
    expect(AngelInvestmentCalculator.tags).toContain('Startup Investment');
    expect(AngelInvestmentCalculator.tags).toContain('Due Diligence');
  });

  test('should have category info', () => {
    expect(AngelInvestmentCalculator.category_info).toHaveProperty('name');
    expect(AngelInvestmentCalculator.category_info).toHaveProperty('description');
    expect(AngelInvestmentCalculator.category_info.name).toBe('Angel Investment');
  });

  test('should handle different market conditions', () => {
    const bullMarketInputs = { ...validInputs, marketConditions: 'bull' as const };
    const bearMarketInputs = { ...validInputs, marketConditions: 'bear' as const };
    
    const bullOutputs = calculateAngelInvestment(bullMarketInputs);
    const bearOutputs = calculateAngelInvestment(bearMarketInputs);
    
    expect(bullOutputs.riskScore).toBeLessThanOrEqual(bearOutputs.riskScore);
    expect(bullOutputs.probabilityOfSuccess).toBeGreaterThanOrEqual(bearOutputs.probabilityOfSuccess);
  });

  test('should handle different founder experience levels', () => {
    const inexperiencedInputs = { ...validInputs, founderExperience: 2 };
    const experiencedInputs = { ...validInputs, founderExperience: 15 };
    
    const inexperiencedOutputs = calculateAngelInvestment(inexperiencedInputs);
    const experiencedOutputs = calculateAngelInvestment(experiencedInputs);
    
    expect(inexperiencedOutputs.competitivePosition).toBeLessThan(experiencedOutputs.competitivePosition);
    expect(inexperiencedOutputs.riskScore).toBeGreaterThan(experiencedOutputs.riskScore);
  });

  test('should handle different team configurations', () => {
    const basicTeamInputs = { ...validInputs, technicalTeam: true, salesTeam: false, marketingTeam: false };
    const fullTeamInputs = { ...validInputs, technicalTeam: true, salesTeam: true, marketingTeam: true };
    
    const basicOutputs = calculateAngelInvestment(basicTeamInputs);
    const fullOutputs = calculateAngelInvestment(fullTeamInputs);
    
    expect(basicOutputs.competitivePosition).toBeLessThan(fullOutputs.competitivePosition);
  });

  test('should handle different churn rates', () => {
    const lowChurnInputs = { ...validInputs, churnRate: 2 };
    const highChurnInputs = { ...validInputs, churnRate: 15 };
    
    const lowChurnOutputs = calculateAngelInvestment(lowChurnInputs);
    const highChurnOutputs = calculateAngelInvestment(highChurnInputs);
    
    expect(lowChurnOutputs.riskScore).toBeLessThan(highChurnOutputs.riskScore);
    expect(lowChurnOutputs.probabilityOfSuccess).toBeGreaterThan(highChurnOutputs.probabilityOfSuccess);
  });

  test('should handle different runway scenarios', () => {
    const shortRunwayInputs = { ...validInputs, runway: 6 };
    const longRunwayInputs = { ...validInputs, runway: 24 };
    
    const shortRunwayOutputs = calculateAngelInvestment(shortRunwayInputs);
    const longRunwayOutputs = calculateAngelInvestment(longRunwayInputs);
    
    expect(shortRunwayOutputs.riskScore).toBeGreaterThan(longRunwayOutputs.riskScore);
    expect(shortRunwayOutputs.probabilityOfSuccess).toBeLessThan(longRunwayOutputs.probabilityOfSuccess);
  });
});
