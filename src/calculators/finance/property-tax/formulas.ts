import { PropertyTaxInputs, PropertyTaxOutputs, PropertyTaxAnalysis, PropertyTaxMetrics } from './types';

export function calculatePropertyTax(inputs: PropertyTaxInputs): PropertyTaxOutputs {
  // Calculate basic tax metrics
  const metrics = calculatePropertyTaxMetrics(inputs);
  
  // Calculate timeline analysis
  const timelineAnalysis = calculateTimelineAnalysis(inputs);
  
  // Calculate sensitivity matrix
  const sensitivityMatrix = calculateSensitivityMatrix(inputs);
  
  // Calculate scenarios
  const scenarios = calculateScenarios(inputs);
  
  // Calculate comparison analysis
  const comparisonAnalysis = calculateComparisonAnalysis(inputs);
  
  // Calculate market analysis
  const marketAnalysis = calculateMarketAnalysis(inputs);
  
  // Generate analysis
  const analysis = generatePropertyTaxAnalysis(inputs, metrics);
  
  // Calculate additional metrics
  const additionalMetrics = calculateAdditionalMetrics(inputs, metrics);
  
  // Calculate projections
  const projections = calculateProjections(inputs, metrics);
  
  // Calculate risk assessment
  const riskAssessment = calculateRiskAssessment(inputs, metrics);
  
  // Calculate optimization opportunities
  const optimizationOpportunities = calculateOptimizationOpportunities(inputs, metrics);

  return {
    // Basic Information
    propertyValue: inputs.propertyValue,
    assessedValue: inputs.assessedValue,
    taxableValue: metrics.taxableValue,
    
    // Tax Calculations
    totalAnnualTax: metrics.totalAnnualTax,
    totalMonthlyTax: metrics.totalMonthlyTax,
    effectiveTaxRate: metrics.effectiveTaxRate,
    totalTaxRate: metrics.totalTaxRate,
    
    // Tax Breakdown
    countyTax: metrics.countyTax,
    cityTax: metrics.cityTax,
    schoolTax: metrics.schoolTax,
    specialDistrictTax: metrics.specialDistrictTax,
    specialAssessmentsTotal: metrics.specialAssessmentsTotal,
    improvementAssessmentsTotal: metrics.improvementAssessmentsTotal,
    bondAssessmentsTotal: metrics.bondAssessmentsTotal,
    
    // Exemptions
    totalExemptions: metrics.totalExemptions,
    exemptionSavings: metrics.exemptionSavings,
    exemptionPercentage: metrics.exemptionPercentage,
    
    // Payment Information
    paymentAmounts: metrics.paymentAmounts,
    escrowAnalysis: metrics.escrowAnalysis,
    
    // Assessment Analysis
    assessmentToMarketRatio: metrics.assessmentToMarketRatio,
    assessmentChange: metrics.assessmentChange,
    assessmentChangePercentage: metrics.assessmentChangePercentage,
    
    // Historical Analysis
    taxGrowthRate: metrics.taxGrowthRate,
    fiveYearProjection: metrics.fiveYearProjection,
    tenYearProjection: metrics.tenYearProjection,
    taxBurdenTrend: metrics.taxBurdenTrend,
    
    // Comparative Analysis
    stateAverageTaxRate: metrics.stateAverageTaxRate,
    countyAverageTaxRate: metrics.countyAverageTaxRate,
    cityAverageTaxRate: metrics.cityAverageTaxRate,
    comparisonPercentile: metrics.comparisonPercentile,
    taxEfficiency: metrics.taxEfficiency,
    
    // Analysis Arrays
    timelineAnalysis,
    sensitivityMatrix,
    scenarios,
    comparisonAnalysis,
    marketAnalysis,
    
    // Analysis Object
    analysis,
    
    // Additional Metrics
    ...additionalMetrics,
    
    // Projections
    ...projections,
    
    // Risk Assessment
    ...riskAssessment,
    
    // Optimization Opportunities
    ...optimizationOpportunities,
  };
}

