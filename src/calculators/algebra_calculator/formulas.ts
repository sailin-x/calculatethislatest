import { algebra_calculatorInputs, algebra_calculatorMetrics, algebra_calculatorAnalysis } from './types';


// Math Calculator - Mathematical functions
export function solveQuadratic(a: number, b: number, c: number): {x1: number, x2: number} {
  const discriminant = b * b - 4 * a * c;
  if (discriminant < 0) throw new Error('Complex roots');
  const sqrtD = Math.sqrt(discriminant);
  return {
    x1: (-b + sqrtD) / (2 * a),
    x2: (-b - sqrtD) / (2 * a)
  };
}

export function calculateFactorial(n: number): number {
  if (n < 0) throw new Error('Negative factorial');
  if (n === 0 || n === 1) return 1;
  return n * calculateFactorial(n - 1);
}

export function calculatePermutation(n: number, r: number): number {
  return calculateFactorial(n) / calculateFactorial(n - r);
}

export function calculateResult(inputs: algebra_calculatorInputs): number {
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

export function generateAnalysis(inputs: algebra_calculatorInputs, metrics: algebra_calculatorMetrics): algebra_calculatorAnalysis {
  const result = metrics.result;

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = result > 0 ?
    'Calculation completed successfully - positive result' :
    'Calculation completed - review inputs if result seems unexpected';

  return { recommendation, riskLevel };
}
