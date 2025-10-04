```typescript
import { CostofDebtCalculatorInputs, CostofDebtCalculatorMetrics, CostofDebtCalculatorAnalysis } from './types';

/**
 * Helper function to calculate the pre-tax cost of debt.
 * @param interestExpense - Annual interest expense
 * @param totalDebt - Average total debt outstanding
 * @returns Pre-tax cost of debt as a decimal (e.g., 0.05 for 5%)
 */
function calculatePreTaxCostOfDebt(interestExpense: number, totalDebt: number): number {
  if (totalDebt === 0) {
    return 0; // Avoid division by zero; in practice, handle via validation elsewhere
  }
  return interestExpense / totalDebt;
}

/**
 * Calculates the after-tax cost of debt using the standard formula:
 * After-Tax Cost of Debt = Pre-Tax Cost of Debt * (1 - Tax Rate)
 * 
 * This is the effective cost used in metrics like WACC (Weighted Average Cost of Capital).
 * 
 * @param inputs - Calculator inputs including interest expense, total debt, and tax rate
 * @returns After-tax cost of debt as a decimal (e.g., 0.04 for 4%)
 */
export function calculateResult(inputs: CostofDebtCalculatorInputs): number {
  const preTaxCost = calculatePreTaxCostOfDebt(inputs.interestExpense, inputs.totalDebt);
  const afterTaxCost = preTaxCost * (1 - inputs.taxRate);
  return afterTaxCost;
}

/**
 * Generates a financial analysis for the cost of debt calculation.
 * Assesses risk based on the after-tax cost relative to common benchmarks:
 * - Low: < 4% (favorable borrowing conditions)
 * - Medium: 4% - 7% (standard range)
 * - High: > 7% (potentially expensive debt, refinancing opportunity)
 * 
 * Provides a recommendation tailored to the investment portfolio context.
 * 
 * @param inputs - Original calculator inputs
 * @param metrics - Computed metrics including the result
 * @returns Analysis object with recommendation and risk level
 */
export function generateAnalysis(
  inputs: CostofDebtCalculatorInputs,
  metrics: CostofDebtCalculatorMetrics
): CostofDebtCalculatorAnalysis {
  const result = metrics.result; // After-tax cost of debt as decimal
  const resultPercent = (result * 100).toFixed(2); // For readable output
  const preTaxCost = calculatePreTaxCostOfDebt(inputs.interestExpense, inputs.totalDebt);
  const preTaxPercent = (preTaxCost * 100).toFixed(2);

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';

  if (result >= 0.07) {
    riskLevel = 'High';
  } else if (result >= 0.04) {
    riskLevel = 'Medium';
  } // Else Low

  let recommendation: string;

  if (riskLevel === 'High') {
    recommendation = `Your after-tax cost of debt is ${resultPercent}%, indicating potentially high borrowing costs. Consider refinancing options or debt restructuring to lower expenses and improve portfolio returns. Pre-tax cost: ${preTaxPercent}%.`;
  } else if (riskLevel === 'Medium') {
    recommendation = `Your after-tax cost of debt is ${resultPercent}%, which is within a standard range for most portfolios. Monitor interest rates and tax changes. Pre-tax cost: ${preTaxPercent}%.`;
  } else {
    recommendation = `Your after-tax cost of debt is a favorable ${resultPercent}%, supporting efficient capital structure in your investment portfolio. Pre-tax cost: ${preTaxPercent}%.`;
  }

  return { recommendation, riskLevel };
}
```