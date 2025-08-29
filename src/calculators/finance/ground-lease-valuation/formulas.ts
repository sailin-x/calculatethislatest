import { GroundLeaseValuationInputs, GroundLeaseValuationMetrics, GroundLeaseValuationAnalysis } from './types';

export function calculateGroundLeaseValuation(inputs: GroundLeaseValuationInputs): GroundLeaseValuationMetrics {
  // Calculate basic financial metrics
  const grossIncome = inputs.currentRent;
  const totalExpenses = inputs.operatingExpenses + inputs.propertyTaxes + inputs.insurance + 
                       inputs.maintenance + inputs.utilities + inputs.managementFees;
  const netOperatingIncome = grossIncome - totalExpenses;
  const effectiveGrossIncome = grossIncome * 0.95; // Assume 5% vacancy/collection loss
  const vacancyLoss = grossIncome * 0.03; // 3% vacancy loss
  const collectionLoss = grossIncome * 0.02; // 2% collection loss

  // Calculate cash flow projections
  const cashFlowProjections = [];
  let cumulativeCashFlow = 0;
  let totalCashFlow = 0;
  
  for (let year = 1; year <= inputs.analysisPeriod; year++) {
    const escalatedRent = inputs.currentRent * Math.pow(1 + inputs.rentEscalation / 100, year);
    const escalatedExpenses = totalExpenses * Math.pow(1 + inputs.inflationRate / 100, year);
    const netCashFlow = escalatedRent - escalatedExpenses;
    
    cumulativeCashFlow += netCashFlow;
    totalCashFlow += netCashFlow;
    
    cashFlowProjections.push({
      year,
      grossIncome: escalatedRent,
      expenses: escalatedExpenses,
      netIncome: netCashFlow,
      cashFlow: netCashFlow,
      presentValue: netCashFlow / Math.pow(1 + inputs.discountRate / 100, year)
    });
  }

  // Calculate present value
  let presentValue = 0;
  for (let year = 1; year <= inputs.analysisPeriod; year++) {
    const escalatedRent = inputs.currentRent * Math.pow(1 + inputs.rentEscalation / 100, year);
    const escalatedExpenses = totalExpenses * Math.pow(1 + inputs.inflationRate / 100, year);
    const netCashFlow = escalatedRent - escalatedExpenses;
    presentValue += netCashFlow / Math.pow(1 + inputs.discountRate / 100, year);
  }

  // Add reversion value
  const reversionPresentValue = inputs.reversionValue / Math.pow(1 + inputs.discountRate / 100, inputs.analysisPeriod);
  presentValue += reversionPresentValue;

  // Calculate IRR using iterative method
  const irr = calculateIRR(inputs, cashFlowProjections, inputs.reversionValue);

  // Calculate yield to maturity
  const yieldToMaturity = calculateYieldToMaturity(inputs, presentValue);

  // Calculate capitalization rate
  const capitalizationRate = (netOperatingIncome / presentValue) * 100;

  // Calculate cash on cash return
  const cashOnCashReturn = (netOperatingIncome / presentValue) * 100;

  // Calculate debt service coverage (assuming no debt for ground lease)
  const debtServiceCoverage = netOperatingIncome / 1; // No debt service

  // Calculate market value
  const marketValue = netOperatingIncome / (inputs.marketCapRate / 100);
  const marketValuePerSquareFoot = marketValue / inputs.propertySize;
  const marketValuePerAcre = marketValue / inputs.landSize;

  // Calculate comparable value
  const comparableValue = calculateComparableValue(inputs);

  // Calculate risk metrics
  const riskScore = calculateRiskScore(inputs);
  const probabilityOfDefault = calculateProbabilityOfDefault(inputs);
  const lossGivenDefault = calculateLossGivenDefault(inputs);
  const expectedLoss = (probabilityOfDefault / 100) * (lossGivenDefault / 100) * presentValue;

  // Calculate sensitivity matrix
  const sensitivityMatrix = calculateSensitivityMatrix(inputs, presentValue);

  // Calculate scenario analysis
  const scenarios = calculateScenarios(inputs, presentValue);

  return {
    // Valuation Analysis
    presentValue,
    netPresentValue: presentValue - inputs.buildingValue,
    internalRateOfReturn: irr,
    yieldToMaturity,
    capitalizationRate,

    // Cash Flow Analysis
    annualCashFlow: netOperatingIncome,
    totalCashFlow,
    cashOnCashReturn,
    debtServiceCoverage,

    // Income Analysis
    grossIncome,
    netOperatingIncome,
    effectiveGrossIncome,
    vacancyLoss,
    collectionLoss,

    // Expense Analysis
    totalExpenses,
    expenseRatio: (totalExpenses / grossIncome) * 100,
    netIncomeMultiplier: presentValue / netOperatingIncome,

    // Market Analysis
    marketValue,
    marketValuePerSquareFoot,
    marketValuePerAcre,
    comparableValue,

    // Risk Metrics
    riskScore,
    probabilityOfDefault,
    lossGivenDefault,
    expectedLoss,

    // Sensitivity Analysis
    sensitivityMatrix,

    // Scenario Analysis
    scenarios
  };
}

