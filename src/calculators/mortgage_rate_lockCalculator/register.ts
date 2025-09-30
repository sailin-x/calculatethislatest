import { calculatorRegistry } from '../../data/calculatorRegistry';
import { mortgage_rate_lockCalculatorCalculator } from './mortgage_rate_lockCalculatorCalculator';

export function registermortgage_rate_lockCalculatorCalculator(): void {
  calculatorRegistry.register(new mortgage_rate_lockCalculatorCalculator());
}
