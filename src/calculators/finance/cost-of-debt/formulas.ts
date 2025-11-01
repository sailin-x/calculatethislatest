import { CostOfDebtInputs, CostOfDebtOutputs } from './types';

// Cost of Debt Calculator - Comprehensive debt cost analysis

export function calculateBondYieldToMaturity(
  faceValue: number,
  couponRate: number,
  marketPrice: number,
  yearsToMaturity: number,
  couponFrequency: number = 2,
  tolerance: number = 0.0001,
  maxIterations: number = 100
): number {
  const couponPayment = (faceValue * couponRate / 100) / couponFrequency;
  const periods = yearsToMaturity * couponFrequency;

  // Binary search for YTM
  let low = 0;
  let high = 0.5; // 50% max YTM
  let ytm = (low + high) / 2;

  for (let i = 0; i < maxIterations; i++) {
    let price = 0;
    for (let t = 1; t <= periods; t++) {
      price += couponPayment / Math.pow(1 + ytm / couponFrequency, t);
    }
    price += faceValue / Math.pow(1 + ytm / couponFrequency, periods);

    if (Math.abs(price - marketPrice) < tolerance) {
      return ytm * 100; // Convert to percentage
    }

    if (price > marketPrice) {
      low = ytm;
    } else {
      high = ytm;
    }
    ytm = (low + high) / 2;
  }

  return ytm * 100;
}

export function calculateBondCurrentYield(faceValue: number, couponRate: number, marketPrice: number): number {
  const annualCoupon = faceValue * couponRate / 100;
  return (annualCoupon / marketPrice) * 100;
}

export function calculateAfterTaxCost(preTaxCost: number, taxRate: number): number {
  return preTaxCost * (1 - taxRate / 100);
}

export function calculateBankLoanEffectiveRate(nominalRate: number, fees: number, loanAmount: number): number {
  const feeRate = (fees / loanAmount) * 100;
  return nominalRate + feeRate;
}

export function calculateCreditFacilityCost(
  facilityRate: number,
  commitmentFee: number,
  utilization: number
): number {
  const utilizedRate = facilityRate * (utilization / 100);
  const committedRate = commitmentFee * (1 - utilization / 100);
  return utilizedRate + committedRate;
}

export function calculatePreferredStockCost(dividend: number, price: number): number {
  return (dividend / price) * 100;
}

export function calculateCreditSpread(yieldToMaturity: number, riskFreeRate: number): number {
  return yieldToMaturity - riskFreeRate;
}

export function calculateSyntheticRatingCost(creditRating: string): number {
  const ratingCosts: { [key: string]: number } = {
    'AAA': 2.5,
    'AA': 3.0,
    'A': 3.5,
    'BBB': 4.5,
    'BB': 6.0,
    'B': 8.0,
    'CCC': 12.0,
    'CC': 15.0,
    'C': 20.0,
    'D': 25.0
  };
  return ratingCosts[creditRating.toUpperCase()] || 5.0;
}

export function calculateWeightedAverageCostOfDebt(
  debtComponents: { [key: string]: number },
  componentCosts: { [key: string]: number },
  weightingMethod: 'book_value' | 'market_value' | 'equal_weight',
  totalDebt: number
): number {
  let totalWeightedCost = 0;
  let totalWeight = 0;

  for (const [component, amount] of Object.entries(debtComponents)) {
    let weight: number;

    switch (weightingMethod) {
      case 'equal_weight':
        weight = 1 / Object.keys(debtComponents).length;
        break;
      case 'book_value':
      case 'market_value':
      default:
        weight = amount / totalDebt;
        break;
    }

    totalWeightedCost += componentCosts[component] * weight;
    totalWeight += weight;
  }

  return totalWeight > 0 ? totalWeightedCost / totalWeight : 0;
}

export function calculateTaxShieldValue(interestExpense: number, taxRate: number): number {
  return interestExpense * (taxRate / 100);
}

export function calculateBreakEvenLeverageRatio(
  costOfEquity: number,
  costOfDebt: number,
  taxRate: number
): number {
  const afterTaxCostOfDebt = costOfDebt * (1 - taxRate / 100);
  return (costOfEquity - afterTaxCostOfDebt) / (costOfEquity + afterTaxCostOfDebt);
}

export function calculateInterestCoverageRatio(ebitda: number, interestExpense: number): number {
  return interestExpense > 0 ? ebitda / interestExpense : 0;
}

export function calculateDebtCapacityUtilization(
  currentDebtRatio: number,
  optimalDebtRatio: number
): number {
  return optimalDebtRatio > 0 ? (currentDebtRatio / optimalDebtRatio) * 100 : 0;
}

