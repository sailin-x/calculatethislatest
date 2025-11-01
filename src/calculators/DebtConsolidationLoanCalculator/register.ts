import { calculatorRegistry } from '../../data/calculatorRegistry';
import { DebtConsolidationLoanCalculator } from './DebtConsolidationLoanCalculator';

export function registerDebtConsolidationLoanCalculator(): void {
  calculatorRegistry.register(new DebtConsolidationLoanCalculator());
}
