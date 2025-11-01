import { calculatorRegistry } from '../../data/calculatorRegistry';
import { complex_numbersCalculator } from './complex_numbersCalculator';

export function registercomplex_numbersCalculator(): void {
  calculatorRegistry.register(new complex_numbersCalculator());
}
