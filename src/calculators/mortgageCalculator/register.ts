import { calculatorRegistry } from '../../data/calculatorRegistry';
import { mortgageCalculatorCalculator } from './mortgageCalculatorCalculator';

export function registermortgageCalculatorCalculator(): void {
  calculatorRegistry.register(new mortgageCalculatorCalculator());
}
