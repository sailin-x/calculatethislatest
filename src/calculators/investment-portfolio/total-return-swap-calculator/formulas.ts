```typescript
import { TotalReturnSwapCalculatorInputs, TotalReturnSwapMetrics, TotalReturnSwapAnalysis } from './types';

/**
 * Calculates the total return component of the swap.
 * Formula: notional * [(currentPrice - initialPrice) + totalIncome] / initialPrice
 * This represents the payment from the total return leg (for the receiver).
 */
function calculateTotalReturnPayment(inputs: TotalReturnSwapCalculatorInputs): number {
  const { notional, initialPrice, currentPrice, totalIncome } = inputs;
  if (initialPrice === 0) {
    throw new Error('Initial price cannot be zero');
  }
  const priceAppreciation = currentPrice - initialPrice;
  const totalReturnAmount = priceAppreciation + totalIncome;
  return notional * (totalReturnAmount / initialPrice);
}

/**
 * Calculates the funding leg payment.
 * Formula: notional * (liborRate + spread) * timeFraction
 * This is the payment made by the total return receiver.
 */
function calculateFundingPayment(inputs: TotalReturnSwapCalculatorInputs): number {
  const { notional, liborRate, spread, timeFraction } = inputs;
  const effectiveRate = liborRate + (spread / 100); // Assuming spread in basis points
  return notional * effectiveRate * timeFraction;
}

/**
 * Core calculation for the net payoff of the Total Return Swap for the total return receiver.
 * Net Payoff = Total Return Payment - Funding Payment
 * Positive value indicates net receipt; negative indicates net payment.
 */
export function calculateResult(inputs: TotalReturnSwapCalculatorInputs): number {
  const totalReturnPayment = calculateTotalReturnPayment(inputs);
  const fundingPayment = calculateFundingPayment(inputs);
  return totalReturnPayment - fundingPayment;
}

/**
 * Generates a detailed analysis for the Total Return Swap, including recommendation and risk level.
 * Risk level is determined based on the net return as a percentage of notional:
 * - Low: |netReturn| <= 2%
 * - Medium: 2% < |netReturn| <= 5%
 * - High: |netReturn| > 5%
 * Recommendation is based on whether the swap is profitable for the TR receiver and market conditions implied by inputs.
 */
export function generateAnalysis(
  inputs: TotalReturnSwapCalculatorInputs,
  metrics: TotalReturnSwapMetrics
): TotalReturnSwapAnalysis {
  const netPayoff = metrics.result;
  const netReturnPercentage = (netPayoff / inputs.notional) * 100;

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(netReturnPercentage) > 5) {
    riskLevel = 'High';
  } else if (Math.abs(netReturnPercentage) > 2) {
    riskLevel = 'Medium';
  }

  let recommendation: string;
  if (netPayoff > 0) {
    recommendation = `The Total Return Swap is profitable for the total return receiver with a net payoff of $${netPayoff.toFixed(2)}. Consider holding if the underlying asset's performance aligns with expectations; monitor funding rate fluctuations.`;
  } else if (netPayoff < -inputs.notional * 0.05) { // Significant loss
    recommendation = `The Total Return Swap results in a loss of $${Math.abs(netPayoff).toFixed(2)} for the total return receiver. Recommend unwinding the position to limit exposure, especially if underlying asset depreciation persists.`;
  } else {
    recommendation = `The Total Return Swap yields a neutral to minor net payoff of $${netPayoff.toFixed(2)}. Evaluate renewal based on projected asset total return versus funding costs; low activity suggested.`;
  }

  return { recommendation, riskLevel };
}
```