```typescript
import { WACCCalculatorInputs, WACCCalculatorMetrics, WACCCalculatorAnalysis } from './types';

/**
 * Helper function to calculate the total firm value (V = E + D).
 * This is a core component in WACC computation for investment valuation.
 */
function calculateTotalValue(inputs: WACCCalculatorInputs): number {
  return inputs.marketValueOfEquity + inputs.marketValueOfDebt;
}

/**
 * Helper function to calculate the after-tax cost of debt.
 * Accounts for the tax shield benefit in corporate finance.
 */
function calculateAfterTaxCostOfDebt(inputs: WACCCalculatorInputs): number {
  return inputs.costOfDebt * (1 - inputs.taxRate);
}

/**
 * Helper function to compute equity and debt weights.
 * Ensures weights sum to 1 for accurate capital structure representation.
 */
function calculateWeights(inputs: WACCCalculatorInputs): { equityWeight: number; debtWeight: number } {
  const totalValue = calculateTotalValue(inputs);
  if (totalValue === 0) {
    return { equityWeight: 0, debtWeight: 0 };
  }
  return {
    equityWeight: inputs.marketValueOfEquity / totalValue,
    debtWeight: inputs.marketValueOfDebt / totalValue,
  };
}

export function calculateResult(inputs: WACCCalculatorInputs): number {
  // Validate inputs to prevent division by zero or invalid rates
  if (inputs.marketValueOfEquity < 0 || inputs.marketValueOfDebt < 0 || inputs.costOfEquity < 0 || inputs.costOfDebt < 0 || inputs.taxRate < 0 || inputs.taxRate > 1) {
    throw new Error('Invalid input values: All values must be non-negative, and tax rate must be between 0 and 1.');
  }

  const totalValue = calculateTotalValue(inputs);
  if (totalValue === 0) {
    return 0; // No capital structure, WACC is undefined but return 0 for edge case
  }

  const { equityWeight, debtWeight } = calculateWeights(inputs);
  const afterTaxCostOfDebt = calculateAfterTaxCostOfDebt(inputs);

  // WACC formula: (E/V * Re) + (D/V * Rd * (1 - Tc))
  const wacc = (equityWeight * inputs.costOfEquity) + (debtWeight * afterTaxCostOfDebt);
  return wacc;
}

export function generateAnalysis(inputs: WACCCalculatorInputs, metrics: WACCCalculatorMetrics): WACCCalculatorAnalysis {
  const result = metrics.result;
  const { equityWeight, debtWeight } = calculateWeights(inputs);

  // Investment-portfolio-specific risk assessment:
  // WACC reflects the blended cost of capital; higher WACC indicates higher hurdle rate for investments,
  // potentially signaling higher risk in the portfolio's financing structure.
  // Thresholds based on typical corporate finance benchmarks (e.g., low < 8%, medium 8-12%, high >12%).
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (result > 0.12) {
    riskLevel = 'High';
  } else if (result > 0.08) {
    riskLevel = 'Medium';
  }

  // Recommendation logic: Consider capital structure balance and WACC implications for portfolio decisions.
  // High debt weighting may increase risk if WACC is elevated; suggest optimization for investment attractiveness.
  let recommendation: string;
  if (debtWeight > 0.5 && riskLevel === 'High') {
    recommendation = 'High debt weighting contributes to elevated WACC, increasing the required return for portfolio investments. Consider deleveraging to reduce financing costs and improve investment viability.';
  } else if (result < 0.08) {
    recommendation = 'Low WACC suggests an efficient capital structure, providing a favorable hurdle rate for new investments in the portfolio. Proceed with opportunities exceeding this rate.';
  } else {
    recommendation = `The calculated WACC of ${result.toFixed(2)}% serves as the minimum required return for portfolio projects. Evaluate investment opportunities against this benchmark, focusing on equity-debt balance for risk mitigation.`;
  }

  return { recommendation, riskLevel };
}
```