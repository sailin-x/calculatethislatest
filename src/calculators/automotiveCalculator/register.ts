import { calculatorRegistry } from '../../data/calculatorRegistry';
import { automotiveCalculatorCalculator } from './automotiveCalculatorCalculator';

export function registerautomotiveCalculatorCalculator(): void {
  calculatorRegistry.register(new automotiveCalculatorCalculator());
}
