```typescript
import { FuturesCalculatorInputs, FuturesCalculatorMetrics, FuturesCalculatorAnalysis } from './types';

/**
 * Calculates the profit or loss for a futures position.
 * Formula: P/L = (exitPrice - entryPrice) * contractMultiplier * numberOfContracts for long positions,
 * or (entryPrice - exitPrice) * contractMultiplier * numberOfContracts for short positions.
 * This assumes the position is closed at exitPrice.
 */
export function calculateResult(inputs: FuturesCalculatorInputs): number {
  const { entryPrice, exitPrice, contractMultiplier, numberOfContracts, positionType } = inputs;

  // Ensure inputs are valid numbers
  if (entryPrice <= 0 || exitPrice <= 0 || contractMultiplier <= 0 || numberOfContracts <= 0) {
    throw new Error('Invalid input: Prices, multiplier, and contracts must be positive numbers.');
  }

  // Calculate price difference based on position type
  const priceDiff = positionType === 'long' ? (exitPrice - entryPrice) : (entryPrice - exitPrice);

  // P/L = priceDiff * contractMultiplier * numberOfContracts
  return priceDiff * contractMultiplier * numberOfContracts;
}

/**
 * Generates an analysis for the futures calculation, including a recommendation and risk level.
 * Risk level is determined based on the absolute percentage P/L relative to the initial contract value
 * (which approximates the percentage move in the underlying price).
 * - Low: |P/L %| <= 5%
 * - Medium: 5% < |P/L %| <= 10%
 * - High: |P/L %| > 10%
 * This is a simplified risk assessment; in production, integrate with volatility models or VaR.
 */
export function generateAnalysis(
  inputs: FuturesCalculatorInputs,
  metrics: FuturesCalculatorMetrics
): FuturesCalculatorAnalysis {
  const result = metrics.result;
  const { entryPrice, contractMultiplier, numberOfContracts } = inputs;

  // Calculate initial contract value for percentage computation
  const contractValue = entryPrice * contractMultiplier * numberOfContracts;

  // P/L percentage relative to contract value (equivalent to % price change * direction)
  const pnlPercentage = contractValue > 0 ? (result / contractValue) * 100 : 0;

  // Determine risk level based on magnitude of P/L percentage
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  const absPnlPercentage = Math.abs(pnlPercentage);
  if (absPnlPercentage > 10) {
    riskLevel = 'High';
  } else if (absPnlPercentage > 5) {
    riskLevel = 'Medium';
  }

  // Generate recommendation based on P/L outcome
  let recommendation: string;
  if (result > 0) {
    recommendation = `Profitable trade with ${pnlPercentage.toFixed(2)}% return on contract value. Consider scaling similar strategies if market conditions persist.`;
  } else if (result < 0) {
    recommendation = `Loss-making trade with ${pnlPercentage.toFixed(2)}% return on contract value. Review entry/exit timing and implement stop-losses to mitigate future risks.`;
  } else {
    recommendation = `Break-even trade at 0% return. Monitor for trending opportunities to improve profitability.`;
  }

  return { recommendation, riskLevel };
}
```