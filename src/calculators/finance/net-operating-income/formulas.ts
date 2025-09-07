import { NetOperatingIncomeInputs, NetOperatingIncomeMetrics, NetOperatingIncomeAnalysis } from './types';

export function calculateTotalRevenue(inputs: NetOperatingIncomeInputs): number {
  return inputs.grossRentalIncome + inputs.otherIncome + inputs.parkingIncome +
         inputs.laundryIncome + inputs.storageIncome + inputs.amenityIncome +
         inputs.lateFees + inputs.applicationFees + inputs.petFees + inputs.otherFees;
}

export function calculateEffectiveGrossIncome(inputs: NetOperatingIncomeInputs): number {
  const totalRevenue = calculateTotalRevenue(inputs);
  const vacancyLoss = totalRevenue * (inputs.vacancyRate / 100);
  const collectionLoss = totalRevenue * (inputs.collectionLossRate / 100);

  return totalRevenue - vacancyLoss - collectionLoss - inputs.badDebtExpense;
}

export function calculateVacancyLoss(inputs: NetOperatingIncomeInputs): number {
  return inputs.grossRentalIncome * (inputs.vacancyRate / 100);
}

export function calculateCollectionLoss(inputs: NetOperatingIncomeInputs): number {
  return inputs.grossRentalIncome * (inputs.collectionLossRate / 100);
}

export function calculateNetRentalIncome(inputs: NetOperatingIncomeInputs): number {
  return calculateEffectiveGrossIncome(inputs);
}

export function calculateTotalOperatingExpenses(inputs: NetOperatingIncomeInputs): number {
  let managementFee = inputs.propertyManagementFee;

  // Calculate management fee if rate is provided
  if (inputs.propertyManagementRate > 0) {
    const totalRevenue = calculateTotalRevenue(inputs);
    managementFee = totalRevenue * (inputs.propertyManagementRate / 100);
  }

  return managementFee + inputs.propertyTaxes + inputs.propertyInsurance +
         inputs.utilities + inputs.maintenance + inputs.repairs + inputs.landscaping +
         inputs.janitorial + inputs.security + inputs.advertising + inputs.legalFees +
         inputs.accountingFees + inputs.otherExpenses;
}

export function calculatePropertyManagementExpense(inputs: NetOperatingIncomeInputs): number {
  if (inputs.propertyManagementRate > 0) {
    const totalRevenue = calculateTotalRevenue(inputs);
    return totalRevenue * (inputs.propertyManagementRate / 100);
  }
  return inputs.propertyManagementFee;
}

export function calculateNetOperatingIncome(inputs: NetOperatingIncomeInputs): number {
  return calculateEffectiveGrossIncome(inputs) - calculateTotalOperatingExpenses(inputs);
}

export function calculateNoiMargin(inputs: NetOperatingIncomeInputs): number {
  const noi = calculateNetOperatingIncome(inputs);
  const effectiveGrossIncome = calculateEffectiveGrossIncome(inputs);

  return effectiveGrossIncome > 0 ? (noi / effectiveGrossIncome) * 100 : 0;
}

export function calculateNoiPerSquareFoot(inputs: NetOperatingIncomeInputs): number {
  const noi = calculateNetOperatingIncome(inputs);
  return inputs.propertySize > 0 ? noi / inputs.propertySize : 0;
}

export function calculateNoiPerUnit(inputs: NetOperatingIncomeInputs): number {
  const noi = calculateNetOperatingIncome(inputs);
  return inputs.numberOfUnits > 0 ? noi / inputs.numberOfUnits : 0;
}

export function calculateGrossRentMultiplier(inputs: NetOperatingIncomeInputs): number {
  const propertyValue = inputs.propertySize * 100; // Rough estimate if not provided
  const grossRentalIncome = inputs.grossRentalIncome;

  return grossRentalIncome > 0 ? propertyValue / grossRentalIncome : 0;
}

export function calculateNetRentMultiplier(inputs: NetOperatingIncomeInputs): number {
  const propertyValue = inputs.propertySize * 100; // Rough estimate if not provided
  const noi = calculateNetOperatingIncome(inputs);

  return noi > 0 ? propertyValue / noi : 0;
}

