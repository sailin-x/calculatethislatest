```typescript
import { CostofEquityCalculatorInputs, CostofEquityCalculatorMetrics, CostofEquityCalculatorAnalysis } from './types';

/**
 * Calculates the Cost of Equity using the Capital Asset Pricing Model (CAPM).
 * Formula: Ke = Rf + β * (Rm - Rf)
 * Where:
 * - Rf: Risk-free rate (decimal)
 * - β: Beta (stock's volatility relative to market)
 * - Rm: Expected market return (decimal)
 * 
 * Assumes inputs are provided as decimals (e.g., 3% = 0.03).
 * If inputs are percentages, they should be divided by 100 before passing.
 */
export function calculateResult(inputs: CostofEquityCalculatorInputs): number {
  const { riskFreeRate, beta, marketReturn } = inputs;
  
  // Validate inputs (basic checks for production readiness)
  if (riskFreeRate < 0 || beta < 0 || marketReturn < 0) {
    throw new Error('Input rates and beta must be non-negative.');
  }
  if (marketReturn <= riskFreeRate) {
    throw new Error('Market return must be greater than the risk-free rate.');
  }

  // CAPM formula
  const marketRiskPremium = marketReturn - riskFreeRate;
  const costOfEquity = riskFreeRate + beta * marketRiskPremium;

  return costOfEquity;
}

/**
 * Generates an analysis for the Cost of Equity calculation.
 * Assesses risk level primarily based on beta (a measure of systematic risk):
 * - Low: beta < 1 (less volatile than market)
 * - Medium: 1 <= beta <= 1.5 (market-like or moderately volatile)
 * - High: beta > 1.5 (highly volatile)
 * 
 * Provides a recommendation based on the cost of equity and risk level.
 */
export function generateAnalysis(
  inputs: CostofEquityCalculatorInputs, 
  metrics: CostofEquityCalculatorMetrics
): CostofEquityCalculatorAnalysis {
  const { beta } = inputs;
  const result = metrics.result; // Cost of equity as decimal

  // Determine risk level based on beta
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (beta >= 1 && beta <= 1.5) {
    riskLevel = 'Medium';
  } else if (beta > 1.5) {
    riskLevel = 'High';
  }

  // Convert result to percentage for readability
  const costOfEquityPercent = (result * 100).toFixed(2);

  // Generate recommendation
  let recommendation: string;
  if (riskLevel === 'Low') {
    recommendation = `The calculated cost of equity is ${costOfEquityPercent}%. With a low beta of ${beta.toFixed(2)}, this investment is less volatile than the market, suggesting a stable required return. Consider this for conservative portfolios.`;
  } else if (riskLevel === 'Medium') {
    recommendation = `The calculated cost of equity is ${costOfEquityPercent}%. A beta of ${beta.toFixed(2)} indicates market-like volatility. This is suitable for balanced portfolios, but monitor market conditions.`;
  } else {
    recommendation = `The calculated cost of equity is ${costOfEquityPercent}%. With a high beta of ${beta.toFixed(2)}, this investment carries significant market risk. Proceed with caution and ensure potential returns justify the elevated required rate.`;
  }

  return { recommendation, riskLevel };
}
```