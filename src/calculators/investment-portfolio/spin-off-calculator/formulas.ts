```typescript
import { SpinOffCalculatorInputs, SpinOffCalculatorMetrics, SpinOffCalculatorAnalysis } from './types';

/**
 * Calculates the number of spin-off shares received based on parent shares owned and the distribution ratio.
 * Distribution ratio is typically the number of spin-off shares per parent share (e.g., 0.2 for 1 spin-off per 5 parent shares).
 * @param sharesOwned - Number of parent company shares owned.
 * @param distributionRatio - Spin-off shares distributed per parent share.
 * @returns Number of spin-off shares received.
 */
function calculateSpinOffShares(sharesOwned: number, distributionRatio: number): number {
  return sharesOwned * distributionRatio;
}

/**
 * Calculates the total value of the spin-off position.
 * @param spinOffShares - Number of spin-off shares received.
 * @param spinOffPrice - Estimated or initial market price per spin-off share.
 * @returns Total value of the spin-off position in the same currency as the price.
 */
function calculateSpinOffValue(spinOffShares: number, spinOffPrice: number): number {
  return spinOffShares * spinOffPrice;
}

/**
 * Calculates the PreSpinOff portfolio value for the parent position.
 * @param sharesOwned - Number of parent company shares owned.
 * @param parentPrice - Current market price per parent share.
 * @returns PreSpinOff value of the parent position.
 */
function calculatePreSpinOffValue(sharesOwned: number, parentPrice: number): number {
  return sharesOwned * parentPrice;
}

/**
 * Calculates the percentage of the PreSpinOff portfolio value that the spin-off represents.
 * This helps assess concentration risk in the portfolio PostSpinOff.
 * @param spinOffValue - Value of the spin-off position.
 * @param preSpinOffValue - PreSpinOff value of the parent position.
 * @returns Percentage as a number (e.g., 12.5 for 12.5%).
 */
function calculateSpinOffPercentage(spinOffValue: number, preSpinOffValue: number): number {
  if (preSpinOffValue === 0) return 0;
  return (spinOffValue / preSpinOffValue) * 100;
}

export function calculateResult(inputs: SpinOffCalculatorInputs): number {
  // Real investment-portfolio calculation: Estimate the value of the spin-off shares received
  // in a corporate spin-off event, which adds a new position to the portfolio without cost to the shareholder.
  // This uses the distribution ratio to determine shares received and multiplies by the estimated initial price.
  const spinOffShares = calculateSpinOffShares(inputs.sharesOwned, inputs.distributionRatio);
  const spinOffValue = calculateSpinOffValue(spinOffShares, inputs.spinOffPrice);
  return spinOffValue;
}

export function generateAnalysis(
  inputs: SpinOffCalculatorInputs,
  metrics: SpinOffCalculatorMetrics
): SpinOffCalculatorAnalysis {
  const result = metrics.result; // Spin-off value
  const preSpinOffValue = calculatePreSpinOffValue(inputs.sharesOwned, inputs.parentPrice);
  const percentage = calculateSpinOffPercentage(result, preSpinOffValue);

  // InvestmentPortfolioSpecific risk assessment: Spin-offs introduce concentration risk
  // based on their size relative to the existing parent position. Spin-offs historically outperform
  // (e.g., +20-30% alpha per studies like Greenblatt's), but volatility is higher if >15% allocation.
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (percentage < 5) {
    riskLevel = 'Low';
  } else if (percentage < 15) {
    riskLevel = 'Medium';
  } else {
    riskLevel = 'High';
  }

  // Domain-specific recommendation: Consider historical outperformance of spin-offs but advise on diversification
  // if the new position creates imbalance. Assume a BuyAndHold strategy unless concentrated.
  let recommendation: string;
  if (percentage > 15) {
    recommendation = 'The spin-off creates a significant new position (>15% of parent value); consider trimming to maintain portfolio balance and reduce sector-specific risk, despite spin-offs\' historical outperformance.';
  } else if (percentage > 5) {
    recommendation = 'The spin-off adds a moderate position; hold and monitor, as spin-offs often deliver alpha through unlocked value and focused management.';
  } else {
    recommendation = 'The spin-off is a minor addition; retain in the portfolio for potential upside, given empirical evidence of spin-off premiums in the market.';
  }

  return { recommendation, riskLevel };
}
```