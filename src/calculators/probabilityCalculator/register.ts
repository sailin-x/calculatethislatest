import { calculatorRegistry } from '../../data/calculatorRegistry';
import { probabilityCalculatorCalculator } from './probabilityCalculatorCalculator';

export function registerprobabilityCalculatorCalculator(): void {
  calculatorRegistry.register(new probabilityCalculatorCalculator());
}
