import { calculatorRegistry } from '../../data/calculatorRegistry';
import { complex_numbersCalculatorCalculator } from './complex_numbersCalculatorCalculator';

export function registercomplex_numbersCalculatorCalculator(): void {
  calculatorRegistry.register(new complex_numbersCalculatorCalculator());
}