function calculateIRR(inputs: GroundLeaseValuationInputs, cashFlows: any[], reversionValue: number): number {
  // Simplified IRR calculation using iterative method
  let irr = inputs.discountRate;
  const tolerance = 0.0001;
  const maxIterations = 100;

  for (let iteration = 0; iteration < maxIterations; iteration++) {
    let npv = -inputs.buildingValue; // Initial investment
    
    // Add cash flows
    for (let i = 0; i < cashFlows.length; i++) {
      npv += cashFlows[i].cashFlow / Math.pow(1 + irr / 100, i + 1);
    }
    
    // Add reversion value
    npv += reversionValue / Math.pow(1 + irr / 100, inputs.analysisPeriod);

    if (Math.abs(npv) < tolerance) {
      break;
    }

    // Adjust IRR based on NPV
    if (npv > 0) {
      irr += 0.1;
    } else {
      irr -= 0.1;
    }
  }

  return Math.min(Math.max(irr, 0), 50); // Clamp between 0% and 50%
}

function calculateYieldToMaturity(inputs: GroundLeaseValuationInputs, presentValue: number): number {
  // Simplified YTM calculation
  const totalReturn = (inputs.reversionValue - presentValue) / presentValue;
  const annualReturn = Math.pow(1 + totalReturn, 1 / inputs.analysisPeriod) - 1;
  return annualReturn * 100;
}

function calculateComparableValue(inputs: GroundLeaseValuationInputs): number {
  if (inputs.comparableSales.length === 0) {
    return inputs.marketValue;
  }

  const totalValue = inputs.comparableSales.reduce((sum, comp) => sum + comp.salePrice, 0);
  const averageValue = totalValue / inputs.comparableSales.length;
  
  // Adjust for size differences
  const totalSize = inputs.comparableSales.reduce((sum, comp) => sum + comp.size, 0);
  const averageSize = totalSize / inputs.comparableSales.length;
  const sizeAdjustment = inputs.propertySize / averageSize;
  
  return averageValue * sizeAdjustment;
}

function calculateRiskScore(inputs: GroundLeaseValuationInputs): number {
  let riskScore = 5; // Base score

  // Tenant credit adjustment
  const creditScores = { aaa: 1, aa: 2, a: 3, bbb: 4, bb: 6, b: 8, ccc: 9, default: 10 };
  riskScore += creditScores[inputs.tenantCredit] - 5;

  // Lease security adjustment
  const securityScores = { guaranteed: -2, secured: -1, unsecured: 1, subordinated: 2 };
  riskScore += securityScores[inputs.leaseSecurity];

  // Market risk adjustment
  const marketRiskScores = { low: -1, medium: 0, high: 2 };
  riskScore += marketRiskScores[inputs.marketRisk];

  // Redevelopment risk adjustment
  const redevRiskScores = { low: -1, medium: 0, high: 1 };
  riskScore += redevRiskScores[inputs.redevelopmentRisk];

  // Legal issues adjustment
  if (inputs.zoningRestrictions) riskScore += 1;
  if (inputs.environmentalIssues) riskScore += 2;
  if (inputs.titleIssues) riskScore += 2;
  if (inputs.easements) riskScore += 1;

  return Math.min(Math.max(riskScore, 1), 10);
}

