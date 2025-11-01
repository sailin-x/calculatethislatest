import { EbitdaCalculatorInputs, EbitdaCalculatorMetrics, EbitdaCalculatorAnalysis } from './types';

// Calculate EBITDA (Earnings Before Interest, Taxes, Depreciation, and Amortization)
export function calculateEBITDA(inputs: EbitdaCalculatorInputs): number {
  const { revenue, operatingExpenses, depreciation, amortization } = inputs;

  // EBITDA = Revenue - Operating Expenses + Depreciation + Amortization
  // Note: Operating Expenses should exclude depreciation and amortization
  return revenue - operatingExpenses + depreciation + amortization;
}

// Calculate EBITDA Margin
export function calculateEBITDAMargin(ebitda: number, revenue: number): number {
  if (revenue <= 0) return 0;
  return (ebitda / revenue) * 100;
}

// Calculate Adjusted EBITDA (excluding one-time items, but simplified here)
export function calculateAdjustedEBITDA(ebitda: number, adjustments: number = 0): number {
  return ebitda + adjustments;
}

// Calculate EBITDA to Revenue ratio
export function calculateEBITDAToRevenue(ebitda: number, revenue: number): number {
  if (revenue <= 0) return 0;
  return ebitda / revenue;
}

// Calculate EBIT (Earnings Before Interest and Taxes) from EBITDA
export function calculateEBITFromEBITDA(ebitda: number, depreciation: number, amortization: number): number {
  return ebitda - depreciation - amortization;
}

// Generate EBITDA analysis
export function generateEBITDAAnalysis(
  inputs: EbitdaCalculatorInputs,
  metrics: EbitdaCalculatorMetrics
): EbitdaCalculatorAnalysis {
  const { ebitda, ebitdaMargin } = metrics;

  // Determine profitability
  let profitability: 'excellent' | 'good' | 'fair' | 'poor' = 'poor';
  if (ebitdaMargin >= 25) profitability = 'excellent';
  else if (ebitdaMargin >= 15) profitability = 'good';
  else if (ebitdaMargin >= 10) profitability = 'fair';

  // Determine efficiency
  let efficiency: 'high' | 'medium' | 'low' = 'low';
  if (ebitdaMargin >= 20) efficiency = 'high';
  else if (ebitdaMargin >= 12) efficiency = 'medium';

  const recommendations = [];
  if (profitability === 'excellent') recommendations.push('Strong EBITDA performance indicates healthy profitability');
  if (ebitdaMargin < 10) recommendations.push('Low EBITDA margin suggests potential operational inefficiencies');
  if (ebitda <= 0) recommendations.push('Negative EBITDA indicates the company is not generating sufficient cash from operations');

  // Simplified industry comparison (would be more sophisticated in real implementation)
  let industryComparison = 'Industry comparison requires additional context';
  if (ebitdaMargin >= 20) industryComparison = 'Above industry average EBITDA margin';
  else if (ebitdaMargin >= 10) industryComparison = 'At or near industry average EBITDA margin';
  else industryComparison = 'Below industry average EBITDA margin';

  return {
    profitability,
    efficiency,
    recommendations,
    industryComparison
  };
}
