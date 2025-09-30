import { calculatorRegistry } from '../../data/calculatorRegistry';
import { critical_illness_calculatorCalculatorCalculator } from './critical_illness_calculatorCalculatorCalculator';

export function registercritical_illness_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new critical_illness_calculatorCalculatorCalculator());
}
