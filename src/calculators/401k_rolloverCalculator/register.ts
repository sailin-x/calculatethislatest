import { calculatorRegistry } from '../../data/calculatorRegistry';
import { 401k_rolloverCalculatorCalculator } from './401k_rolloverCalculatorCalculator';

export function register401k_rolloverCalculatorCalculator(): void {
  calculatorRegistry.register(new 401k_rolloverCalculatorCalculator());
}
