```typescript
import { StockCalculatorInputs, StockCalculatorMetrics, StockCalculatorAnalysis } from './types';

/**
 * Calculates the compound growth for a stock investment using the formula:
 * Future Value = Principal * (1 + annualReturnRate)^years
 * This is a standard formula for projecting stock portfolio growth assuming constant annual returns.
 */
function calculateCompoundFutureValue(principal: number, annualReturnRate: number, years: number): number {
  if (years <= 0 || principal <= 0 || annualReturnRate < -1) {
    throw new Error('Invalid inputs: principal and years must be positive, rate must be >= -100%');
  }
  return principal * Math.pow(1 + annualReturnRate, years);
}

/**
 * Calculates the total return percentage for the investment.
 * Formula: ((Future Value - Principal) / Principal) * 100
 */
function calculateTotalReturnPercentage(futureValue: number, principal: number): number {
  return ((futureValue - principal) / principal) * 100;
}

/**
 * Calculates the effective annual return percentage (input rate * 100).
 * Used for metrics and analysis.
 */
function calculateAnnualReturnPercentage(annualReturnRate: number): number {
  return annualReturnRate * 100;
}

export function calculateResult(inputs: StockCalculatorInputs): number {
  // Validate inputs for production readiness
  if (inputs.investmentAmount <= 0 || inputs.expectedAnnualReturn < -1 || inputs.years <= 0) {
    throw new Error('Invalid inputs for stock calculator: investmentAmount and years must be positive, expectedAnnualReturn must be >= -100%');
  }

  // Core calculation: Future value of stock investment using compound growth formula
  const futureValue = calculateCompoundFutureValue(
    inputs.investmentAmount,
    inputs.expectedAnnualReturn,
    inputs.years
  );

  return futureValue;
}

export function generateAnalysis(
  inputs: StockCalculatorInputs,
  metrics: StockCalculatorMetrics
): StockCalculatorAnalysis {
  const principal = inputs.investmentAmount;
  const futureValue = metrics.result;
  const annualReturnPct = calculateAnnualReturnPercentage(inputs.expectedAnnualReturn);
  const totalReturnPct = calculateTotalReturnPercentage(futureValue, principal);

  // Risk level assessment based on expected annual return (stock-specific thresholds):
  // Historical stock market avg ~7-10%; >15% indicates high-risk growth stocks; <5% low-risk (e.g., blue-chip)
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Medium';
  if (annualReturnPct < 5) {
    riskLevel = 'Low';
  } else if (annualReturnPct > 15) {
    riskLevel = 'High';
  }

  // Recommendation based on projected total return and risk (investment-portfolio logic)
  let recommendation: string;
  if (totalReturnPct > 100 && riskLevel === 'Low') {
    recommendation = 'Strongly recommended for conservative portfolio allocation; excellent long-term growth with minimal risk.';
  } else if (totalReturnPct > 50 && riskLevel === 'Medium') {
    recommendation = 'Suitable for balanced portfolios; monitor market conditions for optimal entry.';
  } else if (riskLevel === 'High') {
    recommendation = 'High-risk, high-reward opportunity; allocate only 5-10% of portfolio and diversify.';
  } else if (totalReturnPct < 20) {
    recommendation = 'Consider lower-return alternatives like bonds; limited upside for stock exposure.';
  } else {
    recommendation = 'Moderate potential; suitable for diversified stock holdings in a growth-oriented portfolio.';
  }

  return { recommendation, riskLevel };
}
```