import { calculatorRegistry } from '../../data/calculatorRegistry';
import { taxCalculatorCalculator } from './taxCalculatorCalculator';

export function registertaxCalculatorCalculator(): void {
  calculatorRegistry.register(new taxCalculatorCalculator());
}
