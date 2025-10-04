```typescript
import { RoofingCalculatorInputs, RoofingCalculatorMetrics, RoofingCalculatorAnalysis } from './types';

/**
 * Calculates the pitch multiplier for roof area based on the pitch (rise over 12 inches run).
 * Formula: sqrt(1 + (pitch / 12)^2)
 * This assumes a simple gable roof approximation where total roof area = footprint area * multiplier.
 */
function getPitchMultiplier(pitch: number): number {
  return Math.sqrt(1 + Math.pow(pitch / 12, 2));
}

/**
 * Calculates the total adjusted roof area including waste factor.
 * Formula: totalArea * (1 + wasteFactor / 100)
 * Where totalArea = length * width * pitchMultiplier
 */
function getAdjustedRoofArea(inputs: RoofingCalculatorInputs): number {
  const { length, width, pitch, wasteFactor } = inputs;
  const multiplier = getPitchMultiplier(pitch);
  const totalArea = length * width * multiplier;
  return totalArea * (1 + wasteFactor / 100);
}

/**
 * Main calculation function for the Roofing Calculator.
 * Computes the total roofing cost (materials + labor) based on roof dimensions, pitch, costs per sq ft, and waste factor.
 * Formulas:
 * - Pitch multiplier: sqrt(1 + (pitch / 12)^2)
 * - Total roof area: length * width * multiplier
 * - Adjusted area: total roof area * (1 + wasteFactor / 100)
 * - Total cost: adjusted area * (materialCostPerSqFt + laborCostPerSqFt)
 * @param inputs - Roofing calculator inputs
 * @returns Total estimated cost in dollars
 */
export function calculateResult(inputs: RoofingCalculatorInputs): number {
  const { materialCostPerSqFt, laborCostPerSqFt } = inputs;
  const adjustedArea = getAdjustedRoofArea(inputs);
  return adjustedArea * (materialCostPerSqFt + laborCostPerSqFt);
}

/**
 * Generates an analysis with recommendation and risk level based on inputs and calculated metrics.
 * Risk level is determined by roof pitch (steeper pitches increase fall risk and complexity):
 * - Low: pitch <= 4/12
 * - Medium: 4/12 < pitch <= 8/12
 * - High: pitch > 8/12
 * Recommendations consider pitch steepness and total cost scale.
 * @param inputs - Roofing calculator inputs
 * @param metrics - Calculated metrics including result
 * @returns Analysis object with recommendation and riskLevel
 */
export function generateAnalysis(
  inputs: RoofingCalculatorInputs,
  metrics: RoofingCalculatorMetrics
): RoofingCalculatorAnalysis {
  const result = metrics.result;
  const { pitch } = inputs;

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (pitch > 8) {
    riskLevel = 'High';
  } else if (pitch > 4) {
    riskLevel = 'Medium';
  }

  let recommendation = 'This is a standard roofing estimate. Ensure all local building codes are followed.';
  if (pitch > 6) {
    recommendation = 'Steep pitch detected. Strongly recommend hiring certified professionals with safety equipment to mitigate fall risks.';
  }
  if (result > 20000) {
    recommendation += ' This is a large-scale project; consider financing options and multiple contractor quotes.';
  } else if (result > 10000) {
    recommendation += ' Moderate project size; get at least 3 bids for competitive pricing.';
  } else {
    recommendation += ' Small to medium project; DIY may be feasible for low-pitch roofs with experience.';
  }

  return { recommendation, riskLevel };
}
```