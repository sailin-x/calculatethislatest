import { calculatorRegistry } from '../../data/calculatorRegistry';
import { concreteCalculatorCalculator } from './concreteCalculatorCalculator';

export function registerconcreteCalculatorCalculator(): void {
  calculatorRegistry.register(new concreteCalculatorCalculator());
}
