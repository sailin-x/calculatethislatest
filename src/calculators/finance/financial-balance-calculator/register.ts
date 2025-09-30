import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialBalanceCalculator } from './FinancialBalanceCalculator';

export function registerFinancialBalanceCalculator(): void {
  calculatorRegistry.register(FinancialBalanceCalculator);
}

export { FinancialBalanceCalculator };