function calculateProbabilityOfDefault(inputs: GroundLeaseValuationInputs): number {
  const creditDefaults = { aaa: 0.1, aa: 0.2, a: 0.5, bbb: 1.0, bb: 3.0, b: 8.0, ccc: 15.0, default: 50.0 };
  let baseProbability = creditDefaults[inputs.tenantCredit];

  // Adjust for lease security
  const securityAdjustments = { guaranteed: 0.5, secured: 0.8, unsecured: 1.2, subordinated: 1.5 };
  baseProbability *= securityAdjustments[inputs.leaseSecurity];

  // Adjust for market risk
  const marketAdjustments = { low: 0.8, medium: 1.0, high: 1.3 };
  baseProbability *= marketAdjustments[inputs.marketRisk];

  return Math.min(baseProbability, 25); // Cap at 25%
}

function calculateLossGivenDefault(inputs: GroundLeaseValuationInputs): number {
  let baseLoss = 40; // Base 40% loss

  // Adjust for lease security
  const securityAdjustments = { guaranteed: 0.6, secured: 0.8, unsecured: 1.0, subordinated: 1.2 };
  baseLoss *= securityAdjustments[inputs.leaseSecurity];

  // Adjust for market conditions
  const marketAdjustments = { low: 0.8, medium: 1.0, high: 1.3 };
  baseLoss *= marketAdjustments[inputs.marketRisk];

  return Math.min(Math.max(baseLoss, 20), 80); // Clamp between 20% and 80%
}

function calculateSensitivityMatrix(inputs: GroundLeaseValuationInputs, baseValue: number): any[] {
  const variables = [
    { name: 'Rent Escalation', base: inputs.rentEscalation, range: [-2, 2] },
    { name: 'Discount Rate', base: inputs.discountRate, range: [-1, 1] },
    { name: 'Market Cap Rate', base: inputs.marketCapRate, range: [-1, 1] },
    { name: 'Inflation Rate', base: inputs.inflationRate, range: [-1, 1] }
  ];

  return variables.map(variable => {
    const values = [];
    const impacts = [];

    for (let i = variable.range[0]; i <= variable.range[1]; i++) {
      const testInputs = { ...inputs };
      testInputs[variable.name.toLowerCase().replace(' ', '') as keyof GroundLeaseValuationInputs] = 
        (variable.base + i) as any;
      
      const testMetrics = calculateGroundLeaseValuation(testInputs);
      values.push(variable.base + i);
      impacts.push(testMetrics.presentValue);
    }

    return {
      variable: variable.name,
      values,
      impacts
    };
  });
}

function calculateScenarios(inputs: GroundLeaseValuationInputs, baseValue: number): any[] {
  return [
    {
      scenario: 'Best Case',
      probability: 20,
      value: baseValue * 1.3,
      irr: inputs.internalRateOfReturn * 1.2
    },
    {
      scenario: 'Base Case',
      probability: 60,
      value: baseValue,
      irr: inputs.internalRateOfReturn
    },
    {
      scenario: 'Worst Case',
      probability: 20,
      value: baseValue * 0.7,
      irr: inputs.internalRateOfReturn * 0.8
    }
  ];
}

