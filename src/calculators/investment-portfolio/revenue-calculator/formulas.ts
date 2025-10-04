```typescript
import { RevenueCalculatorInputs, RevenueCalculatorMetrics, RevenueCalculatorAnalysis } from './types';

/**
 * Helper function to calculate the income revenue from equity portion of the portfolio.
 * Formula: equityRevenue = totalPortfolioValue * equityAllocation * dividendYield
 * This uses standard investment income projection logic for dividend-paying equities.
 */
function calculateEquityRevenue(inputs: RevenueCalculatorInputs): number {
  return inputs.totalPortfolioValue * inputs.equityAllocation * inputs.dividendYield;
}

/**
 * Helper function to calculate the income revenue from fixed-income portion of the portfolio.
 * Formula: fixedIncomeRevenue = totalPortfolioValue * fixedIncomeAllocation * interestRate
 * This applies the standard yield-to-maturity approximation for bond interest revenue.
 */
function calculateFixedIncomeRevenue(inputs: RevenueCalculatorInputs): number {
  return inputs.totalPortfolioValue * inputs.fixedIncomeAllocation * inputs.interestRate;
}

/**
 * Helper function to calculate the effective portfolio yield.
 * Formula: effectiveYield = totalRevenue / totalPortfolioValue
 * This is a key metric in portfolio income analysis for assessing overall income generation efficiency.
 */
function calculateEffectiveYield(inputs: RevenueCalculatorInputs, totalRevenue: number): number {
  return totalRevenue / inputs.totalPortfolioValue;
}

/**
 * Calculates the total annual revenue (income) from the investment portfolio.
 * Uses real investment portfolio income logic: sums revenue from equity dividends and fixed-income interest.
 * Assumes allocations sum to 1.0; other asset classes (e.g., alternatives) are not included for simplicity.
 * Returns the total projected annual revenue in the same currency as totalPortfolioValue.
 */
export function calculateResult(inputs: RevenueCalculatorInputs): number {
  if (inputs.totalPortfolioValue <= 0 || inputs.equityAllocation < 0 || inputs.fixedIncomeAllocation < 0 ||
      inputs.equityAllocation + inputs.fixedIncomeAllocation > 1.0) {
    throw new Error('Invalid inputs: Portfolio value must be positive, allocations must be non-negative and sum to <= 1.0');
  }

  const equityRevenue = calculateEquityRevenue(inputs);
  const fixedIncomeRevenue = calculateFixedIncomeRevenue(inputs);
  const totalRevenue = equityRevenue + fixedIncomeRevenue;

  return totalRevenue;
}

/**
 * Generates a detailed analysis for the Revenue Calculator, including recommendation and risk level.
 * Risk level is determined by equity allocation (higher equity = higher risk due to volatility in dividend income).
 * Recommendation is based on effective yield relative to a conservative benchmark (e.g., 4% for balanced portfolios)
 * and total revenue sustainability in an investment context.
 * Uses portfolio metrics to provide actionable insights.
 */
export function generateAnalysis(
  inputs: RevenueCalculatorInputs,
  metrics: RevenueCalculatorMetrics
): RevenueCalculatorAnalysis {
  const totalRevenue = metrics.result;
  const effectiveYield = calculateEffectiveYield(inputs, totalRevenue);

  // Risk assessment: Based on equity allocation, standard in portfolio theory (equities introduce market risk to income)
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (inputs.equityAllocation > 0.6) {
    riskLevel = 'High'; // High equity exposure risks dividend cuts in downturns
  } else if (inputs.equityAllocation > 0.3) {
    riskLevel = 'Medium'; // Moderate equity balances growth and stability
  } else {
    riskLevel = 'Low'; // Conservative, fixed-income dominant for stable revenue
  }

  // Recommendation logic: Compare effective yield to a 4% sustainable withdrawal benchmark (common in retirement portfolio planning)
  let recommendation: string;
  if (effectiveYield >= 0.04) {
    recommendation = `Your portfolio generates a strong annual revenue of $${totalRevenue.toFixed(2)}, with an effective yield of ${(effectiveYield * 100).toFixed(2)}%. This supports sustainable income; consider maintaining diversification to mitigate ${riskLevel.toLowerCase()} risk.`;
  } else if (effectiveYield >= 0.02) {
    recommendation = `Annual revenue of $${totalRevenue.toFixed(2)} provides moderate income at ${(effectiveYield * 100).toFixed(2)}% yield. To enhance revenue, explore increasing high-yield fixed-income allocations while monitoring ${riskLevel.toLowerCase()} exposure.`;
  } else {
    recommendation = `Projected revenue of $${totalRevenue.toFixed(2)} is low at ${(effectiveYield * 100).toFixed(2)}% yield. Recommend reallocating to higher-yielding assets or supplementing with additional contributions to achieve better income stability, given ${riskLevel.toLowerCase()} profile.`;
  }

  return { recommendation, riskLevel };
}
```