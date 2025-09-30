import { calculatorRegistry } from '../../data/calculatorRegistry';
import { fafsa_calculatorCalculatorCalculator } from './fafsa_calculatorCalculatorCalculator';

export function registerfafsa_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new fafsa_calculatorCalculatorCalculator());
}
