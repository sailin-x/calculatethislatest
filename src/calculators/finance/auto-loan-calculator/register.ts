import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { AutoLoanCalculator } from './AutoLoanCalculator';

export function registerAutoLoanCalculator(): void {
  calculatorRegistry.register(AutoLoanCalculator);
}

export { AutoLoanCalculator };
