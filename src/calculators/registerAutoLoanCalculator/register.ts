import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerAutoLoanCalculatorCalculator } from './registerAutoLoanCalculatorCalculator';

export function registerregisterAutoLoanCalculatorCalculator(): void {
  calculatorRegistry.register(new registerAutoLoanCalculatorCalculator());
}
