import { calculatorRegistry } from '../../data/calculatorRegistry';
import { long_term_care_calculatorCalculatorCalculator } from './long_term_care_calculatorCalculatorCalculator';

export function registerlong_term_care_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new long_term_care_calculatorCalculatorCalculator());
}