function calculatePropertyTaxMetrics(inputs: PropertyTaxInputs): PropertyTaxMetrics {
  // Calculate total tax rate
  const totalTaxRate = inputs.countyTaxRate + inputs.cityTaxRate + inputs.schoolTaxRate + inputs.specialDistrictTaxRate;
  
  // Calculate total exemptions
  let totalExemptions = 0;
  if (inputs.homesteadExemption) totalExemptions += inputs.homesteadExemptionAmount;
  if (inputs.seniorExemption) totalExemptions += inputs.seniorExemptionAmount;
  if (inputs.veteranExemption) totalExemptions += inputs.veteranExemptionAmount;
  if (inputs.disabilityExemption) totalExemptions += inputs.disabilityExemptionAmount;
  
  // Calculate taxable value
  const taxableValue = Math.max(0, inputs.assessedValue - totalExemptions);
  
  // Calculate basic taxes
  const countyTax = (taxableValue / 1000) * inputs.countyTaxRate;
  const cityTax = (taxableValue / 1000) * inputs.cityTaxRate;
  const schoolTax = (taxableValue / 1000) * inputs.schoolTaxRate;
  const specialDistrictTax = (taxableValue / 1000) * inputs.specialDistrictTaxRate;
  
  // Calculate special assessments
  const specialAssessmentsTotal = inputs.specialAssessments.reduce((sum, assessment) => sum + assessment.annualAmount, 0);
  const improvementAssessmentsTotal = inputs.improvementAssessments.reduce((sum, assessment) => sum + assessment.annualAmount, 0);
  const bondAssessmentsTotal = inputs.bondAssessments.reduce((sum, assessment) => sum + assessment.annualAmount, 0);
  
  // Calculate total annual tax
  const totalAnnualTax = countyTax + cityTax + schoolTax + specialDistrictTax + specialAssessmentsTotal + improvementAssessmentsTotal + bondAssessmentsTotal;
  
  // Calculate monthly tax
  const totalMonthlyTax = totalAnnualTax / 12;
  
  // Calculate effective tax rate
  const effectiveTaxRate = (totalAnnualTax / inputs.propertyValue) * 100;
  
  // Calculate exemption savings
  const exemptionSavings = (totalExemptions / 1000) * totalTaxRate;
  
  // Calculate exemption percentage
  const exemptionPercentage = (totalExemptions / inputs.assessedValue) * 100;
  
  // Calculate payment amounts
  const paymentAmounts = {
    annual: totalAnnualTax,
    semiAnnual: totalAnnualTax / 2,
    quarterly: totalAnnualTax / 4,
    monthly: totalMonthlyTax,
  };
  
  // Calculate escrow analysis
  const escrowAnalysis = {
    requiredMonthlyPayment: totalMonthlyTax,
    currentEscrowPayment: inputs.escrowMonthlyPayment,
    escrowDeficit: Math.max(0, totalMonthlyTax - inputs.escrowMonthlyPayment),
    escrowSurplus: Math.max(0, inputs.escrowMonthlyPayment - totalMonthlyTax),
  };
  
  // Calculate assessment analysis
  const assessmentToMarketRatio = (inputs.assessedValue / inputs.propertyValue) * 100;
  const assessmentChange = inputs.assessedValue - inputs.previousAssessedValue;
  const assessmentChangePercentage = (assessmentChange / inputs.previousAssessedValue) * 100;
  
  // Calculate historical analysis
  const taxGrowthRate = calculateTaxGrowthRate(inputs);
  const fiveYearProjection = totalAnnualTax * Math.pow(1 + taxGrowthRate / 100, 5);
  const tenYearProjection = totalAnnualTax * Math.pow(1 + taxGrowthRate / 100, 10);
  const taxBurdenTrend = determineTaxBurdenTrend(inputs, taxGrowthRate);
  
  // Calculate comparative analysis
  const stateAverageTaxRate = getStateAverageTaxRate(inputs.state);
  const countyAverageTaxRate = getCountyAverageTaxRate(inputs.county, inputs.state);
  const cityAverageTaxRate = getCityAverageTaxRate(inputs.city, inputs.state);
  const comparisonPercentile = calculateComparisonPercentile(effectiveTaxRate, stateAverageTaxRate);
  const taxEfficiency = determineTaxEfficiency(effectiveTaxRate, stateAverageTaxRate);
  
  return {
    totalTaxRate,
    totalAnnualTax,
    totalMonthlyTax,
    effectiveTaxRate,
    assessmentToMarketRatio,
    assessmentChange,
    assessmentChangePercentage,
    totalExemptions,
    taxableValue,
    exemptionSavings,
    exemptionPercentage,
    countyTax,
    cityTax,
    schoolTax,
    specialDistrictTax,
    specialAssessmentsTotal,
    improvementAssessmentsTotal,
    bondAssessmentsTotal,
    paymentAmounts,
    escrowAnalysis,
    taxGrowthRate,
    fiveYearProjection,
    tenYearProjection,
    taxBurdenTrend,
    stateAverageTaxRate,
    countyAverageTaxRate,
    cityAverageTaxRate,
    comparisonPercentile,
    taxEfficiency,
  };
}

