import { GrossRentMultiplierInputs, GrossRentMultiplierMetrics, GrossRentMultiplierAnalysis } from './types';

export function calculateGrossRentMultiplier(inputs: GrossRentMultiplierInputs): GrossRentMultiplierMetrics {
  // Calculate basic GRM metrics
  const grossRentMultiplier = inputs.marketValue / inputs.annualGrossRent;
  const netRentMultiplier = inputs.marketValue / inputs.annualNetOperatingIncome;
  const effectiveGrossRentMultiplier = inputs.marketValue / inputs.effectiveGrossIncome;
  const marketGRMComparison = grossRentMultiplier - inputs.marketGRM;

  // Calculate financial metrics
  const totalInvestment = inputs.purchasePrice;
  const annualCashFlow = inputs.annualNetOperatingIncome;
  const monthlyCashFlow = inputs.monthlyNetOperatingIncome;
  const cashOnCashReturn = (annualCashFlow / totalInvestment) * 100;
  const returnOnInvestment = (annualCashFlow / inputs.marketValue) * 100;

  // Calculate income metrics
  const grossIncome = inputs.annualGrossRent;
  const netIncome = inputs.annualNetOperatingIncome;
  const effectiveGrossIncome = inputs.effectiveGrossIncome;
  const vacancyLoss = inputs.annualGrossRent * (inputs.vacancyRate / 100);
  const collectionLoss = inputs.annualGrossRent * (inputs.collectionLoss / 100);

  // Calculate expense metrics
  const totalExpenses = inputs.propertyTaxes + inputs.insurance + inputs.utilities + 
                       inputs.maintenance + inputs.propertyManagement + inputs.repairs + 
                       inputs.landscaping + inputs.pestControl + inputs.otherExpenses;
  const expenseRatio = (totalExpenses / grossIncome) * 100;
  const netIncomeMultiplier = inputs.marketValue / netIncome;

  // Calculate market analysis
  const marketValue = inputs.marketValue;
  const marketValuePerSquareFoot = marketValue / inputs.propertySize;
  const marketValuePerUnit = marketValue / inputs.numberOfUnits;
  const comparableValue = calculateComparableValue(inputs);

  // Calculate performance metrics
  const breakEvenRent = totalExpenses / (1 - inputs.vacancyRate / 100);
  const breakEvenOccupancy = (totalExpenses / grossIncome) * 100;
  const profitMargin = ((grossIncome - totalExpenses) / grossIncome) * 100;
  const operatingExpenseRatio = (totalExpenses / grossIncome) * 100;

  // Calculate risk metrics
  const riskScore = calculateRiskScore(inputs);
  const vacancyRisk = inputs.vacancyRate;
  const marketRisk = calculateMarketRisk(inputs);
  const expenseRisk = calculateExpenseRisk(inputs);

  // Calculate sensitivity matrix
  const sensitivityMatrix = calculateSensitivityMatrix(inputs, grossRentMultiplier);

  // Calculate scenario analysis
  const scenarios = calculateScenarios(inputs, grossRentMultiplier);

  return {
    // GRM Analysis
    grossRentMultiplier,
    netRentMultiplier,
    effectiveGrossRentMultiplier,
    marketGRMComparison,

    // Financial Metrics
    totalInvestment,
    annualCashFlow,
    monthlyCashFlow,
    cashOnCashReturn,
    returnOnInvestment,

    // Income Analysis
    grossIncome,
    netIncome,
    effectiveGrossIncome,
    vacancyLoss,
    collectionLoss,

    // Expense Analysis
    totalExpenses,
    expenseRatio,
    netIncomeMultiplier,

    // Market Analysis
    marketValue,
    marketValuePerSquareFoot,
    marketValuePerUnit,
    comparableValue,

    // Performance Metrics
    breakEvenRent,
    breakEvenOccupancy,
    profitMargin,
    operatingExpenseRatio,

    // Risk Metrics
    riskScore,
    vacancyRisk,
    marketRisk,
    expenseRisk,

    // Sensitivity Analysis
    sensitivityMatrix,

    // Scenario Analysis
    scenarios
  };
}

function calculateComparableValue(inputs: GrossRentMultiplierInputs): number {
  if (inputs.comparableProperties.length === 0) {
    return inputs.marketValue;
  }

  const totalValue = inputs.comparableProperties.reduce((sum, comp) => sum + comp.salePrice, 0);
  const averageValue = totalValue / inputs.comparableProperties.length;
  
  // Adjust for size differences
  const totalSize = inputs.comparableProperties.reduce((sum, comp) => sum + comp.size, 0);
  const averageSize = totalSize / inputs.comparableProperties.length;
  const sizeAdjustment = inputs.propertySize / averageSize;
  
  return averageValue * sizeAdjustment;
}

