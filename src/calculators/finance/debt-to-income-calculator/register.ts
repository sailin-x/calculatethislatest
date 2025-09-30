import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { DebtToIncomeCalculator } from './DebtToIncomeCalculator';

export function registerDebtToIncomeCalculator(): void {
  calculatorRegistry.register(DebtToIncomeCalculator);
}

export { DebtToIncomeCalculator };
