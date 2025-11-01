import { DividendCalculatorInputs, DividendCalculatorMetrics, DividendCalculatorAnalysis } from './types';

// Calculate dividend yield
export function calculateDividendYield(stockPrice: number, annualDividend: number): number {
  if (stockPrice <= 0) return 0;
  return (annualDividend / stockPrice) * 100;
}

// Calculate annual dividend income
export function calculateAnnualDividendIncome(annualDividend: number, dividendFrequency: string): number {
  // The annualDividend parameter is already the total annual dividend amount
  // The frequency parameter is for informational purposes only
  // This function returns the annual dividend income (same as input for annual frequency)
  return annualDividend;
}

// Calculate total dividend income over holding period
export function calculateTotalDividendIncome(
  annualDividend: number,
  dividendFrequency: string,
  holdingPeriod: number
): number {
  const annualIncome = calculateAnnualDividendIncome(annualDividend, dividendFrequency);
  return annualIncome * holdingPeriod;
}

// Calculate dividend payout ratio (assumes earnings per share is provided separately)
export function calculateDividendPayoutRatio(dividendPerShare: number, earningsPerShare: number): number {
  if (earningsPerShare <= 0) return 0;
  return (dividendPerShare / earningsPerShare) * 100;
}

// Calculate dividend coverage ratio
export function calculateDividendCoverageRatio(earningsPerShare: number, dividendPerShare: number): number {
  if (dividendPerShare <= 0) return 0;
  return earningsPerShare / dividendPerShare;
}

// Generate dividend analysis
export function generateDividendAnalysis(
  inputs: DividendCalculatorInputs,
  metrics: DividendCalculatorMetrics
): DividendCalculatorAnalysis {
  const { dividendYield, dividendPayoutRatio, dividendCoverageRatio } = metrics;

  // Determine yield quality
  let yieldQuality: 'low' | 'moderate' | 'high' | 'excellent' = 'low';
  if (dividendYield >= 4) yieldQuality = 'excellent';
  else if (dividendYield >= 3) yieldQuality = 'high';
  else if (dividendYield >= 2) yieldQuality = 'moderate';

  // Determine sustainability
  let sustainability: 'poor' | 'fair' | 'good' | 'excellent' = 'poor';
  if (dividendCoverageRatio >= 2 && dividendPayoutRatio <= 60) sustainability = 'excellent';
  else if (dividendCoverageRatio >= 1.5 && dividendPayoutRatio <= 75) sustainability = 'good';
  else if (dividendCoverageRatio >= 1.25 && dividendPayoutRatio <= 90) sustainability = 'fair';

  const recommendations = [];
  if (yieldQuality === 'excellent') recommendations.push('High yield may indicate good income potential');
  if (sustainability === 'excellent') recommendations.push('Strong dividend sustainability indicators');
  if (dividendPayoutRatio > 100) recommendations.push('Payout ratio >100% may not be sustainable');
  if (dividendCoverageRatio < 1) recommendations.push('Dividend not fully covered by earnings');

  const riskFactors = [];
  if (dividendPayoutRatio > 90) riskFactors.push('High payout ratio increases dividend cut risk');
  if (dividendCoverageRatio < 1.25) riskFactors.push('Low coverage ratio indicates sustainability concerns');

  return {
    yieldQuality,
    sustainability,
    recommendations,
    riskFactors
  };
}
