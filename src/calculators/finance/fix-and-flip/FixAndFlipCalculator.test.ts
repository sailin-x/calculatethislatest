import { FixAndFlipCalculator } from './FixAndFlipCalculator';
import { calculateFixAndFlip } from './formulas';
import { validateFixAndFlipInputs } from './validation';
import { FixAndFlipInputs } from './types';

describe('FixAndFlipCalculator', () => {
  const validInputs: FixAndFlipInputs = {
    propertyAddress: '123 Oak Street, Suburbia, CA',
    propertyType: 'single_family',
    propertySize: 2000,
    lotSize: 6000,
    bedrooms: 3,
    bathrooms: 2,
    yearBuilt: 1985,
    propertyCondition: 'fair',
    purchasePrice: 250000,
    purchaseDate: '20240115',
    closingCosts: 10000,
    downPayment: 50000,
    loanAmount: 200000,
    interestRate: 8.5,
    loanTerm: 12,
    loanType: 'hard_money',
    renovationBudget: 60000,
    renovationTimeline: 3,
    kitchenRemodel: true,
    kitchenRemodelCost: 25000,
    bathroomRemodel: true,
    bathroomRemodelCost: 15000,
    electricalWork: true,
    electricalWorkCost: 8000,
    plumbingWork: true,
    plumbingWorkCost: 6000,
    hvacWork: true,
    hvacWorkCost: 12000,
    flooringWork: true,
    flooringWorkCost: 8000,
    paintingWork: true,
    paintingWorkCost: 5000,
    propertyTaxes: 350,
    insurance: 180,
    utilities: 250,
    maintenance: 120,
    targetSalePrice: 380000,
    targetSaleDate: '20240715',
    realtorCommission: 6,
    closingCostsSeller: 6000,
    stagingCosts: 3000,
    marketingCosts: 2000,
    acquisitionTimeline: 30,
    renovationTimeline: 90,
    marketingTimeline: 45,
    totalProjectTimeline: 165,
    marketRisk: 'medium',
    renovationRisk: 'medium',
    financingRisk: 'low',
    timelineRisk: 'medium',
    analysisPeriod: 12,
    discountRate: 12,
    taxRate: 15,
    inflationRate: 2.5,
    appreciationRate: 3
  };

  test('should have correct calculator properties', () => {
    expect(FixAndFlipCalculator.id).toBe('FixAndFlip-calculator');
    expect(FixAndFlipCalculator.name).toBe('Fix and Flip Calculator');
    expect(FixAndFlipCalculator.category).toBe('finance');
    expect(FixAndFlipCalculator.subcategory).toBe('real-estate');
    expect(FixAndFlipCalculator.description).toContain('fix and flip');
  });

  test('should have required inputs', () => {
    const requiredInputs = FixAndFlipCalculator.inputs.filter(input => input.required);
    expect(requiredInputs.length).toBeGreaterThan(0);
    
    const inputIds = FixAndFlipCalculator.inputs.map(input => input.id);
    expect(inputIds).toContain('propertyAddress');
    expect(inputIds).toContain('propertyType');
    expect(inputIds).toContain('purchasePrice');
    expect(inputIds).toContain('targetSalePrice');
  });

  test('should have comprehensive outputs', () => {
    const outputIds = FixAndFlipCalculator.outputs.map(output => output.id);
    expect(outputIds).toContain('totalInvestment');
    expect(outputIds).toContain('netProfit');
    expect(outputIds).toContain('roi');
    expect(outputIds).toContain('projectRating');
  });

  test('should calculate fix and flip analysis correctly', () => {
    const outputs = calculateFixAndFlip(validInputs);
    
    expect(outputs.totalInvestment).toBe(120000); // 50000 + 10000 + 60000
    expect(outputs.totalCosts).toBeGreaterThan(0);
    expect(outputs.netProfit).toBeGreaterThan(0);
    expect(outputs.roi).toBeGreaterThan(0);
  });

  test('should calculate financial metrics correctly', () => {
    const outputs = calculateFixAndFlip(validInputs);
    
    expect(outputs.purchaseCosts).toBe(260000); // 250000 + 10000
    expect(outputs.renovationCosts).toBe(60000);
    expect(outputs.holdingCosts).toBeGreaterThan(0);
    expect(outputs.sellingCosts).toBeGreaterThan(0);
  });

  test('should calculate profitability metrics correctly', () => {
    const outputs = calculateFixAndFlip(validInputs);
    
    expect(outputs.profitMargin).toBeGreaterThan(0);
    expect(outputs.profitPerSquareFoot).toBeGreaterThan(0);
    expect(outputs.profitPerDay).toBeGreaterThan(0);
    expect(outputs.breakEvenPrice).toBeGreaterThan(0);
  });

  test('should calculate risk metrics correctly', () => {
    const outputs = calculateFixAndFlip(validInputs);
    
    expect(outputs.riskScore).toBeGreaterThan(0);
    expect(outputs.riskScore).toBeLessThanOrEqual(10);
    expect(outputs.probabilityOfProfit).toBeGreaterThan(0);
    expect(outputs.probabilityOfProfit).toBeLessThanOrEqual(100);
    expect(outputs.expectedValue).toBeGreaterThan(0);
  });

  test('should calculate market analysis correctly', () => {
    const outputs = calculateFixAndFlip(validInputs);
    
    expect(outputs.afterRepairValue).toBeGreaterThan(0);
    expect(outputs.marketValue).toBeGreaterThan(0);
    expect(outputs.pricePerSquareFoot).toBeGreaterThan(0);
    expect(outputs.comparableAnalysis).toBeDefined();
  });

  test('should calculate financing analysis correctly', () => {
    const outputs = calculateFixAndFlip(validInputs);
    
    expect(outputs.monthlyPayment).toBeGreaterThan(0);
    expect(outputs.totalInterestPaid).toBeGreaterThan(0);
    expect(outputs.loanToValueRatio).toBe(0.8); // 200000 / 250000
    expect(outputs.debtToEquityRatio).toBe(4); // 200000 / 50000
  });

  test('should generate comprehensive analysis', () => {
    const outputs = calculateFixAndFlip(validInputs);
    
    expect(outputs.analysis).toHaveProperty('projectRating');
    expect(outputs.analysis).toHaveProperty('riskRating');
    expect(outputs.analysis).toHaveProperty('recommendation');
    
    expect(['Excellent', 'Good', 'Average', 'Poor', 'Very Poor']).toContain(outputs.analysis.projectRating);
    expect(['Low', 'Moderate', 'High', 'Very High']).toContain(outputs.analysis.riskRating);
    expect(['Proceed', 'Proceed with Caution', 'Reconsider', 'Decline', 'Require Changes']).toContain(outputs.analysis.recommendation);
  });

  test('should calculate timeline analysis correctly', () => {
    const outputs = calculateFixAndFlip(validInputs);
    
    expect(outputs.totalTimeline).toBe(165);
    expect(outputs.acquisitionTimeline).toBe(30);
    expect(outputs.renovationTimeline).toBe(90);
    expect(outputs.marketingTimeline).toBe(45);
    expect(outputs.holdingPeriod).toBe(165);
  });

  test('should handle different property types', () => {
    const singleFamilyInputs = { ...validInputs, propertyType: 'single_family' as const };
    const townhouseInputs = { ...validInputs, propertyType: 'townhouse' as const };
    const condoInputs = { ...validInputs, propertyType: 'condo' as const };
    
    const singleFamilyOutputs = calculateFixAndFlip(singleFamilyInputs);
    const townhouseOutputs = calculateFixAndFlip(townhouseInputs);
    const condoOutputs = calculateFixAndFlip(condoInputs);
    
    expect(singleFamilyOutputs.totalInvestment).toBe(120000);
    expect(townhouseOutputs.totalInvestment).toBe(120000);
    expect(condoOutputs.totalInvestment).toBe(120000);
  });

  test('should handle different loan types', () => {
    const hardMoneyInputs = { ...validInputs, loanType: 'hard_money' as const };
    const conventionalInputs = { ...validInputs, loanType: 'conventional' as const };
    const cashInputs = { ...validInputs, loanType: 'cash' as const };
    
    const hardMoneyOutputs = calculateFixAndFlip(hardMoneyInputs);
    const conventionalOutputs = calculateFixAndFlip(conventionalInputs);
    const cashOutputs = calculateFixAndFlip(cashInputs);
    
    expect(hardMoneyOutputs.totalInvestment).toBe(120000);
    expect(conventionalOutputs.totalInvestment).toBe(120000);
    expect(cashOutputs.totalInvestment).toBe(120000);
  });

  test('should handle different property conditions', () => {
    const excellentInputs = { ...validInputs, propertyCondition: 'excellent' as const };
    const needsWorkInputs = { ...validInputs, propertyCondition: 'needs_work' as const };
    
    const excellentOutputs = calculateFixAndFlip(excellentInputs);
    const needsWorkOutputs = calculateFixAndFlip(needsWorkInputs);
    
    expect(excellentOutputs.riskScore).toBeLessThan(needsWorkOutputs.riskScore);
    expect(excellentOutputs.probabilityOfProfit).toBeGreaterThan(needsWorkOutputs.probabilityOfProfit);
  });

  test('should handle different risk levels', () => {
    const lowRiskInputs = { ...validInputs, marketRisk: 'low' as const, renovationRisk: 'low' as const };
    const highRiskInputs = { ...validInputs, marketRisk: 'high' as const, renovationRisk: 'high' as const };
    
    const lowRiskOutputs = calculateFixAndFlip(lowRiskInputs);
    const highRiskOutputs = calculateFixAndFlip(highRiskInputs);
    
    expect(lowRiskOutputs.riskScore).toBeLessThan(highRiskOutputs.riskScore);
    expect(lowRiskOutputs.probabilityOfProfit).toBeGreaterThan(highRiskOutputs.probabilityOfProfit);
  });

  test('should calculate quality metrics', () => {
    const outputs = calculateFixAndFlip(validInputs);
    
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
    const minimalInputs: FixAndFlipInputs = {
      ...validInputs,
      purchasePrice: 100000,
      downPayment: 20000,
      loanAmount: 80000,
      renovationBudget: 20000,
      targetSalePrice: 150000
    };
    
    const outputs = calculateFixAndFlip(minimalInputs);
    expect(outputs.totalInvestment).toBe(50000); // 20000 + 10000 + 20000
    expect(outputs.netProfit).toBeGreaterThan(0);
  });

  test('should handle large investment scenario', () => {
    const largeInputs: FixAndFlipInputs = {
      ...validInputs,
      purchasePrice: 500000,
      downPayment: 100000,
      loanAmount: 400000,
      renovationBudget: 150000,
      targetSalePrice: 750000
    };
    
    const outputs = calculateFixAndFlip(largeInputs);
    expect(outputs.totalInvestment).toBe(260000); // 100000 + 10000 + 150000
    expect(outputs.netProfit).toBeGreaterThan(0);
  });

  test('should validate inputs correctly', () => {
    const validation = validateFixAndFlipInputs(validInputs);
    expect(validation.isValid).toBe(true);
    expect(validation.errors).toHaveLength(0);
  });

  test('should detect invalid inputs', () => {
    const invalidInputs = {
      ...validInputs,
      purchasePrice: -100000,
      targetSalePrice: 0
    };
    
    const validation = validateFixAndFlipInputs(invalidInputs);
    expect(validation.isValid).toBe(false);
    expect(validation.errors.length).toBeGreaterThan(0);
  });

  test('should detect unrealistic values', () => {
    const unrealisticInputs = {
      ...validInputs,
      purchasePrice: 20000000,
      renovationBudget: 2000000
    };
    
    const validation = validateFixAndFlipInputs(unrealisticInputs);
    expect(validation.isValid).toBe(false);
    expect(validation.errors.some(error => error.includes('unrealistic') || error.includes('excessive'))).toBe(true);
  });

  test('should detect business logic issues', () => {
    const logicErrorInputs = {
      ...validInputs,
      targetSalePrice: 200000 // Less than purchase price
    };
    
    const validation = validateFixAndFlipInputs(logicErrorInputs);
    expect(validation.isValid).toBe(false);
    expect(validation.errors.some(error => error.includes('greater than purchase price'))).toBe(true);
  });

  test('should generate report correctly', () => {
    const outputs = calculateFixAndFlip(validInputs);
    const report = FixAndFlipCalculator.generateReport(validInputs, outputs);
    
    expect(typeof report).toBe('string');
    expect(report.length).toBeGreaterThan(0);
    expect(report).toContain('Fix and Flip Analysis Report');
    expect(report).toContain('Executive Summary');
    expect(report).toContain('Investment Analysis');
  });

  test('should have correct formulas', () => {
    expect(FixAndFlipCalculator.formulas.length).toBeGreaterThan(0);
    
    const formulaNames = FixAndFlipCalculator.formulas.map(f => f.name);
    expect(formulaNames).toContain('Total Investment');
    expect(formulaNames).toContain('Net Profit');
    expect(formulaNames).toContain('ROI');
    expect(formulaNames).toContain('Profit Margin');
  });

  test('should have examples', () => {
    expect(FixAndFlipCalculator.examples.length).toBeGreaterThan(0);
    
    const firstExample = FixAndFlipCalculator.examples[0];
    expect(firstExample).toHaveProperty('name');
    expect(firstExample).toHaveProperty('description');
    expect(firstExample).toHaveProperty('inputs');
  });

  test('should have appropriate tags', () => {
    expect(FixAndFlipCalculator.tags.length).toBeGreaterThan(0);
    expect(FixAndFlipCalculator.tags).toContain('Fix and Flip');
    expect(FixAndFlipCalculator.tags).toContain('Real Estate Investment');
    expect(FixAndFlipCalculator.tags).toContain('Renovation');
  });

  test('should have category info', () => {
    expect(FixAndFlipCalculator.category_info).toHaveProperty('name');
    expect(FixAndFlipCalculator.category_info).toHaveProperty('description');
    expect(FixAndFlipCalculator.category_info.name).toBe('Fix and Flip');
  });

  test('should handle different market trends', () => {
    const appreciatingInputs = { ...validInputs, marketTrends: 'appreciating' as const };
    const decliningInputs = { ...validInputs, marketTrends: 'declining' as const };
    
    const appreciatingOutputs = calculateFixAndFlip(appreciatingInputs);
    const decliningOutputs = calculateFixAndFlip(decliningInputs);
    
    expect(appreciatingOutputs.probabilityOfProfit).toBeGreaterThan(decliningOutputs.probabilityOfProfit);
  });

  test('should handle different renovation scopes', () => {
    const minimalRenovationInputs = { ...validInputs, renovationBudget: 20000 };
    const extensiveRenovationInputs = { ...validInputs, renovationBudget: 100000 };
    
    const minimalOutputs = calculateFixAndFlip(minimalRenovationInputs);
    const extensiveOutputs = calculateFixAndFlip(extensiveRenovationInputs);
    
    expect(minimalOutputs.totalInvestment).toBeLessThan(extensiveOutputs.totalInvestment);
    expect(minimalOutputs.renovationCosts).toBeLessThan(extensiveOutputs.renovationCosts);
  });

  test('should handle different timelines', () => {
    const quickFlipInputs = { ...validInputs, renovationTimeline: 1, marketingTimeline: 15 };
    const slowFlipInputs = { ...validInputs, renovationTimeline: 6, marketingTimeline: 90 };
    
    const quickOutputs = calculateFixAndFlip(quickFlipInputs);
    const slowOutputs = calculateFixAndFlip(slowFlipInputs);
    
    expect(quickOutputs.totalTimeline).toBeLessThan(slowOutputs.totalTimeline);
    expect(quickOutputs.holdingCosts).toBeLessThan(slowOutputs.holdingCosts);
  });

  test('should calculate cash flow correctly', () => {
    const outputs = calculateFixAndFlip(validInputs);
    
    expect(outputs.monthlyCashFlow).toBeLessThan(0); // Negative during holding period
    expect(outputs.totalCashFlow).toBeDefined();
    expect(Array.isArray(outputs.cashFlowTimeline)).toBe(true);
    expect(outputs.cashFlowTimeline.length).toBeGreaterThan(0);
  });

  test('should generate sensitivity analysis', () => {
    const outputs = calculateFixAndFlip(validInputs);
    
    expect(Array.isArray(outputs.sensitivityMatrix)).toBe(true);
    expect(outputs.sensitivityMatrix.length).toBeGreaterThan(0);
    
    const firstSensitivity = outputs.sensitivityMatrix[0];
    expect(firstSensitivity).toHaveProperty('variable');
    expect(firstSensitivity).toHaveProperty('values');
    expect(firstSensitivity).toHaveProperty('impacts');
  });

  test('should generate scenario analysis', () => {
    const outputs = calculateFixAndFlip(validInputs);
    
    expect(Array.isArray(outputs.scenarios)).toBe(true);
    expect(outputs.scenarios.length).toBeGreaterThan(0);
    
    const firstScenario = outputs.scenarios[0];
    expect(firstScenario).toHaveProperty('scenario');
    expect(firstScenario).toHaveProperty('probability');
    expect(firstScenario).toHaveProperty('profit');
    expect(firstScenario).toHaveProperty('roi');
  });

  test('should generate project timeline', () => {
    const outputs = calculateFixAndFlip(validInputs);
    
    expect(Array.isArray(outputs.projectTimeline)).toBe(true);
    expect(outputs.projectTimeline.length).toBeGreaterThan(0);
    
    const firstTimeline = outputs.projectTimeline[0];
    expect(firstTimeline).toHaveProperty('day');
    expect(firstTimeline).toHaveProperty('activity');
    expect(firstTimeline).toHaveProperty('cost');
    expect(firstTimeline).toHaveProperty('progress');
  });

  test('should generate cash flow projections', () => {
    const outputs = calculateFixAndFlip(validInputs);
    
    expect(Array.isArray(outputs.cashFlowProjections)).toBe(true);
    expect(outputs.cashFlowProjections.length).toBeGreaterThan(0);
    
    const firstProjection = outputs.cashFlowProjections[0];
    expect(firstProjection).toHaveProperty('month');
    expect(firstProjection).toHaveProperty('revenue');
    expect(firstProjection).toHaveProperty('expenses');
    expect(firstProjection).toHaveProperty('netCashFlow');
  });

  test('should generate comparative analysis', () => {
    const outputs = calculateFixAndFlip(validInputs);
    
    expect(Array.isArray(outputs.comparativeAnalysis)).toBe(true);
    expect(outputs.comparativeAnalysis.length).toBeGreaterThan(0);
    
    const firstComparison = outputs.comparativeAnalysis[0];
    expect(firstComparison).toHaveProperty('metric');
    expect(firstComparison).toHaveProperty('thisProject');
    expect(firstComparison).toHaveProperty('industryAverage');
  });

  test('should generate risk metrics', () => {
    const outputs = calculateFixAndFlip(validInputs);
    
    expect(Array.isArray(outputs.riskMetrics)).toBe(true);
    expect(outputs.riskMetrics.length).toBeGreaterThan(0);
    
    const firstRiskMetric = outputs.riskMetrics[0];
    expect(firstRiskMetric).toHaveProperty('metric');
    expect(firstRiskMetric).toHaveProperty('value');
    expect(firstRiskMetric).toHaveProperty('riskLevel');
  });

  test('should generate financial projections', () => {
    const outputs = calculateFixAndFlip(validInputs);
    
    expect(Array.isArray(outputs.financialProjections)).toBe(true);
    expect(outputs.financialProjections.length).toBeGreaterThan(0);
    
    const firstProjection = outputs.financialProjections[0];
    expect(firstProjection).toHaveProperty('month');
    expect(firstProjection).toHaveProperty('revenue');
    expect(firstProjection).toHaveProperty('expenses');
    expect(firstProjection).toHaveProperty('profit');
  });

  test('should generate due diligence checklist', () => {
    const outputs = calculateFixAndFlip(validInputs);
    
    expect(Array.isArray(outputs.dueDiligenceChecklist)).toBe(true);
    expect(outputs.dueDiligenceChecklist.length).toBeGreaterThan(0);
    
    const firstCategory = outputs.dueDiligenceChecklist[0];
    expect(firstCategory).toHaveProperty('category');
    expect(firstCategory).toHaveProperty('items');
    expect(Array.isArray(firstCategory.items)).toBe(true);
  });

  test('should generate project plan', () => {
    const outputs = calculateFixAndFlip(validInputs);
    
    expect(Array.isArray(outputs.projectPlan)).toBe(true);
    expect(outputs.projectPlan.length).toBeGreaterThan(0);
    
    const firstPhase = outputs.projectPlan[0];
    expect(firstPhase).toHaveProperty('phase');
    expect(firstPhase).toHaveProperty('activities');
    expect(firstPhase).toHaveProperty('timeline');
    expect(firstPhase).toHaveProperty('budget');
  });

  test('should generate exit planning', () => {
    const outputs = calculateFixAndFlip(validInputs);
    
    expect(outputs.exitPlanning).toHaveProperty('strategy');
    expect(outputs.exitPlanning).toHaveProperty('timeline');
    expect(outputs.exitPlanning).toHaveProperty('marketing');
    expect(outputs.exitPlanning).toHaveProperty('pricing');
  });

  test('should generate risk mitigation', () => {
    const outputs = calculateFixAndFlip(validInputs);
    
    expect(Array.isArray(outputs.riskMitigation)).toBe(true);
    expect(outputs.riskMitigation.length).toBeGreaterThan(0);
    
    const firstMitigation = outputs.riskMitigation[0];
    expect(firstMitigation).toHaveProperty('risk');
    expect(firstMitigation).toHaveProperty('mitigation');
    expect(firstMitigation).toHaveProperty('cost');
    expect(firstMitigation).toHaveProperty('effectiveness');
  });

  test('should generate performance tracking', () => {
    const outputs = calculateFixAndFlip(validInputs);
    
    expect(Array.isArray(outputs.performanceTracking)).toBe(true);
    expect(outputs.performanceTracking.length).toBeGreaterThan(0);
    
    const firstTracking = outputs.performanceTracking[0];
    expect(firstTracking).toHaveProperty('metric');
    expect(firstTracking).toHaveProperty('current');
    expect(firstTracking).toHaveProperty('target');
    expect(firstTracking).toHaveProperty('frequency');
  });
});
