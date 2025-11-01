import { TaxLossHarvestingInputs, TaxLossHarvestingOutputs, TaxLossHarvestingMetrics, TaxLossHarvestingAnalysis } from './types';

// Calculate net capital gains/losses
export function calculateNetCapitalGains(inputs: TaxLossHarvestingInputs): number {
  const shortTermNet = inputs.shortTermGains - inputs.shortTermLosses;
  const longTermNet = inputs.longTermGains - inputs.longTermLosses;
  return shortTermNet + longTermNet;
}

// Calculate harvestable losses (losses that can offset gains)
export function calculateHarvestableLosses(inputs: TaxLossHarvestingInputs): number {
  const totalLosses = inputs.shortTermLosses + inputs.longTermLosses;
  const totalGains = inputs.shortTermGains + inputs.longTermGains;

  // Can harvest up to $3,000 in excess losses per year against ordinary income
  const harvestable = Math.min(totalLosses, totalGains + 3000);
  return Math.max(0, harvestable);
}

// Calculate tax savings from loss harvesting
export function calculateTaxSavings(harvestableLosses: number, taxRate: number): number {
  return harvestableLosses * (taxRate / 100);
}

// Calculate optimal harvest amount based on portfolio and risk factors
export function calculateOptimalHarvestAmount(inputs: TaxLossHarvestingInputs): number {
  const harvestableLosses = calculateHarvestableLosses(inputs);
  const portfolioPercentage = Math.min(harvestableLosses / inputs.currentPortfolioValue, 0.20); // Max 20% of portfolio

  let riskAdjustment = 1.0;
  if (inputs.riskTolerance === 'conservative') riskAdjustment = 0.5;
  else if (inputs.riskTolerance === 'aggressive') riskAdjustment = 1.2;

  const optimalAmount = Math.max(
    inputs.minimumHarvestAmount,
    Math.min(harvestableLosses, inputs.currentPortfolioValue * portfolioPercentage * riskAdjustment)
  );

  return optimalAmount;
}

// Calculate tax efficiency ratio
export function calculateTaxEfficiency(inputs: TaxLossHarvestingInputs): number {
  const harvestableLosses = calculateHarvestableLosses(inputs);
  const totalGains = inputs.shortTermGains + inputs.longTermGains;
  const totalLosses = inputs.shortTermLosses + inputs.longTermLosses;

  if (totalGains + totalLosses === 0) return 100;

  const efficiency = ((totalGains - harvestableLosses) / (totalGains + totalLosses)) * 100;
  return Math.max(0, Math.min(100, efficiency));
}

// Calculate portfolio rebalancing costs
export function calculateRebalancingCost(inputs: TaxLossHarvestingInputs): number {
  const optimalHarvest = calculateOptimalHarvestAmount(inputs);
  const transactions = Math.ceil(optimalHarvest / inputs.minimumHarvestAmount);
  return transactions * inputs.transactionCosts;
}

// Calculate expected annual savings
export function calculateExpectedAnnualSavings(inputs: TaxLossHarvestingInputs): number {
  const harvestableLosses = calculateHarvestableLosses(inputs);
  const taxSavings = calculateTaxSavings(harvestableLosses, inputs.taxRate);

  let frequencyMultiplier = 1;
  if (inputs.harvestFrequency === 'quarterly') frequencyMultiplier = 4;
  else if (inputs.harvestFrequency === 'monthly') frequencyMultiplier = 12;

  return taxSavings * frequencyMultiplier;
}

// Calculate break-even period for harvesting costs
export function calculateBreakEvenPeriod(inputs: TaxLossHarvestingInputs): number {
  const rebalancingCost = calculateRebalancingCost(inputs);
  const annualSavings = calculateExpectedAnnualSavings(inputs);

  if (annualSavings <= 0) return Infinity;

  return Math.ceil(rebalancingCost / annualSavings);
}

// Calculate risk-adjusted return considering volatility
export function calculateRiskAdjustedReturn(inputs: TaxLossHarvestingInputs): number {
  const expectedReturn = inputs.expectedReturn / 100;
  const volatility = inputs.volatility / 100;

  if (volatility === 0) return expectedReturn;

  // Sharpe ratio approximation (assuming risk-free rate of 2%)
  const riskFreeRate = 0.02;
  const sharpeRatio = (expectedReturn - riskFreeRate) / volatility;

  return expectedReturn * Math.max(0.5, Math.min(2.0, sharpeRatio));
}

