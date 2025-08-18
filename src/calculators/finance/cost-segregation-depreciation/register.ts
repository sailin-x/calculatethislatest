import { CalculatorRegistry } from '../../../data/calculatorRegistry';
import { CostSegregationDepreciationCalculator } from './CostSegregationDepreciationCalculator';

export function registerCostSegregationDepreciationCalculator(registry: CalculatorRegistry): void {
  registry.register(CostSegregationDepreciationCalculator);
}

export { CostSegregationDepreciationCalculator };