function calculateTimelineAnalysis(inputs: PropertyTaxInputs) {
  const timeline = [];
  const currentYear = inputs.taxYear;
  
  for (let i = 0; i < inputs.analysisPeriod; i++) {
    const year = currentYear + i;
    const yearIndex = i;
    
    // Calculate projected assessed value
    const projectedAssessedValue = inputs.assessedValue * Math.pow(1 + inputs.marketAppreciationRate / 100, yearIndex);
    
    // Calculate projected tax rate (considering caps)
    const maxTaxIncrease = inputs.propertyTaxCap / 100;
    const projectedTaxRate = Math.min(
      inputs.countyTaxRate + inputs.cityTaxRate + inputs.schoolTaxRate + inputs.specialDistrictTaxRate,
      (inputs.countyTaxRate + inputs.cityTaxRate + inputs.schoolTaxRate + inputs.specialDistrictTaxRate) * Math.pow(1 + maxTaxIncrease, yearIndex)
    );
    
    // Calculate projected tax amount
    const projectedTaxAmount = (projectedAssessedValue / 1000) * projectedTaxRate;
    
    // Calculate effective rate
    const projectedEffectiveRate = (projectedTaxAmount / (inputs.propertyValue * Math.pow(1 + inputs.marketAppreciationRate / 100, yearIndex))) * 100;
    
    // Calculate cumulative tax
    const cumulativeTax = timeline.reduce((sum, item) => sum + item.taxAmount, 0) + projectedTaxAmount;
    
    timeline.push({
      year,
      date: `${year}-01-01`,
      assessedValue: projectedAssessedValue,
      taxAmount: projectedTaxAmount,
      taxRate: projectedTaxRate,
      effectiveRate: projectedEffectiveRate,
      cumulativeTax,
    });
  }
  
  return timeline;
}

function calculateSensitivityMatrix(inputs: PropertyTaxInputs) {
  const matrix = [];
  
  // Property value sensitivity
  const propertyValueValues = [inputs.propertyValue * 0.8, inputs.propertyValue * 0.9, inputs.propertyValue, inputs.propertyValue * 1.1, inputs.propertyValue * 1.2];
  const propertyValueImpacts = propertyValueValues.map(value => {
    const adjustedInputs = { ...inputs, propertyValue: value, assessedValue: (value * inputs.assessmentRatio) / 100 };
    const metrics = calculatePropertyTaxMetrics(adjustedInputs);
    return metrics.effectiveTaxRate;
  });
  matrix.push({
    variable: 'Property Value',
    values: propertyValueValues,
    impacts: propertyValueImpacts,
  });
  
  // Tax rate sensitivity
  const taxRateValues = [inputs.countyTaxRate * 0.8, inputs.countyTaxRate * 0.9, inputs.countyTaxRate, inputs.countyTaxRate * 1.1, inputs.countyTaxRate * 1.2];
  const taxRateImpacts = taxRateValues.map(rate => {
    const adjustedInputs = { ...inputs, countyTaxRate: rate };
    const metrics = calculatePropertyTaxMetrics(adjustedInputs);
    return metrics.effectiveTaxRate;
  });
  matrix.push({
    variable: 'County Tax Rate',
    values: taxRateValues,
    impacts: taxRateImpacts,
  });
  
  // Assessment ratio sensitivity
  const assessmentRatioValues = [80, 90, inputs.assessmentRatio, 110, 120];
  const assessmentRatioImpacts = assessmentRatioValues.map(ratio => {
    const adjustedInputs = { ...inputs, assessmentRatio: ratio, assessedValue: (inputs.propertyValue * ratio) / 100 };
    const metrics = calculatePropertyTaxMetrics(adjustedInputs);
    return metrics.effectiveTaxRate;
  });
  matrix.push({
    variable: 'Assessment Ratio',
    values: assessmentRatioValues,
    impacts: assessmentRatioImpacts,
  });
  
  return matrix;
}

function calculateScenarios(inputs: PropertyTaxInputs) {
  const scenarios = [];
  
  // Base scenario
  const baseMetrics = calculatePropertyTaxMetrics(inputs);
  scenarios.push({
    scenario: 'Base Case',
    probability: 0.5,
    taxAmount: baseMetrics.totalAnnualTax,
    effectiveRate: baseMetrics.effectiveTaxRate,
  });
  
  // Optimistic scenario (lower rates, higher exemptions)
  const optimisticInputs = {
    ...inputs,
    countyTaxRate: inputs.countyTaxRate * 0.9,
    cityTaxRate: inputs.cityTaxRate * 0.9,
    homesteadExemptionAmount: inputs.homesteadExemptionAmount * 1.1,
  };
  const optimisticMetrics = calculatePropertyTaxMetrics(optimisticInputs);
  scenarios.push({
    scenario: 'Optimistic',
    probability: 0.25,
    taxAmount: optimisticMetrics.totalAnnualTax,
    effectiveRate: optimisticMetrics.effectiveTaxRate,
  });
  
  // Pessimistic scenario (higher rates, lower exemptions)
  const pessimisticInputs = {
    ...inputs,
    countyTaxRate: inputs.countyTaxRate * 1.1,
    cityTaxRate: inputs.cityTaxRate * 1.1,
    homesteadExemptionAmount: inputs.homesteadExemptionAmount * 0.9,
  };
  const pessimisticMetrics = calculatePropertyTaxMetrics(pessimisticInputs);
  scenarios.push({
    scenario: 'Pessimistic',
    probability: 0.25,
    taxAmount: pessimisticMetrics.totalAnnualTax,
    effectiveRate: pessimisticMetrics.effectiveTaxRate,
  });
  
  return scenarios;
}

