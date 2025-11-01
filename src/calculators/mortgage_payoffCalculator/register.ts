import { calculatorRegistry } from '../../data/calculatorRegistry';
import { mortgage_payoffCalculator } from './mortgage_payoffCalculator';

export function registermortgage_payoffCalculator(): void {
  calculatorRegistry.register(new mortgage_payoffCalculator());
}
