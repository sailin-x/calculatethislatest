import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerAutoLoanCalculator } from './registerAutoLoanCalculator';

export function registerregisterAutoLoanCalculator(): void {
  calculatorRegistry.register(new registerAutoLoanCalculator());
}
