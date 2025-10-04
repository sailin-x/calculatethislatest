```typescript
import { CreditDefaultSwapCalculatorInputs, CreditDefaultSwapCalculatorMetrics, CreditDefaultSwapCalculatorAnalysis } from './types';

/**
 * Calculates the implied cumulative probability of default (PD) from the CDS spread
 * using the constant hazard rate model.
 * 
 * Formula:
 * λ = (spread / 10000) / (1 - recoveryRate)  // hazard rate
 * PD = 1 - exp(-λ * tenor)  // cumulative PD over tenor
 * 
 * @param inputs - CDS calculator inputs
 * @returns Cumulative PD as a decimal (0 to 1)
 */
export function calculateResult(inputs: CreditDefaultSwapCalculatorInputs): number {
  const decimalSpread = inputs.spread / 10000;
  const lgd = 1 - inputs.recoveryRate;
  const lambda = decimalSpread / lgd;  // Implied constant hazard rate
  const cumulativePD = 1 - Math.exp(-lambda * inputs.tenor);
  return cumulativePD;
}

/**
 * Generates a risk analysis and recommendation based on the implied PD.
 * 
 * Risk levels:
 * - Low: PD < 1%
 * - Medium: 1% <= PD < 5%
 * - High: PD >= 5%
 * 
 * @param inputs - Original inputs
 * @param metrics - Computed metrics including result (PD)
 * @returns Analysis object with recommendation and risk level
 */
export function generateAnalysis(
  inputs: CreditDefaultSwapCalculatorInputs,
  metrics: CreditDefaultSwapCalculatorMetrics
): CreditDefaultSwapCalculatorAnalysis {
  const pd = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';

  if (pd < 0.01) {
    riskLevel = 'Low';
  } else if (pd < 0.05) {
    riskLevel = 'Medium';
  } else {
    riskLevel = 'High';
  }

  const pdPercent = (pd * 100).toFixed(2);
  const recommendation = `The CDS implies a cumulative probability of default of ${pdPercent}% over the ${inputs.tenor}-year tenor, assuming a recovery rate of ${(inputs.recoveryRate * 100).toFixed(0)}%. This indicates ${riskLevel.toLowerCase()} credit risk. Consider hedging if holding the underlying exposure, or selling protection if risk is overstated.`;

  return {
    recommendation,
    riskLevel,
  };
}
```