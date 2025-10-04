```typescript
import { DayTradingCalculatorInputs, DayTradingCalculatorMetrics, DayTradingCalculatorAnalysis } from './types';

/**
 * Helper function to calculate the maximum position size (number of shares) based on account risk management rules.
 * Formula: shares = floor( (accountBalance * (riskPercentage / 100)) / (entryPrice - stopLossPrice) )
 * Assumes a long position (entry > stopLoss). Returns 0 for invalid inputs.
 */
function calculatePositionSize(inputs: DayTradingCalculatorInputs): number {
  const { accountBalance, riskPercentage, entryPrice, stopLossPrice } = inputs;

  // Validation for production safety
  if (
    accountBalance <= 0 ||
    riskPercentage <= 0 ||
    riskPercentage > 100 ||
    entryPrice <= 0 ||
    stopLossPrice >= entryPrice
  ) {
    return 0;
  }

  const riskAmount = accountBalance * (riskPercentage / 100);
  const lossPerShare = entryPrice - stopLossPrice;
  const maxShares = riskAmount / lossPerShare;
  return Math.floor(maxShares);
}

export function calculateResult(inputs: DayTradingCalculatorInputs): number {
  return calculatePositionSize(inputs);
}

export function generateAnalysis(
  inputs: DayTradingCalculatorInputs,
  metrics: DayTradingCalculatorMetrics
): DayTradingCalculatorAnalysis {
  const shares = metrics.result;

  // Early exit for invalid position size
  if (shares <= 0) {
    return {
      recommendation:
        'Invalid trade setup. Please verify account balance, risk percentage, entry price, and stop loss. Ensure stop loss is below entry for long positions.',
      riskLevel: 'High' as const,
    };
  }

  const { entryPrice, stopLossPrice, takeProfitPrice } = inputs;

  // Validate take profit for long position
  if (takeProfitPrice <= entryPrice) {
    return {
      recommendation:
        'Take profit price must be above entry price for long positions. Adjust and recalculate.',
      riskLevel: 'High' as const,
    };
  }

  // Calculate potentials and risk-reward ratio
  // Formulas:
  // potentialLoss = shares * (entryPrice - stopLossPrice)
  // potentialProfit = shares * (takeProfitPrice - entryPrice)
  // riskRewardRatio = potentialProfit / potentialLoss
  const lossPerShare = entryPrice - stopLossPrice;
  const profitPerShare = takeProfitPrice - entryPrice;
  const potentialLoss = shares * lossPerShare;
  const potentialProfit = shares * profitPerShare;
  const riskRewardRatio = potentialProfit / potentialLoss;

  // Risk assessment based on standard day trading guidelines (RR >= 2:1 is favorable)
  let riskLevel: 'Low' | 'Medium' | 'High' = 'High';
  let recommendation = '';

  if (riskRewardRatio >= 3) {
    riskLevel = 'Low';
    recommendation =
      'Excellent risk-reward ratio (>= 3:1). This setup aligns with strong day trading principles. Enter with the calculated position size and monitor closely.';
  } else if (riskRewardRatio >= 2) {
    riskLevel = 'Medium';
    recommendation =
      'Good risk-reward ratio (2:1 to 3:1). A solid opportunity for day trading. Proceed with the recommended shares, but confirm market conditions.';
  } else if (riskRewardRatio >= 1) {
    riskLevel = 'High';
    recommendation =
      'Marginal risk-reward ratio (1:1 to 2:1). Trade only if high conviction; consider tightening stop loss or raising take profit for better ratio.';
  } else {
    riskLevel = 'High';
    recommendation =
      'Unfavorable risk-reward ratio (< 1:1). Avoid this trade to protect capital. Adjust parameters to improve the setup.';
  }

  return { recommendation, riskLevel };
}
```