export function calculateExpenseRatio(inputs: NetOperatingIncomeInputs): number {
  const totalExpenses = calculateTotalOperatingExpenses(inputs);
  const effectiveGrossIncome = calculateEffectiveGrossIncome(inputs);

  return effectiveGrossIncome > 0 ? (totalExpenses / effectiveGrossIncome) * 100 : 0;
}

export function calculateVacancyLossRatio(inputs: NetOperatingIncomeInputs): number {
  return inputs.vacancyRate;
}

export function calculateCollectionLossRatio(inputs: NetOperatingIncomeInputs): number {
  return inputs.collectionLossRate;
}

export function calculateMonthlyCashFlow(inputs: NetOperatingIncomeInputs): number {
  return calculateNetOperatingIncome(inputs) / 12;
}

export function calculateAnnualCashFlow(inputs: NetOperatingIncomeInputs): number {
  return calculateNetOperatingIncome(inputs);
}

export function calculateCashFlowMargin(inputs: NetOperatingIncomeInputs): number {
  const cashFlow = calculateAnnualCashFlow(inputs);
  const effectiveGrossIncome = calculateEffectiveGrossIncome(inputs);

  return effectiveGrossIncome > 0 ? (cashFlow / effectiveGrossIncome) * 100 : 0;
}

export function calculateSensitivityMatrix(inputs: NetOperatingIncomeInputs): Array<{
  variable: string;
  values: number[];
  impacts: number[];
}> {
  const matrix = [];

  // Vacancy rate sensitivity
  const vacancyValues = [inputs.vacancyRate - 2, inputs.vacancyRate, inputs.vacancyRate + 2];
  const vacancyImpacts = vacancyValues.map(rate => {
    const testInputs = { ...inputs, vacancyRate: rate };
    return calculateNetOperatingIncome(testInputs) - calculateNetOperatingIncome(inputs);
  });

  matrix.push({
    variable: 'Vacancy Rate',
    values: vacancyValues,
    impacts: vacancyImpacts
  });

  // Expense growth sensitivity
  const expenseValues = [inputs.expenseGrowthRate - 1, inputs.expenseGrowthRate, inputs.expenseGrowthRate + 1];
  const expenseImpacts = expenseValues.map(rate => {
    const testInputs = { ...inputs, expenseGrowthRate: rate };
    return calculateNetOperatingIncome(testInputs) - calculateNetOperatingIncome(inputs);
  });

  matrix.push({
    variable: 'Expense Growth Rate',
    values: expenseValues,
    impacts: expenseImpacts
  });

  return matrix;
}

export function calculateScenarios(inputs: NetOperatingIncomeInputs): Array<{
  scenario: string;
  probability: number;
  noi: number;
  noiMargin: number;
  cashFlow: number;
}> {
  const scenarios = [];

  // Base case
  scenarios.push({
    scenario: 'Base Case',
    probability: 0.5,
    noi: calculateNetOperatingIncome(inputs),
    noiMargin: calculateNoiMargin(inputs),
    cashFlow: calculateAnnualCashFlow(inputs)
  });

  // High occupancy scenario
  const highOccupancyInputs = { ...inputs, vacancyRate: Math.max(0, inputs.vacancyRate - 2) };
  scenarios.push({
    scenario: 'High Occupancy',
    probability: 0.2,
    noi: calculateNetOperatingIncome(highOccupancyInputs),
    noiMargin: calculateNoiMargin(highOccupancyInputs),
    cashFlow: calculateAnnualCashFlow(highOccupancyInputs)
  });

  // Cost control scenario
  const costControlInputs = {
    ...inputs,
    maintenance: inputs.maintenance * 0.9,
    repairs: inputs.repairs * 0.9,
    utilities: inputs.utilities * 0.95
  };
  scenarios.push({
    scenario: 'Cost Control',
    probability: 0.2,
    noi: calculateNetOperatingIncome(costControlInputs),
    noiMargin: calculateNoiMargin(costControlInputs),
    cashFlow: calculateAnnualCashFlow(costControlInputs)
  });

  // Market decline scenario
  const declineInputs = {
    ...inputs,
    vacancyRate: inputs.vacancyRate + 3,
    rentGrowthRate: Math.max(0, inputs.rentGrowthRate - 1)
  };
  scenarios.push({
    scenario: 'Market Decline',
    probability: 0.1,
    noi: calculateNetOperatingIncome(declineInputs),
    noiMargin: calculateNoiMargin(declineInputs),
    cashFlow: calculateAnnualCashFlow(declineInputs)
  });

  return scenarios;
}

