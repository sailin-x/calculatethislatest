import { calculatorRegistry } from '../../data/calculatorRegistry';
import { mortgage_equityCalculator } from './mortgage_equityCalculator';

export function registermortgage_equityCalculator(): void {
  calculatorRegistry.register(new mortgage_equityCalculator());
}
