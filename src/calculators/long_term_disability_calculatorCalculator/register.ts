import { calculatorRegistry } from '../../data/calculatorRegistry';
import { long_term_disability_calculatorCalculatorCalculator } from './long_term_disability_calculatorCalculatorCalculator';

export function registerlong_term_disability_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new long_term_disability_calculatorCalculatorCalculator());
}
