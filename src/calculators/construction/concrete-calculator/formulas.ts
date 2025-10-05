import { concrete-calculatorInputs, concrete-calculatorMetrics, concrete-calculatorAnalysis } from './types';

// Concrete Calculator
export function calculateVolume(length: number, width: number, depth: number): number {
  return length * width * depth;
}

export function calculateConcreteNeeded(volume: number, wasteFactor: number = 1.1): number {
  return volume * wasteFactor;
}

export function calculateCost(volume: number, costPerCubicUnit: number): number {
  return volume * costPerCubicUnit;
}

export function calculateResult(inputs: concrete-calculatorInputs): number {
  if ('length' in inputs && 'width' in inputs && 'depth' in inputs) {
    return calculateVolume(inputs.length, inputs.width, inputs.depth);
  }
  return 0;
}

export function generateAnalysis(inputs: concrete-calculatorInputs, metrics: concrete-calculatorMetrics): concrete-calculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (result > 100) riskLevel = 'High';
  else if (result > 50) riskLevel = 'Medium';

  const recommendation = 'Concrete volume calculated. Include waste factor and verify measurements on site.';

  return { recommendation, riskLevel };
}