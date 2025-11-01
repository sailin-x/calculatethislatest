import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerCarLoanCalculator } from './registerCarLoanCalculator';

export function registerregisterCarLoanCalculator(): void {
  calculatorRegistry.register(new registerCarLoanCalculator());
}
