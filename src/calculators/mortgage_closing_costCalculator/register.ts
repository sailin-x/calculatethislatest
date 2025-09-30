import { calculatorRegistry } from '../../data/calculatorRegistry';
import { mortgage_closing_costCalculatorCalculator } from './mortgage_closing_costCalculatorCalculator';

export function registermortgage_closing_costCalculatorCalculator(): void {
  calculatorRegistry.register(new mortgage_closing_costCalculatorCalculator());
}
