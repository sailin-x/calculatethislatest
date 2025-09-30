import { calculatorRegistry } from '../../data/calculatorRegistry';
import { mortgage_refinanceCalculatorCalculator } from './mortgage_refinanceCalculatorCalculator';

export function registermortgage_refinanceCalculatorCalculator(): void {
  calculatorRegistry.register(new mortgage_refinanceCalculatorCalculator());
}
