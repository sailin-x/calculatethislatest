```typescript
import { CAPMCalculatorInputs, CAPMCalculatorMetrics, CAPMCalculatorAnalysis } from './types';

export function calculateResult(inputs: CAPMCalculatorInputs): number {
  const { riskFreeRate, beta, marketReturn } = inputs;
  
  // Convert percentages to decimals for calculation
  const rf = riskFreeRate / 100;
  const rm = marketReturn / 100;
  
  // CAPM formula: E(R_i) = R_f + β_i * (E(R_m) - R_f)
  const expectedReturnDecimal = rf + beta * (rm - rf);
  
  // Return as percentage for user-friendly output
  return expectedReturnDecimal * 100;
}

export function generateAnalysis(inputs: CAPMCalculatorInputs, metrics: CAPMCalculatorMetrics): CAPMCalculatorAnalysis {
  const result = metrics.result;
  const { beta } = inputs;
  
  // Determine risk level based on beta (standard interpretation: <1 low/systematic risk below market, 1-1.5 medium, >1.5 high)
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (beta < 1) {
    riskLevel = 'Low';
  } else if (beta < 1.5) {
    riskLevel = 'Medium';
  } else {
    riskLevel = 'High';
  }

  // Generate recommendation based on expected return and beta
  let recommendation: string;
  if (riskLevel === 'Low') {
    recommendation = `The calculated expected return is ${result.toFixed(2)}%. With a beta of ${beta.toFixed(2)} (<1), this asset has lower systematic risk than the market, suitable for conservative investors seeking stable returns.`;
  } else if (riskLevel === 'Medium') {
    recommendation = `The calculated expected return is ${result.toFixed(2)}%. With a beta of ${beta.toFixed(2)} (around market level), this asset aligns with market risk, appropriate for balanced portfolios.`;
  } else {
    recommendation = `The calculated expected return is ${result.toFixed(2)}%. With a beta of ${beta.toFixed(2)} (>1.5), this asset carries higher systematic risk, ideal for aggressive investors tolerant of volatility for potentially higher rewards.`;
  }

  return { recommendation, riskLevel };
}
```