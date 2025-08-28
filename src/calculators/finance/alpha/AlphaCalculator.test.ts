import { AlphaCalculator } from './AlphaCalculator';
import { calculateAlpha } from './formulas';
import { validateAlphaInputs } from './validation';
import { AlphaInputs } from './types';

describe('AlphaCalculator', () => {
  const validInputs: AlphaInputs = {
    portfolioReturns: [2.1, -1.5, 3.2, 0.8, 1.9, 2.5, -0.8, 1.2, 2.8, 0.5, 1.6, 2.3],
    benchmarkReturns: [1.8, -2.1, 2.9, 0.5, 1.6, 2.1, -1.2, 0.8, 2.2, 0.3, 1.2, 1.9],
    riskFreeRate: 2.5,
    analysisPeriod: 'monthly',
    confidenceLevel: 95,
    lookbackPeriod: 60,
    portfolioValue: 1000000,
    benchmarkName: 'S&P 500',
    portfolioName: 'Growth Portfolio'
  };

  test('should have correct calculator properties', () => {
    expect(AlphaCalculator.id).toBe('alpha-calculator');
    expect(AlphaCalculator.name).toBe('Alpha Calculator');
    expect(AlphaCalculator.category).toBe('finance');
    expect(AlphaCalculator.subcategory).toBe('investment');
    expect(AlphaCalculator.description).toContain('Jensen\'s Alpha');
  });

  test('should have required inputs', () => {
    const requiredInputs = AlphaCalculator.inputs.filter(input => input.required);
    expect(requiredInputs.length).toBeGreaterThan(0);
    
    const inputIds = AlphaCalculator.inputs.map(input => input.id);
    expect(inputIds).toContain('portfolioReturns');
    expect(inputIds).toContain('benchmarkReturns');
    expect(inputIds).toContain('riskFreeRate');
  });

  test('should have comprehensive outputs', () => {
    const outputIds = AlphaCalculator.outputs.map(output => output.id);
    expect(outputIds).toContain('alpha');
    expect(outputIds).toContain('alphaAnnualized');
    expect(outputIds).toContain('alphaTStatistic');
    expect(outputIds).toContain('alphaPValue');
    expect(outputIds).toContain('informationRatio');
  });

  test('should calculate core alpha metrics correctly', () => {
    const outputs = calculateAlpha(validInputs);
    
    expect(typeof outputs.alpha).toBe('number');
    expect(typeof outputs.alphaAnnualized).toBe('number');
    expect(typeof outputs.alphaTStatistic).toBe('number');
    expect(typeof outputs.alphaPValue).toBe('number');
    expect(typeof outputs.alphaStandardError).toBe('number');
    expect(outputs.alphaConfidenceInterval).toHaveProperty('lower');
    expect(outputs.alphaConfidenceInterval).toHaveProperty('upper');
  });

  test('should calculate supporting metrics correctly', () => {
    const outputs = calculateAlpha(validInputs);
    
    expect(typeof outputs.beta).toBe('number');
    expect(typeof outputs.rSquared).toBe('number');
    expect(typeof outputs.correlation).toBe('number');
    
    expect(outputs.rSquared).toBeGreaterThanOrEqual(0);
    expect(outputs.rSquared).toBeLessThanOrEqual(1);
    expect(Math.abs(outputs.correlation)).toBeLessThanOrEqual(1);
  });

  test('should calculate risk metrics correctly', () => {
    const outputs = calculateAlpha(validInputs);
    
    expect(outputs.portfolioVolatility).toBeGreaterThan(0);
    expect(outputs.benchmarkVolatility).toBeGreaterThan(0);
    expect(outputs.trackingError).toBeGreaterThanOrEqual(0);
    expect(outputs.systematicRisk).toBeGreaterThanOrEqual(0);
    expect(outputs.idiosyncraticRisk).toBeGreaterThanOrEqual(0);
  });

  test('should calculate performance metrics correctly', () => {
    const outputs = calculateAlpha(validInputs);
    
    expect(typeof outputs.totalReturn).toBe('number');
    expect(typeof outputs.excessReturn).toBe('number');
    expect(typeof outputs.sharpeRatio).toBe('number');
    expect(typeof outputs.sortinoRatio).toBe('number');
    expect(typeof outputs.treynorRatio).toBe('number');
    expect(typeof outputs.informationRatio).toBe('number');
  });

  test('should generate comprehensive analysis', () => {
    const outputs = calculateAlpha(validInputs);
    
    expect(outputs.analysis).toHaveProperty('alphaRating');
    expect(outputs.analysis).toHaveProperty('significanceLevel');
    expect(outputs.analysis).toHaveProperty('recommendation');
    
    expect(['Excellent', 'Good', 'Average', 'Poor', 'Very Poor']).toContain(outputs.analysis.alphaRating);
    expect(['Highly Significant', 'Significant', 'Marginally Significant', 'Not Significant']).toContain(outputs.analysis.significanceLevel);
    expect(['Buy', 'Hold', 'Sell', 'Strong Buy', 'Strong Sell']).toContain(outputs.analysis.recommendation);
  });

  test('should handle different analysis periods', () => {
    const quarterlyInputs = { ...validInputs, analysisPeriod: 'quarterly' as const };
    const yearlyInputs = { ...validInputs, analysisPeriod: 'yearly' as const };
    
    const quarterlyOutputs = calculateAlpha(quarterlyInputs);
    const yearlyOutputs = calculateAlpha(yearlyInputs);
    
    expect(quarterlyOutputs.portfolioVolatility).toBeGreaterThan(0);
    expect(yearlyOutputs.portfolioVolatility).toBeGreaterThan(0);
  });

  test('should handle market returns when provided', () => {
    const inputsWithMarket = {
      ...validInputs,
      marketReturns: [1.9, -2.0, 3.0, 0.6, 1.7, 2.2, -1.1, 0.9, 2.3, 0.4, 1.3, 2.0]
    };
    
    const outputs = calculateAlpha(inputsWithMarket);
    expect(typeof outputs.beta).toBe('number');
    expect(outputs.beta).toBeGreaterThanOrEqual(0);
  });

  test('should calculate rolling analysis correctly', () => {
    const outputs = calculateAlpha(validInputs);
    
    expect(Array.isArray(outputs.rollingAlpha)).toBe(true);
    expect(Array.isArray(outputs.rollingBeta)).toBe(true);
    expect(Array.isArray(outputs.rollingSharpe)).toBe(true);
    
    if (outputs.rollingAlpha.length > 0) {
      expect(typeof outputs.rollingAlpha[0]).toBe('number');
      expect(typeof outputs.rollingBeta[0]).toBe('number');
      expect(typeof outputs.rollingSharpe[0]).toBe('number');
    }
  });

  test('should generate time series data', () => {
    const outputs = calculateAlpha(validInputs);
    
    expect(Array.isArray(outputs.timeSeriesData)).toBe(true);
    expect(outputs.timeSeriesData.length).toBe(validInputs.portfolioReturns.length);
    
    if (outputs.timeSeriesData.length > 0) {
      const firstEntry = outputs.timeSeriesData[0];
      expect(firstEntry).toHaveProperty('date');
      expect(firstEntry).toHaveProperty('portfolioReturn');
      expect(firstEntry).toHaveProperty('benchmarkReturn');
      expect(firstEntry).toHaveProperty('cumulativeAlpha');
      expect(firstEntry).toHaveProperty('cumulativeBeta');
    }
  });

  test('should generate factor decomposition', () => {
    const outputs = calculateAlpha(validInputs);
    
    expect(Array.isArray(outputs.factorDecomposition)).toBe(true);
    expect(outputs.factorDecomposition.length).toBeGreaterThan(0);
    
    const firstFactor = outputs.factorDecomposition[0];
    expect(firstFactor).toHaveProperty('factor');
    expect(firstFactor).toHaveProperty('exposure');
    expect(firstFactor).toHaveProperty('contribution');
    expect(firstFactor).toHaveProperty('riskContribution');
  });

  test('should generate stress test scenarios', () => {
    const outputs = calculateAlpha(validInputs);
    
    expect(Array.isArray(outputs.stressTestScenarios)).toBe(true);
    expect(outputs.stressTestScenarios.length).toBeGreaterThan(0);
    
    const firstScenario = outputs.stressTestScenarios[0];
    expect(firstScenario).toHaveProperty('scenario');
    expect(firstScenario).toHaveProperty('portfolioReturn');
    expect(firstScenario).toHaveProperty('benchmarkReturn');
    expect(firstScenario).toHaveProperty('alpha');
    expect(firstScenario).toHaveProperty('beta');
    expect(firstScenario).toHaveProperty('sharpeRatio');
  });

  test('should generate optimization suggestions', () => {
    const outputs = calculateAlpha(validInputs);
    
    expect(Array.isArray(outputs.optimizationSuggestions)).toBe(true);
    
    if (outputs.optimizationSuggestions.length > 0) {
      const firstSuggestion = outputs.optimizationSuggestions[0];
      expect(firstSuggestion).toHaveProperty('action');
      expect(firstSuggestion).toHaveProperty('expectedImpact');
      expect(firstSuggestion).toHaveProperty('implementation');
      expect(firstSuggestion).toHaveProperty('risk');
    }
  });

  test('should generate risk management suggestions', () => {
    const outputs = calculateAlpha(validInputs);
    
    expect(Array.isArray(outputs.riskManagementSuggestions)).toBe(true);
    
    if (outputs.riskManagementSuggestions.length > 0) {
      const firstSuggestion = outputs.riskManagementSuggestions[0];
      expect(firstSuggestion).toHaveProperty('action');
      expect(firstSuggestion).toHaveProperty('expectedBenefit');
      expect(firstSuggestion).toHaveProperty('implementation');
      expect(firstSuggestion).toHaveProperty('cost');
    }
  });

  test('should calculate quality metrics', () => {
    const outputs = calculateAlpha(validInputs);
    
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

  test('should handle edge case with minimal data', () => {
    const minimalInputs: AlphaInputs = {
      portfolioReturns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      benchmarkReturns: [0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5, 10.5, 11.5],
      riskFreeRate: 2.0,
      analysisPeriod: 'monthly',
      confidenceLevel: 95,
      lookbackPeriod: 12,
      portfolioValue: 100000,
      benchmarkName: 'Test Benchmark',
      portfolioName: 'Test Portfolio'
    };
    
    const outputs = calculateAlpha(minimalInputs);
    expect(typeof outputs.alpha).toBe('number');
    expect(typeof outputs.beta).toBe('number');
  });

  test('should handle negative alpha scenario', () => {
    const negativeAlphaInputs: AlphaInputs = {
      ...validInputs,
      portfolioReturns: [0.5, -1.0, 0.3, -0.8, 0.2, -0.5, 0.1, -0.3, 0.4, -0.6, 0.2, -0.4],
      benchmarkReturns: [1.0, -0.5, 1.2, -0.3, 0.8, -0.2, 0.9, -0.1, 1.1, -0.4, 0.7, -0.2]
    };
    
    const outputs = calculateAlpha(negativeAlphaInputs);
    expect(outputs.alpha).toBeLessThan(0);
  });

  test('should validate inputs correctly', () => {
    const validation = validateAlphaInputs(validInputs);
    expect(validation.isValid).toBe(true);
    expect(validation.errors).toHaveLength(0);
  });

  test('should detect invalid inputs', () => {
    const invalidInputs = {
      ...validInputs,
      portfolioReturns: [],
      riskFreeRate: -5
    };
    
    const validation = validateAlphaInputs(invalidInputs);
    expect(validation.isValid).toBe(false);
    expect(validation.errors.length).toBeGreaterThan(0);
  });

  test('should detect mismatched array lengths', () => {
    const mismatchedInputs = {
      ...validInputs,
      portfolioReturns: [1, 2, 3, 4, 5],
      benchmarkReturns: [1, 2, 3, 4, 5, 6]
    };
    
    const validation = validateAlphaInputs(mismatchedInputs);
    expect(validation.isValid).toBe(false);
    expect(validation.errors.some(error => error.includes('same length'))).toBe(true);
  });

  test('should detect extreme values', () => {
    const extremeInputs = {
      ...validInputs,
      portfolioReturns: [150, -200, 300, -400, 500, -600, 700, -800, 900, -1000, 1100, -1200]
    };
    
    const validation = validateAlphaInputs(extremeInputs);
    expect(validation.isValid).toBe(false);
    expect(validation.errors.some(error => error.includes('extreme values'))).toBe(true);
  });

  test('should generate report correctly', () => {
    const outputs = calculateAlpha(validInputs);
    const report = AlphaCalculator.generateReport(validInputs, outputs);
    
    expect(typeof report).toBe('string');
    expect(report.length).toBeGreaterThan(0);
    expect(report).toContain('Alpha Analysis Report');
    expect(report).toContain('Executive Summary');
    expect(report).toContain('Core Alpha Metrics');
  });

  test('should have correct formulas', () => {
    expect(AlphaCalculator.formulas.length).toBeGreaterThan(0);
    
    const formulaNames = AlphaCalculator.formulas.map(f => f.name);
    expect(formulaNames).toContain('Jensen\'s Alpha');
    expect(formulaNames).toContain('Alpha T-Statistic');
    expect(formulaNames).toContain('Information Ratio');
  });

  test('should have examples', () => {
    expect(AlphaCalculator.examples.length).toBeGreaterThan(0);
    
    const firstExample = AlphaCalculator.examples[0];
    expect(firstExample).toHaveProperty('name');
    expect(firstExample).toHaveProperty('description');
    expect(firstExample).toHaveProperty('inputs');
  });

  test('should have appropriate tags', () => {
    expect(AlphaCalculator.tags.length).toBeGreaterThan(0);
    expect(AlphaCalculator.tags).toContain('Investment Analysis');
    expect(AlphaCalculator.tags).toContain('Alpha');
    expect(AlphaCalculator.tags).toContain('Jensen\'s Alpha');
  });

  test('should have category info', () => {
    expect(AlphaCalculator.category_info).toHaveProperty('name');
    expect(AlphaCalculator.category_info).toHaveProperty('description');
    expect(AlphaCalculator.category_info.name).toBe('Investment Analysis');
  });
});
