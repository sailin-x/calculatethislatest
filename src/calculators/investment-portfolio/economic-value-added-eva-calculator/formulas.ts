```typescript
import { 
  EconomicValueAddedCalculatorInputs, 
  EconomicValueAddedCalculatorMetrics, 
  EconomicValueAddedCalculatorAnalysis 
} from './types';

/**
 * Calculates the Economic Value Added (EVA).
 * Formula: EVA = NOPAT - (WACC * Capital Employed)
 * 
 * @param inputs - The input values for the EVA calculation.
 * @returns The computed EVA value.
 */
export function calculateResult(inputs: EconomicValueAddedCalculatorInputs): number {
  const { nopat, wacc, capitalEmployed } = inputs;
  
  // Ensure WACC is treated as a decimal (e.g., 0.10 for 10%)
  const costOfCapital = wacc * capitalEmployed;
  
  return nopat - costOfCapital;
}

/**
 * Generates an analysis for the EVA calculation, including a recommendation and risk level.
 * 
 * @param inputs - The input values used in the calculation.
 * @param metrics - The computed metrics, including the EVA result.
 * @returns An analysis object with recommendation and risk level.
 */
export function generateAnalysis(
  inputs: EconomicValueAddedCalculatorInputs, 
  metrics: EconomicValueAddedCalculatorMetrics
): EconomicValueAddedCalculatorAnalysis {
  const result = metrics.result;
  const { capitalEmployed } = inputs;
  
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  
  // Risk assessment: Normalize EVA relative to capital employed for context
  // Positive EVA: Low risk (value creation)
  // EVA between -5% and 0% of capital: Medium risk (minor value destruction)
  // EVA < -5% of capital: High risk (significant value destruction)
  const evaPercentage = result / capitalEmployed;
  
  if (result > 0) {
    riskLevel = 'Low';
  } else if (evaPercentage > -0.05) {
    riskLevel = 'Medium';
  } else {
    riskLevel = 'High';
  }
  
  let recommendation = '';
  if (result > 0) {
    recommendation = 'Positive EVA indicates the investment is generating returns above the required cost of capital. This suggests strong value creation for shareholders. Recommendation: Hold or increase investment in this asset.';
  } else if (evaPercentage > -0.05) {
    recommendation = 'Slightly negative EVA shows minor underperformance relative to the cost of capital. Operational improvements could turn this around. Recommendation: Monitor closely and consider holding with a plan for optimization.';
  } else {
    recommendation = 'Negative EVA signals significant value destruction below the cost of capital. This may indicate inefficiencies or poor capital allocation. Recommendation: Review and potentially divest or restructure the investment.';
  }
  
  return { recommendation, riskLevel };
}
```