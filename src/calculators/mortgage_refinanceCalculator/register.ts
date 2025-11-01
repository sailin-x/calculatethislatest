import { calculatorRegistry } from '../../data/calculatorRegistry';
import { mortgage_refinanceCalculator } from './mortgage_refinanceCalculator';

export function registermortgage_refinanceCalculator(): void {
  calculatorRegistry.register(new mortgage_refinanceCalculator());
}
