import { calculatorRegistry } from '../../data/calculatorRegistry';
import { mortgage_vs_rentCalculator } from './mortgage_vs_rentCalculator';

export function registermortgage_vs_rentCalculator(): void {
  calculatorRegistry.register(new mortgage_vs_rentCalculator());
}