function calculateRiskScore(inputs: GrossRentMultiplierInputs): number {
  let riskScore = 5; // Base score

  // Vacancy risk adjustment
  if (inputs.vacancyRate > 10) riskScore += 2;
  else if (inputs.vacancyRate > 5) riskScore += 1;
  else if (inputs.vacancyRate < 2) riskScore -= 1;

  // Market risk adjustment
  const marketRiskScores = { hot: -1, stable: 0, declining: 2, emerging: 1 };
  riskScore += marketRiskScores[inputs.marketType];

  // Market trend adjustment
  const trendScores = { appreciating: -1, stable: 0, declining: 2 };
  riskScore += trendScores[inputs.marketTrend];

  // Property condition adjustment
  const conditionScores = { excellent: -2, good: -1, fair: 0, poor: 2, needs_work: 3 };
  riskScore += conditionScores[inputs.propertyCondition];

  // Expense ratio adjustment
  const expenseRatio = (inputs.annualOperatingExpenses / inputs.annualGrossRent) * 100;
  if (expenseRatio > 50) riskScore += 2;
  else if (expenseRatio > 40) riskScore += 1;
  else if (expenseRatio < 25) riskScore -= 1;

  // GRM comparison adjustment
  const grm = inputs.marketValue / inputs.annualGrossRent;
  if (grm > inputs.marketGRM * 1.2) riskScore += 1;
  else if (grm < inputs.marketGRM * 0.8) riskScore -= 1;

  return Math.min(Math.max(riskScore, 1), 10);
}

function calculateMarketRisk(inputs: GrossRentMultiplierInputs): number {
  let marketRisk = 5; // Base risk

  // Market type adjustment
  const marketTypeRisks = { hot: 3, stable: 5, declining: 8, emerging: 6 };
  marketRisk = marketTypeRisks[inputs.marketType];

  // Market trend adjustment
  const trendRisks = { appreciating: 3, stable: 5, declining: 8 };
  marketRisk = Math.max(marketRisk, trendRisks[inputs.marketTrend]);

  // Property type adjustment
  const propertyTypeRisks = {
    single_family: 4,
    multi_family: 5,
    commercial: 6,
    industrial: 7,
    retail: 6,
    office: 6,
    mixed_use: 5
  };
  marketRisk = Math.max(marketRisk, propertyTypeRisks[inputs.propertyType]);

  return Math.min(marketRisk, 10);
}

function calculateExpenseRisk(inputs: GrossRentMultiplierInputs): number {
  const expenseRatio = (inputs.annualOperatingExpenses / inputs.annualGrossRent) * 100;
  
  if (expenseRatio > 60) return 10;
  else if (expenseRatio > 50) return 8;
  else if (expenseRatio > 40) return 6;
  else if (expenseRatio > 30) return 4;
  else if (expenseRatio > 20) return 2;
  else return 1;
}

function calculateSensitivityMatrix(inputs: GrossRentMultiplierInputs, baseGRM: number): any[] {
  const variables = [
    { name: 'Market Value', base: inputs.marketValue, range: [-50000, 50000] },
    { name: 'Annual Gross Rent', base: inputs.annualGrossRent, range: [-5000, 5000] },
    { name: 'Vacancy Rate', base: inputs.vacancyRate, range: [-2, 2] },
    { name: 'Operating Expenses', base: inputs.annualOperatingExpenses, range: [-5000, 5000] }
  ];

  return variables.map(variable => {
    const values = [];
    const impacts = [];

    for (let i = variable.range[0]; i <= variable.range[1]; i += (variable.range[1] - variable.range[0]) / 4) {
      const testInputs = { ...inputs };
      testInputs[variable.name.toLowerCase().replace(' ', '') as keyof GrossRentMultiplierInputs] = 
        (variable.base + i) as any;
      
      const testMetrics = calculateGrossRentMultiplier(testInputs);
      values.push(variable.base + i);
      impacts.push(testMetrics.grossRentMultiplier);
    }

    return {
      variable: variable.name,
      values,
      impacts
    };
  });
}

function calculateScenarios(inputs: GrossRentMultiplierInputs, baseGRM: number): any[] {
  return [
    {
      scenario: 'Best Case',
      probability: 20,
      grm: baseGRM * 0.8,
      roi: inputs.returnOnInvestment * 1.3
    },
    {
      scenario: 'Base Case',
      probability: 60,
      grm: baseGRM,
      roi: inputs.returnOnInvestment
    },
    {
      scenario: 'Worst Case',
      probability: 20,
      grm: baseGRM * 1.3,
      roi: inputs.returnOnInvestment * 0.7
    }
  ];
}