function calculateComparisonAnalysis(inputs: PropertyTaxInputs) {
  const comparisons = [];
  
  // Similar properties in the area
  const similarProperties = [
    { property: 'Similar Home A', taxAmount: inputs.previousYearTax * 0.95, effectiveRate: 1.1, assessmentRatio: 95, exemptions: 5000 },
    { property: 'Similar Home B', taxAmount: inputs.previousYearTax * 1.05, effectiveRate: 1.2, assessmentRatio: 105, exemptions: 3000 },
    { property: 'Similar Home C', taxAmount: inputs.previousYearTax * 0.98, effectiveRate: 1.15, assessmentRatio: 98, exemptions: 4000 },
  ];
  
  comparisons.push(...similarProperties);
  
  return comparisons;
}

function calculateMarketAnalysis(inputs: PropertyTaxInputs) {
  const analysis = [];
  
  // Market factors
  analysis.push({
    factor: 'Local Economic Growth',
    impact: inputs.localEconomicGrowth > 2 ? 'Positive - May lead to increased property values' : 'Neutral - Stable economic conditions',
    risk: inputs.localEconomicGrowth > 3 ? 'medium' : 'low',
  });
  
  analysis.push({
    factor: 'Property Tax Cap',
    impact: `Limits annual tax increases to ${inputs.propertyTaxCap}%`,
    risk: 'low',
  });
  
  analysis.push({
    factor: 'Assessment Cycle',
    impact: `Next reassessment in ${inputs.reassessmentCycle} years`,
    risk: inputs.reassessmentCycle <= 2 ? 'medium' : 'low',
  });
  
  analysis.push({
    factor: 'Market Appreciation',
    impact: `Expected ${inputs.marketAppreciationRate}% annual appreciation`,
    risk: inputs.marketAppreciationRate > 5 ? 'medium' : 'low',
  });
  
  return analysis;
}

function generatePropertyTaxAnalysis(inputs: PropertyTaxInputs, metrics: PropertyTaxMetrics): PropertyTaxAnalysis {
  // Determine tax rating
  const taxRating = determineTaxRating(metrics.effectiveTaxRate);
  
  // Determine affordability rating
  const affordabilityRating = determineAffordabilityRating(metrics.effectiveTaxRate);
  
  // Generate recommendation
  const recommendation = generateRecommendation(inputs, metrics, taxRating);
  
  // Generate key strengths and weaknesses
  const keyStrengths = generateKeyStrengths(inputs, metrics);
  const keyWeaknesses = generateKeyWeaknesses(inputs, metrics);
  
  // Generate cost factors
  const costFactors = generateCostFactors(inputs, metrics);
  
  // Generate opportunities
  const opportunities = generateOpportunities(inputs, metrics);
  
  // Generate risks
  const risks = generateRisks(inputs, metrics);
  
  // Generate optimization suggestions
  const optimizationSuggestions = generateOptimizationSuggestions(inputs, metrics);
  const exemptionRecommendations = generateExemptionRecommendations(inputs, metrics);
  const appealRecommendations = generateAppealRecommendations(inputs, metrics);
  const paymentOptimization = generatePaymentOptimization(inputs, metrics);
  
  // Generate market factors
  const marketFactors = generateMarketFactors(inputs, metrics);
  const economicImpact = generateEconomicImpact(inputs, metrics);
  const futureProjections = generateFutureProjections(inputs, metrics);
  
  // Generate action items
  const nextSteps = generateNextSteps(inputs, metrics, recommendation);
  const timeline = generateTimeline(inputs, metrics);
  const priorityActions = generatePriorityActions(inputs, metrics);
  
  // Generate performance benchmarks
  const performanceBenchmarks = generatePerformanceBenchmarks(inputs, metrics);
  
  // Generate presentation data
  const presentationPoints = generatePresentationPoints(inputs, metrics);
  const decisionFactors = generateDecisionFactors(inputs, metrics);
  const summaryPoints = generateSummaryPoints(inputs, metrics);
  
  return {
    taxRating,
    affordabilityRating,
    recommendation,
    keyStrengths,
    keyWeaknesses,
    costFactors,
    opportunities,
    risks,
    optimizationSuggestions,
    exemptionRecommendations,
    appealRecommendations,
    paymentOptimization,
    marketFactors,
    economicImpact,
    futureProjections,
    nextSteps,
    timeline,
    priorityActions,
    performanceBenchmarks,
    presentationPoints,
    decisionFactors,
    summaryPoints,
  };
}

function calculateAdditionalMetrics(inputs: PropertyTaxInputs, metrics: PropertyTaxMetrics) {
  // Calculate tax per square foot
  const taxPerSquareFoot = metrics.totalAnnualTax / inputs.propertySize;
  
  // Calculate tax per bedroom (estimate based on property size)
  const estimatedBedrooms = Math.max(1, Math.floor(inputs.propertySize / 500));
  const taxPerBedroom = metrics.totalAnnualTax / estimatedBedrooms;
  
  // Calculate tax per bathroom (estimate based on property size)
  const estimatedBathrooms = Math.max(1, Math.floor(inputs.propertySize / 1000));
  const taxPerBathroom = metrics.totalAnnualTax / estimatedBathrooms;
  
  // Calculate tax burden ratio (assuming median income)
  const medianIncome = 75000; // This would be dynamic based on location
  const taxBurdenRatio = (metrics.totalAnnualTax / medianIncome) * 100;
  
  // Calculate affordability index
  const affordabilityIndex = Math.max(0, 100 - (taxBurdenRatio * 2));
  
  // Calculate tax efficiency score
  const taxEfficiencyScore = Math.max(0, 100 - (metrics.effectiveTaxRate * 10));
  
  return {
    taxPerSquareFoot,
    taxPerBedroom,
    taxPerBathroom,
    taxBurdenRatio,
    affordabilityIndex,
    taxEfficiencyScore,
  };
}

