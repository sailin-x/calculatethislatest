```typescript
import { DrywallCalculatorInputs, DrywallCalculatorMetrics, DrywallCalculatorAnalysis } from './types';

// Helper function to calculate the number of drywall sheets needed
// Assumes standard 4x8 ft sheets (32 sq ft per sheet); rounds up to the next whole sheet
function calculateSheetsNeeded(totalArea: number, sheetWidth: number = 4, sheetLength: number = 8): number {
  const sheetArea = sheetWidth * sheetLength;
  return Math.ceil(totalArea / sheetArea);
}

// Helper function to calculate total openings area
function calculateOpeningsArea(
  doorCount: number,
  doorWidth: number,
  doorHeight: number,
  windowCount: number,
  windowWidth: number,
  windowHeight: number
): number {
  const doorArea = doorCount * doorWidth * doorHeight;
  const windowArea = windowCount * windowWidth * windowHeight;
  return doorArea + windowArea;
}

export function calculateResult(inputs: DrywallCalculatorInputs): number {
  const { length, width, height, includeCeiling, doorCount, doorWidth, doorHeight, windowCount, windowWidth, windowHeight } = inputs;

  // Validate inputs (basic checks for production readiness)
  if (length <= 0 || width <= 0 || height <= 0) {
    throw new Error('Dimensions must be positive numbers');
  }
  if (doorCount < 0 || windowCount < 0 || doorWidth <= 0 || doorHeight <= 0 || windowWidth <= 0 || windowHeight <= 0) {
    throw new Error('Opening dimensions and counts must be non-negative');
  }

  // Calculate wall area: perimeter * height
  const perimeter = 2 * (length + width);
  const wallArea = perimeter * height;

  // Calculate ceiling area if included
  const ceilingArea = includeCeiling ? length * width : 0;

  // Gross total area
  const grossArea = wallArea + ceilingArea;

  // Calculate openings area (subtract from gross; standard practice for net drywall needed)
  const openingsArea = calculateOpeningsArea(doorCount, doorWidth, doorHeight, windowCount, windowWidth, windowHeight);

  // Net drywall area (in square feet)
  const netArea = Math.max(0, grossArea - openingsArea); // Ensure non-negative

  return netArea;
}

export function generateAnalysis(
  inputs: DrywallCalculatorInputs,
  metrics: DrywallCalculatorMetrics
): DrywallCalculatorAnalysis {
  const result = metrics.result; // Net square feet from calculateResult
  const { includeCeiling, doorCount, windowCount } = inputs;

  // Calculate number of sheets for recommendation (using standard 4x8 ft sheets)
  const sheetsNeeded = calculateSheetsNeeded(result);

  // Risk assessment logic:
  // - Low: Small project (< 500 sq ft), few openings
  // - Medium: Moderate project (500-1500 sq ft) or some openings
  // - High: Large project (>1500 sq ft) or many openings (potential for waste/miscalculation)
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  const totalOpenings = doorCount + windowCount;
  if (result > 1500 || totalOpenings > 10) {
    riskLevel = 'High';
  } else if (result > 500 || totalOpenings > 5 || (includeCeiling && result > 300)) {
    riskLevel = 'Medium';
  }

  // Recommendation: Provide sheets estimate and tips
  const sheetRecommendation = `You will need approximately ${sheetsNeeded} sheets of 4x8 ft drywall (totaling ${result.toFixed(2)} sq ft).`;
  let additionalTips = '';
  if (includeCeiling) {
    additionalTips += ' Consider adding 10% extra for ceiling seams and waste. ';
  }
  if (totalOpenings > 0) {
    additionalTips += 'Account for framing around openings; no deduction for trim areas. ';
  }
  if (riskLevel === 'High') {
    additionalTips += 'For large projects, consult a professional for precise measurements and waste factor (typically 10-15%). ';
  }

  const recommendation = `${sheetRecommendation}${additionalTips}Always measure twice and add 10% buffer for cuts and errors.`;

  return { recommendation, riskLevel };
}
```