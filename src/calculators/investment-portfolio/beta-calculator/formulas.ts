```typescript
import { BetaCalculatorInputs, BetaCalculatorMetrics, BetaCalculatorAnalysis } from './types';

/**
 * Calculates the Beta coefficient for an investment.
 * Formula: β = ρ * (σ_stock / σ_market)
 * Where ρ is the correlation coefficient, σ_stock is the standard deviation of stock returns,
 * and σ_market is the standard deviation of market returns.
 * 
 * @param inputs - The inputs for the beta calculation.
 * @returns The calculated beta value.
 */
export function calculateResult(inputs: BetaCalculatorInputs): number {
  const { correlation, stockStdDev, marketStdDev } = inputs;

  // Handle division by zero or invalid market std dev
  if (marketStdDev === 0) {
    throw new Error('Market standard deviation cannot be zero.');
  }

  // Ensure inputs are within reasonable bounds (correlation between -1 and 1)
  if (correlation < -1 || correlation > 1) {
    throw new Error('Correlation must be between -1 and 1.');
  }

  // Beta can be negative if correlation is negative, which is valid for inverse relationships
  return correlation * (stockStdDev / marketStdDev);
}

/**
 * Generates an analysis for the beta calculation, including risk level and recommendation.
 * Risk levels are determined as follows:
 * - Low: Beta < 0.8 (defensive, less volatile than market)
 * - Medium: 0.8 <= Beta <= 1.2 (tracks market volatility)
 * - High: Beta > 1.2 (aggressive, more volatile than market)
 * Negative beta indicates inverse movement (e.g., hedging assets).
 * 
 * @param inputs - The original inputs used for calculation.
 * @param metrics - The metrics containing the calculated result.
 * @returns The analysis object with recommendation and riskLevel.
 */
export function generateAnalysis(
  inputs: BetaCalculatorInputs,
  metrics: BetaCalculatorMetrics
): BetaCalculatorAnalysis {
  const { result: beta } = metrics;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Medium';

  if (beta < 0) {
    riskLevel = 'Low'; // Negative beta often implies lower systematic risk in portfolios (hedging)
    const recommendation = `A negative beta (${beta.toFixed(2)}) suggests the investment moves inversely to the market, making it suitable for hedging or diversification in a portfolio. Consider it for risk reduction strategies.`;
    return { recommendation, riskLevel };
  }

  if (beta < 0.8) {
    riskLevel = 'Low';
    const recommendation = `Low beta (${beta.toFixed(2)}) indicates the investment is less volatile than the market. Ideal for conservative investors seeking stability and downside protection.`;
  } else if (beta > 1.2) {
    riskLevel = 'High';
    const recommendation = `High beta (${beta.toFixed(2)}) means the investment is more volatile than the market. Suitable for aggressive investors aiming for higher returns in bull markets, but with increased risk.`;
  } else {
    riskLevel = 'Medium';
    const recommendation = `Beta of ${beta.toFixed(2)} aligns closely with market volatility. This investment behaves similarly to the broader market, making it a balanced choice for most diversified portfolios.`;
  }

  return { recommendation, riskLevel };
}
```