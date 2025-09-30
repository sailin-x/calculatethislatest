import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { CreditUtilizationCalculator } from './CreditUtilizationCalculator';

export function registerCreditUtilizationCalculator(): void {
  calculatorRegistry.register(CreditUtilizationCalculator);
}

export { CreditUtilizationCalculator };
