```typescript
import { OperatingMarginCalculatorInputs, OperatingMarginCalculatorMetrics, OperatingMarginCalculatorAnalysis } from './types';

/**
 * Helper function to validate inputs for operating margin calculation.
 * Ensures revenue is positive to avoid division by zero or negative values.
 * Returns true if inputs are valid, false otherwise.
 */
function validateOperatingMarginInputs(inputs: OperatingMarginCalculatorInputs): boolean {
  return inputs.revenue > 0 && typeof inputs.operatingIncome === 'number' && typeof inputs.revenue === 'number';
}

/**
 * Helper function to calculate the operating margin percentage.
 * Formula: (Operating Income / Revenue) * 100
 * This is a core profitability metric used in investment analysis to evaluate
 * a company's operational efficiency relative to its sales, helping investors
 * assess margin stability in portfolios.
 */
function computeOperatingMargin(operatingIncome: number, revenue: number): number {
  if (revenue === 0) {
    return 0; // Avoid NaN; in production, this could trigger an error log
  }
  return (operatingIncome / revenue) * 100;
}

export function calculateResult(inputs: OperatingMarginCalculatorInputs): number {
  if (!validateOperatingMarginInputs(inputs)) {
    return 0; // Invalid inputs return 0; in production, consider throwing an error
  }

  // Real investment-portfolio calculation: Operating Margin = (Operating Income / Net Revenue) * 100
  // This metric is crucial for portfolio managers to gauge company profitability
  // excluding non-operating items like interest and taxes.
  return computeOperatingMargin(inputs.operatingIncome, inputs.revenue);
}

export function generateAnalysis(
  inputs: OperatingMarginCalculatorInputs,
  metrics: OperatingMarginCalculatorMetrics
): OperatingMarginCalculatorAnalysis {
  const result = metrics.result;

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Medium';
  let recommendation = 'Monitor operating efficiency for portfolio stability.';

  // Investment-portfolio-specific risk assessment:
  // - High margins (>15%) indicate strong operational leverage, low risk for long-term holdings.
  // - Moderate margins (5-15%) suggest balanced efficiency, medium risk with growth potential.
  // - Low margins (<5%) signal cost pressures or competitive threats, high risk for portfolio exposure.
  if (result > 15) {
    riskLevel = 'Low';
    recommendation = 'Excellent operating margin; consider increasing allocation in portfolio for stable returns.';
  } else if (result >= 5) {
    riskLevel = 'Medium';
    recommendation = 'Adequate margin; evaluate cost controls to enhance portfolio diversification benefits.';
  } else if (result >= 0) {
    riskLevel = 'High';
    recommendation = 'Low margin indicates operational risks; reduce exposure or seek margin improvement strategies in portfolio.';
  } else {
    riskLevel = 'High';
    recommendation = 'Negative margin signals losses; urgently review or divest from portfolio to mitigate downside risk.';
  }

  return { recommendation, riskLevel };
}
```