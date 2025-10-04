```typescript
import { CapitalStructureOptimizationCalculatorInputs, CapitalStructureOptimizationCalculatorMetrics, CapitalStructureOptimizationCalculatorAnalysis } from './types';

export function calculateResult(inputs: CapitalStructureOptimizationCalculatorInputs): number {
  const { debtRatio, costOfDebt, costOfEquity, taxRate } = inputs;
  
  // Ensure valid inputs (production-ready bounds checking)
  const validDebtRatio = Math.max(0, Math.min(1, debtRatio));
  const validTaxRate = Math.max(0, Math.min(1, taxRate));
  const validCostOfDebt = Math.max(0, costOfDebt);
  const validCostOfEquity = Math.max(0, costOfEquity);

  const equityRatio = 1 - validDebtRatio;
  const afterTaxCostOfDebt = validCostOfDebt * (1 - validTaxRate);
  
  // Standard WACC formula: WACC = (E/V) * Re + (D/V) * Rd * (1 - T)
  const wacc = equityRatio * validCostOfEquity + validDebtRatio * afterTaxCostOfDebt;
  
  return wacc;
}

export function generateAnalysis(
  inputs: CapitalStructureOptimizationCalculatorInputs, 
  metrics: CapitalStructureOptimizationCalculatorMetrics
): CapitalStructureOptimizationCalculatorAnalysis {
  const { debtRatio } = inputs;
  const result = metrics.result; // Current WACC

  // Determine risk level based on debt ratio (common financial guideline)
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (debtRatio > 0.6) {
    riskLevel = 'High';
  } else if (debtRatio > 0.3) {
    riskLevel = 'Medium';
  }

  // Generate recommendation based on capital structure optimization principles
  // (Trade-off theory: balance tax benefits of debt vs. financial distress costs)
  let recommendation: string;
  if (debtRatio < 0.2) {
    recommendation = `Your current debt ratio of ${debtRatio.toFixed(2)} results in a WACC of ${(result * 100).toFixed(2)}%. Consider increasing debt moderately (target 30-50%) to leverage the tax shield and lower WACC, while monitoring financial risk.`;
  } else if (debtRatio > 0.6) {
    recommendation = `Your current debt ratio of ${debtRatio.toFixed(2)} results in a WACC of ${(result * 100).toFixed(2)}% but high financial risk. Consider reducing debt to improve stability and potentially lower overall cost of capital considering distress costs.`;
  } else {
    recommendation = `Your current debt ratio of ${debtRatio.toFixed(2)} is balanced, yielding a WACC of ${(result * 100).toFixed(2)}%. This structure optimizes the trade-off between tax benefits and risk. Monitor market conditions for adjustments.`;
  }

  return { recommendation, riskLevel };
}
```