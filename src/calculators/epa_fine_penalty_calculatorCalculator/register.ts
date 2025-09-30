import { calculatorRegistry } from '../../data/calculatorRegistry';
import { epa_fine_penalty_calculatorCalculatorCalculator } from './epa_fine_penalty_calculatorCalculatorCalculator';

export function registerepa_fine_penalty_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new epa_fine_penalty_calculatorCalculatorCalculator());
}
