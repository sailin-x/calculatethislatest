import { FloodInsuranceCalculator } from './FloodInsuranceCalculator';
import { calculateFloodInsurance } from './formulas';
import { validateFloodInsuranceInputs } from './validation';
import { FloodInsuranceInputs } from './types';

describe('FloodInsuranceCalculator', () => {
  const validInputs: FloodInsuranceInputs = {
    propertyAddress: '123 Oak Street, Suburbia, CA',
    propertyType: 'single_family',
    propertyValue: 350000,
    propertySize: 2000,
    yearBuilt: 1995,
    numberOfStories: 2,
    foundationType: 'slab',
    floodZone: 'AE',
    elevationCertificate: true,
    baseFloodElevation: 10,
    propertyElevation: 12,
    distanceToWater: 500,
    coastalLocation: false,
    buildingCoverage: 250000,
    contentsCoverage: 100000,
    replacementCostValue: 350000,
    actualCashValue: false,
    replacementCost: true,
    buildingDeductible: 1000,
    contentsDeductible: 1000,
    separateDeductibles: true,
    policyType: 'standard',
    policyTerm: 12,
    policyStartDate: '2024-01-01',
    policyEndDate: '2024-12-31',
    floodHistory: false,
    numberOfPreviousClaims: 0,
    yearsSinceLastClaim: 10,
    floodRiskScore: 5,
    elevationRisk: 'medium',
    constructionType: 'frame',
    roofType: 'gable',
    roofAge: 10,
    foundationHeight: 2,
    floodVents: true,
    numberOfFloodVents: 4,
    communityRatingSystem: 7,
    floodplainManagement: true,
    buildingCodes: 'enhanced',
    emergencyServices: true,
    insuranceCompany: 'ABC Insurance Co.',
    companyRating: 'A+',
    claimsService: 'good',
    multiPolicyDiscount: true,
    claimsFreeDiscount: true,
    protectiveDeviceDiscount: false,
    communityDiscount: true,
    elevationDiscount: false,
    lossOfUse: false,
    lossOfUseLimit: 5000,
    ordinanceOrLaw: false,
    ordinanceOrLawLimit: 10000,
    sewerBackup: false,
    sewerBackupLimit: 5000,
    analysisPeriod: 10,
    inflationRate: 2.5,
    propertyAppreciationRate: 3
  };

  test('should have correct calculator properties', () => {
    expect(FloodInsuranceCalculator.id).toBe('flood-insurance-calculator');
    expect(FloodInsuranceCalculator.name).toBe('Flood Insurance Calculator');
    expect(FloodInsuranceCalculator.category).toBe('finance');
    expect(FloodInsuranceCalculator.subcategory).toBe('insurance');
    expect(FloodInsuranceCalculator.description).toContain('flood insurance');
  });

  test('should have required inputs', () => {
    const requiredInputs = FloodInsuranceCalculator.inputs.filter(input => input.required);
    expect(requiredInputs.length).toBeGreaterThan(0);
    
    const inputIds = FloodInsuranceCalculator.inputs.map(input => input.id);
    expect(inputIds).toContain('propertyAddress');
    expect(inputIds).toContain('propertyType');
    expect(inputIds).toContain('propertyValue');
    expect(inputIds).toContain('floodZone');
  });

  test('should have comprehensive outputs', () => {
    const outputIds = FloodInsuranceCalculator.outputs.map(output => output.id);
    expect(outputIds).toContain('annualPremium');
    expect(outputIds).toContain('totalCoverage');
    expect(outputIds).toContain('riskScore');
    expect(outputIds).toContain('policyRating');
  });

  test('should calculate flood insurance analysis correctly', () => {
    const outputs = calculateFloodInsurance(validInputs);
    
    expect(outputs.annualPremium).toBeGreaterThan(0);
    expect(outputs.totalCoverage).toBe(350000); // 250000 + 100000
    expect(outputs.riskScore).toBeGreaterThan(0);
    expect(outputs.riskScore).toBeLessThanOrEqual(10);
  });

  test('should calculate premium metrics correctly', () => {
    const outputs = calculateFloodInsurance(validInputs);
    
    expect(outputs.annualPremium).toBeGreaterThan(0);
    expect(outputs.monthlyPremium).toBeGreaterThan(0);
    expect(outputs.totalPremium).toBeGreaterThan(0);
    expect(outputs.premiumPerSquareFoot).toBeGreaterThan(0);
    expect(outputs.premiumToValueRatio).toBeGreaterThan(0);
  });

  test('should calculate coverage analysis correctly', () => {
    const outputs = calculateFloodInsurance(validInputs);
    
    expect(outputs.totalCoverage).toBe(350000);
    expect(outputs.coverageGap).toBe(0);
    expect(outputs.coverageAdequacy).toBe(100);
    expect(outputs.replacementCostCoverage).toBe(100);
  });

  test('should calculate risk analysis correctly', () => {
    const outputs = calculateFloodInsurance(validInputs);
    
    expect(outputs.floodRiskLevel).toBeDefined();
    expect(outputs.riskScore).toBeGreaterThan(0);
    expect(outputs.riskScore).toBeLessThanOrEqual(10);
    expect(outputs.probabilityOfFlood).toBeGreaterThan(0);
    expect(outputs.probabilityOfFlood).toBeLessThanOrEqual(100);
    expect(outputs.expectedLoss).toBeGreaterThan(0);
  });

  test('should calculate cost analysis correctly', () => {
    const outputs = calculateFloodInsurance(validInputs);
    
    expect(outputs.totalCost).toBeGreaterThan(0);
    expect(outputs.costPerYear).toBeGreaterThan(0);
    expect(outputs.costPerMonth).toBeGreaterThan(0);
    expect(outputs.costEffectiveness).toBeDefined();
  });

  test('should calculate deductible analysis correctly', () => {
    const outputs = calculateFloodInsurance(validInputs);
    
    expect(outputs.totalDeductible).toBe(2000); // 1000 + 1000
    expect(outputs.deductibleImpact).toBeDefined();
    expect(outputs.outOfPocketMaximum).toBe(2000);
  });

  test('should calculate policy analysis correctly', () => {
    const outputs = calculateFloodInsurance(validInputs);
    
    expect(outputs.policyEfficiency).toBeGreaterThan(0);
    expect(outputs.coverageEfficiency).toBeGreaterThan(0);
    expect(outputs.premiumEfficiency).toBeDefined();
  });

  test('should generate comprehensive analysis', () => {
    const outputs = calculateFloodInsurance(validInputs);
    
    expect(outputs.analysis).toHaveProperty('policyRating');
    expect(outputs.analysis).toHaveProperty('riskRating');
    expect(outputs.analysis).toHaveProperty('recommendation');
    
    expect(['Excellent', 'Good', 'Average', 'Poor', 'Very Poor']).toContain(outputs.analysis.policyRating);
    expect(['Low', 'Moderate', 'High', 'Very High']).toContain(outputs.analysis.riskRating);
    expect(['Purchase', 'Consider', 'Shop Around', 'Avoid', 'Require Changes']).toContain(outputs.analysis.recommendation);
  });

  test('should handle different flood zones', () => {
    const lowRiskInputs = { ...validInputs, floodZone: 'X' as const };
    const highRiskInputs = { ...validInputs, floodZone: 'VE' as const };
    
    const lowRiskOutputs = calculateFloodInsurance(lowRiskInputs);
    const highRiskOutputs = calculateFloodInsurance(highRiskInputs);
    
    expect(lowRiskOutputs.annualPremium).toBeLessThan(highRiskOutputs.annualPremium);
    expect(lowRiskOutputs.riskScore).toBeLessThan(highRiskOutputs.riskScore);
  });

  test('should handle different property types', () => {
    const singleFamilyInputs = { ...validInputs, propertyType: 'single_family' as const };
    const commercialInputs = { ...validInputs, propertyType: 'commercial' as const };
    
    const singleFamilyOutputs = calculateFloodInsurance(singleFamilyInputs);
    const commercialOutputs = calculateFloodInsurance(commercialInputs);
    
    expect(singleFamilyOutputs.annualPremium).toBeLessThan(commercialOutputs.annualPremium);
  });

  test('should handle different policy types', () => {
    const standardInputs = { ...validInputs, policyType: 'standard' as const };
    const preferredInputs = { ...validInputs, policyType: 'preferred' as const };
    
    const standardOutputs = calculateFloodInsurance(standardInputs);
    const preferredOutputs = calculateFloodInsurance(preferredInputs);
    
    expect(standardOutputs.annualPremium).toBeGreaterThan(0);
    expect(preferredOutputs.annualPremium).toBeGreaterThan(0);
  });

  test('should handle flood history impact', () => {
    const noHistoryInputs = { ...validInputs, floodHistory: false };
    const withHistoryInputs = { ...validInputs, floodHistory: true };
    
    const noHistoryOutputs = calculateFloodInsurance(noHistoryInputs);
    const withHistoryOutputs = calculateFloodInsurance(withHistoryInputs);
    
    expect(withHistoryOutputs.riskScore).toBeGreaterThan(noHistoryOutputs.riskScore);
    expect(withHistoryOutputs.annualPremium).toBeGreaterThan(noHistoryOutputs.annualPremium);
  });

  test('should handle elevation impact', () => {
    const lowElevationInputs = { ...validInputs, elevationRisk: 'low' as const };
    const highElevationInputs = { ...validInputs, elevationRisk: 'high' as const };
    
    const lowElevationOutputs = calculateFloodInsurance(lowElevationInputs);
    const highElevationOutputs = calculateFloodInsurance(highElevationInputs);
    
    expect(lowElevationOutputs.riskScore).toBeLessThan(highElevationOutputs.riskScore);
  });

  test('should handle coastal location impact', () => {
    const inlandInputs = { ...validInputs, coastalLocation: false };
    const coastalInputs = { ...validInputs, coastalLocation: true };
    
    const inlandOutputs = calculateFloodInsurance(inlandInputs);
    const coastalOutputs = calculateFloodInsurance(coastalInputs);
    
    expect(coastalOutputs.riskScore).toBeGreaterThan(inlandOutputs.riskScore);
    expect(coastalOutputs.annualPremium).toBeGreaterThan(inlandOutputs.annualPremium);
  });

  test('should handle different coverage amounts', () => {
    const lowCoverageInputs = { ...validInputs, buildingCoverage: 200000, contentsCoverage: 50000 };
    const highCoverageInputs = { ...validInputs, buildingCoverage: 300000, contentsCoverage: 150000 };
    
    const lowCoverageOutputs = calculateFloodInsurance(lowCoverageInputs);
    const highCoverageOutputs = calculateFloodInsurance(highCoverageInputs);
    
    expect(lowCoverageOutputs.totalCoverage).toBe(250000);
    expect(highCoverageOutputs.totalCoverage).toBe(450000);
    expect(highCoverageOutputs.annualPremium).toBeGreaterThan(lowCoverageOutputs.annualPremium);
  });

  test('should handle different deductible amounts', () => {
    const lowDeductibleInputs = { ...validInputs, buildingDeductible: 500, contentsDeductible: 500 };
    const highDeductibleInputs = { ...validInputs, buildingDeductible: 2500, contentsDeductible: 1000 };
    
    const lowDeductibleOutputs = calculateFloodInsurance(lowDeductibleInputs);
    const highDeductibleOutputs = calculateFloodInsurance(highDeductibleInputs);
    
    expect(lowDeductibleOutputs.totalDeductible).toBe(1000);
    expect(highDeductibleOutputs.totalDeductible).toBe(3500);
  });

  test('should calculate quality metrics', () => {
    const outputs = calculateFloodInsurance(validInputs);
    
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

  test('should handle edge case with minimal coverage', () => {
    const minimalInputs: FloodInsuranceInputs = {
      ...validInputs,
      propertyValue: 100000,
      buildingCoverage: 80000,
      contentsCoverage: 20000
    };
    
    const outputs = calculateFloodInsurance(minimalInputs);
    expect(outputs.totalCoverage).toBe(100000);
    expect(outputs.coverageAdequacy).toBe(100);
    expect(outputs.annualPremium).toBeGreaterThan(0);
  });

  test('should handle large property scenario', () => {
    const largeInputs: FloodInsuranceInputs = {
      ...validInputs,
      propertyValue: 1000000,
      buildingCoverage: 800000,
      contentsCoverage: 200000
    };
    
    const outputs = calculateFloodInsurance(largeInputs);
    expect(outputs.totalCoverage).toBe(1000000);
    expect(outputs.coverageAdequacy).toBe(100);
    expect(outputs.annualPremium).toBeGreaterThan(0);
  });

  test('should validate inputs correctly', () => {
    const validation = validateFloodInsuranceInputs(validInputs);
    expect(validation.isValid).toBe(true);
    expect(validation.errors).toHaveLength(0);
  });

  test('should detect invalid inputs', () => {
    const invalidInputs = {
      ...validInputs,
      propertyValue: -100000,
      buildingCoverage: 0
    };
    
    const validation = validateFloodInsuranceInputs(invalidInputs);
    expect(validation.isValid).toBe(false);
    expect(validation.errors.length).toBeGreaterThan(0);
  });

  test('should detect unrealistic values', () => {
    const unrealisticInputs = {
      ...validInputs,
      propertyValue: 20000000,
      buildingCoverage: 15000000
    };
    
    const validation = validateFloodInsuranceInputs(unrealisticInputs);
    expect(validation.isValid).toBe(false);
    expect(validation.errors.some(error => error.includes('unrealistic') || error.includes('excessive'))).toBe(true);
  });

  test('should detect business logic issues', () => {
    const logicErrorInputs = {
      ...validInputs,
      buildingCoverage: 500000 // Exceeds property value
    };
    
    const validation = validateFloodInsuranceInputs(logicErrorInputs);
    expect(validation.isValid).toBe(false);
    expect(validation.errors.some(error => error.includes('exceed'))).toBe(true);
  });

  test('should generate report correctly', () => {
    const outputs = calculateFloodInsurance(validInputs);
    const report = FloodInsuranceCalculator.generateReport(validInputs, outputs);
    
    expect(typeof report).toBe('string');
    expect(report.length).toBeGreaterThan(0);
    expect(report).toContain('Flood Insurance Analysis Report');
    expect(report).toContain('Executive Summary');
    expect(report).toContain('Premium Analysis');
  });

  test('should have correct formulas', () => {
    expect(FloodInsuranceCalculator.formulas.length).toBeGreaterThan(0);
    
    const formulaNames = FloodInsuranceCalculator.formulas.map(f => f.name);
    expect(formulaNames).toContain('Annual Premium');
    expect(formulaNames).toContain('Premium to Value Ratio');
    expect(formulaNames).toContain('Coverage Adequacy');
    expect(formulaNames).toContain('Risk Score');
  });

  test('should have examples', () => {
    expect(FloodInsuranceCalculator.examples.length).toBeGreaterThan(0);
    
    const firstExample = FloodInsuranceCalculator.examples[0];
    expect(firstExample).toHaveProperty('name');
    expect(firstExample).toHaveProperty('description');
    expect(firstExample).toHaveProperty('inputs');
  });

  test('should have appropriate tags', () => {
    expect(FloodInsuranceCalculator.tags.length).toBeGreaterThan(0);
    expect(FloodInsuranceCalculator.tags).toContain('Flood Insurance');
    expect(FloodInsuranceCalculator.tags).toContain('Property Insurance');
    expect(FloodInsuranceCalculator.tags).toContain('Risk Assessment');
  });

  test('should have category info', () => {
    expect(FloodInsuranceCalculator.category_info).toHaveProperty('name');
    expect(FloodInsuranceCalculator.category_info).toHaveProperty('description');
    expect(FloodInsuranceCalculator.category_info.name).toBe('Flood Insurance');
  });

  test('should handle different construction types', () => {
    const frameInputs = { ...validInputs, constructionType: 'frame' as const };
    const masonryInputs = { ...validInputs, constructionType: 'masonry' as const };
    
    const frameOutputs = calculateFloodInsurance(frameInputs);
    const masonryOutputs = calculateFloodInsurance(masonryInputs);
    
    expect(frameOutputs.riskScore).toBeGreaterThan(masonryOutputs.riskScore);
  });

  test('should handle different foundation types', () => {
    const slabInputs = { ...validInputs, foundationType: 'slab' as const };
    const elevatedInputs = { ...validInputs, foundationType: 'elevated' as const };
    
    const slabOutputs = calculateFloodInsurance(slabInputs);
    const elevatedOutputs = calculateFloodInsurance(elevatedInputs);
    
    expect(slabOutputs.annualPremium).toBeGreaterThan(0);
    expect(elevatedOutputs.annualPremium).toBeGreaterThan(0);
  });

  test('should handle flood vents impact', () => {
    const noVentsInputs = { ...validInputs, floodVents: false, numberOfFloodVents: 0 };
    const withVentsInputs = { ...validInputs, floodVents: true, numberOfFloodVents: 4 };
    
    const noVentsOutputs = calculateFloodInsurance(noVentsInputs);
    const withVentsOutputs = calculateFloodInsurance(withVentsInputs);
    
    expect(withVentsOutputs.annualPremium).toBeLessThan(noVentsOutputs.annualPremium);
  });

  test('should handle community rating system impact', () => {
    const lowRatingInputs = { ...validInputs, communityRatingSystem: 3 };
    const highRatingInputs = { ...validInputs, communityRatingSystem: 8 };
    
    const lowRatingOutputs = calculateFloodInsurance(lowRatingInputs);
    const highRatingOutputs = calculateFloodInsurance(highRatingInputs);
    
    expect(highRatingOutputs.annualPremium).toBeLessThan(lowRatingOutputs.annualPremium);
  });

  test('should handle additional coverage options', () => {
    const basicInputs = { ...validInputs, lossOfUse: false, ordinanceOrLaw: false, sewerBackup: false };
    const comprehensiveInputs = { ...validInputs, lossOfUse: true, ordinanceOrLaw: true, sewerBackup: true };
    
    const basicOutputs = calculateFloodInsurance(basicInputs);
    const comprehensiveOutputs = calculateFloodInsurance(comprehensiveInputs);
    
    expect(comprehensiveOutputs.annualPremium).toBeGreaterThan(basicOutputs.annualPremium);
  });

  test('should handle discount impacts', () => {
    const noDiscountsInputs = { ...validInputs, multiPolicyDiscount: false, claimsFreeDiscount: false, communityDiscount: false };
    const withDiscountsInputs = { ...validInputs, multiPolicyDiscount: true, claimsFreeDiscount: true, communityDiscount: true };
    
    const noDiscountsOutputs = calculateFloodInsurance(noDiscountsInputs);
    const withDiscountsOutputs = calculateFloodInsurance(withDiscountsInputs);
    
    expect(withDiscountsOutputs.annualPremium).toBeLessThan(noDiscountsOutputs.annualPremium);
  });

  test('should generate premium projections', () => {
    const outputs = calculateFloodInsurance(validInputs);
    
    expect(Array.isArray(outputs.premiumProjections)).toBe(true);
    expect(outputs.premiumProjections.length).toBeGreaterThan(0);
    
    const firstProjection = outputs.premiumProjections[0];
    expect(firstProjection).toHaveProperty('year');
    expect(firstProjection).toHaveProperty('premium');
    expect(firstProjection).toHaveProperty('inflationAdjusted');
    expect(firstProjection).toHaveProperty('cumulativeCost');
  });

  test('should generate scenario analysis', () => {
    const outputs = calculateFloodInsurance(validInputs);
    
    expect(Array.isArray(outputs.scenarioAnalysis)).toBe(true);
    expect(outputs.scenarioAnalysis.length).toBeGreaterThan(0);
    
    const firstScenario = outputs.scenarioAnalysis[0];
    expect(firstScenario).toHaveProperty('scenario');
    expect(firstScenario).toHaveProperty('probability');
    expect(firstScenario).toHaveProperty('impact');
    expect(firstScenario).toHaveProperty('riskLevel');
  });

  test('should generate comparative analysis', () => {
    const outputs = calculateFloodInsurance(validInputs);
    
    expect(Array.isArray(outputs.comparativeAnalysis)).toBe(true);
    expect(outputs.comparativeAnalysis.length).toBeGreaterThan(0);
    
    const firstComparison = outputs.comparativeAnalysis[0];
    expect(firstComparison).toHaveProperty('metric');
    expect(firstComparison).toHaveProperty('thisPolicy');
    expect(firstComparison).toHaveProperty('marketAverage');
  });

  test('should generate risk metrics', () => {
    const outputs = calculateFloodInsurance(validInputs);
    
    expect(Array.isArray(outputs.riskMetrics)).toBe(true);
    expect(outputs.riskMetrics.length).toBeGreaterThan(0);
    
    const firstRiskMetric = outputs.riskMetrics[0];
    expect(firstRiskMetric).toHaveProperty('metric');
    expect(firstRiskMetric).toHaveProperty('value');
    expect(firstRiskMetric).toHaveProperty('riskLevel');
  });

  test('should generate financial projections', () => {
    const outputs = calculateFloodInsurance(validInputs);
    
    expect(Array.isArray(outputs.financialProjections)).toBe(true);
    expect(outputs.financialProjections.length).toBeGreaterThan(0);
    
    const firstProjection = outputs.financialProjections[0];
    expect(firstProjection).toHaveProperty('year');
    expect(firstProjection).toHaveProperty('premium');
    expect(firstProjection).toHaveProperty('potentialLoss');
    expect(firstProjection).toHaveProperty('netBenefit');
  });

  test('should generate policy timeline', () => {
    const outputs = calculateFloodInsurance(validInputs);
    
    expect(Array.isArray(outputs.policyTimeline)).toBe(true);
    expect(outputs.policyTimeline.length).toBeGreaterThan(0);
    
    const firstPhase = outputs.policyTimeline[0];
    expect(firstPhase).toHaveProperty('phase');
    expect(firstPhase).toHaveProperty('duration');
    expect(firstPhase).toHaveProperty('activities');
    expect(firstPhase).toHaveProperty('deliverables');
  });

  test('should generate coverage checklist', () => {
    const outputs = calculateFloodInsurance(validInputs);
    
    expect(Array.isArray(outputs.coverageChecklist)).toBe(true);
    expect(outputs.coverageChecklist.length).toBeGreaterThan(0);
    
    const firstCategory = outputs.coverageChecklist[0];
    expect(firstCategory).toHaveProperty('category');
    expect(firstCategory).toHaveProperty('items');
    expect(Array.isArray(firstCategory.items)).toBe(true);
  });

  test('should generate risk mitigation plan', () => {
    const outputs = calculateFloodInsurance(validInputs);
    
    expect(Array.isArray(outputs.riskMitigationPlan)).toBe(true);
    expect(outputs.riskMitigationPlan.length).toBeGreaterThan(0);
    
    const firstMitigation = outputs.riskMitigationPlan[0];
    expect(firstMitigation).toHaveProperty('risk');
    expect(firstMitigation).toHaveProperty('mitigation');
    expect(firstMitigation).toHaveProperty('cost');
    expect(firstMitigation).toHaveProperty('effectiveness');
  });

  test('should generate policy optimization', () => {
    const outputs = calculateFloodInsurance(validInputs);
    
    expect(Array.isArray(outputs.policyOptimization)).toBe(true);
    expect(outputs.policyOptimization.length).toBeGreaterThan(0);
    
    const firstOptimization = outputs.policyOptimization[0];
    expect(firstOptimization).toHaveProperty('area');
    expect(firstOptimization).toHaveProperty('current');
    expect(firstOptimization).toHaveProperty('recommended');
    expect(firstOptimization).toHaveProperty('savings');
  });

  test('should generate claims history', () => {
    const outputs = calculateFloodInsurance(validInputs);
    
    expect(Array.isArray(outputs.claimsHistory)).toBe(true);
    
    if (outputs.claimsHistory.length > 0) {
      const firstClaim = outputs.claimsHistory[0];
      expect(firstClaim).toHaveProperty('year');
      expect(firstClaim).toHaveProperty('claimAmount');
      expect(firstClaim).toHaveProperty('claimType');
      expect(firstClaim).toHaveProperty('settlement');
    }
  });

  test('should generate market analysis', () => {
    const outputs = calculateFloodInsurance(validInputs);
    
    expect(Array.isArray(outputs.marketAnalysis)).toBe(true);
    expect(outputs.marketAnalysis.length).toBeGreaterThan(0);
    
    const firstAnalysis = outputs.marketAnalysis[0];
    expect(firstAnalysis).toHaveProperty('metric');
    expect(firstAnalysis).toHaveProperty('current');
    expect(firstAnalysis).toHaveProperty('marketAverage');
    expect(firstAnalysis).toHaveProperty('trend');
  });

  test('should generate performance tracking', () => {
    const outputs = calculateFloodInsurance(validInputs);
    
    expect(Array.isArray(outputs.performanceTracking)).toBe(true);
    expect(outputs.performanceTracking.length).toBeGreaterThan(0);
    
    const firstTracking = outputs.performanceTracking[0];
    expect(firstTracking).toHaveProperty('metric');
    expect(firstTracking).toHaveProperty('current');
    expect(firstTracking).toHaveProperty('target');
    expect(firstTracking).toHaveProperty('frequency');
  });
});
