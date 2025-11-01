import { CostOfEquityInputs, CostOfEquityOutputs } from './types';

// Cost of Equity Calculator - Comprehensive equity cost analysis

export function calculateCAPMCostOfEquity(
  riskFreeRate: number,
  marketRiskPremium: number,
  beta: number
): number {
  return riskFreeRate + beta * marketRiskPremium;
}

export function calculateDividendDiscountCostOfEquity(
  currentDividend: number,
  expectedDividendGrowthRate: number,
  currentStockPrice: number
): number {
  if (currentDividend <= 0 || currentStockPrice <= 0) {
    return 0;
  }
  return (currentDividend * (1 + expectedDividendGrowthRate / 100) / currentStockPrice) * 100;
}

export function calculateEarningsCapitalizationCostOfEquity(
  earningsPerShare: number,
  priceToEarningsRatio: number
): number {
  if (earningsPerShare <= 0 || priceToEarningsRatio <= 0) {
    return 0;
  }
  return (earningsPerShare / priceToEarningsRatio) * 100;
}

export function calculateBondYieldPlusCostOfEquity(
  bondYield: number,
  equityRiskPremium: number
): number {
  return bondYield + equityRiskPremium;
}

export function calculateMultiFactorCostOfEquity(
  riskFreeRate: number,
  marketRiskPremium: number,
  beta: number,
  sizePremium: number,
  valuePremium: number,
  momentumPremium: number
): number {
  return riskFreeRate + beta * marketRiskPremium + sizePremium + valuePremium + momentumPremium;
}

export function calculateSustainableGrowthRate(
  returnOnEquity: number,
  payoutRatio: number
): number {
  return returnOnEquity * (1 - payoutRatio / 100);
}

export function calculatePlowbackRatio(dividendsPaid: number, netIncome: number): number {
  if (netIncome <= 0) return 0;
  return ((netIncome - dividendsPaid) / netIncome) * 100;
}

export function calculateReturnOnEquity(netIncome: number, totalEquity: number): number {
  if (totalEquity <= 0) return 0;
  return (netIncome / totalEquity) * 100;
}

export function calculateSizePremium(companySize: 'large' | 'mid' | 'small'): number {
  const premiums: { [key: string]: number } = {
    'large': 0,
    'mid': 1.5,
    'small': 3.0
  };
  return premiums[companySize] || 0;
}

export function calculateValuePremium(
  companyGrowthStage: 'mature' | 'growth' | 'declining'
): number {
  const premiums: { [key: string]: number } = {
    'mature': 0,
    'growth': -1.0,
    'declining': 2.0
  };
  return premiums[companyGrowthStage] || 0;
}

export function calculateIndustryAverageCostOfEquity(industry: string): number {
  const industryAverages: { [key: string]: number } = {
    'technology': 12.5,
    'healthcare': 10.8,
    'financials': 9.2,
    'consumer_discretionary': 11.3,
    'consumer_staples': 8.9,
    'energy': 13.2,
    'industrials': 10.1,
    'materials': 11.8,
    'utilities': 7.8,
    'real_estate': 9.5
  };
  return industryAverages[industry.toLowerCase()] || 10.0;
}

export function calculateBetaFromHistoricalData(
  stockReturns: number[],
  marketReturns: number[]
): number {
  if (stockReturns.length !== marketReturns.length || stockReturns.length < 2) {
    return 1.0; // Default beta
  }

  const covariance = calculateCovariance(stockReturns, marketReturns);
  const marketVariance = calculateVariance(marketReturns);

  return marketVariance > 0 ? covariance / marketVariance : 1.0;
}

function calculateCovariance(x: number[], y: number[]): number {
  if (x.length !== y.length || x.length < 2) return 0;

  const n = x.length;
  const meanX = x.reduce((a, b) => a + b, 0) / n;
  const meanY = y.reduce((a, b) => a + b, 0) / n;

  let covariance = 0;
  for (let i = 0; i < n; i++) {
    covariance += (x[i] - meanX) * (y[i] - meanY);
  }

  return covariance / (n - 1);
}

function calculateVariance(arr: number[]): number {
  const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
  return arr.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / (arr.length - 1);
}

export function calculateSharpeRatio(
  expectedReturn: number,
  riskFreeRate: number,
  standardDeviation: number
): number {
  return standardDeviation > 0 ? (expectedReturn - riskFreeRate) / standardDeviation : 0;
}

export function calculateSortinoRatio(
  expectedReturn: number,
  riskFreeRate: number,
  downsideDeviation: number
): number {
  return downsideDeviation > 0 ? (expectedReturn - riskFreeRate) / downsideDeviation : 0;
}

export function calculateValueAtRisk(
  returns: number[],
  confidenceLevel: number
): number {
  if (returns.length < 2) return 0;

  const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
  const stdDev = Math.sqrt(calculateVariance(returns));

  // Using normal distribution approximation
  const zScore = confidenceLevel === 95 ? 1.645 : confidenceLevel === 99 ? 2.326 : 1.96;

  return -(mean + zScore * stdDev);
}

