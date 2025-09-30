import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { BusinessLoanCalculator } from './BusinessLoanCalculator';

export function registerBusinessLoanCalculator(): void {
  calculatorRegistry.register(BusinessLoanCalculator);
}

export { BusinessLoanCalculator };