export function calculateTrendAnalysis(inputs: NetOperatingIncomeInputs): Array<{
  year: number;
  revenue: number;
  expenses: number;
  noi: number;
  noiMargin: number;
}> {
  const analysis = [];
  let currentRevenue = calculateEffectiveGrossIncome(inputs);
  let currentExpenses = calculateTotalOperatingExpenses(inputs);

  for (let year = 1; year <= inputs.analysisPeriod; year++) {
    const noi = currentRevenue - currentExpenses;
    const noiMargin = currentRevenue > 0 ? (noi / currentRevenue) * 100 : 0;

    analysis.push({
      year,
      revenue: currentRevenue,
      expenses: currentExpenses,
      noi,
      noiMargin
    });

    // Apply growth rates
    currentRevenue *= (1 + inputs.rentGrowthRate / 100);
    currentExpenses *= (1 + inputs.expenseGrowthRate / 100);
  }

  return analysis;
}

export function calculateBenchmarkAnalysis(inputs: NetOperatingIncomeInputs): Array<{
  metric: string;
  property: number;
  market: number;
  difference: number;
  percentile: number;
}> {
  const analysis = [];
  const noi = calculateNetOperatingIncome(inputs);
  const noiMargin = calculateNoiMargin(inputs);
  const noiPerSqFt = calculateNoiPerSquareFoot(inputs);

  // Calculate market averages from comparable properties
  const marketNoi = inputs.comparableProperties.reduce((sum, comp) => sum + comp.noi, 0) / inputs.comparableProperties.length;
  const marketNoiMargin = inputs.comparableProperties.reduce((sum, comp) => sum + (comp.noi / (comp.noi / (1 - 0.4))), 0) / inputs.comparableProperties.length; // Rough estimate
  const marketNoiPerSqFt = inputs.comparableProperties.reduce((sum, comp) => sum + comp.noiPerSqFt, 0) / inputs.comparableProperties.length;

  // NOI comparison
  const noiDifference = noi - marketNoi;
  const noiPercentile = noi > marketNoi ? 75 : noi > marketNoi * 0.9 ? 60 : 40;

  analysis.push({
    metric: 'NOI',
    property: noi,
    market: marketNoi,
    difference: noiDifference,
    percentile: noiPercentile
  });

  // NOI Margin comparison
  const marginDifference = noiMargin - marketNoiMargin;
  const marginPercentile = noiMargin > marketNoiMargin ? 75 : noiMargin > marketNoiMargin * 0.9 ? 60 : 40;

  analysis.push({
    metric: 'NOI Margin',
    property: noiMargin,
    market: marketNoiMargin,
    difference: marginDifference,
    percentile: marginPercentile
  });

  // NOI per Sq Ft comparison
  const perSqFtDifference = noiPerSqFt - marketNoiPerSqFt;
  const perSqFtPercentile = noiPerSqFt > marketNoiPerSqFt ? 75 : noiPerSqFt > marketNoiPerSqFt * 0.9 ? 60 : 40;

  analysis.push({
    metric: 'NOI per Sq Ft',
    property: noiPerSqFt,
    market: marketNoiPerSqFt,
    difference: perSqFtDifference,
    percentile: perSqFtPercentile
  });

  return analysis;
}

