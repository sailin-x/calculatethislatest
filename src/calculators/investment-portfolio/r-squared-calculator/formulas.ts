```typescript
import { RSquaredCalculatorInputs, RSquaredCalculatorMetrics, RSquaredCalculatorAnalysis } from './types';

/**
 * Computes the R-squared value using the coefficient of determination from linear regression
 * between portfolio returns and benchmark returns. R-squared measures the proportion of
 * variance in portfolio returns explained by the benchmark.
 * 
 * Formula: R² = [∑((x_i - x_mean)(y_i - y_mean))²] / [∑(x_i - x_mean)² * ∑(y_i - y_mean)²]
 * where x = benchmark returns, y = portfolio returns.
 * 
 * @param portfolioReturns - Array of periodic portfolio returns (e.g., monthly % returns)
 * @param benchmarkReturns - Array of periodic benchmark returns (e.g., S&P 500 monthly % returns)
 * @returns The R-squared value (0 to 1)
 * @throws Error if input arrays are invalid (different lengths or fewer than 2 periods)
 */
function computeRSquared(portfolioReturns: number[], benchmarkReturns: number[]): number {
  if (portfolioReturns.length !== benchmarkReturns.length || portfolioReturns.length < 2) {
    throw new Error('Invalid input: Both arrays must have the same length of at least 2 periods.');
  }

  const n = portfolioReturns.length;
  const x = benchmarkReturns; // benchmark returns
  const y = portfolioReturns; // portfolio returns

  const xMean = x.reduce((sum, val) => sum + val, 0) / n;
  const yMean = y.reduce((sum, val) => sum + val, 0) / n;

  let sumXY = 0;
  let sumXX = 0;
  let sumYY = 0;

  for (let i = 0; i < n; i++) {
    const dx = x[i] - xMean;
    const dy = y[i] - yMean;
    sumXY += dx * dy;
    sumXX += dx * dx;
    sumYY += dy * dy;
  }

  if (sumXX === 0 || sumYY === 0) {
    return 0; // No variation in benchmark or portfolio
  }

  return (sumXY * sumXY) / (sumXX * sumYY);
}

export function calculateResult(inputs: RSquaredCalculatorInputs): number {
  // Validate inputs for investment context (returns should be in decimal or percentage, but formula is scale-invariant)
  const { portfolioReturns, benchmarkReturns } = inputs;

  // Ensure returns are numbers; in production, add more validation (e.g., no NaN)
  if (!Array.isArray(portfolioReturns) || !Array.isArray(benchmarkReturns)) {
    throw new Error('Inputs must be arrays of numbers representing periodic returns.');
  }

  const rSquared = computeRSquared(portfolioReturns, benchmarkReturns);
  return Math.max(0, Math.min(1, rSquared)); // Clamp to [0,1] for numerical stability
}

export function generateAnalysis(
  inputs: RSquaredCalculatorInputs,
  metrics: RSquaredCalculatorMetrics
): RSquaredCalculatorAnalysis {
  const result = metrics.result; // R-squared value (0 to 1)

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  let recommendation = '';

  // Investment-specific logic: R-squared assesses systematic vs. unsystematic risk exposure
  // High R² (>0.8): High systematic (market) risk, portfolio behaves like benchmark
  // Medium R² (0.5-0.8): Balanced, some manager skill or sector tilt
  // Low R² (<0.5): Low systematic risk, higher unsystematic risk (potential for alpha but volatile)

  if (result >= 0.8) {
    riskLevel = 'High';
    recommendation = `Your portfolio's R-squared of ${result.toFixed(4)} indicates ${Math.round(result * 100)}% of its variance is explained by the benchmark, suggesting strong market correlation and high systematic risk exposure. This is suitable for passive strategies but may limit diversification benefits. Consider adding assets with lower correlation if seeking reduced market risk.`;
  } else if (result >= 0.5) {
    riskLevel = 'Medium';
    recommendation = `With an R-squared of ${result.toFixed(4)}, approximately ${Math.round(result * 100)}% of your portfolio's movements align with the benchmark, reflecting moderate systematic risk. This balance allows for some active management potential while maintaining market exposure. Monitor for style drifts that could alter this correlation.`;
  } else {
    riskLevel = 'Low';
    recommendation = `The R-squared value of ${result.toFixed(4)} shows only ${Math.round(result * 100)}% of portfolio variance tied to the benchmark, indicating low systematic risk but potentially higher unsystematic risk from individual holdings. This could signal effective diversification or concentrated bets—review for unintended volatility and ensure alignment with your risk tolerance.`;
  }

  return { recommendation, riskLevel };
}
```