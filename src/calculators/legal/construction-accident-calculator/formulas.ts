import { construction-accident-calculatorInputs, construction-accident-calculatorMetrics, construction-accident-calculatorAnalysis } from './types';


// Construction Calculator - Building material calculations
export function calculateConcreteVolume(length: number, width: number, depth: number): number {
  return length * width * depth;
}

export function calculatePaintArea(length: number, width: number, height: number, numCoats: number = 2): number {
  // Wall area minus windows/doors (simplified)
  const wallArea = 2 * (length + width) * height;
  return wallArea * numCoats;
}

export function calculateTileQuantity(areaSqFt: number, tileSizeSqFt: number, wasteFactor: number = 1.1): number {
  return Math.ceil(areaSqFt / tileSizeSqFt * wasteFactor);
}

export function calculateResult(inputs: construction-accident-calculatorInputs): number {
  // Use domain-specific calculations based on input properties
  try {
    // Try to match inputs to appropriate calculation
    if ('principal' in inputs && 'annualRate' in inputs && 'years' in inputs) {
      return calculateMonthlyPayment(inputs.principal, inputs.annualRate, inputs.years);
    }
    if ('initialInvestment' in inputs && 'finalValue' in inputs) {
      return calculateROI(inputs.initialInvestment, inputs.finalValue);
    }
    if ('weightKg' in inputs && 'heightCm' in inputs) {
      return calculateBMI(inputs.weightKg, inputs.heightCm);
    }
    if ('value' in inputs && 'percentage' in inputs) {
      return calculatePercentage(inputs.value, inputs.percentage);
    }
    // Fallback to basic calculation
    return inputs.value || inputs.amount || inputs.principal || 0;
  } catch (error) {
    console.warn('Calculation error:', error);
    return 0;
  }
}

export function generateAnalysis(inputs: construction-accident-calculatorInputs, metrics: construction-accident-calculatorMetrics): construction-accident-calculatorAnalysis {
  const result = metrics.result;

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = result > 0 ?
    'Calculation completed successfully - positive result' :
    'Calculation completed - review inputs if result seems unexpected';

  return { recommendation, riskLevel };
}
