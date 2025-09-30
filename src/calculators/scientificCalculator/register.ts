import { calculatorRegistry } from '../../data/calculatorRegistry';
import { scientificCalculatorCalculator } from './scientificCalculatorCalculator';

export function registerscientificCalculatorCalculator(): void {
  calculatorRegistry.register(new scientificCalculatorCalculator());
}