function calculateProjections(inputs: PropertyTaxInputs, metrics: PropertyTaxMetrics) {
  // Calculate 5-year projection
  const fiveYearTaxProjection = metrics.totalAnnualTax * Math.pow(1 + metrics.taxGrowthRate / 100, 5);
  
  // Calculate 10-year projection
  const tenYearTaxProjection = metrics.totalAnnualTax * Math.pow(1 + metrics.taxGrowthRate / 100, 10);
  
  // Calculate lifetime projection (30 years)
  const lifetimeTaxProjection = metrics.totalAnnualTax * Math.pow(1 + metrics.taxGrowthRate / 100, 30);
  
  return {
    fiveYearTaxProjection,
    tenYearTaxProjection,
    lifetimeTaxProjection,
  };
}

function calculateRiskAssessment(inputs: PropertyTaxInputs, metrics: PropertyTaxMetrics) {
  // Calculate tax risk score
  const taxRiskScore = Math.min(100, metrics.effectiveTaxRate * 10);
  
  // Determine assessment risk
  const assessmentRisk = determineAssessmentRisk(inputs, metrics);
  
  // Determine rate change risk
  const rateChangeRisk = determineRateChangeRisk(inputs, metrics);
  
  // Determine exemption risk
  const exemptionRisk = determineExemptionRisk(inputs, metrics);
  
  return {
    taxRiskScore,
    assessmentRisk,
    rateChangeRisk,
    exemptionRisk,
  };
}

function calculateOptimizationOpportunities(inputs: PropertyTaxInputs, metrics: PropertyTaxMetrics) {
  // Calculate potential savings
  const potentialSavings = calculatePotentialSavings(inputs, metrics);
  
  // Generate optimization opportunities
  const optimizationOpportunities = generateOptimizationOpportunities(inputs, metrics);
  
  // Generate exemption opportunities
  const exemptionOpportunities = generateExemptionOpportunities(inputs, metrics);
  
  // Generate appeal opportunities
  const appealOpportunities = generateAppealOpportunities(inputs, metrics);
  
  return {
    potentialSavings,
    optimizationOpportunities,
    exemptionOpportunities,
    appealOpportunities,
  };
}

// Helper functions
function calculateTaxGrowthRate(inputs: PropertyTaxInputs): number {
  if (inputs.taxHistory.length < 2) return 2.0; // Default growth rate
  
  const recentTaxes = inputs.taxHistory.slice(-3);
  let totalGrowth = 0;
  
  for (let i = 1; i < recentTaxes.length; i++) {
    const growth = ((recentTaxes[i].taxAmount - recentTaxes[i-1].taxAmount) / recentTaxes[i-1].taxAmount) * 100;
    totalGrowth += growth;
  }
  
  return totalGrowth / (recentTaxes.length - 1);
}

function determineTaxBurdenTrend(inputs: PropertyTaxInputs, growthRate: number): 'increasing' | 'decreasing' | 'stable' {
  if (growthRate > 1) return 'increasing';
  if (growthRate < -1) return 'decreasing';
  return 'stable';
}

function getStateAverageTaxRate(state: string): number {
  const stateRates: Record<string, number> = {
    'CA': 1.25,
    'TX': 1.80,
    'NY': 1.40,
    'FL': 0.98,
    'IL': 2.16,
    'PA': 1.58,
    'OH': 1.56,
    'GA': 0.87,
    'NC': 0.84,
    'MI': 1.54,
  };
  return stateRates[state] || 1.20;
}

function getCountyAverageTaxRate(county: string, state: string): number {
  // This would typically come from a database
  return getStateAverageTaxRate(state) * (0.9 + Math.random() * 0.2);
}

function getCityAverageTaxRate(city: string, state: string): number {
  // This would typically come from a database
  return getStateAverageTaxRate(state) * (0.8 + Math.random() * 0.4);
}

function calculateComparisonPercentile(effectiveRate: number, stateAverage: number): number {
  const ratio = effectiveRate / stateAverage;
  if (ratio <= 0.8) return 20;
  if (ratio <= 0.9) return 35;
  if (ratio <= 1.0) return 50;
  if (ratio <= 1.1) return 65;
  if (ratio <= 1.2) return 80;
  return 95;
}

function determineTaxEfficiency(effectiveRate: number, stateAverage: number): 'low' | 'medium' | 'high' {
  const ratio = effectiveRate / stateAverage;
  if (ratio <= 0.9) return 'high';
  if (ratio <= 1.1) return 'medium';
  return 'low';
}

