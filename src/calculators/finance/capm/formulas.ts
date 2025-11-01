import { CAPMInputs, CAPMOutputs } from './types';

// Calculate cost of equity using CAPM formula: E(Ri) = Rf + βi * (E(Rm) - Rf)
export function calculateCostOfEquity(riskFreeRate: number, marketRiskPremium: number, beta: number): number {
  return riskFreeRate + (beta * marketRiskPremium);
}

// Calculate expected return (same as cost of equity in CAPM)
export function calculateExpectedReturn(riskFreeRate: number, marketRiskPremium: number, beta: number): number {
  return calculateCostOfEquity(riskFreeRate, marketRiskPremium, beta);
}

// Calculate risk premium for the specific asset
export function calculateRiskPremium(marketRiskPremium: number, beta: number): number {
  return beta * marketRiskPremium;
}

// Calculate systematic risk (beta)
export function calculateSystematicRisk(beta: number): number {
  return beta;
}

// Calculate total risk (simplified - would need additional inputs for unsystematic risk)
export function calculateTotalRisk(beta: number, unsystematicRisk: number = 0.3): number {
  return Math.sqrt(beta ** 2 + unsystematicRisk ** 2);
}

// Adjust beta for leverage using Hamada equation
export function calculateLeveredBeta(unleveredBeta: number, taxRate: number, debtRatio: number, equityRatio: number): number {
  return unleveredBeta * (1 + (1 - taxRate) * (debtRatio / equityRatio));
}

// Unlever beta
export function calculateUnleveredBeta(leveredBeta: number, taxRate: number, debtRatio: number, equityRatio: number): number {
  return leveredBeta / (1 + (1 - taxRate) * (debtRatio / equityRatio));
}

// Adjust beta towards 1.0 (Blume adjustment)
export function calculateAdjustedBeta(historicalBeta: number, adjustmentFactor: number = 0.67): number {
  return (adjustmentFactor * historicalBeta) + (1 - adjustmentFactor) * 1.0;
}

// Perform sensitivity analysis for different beta values
export function performSensitivityAnalysis(
  riskFreeRate: number,
  marketRiskPremium: number,
  baseBeta: number
): CAPMOutputs['sensitivityAnalysis'] {
  const betaRange = [];
  const costOfEquityRange = [];
  const expectedReturnRange = [];

  for (let beta = Math.max(0, baseBeta - 1); beta <= baseBeta + 1; beta += 0.1) {
    betaRange.push(beta);
    const costOfEquity = calculateCostOfEquity(riskFreeRate, marketRiskPremium, beta);
    const expectedReturn = calculateExpectedReturn(riskFreeRate, marketRiskPremium, beta);

    costOfEquityRange.push(costOfEquity);
    expectedReturnRange.push(expectedReturn);
  }

  return {
    betaRange,
    costOfEquityRange,
    expectedReturnRange
  };
}

// Generate recommendations based on CAPM analysis
export function generateCAPMRecommendations(inputs: CAPMInputs, outputs: CAPMOutputs): string[] {
  const recommendations: string[] = [];

  if (outputs.betaAnalysis.leveredBeta > 2.0) {
    recommendations.push('High beta indicates significant systematic risk - consider conservative investment approach');
  } else if (outputs.betaAnalysis.leveredBeta < 0.5) {
    recommendations.push('Low beta suggests defensive characteristics - suitable for risk-averse investors');
  }

  if (outputs.costOfEquity > 0.15) {
    recommendations.push('High cost of equity may impact project viability - review risk factors');
  }

  if (inputs.adjustedBeta && inputs.historicalBeta) {
    const adjustment = outputs.betaAnalysis.adjustedBeta - inputs.historicalBeta;
    if (Math.abs(adjustment) > 0.2) {
      recommendations.push('Significant beta adjustment applied - monitor actual beta over time');
    }
  }

  if (inputs.debtRatio && inputs.debtRatio > 0.6) {
    recommendations.push('High debt ratio amplifies equity risk - consider deleveraging if appropriate');
  }

  return recommendations;
}

// Main CAPM calculation function
export function calculateCAPM(inputs: CAPMInputs): CAPMOutputs {
  const costOfEquity = calculateCostOfEquity(inputs.riskFreeRate, inputs.marketRiskPremium, inputs.beta);
  const expectedReturn = calculateExpectedReturn(inputs.riskFreeRate, inputs.marketRiskPremium, inputs.beta);
  const riskPremium = calculateRiskPremium(inputs.marketRiskPremium, inputs.beta);
  const systematicRisk = calculateSystematicRisk(inputs.beta);
  const totalRisk = calculateTotalRisk(inputs.beta);

  // Beta analysis
  let unleveredBeta = inputs.beta;
  let leveredBeta = inputs.beta;
  let adjustedBeta = inputs.beta;

  if (inputs.taxRate && inputs.debtRatio) {
    const equityRatio = 1 - inputs.debtRatio;
    unleveredBeta = calculateUnleveredBeta(inputs.beta, inputs.taxRate, inputs.debtRatio, equityRatio);
    leveredBeta = calculateLeveredBeta(unleveredBeta, inputs.taxRate, inputs.debtRatio, equityRatio);
  }

  if (inputs.adjustedBeta && inputs.historicalBeta) {
    adjustedBeta = calculateAdjustedBeta(inputs.historicalBeta);
  }

  const betaAnalysis = {
    unleveredBeta,
    leveredBeta,
    adjustedBeta
  };

  const sensitivityAnalysis = performSensitivityAnalysis(
    inputs.riskFreeRate,
    inputs.marketRiskPremium,
    inputs.beta
  );

  const recommendations = generateCAPMRecommendations(inputs, {
    costOfEquity,
    expectedReturn,
    riskPremium,
    systematicRisk,
    totalRisk,
    betaAnalysis,
    sensitivityAnalysis,
    recommendations: []
  });

  return {
    costOfEquity,
    expectedReturn,
    riskPremium,
    systematicRisk,
    totalRisk,
    betaAnalysis,
    sensitivityAnalysis,
    recommendations
  };
}