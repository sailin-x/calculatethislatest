```typescript
import { DividendCalculatorInputs, DividendCalculatorMetrics, DividendCalculatorAnalysis } from './types';

/**
 * Calculates the dividend yield percentage.
 * Formula: (annualDividendPerShare / currentStockPrice) * 100
 * Returns 0 if currentStockPrice is zero or invalid to avoid division by zero.
 */
function calculateDividendYield(annualDividendPerShare: number, currentStockPrice: number): number {
  return currentStockPrice > 0 ? (annualDividendPerShare / currentStockPrice) * 100 : 0;
}

/**
 * Primary calculation for the Dividend Calculator.
 * Computes the expected annual dividend income.
 * Formula: numberOfShares * annualDividendPerShare
 * This assumes annualDividendPerShare is provided as an annual figure.
 * Handles edge cases where inputs are zero or negative by returning 0 (no income).
 */
export function calculateResult(inputs: DividendCalculatorInputs): number {
  const { numberOfShares, annualDividendPerShare } = inputs;
  
  // Ensure non-negative values for realistic financial calculation
  const shares = Math.max(0, numberOfShares);
  const dividend = Math.max(0, annualDividendPerShare);
  
  return shares * dividend;
}

/**
 * Generates a financial analysis and recommendation for the dividend investment.
 * Uses the calculated result (annual dividend income) and inputs to derive additional metrics like yield.
 * Risk level is assessed based on dividend yield:
 * - Low: Yield < 2% (conservative, potentially growth-oriented)
 * - Medium: 2% <= Yield < 5% (balanced income)
 * - High: Yield >= 5% (higher income but potential sustainability risk)
 * Recommendation provides actionable insights based on yield and income relative to a simple benchmark.
 */
export function generateAnalysis(
  inputs: DividendCalculatorInputs, 
  metrics: DividendCalculatorMetrics
): DividendCalculatorAnalysis {
  const result = metrics.result; // Annual dividend income
  const { annualDividendPerShare, currentStockPrice } = inputs;
  
  const yieldPercentage = calculateDividendYield(annualDividendPerShare, currentStockPrice);
  
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (yieldPercentage >= 5) {
    riskLevel = 'High';
  } else if (yieldPercentage >= 2) {
    riskLevel = 'Medium';
  } // Otherwise, remains 'Low'
  
  let recommendation: string;
  if (yieldPercentage >= 5) {
    recommendation = `High yield (${yieldPercentage.toFixed(2)}%) suggests strong income potential, but monitor for dividend sustainability risks. Annual income: $${result.toFixed(2)}. Consider diversification.`;
  } else if (yieldPercentage >= 2) {
    recommendation = `Moderate yield (${yieldPercentage.toFixed(2)}%) offers balanced income. Annual income: $${result.toFixed(2)}. Suitable for income-focused portfolios.`;
  } else {
    recommendation = `Low yield (${yieldPercentage.toFixed(2)}%) indicates conservative or growth stock. Annual income: $${result.toFixed(2)}. May require higher share allocation for meaningful income.`;
  }
  
  return { recommendation, riskLevel };
}
```