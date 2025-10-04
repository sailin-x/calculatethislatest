```typescript
import { FlooringCalculatorInputs, FlooringCalculatorMetrics, FlooringCalculatorAnalysis } from './types';

/**
 * Calculates the base area of the room in square feet.
 * @param length - Room length in feet
 * @param width - Room width in feet
 * @returns The area in square feet
 */
function calculateArea(length: number, width: number): number {
  if (length <= 0 || width <= 0) {
    throw new Error('Length and width must be positive numbers');
  }
  return length * width;
}

/**
 * Applies the waste factor to the base area to get the total flooring required.
 * @param area - Base area in square feet
 * @param wastePercentage - Waste percentage (e.g., 10 for 10%)
 * @returns Total flooring needed in square feet
 */
function calculateTotalWithWaste(area: number, wastePercentage: number): number {
  if (wastePercentage < 0) {
    throw new Error('Waste percentage must be non-negative');
  }
  return area * (1 + wastePercentage / 100);
}

/**
 * Main calculation function for the Flooring Calculator.
 * Computes the total square footage of flooring material needed, including waste.
 * Formula: Total = (Length × Width) × (1 + Waste%/100)
 * @param inputs - The calculator inputs
 * @returns Total square footage required
 */
export function calculateResult(inputs: FlooringCalculatorInputs): number {
  const area = calculateArea(inputs.length, inputs.width);
  return calculateTotalWithWaste(area, inputs.wastePercentage);
}

/**
 * Generates an analysis with recommendation and risk level based on inputs and metrics.
 * Risk level is determined by waste percentage:
 * - Low: ≤15%
 * - Medium: >15% and ≤25%
 * - High: >25%
 * Recommendations include area summary and advice for large rooms (>1000 sq ft).
 * @param inputs - The calculator inputs
 * @param metrics - The computed metrics (including result)
 * @returns Analysis object with recommendation and riskLevel
 */
export function generateAnalysis(
  inputs: FlooringCalculatorInputs,
  metrics: FlooringCalculatorMetrics
): FlooringCalculatorAnalysis {
  const result = metrics.result;
  const area = calculateArea(inputs.length, inputs.width);

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (inputs.wastePercentage > 25) {
    riskLevel = 'High';
  } else if (inputs.wastePercentage > 15) {
    riskLevel = 'Medium';
  }

  let recommendation = `For a room measuring ${inputs.length} ft × ${inputs.width} ft (${area.toFixed(2)} sq ft base area) with a ${inputs.wastePercentage}% waste factor, you will need approximately ${result.toFixed(2)} sq ft of flooring material. This accounts for cuts, errors, and installation waste.`;

  if (area > 1000) {
    recommendation += ' For large areas like this, we recommend consulting a professional installer to minimize waste and ensure proper layout.';
  } else if (riskLevel !== 'Low') {
    recommendation += ` Note: Your waste factor is relatively high (${riskLevel.toLowerCase()} risk), which may indicate complex room shapes or patterns—double-check measurements.`;
  } else {
    recommendation += ' This is a standard calculation for rectangular rooms; adjust waste if your space has irregularities.';
  }

  return { recommendation, riskLevel };
}
```