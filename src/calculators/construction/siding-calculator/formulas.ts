```typescript
import { SidingCalculatorInputs, SidingCalculatorMetrics, SidingCalculatorAnalysis } from './types';

// Helper function to calculate gable area for one gable (triangular area)
function calculateGableArea(base: number, height: number): number {
  return (base * height) / 2;
}

// Helper function to sum array of areas
function sumAreas(areas: number[]): number {
  return areas.reduce((sum, area) => sum + area, 0);
}

export function calculateResult(inputs: SidingCalculatorInputs): number {
  // Calculate base wall areas (assuming rectangular structure: two length walls and two width walls)
  const sideWallArea = 2 * inputs.length * inputs.wallHeight;
  const endWallArea = 2 * inputs.width * inputs.wallHeight;
  let totalWallArea = sideWallArea + endWallArea;

  // Add gable areas if provided (assuming gables on end walls, base = width)
  if (inputs.gableHeight > 0 && inputs.numGables > 0) {
    const singleGableArea = calculateGableArea(inputs.width, inputs.gableHeight);
    totalWallArea += singleGableArea * inputs.numGables;
  }

  // Subtract total openings (windows and doors)
  const totalOpenings = sumAreas(inputs.windowAreas) + sumAreas(inputs.doorAreas);
  const netWallArea = totalWallArea - totalOpenings;

  // Apply waste factor (e.g., 10% for cuts, overlaps, damage)
  const wasteMultiplier = 1 + (inputs.wasteFactor / 100);
  const totalSidingNeeded = netWallArea * wasteMultiplier;

  // Ensure non-negative result
  return Math.max(0, totalSidingNeeded);
}

export function generateAnalysis(
  inputs: SidingCalculatorInputs,
  metrics: SidingCalculatorMetrics
): SidingCalculatorAnalysis {
  const result = metrics.result;
  const totalOpenings = sumAreas(inputs.windowAreas) + sumAreas(inputs.doorAreas);
  const openingPercentage = totalOpenings / (2 * inputs.length * inputs.wallHeight + 2 * inputs.width * inputs.wallHeight) * 100;

  // Risk assessment: High if unrealistic dimensions (e.g., height > 30ft or waste > 20%), Medium if openings > 20%, Low otherwise
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (inputs.wallHeight > 30 || inputs.wasteFactor > 20 || inputs.length < 10 || inputs.width < 10) {
    riskLevel = 'High';
  } else if (openingPercentage > 20) {
    riskLevel = 'Medium';
  }

  // Recommendation based on result and inputs
  let recommendation = `Based on the provided dimensions, you will need approximately ${result.toFixed(2)} square feet of siding material. `;
  if (riskLevel === 'High') {
    recommendation += 'Warning: Input dimensions appear unrealistic (e.g., excessive height or waste factor). Consult a professional for accurate on-site measurement to avoid over- or under-estimation.';
  } else if (riskLevel === 'Medium') {
    recommendation += 'Note: High percentage of openings may require additional trim material. Verify measurements and consider local building codes.';
  } else {
    recommendation += 'This estimate includes a ${inputs.wasteFactor}% waste factor. For best results, add 5-10% extra for complex installations and source materials from a reputable supplier.';
  }

  return { recommendation, riskLevel };
}
```