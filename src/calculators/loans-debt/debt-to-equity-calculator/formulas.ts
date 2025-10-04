```typescript
import { DebttoEquityCalculatorInputs, DebttoEquityCalculatorMetrics, DebttoEquityCalculatorAnalysis } from './types';

/**
 * Helper function to validate inputs for Debt to Equity calculation.
 * Ensures totalEquity is positive to avoid division by zero or negative ratios.
 * Returns true if inputs are valid, false otherwise.
 */
function validateDebtToEquityInputs(inputs: DebttoEquityCalculatorInputs): boolean {
  return inputs.totalDebt >= 0 && inputs.totalEquity > 0;
}

/**
 * Calculates the Debt to Equity Ratio.
 * Formula: D/E = Total Debt / Total Equity
 * This ratio measures the company's financial leverage and risk from debt financing.
 * @param inputs - Calculator inputs containing totalDebt and totalEquity.
 * @returns The D/E ratio as a number. Returns Infinity if totalEquity is zero or invalid.
 */
export function calculateResult(inputs: DebttoEquityCalculatorInputs): number {
  if (!validateDebtToEquityInputs(inputs)) {
    return Infinity; // Indicates invalid calculation due to zero or negative equity
  }

  const debtToEquityRatio = inputs.totalDebt / inputs.totalEquity;
  return Number(debtToEquityRatio.toFixed(2)); // Round to 2 decimal places for financial precision
}

/**
 * Generates a financial analysis for the Debt to Equity Ratio.
 * Assesses risk based on standard financial thresholds:
 * - Low: < 0.5 (conservative financing, low leverage risk)
 * - Medium: 0.5 to 2.0 (balanced leverage, moderate risk)
 * - High: > 2.0 (high leverage, increased bankruptcy risk)
 * Provides a recommendation tailored to loans-debt management.
 * @param inputs - Original calculator inputs.
 * @param metrics - Computed metrics including the result (D/E ratio).
 * @returns Analysis object with recommendation and riskLevel.
 */
export function generateAnalysis(
  inputs: DebttoEquityCalculatorInputs,
  metrics: DebttoEquityCalculatorMetrics
): DebttoEquityCalculatorAnalysis {
  const result = metrics.result;

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  let recommendation = '';

  if (result === Infinity || isNaN(result)) {
    riskLevel = 'High';
    recommendation = 'Invalid inputs detected (e.g., zero or negative equity). Review balance sheet data and ensure positive shareholders\' equity before proceeding with debt financing decisions.';
  } else if (result < 0.5) {
    riskLevel = 'Low';
    recommendation = 'Your Debt to Equity ratio indicates low financial leverage. This suggests a conservative capital structure with minimal reliance on debt, reducing bankruptcy risk. Consider leveraging more debt for growth opportunities if cash flows are stable.';
  } else if (result >= 0.5 && result <= 2.0) {
    riskLevel = 'Medium';
    recommendation = 'Your Debt to Equity ratio shows balanced leverage. This is typical for stable industries, but monitor interest coverage to ensure debt servicing remains sustainable. Evaluate refinancing options if interest rates decline.';
  } else {
    riskLevel = 'High';
    recommendation = 'Your Debt to Equity ratio signals high leverage and elevated financial risk. High debt levels increase vulnerability to economic downturns and interest rate hikes. Prioritize debt reduction strategies, such as asset sales or equity issuance, to improve solvency.';
  }

  return { recommendation, riskLevel };
}
```