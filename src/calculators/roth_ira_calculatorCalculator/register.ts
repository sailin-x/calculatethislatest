import { calculatorRegistry } from '../../data/calculatorRegistry';
import { roth_ira_calculatorCalculatorCalculator } from './roth_ira_calculatorCalculatorCalculator';

export function registerroth_ira_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new roth_ira_calculatorCalculatorCalculator());
}