function determineTaxRating(effectiveRate: number): 'Low' | 'Medium' | 'High' | 'Very High' {
  if (effectiveRate <= 0.8) return 'Low';
  if (effectiveRate <= 1.2) return 'Medium';
  if (effectiveRate <= 1.8) return 'High';
  return 'Very High';
}

function determineAffordabilityRating(effectiveRate: number): 'Excellent' | 'Good' | 'Fair' | 'Poor' {
  if (effectiveRate <= 0.8) return 'Excellent';
  if (effectiveRate <= 1.2) return 'Good';
  if (effectiveRate <= 1.8) return 'Fair';
  return 'Poor';
}

function generateRecommendation(inputs: PropertyTaxInputs, metrics: PropertyTaxMetrics, taxRating: string): string {
  if (taxRating === 'Low' && metrics.effectiveTaxRate < 1.0) {
    return 'Keep Property';
  } else if (taxRating === 'Very High' && metrics.effectiveTaxRate > 2.0) {
    return 'Consider Selling';
  } else if (metrics.assessmentToMarketRatio > 110) {
    return 'Appeal Assessment';
  } else if (metrics.totalExemptions < 5000) {
    return 'Apply for Exemptions';
  } else {
    return 'Monitor Closely';
  }
}

function generateKeyStrengths(inputs: PropertyTaxInputs, metrics: PropertyTaxMetrics): string[] {
  const strengths = [];
  
  if (metrics.effectiveTaxRate < 1.0) {
    strengths.push('Low effective tax rate compared to market average');
  }
  
  if (metrics.totalExemptions > 5000) {
    strengths.push('Significant exemption benefits applied');
  }
  
  if (metrics.assessmentToMarketRatio < 100) {
    strengths.push('Assessment below market value');
  }
  
  if (inputs.propertyTaxCap < 2.0) {
    strengths.push('Property tax cap limits future increases');
  }
  
  return strengths;
}

function generateKeyWeaknesses(inputs: PropertyTaxInputs, metrics: PropertyTaxMetrics): string[] {
  const weaknesses = [];
  
  if (metrics.effectiveTaxRate > 1.5) {
    weaknesses.push('High effective tax rate compared to market average');
  }
  
  if (metrics.totalExemptions < 2000) {
    weaknesses.push('Limited exemption benefits');
  }
  
  if (metrics.assessmentToMarketRatio > 110) {
    weaknesses.push('Assessment significantly above market value');
  }
  
  if (inputs.propertyTaxCap > 3.0) {
    weaknesses.push('High property tax cap allows significant increases');
  }
  
  return weaknesses;
}

function generateCostFactors(inputs: PropertyTaxInputs, metrics: PropertyTaxMetrics): string[] {
  const factors = [];
  
  factors.push(`County tax rate: ${inputs.countyTaxRate} per $1000`);
  factors.push(`City tax rate: ${inputs.cityTaxRate} per $1000`);
  factors.push(`School tax rate: ${inputs.schoolTaxRate} per $1000`);
  factors.push(`Special district rate: ${inputs.specialDistrictTaxRate} per $1000`);
  
  if (metrics.specialAssessmentsTotal > 0) {
    factors.push(`Special assessments: ${metrics.specialAssessmentsTotal}`);
  }
  
  return factors;
}

function generateOpportunities(inputs: PropertyTaxInputs, metrics: PropertyTaxMetrics): string[] {
  const opportunities = [];
  
  if (!inputs.homesteadExemption && inputs.propertyUse === 'primary_residence') {
    opportunities.push('Apply for homestead exemption');
  }
  
  if (!inputs.seniorExemption) {
    opportunities.push('Check eligibility for senior exemption');
  }
  
  if (metrics.assessmentToMarketRatio > 105) {
    opportunities.push('Consider appealing assessment');
  }
  
  if (inputs.paymentSchedule === 'annual') {
    opportunities.push('Consider monthly payments for better cash flow');
  }
  
  return opportunities;
}

function generateRisks(inputs: PropertyTaxInputs, metrics: PropertyTaxMetrics): string[] {
  const risks = [];
  
  if (inputs.reassessmentCycle <= 2) {
    risks.push('Upcoming reassessment may increase taxes');
  }
  
  if (inputs.propertyTaxCap > 3.0) {
    risks.push('High tax cap allows significant annual increases');
  }
  
  if (metrics.taxGrowthRate > 3.0) {
    risks.push('Above-average tax growth rate');
  }
  
  return risks;
}

function generateOptimizationSuggestions(inputs: PropertyTaxInputs, metrics: PropertyTaxMetrics): string[] {
  const suggestions = [];
  
  suggestions.push('Review all available exemptions annually');
  suggestions.push('Monitor assessment notices closely');
  suggestions.push('Consider timing of property improvements');
  suggestions.push('Explore payment schedule options');
  
  return suggestions;
}

