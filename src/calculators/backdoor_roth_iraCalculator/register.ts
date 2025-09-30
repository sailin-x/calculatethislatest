import { calculatorRegistry } from '../../data/calculatorRegistry';
import { backdoor_roth_iraCalculatorCalculator } from './backdoor_roth_iraCalculatorCalculator';

export function registerbackdoor_roth_iraCalculatorCalculator(): void {
  calculatorRegistry.register(new backdoor_roth_iraCalculatorCalculator());
}
