import { calculatorRegistry } from '../../data/calculatorRegistry';
import { mortgage_vs_rentCalculatorCalculator } from './mortgage_vs_rentCalculatorCalculator';

export function registermortgage_vs_rentCalculatorCalculator(): void {
  calculatorRegistry.register(new mortgage_vs_rentCalculatorCalculator());
}