function generateExemptionRecommendations(inputs: PropertyTaxInputs, metrics: PropertyTaxMetrics): string[] {
  const recommendations = [];
  
  if (!inputs.homesteadExemption && inputs.propertyUse === 'primary_residence') {
    recommendations.push('Apply for homestead exemption immediately');
  }
  
  if (!inputs.seniorExemption) {
    recommendations.push('Check senior exemption eligibility if over 65');
  }
  
  if (!inputs.veteranExemption) {
    recommendations.push('Verify veteran exemption eligibility');
  }
  
  if (!inputs.disabilityExemption) {
    recommendations.push('Review disability exemption requirements');
  }
  
  return recommendations;
}

function generateAppealRecommendations(inputs: PropertyTaxInputs, metrics: PropertyTaxMetrics): string[] {
  const recommendations = [];
  
  if (metrics.assessmentToMarketRatio > 110) {
    recommendations.push('Strong case for assessment appeal');
  }
  
  if (metrics.assessmentChangePercentage > 10) {
    recommendations.push('Large assessment increase warrants review');
  }
  
  recommendations.push('Gather comparable property assessments');
  recommendations.push('Consider professional appraisal');
  
  return recommendations;
}

function generatePaymentOptimization(inputs: PropertyTaxInputs, metrics: PropertyTaxMetrics): string[] {
  const optimizations = [];
  
  if (inputs.paymentSchedule === 'annual') {
    optimizations.push('Consider monthly payments for better cash flow');
  }
  
  if (metrics.escrowAnalysis.escrowDeficit > 0) {
    optimizations.push('Increase escrow payment to cover deficit');
  }
  
  optimizations.push('Set up automatic payments to avoid penalties');
  optimizations.push('Review payment schedule annually');
  
  return optimizations;
}

function generateMarketFactors(inputs: PropertyTaxInputs, metrics: PropertyTaxMetrics): string[] {
  const factors = [];
  
  factors.push(`Local economic growth: ${inputs.localEconomicGrowth}%`);
  factors.push(`Market appreciation: ${inputs.marketAppreciationRate}%`);
  factors.push(`Property tax cap: ${inputs.propertyTaxCap}%`);
  factors.push(`Assessment cycle: ${inputs.reassessmentCycle} years`);
  
  return factors;
}

function generateEconomicImpact(inputs: PropertyTaxInputs, metrics: PropertyTaxMetrics): string[] {
  const impacts = [];
  
  impacts.push(`Tax burden: ${metrics.effectiveTaxRate.toFixed(2)}% of property value`);
  impacts.push(`Monthly cost: ${metrics.totalMonthlyTax.toFixed(0)}`);
  impacts.push(`Annual cost: ${metrics.totalAnnualTax.toFixed(0)}`);
  
  return impacts;
}

function generateFutureProjections(inputs: PropertyTaxInputs, metrics: PropertyTaxMetrics): string[] {
  const projections = [];
  
  projections.push(`5-year projection: ${metrics.fiveYearProjection.toFixed(0)}`);
  projections.push(`10-year projection: ${metrics.tenYearProjection.toFixed(0)}`);
  projections.push(`Growth rate: ${metrics.taxGrowthRate.toFixed(1)}% annually`);
  
  return projections;
}

function generateNextSteps(inputs: PropertyTaxInputs, metrics: PropertyTaxMetrics, recommendation: string): string[] {
  const steps = [];
  
  if (recommendation === 'Apply for Exemptions') {
    steps.push('Research available exemptions in your area');
    steps.push('Gather required documentation');
    steps.push('Submit exemption applications');
  }
  
  if (recommendation === 'Appeal Assessment') {
    steps.push('Review assessment notice');
    steps.push('Gather comparable property data');
    steps.push('File appeal within deadline');
  }
  
  steps.push('Monitor tax rate changes');
  steps.push('Review assessment annually');
  steps.push('Update exemption status as needed');
  
  return steps;
}

function generateTimeline(inputs: PropertyTaxInputs, metrics: PropertyTaxMetrics): string[] {
  const timeline = [];
  
  timeline.push('Immediate: Review current exemptions');
  timeline.push('30 days: Submit any missing exemption applications');
  timeline.push('60 days: File assessment appeal if needed');
  timeline.push('Annual: Review tax assessment and rates');
  
  return timeline;
}

function generatePriorityActions(inputs: PropertyTaxInputs, metrics: PropertyTaxMetrics): string[] {
  const actions = [];
  
  if (metrics.totalExemptions < 2000) {
    actions.push('Apply for available exemptions');
  }
  
  if (metrics.assessmentToMarketRatio > 110) {
    actions.push('Consider assessment appeal');
  }
  
  actions.push('Set up payment reminders');
  actions.push('Monitor tax rate changes');
  
  return actions;
}

function generatePerformanceBenchmarks(inputs: PropertyTaxInputs, metrics: PropertyTaxMetrics) {
  return [
    {
      metric: 'Effective Tax Rate',
      target: 1.0,
      benchmark: metrics.effectiveTaxRate,
      industry: 'State Average',
    },
    {
      metric: 'Assessment Ratio',
      target: 100,
      benchmark: metrics.assessmentToMarketRatio,
      industry: 'Market Value',
    },
    {
      metric: 'Exemption Utilization',
      target: 5000,
      benchmark: metrics.totalExemptions,
      industry: 'Typical Exemptions',
    },
  ];
}

