import { CapitalStructureOptimizationInputs, CapitalStructureOptimizationOutputs } from './types';

// Calculate cost of equity using CAPM model
export function calculateCostOfEquity(riskFreeRate: number, marketRiskPremium: number, beta: number): number {
  return riskFreeRate + (beta * marketRiskPremium);
}

// Calculate cost of debt after tax
export function calculateCostOfDebtAfterTax(costOfDebt: number, taxRate: number): number {
  return costOfDebt * (1 - taxRate);
}

// Calculate Weighted Average Cost of Capital (WACC)
export function calculateWACC(
  costOfEquity: number,
  costOfDebtAfterTax: number,
  debtRatio: number,
  equityRatio: number
): number {
  return (costOfEquity * equityRatio) + (costOfDebtAfterTax * debtRatio);
}

// Calculate enterprise value using DCF model
export function calculateEnterpriseValue(
  freeCashFlow: number,
  wacc: number,
  growthRate: number,
  analysisPeriod: number
): number {
  let enterpriseValue = 0;
  let cashFlow = freeCashFlow;

  for (let year = 1; year <= analysisPeriod; year++) {
    enterpriseValue += cashFlow / Math.pow(1 + wacc, year);
    cashFlow *= (1 + growthRate);
  }

  // Terminal value
  const terminalValue = (cashFlow * (1 + growthRate)) / (wacc - growthRate);
  enterpriseValue += terminalValue / Math.pow(1 + wacc, analysisPeriod);

  return enterpriseValue;
}

// Find optimal capital structure using trade-off theory
export function findOptimalCapitalStructure(
  inputs: CapitalStructureOptimizationInputs,
  freeCashFlow: number
): CapitalStructureOptimizationOutputs['optimalCapitalStructure'] {
  const costOfEquity = calculateCostOfEquity(inputs.riskFreeRate, inputs.marketRiskPremium, inputs.beta);
  const costOfDebtAfterTax = calculateCostOfDebtAfterTax(inputs.costOfDebt, inputs.taxRate);

  // Test different debt ratios to find optimal
  const debtRatios = [];
  for (let ratio = 0; ratio <= 1; ratio += 0.05) {
    debtRatios.push(ratio);
  }

  let optimalDebtRatio = 0;
  let minWacc = Infinity;
  let maxFirmValue = 0;

  for (const debtRatio of debtRatios) {
    const equityRatio = 1 - debtRatio;
    const wacc = calculateWACC(costOfEquity, costOfDebtAfterTax, debtRatio, equityRatio);

    // Adjust beta for financial leverage (simplified Hamada equation)
    const leveredBeta = inputs.beta * (1 + (1 - inputs.taxRate) * (debtRatio / equityRatio));
    const adjustedCostOfEquity = calculateCostOfEquity(inputs.riskFreeRate, inputs.marketRiskPremium, leveredBeta);

    const adjustedWacc = calculateWACC(adjustedCostOfEquity, costOfDebtAfterTax, debtRatio, equityRatio);
    const firmValue = calculateEnterpriseValue(freeCashFlow, adjustedWacc, inputs.growthRate, inputs.analysisPeriod);

    if (adjustedWacc < minWacc) {
      minWacc = adjustedWacc;
      optimalDebtRatio = debtRatio;
    }

    if (firmValue > maxFirmValue) {
      maxFirmValue = firmValue;
    }
  }

  const equityRatio = 1 - optimalDebtRatio;
  const finalWacc = calculateWACC(costOfEquity, costOfDebtAfterTax, optimalDebtRatio, equityRatio);
  const firmValue = calculateEnterpriseValue(freeCashFlow, finalWacc, inputs.growthRate, inputs.analysisPeriod);

  return {
    debtRatio: optimalDebtRatio,
    equityRatio: equityRatio,
    wacc: finalWacc,
    firmValue: firmValue
  };
}