// Generate harvest schedule based on frequency and amounts
export function generateHarvestSchedule(inputs: TaxLossHarvestingInputs): string[] {
  const schedule: string[] = [];
  const optimalHarvest = calculateOptimalHarvestAmount(inputs);
  const periods = inputs.harvestFrequency === 'annual' ? 1 :
                  inputs.harvestFrequency === 'quarterly' ? 4 : 12;

  const amountPerPeriod = optimalHarvest / periods;

  for (let i = 1; i <= periods; i++) {
    const periodName = inputs.harvestFrequency === 'annual' ? 'Year' :
                      inputs.harvestFrequency === 'quarterly' ? `Q${i}` : `Month ${i}`;
    schedule.push(`${periodName}: $${amountPerPeriod.toFixed(2)}`);
  }

  return schedule;
}

// Generate recommended actions
export function generateRecommendedActions(inputs: TaxLossHarvestingInputs): string[] {
  const actions: string[] = [];
  const harvestableLosses = calculateHarvestableLosses(inputs);
  const optimalHarvest = calculateOptimalHarvestAmount(inputs);

  if (harvestableLosses > 0) {
    actions.push(`Harvest up to $${optimalHarvest.toFixed(2)} in losses`);
  }

  if (inputs.washSalePeriod > 0) {
    actions.push(`Wait ${inputs.washSalePeriod} days before repurchasing substantially identical securities`);
  }

  if (inputs.riskTolerance === 'conservative') {
    actions.push('Consider harvesting smaller amounts more frequently to reduce risk');
  }

  if (inputs.transactionCosts > 50) {
    actions.push('Evaluate low-cost index funds for replacement investments');
  }

  if (inputs.expectedReturn < 5) {
    actions.push('Consider more aggressive harvesting if market conditions improve');
  }

  return actions;
}

// Main calculation function
export function calculateTaxLossHarvesting(inputs: TaxLossHarvestingInputs): TaxLossHarvestingOutputs {
  const harvestableLosses = calculateHarvestableLosses(inputs);
  const netTaxSavings = calculateTaxSavings(harvestableLosses, inputs.taxRate);
  const optimalHarvestAmount = calculateOptimalHarvestAmount(inputs);
  const taxEfficiency = calculateTaxEfficiency(inputs);
  const portfolioRebalancingCost = calculateRebalancingCost(inputs);
  const expectedAnnualSavings = calculateExpectedAnnualSavings(inputs);
  const breakEvenPeriod = calculateBreakEvenPeriod(inputs);
  const riskAdjustedReturn = calculateRiskAdjustedReturn(inputs);
  const harvestSchedule = generateHarvestSchedule(inputs);
  const recommendedActions = generateRecommendedActions(inputs);

  return {
    netTaxSavings,
    harvestableLosses,
    optimalHarvestAmount,
    taxEfficiency,
    portfolioRebalancingCost,
    expectedAnnualSavings,
    breakEvenPeriod,
    riskAdjustedReturn,
    harvestSchedule,
    recommendedActions
  };
}

// Generate analysis and recommendations
export function generateTaxLossHarvestingAnalysis(
  inputs: TaxLossHarvestingInputs,
  outputs: TaxLossHarvestingOutputs
): TaxLossHarvestingAnalysis {
  let recommendation = '';
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';

  if (outputs.harvestableLosses === 0) {
    recommendation = 'No harvestable losses available. Consider tax-loss harvesting when losses exceed gains.';
    riskLevel = 'Low';
  } else if (outputs.breakEvenPeriod > inputs.investmentHorizon) {
    recommendation = `Tax-loss harvesting may not be beneficial. Break-even period (${outputs.breakEvenPeriod} years) exceeds investment horizon.`;
    riskLevel = 'Medium';
  } else if (outputs.expectedAnnualSavings > outputs.portfolioRebalancingCost) {
    recommendation = `Tax-loss harvesting recommended. Expected annual savings of $${outputs.expectedAnnualSavings.toFixed(2)} exceed costs of $${outputs.portfolioRebalancingCost.toFixed(2)}.`;
    riskLevel = 'Low';
  } else {
    recommendation = 'Tax-loss harvesting may have limited benefits. Consider alternative tax strategies.';
    riskLevel = 'Medium';
  }

  if (inputs.volatility > 20) {
    recommendation += ' High market volatility increases risk - consider conservative harvesting approach.';
    riskLevel = 'High';
  }

  return { recommendation, riskLevel };
}

// Calculate result for metrics
export function calculateResult(inputs: TaxLossHarvestingInputs): number {
  const outputs = calculateTaxLossHarvesting(inputs);
  return outputs.netTaxSavings;
}

// Generate metrics
export function generateMetrics(inputs: TaxLossHarvestingInputs): TaxLossHarvestingMetrics {
  return {
    result: calculateResult(inputs)
  };
}

// Generate analysis
export function generateAnalysis(inputs: TaxLossHarvestingInputs): TaxLossHarvestingAnalysis {
  const outputs = calculateTaxLossHarvesting(inputs);
  return generateTaxLossHarvestingAnalysis(inputs, outputs);
}