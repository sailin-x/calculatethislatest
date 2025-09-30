import { calculatorRegistry } from '../../data/calculatorRegistry';
import { mortgage_payoffCalculatorCalculator } from './mortgage_payoffCalculatorCalculator';

export function registermortgage_payoffCalculatorCalculator(): void {
  calculatorRegistry.register(new mortgage_payoffCalculatorCalculator());
}
