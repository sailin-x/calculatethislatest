```typescript
import { BrickCalculatorInputs, BrickCalculatorMetrics, BrickCalculatorAnalysis } from './types';

/**
 * Calculates the effective brick dimensions including mortar joints.
 * @param brickLength - Length of a single brick (in consistent units, e.g., feet)
 * @param brickHeight - Height of a single brick (in consistent units, e.g., feet)
 * @param mortarThickness - Thickness of mortar joint (in consistent units, e.g., feet)
 * @returns Object with effective length and height including mortar
 */
function getEffectiveBrickDimensions(
  brickLength: number,
  brickHeight: number,
  mortarThickness: number
): { effectiveLength: number; effectiveHeight: number } {
  return {
    effectiveLength: brickLength + mortarThickness,
    effectiveHeight: brickHeight + mortarThickness,
  };
}

/**
 * Calculates the total number of bricks required for the wall, including waste factor.
 * Formula:
 * 1. Wall area = wallLength * wallHeight
 * 2. Effective brick area = effectiveLength * effectiveHeight
 * 3. Bricks per area = wallArea / effectiveBrickArea
 * 4. Total bricks = ceil(bricksPerArea * (1 + wastePercentage / 100))
 *
 * Assumes all inputs are in consistent units (e.g., feet). Brick width is not used in surface area calculation.
 * @param inputs - The input parameters for the brick calculator
 * @returns The total number of bricks required (rounded up to the nearest whole number)
 */
export function calculateResult(inputs: BrickCalculatorInputs): number {
  const { wallLength, wallHeight, brickLength, brickHeight, mortarThickness, wastePercentage = 10 } = inputs;

  if (wallLength <= 0 || wallHeight <= 0 || brickLength <= 0 || brickHeight <= 0 || mortarThickness < 0) {
    throw new Error('Invalid input: Dimensions must be positive, mortar thickness non-negative');
  }

  const wallArea = wallLength * wallHeight;
  const { effectiveLength, effectiveHeight } = getEffectiveBrickDimensions(brickLength, brickHeight, mortarThickness);
  const effectiveBrickArea = effectiveLength * effectiveHeight;
  const bricksWithoutWaste = wallArea / effectiveBrickArea;
  const wasteFactor = 1 + (wastePercentage / 100);
  const totalBricks = Math.ceil(bricksWithoutWaste * wasteFactor);

  return totalBricks;
}

/**
 * Generates an analysis and recommendation based on the calculation metrics.
 * Risk level is determined by waste percentage:
 * - Low: <= 10%
 * - Medium: 11-15%
 * - High: > 15%
 * Recommendation includes practical advice based on total bricks and wall size.
 * @param inputs - The original inputs used for calculation
 * @param metrics - The metrics containing the calculated result and any additional computed values
 * @returns Analysis object with recommendation and riskLevel
 */
export function generateAnalysis(
  inputs: BrickCalculatorInputs,
  metrics: BrickCalculatorMetrics
): BrickCalculatorAnalysis {
  const { wastePercentage = 10 } = inputs;
  const { result } = metrics;
  const wallArea = inputs.wallLength * inputs.wallHeight;

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (wastePercentage > 15) {
    riskLevel = 'High';
  } else if (wastePercentage > 10) {
    riskLevel = 'Medium';
  }

  let recommendation = `You will need approximately ${result} bricks for a wall of ${wallArea.toFixed(2)} square units. `;
  
  if (result > 1000) {
    recommendation += 'Consider sourcing bricks in bulk to reduce costs. ';
  }
  if (riskLevel !== 'Low') {
    recommendation += `High waste factor (${wastePercentage}%) may indicate irregular site conditions; double-check measurements. `;
  }
  recommendation += 'Always consult a professional for structural integrity.';

  return { recommendation, riskLevel };
}
```