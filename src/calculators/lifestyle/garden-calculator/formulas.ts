```typescript
import { GardenCalculatorInputs, GardenCalculatorMetrics, GardenCalculatorAnalysis } from './types';

/**
 * Helper function to convert inches to feet.
 */
function inchesToFeet(inches: number): number {
  return inches / 12;
}

/**
 * Helper function to convert cubic feet to cubic yards.
 */
function cubicFeetToYards(cubicFeet: number): number {
  return cubicFeet / 27;
}

/**
 * Calculates the total estimated cost to set up a basic rectangular garden,
 * including soil and fencing. Uses real-world formulas:
 * - Area: length * width (sq ft)
 * - Perimeter: 2 * (length + width) (ft)
 * - Soil volume (ft³): area * (soilDepth / 12)
 * - Soil volume (yd³): soil volume (ft³) / 27
 * - Fence area: perimeter * fenceHeight (sq ft)
 * - Total cost: (soil yd³ * soil cost/yd³) + (fence sq ft * fence cost/sq ft)
 */
export function calculateResult(inputs: GardenCalculatorInputs): number {
  const { length, width, soilDepth, fenceHeight, soilCostPerCubicYard, fenceCostPerSquareFoot } = inputs;

  if (length <= 0 || width <= 0 || soilDepth <= 0 || fenceHeight <= 0 || soilCostPerCubicYard < 0 || fenceCostPerSquareFoot < 0) {
    throw new Error('All inputs must be positive numbers where applicable.');
  }

  const area = length * width;
  const perimeter = 2 * (length + width);
  const soilDepthFeet = inchesToFeet(soilDepth);
  const soilVolumeCubicFeet = area * soilDepthFeet;
  const soilVolumeCubicYards = cubicFeetToYards(soilVolumeCubicFeet);
  const fenceArea = perimeter * fenceHeight;
  const totalCost = (soilVolumeCubicYards * soilCostPerCubicYard) + (fenceArea * fenceCostPerSquareFoot);

  return Math.round(totalCost * 100) / 100; // Round to 2 decimal places for currency
}

/**
 * Generates an analysis for the garden setup, including a recommendation and risk level
 * based on garden size (area) and total cost. Risk level assesses maintenance/budget burden:
 * - Low: Small garden, low cost (< $200)
 * - Medium: Moderate garden (100-500 sq ft or $200-$1000)
 * - High: Large garden (>500 sq ft or >$1000), higher maintenance/cost risk
 */
export function generateAnalysis(
  inputs: GardenCalculatorInputs,
  metrics: GardenCalculatorMetrics
): GardenCalculatorAnalysis {
  const { length, width } = inputs;
  const { result: totalCost, area } = metrics;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';

  // Determine risk level based on area and cost
  if (area < 100 && totalCost < 200) {
    riskLevel = 'Low';
  } else if (area >= 100 && area <= 500 && totalCost >= 200 && totalCost <= 1000) {
    riskLevel = 'Medium';
  } else {
    riskLevel = 'High';
  }

  // Generate recommendation based on size and risk
  let recommendation: string;
  if (riskLevel === 'Low') {
    recommendation = 'This is a great starter garden! Consider EasyToGrow plants like tomatoes or herbs to maximize enjoyment with minimal effort.';
  } else if (riskLevel === 'Medium') {
    recommendation = 'A solid mid-sized garden. Plan for crop rotation and basic irrigation to manage maintenance. Budget looks reasonable—proceed with confidence.';
  } else {
    recommendation = 'This is an ambitious large garden. Ensure you have time for weeding and watering; consider adding mulch to reduce maintenance. Review budget for potential overruns.';
  }

  return { recommendation, riskLevel };
}
```