// Perform sensitivity analysis
export function performSensitivityAnalysis(
  inputs: CapitalStructureOptimizationInputs,
  freeCashFlow: number
): CapitalStructureOptimizationOutputs['sensitivityAnalysis'] {
  const costOfEquity = calculateCostOfEquity(inputs.riskFreeRate, inputs.marketRiskPremium, inputs.beta);
  const costOfDebtAfterTax = calculateCostOfDebtAfterTax(inputs.costOfDebt, inputs.taxRate);

  const debtRatios = [];
  const waccRange = [];
  const firmValueRange = [];

  for (let ratio = 0; ratio <= 1; ratio += 0.1) {
    debtRatios.push(ratio);
    const equityRatio = 1 - ratio;
    const wacc = calculateWACC(costOfEquity, costOfDebtAfterTax, ratio, equityRatio);
    const firmValue = calculateEnterpriseValue(freeCashFlow, wacc, inputs.growthRate, inputs.analysisPeriod);

    waccRange.push(wacc);
    firmValueRange.push(firmValue);
  }

  return {
    debtRatioRange: debtRatios,
    waccRange: waccRange,
    firmValueRange: firmValueRange
  };
}

// Generate recommendations based on analysis
export function generateRecommendations(
  inputs: CapitalStructureOptimizationInputs,
  optimalStructure: CapitalStructureOptimizationOutputs['optimalCapitalStructure']
): string[] {
  const recommendations: string[] = [];

  const currentDebtRatio = inputs.totalDebt / (inputs.totalDebt + inputs.totalEquity);
  const optimalDebtRatio = optimalStructure.debtRatio;

  if (Math.abs(currentDebtRatio - optimalDebtRatio) > 0.1) {
    if (currentDebtRatio < optimalDebtRatio) {
      recommendations.push(`Consider increasing debt ratio from ${(currentDebtRatio * 100).toFixed(1)}% to ${(optimalDebtRatio * 100).toFixed(1)}% to minimize WACC`);
    } else {
      recommendations.push(`Consider reducing debt ratio from ${(currentDebtRatio * 100).toFixed(1)}% to ${(optimalDebtRatio * 100).toFixed(1)}% to optimize capital structure`);
    }
  }

  if (optimalDebtRatio > 0.6) {
    recommendations.push('High optimal debt ratio suggests strong tax shields but increased financial risk');
  }

  if (inputs.beta > 1.5) {
    recommendations.push('High beta indicates volatile stock - consider conservative capital structure');
  }

  if (inputs.costOfDebt > 0.08) {
    recommendations.push('High cost of debt - focus on improving credit rating to reduce borrowing costs');
  }

  return recommendations;
}

// Main calculation function
export function calculateCapitalStructureOptimization(
  inputs: CapitalStructureOptimizationInputs
): CapitalStructureOptimizationOutputs {
  // Estimate free cash flow (simplified as a percentage of total assets)
  const freeCashFlow = inputs.totalAssets * 0.08; // 8% of assets as free cash flow

  const costOfEquity = calculateCostOfEquity(inputs.riskFreeRate, inputs.marketRiskPremium, inputs.beta);
  const costOfDebtAfterTax = calculateCostOfDebtAfterTax(inputs.costOfDebt, inputs.taxRate);

  const currentDebtRatio = inputs.totalDebt / (inputs.totalDebt + inputs.totalEquity);
  const currentEquityRatio = 1 - currentDebtRatio;

  const weightedAverageCostOfCapital = calculateWACC(
    costOfEquity,
    costOfDebtAfterTax,
    currentDebtRatio,
    currentEquityRatio
  );

  const enterpriseValue = calculateEnterpriseValue(
    freeCashFlow,
    weightedAverageCostOfCapital,
    inputs.growthRate,
    inputs.analysisPeriod
  );

  const optimalCapitalStructure = findOptimalCapitalStructure(inputs, freeCashFlow);
  const sensitivityAnalysis = performSensitivityAnalysis(inputs, freeCashFlow);
  const recommendations = generateRecommendations(inputs, optimalCapitalStructure);

  return {
    optimalDebtRatio: optimalCapitalStructure.debtRatio,
    weightedAverageCostOfCapital,
    costOfEquity,
    costOfDebtAfterTax,
    enterpriseValue,
    equityValue: enterpriseValue * (1 - optimalCapitalStructure.debtRatio),
    debtValue: enterpriseValue * optimalCapitalStructure.debtRatio,
    optimalCapitalStructure,
    sensitivityAnalysis,
    recommendations
  };
}