export function generateGrossRentMultiplierReport(
  inputs: GrossRentMultiplierInputs, 
  metrics: GrossRentMultiplierMetrics
): GrossRentMultiplierAnalysis {
  // Determine investment rating
  let investmentRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor';
  if (metrics.cashOnCashReturn >= 8 && metrics.riskScore <= 4) investmentRating = 'Excellent';
  else if (metrics.cashOnCashReturn >= 6 && metrics.riskScore <= 5) investmentRating = 'Good';
  else if (metrics.cashOnCashReturn >= 4 && metrics.riskScore <= 6) investmentRating = 'Average';
  else if (metrics.cashOnCashReturn >= 2 && metrics.riskScore <= 7) investmentRating = 'Poor';
  else investmentRating = 'Very Poor';

  // Determine risk rating
  let riskRating: 'Low' | 'Moderate' | 'High' | 'Very High';
  if (metrics.riskScore <= 3) riskRating = 'Low';
  else if (metrics.riskScore <= 5) riskRating = 'Moderate';
  else if (metrics.riskScore <= 7) riskRating = 'High';
  else riskRating = 'Very High';

  // Determine recommendation
  let recommendation: 'Buy' | 'Consider' | 'Hold' | 'Sell' | 'Avoid';
  if (metrics.cashOnCashReturn >= 7 && metrics.riskScore <= 4) recommendation = 'Buy';
  else if (metrics.cashOnCashReturn >= 5 && metrics.riskScore <= 5) recommendation = 'Consider';
  else if (metrics.cashOnCashReturn >= 3) recommendation = 'Hold';
  else if (metrics.cashOnCashReturn >= 1) recommendation = 'Sell';
  else recommendation = 'Avoid';

  // Generate key insights
  const keyStrengths = [];
  const keyWeaknesses = [];
  const riskFactors = [];
  const opportunities = [];

  if (metrics.cashOnCashReturn >= 6) keyStrengths.push('Strong cash flow generation');
  if (metrics.riskScore <= 4) keyStrengths.push('Low risk profile');
  if (metrics.grossRentMultiplier < inputs.marketGRM) keyStrengths.push('Below-market GRM');
  if (inputs.propertyCondition === 'excellent' || inputs.propertyCondition === 'good') keyStrengths.push('Good property condition');

  if (metrics.cashOnCashReturn < 4) keyWeaknesses.push('Low cash flow generation');
  if (metrics.riskScore >= 7) keyWeaknesses.push('High risk profile');
  if (metrics.grossRentMultiplier > inputs.marketGRM * 1.2) keyWeaknesses.push('Above-market GRM');
  if (inputs.propertyCondition === 'poor' || inputs.propertyCondition === 'needs_work') keyWeaknesses.push('Poor property condition');

  if (metrics.vacancyRisk > 8) riskFactors.push('High vacancy risk');
  if (metrics.marketRisk > 7) riskFactors.push('High market risk');
  if (metrics.expenseRisk > 6) riskFactors.push('High expense risk');
  if (inputs.marketType === 'declining') riskFactors.push('Declining market');

  if (inputs.marketTrend === 'appreciating') opportunities.push('Market appreciation potential');
  if (inputs.rentGrowthRate > 3) opportunities.push('Strong rent growth potential');
  if (metrics.grossRentMultiplier < inputs.marketGRM) opportunities.push('Value appreciation potential');

  return {
    // Executive Summary
    investmentRating,
    riskRating,
    recommendation,

    // Key Insights
    keyStrengths,
    keyWeaknesses,
    riskFactors,
    opportunities,

    // GRM Analysis
    grmSummary: `The property has a gross rent multiplier of ${metrics.grossRentMultiplier.toFixed(2)}, which is ${metrics.marketGRMComparison > 0 ? 'above' : 'below'} the market average of ${inputs.marketGRM}.`,
    marketComparison: `Compared to the market GRM of ${inputs.marketGRM}, this property is ${Math.abs(metrics.marketGRMComparison).toFixed(2)} ${metrics.marketGRMComparison > 0 ? 'higher' : 'lower'}.`,
    investmentAnalysis: `The investment offers a cash-on-cash return of ${metrics.cashOnCashReturn.toFixed(2)}% with a risk score of ${metrics.riskScore}/10.`,

    // Financial Analysis
    financialSummary: `The property generates annual cash flow of $${metrics.annualCashFlow.toLocaleString()} with total expenses of $${metrics.totalExpenses.toLocaleString()}.`,
    cashFlowAnalysis: `Monthly cash flow is $${metrics.monthlyCashFlow.toLocaleString()} with an expense ratio of ${metrics.expenseRatio.toFixed(2)}%.`,
    returnAnalysis: `The return on investment is ${metrics.returnOnInvestment.toFixed(2)}% with a profit margin of ${metrics.profitMargin.toFixed(2)}%.`,

    // Market Assessment
    marketAssessment: `The property is located in a ${inputs.marketType} market with ${inputs.marketTrend} trends.`,
    comparableAnalysis: `Comparable sales analysis supports a value of $${metrics.comparableValue.toLocaleString()}.`,
    marketPosition: `The property is well-positioned in the market with strong fundamentals.`,

    // Risk Assessment
    riskAssessment: `Overall risk profile is ${riskRating.toLowerCase()} with key risk factors including vacancy, market, and expense risks.`,
    vacancyRisk: `Vacancy risk is ${metrics.vacancyRisk.toFixed(2)}% based on current market conditions.`,
    marketRisk: `Market risk is ${metrics.marketRisk.toFixed(2)}% due to ${inputs.marketType} market conditions.`,
    expenseRisk: `Expense risk is ${metrics.expenseRisk.toFixed(2)}% based on current expense levels.`,

    // Property Analysis
    propertyAnalysis: `The ${inputs.propertyType.replace('_', ' ')} property is ${inputs.yearBuilt} vintage in ${inputs.propertyCondition} condition.`,
    locationAnalysis: `Located in ${inputs.neighborhood}, ${inputs.city}, ${inputs.state} ${inputs.zipCode}.`,
    conditionAnalysis: `Property condition is ${inputs.propertyCondition} with ${inputs.bedrooms} bedrooms and ${inputs.bathrooms} bathrooms.`,

    // Income Analysis
    incomeAnalysis: `Annual gross rent is $${metrics.grossIncome.toLocaleString()} with effective gross income of $${metrics.effectiveGrossIncome.toLocaleString()}.`,
    rentAnalysis: `Vacancy loss is $${metrics.vacancyLoss.toLocaleString()} and collection loss is $${metrics.collectionLoss.toLocaleString()}.`,
    expenseAnalysis: `Total operating expenses are $${metrics.totalExpenses.toLocaleString()} with an expense ratio of ${metrics.expenseRatio.toFixed(2)}%.`,

    // Recommendations
    investmentRecommendations: [
      'Conduct thorough property inspection',
      'Review rental market conditions',
      'Assess tenant quality and lease terms',
      'Evaluate property management options'
    ],
    riskMitigation: [
      'Implement strong tenant screening',
      'Maintain adequate reserves',
      'Monitor market conditions regularly',
      'Establish maintenance schedules'
    ],
    optimizationSuggestions: [
      'Consider rent increases if below market',
      'Optimize operating expenses',
      'Explore value-add opportunities',
      'Review property management efficiency'
    ],

    // Implementation
    implementationPlan: 'Proceed with comprehensive due diligence and market analysis.',
    nextSteps: [
      'Complete property inspection',
      'Review financial statements',
      'Analyze market comparables',
      'Finalize investment terms'
    ],
    timeline: '30-45 days for due diligence and closing.',

    // Monitoring
    monitoringPlan: 'Establish monthly monitoring of cash flow and quarterly market analysis.',
    keyMetrics: [
      'Monthly cash flow',
      'Vacancy rates',
      'Market rent trends',
      'Operating expenses'
    ],
    reviewSchedule: 'Annual comprehensive review with quarterly updates.',

    // Risk Management
    riskManagement: 'Implement comprehensive risk management strategy including monitoring and mitigation measures.',
    mitigationStrategies: [
      'Diversify tenant base',
      'Maintain adequate insurance',
      'Regular property inspections',
      'Market condition monitoring'
    ],
    contingencyPlans: [
      'Tenant default procedures',
      'Market downturn response',
      'Expense reduction strategies',
      'Exit strategy alternatives'
    ],

    // Performance Benchmarks
    performanceBenchmarks: [
      {
        metric: 'Cash on Cash Return',
        target: 6.0,
        benchmark: metrics.cashOnCashReturn,
        industry: 'Real Estate'
      },
      {
        metric: 'GRM',
        target: inputs.marketGRM,
        benchmark: metrics.grossRentMultiplier,
        industry: 'Real Estate'
      },
      {
        metric: 'Risk Score',
        target: 5,
        benchmark: metrics.riskScore,
        industry: 'Investment'
      }
    ],

    // Decision Support
    decisionRecommendation: `Based on the analysis, we recommend ${recommendation.toLowerCase()} this investment opportunity.`,
    presentationPoints: [
      `Strong cash flow with ${metrics.cashOnCashReturn.toFixed(2)}% return`,
      `Favorable risk profile with score of ${metrics.riskScore}/10`,
      `Market-competitive GRM of ${metrics.grossRentMultiplier.toFixed(2)}`,
      `Stable income generation potential`
    ],
    decisionFactors: [
      'Cash flow generation',
      'Risk profile',
      'Market positioning',
      'Property condition',
      'Location quality'
    ]
  };
}
