```typescript
import { SharpeRatioCalculatorInputs, SharpeRatioCalculatorMetrics, SharpeRatioCalculatorAnalysis } from './types';

/**
 * Helper function to calculate the excess return for Sharpe Ratio.
 * Excess return = Portfolio return - Risk-free rate.
 * This is a key component in risk-adjusted performance metrics.
 */
function calculateExcessReturn(portfolioReturn: number, riskFreeRate: number): number {
  return portfolioReturn - riskFreeRate;
}

/**
 * Helper function to validate inputs for Sharpe Ratio calculation.
 * Ensures standard deviation is non-negative and handles edge cases.
 * In investment portfolios, standard deviation represents volatility/risk.
 */
function validateInputsForSharpe(inputs: SharpeRatioCalculatorInputs): boolean {
  const { portfolioReturn, riskFreeRate, portfolioStandardDeviation } = inputs;
  return typeof portfolioReturn === 'number' &&
         typeof riskFreeRate === 'number' &&
         typeof portfolioStandardDeviation === 'number' &&
         portfolioStandardDeviation >= 0 &&
         !isNaN(portfolioReturn) &&
         !isNaN(riskFreeRate);
}

/**
 * Calculates the Sharpe Ratio, a measure of risk-adjusted return for investment portfolios.
 * Formula: Sharpe Ratio = (Portfolio Return - Risk-Free Rate) / Portfolio Standard Deviation
 * Returns Infinity or -Infinity if standard deviation is zero (undefined in finance, but handled mathematically).
 * Assumes inputs are annualized returns and volatility in decimal form (e.g., 0.12 for 12%).
 */
export function calculateResult(inputs: SharpeRatioCalculatorInputs): number {
  if (!validateInputsForSharpe(inputs)) {
    throw new Error('Invalid inputs for Sharpe Ratio calculation. Ensure all values are valid numbers and standard deviation is non-negative.');
  }

  const { portfolioReturn, riskFreeRate, portfolioStandardDeviation } = inputs;
  const excessReturn = calculateExcessReturn(portfolioReturn, riskFreeRate);

  // In JavaScript/TypeScript, division by zero yields Infinity or -Infinity, which is appropriate for Sharpe Ratio edge cases.
  return excessReturn / portfolioStandardDeviation;
}

/**
 * Generates an analysis for the Sharpe Ratio, including a recommendation and risk level assessment.
 * Risk level is determined by portfolio standard deviation (volatility):
 * - Low: < 10% (0.10) - Conservative portfolio
 * - Medium: 10% to 20% (0.10 to 0.20) - Balanced portfolio
 * - High: > 20% (0.20) - Aggressive portfolio
 * Recommendation is based on the Sharpe Ratio value:
 * - > 1: Strong risk-adjusted performance
 * - 0 to 1: Moderate
 * - < 0: Underperforms risk-free rate
 * This provides actionable insights for portfolio managers.
 */
export function generateAnalysis(
  inputs: SharpeRatioCalculatorInputs,
  metrics: SharpeRatioCalculatorMetrics
): SharpeRatioCalculatorAnalysis {
  const result = metrics.result;
  const { portfolioStandardDeviation } = inputs;

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (portfolioStandardDeviation >= 0.20) {
    riskLevel = 'High';
  } else if (portfolioStandardDeviation >= 0.10) {
    riskLevel = 'Medium';
  } // else remains 'Low'

  let recommendation: string;
  if (result > 1) {
    recommendation = 'The portfolio demonstrates strong risk-adjusted returns, outperforming the risk-free rate with efficient risk management. Consider maintaining or scaling this allocation.';
  } else if (result >= 0) {
    recommendation = 'The portfolio shows moderate risk-adjusted performance. Evaluate diversification or asset rebalancing to potentially improve the Sharpe Ratio.';
  } else {
    recommendation = 'The portfolio underperforms on a risk-adjusted basis, as returns do not compensate for the volatility. Recommend reviewing high-risk holdings and considering safer alternatives.';
  }

  return { recommendation, riskLevel };
}
```