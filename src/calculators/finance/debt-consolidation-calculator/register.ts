import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { debtConsolidationCalculator } from './DebtConsolidationCalculator';

export function registerDebtConsolidationCalculator(): void {
  calculatorRegistry.register(debtConsolidationCalculator);
}