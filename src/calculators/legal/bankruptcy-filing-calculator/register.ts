import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { BankruptcyFilingCalculator } from './BankruptcyFilingCalculator';

export function registerBankruptcyFilingCalculator(): void {
  calculatorRegistry.register(BankruptcyFilingCalculator);
}

export { BankruptcyFilingCalculator };
