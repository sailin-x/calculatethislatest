```typescript
import { CommoditiesFuturesProfitabilityCalculatorInputs, CommoditiesFuturesProfitabilityCalculatorMetrics, CommoditiesFuturesProfitabilityCalculatorAnalysis } from './types';

export function calculateResult(inputs: CommoditiesFuturesProfitabilityCalculatorInputs): number {
  const { positionType, entryPrice, exitPrice, numberOfContracts, contractMultiplier, commissionPerContract } = inputs;

  // Direction: 1 for Long (profit if exit > entry), -1 for Short (profit if exit < entry)
  const direction = positionType === 'Long' ? 1 : -1;

  // Price difference adjusted for direction
  const priceDifference = direction * (exitPrice - entryPrice);

  // Gross profit before commissions
  const grossProfit = priceDifference * contractMultiplier * numberOfContracts;

  // Total commissions (assuming commissionPerContract is round-trip cost per contract)
  const totalCommission = commissionPerContract * numberOfContracts;

  // Net profit/loss
  const netProfit = grossProfit - totalCommission;

  return netProfit;
}

export function generateAnalysis(
  inputs: CommoditiesFuturesProfitabilityCalculatorInputs,
  metrics: CommoditiesFuturesProfitabilityCalculatorMetrics
): CommoditiesFuturesProfitabilityCalculatorAnalysis {
  const result = metrics.result;
  const { entryPrice, exitPrice, numberOfContracts, initialMarginPerContract } = inputs;

  // Calculate ROI if margin data is available
  const totalMargin = initialMarginPerContract * numberOfContracts;
  const roi = totalMargin > 0 ? (result / totalMargin) * 100 : 0;

  // Proxy for risk: absolute percentage price change (volatility indicator)
  const percentageChange = entryPrice > 0 ? Math.abs(exitPrice - entryPrice) / entryPrice * 100 : 0;

  // Determine risk level based on price volatility
  let riskLevel: 'Low' | 'Medium' | 'High';
  if (percentageChange < 5) {
    riskLevel = 'Low';
  } else if (percentageChange < 15) {
    riskLevel = 'Medium';
  } else {
    riskLevel = 'High';
  }

  // Generate recommendation based on profitability and ROI
  let recommendation: string;
  if (result > 0) {
    recommendation = `Profitable trade with ${roi.toFixed(2)}% return on margin.`;
  } else if (result < 0) {
    recommendation = `Loss-making trade with ${roi.toFixed(2)}% return on margin. Improve entry/exit strategy or risk controls.`;
  } else {
    recommendation = `Break-even trade with 0% return on margin.`;
  }

  // Append risk-specific advice
  if (riskLevel === 'High') {
    recommendation += ' High volatility detected—consider stop-loss orders for future trades.';
  } else if (riskLevel === 'Medium') {
    recommendation += ' Moderate volatility—monitor market conditions closely.';
  }

  return { recommendation, riskLevel };
}
```