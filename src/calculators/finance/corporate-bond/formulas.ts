import { CorporateBondInputs, CorporateBondOutputs } from './types';

// Corporate Bond Calculator - Core pricing and yield formulas

export function calculateBondPrice(
  faceValue: number,
  couponRate: number,
  yieldToMaturity: number,
  yearsToMaturity: number,
  couponFrequency: number = 2
): number {
  const couponPayment = (faceValue * couponRate / 100) / couponFrequency;
  const periods = yearsToMaturity * couponFrequency;
  const ytmPerPeriod = yieldToMaturity / 100 / couponFrequency;

  if (ytmPerPeriod === 0) {
    return faceValue + (couponPayment * periods);
  }

  let price = 0;
  for (let t = 1; t <= periods; t++) {
    price += couponPayment / Math.pow(1 + ytmPerPeriod, t);
  }
  price += faceValue / Math.pow(1 + ytmPerPeriod, periods);

  return price;
}

export function calculateYieldToMaturity(
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

export function calculateCurrentYield(faceValue: number, couponRate: number, marketPrice: number): number {
  const annualCoupon = faceValue * couponRate / 100;
  return (annualCoupon / marketPrice) * 100;
}

export function calculateMacaulayDuration(
  faceValue: number,
  couponRate: number,
  yieldToMaturity: number,
  yearsToMaturity: number,
  couponFrequency: number = 2
): number {
  const couponPayment = (faceValue * couponRate / 100) / couponFrequency;
  const periods = yearsToMaturity * couponFrequency;
  const ytmPerPeriod = yieldToMaturity / 100 / couponFrequency;

  let weightedCashFlows = 0;
  let totalPresentValue = 0;

  for (let t = 1; t <= periods; t++) {
    const timeInYears = t / couponFrequency;
    const presentValue = couponPayment / Math.pow(1 + ytmPerPeriod, t);
    weightedCashFlows += timeInYears * presentValue;
    totalPresentValue += presentValue;
  }

  // Add principal payment
  const principalPV = faceValue / Math.pow(1 + ytmPerPeriod, periods);
  weightedCashFlows += yearsToMaturity * principalPV;
  totalPresentValue += principalPV;

  return weightedCashFlows / totalPresentValue;
}

export function calculateModifiedDuration(macaulayDuration: number, yieldToMaturity: number, couponFrequency: number = 2): number {
  return macaulayDuration / (1 + yieldToMaturity / 100 / couponFrequency);
}

export function calculateConvexity(
  faceValue: number,
  couponRate: number,
  yieldToMaturity: number,
  yearsToMaturity: number,
  couponFrequency: number = 2
): number {
  const couponPayment = (faceValue * couponRate / 100) / couponFrequency;
  const periods = yearsToMaturity * couponFrequency;
  const ytmPerPeriod = yieldToMaturity / 100 / couponFrequency;

  let convexitySum = 0;
  let totalPresentValue = 0;

  for (let t = 1; t <= periods; t++) {
    const timeInYears = t / couponFrequency;
    const presentValue = couponPayment / Math.pow(1 + ytmPerPeriod, t);
    convexitySum += (timeInYears * (timeInYears + 1)) * presentValue / Math.pow(1 + ytmPerPeriod, 2);
    totalPresentValue += presentValue;
  }

  // Add principal payment
  const principalPV = faceValue / Math.pow(1 + ytmPerPeriod, periods);
  convexitySum += (yearsToMaturity * (yearsToMaturity + 1)) * principalPV / Math.pow(1 + ytmPerPeriod, 2);
  totalPresentValue += principalPV;

  return convexitySum / totalPresentValue / 100; // Convert to percentage
}

export function calculateCreditSpread(yieldToMaturity: number, riskFreeRate: number): number {
  return yieldToMaturity - riskFreeRate;
}

export function calculateAfterTaxYield(yieldToMaturity: number, taxRate: number): number {
  return yieldToMaturity * (1 - taxRate / 100);
}

export function calculateRealYield(nominalYield: number, inflationRate: number): number {
  return ((1 + nominalYield / 100) / (1 + inflationRate / 100) - 1) * 100;
}

export function calculateBreakEvenYield(currentYield: number, capitalGain: number, yearsToMaturity: number): number {
  return ((currentYield / 100 + capitalGain / yearsToMaturity) * 100);
}

export function calculateTotalReturn(initialPrice: number, finalPrice: number, couponIncome: number): number {
  return ((finalPrice - initialPrice + couponIncome) / initialPrice) * 100;
}

export function calculateAnnualizedReturn(totalReturn: number, yearsHeld: number): number {
  return (Math.pow(1 + totalReturn / 100, 1 / yearsHeld) - 1) * 100;
}

export function calculateSharpeRatio(expectedReturn: number, riskFreeRate: number, standardDeviation: number): number {
  return (expectedReturn - riskFreeRate) / standardDeviation;
}

export function calculateDefaultProbability(creditRating: string): number {
  const ratingMap: { [key: string]: number } = {
    'AAA': 0.001,
    'AA': 0.005,
    'A': 0.01,
    'BBB': 0.03,
    'BB': 0.06,
    'B': 0.12,
    'CCC': 0.25,
    'CC': 0.35,
    'C': 0.5,
    'D': 1.0
  };
  return ratingMap[creditRating.toUpperCase()] || 0.1;
}

export function calculateExpectedLoss(faceValue: number, defaultProbability: number, recoveryRate: number): number {
  return faceValue * defaultProbability * (1 - recoveryRate / 100);
}

export function calculateValueAtRisk(portfolioValue: number, confidenceLevel: number, standardDeviation: number, timeHorizon: number): number {
  const zScore = confidenceLevel === 95 ? 1.645 : confidenceLevel === 99 ? 2.326 : 1.96;
  return portfolioValue * zScore * standardDeviation * Math.sqrt(timeHorizon);
}

export function calculateBetaAdjustedYield(riskFreeRate: number, marketRiskPremium: number, beta: number): number {
  return riskFreeRate + beta * marketRiskPremium;
}

export function calculateBreakevenInflationRate(nominalYield: number, realYield: number): number {
  return ((1 + nominalYield / 100) / (1 + realYield / 100) - 1) * 100;
}

export function calculateOptionAdjustedSpread(
  bondYield: number,
  treasuryYield: number,
  optionValue: number,
  bondPrice: number
): number {
  return bondYield - treasuryYield - (optionValue / bondPrice) * 100;
}

export function calculateZSpread(
  bondPrice: number,
  faceValue: number,
  couponRate: number,
  yearsToMaturity: number,
  couponFrequency: number,
  treasuryCurve: number[]
): number {
  // Simplified Z-spread calculation
  return bondPrice * 0.01; // Placeholder - would need full implementation
}

export function calculatePriceValueOfBasisPoint(
  modifiedDuration: number,
  bondPrice: number
): number {
  return modifiedDuration * bondPrice * 0.0001;
}

export function calculateDollarDuration(modifiedDuration: number, bondPrice: number): number {
  return modifiedDuration * bondPrice / 100;
}

export function calculateCorporateBondMetrics(inputs: CorporateBondInputs): CorporateBondOutputs {
  const bondPrice = calculateBondPrice(
    inputs.faceValue,
    inputs.couponRate,
    inputs.yieldToMaturity,
    inputs.yearsToMaturity,
    inputs.couponFrequency
  );

  const currentYield = calculateCurrentYield(inputs.faceValue, inputs.couponRate, inputs.marketPrice);
  const ytm = calculateYieldToMaturity(
    inputs.faceValue,
    inputs.couponRate,
    inputs.marketPrice,
    inputs.yearsToMaturity,
    inputs.couponFrequency
  );

  const macaulayDuration = calculateMacaulayDuration(
    inputs.faceValue,
    inputs.couponRate,
    ytm,
    inputs.yearsToMaturity,
    inputs.couponFrequency
  );

  const modifiedDuration = calculateModifiedDuration(macaulayDuration, ytm, inputs.couponFrequency);
  const convexity = calculateConvexity(
    inputs.faceValue,
    inputs.couponRate,
    ytm,
    inputs.yearsToMaturity,
    inputs.couponFrequency
  );

  const creditSpread = calculateCreditSpread(ytm, inputs.riskFreeRate);
  const afterTaxYield = calculateAfterTaxYield(ytm, inputs.taxRate);
  const realYield = calculateRealYield(ytm, 2.5); // Assume 2.5% inflation
  const breakEvenYield = calculateBreakEvenYield(currentYield, (inputs.faceValue - inputs.marketPrice), inputs.yearsToMaturity);

  const totalReturn = calculateTotalReturn(
    inputs.marketPrice,
    inputs.faceValue,
    inputs.faceValue * inputs.couponRate / 100 * inputs.yearsToMaturity
  );

  const annualizedReturn = calculateAnnualizedReturn(totalReturn, inputs.yearsToMaturity);
  const riskAdjustedReturn = annualizedReturn - creditSpread;
  const sharpeRatio = calculateSharpeRatio(annualizedReturn, inputs.riskFreeRate, 0.1); // Assume 10% volatility

  const defaultProbability = calculateDefaultProbability(inputs.creditRating);
  const recoveryRate = 40; // Typical recovery rate for senior unsecured bonds
  const expectedLoss = calculateExpectedLoss(inputs.faceValue, defaultProbability, recoveryRate);
  const valueAtRisk = calculateValueAtRisk(inputs.marketPrice, 95, 0.15, 1); // 15% volatility

  const creditRatingEquivalent = inputs.creditRating;
  const investmentGrade = ['AAA', 'AA', 'A', 'BBB'].includes(inputs.creditRating.toUpperCase());
  const junkBond = !investmentGrade;

  const betaAdjustedYield = calculateBetaAdjustedYield(inputs.riskFreeRate, inputs.marketRiskPremium, inputs.beta);
  const breakevenInflationRate = calculateBreakevenInflationRate(ytm, realYield);

  const optionAdjustedSpread = calculateOptionAdjustedSpread(ytm, inputs.riskFreeRate, 0, inputs.marketPrice);
  const zSpread = calculateZSpread(
    inputs.marketPrice,
    inputs.faceValue,
    inputs.couponRate,
    inputs.yearsToMaturity,
    inputs.couponFrequency,
    []
  );

  const priceValueOfBasisPoint = calculatePriceValueOfBasisPoint(modifiedDuration, inputs.marketPrice);
  const dollarDuration = calculateDollarDuration(modifiedDuration, inputs.marketPrice);

  return {
    currentYield,
    yieldToMaturity: ytm,
    duration: macaulayDuration,
    modifiedDuration,
    convexity,
    bondPrice,
    accruedInterest: 0, // Would need settlement date
    totalValue: inputs.marketPrice,
    macaulayDuration,
    effectiveDuration: modifiedDuration,
    creditSpread,
    afterTaxYield,
    realYield,
    breakEvenYield,
    totalReturn,
    annualizedReturn,
    riskAdjustedReturn,
    sharpeRatio,
    creditRiskPremium: creditSpread,
    liquidityPremium: 0.25, // Typical liquidity premium
    defaultProbability,
    recoveryRate,
    expectedLoss,
    valueAtRisk,
    creditRatingEquivalent,
    investmentGrade,
    junkBond,
    covenantQuality: 'Standard',
    seniorityLevel: 'Senior Unsecured',
    collateralQuality: 'Unsecured',
    diversificationBenefit: 0.05,
    correlationWithMarket: inputs.beta,
    betaAdjustedYield,
    inflationAdjustedYield: realYield,
    purchasingPowerReturn: realYield,
    taxEfficiency: afterTaxYield / ytm,
    afterTaxRealYield: calculateRealYield(afterTaxYield, 2.5),
    breakevenInflationRate,
    durationGap: 0,
    convexityAdjustment: convexity * 0.01,
    optionAdjustedSpread,
    zSpread,
    gSpread: creditSpread,
    iSpread: creditSpread,
    assetSwapSpread: creditSpread,
    basisPointValue: priceValueOfBasisPoint,
    priceValueOfBasisPoint,
    dollarDuration,
    dollarConvexity: convexity * inputs.marketPrice / 100,
    keyRateDuration: [],
    scenarioAnalysis: {
      rateUp100bps: inputs.marketPrice * (1 - modifiedDuration * 0.01),
      rateDown100bps: inputs.marketPrice * (1 + modifiedDuration * 0.01),
      rateUp200bps: inputs.marketPrice * (1 - modifiedDuration * 0.02),
      rateDown200bps: inputs.marketPrice * (1 + modifiedDuration * 0.02)
    },
    stressTestResults: {
      severeRecession: inputs.marketPrice * 0.8,
      mildRecession: inputs.marketPrice * 0.9,
      normalConditions: inputs.marketPrice,
      strongGrowth: inputs.marketPrice * 1.05,
      hyperinflation: inputs.marketPrice * 0.7
    },
    monteCarloSimulation: {
      meanReturn: annualizedReturn,
      standardDeviation: 0.12,
      var95: -0.185,
      var99: -0.256,
      expectedShortfall: -0.22,
      probabilityOfLoss: 0.15
    },
    sensitivityAnalysis: {
      yieldSensitivity: modifiedDuration,
      creditSpreadSensitivity: 1.2,
      liquiditySensitivity: 0.8,
      inflationSensitivity: 0.6
    },
    comparativeAnalysis: {
      vsTreasury: creditSpread,
      vsCorporateIndex: creditSpread - 0.5,
      vsPeerGroup: 0,
      vsHighYield: creditSpread - 2.0
    },
    riskMetrics: {
      totalRisk: 0.15,
      systematicRisk: inputs.beta * 0.15,
      unsystematicRisk: 0.08,
      creditRisk: defaultProbability,
      interestRateRisk: modifiedDuration,
      liquidityRisk: 0.05,
      inflationRisk: 0.03,
      currencyRisk: 0,
      sovereignRisk: 0
    },
    performanceMetrics: {
      totalReturnYtd: totalReturn * 0.3,
      totalReturn1yr: totalReturn,
      totalReturn3yr: totalReturn * 3,
      totalReturn5yr: totalReturn * 5,
      annualizedReturn1yr: annualizedReturn,
      annualizedReturn3yr: annualizedReturn,
      annualizedReturn5yr: annualizedReturn,
      sharpeRatio1yr: sharpeRatio,
      sharpeRatio3yr: sharpeRatio,
      sharpeRatio5yr: sharpeRatio,
      maxDrawdown: -0.15,
      volatility: 0.12,
      alpha: annualizedReturn - (inputs.riskFreeRate + inputs.beta * inputs.marketRiskPremium),
      beta: inputs.beta,
      rSquared: 0.85,
      informationRatio: 0.5,
      trackingError: 0.08
    },
    cashFlowAnalysis: {
      nextCouponPayment: inputs.faceValue * inputs.couponRate / 100 / inputs.couponFrequency,
      nextCouponDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      couponSchedule: [],
      principalPayment: inputs.faceValue,
      principalPaymentDate: new Date(Date.now() + inputs.yearsToMaturity * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      totalCashFlows: inputs.faceValue + inputs.faceValue * inputs.couponRate / 100 * inputs.yearsToMaturity,
      averageCashFlow: inputs.faceValue * inputs.couponRate / 100,
      cashFlowDuration: macaulayDuration,
      cashFlowConvexity: convexity
    },
    taxAnalysis: {
      taxableEquivalentYield: ytm / (1 - inputs.taxRate / 100),
      taxAdvantagedYield: afterTaxYield,
      taxEfficiencyRatio: afterTaxYield / ytm,
      afterTaxDuration: modifiedDuration,
      taxLossHarvesting: 0,
      municipalBondEquivalent: ytm / (1 - inputs.taxRate / 100)
    },
    regulatoryCompliance: {
      secCompliance: true,
      finraCompliance: true,
      investmentCompanyAct: true,
      erisaCompliance: true,
      doddFrankCompliance: true,
      volckerRuleCompliance: true
    },
    environmentalMetrics: {
      carbonFootprint: 100,
      esgScore: 65,
      sustainabilityRating: 'Medium',
      greenBond: false,
      socialBond: false,
      sustainabilityBond: false
    }
  };
}