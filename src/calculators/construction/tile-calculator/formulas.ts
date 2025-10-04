```typescript
import { TileCalculatorInputs, TileCalculatorMetrics, TileCalculatorAnalysis } from './types';

/**
 * Calculates the number of tiles needed for a rectangular area, accounting for tile layout and waste.
 * Uses ceiling for row/column counts to handle partial tiles, then applies waste factor.
 * Assumes all measurements are in consistent units (e.g., inches, feet, or meters).
 */
export function calculateResult(inputs: TileCalculatorInputs): number {
  const { roomLength, roomWidth, tileLength, tileWidth, wastePercentage } = inputs;

  // Validate inputs (basic checks for production readiness)
  if (roomLength <= 0 || roomWidth <= 0 || tileLength <= 0 || tileWidth <= 0 || wastePercentage < 0) {
    throw new Error('Invalid input: Dimensions and waste percentage must be positive.');
  }

  // Calculate tiles needed along each dimension (ceiling to account for cuts)
  const tilesAlongLength = Math.ceil(roomLength / tileLength);
  const tilesAlongWidth = Math.ceil(roomWidth / tileWidth);

  // Total tiles without waste
  const totalTilesWithoutWaste = tilesAlongLength * tilesAlongWidth;

  // Apply waste factor and round up
  const wasteFactor = 1 + (wastePercentage / 100);
  const totalTilesWithWaste = Math.ceil(totalTilesWithoutWaste * wasteFactor);

  return totalTilesWithWaste;
}

/**
 * Generates an analysis including a recommendation and risk level based on inputs and calculation result.
 * Risk level is determined by waste percentage (common industry threshold for overestimation risk).
 * Recommendation provides practical advice for construction use.
 */
export function generateAnalysis(
  inputs: TileCalculatorInputs,
  metrics: TileCalculatorMetrics
): TileCalculatorAnalysis {
  const result = metrics.result;
  const { wastePercentage } = inputs;

  // Determine risk level based on waste percentage
  // High waste may indicate complex layout or poor planning (risk of overbuying/cost overrun)
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (wastePercentage > 15) {
    riskLevel = 'High';
  } else if (wastePercentage > 10) {
    riskLevel = 'Medium';
  }

  // Generate recommendation with actionable insights
  const recommendation = `For a room measuring ${inputs.roomLength} x ${inputs.roomWidth} units with ${inputs.tileLength} x ${inputs.tileWidth} tiles, you will need ${result} tiles total (including ${wastePercentage}% for cuts and breakage). Recommendation: Verify room shape for irregularities; consider professional measurement for non-rectangular areas to avoid excess waste. If waste exceeds 15%, review tile orientation or add 5-10% buffer for obstacles like doors or fixtures.`;

  return { recommendation, riskLevel };
}
```