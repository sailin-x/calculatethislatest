import { calculatorRegistry } from '../../data/calculatorRegistry';
import { bmrCalculatorCalculator } from './bmrCalculatorCalculator';

export function registerbmrCalculatorCalculator(): void {
  calculatorRegistry.register(new bmrCalculatorCalculator());
}