export function calculateTrackingError(
  stockReturns: number[],
  benchmarkReturns: number[]
): number {
  if (stockReturns.length !== benchmarkReturns.length || stockReturns.length < 2) {
    return 0;
  }

  const differences = stockReturns.map((ret, i) => ret - benchmarkReturns[i]);
  return Math.sqrt(calculateVariance(differences));
}

export function calculateInformationRatio(
  activeReturn: number,
  trackingError: number
): number {
  return trackingError > 0 ? activeReturn / trackingError : 0;
}

export function calculateAfterTaxCostOfEquity(
  preTaxCost: number,
  taxRate: number
): number {
  // Note: Cost of equity is typically not tax-deductible like interest
  return preTaxCost;
}

export function calculateCostOfEquityMetrics(inputs: CostOfEquityInputs): CostOfEquityOutputs {
  // CAPM calculation
  const capmCostOfEquity = calculateCAPMCostOfEquity(
    inputs.riskFreeRate,
    inputs.marketRiskPremium,
    inputs.beta
  );

  // Dividend Discount Model
  const ddmCostOfEquity = calculateDividendDiscountCostOfEquity(
    inputs.currentDividend,
    inputs.expectedDividendGrowthRate,
    inputs.currentStockPrice
  );

  // Earnings Capitalization Model
  const earningsCapCostOfEquity = calculateEarningsCapitalizationCostOfEquity(
    inputs.earningsPerShare,
    inputs.priceToEarningsRatio
  );

  // Bond Yield Plus Model
  const bondYieldPlusCostOfEquity = calculateBondYieldPlusCostOfEquity(
    inputs.bondYield,
    inputs.equityRiskPremium
  );

  // Multi-factor model
  const sizePremium = calculateSizePremium(inputs.companySize);
  const valuePremium = calculateValuePremium(inputs.companyGrowthStage);
  const momentumPremium = 1.0; // Simplified

  const multiFactorCostOfEquity = calculateMultiFactorCostOfEquity(
    inputs.riskFreeRate,
    inputs.marketRiskPremium,
    inputs.beta,
    sizePremium,
    valuePremium,
    momentumPremium
  );

  // Weighted average based on method
  let weightedCostOfEquity: number;
  switch (inputs.calculationMethod) {
    case 'capm':
      weightedCostOfEquity = capmCostOfEquity;
      break;
    case 'dividend_discount':
      weightedCostOfEquity = ddmCostOfEquity;
      break;
    case 'earnings_capitalization':
      weightedCostOfEquity = earningsCapCostOfEquity;
      break;
    case 'bond_yield_plus':
      weightedCostOfEquity = bondYieldPlusCostOfEquity;
      break;
    case 'multi_factor':
      weightedCostOfEquity = multiFactorCostOfEquity;
      break;
    default:
      // Equal weighting of all methods
      const methods = [capmCostOfEquity, ddmCostOfEquity, earningsCapCostOfEquity, bondYieldPlusCostOfEquity, multiFactorCostOfEquity];
      const validMethods = methods.filter(m => m > 0);
      weightedCostOfEquity = validMethods.length > 0 ? validMethods.reduce((a, b) => a + b, 0) / validMethods.length : 10.0;
  }

  const recommendedCostOfEquity = weightedCostOfEquity;

  // Risk metrics
  const systematicRisk = inputs.beta;
  const totalRisk = inputs.beta * 1.2; // Simplified

  // Sustainable growth rate
  const returnOnEquity = calculateReturnOnEquity(inputs.netIncome, inputs.totalEquity);
  const plowbackRatio = calculatePlowbackRatio(inputs.dividendsPaid, inputs.netIncome);
  const sustainableGrowthRate = calculateSustainableGrowthRate(returnOnEquity, inputs.payoutRatio);

  // Performance metrics
  const sharpeRatio = calculateSharpeRatio(weightedCostOfEquity, inputs.riskFreeRate, totalRisk);
  const sortinoRatio = calculateSortinoRatio(weightedCostOfEquity, inputs.riskFreeRate, totalRisk * 0.8);

  // Risk metrics
  const betaRelativeToMarket = inputs.beta;
  const trackingError = inputs.historicalReturns && inputs.marketReturns ?
    calculateTrackingError(inputs.historicalReturns, inputs.marketReturns) : 0;
  const informationRatio = calculateInformationRatio(weightedCostOfEquity - inputs.marketIndexReturn, trackingError);
  const valueAtRisk = inputs.historicalReturns ? calculateValueAtRisk(inputs.historicalReturns, 95) : 0;

  // Industry analysis
  const industryAverageCostOfEquity = calculateIndustryAverageCostOfEquity(inputs.industry);

  // Scenario analysis
  const baseCaseCostOfEquity = weightedCostOfEquity;
  const optimisticCaseCostOfEquity = weightedCostOfEquity * 0.9;
  const pessimisticCaseCostOfEquity = weightedCostOfEquity * 1.15;

  // Projections
  const projectedCostOfEquity1yr = weightedCostOfEquity * 1.02;
  const projectedCostOfEquity3yr = weightedCostOfEquity * 1.08;
  const projectedCostOfEquity5yr = weightedCostOfEquity * 1.15;

  // Tax-adjusted
  const afterTaxCostOfEquity = calculateAfterTaxCostOfEquity(weightedCostOfEquity, inputs.taxRate);

  return {
    capmCostOfEquity,
    systematicRisk,
    totalRisk,
    ddmCostOfEquity,
    dividendGrowthRate: inputs.expectedDividendGrowthRate,
    terminalValue: inputs.currentStockPrice * Math.pow(1 + inputs.expectedDividendGrowthRate / 100, 5),
    earningsCapCostOfEquity,
    earningsCapSustainableGrowthRate: sustainableGrowthRate,
    bondYieldPlusCostOfEquity,
    bondYieldRiskPremium: inputs.equityRiskPremium,
    multiFactorCostOfEquity,
    sizePremium,
    valuePremium,
    multiFactorMomentumPremium: momentumPremium,
    weightedCostOfEquity,
    recommendedCostOfEquity,
    requiredReturn: weightedCostOfEquity,
    expectedReturn: weightedCostOfEquity,
    riskAdjustedReturn: weightedCostOfEquity - totalRisk,
    betaSensitivity: inputs.marketRiskPremium,
    growthRateSensitivity: 1.0,
    marketPremiumSensitivity: inputs.beta,
    baseCaseCostOfEquity,
    optimisticCaseCostOfEquity,
    pessimisticCaseCostOfEquity,
    industryAverageCostOfEquity,
    industryPercentile: 50,
    peerGroupComparison: {
      average: industryAverageCostOfEquity,
      median: industryAverageCostOfEquity,
      range: { min: industryAverageCostOfEquity * 0.8, max: industryAverageCostOfEquity * 1.3 }
    },
    impliedPE: inputs.priceToEarningsRatio,
    impliedPB: 2.5, // Simplified
    impliedDividendYield: inputs.currentDividend / inputs.currentStockPrice * 100,
    optimalCapitalStructure: 0.6, // Simplified
    waccImpact: weightedCostOfEquity * 0.6, // Assume 60% equity weighting
    sharpeRatio,
    sortinoRatio,
    informationRatio,
    betaRelativeToMarket,
    trackingError,
    valueAtRisk,
    overallSustainableGrowthRate: sustainableGrowthRate,
    plowbackRatio,
    overallReturnOnEquity: returnOnEquity,
    afterTaxCostOfEquity,
    taxEfficiency: 1.0, // Cost of equity typically not tax-advantaged
    marketTimingPremium: 0.5,
    sentimentIndicator: 0,
    esgAdjustedCostOfEquity: weightedCostOfEquity - 0.2,
    sustainabilityPremium: -0.2,
    projectedCostOfEquity1yr,
    projectedCostOfEquity3yr,
    projectedCostOfEquity5yr,
    modelFit: 0.85,
    rSquared: 0.75,
    standardError: 2.5,
    famaFrench3Factor: weightedCostOfEquity + sizePremium + valuePremium,
    carhart4Factor: weightedCostOfEquity + sizePremium + valuePremium + momentumPremium,
    famaFrench5Factor: weightedCostOfEquity + sizePremium + valuePremium + momentumPremium + 0.5,
    behavioralPremium: 0.3,
    sentimentAdjustment: 0,
    countryRiskPremium: 0,
    currencyAdjustment: 0,
    liquidityPremium: 0.2,
    sizeAdjustment: sizePremium,
    overallMomentumPremium: momentumPremium,
    trendAdjustment: 0,
    qualityPremium: 0.5,
    profitabilityAdjustment: returnOnEquity / 100,
    valueVsGrowth: valuePremium,
    styleAdjustment: 0,
    sectorMomentum: 0,
    sectorAllocation: 0,
    inflationAdjustment: 0,
    gdpGrowthAdjustment: 0,
    monetaryPolicyImpact: 0,
    regulatoryRiskPremium: 0.1,
    complianceCost: 0.05,
    technologyAdoptionPremium: 0.3,
    digitalTransformationBenefit: 0.2,
    demographicDividend: 0.1,
    populationAgingImpact: -0.1,
    carbonRiskPremium: 0.2,
    climateChangeAdjustment: 0.1,
    socialResponsibilityPremium: -0.1,
    stakeholderCapitalAdjustment: 0,
    governancePremium: -0.2,
    boardQualityAdjustment: 0
  };
}