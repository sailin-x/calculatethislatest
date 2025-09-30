import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialFreedomCalculator } from './FinancialFreedomCalculator';

export function registerFinancialFreedomCalculator(): void {
  calculatorRegistry.register(FinancialFreedomCalculator);
}

export { FinancialFreedomCalculator };