export function calculateRiskScore(inputs: NetOperatingIncomeInputs): number {
  let score = 0;

  // Vacancy risk
  if (inputs.vacancyRate > 10) score += 30;
  else if (inputs.vacancyRate > 5) score += 15;

  // Market risk
  if (inputs.marketCondition === 'declining') score += 25;
  else if (inputs.marketCondition === 'hot') score += 10;

  // Expense risk
  const expenseRatio = calculateExpenseRatio(inputs);
  if (expenseRatio > 50) score += 20;
  else if (expenseRatio > 40) score += 10;

  // Property age risk
  if (inputs.propertyAge > 30) score += 15;
  else if (inputs.propertyAge > 20) score += 8;

  return Math.min(100, score);
}

export function calculateNoiVolatility(inputs: NetOperatingIncomeInputs): number {
  // Estimate NOI volatility based on market conditions and property type
  let volatility = 10; // Base volatility

  if (inputs.marketCondition === 'hot') volatility += 5;
  else if (inputs.marketCondition === 'declining') volatility += 15;

  if (inputs.propertyType === 'retail') volatility += 8;
  else if (inputs.propertyType === 'office') volatility += 6;
  else if (inputs.propertyType === 'industrial') volatility += 4;

  return Math.min(50, volatility);
}

export function calculateExpenseVolatility(inputs: NetOperatingIncomeInputs): number {
  // Estimate expense volatility based on property type and age
  let volatility = 8; // Base volatility

  if (inputs.propertyAge > 25) volatility += 10;
  else if (inputs.propertyAge > 15) volatility += 5;

  if (inputs.propertyType === 'multifamily') volatility += 3;
  else if (inputs.propertyType === 'hotel') volatility += 8;

  return Math.min(40, volatility);
}

export function calculateRevenueVolatility(inputs: NetOperatingIncomeInputs): number {
  // Estimate revenue volatility based on market and property type
  let volatility = 12; // Base volatility

  if (inputs.marketCondition === 'hot') volatility += 8;
  else if (inputs.marketCondition === 'declining') volatility += 12;

  if (inputs.propertyType === 'retail') volatility += 10;
  else if (inputs.propertyType === 'office') volatility += 8;
  else if (inputs.propertyType === 'industrial') volatility += 4;

  return Math.min(50, volatility);
}

export function calculateMarketPosition(inputs: NetOperatingIncomeInputs): string {
  const noi = calculateNetOperatingIncome(inputs);
  const marketAvg = inputs.comparableProperties.reduce((sum, comp) => sum + comp.noi, 0) / inputs.comparableProperties.length;

  if (noi > marketAvg * 1.2) return 'Above Market';
  if (noi > marketAvg * 0.9) return 'At Market';
  return 'Below Market';
}

export function calculateCompetitiveAnalysis(inputs: NetOperatingIncomeInputs): Array<{
  property: string;
  noi: number;
  noiPerSqFt: number;
  noiMargin: number;
  ranking: number;
}> {
  const analysis = [];
  const propertyNoi = calculateNetOperatingIncome(inputs);
  const propertyNoiPerSqFt = calculateNoiPerSquareFoot(inputs);
  const propertyNoiMargin = calculateNoiMargin(inputs);

  // Add the subject property
  analysis.push({
    property: inputs.propertyName || 'Subject Property',
    noi: propertyNoi,
    noiPerSqFt: propertyNoiPerSqFt,
    noiMargin: propertyNoiMargin,
    ranking: 0 // Will be calculated after sorting
  });

  // Add comparable properties
  inputs.comparableProperties.forEach(comp => {
    analysis.push({
      property: comp.property,
      noi: comp.noi,
      noiPerSqFt: comp.noiPerSqFt,
      noiMargin: comp.noi / (comp.noi / (1 - 0.4)), // Rough estimate
      ranking: 0
    });
  });

  // Sort by NOI and assign rankings
  analysis.sort((a, b) => b.noi - a.noi);
  analysis.forEach((item, index) => {
    item.ranking = index + 1;
  });

  return analysis;
}

