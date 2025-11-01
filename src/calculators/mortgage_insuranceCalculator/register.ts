import { calculatorRegistry } from '../../data/calculatorRegistry';
import { mortgage_insuranceCalculator } from './mortgage_insuranceCalculator';

export function registermortgage_insuranceCalculator(): void {
  calculatorRegistry.register(new mortgage_insuranceCalculator());
}