export function calculateCostOfDebtVolatility(historicalCosts: number[]): number {
  if (historicalCosts.length < 2) return 0;

  const mean = historicalCosts.reduce((a, b) => a + b, 0) / historicalCosts.length;
  const variance = historicalCosts.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / (historicalCosts.length - 1);

  return Math.sqrt(variance);
}

export function calculateRefinancingRisk(
  currentRate: number,
  marketRate: number,
  timeToMaturity: number
): number {
  if (timeToMaturity <= 0) return 0;
  const rateDifferential = currentRate - marketRate;
  return Math.abs(rateDifferential) / timeToMaturity;
}

export function calculateIndustryAverageCostOfDebt(industry: string): number {
  const industryAverages: { [key: string]: number } = {
    'technology': 4.2,
    'healthcare': 4.8,
    'financials': 3.9,
    'consumer_discretionary': 5.1,
    'consumer_staples': 4.5,
    'energy': 6.2,
    'industrials': 4.9,
    'materials': 5.3,
    'utilities': 4.1,
    'real_estate': 5.5
  };
  return industryAverages[industry.toLowerCase()] || 5.0;
}

export function calculateCostOfDebtSensitivity(
  baseCost: number,
  interestRateChange: number,
  taxRateChange: number,
  creditRatingChange: string
): {
  interestRateSensitivity: number;
  taxRateSensitivity: number;
  creditRatingSensitivity: number;
} {
  const interestRateSensitivity = baseCost * (interestRateChange / 100);
  const taxRateSensitivity = baseCost * (taxRateChange / 100);
  const creditRatingSensitivity = calculateSyntheticRatingCost(creditRatingChange) - baseCost;

  return {
    interestRateSensitivity,
    taxRateSensitivity,
    creditRatingSensitivity
  };
}

