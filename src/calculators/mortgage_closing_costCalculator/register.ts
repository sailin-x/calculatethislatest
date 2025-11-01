import { calculatorRegistry } from '../../data/calculatorRegistry';
import { mortgage_closing_costCalculator } from './mortgage_closing_costCalculator';

export function registermortgage_closing_costCalculator(): void {
  calculatorRegistry.register(new mortgage_closing_costCalculator());
}
