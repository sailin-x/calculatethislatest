import { calculatorRegistry } from '../../data/calculatorRegistry';
import { complexNumberCalculatorCalculator } from './complexNumberCalculatorCalculator';

export function registercomplexNumberCalculatorCalculator(): void {
  calculatorRegistry.register(new complexNumberCalculatorCalculator());
}