export function calculateCostOfDebtMetrics(inputs: CostOfDebtInputs): CostOfDebtOutputs {
  // Bond-based calculations
  const bondYieldToMaturity = calculateBondYieldToMaturity(
    inputs.bondFaceValue,
    inputs.bondCouponRate,
    inputs.bondMarketPrice,
    inputs.bondYearsToMaturity,
    inputs.bondCouponFrequency
  );

  const bondCurrentYield = calculateBondCurrentYield(
    inputs.bondFaceValue,
    inputs.bondCouponRate,
    inputs.bondMarketPrice
  );

  const bondAfterTaxCost = calculateAfterTaxCost(bondYieldToMaturity, inputs.taxRate);

  // Bank loan calculations
  const bankLoanEffectiveRate = calculateBankLoanEffectiveRate(
    inputs.bankLoanInterestRate,
    inputs.bankLoanFees,
    inputs.bankLoanAmount
  );

  const bankLoanAfterTaxCost = calculateAfterTaxCost(bankLoanEffectiveRate, inputs.taxRate);

  // Credit facility calculations
  const creditFacilityEffectiveCost = calculateCreditFacilityCost(
    inputs.creditFacilityRate,
    inputs.creditFacilityCommitmentFee,
    inputs.creditFacilityUtilization
  );

  const creditFacilityTotalCost = calculateAfterTaxCost(creditFacilityEffectiveCost, inputs.taxRate);

  // Preferred stock calculations
  const preferredStockCost = calculatePreferredStockCost(
    inputs.preferredStockDividend,
    inputs.preferredStockPrice
  );

  const preferredStockAfterTaxCost = calculateAfterTaxCost(preferredStockCost, inputs.taxRate);

  // Overall calculations
  const debtComponents = {
    bonds: inputs.bondFaceValue,
    bankLoans: inputs.bankLoanAmount,
    creditFacilities: inputs.creditFacilityLimit * (inputs.creditFacilityUtilization / 100),
    preferredStock: inputs.preferredStockParValue,
    other: Math.max(0, inputs.totalDebt - inputs.bondFaceValue - inputs.bankLoanAmount -
                   inputs.creditFacilityLimit * (inputs.creditFacilityUtilization / 100) - inputs.preferredStockParValue)
  };

  const componentCosts = {
    bonds: bondYieldToMaturity,
    bankLoans: bankLoanEffectiveRate,
    creditFacilities: creditFacilityEffectiveCost,
    preferredStock: preferredStockCost,
    other: 5.0 // Default cost for other debt
  };

  const weightedAverageCostOfDebt = calculateWeightedAverageCostOfDebt(
    debtComponents,
    componentCosts,
    inputs.weightingMethod,
    inputs.totalDebt
  );

  const afterTaxWeightedAverageCostOfDebt = calculateAfterTaxCost(weightedAverageCostOfDebt, inputs.taxRate);

  // Risk calculations
  const creditSpread = calculateCreditSpread(bondYieldToMaturity, inputs.riskFreeRate);
  const syntheticRatingCost = calculateSyntheticRatingCost(inputs.creditRating);

  // Tax shield calculations
  const taxShieldValue = calculateTaxShieldValue(inputs.interestExpense, inputs.taxRate);
  const taxShieldPercentage = inputs.interestExpense > 0 ? (taxShieldValue / inputs.interestExpense) * 100 : 0;

  // Industry analysis
  const industryAverageCostOfDebt = calculateIndustryAverageCostOfDebt(inputs.industry);

  // Break-even analysis
  const breakEvenLeverageRatio = calculateBreakEvenLeverageRatio(8.0, weightedAverageCostOfDebt, inputs.taxRate); // Assume 8% cost of equity
  const breakEvenInterestCoverage = calculateInterestCoverageRatio(inputs.ebitda, inputs.interestExpense);

  // Debt capacity
  const optimalDebtRatio = 0.4; // Industry standard
  const debtCapacityUtilization = calculateDebtCapacityUtilization(
    inputs.debtToEquityRatio / (1 + inputs.debtToEquityRatio),
    optimalDebtRatio
  );

  // Sensitivity analysis
  const sensitivity = calculateCostOfDebtSensitivity(
    weightedAverageCostOfDebt,
    1.0, // 1% interest rate change
    5.0, // 5% tax rate change
    'BBB' // One notch downgrade
  );

  // Scenario analysis
  const baseCaseCostOfDebt = weightedAverageCostOfDebt;
  const optimisticCaseCostOfDebt = weightedAverageCostOfDebt * 0.9;
  const pessimisticCaseCostOfDebt = weightedAverageCostOfDebt * 1.2;

  // Projections (simplified)
  const projectedCostOfDebt1yr = weightedAverageCostOfDebt * 1.02;
  const projectedCostOfDebt3yr = weightedAverageCostOfDebt * 1.08;
  const projectedCostOfDebt5yr = weightedAverageCostOfDebt * 1.15;

  // Risk metrics
  const costOfDebtVolatility = calculateCostOfDebtVolatility([weightedAverageCostOfDebt * 0.95, weightedAverageCostOfDebt, weightedAverageCostOfDebt * 1.05]);
  const refinancingRisk = calculateRefinancingRisk(weightedAverageCostOfDebt, inputs.riskFreeRate + 2.0, 3.0);

  return {
    bondYieldToMaturity,
    bondCurrentYield,
    bondAfterTaxCost,
    bankLoanAfterTaxCost,
    bankLoanEffectiveRate,
    creditFacilityEffectiveCost,
    creditFacilityTotalCost,
    preferredStockCost,
    preferredStockAfterTaxCost,
    weightedAverageCostOfDebt,
    marginalCostOfDebt: bondYieldToMaturity,
    afterTaxWeightedAverageCostOfDebt,
    creditSpread,
    defaultRiskPremium: creditSpread * 0.7,
    liquidityRiskPremium: creditSpread * 0.3,
    syntheticRating: inputs.creditRating,
    syntheticRatingCost,
    industryAverageCostOfDebt,
    industryPercentile: 50, // Simplified
    breakEvenLeverageRatio,
    breakEvenInterestCoverage,
    taxShieldValue,
    taxShieldPercentage,
    optimalDebtRatio,
    debtCapacityUtilization,
    baseCaseCostOfDebt,
    optimisticCaseCostOfDebt,
    pessimisticCaseCostOfDebt,
    debtComponents,
    interestRateSensitivity: sensitivity.interestRateSensitivity,
    taxRateSensitivity: sensitivity.taxRateSensitivity,
    creditRatingSensitivity: sensitivity.creditRatingSensitivity,
    debtToEquityCompliance: inputs.debtToEquityRatio <= 2.0,
    interestCoverageCompliance: breakEvenInterestCoverage >= 2.5,
    regulatoryConstraints: [],
    projectedCostOfDebt1yr,
    projectedCostOfDebt3yr,
    projectedCostOfDebt5yr,
    costOfDebtVolatility,
    refinancingRisk,
    interestRateRisk: Math.abs(weightedAverageCostOfDebt - inputs.riskFreeRate),
    waccImpact: afterTaxWeightedAverageCostOfDebt * 0.3, // Assume 30% debt weighting
    valuationImpact: 0, // Would need more complex calculation
    epsImpact: 0, // Would need more complex calculation
    peerGroupAverage: industryAverageCostOfDebt,
    peerGroupMedian: industryAverageCostOfDebt,
    peerGroupRange: { min: industryAverageCostOfDebt * 0.8, max: industryAverageCostOfDebt * 1.3 },
    currentMarketConditions: 'Moderate',
    costOfDebtTrend: 'stable',
    rateEnvironment: 'moderate',
    greenBondPremium: -0.2,
    esgAdjustedCostOfDebt: weightedAverageCostOfDebt - 0.1,
    sustainabilityLinkedDebt: false
  };
}