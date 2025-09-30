import { calculatorRegistry } from '../../data/calculatorRegistry';
import { mortgage_insuranceCalculatorCalculator } from './mortgage_insuranceCalculatorCalculator';

export function registermortgage_insuranceCalculatorCalculator(): void {
  calculatorRegistry.register(new mortgage_insuranceCalculatorCalculator());
}
