import { BusinessValuationCalculatorinputs, BusinessValuationCalculatormetrics, BusinessValuationCalculatoranalysis } from './types';

// Business Valuation Calculator
export function calculateAssetBasedValue(totalAssets: number, totalLiabilities: number): number {
  return totalAssets - totalLiabilities;
}

export function calculateEarningsBasedValue(annualEarnings: number, multiplier: number): number {
  return annualEarnings * multiplier;
}

export function calculateMarketBasedValue(revenue: number, industryMultiplier: number): number {
  return revenue * industryMultiplier;
}

export function calculateResult(inputs: BusinessValuationCalculatorinputs): number {
  if ('valuationMethod' in inputs) {
    switch (inputs.valuationMethod) {
      case 'asset':
        return calculateAssetBasedValue(inputs.totalAssets || 0, inputs.totalLiabilities || 0);
      case 'earnings':
        return calculateEarningsBasedValue(inputs.annualEarnings || 0, inputs.multiplier || 3);
      case 'market':
        return calculateMarketBasedValue(inputs.revenue || 0, inputs.industryMultiplier || 1);
      default:
        return inputs.annualEarnings ? calculateEarningsBasedValue(inputs.annualEarnings, 3) : 0;
    }
  }
  return 0;
}

export function generateAnalysis(inputs: BusinessValuationCalculatorinputs, metrics: BusinessValuationCalculatormetrics): BusinessValuationCalculatoranalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (result > 10000000) riskLevel = 'High';
  else if (result > 1000000) riskLevel = 'Medium';

  const recommendation = 'Business valuation calculated. Consider multiple valuation methods for comprehensive analysis.';

  return { recommendation, riskLevel };
}