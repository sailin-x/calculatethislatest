import { CapitalGainsInputs, CapitalGainsMetrics, CapitalGainsAnalysis } from './types';

export function calculateCapitalGain(inputs: CapitalGainsInputs): number {
  const { salePrice, acquisitionPrice, quantity } = inputs;
  return (salePrice - acquisitionPrice) * quantity;
}

export function calculateNetCapitalGain(inputs: CapitalGainsInputs): number {
  const capitalGain = calculateCapitalGain(inputs);
  const { acquisitionCosts, saleCosts } = inputs;
  return capitalGain - acquisitionCosts - saleCosts;
}

export function calculateTaxableGain(inputs: CapitalGainsInputs): number {
  const netGain = calculateNetCapitalGain(inputs);
  if (netGain <= 0) return 0;

  // Simplified tax calculation - in reality, this depends on jurisdiction
  // For long-term holdings, there might be preferential rates
  const { holdingPeriod } = inputs;
  if (holdingPeriod === 'long') {
    // Assume 50% exclusion for long-term capital gains (simplified)
    return netGain * 0.5;
  }
  return netGain;
}

export function calculateTaxOwed(inputs: CapitalGainsInputs): number {
  const taxableGain = calculateTaxableGain(inputs);
  return taxableGain * (inputs.taxRate / 100);
}

export function calculateAfterTaxGain(inputs: CapitalGainsInputs): number {
  const netGain = calculateNetCapitalGain(inputs);
  const taxOwed = calculateTaxOwed(inputs);
  return netGain - taxOwed;
}

export function calculateTotalReturn(inputs: CapitalGainsInputs): number {
  const { acquisitionPrice, quantity, acquisitionCosts } = inputs;
  const totalInvestment = (acquisitionPrice * quantity) + acquisitionCosts;
  const afterTaxGain = calculateAfterTaxGain(inputs);
  return (afterTaxGain / totalInvestment) * 100;
}

export function calculateAnnualizedReturn(inputs: CapitalGainsInputs): number {
  const totalReturn = calculateTotalReturn(inputs) / 100;
  const holdingPeriodYears = calculateHoldingPeriodYears(inputs);
  if (holdingPeriodYears <= 0) return 0;

  return (Math.pow(1 + totalReturn, 1 / holdingPeriodYears) - 1) * 100;
}

export function calculateRealReturn(inputs: CapitalGainsInputs): number {
  const nominalReturn = calculateAnnualizedReturn(inputs);
  const { inflationRate } = inputs;

  return ((1 + nominalReturn / 100) / (1 + inflationRate / 100) - 1) * 100;
}

export function calculateHoldingPeriodDays(inputs: CapitalGainsInputs): number {
  const acquisitionDate = new Date(inputs.acquisitionDate);
  const saleDate = new Date(inputs.saleDate);

  const timeDiff = saleDate.getTime() - acquisitionDate.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

export function calculateHoldingPeriodYears(inputs: CapitalGainsInputs): number {
  return calculateHoldingPeriodDays(inputs) / 365.25;
}

export function determineHoldingPeriod(inputs: CapitalGainsInputs): 'short' | 'long' {
  const days = calculateHoldingPeriodDays(inputs);
  // Simplified: 1 year = 365 days for long-term (varies by jurisdiction)
  return days > 365 ? 'long' : 'short';
}

export function calculateResult(inputs: CapitalGainsInputs): number {
  return calculateAfterTaxGain(inputs);
}

export function generateAnalysis(inputs: CapitalGainsInputs, metrics: CapitalGainsMetrics): CapitalGainsAnalysis {
  const netGain = calculateNetCapitalGain(inputs);
  const taxOwed = metrics.taxOwed;
  const holdingPeriod = determineHoldingPeriod(inputs);
  const taxRate = inputs.taxRate;

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (taxRate > 30) riskLevel = 'High';
  else if (taxRate > 20) riskLevel = 'Medium';

  let taxEfficiency = '';
  if (taxOwed === 0) {
    taxEfficiency = 'Tax-free transaction';
  } else if (taxOwed / Math.abs(netGain) < 0.15) {
    taxEfficiency = 'Tax-efficient investment';
  } else if (taxOwed / Math.abs(netGain) < 0.30) {
    taxEfficiency = 'Moderate tax impact';
  } else {
    taxEfficiency = 'High tax burden';
  }

  let taxBracket = '';
  if (taxRate < 15) taxBracket = 'Low tax bracket';
  else if (taxRate < 25) taxBracket = 'Middle tax bracket';
  else if (taxRate < 35) taxBracket = 'High tax bracket';
  else taxBracket = 'Very high tax bracket';

  let recommendation = '';
  if (netGain > 0) {
    if (holdingPeriod === 'long') {
      recommendation = 'Long-term capital gain with favorable tax treatment. Consider tax-loss harvesting opportunities.';
    } else {
      recommendation = 'Short-term capital gain taxed at ordinary income rates. Consider holding longer for tax benefits.';
    }
  } else {
    recommendation = 'Capital loss realized. Can be used to offset future gains. Consider tax-loss harvesting strategies.';
  }

  return { recommendation, taxEfficiency, riskLevel, holdingPeriod: holdingPeriod === 'long' ? 'Long-term' : 'Short-term', taxBracket };
}