function generatePresentationPoints(inputs: PropertyTaxInputs, metrics: PropertyTaxMetrics): string[] {
  const points = [];
  
  points.push(`Annual property tax: ${metrics.totalAnnualTax.toFixed(0)}`);
  points.push(`Effective rate: ${metrics.effectiveTaxRate.toFixed(2)}%`);
  points.push(`Tax efficiency: ${metrics.taxEfficiency}`);
  points.push(`Exemption savings: ${metrics.exemptionSavings.toFixed(0)}`);
  
  return points;
}

function generateDecisionFactors(inputs: PropertyTaxInputs, metrics: PropertyTaxMetrics): string[] {
  const factors = [];
  
  factors.push(`Tax burden relative to property value`);
  factors.push(`Comparison to local market rates`);
  factors.push(`Available exemptions and savings`);
  factors.push(`Assessment accuracy and appeal potential`);
  factors.push(`Future tax growth projections`);
  
  return factors;
}

function generateSummaryPoints(inputs: PropertyTaxInputs, metrics: PropertyTaxMetrics): string[] {
  const points = [];
  
  points.push(`Property tax analysis completed for ${inputs.propertyAddress}`);
  points.push(`Total annual tax: ${metrics.totalAnnualTax.toFixed(0)}`);
  points.push(`Effective tax rate: ${metrics.effectiveTaxRate.toFixed(2)}%`);
  points.push(`Tax efficiency rating: ${metrics.taxEfficiency}`);
  
  return points;
}

function determineAssessmentRisk(inputs: PropertyTaxInputs, metrics: PropertyTaxMetrics): 'low' | 'medium' | 'high' {
  if (metrics.assessmentToMarketRatio > 110) return 'high';
  if (metrics.assessmentToMarketRatio > 105) return 'medium';
  return 'low';
}

function determineRateChangeRisk(inputs: PropertyTaxInputs, metrics: PropertyTaxMetrics): 'low' | 'medium' | 'high' {
  if (inputs.propertyTaxCap > 3.0) return 'high';
  if (inputs.propertyTaxCap > 2.0) return 'medium';
  return 'low';
}

function determineExemptionRisk(inputs: PropertyTaxInputs, metrics: PropertyTaxMetrics): 'low' | 'medium' | 'high' {
  if (metrics.totalExemptions < 2000) return 'high';
  if (metrics.totalExemptions < 5000) return 'medium';
  return 'low';
}

function calculatePotentialSavings(inputs: PropertyTaxInputs, metrics: PropertyTaxMetrics): number {
  let potentialSavings = 0;
  
  // Potential exemption savings
  if (!inputs.homesteadExemption && inputs.propertyUse === 'primary_residence') {
    potentialSavings += (inputs.homesteadExemptionAmount / 1000) * metrics.totalTaxRate;
  }
  
  // Potential assessment appeal savings
  if (metrics.assessmentToMarketRatio > 110) {
    const potentialReduction = (metrics.assessmentToMarketRatio - 100) / 100;
    potentialSavings += metrics.totalAnnualTax * potentialReduction;
  }
  
  return potentialSavings;
}

function generateOptimizationOpportunities(inputs: PropertyTaxInputs, metrics: PropertyTaxMetrics): string[] {
  const opportunities = [];
  
  if (metrics.assessmentToMarketRatio > 105) {
    opportunities.push('Assessment appeal potential');
  }
  
  if (metrics.totalExemptions < 5000) {
    opportunities.push('Additional exemption opportunities');
  }
  
  if (inputs.paymentSchedule === 'annual') {
    opportunities.push('Payment schedule optimization');
  }
  
  return opportunities;
}

function generateExemptionOpportunities(inputs: PropertyTaxInputs, metrics: PropertyTaxMetrics): string[] {
  const opportunities = [];
  
  if (!inputs.homesteadExemption) {
    opportunities.push('Homestead exemption');
  }
  
  if (!inputs.seniorExemption) {
    opportunities.push('Senior exemption');
  }
  
  if (!inputs.veteranExemption) {
    opportunities.push('Veteran exemption');
  }
  
  if (!inputs.disabilityExemption) {
    opportunities.push('Disability exemption');
  }
  
  return opportunities;
}

function generateAppealOpportunities(inputs: PropertyTaxInputs, metrics: PropertyTaxMetrics): string[] {
  const opportunities = [];
  
  if (metrics.assessmentToMarketRatio > 110) {
    opportunities.push('Strong appeal case');
  }
  
  if (metrics.assessmentChangePercentage > 10) {
    opportunities.push('Large increase appeal');
  }
  
  if (inputs.propertyCondition === 'needs_repair') {
    opportunities.push('Condition-based appeal');
  }
  
  return opportunities;
}