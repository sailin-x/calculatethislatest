import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialSuccessCalculator } from './FinancialSuccessCalculator';

export function registerFinancialSuccessCalculator(): void {
  calculatorRegistry.register(FinancialSuccessCalculator);
}

export { FinancialSuccessCalculator };
