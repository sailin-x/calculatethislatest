```typescript
import { ForexCalculatorInputs, ForexCalculatorMetrics, ForexCalculatorAnalysis } from './types';

/**
 * Standard pip value per lot for major USD-quoted pairs (e.g., EUR/USD).
 * This is $10 per pip for a standard lot (100,000 units).
 * For other pairs, this should be adjusted based on the quote currency and current exchange rates.
 * In a full implementation, this could be calculated dynamically using pair details and rates.
 */
const STANDARD_PIP_VALUE_PER_LOT = 10;

/**
 * Calculates the risk amount in account currency based on balance and risk percentage.
 * @param balance - Account balance
 * @param riskPercent - Risk as percentage (e.g., 2 for 2%)
 * @returns Risk amount
 */
function calculateRiskAmount(balance: number, riskPercent: number): number {
  return balance * (riskPercent / 100);
}

/**
 * Main calculation for Forex Position Size.
 * Formula: positionSizeLots = (accountBalance * riskPercentage / 100) / (stopLossPips * pipValuePerLot)
 * This determines the lot size to risk exactly the specified percentage on the given stop loss.
 * Assumes standard pip value; for precision, integrate with live rates for pip value calculation.
 */
export function calculateResult(inputs: ForexCalculatorInputs): number {
  const { accountBalance, riskPercentage, stopLossPips } = inputs;

  // Input validation for production safety
  if (accountBalance <= 0) {
    throw new Error('Account balance must be greater than 0');
  }
  if (riskPercentage <= 0 || riskPercentage > 100) {
    throw new Error('Risk percentage must be between 0 and 100');
  }
  if (stopLossPips <= 0) {
    throw new Error('Stop loss in pips must be greater than 0');
  }

  const riskAmount = calculateRiskAmount(accountBalance, riskPercentage);
  const positionSizeLots = riskAmount / (stopLossPips * STANDARD_PIP_VALUE_PER_LOT);

  // Return non-negative value, rounded to 2 decimal places for lot precision
  return Math.max(0, Math.round(positionSizeLots * 100) / 100);
}

/**
 * Generates analysis and recommendation for the Forex position size calculation.
 * Assesses risk level based on common trading guidelines (e.g., <1% low risk, 1-2% medium, >2% high).
 * Provides actionable recommendation with key metrics.
 */
export function generateAnalysis(
  inputs: ForexCalculatorInputs,
  metrics: ForexCalculatorMetrics
): ForexCalculatorAnalysis {
  const { riskPercentage, accountBalance, stopLossPips } = inputs;
  const result = metrics.result;

  // Risk level assessment based on standard risk management practices
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (riskPercentage > 2) {
    riskLevel = 'High';
  } else if (riskPercentage > 1) {
    riskLevel = 'Medium';
  }

  const riskAmount = calculateRiskAmount(accountBalance, riskPercentage);
  const recommendation = `Based on your account balance of $${accountBalance.toLocaleString()}, risking ${riskPercentage}% ($${riskAmount.toFixed(2)}) with a ${stopLossPips}-pip stop loss, the recommended position size is ${result.toFixed(2)} standard lots. This setup limits potential loss to your defined risk amount. Note: This uses a standard $10/pip/lot value for USD-quoted pairs—verify pip value for your specific pair and account currency. Consider market volatility and use proper risk management.`;

  return { recommendation, riskLevel };
}
```