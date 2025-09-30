import { calculatorRegistry } from '../../data/calculatorRegistry';
import { mortgage_equityCalculatorCalculator } from './mortgage_equityCalculatorCalculator';

export function registermortgage_equityCalculatorCalculator(): void {
  calculatorRegistry.register(new mortgage_equityCalculatorCalculator());
}
