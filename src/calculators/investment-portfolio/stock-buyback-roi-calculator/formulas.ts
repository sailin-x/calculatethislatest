```typescript
import { StockBuybackROICalculatorInputs, StockBuybackROICalculatorMetrics, StockBuybackROICalculatorAnalysis } from './types';

/**
 * Calculates the market capitalization based on current price and shares outstanding.
 * @param inputs - The calculator inputs.
 * @returns Market cap in USD.
 */
function calculateMarketCap(inputs: StockBuybackROICalculatorInputs): number {
  return inputs.currentPrice * inputs.sharesOutstanding;
}

/**
 * Estimates the number of shares retired assuming buyback at current market price.
 * @param inputs - The calculator inputs.
 * @returns Number of shares retired.
 */
function calculateSharesRetired(inputs: StockBuybackROICalculatorInputs): number {
  return inputs.buybackAmount / inputs.currentPrice;
}

/**
 * Calculates the total percentage reduction in shares outstanding due to the buyback program.
 * @param inputs - The calculator inputs.
 * @returns Percentage reduction as a decimal (e.g., 0.05 for 5%).
 */
function calculatePercentageReduction(inputs: StockBuybackROICalculatorInputs): number {
  const sharesRetired = calculateSharesRetired(inputs);
  return sharesRetired / inputs.sharesOutstanding;
}

/**
 * Calculates the annualized buyback ROI (yield), which represents the approximate annual return
 * to shareholders from EPS accretion and share price appreciation due to the buyback program.
 * Formula: (Total buyback amount / Market cap) / (Duration in years) * 100
 * This assumes the buyback is executed evenly over the program duration at the current price.
 * @param inputs - The calculator inputs.
 * @returns Annualized ROI as a percentage.
 */
export function calculateResult(inputs: StockBuybackROICalculatorInputs): number {
  const marketCap = calculateMarketCap(inputs);
  const totalReduction = inputs.buybackAmount / marketCap; // Equivalent to percentage reduction
  const durationInYears = inputs.programDurationMonths / 12;
  if (durationInYears <= 0) {
    throw new Error('Program duration must be greater than 0 months.');
  }
  const annualizedROI = (totalReduction / durationInYears) * 100;
  return Math.max(0, annualizedROI); // Ensure non-negative
}

/**
 * Generates comprehensive metrics for the stock buyback ROI calculation.
 * This is typically called internally or alongside calculateResult, but for completeness.
 * @param inputs - The calculator inputs.
 * @param result - The calculated ROI result.
 * @returns Metrics object with key calculations.
 */
export function generateMetrics(inputs: StockBuybackROICalculatorInputs, result: number): StockBuybackROICalculatorMetrics {
  const marketCap = calculateMarketCap(inputs);
  const sharesRetired = calculateSharesRetired(inputs);
  const percentageReduction = calculatePercentageReduction(inputs);

  return {
    result,
    marketCap,
    sharesRetired,
    percentageReduction,
    buybackYield: (inputs.buybackAmount / marketCap) * 100, // Total program yield %
  };
}

/**
 * Generates an analysis with recommendation and risk level based on the buyback ROI.
 * - Recommendation: Based on annualized ROI compared to typical benchmarks (e.g., >5% is attractive for value investors).
 * - Risk Level: Assessed by buyback size relative to market cap (large buybacks may strain finances) and program intensity.
 *   - Low: ROI 3-5%, reduction <5%
 *   - Medium: ROI >5% or reduction 5-10%
 *   - High: Reduction >10% (potential over-leverage risk)
 * @param inputs - The calculator inputs.
 * @param metrics - The calculated metrics including result.
 * @returns Analysis object.
 */
export function generateAnalysis(
  inputs: StockBuybackROICalculatorInputs,
  metrics: StockBuybackROICalculatorMetrics
): StockBuybackROICalculatorAnalysis {
  const { result, percentageReduction, buybackYield } = metrics;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';

  // Risk assessment: Based on total share reduction (proxy for financial strain)
  if (percentageReduction > 0.10) {
    riskLevel = 'High'; // Aggressive buyback, potential debt/cash risk
  } else if (percentageReduction > 0.05) {
    riskLevel = 'Medium'; // Moderate intensity
  } else {
    riskLevel = 'Low'; // Conservative
  }

  // Adjust risk if program is very short (high intensity)
  const durationInYears = inputs.programDurationMonths / 12;
  if (durationInYears < 1 && percentageReduction > 0.03) {
    riskLevel = 'Medium' as const; // Quick execution increases market volatility risk
  }

  let recommendation: string;
  if (result > 7) {
    recommendation = 'Strong Buyback Opportunity: The annualized ROI exceeds typical market returns, suggesting significant shareholder value creation through EPS accretion. Consider increasing position if fundamentals align.';
  } else if (result > 4) {
    recommendation = 'Attractive Buyback: Solid annualized ROI indicates effective capital allocation. Monitor execution to confirm share price appreciation.';
  } else if (result > 2) {
    recommendation = 'Moderate Buyback: Provides some return enhancement, but compare to dividend yield or growth prospects for overall attractiveness.';
  } else {
    recommendation = 'Limited Buyback Impact: Low ROI suggests minimal accretion; evaluate other factors like organic growth before investing.';
  }

  if (buybackYield > 10) {
    recommendation += ' Note: High total yield may signal undervaluation or aggressive repurchase strategy.';
  }

  return { recommendation, riskLevel };
}
```