export function generateGroundLeaseValuationReport(
  inputs: GroundLeaseValuationInputs, 
  metrics: GroundLeaseValuationMetrics
): GroundLeaseValuationAnalysis {
  // Determine valuation rating
  let valuationRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor';
  if (metrics.internalRateOfReturn >= 12) valuationRating = 'Excellent';
  else if (metrics.internalRateOfReturn >= 8) valuationRating = 'Good';
  else if (metrics.internalRateOfReturn >= 6) valuationRating = 'Average';
  else if (metrics.internalRateOfReturn >= 4) valuationRating = 'Poor';
  else valuationRating = 'Very Poor';

  // Determine risk rating
  let riskRating: 'Low' | 'Moderate' | 'High' | 'Very High';
  if (metrics.riskScore <= 3) riskRating = 'Low';
  else if (metrics.riskScore <= 5) riskRating = 'Moderate';
  else if (metrics.riskScore <= 7) riskRating = 'High';
  else riskRating = 'Very High';

  // Determine recommendation
  let recommendation: 'Invest' | 'Consider' | 'Hold' | 'Sell' | 'Avoid';
  if (metrics.internalRateOfReturn >= 10 && metrics.riskScore <= 5) recommendation = 'Invest';
  else if (metrics.internalRateOfReturn >= 8 && metrics.riskScore <= 6) recommendation = 'Consider';
  else if (metrics.internalRateOfReturn >= 6) recommendation = 'Hold';
  else if (metrics.internalRateOfReturn >= 4) recommendation = 'Sell';
  else recommendation = 'Avoid';

  // Generate key insights
  const keyStrengths = [];
  const keyWeaknesses = [];
  const riskFactors = [];
  const opportunities = [];

  if (metrics.internalRateOfReturn >= 10) keyStrengths.push('Strong return potential');
  if (metrics.riskScore <= 4) keyStrengths.push('Low risk profile');
  if (inputs.tenantCredit === 'aaa' || inputs.tenantCredit === 'aa') keyStrengths.push('High-quality tenant');
  if (inputs.leaseSecurity === 'guaranteed') keyStrengths.push('Guaranteed lease security');

  if (metrics.internalRateOfReturn < 6) keyWeaknesses.push('Low return potential');
  if (metrics.riskScore >= 7) keyWeaknesses.push('High risk profile');
  if (inputs.tenantCredit === 'ccc' || inputs.tenantCredit === 'default') keyWeaknesses.push('Poor tenant credit');
  if (inputs.leaseSecurity === 'subordinated') keyWeaknesses.push('Subordinated lease security');

  if (metrics.probabilityOfDefault > 5) riskFactors.push('Elevated default risk');
  if (inputs.marketRisk === 'high') riskFactors.push('High market risk');
  if (inputs.redevelopmentRisk === 'high') riskFactors.push('High redevelopment risk');
  if (inputs.environmentalIssues) riskFactors.push('Environmental issues present');

  if (inputs.rentReviewClause) opportunities.push('Rent review opportunities');
  if (inputs.renewalOptions > 0) opportunities.push('Renewal option value');
  if (inputs.marketGrowthRate > 2) opportunities.push('Market growth potential');

  return {
    // Executive Summary
    valuationRating,
    riskRating,
    recommendation,

    // Key Insights
    keyStrengths,
    keyWeaknesses,
    riskFactors,
    opportunities,

    // Valuation Analysis
    valuationSummary: `The ground lease presents a ${valuationRating.toLowerCase()} investment opportunity with a present value of $${metrics.presentValue.toLocaleString()} and an IRR of ${metrics.internalRateOfReturn.toFixed(2)}%.`,
    incomeAnalysis: `The lease generates annual net operating income of $${metrics.netOperatingIncome.toLocaleString()} with a capitalization rate of ${metrics.capitalizationRate.toFixed(2)}%.`,
    marketAnalysis: `Market analysis indicates a value of $${metrics.marketValue.toLocaleString()} based on current market conditions and comparable sales.`,

    // Cash Flow Analysis
    cashFlowSummary: `The investment provides strong cash flow with a cash-on-cash return of ${metrics.cashOnCashReturn.toFixed(2)}% and total cash flow of $${metrics.totalCashFlow.toLocaleString()} over the analysis period.`,
    returnAnalysis: `The investment offers an internal rate of return of ${metrics.internalRateOfReturn.toFixed(2)}% and yield to maturity of ${metrics.yieldToMaturity.toFixed(2)}%.`,
    riskAnalysis: `Risk assessment indicates a risk score of ${metrics.riskScore}/10 with a probability of default of ${metrics.probabilityOfDefault.toFixed(2)}%.`,

    // Market Assessment
    marketAssessment: `Market conditions are ${inputs.marketRisk} risk with expected growth of ${inputs.marketGrowthRate}% annually.`,
    comparableAnalysis: `Comparable sales analysis supports a value of $${metrics.comparableValue.toLocaleString()}.`,
    marketPosition: `The property is well-positioned in the market with strong fundamentals.`,

    // Risk Assessment
    riskAssessment: `Overall risk profile is ${riskRating.toLowerCase()} with key risk factors including tenant credit quality and market conditions.`,
    tenantRisk: `Tenant credit rating is ${inputs.tenantCredit.toUpperCase()} with ${metrics.probabilityOfDefault.toFixed(2)}% probability of default.`,
    marketRisk: `Market risk is ${inputs.marketRisk} with potential for ${inputs.marketGrowthRate}% annual growth.`,
    legalRisk: `Legal risk factors include ${inputs.zoningRestrictions ? 'zoning restrictions, ' : ''}${inputs.environmentalIssues ? 'environmental issues, ' : ''}${inputs.titleIssues ? 'title issues, ' : ''}${inputs.easements ? 'easements' : ''}.`,

    // Lease Analysis
    leaseAnalysis: `The ${inputs.leaseType.replace('_', ' ')} has ${inputs.remainingTerm} years remaining with ${inputs.renewalOptions} renewal options.`,
    termAnalysis: `The lease term provides adequate time for investment recovery and value appreciation.`,
    renewalAnalysis: `Renewal options provide additional value and flexibility for long-term planning.`,

    // Property Analysis
    propertyAnalysis: `The ${inputs.propertyType} property is ${inputs.buildingAge} years old in ${inputs.buildingCondition} condition.`,
    improvementAnalysis: `Building improvements have a value of $${inputs.buildingValue.toLocaleString()} with ${inputs.remainingEconomicLife} years of remaining economic life.`,
    landAnalysis: `The ${inputs.landSize}-acre site has a highest and best use of ${inputs.highestBestUse}.`,

    // Recommendations
    investmentRecommendations: [
      'Conduct thorough due diligence on tenant financials',
      'Review lease terms and renewal options',
      'Assess market conditions and growth potential',
      'Evaluate environmental and legal risks'
    ],
    riskMitigation: [
      'Secure additional guarantees if tenant credit is weak',
      'Monitor market conditions regularly',
      'Maintain adequate insurance coverage',
      'Establish contingency plans for default scenarios'
    ],
    optimizationSuggestions: [
      'Negotiate rent escalation terms',
      'Consider additional security measures',
      'Explore value-add opportunities',
      'Optimize tax structure'
    ],

    // Implementation
    implementationPlan: 'Proceed with comprehensive due diligence and legal review before closing.',
    nextSteps: [
      'Complete financial analysis',
      'Conduct property inspection',
      'Review legal documents',
      'Finalize investment terms'
    ],
    timeline: '30-60 days for due diligence and closing.',

    // Monitoring
    monitoringPlan: 'Establish quarterly monitoring of tenant performance and market conditions.',
    keyMetrics: [
      'Tenant financial performance',
      'Market rent trends',
      'Property condition',
      'Market cap rates'
    ],
    reviewSchedule: 'Annual comprehensive review with quarterly updates.',

    // Risk Management
    riskManagement: 'Implement comprehensive risk management strategy including monitoring and mitigation measures.',
    mitigationStrategies: [
      'Diversify tenant base if possible',
      'Maintain adequate reserves',
      'Regular property inspections',
      'Market condition monitoring'
    ],
    contingencyPlans: [
      'Tenant default procedures',
      'Market downturn response',
      'Property redevelopment options',
      'Exit strategy alternatives'
    ],

    // Performance Benchmarks
    performanceBenchmarks: [
      {
        metric: 'IRR',
        target: 10,
        benchmark: metrics.internalRateOfReturn,
        industry: 'Real Estate'
      },
      {
        metric: 'Cap Rate',
        target: 6.5,
        benchmark: metrics.capitalizationRate,
        industry: 'Commercial Real Estate'
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
      `Strong return potential with ${metrics.internalRateOfReturn.toFixed(2)}% IRR`,
      `Favorable risk profile with score of ${metrics.riskScore}/10`,
      `Market-competitive valuation at $${metrics.presentValue.toLocaleString()}`,
      `Long-term cash flow stability`
    ],
    decisionFactors: [
      'Return on investment',
      'Risk profile',
      'Market conditions',
      'Tenant quality',
      'Lease terms'
    ]
  };
}
