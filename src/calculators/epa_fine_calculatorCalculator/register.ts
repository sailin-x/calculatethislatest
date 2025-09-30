import { calculatorRegistry } from '../../data/calculatorRegistry';
import { epa_fine_calculatorCalculatorCalculator } from './epa_fine_calculatorCalculatorCalculator';

export function registerepa_fine_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new epa_fine_calculatorCalculatorCalculator());
}
