```typescript
import { 
  FuturesTradingProfitabilityCalculatorInputs, 
  FuturesTradingProfitabilityCalculatorMetrics, 
  FuturesTradingProfitabilityCalculatorAnalysis 
} from './types';

/**
 * Calculates the net profit or loss for a futures trade.
 * Formula:
 * - Price difference: (exitPrice - entryPrice) for long positions, (entryPrice - exitPrice) for short positions.
 * - Gross profit: numberOfContracts * contractMultiplier * priceDifference.
 * - Net profit: grossProfit - (commissionPerContract * numberOfContracts * 2) for round-trip commissions.
 * 
 * Assumes valid positive inputs; does not handle invalid cases like negative contracts.
 */
export function calculateResult(inputs: FuturesTradingProfitabilityCalculatorInputs): number {
  const { 
    entryPrice, 
    exitPrice, 
    numberOfContracts, 
    contractMultiplier, 
    isLong, 
    commissionPerContract = 0 
  } = inputs;

  if (entryPrice <= 0 || exitPrice < 0 || numberOfContracts <= 0 || contractMultiplier <= 0) {
    return 0; // Safeguard for invalid inputs, though types should prevent this
  }

  const priceDifference = isLong ? (exitPrice - entryPrice) : (entryPrice - exitPrice);
  const grossProfit = numberOfContracts * contractMultiplier * priceDifference;
  const totalCommission = commissionPerContract * numberOfContracts * 2; // Round-trip (entry + exit)

  return grossProfit - totalCommission;
}

/**
 * Generates a profitability analysis for the futures trade.
 * - Computes ROI if initialMarginPerContract is provided (ROI = (netProfit / totalMargin) * 100).
 * - Recommendation based on profitability and ROI.
 * - Risk level based on price volatility (percentage change) and inherent futures leverage:
 *   - Low: < 2% price change (rare in futures, but possible in stable markets).
 *   - Medium: 2-10% price change.
 *   - High: >10% price change (common in volatile futures).
 * 
 * Futures trading is inherently high-risk due to leverage; this assessment reflects trade-specific volatility.
 */
export function generateAnalysis(
  inputs: FuturesTradingProfitabilityCalculatorInputs, 
  metrics: FuturesTradingProfitabilityCalculatorMetrics
): FuturesTradingProfitabilityCalculatorAnalysis {
  const { result: netProfit } = metrics;
  const { 
    entryPrice, 
    exitPrice, 
    numberOfContracts, 
    isLong, 
    initialMarginPerContract = 0 
  } = inputs;

  // Compute percentage price change for risk assessment (absolute for volatility)
  const priceChangePercent = Math.abs((exitPrice - entryPrice) / entryPrice) * 100;
  const totalMargin = initialMarginPerContract * numberOfContracts;

  // Compute ROI if margin data available
  const roi = totalMargin > 0 ? (netProfit / totalMargin) * 100 : 0;

  // Risk level determination
  let riskLevel: 'Low' | 'Medium' | 'High' = 'High'; // Default for futures leverage
  if (priceChangePercent < 2) {
    riskLevel = 'Low';
  } else if (priceChangePercent <= 10) {
    riskLevel = 'Medium';
  }

  // Recommendation logic
  let recommendation: string;
  if (netProfit > 0) {
    if (roi > 20) {
      recommendation = `Highly profitable trade with ${roi.toFixed(2)}% ROI. Consider scaling similar strategies in low-volatility conditions.`;
    } else if (roi > 0) {
      recommendation = `Profitable trade yielding $${netProfit.toFixed(2)} (${roi.toFixed(2)}% ROI). Monitor for consistent positive outcomes.`;
    } else {
      recommendation = `Marginal profit of $${netProfit.toFixed(2)}. Review commission impact and refine entry/exit timing.`;
    }
  } else if (netProfit === 0) {
    recommendation = `Break-even trade. Evaluate if commissions justify the risk; consider tighter stop-losses.`;
  } else {
    const lossAmount = Math.abs(netProfit);
    if (roi < -20) {
      recommendation = `Significant loss of $${lossAmount.toFixed(2)} (${roi.toFixed(2)}% ROI). High risk detected—reassess position sizing and market analysis.`;
    } else {
      recommendation = `Loss of $${lossAmount.toFixed(2)} (${roi.toFixed(2)}% ROI). Analyze trade signals and implement risk management to avoid recurrence.`;
    }
  }

  // Append general futures advice
  recommendation += ` Note: Futures trading involves substantial risk of loss and is not suitable for all investors. ${riskLevel} volatility observed.`;

  return { 
    recommendation, 
    riskLevel 
  };
}
```