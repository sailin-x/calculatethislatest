import { calculatorRegistry } from '../../data/calculatorRegistry';
import { mortgage_lifeCalculatorCalculator } from './mortgage_lifeCalculatorCalculator';

export function registermortgage_lifeCalculatorCalculator(): void {
  calculatorRegistry.register(new mortgage_lifeCalculatorCalculator());
}