export function generateNetOperatingIncomeAnalysis(inputs: NetOperatingIncomeInputs, metrics: NetOperatingIncomeMetrics): NetOperatingIncomeAnalysis {
  const noi = calculateNetOperatingIncome(inputs);
  const noiMargin = calculateNoiMargin(inputs);
  const riskScore = calculateRiskScore(inputs);

  let noiRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor';
  if (noiMargin > 60) noiRating = 'Excellent';
  else if (noiMargin > 50) noiRating = 'Good';
  else if (noiMargin > 40) noiRating = 'Average';
  else if (noiMargin > 30) noiRating = 'Poor';
  else noiRating = 'Very Poor';

  let performanceRating: 'High Performance' | 'Good Performance' | 'Average Performance' | 'Low Performance' | 'Poor Performance';
  if (noi > 100000) performanceRating = 'High Performance';
  else if (noi > 50000) performanceRating = 'Good Performance';
  else if (noi > 25000) performanceRating = 'Average Performance';
  else if (noi > 10000) performanceRating = 'Low Performance';
  else performanceRating = 'Poor Performance';

  const recommendation = noiMargin > 50 ? 'Optimize' : noiMargin > 40 ? 'Maintain' : 'Improve';

  return {
    noiRating,
    performanceRating,
    recommendation,
    keyStrengths: [
      `NOI: $${noi.toLocaleString()}`,
      `NOI Margin: ${noiMargin.toFixed(1)}%`,
      `Cash Flow: $${metrics.annualCashFlow.toLocaleString()}`
    ],
    keyWeaknesses: [
      `Risk Score: ${riskScore}`,
      `Expense Ratio: ${metrics.expenseRatio.toFixed(1)}%`,
      `Vacancy Rate: ${inputs.vacancyRate}%`
    ],
    performanceFactors: [
      'Revenue stability',
      'Expense control',
      'Market position',
      'Property condition'
    ],
    opportunities: [
      'Rent optimization',
      'Expense reduction',
      'Occupancy improvement',
      'Property upgrades'
    ],
    noiSummary: `Net Operating Income analysis shows ${noiRating.toLowerCase()} rating with $${noi.toLocaleString()} NOI and ${noiMargin.toFixed(1)}% margin.`,
    revenueAnalysis: `Revenue analysis indicates $${metrics.effectiveGrossIncome.toLocaleString()} effective gross income with ${metrics.vacancyLossRatio.toFixed(1)}% vacancy loss.`,
    expenseAnalysis: `Expense analysis shows $${metrics.totalOperatingExpenses.toLocaleString()} total operating expenses with ${metrics.expenseRatio.toFixed(1)}% expense ratio.`,
    performanceSummary: `Performance summary indicates ${performanceRating.toLowerCase()} with $${metrics.noiPerSquareFoot.toFixed(2)} NOI per square foot.`,
    marginAnalysis: `Margin analysis shows ${noiMargin.toFixed(1)}% NOI margin with ${metrics.cashFlowMargin.toFixed(1)}% cash flow margin.`,
    efficiencyAnalysis: `Efficiency analysis indicates ${metrics.expenseRatio.toFixed(1)}% expense ratio and ${metrics.vacancyLossRatio.toFixed(1)}% vacancy loss ratio.`,
    cashFlowSummary: `Cash flow analysis shows $${metrics.annualCashFlow.toLocaleString()} annual cash flow with ${metrics.cashFlowMargin.toFixed(1)}% margin.`,
    profitabilityAnalysis: `Profitability analysis indicates ${metrics.netRentMultiplier.toFixed(1)} net rent multiplier and ${metrics.grossRentMultiplier.toFixed(1)} gross rent multiplier.`,
    sustainabilityAnalysis: `Sustainability analysis shows ${metrics.noiVolatility.toFixed(1)}% NOI volatility and ${riskScore} risk score.`,
    marketSummary: `Market analysis indicates ${inputs.marketCondition} conditions with ${inputs.marketGrowthRate}% growth rate.`,
    competitiveAnalysis: `Competitive analysis shows ${metrics.marketPosition} market position among ${inputs.comparableProperties.length + 1} properties.`,
    marketPosition: `Market position analysis indicates ${metrics.marketPosition} positioning with ${metrics.competitiveAnalysis.length} comparable properties.`,
    riskAssessment: `Overall risk assessment of ${riskScore} with ${metrics.noiVolatility.toFixed(1)}% NOI volatility and ${metrics.expenseVolatility.toFixed(1)}% expense volatility.`,
    revenueRisk: `Revenue risk assessment based on ${inputs.vacancyRate}% vacancy rate and ${inputs.collectionLossRate}% collection loss rate.`,
    expenseRisk: `Expense risk assessment based on ${metrics.expenseVolatility.toFixed(1)}% expense volatility and property age of ${inputs.propertyAge} years.`,
    marketRisk: `Market risk assessment for ${inputs.marketLocation} with ${inputs.marketCondition} conditions and ${inputs.marketGrowthRate}% growth rate.`,
    benchmarkSummary: `Benchmark analysis shows ${metrics.benchmarkAnalysis.length} key metrics compared to market averages.`,
    comparisonAnalysis: `Comparison analysis indicates performance relative to ${inputs.comparableProperties.length} comparable properties.`,
    performanceGap: `Performance gap analysis shows ${metrics.benchmarkAnalysis.reduce((sum, b) => sum + b.difference, 0) / metrics.benchmarkAnalysis.length} average difference from market.`,
    optimizationRecommendations: [
      noiMargin < 50 ? 'Focus on expense reduction and revenue optimization' : 'Maintain current performance levels',
      inputs.vacancyRate > 5 ? 'Implement vacancy reduction strategies' : 'Continue occupancy management'
    ],
    improvementSuggestions: [
      'Review rent rates and lease terms',
      'Implement preventive maintenance programs',
      'Optimize property management fees',
      'Enhance marketing and tenant retention'
    ],
    riskMitigation: [
      'Diversify tenant base',
      'Maintain adequate reserves',
      'Regular property inspections',
      'Market condition monitoring'
    ],
    implementationPlan: `Implementation plan includes ${recommendation.toLowerCase()} strategy with focus on key performance metrics.`,
    nextSteps: [
      'Review current lease agreements',
      'Analyze expense reduction opportunities',
      'Assess market rent rates',
      'Develop improvement budget'
    ],
    timeline: `${inputs.analysisPeriod} year analysis period with quarterly performance reviews.`,
    monitoringPlan: 'Monthly NOI tracking and quarterly performance analysis.',
    keyMetrics: [
      'NOI',
      'NOI Margin',
      'Expense Ratio',
      'Vacancy Rate'
    ],
    reviewSchedule: 'Quarterly performance review and annual comprehensive analysis.',
    riskManagement: `Risk management includes monitoring ${riskScore} risk score and implementing mitigation strategies.`,
    mitigationStrategies: [
      'Expense control measures',
      'Revenue diversification',
      'Market risk monitoring',
      'Reserve fund maintenance'
    ],
    contingencyPlans: [
      'Vacancy contingency planning',
      'Expense overrun management',
      'Market decline response',
      'Capital improvement funding'
    ],
    performanceBenchmarks: [
      {
        metric: 'NOI Margin',
        target: 50,
        benchmark: noiMargin,
        industry: 'Real Estate'
      },
      {
        metric: 'Expense Ratio',
        target: 40,
        benchmark: metrics.expenseRatio,
        industry: 'Real Estate'
      },
      {
        metric: 'Risk Score',
        target: 30,
        benchmark: riskScore,
        industry: 'Real Estate'
      }
    ],
    decisionRecommendation: `${recommendation} with ${noiRating.toLowerCase()} NOI rating and ${performanceRating.toLowerCase()}.`,
    presentationPoints: [
      `NOI: $${noi.toLocaleString()}`,
      `NOI Margin: ${noiMargin.toFixed(1)}%`,
      `Risk Score: ${riskScore}`,
      `Recommendation: ${recommendation}`
    ],
    decisionFactors: [
      'NOI performance analysis',
      'Expense ratio evaluation',
      'Market position assessment',
      'Risk factor consideration'
    ]
  };
}