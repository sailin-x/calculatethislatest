import { calculatorRegistry } from '../../data/calculatorRegistry';
import { mortgage_lifeCalculator } from './mortgage_lifeCalculator';

export function registermortgage_lifeCalculator(): void {
  calculatorRegistry.register(new mortgage_lifeCalculator());
}
