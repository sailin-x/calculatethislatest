import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerCarLoanCalculatorCalculator } from './registerCarLoanCalculatorCalculator';

export function registerregisterCarLoanCalculatorCalculator(): void {
  calculatorRegistry.register(new registerCarLoanCalculatorCalculator());
}
