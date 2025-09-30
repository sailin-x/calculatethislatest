import { calculatorRegistry } from '../../data/calculatorRegistry';
import { DebtConsolidationLoanCalculatorCalculator } from './DebtConsolidationLoanCalculatorCalculator';

export function registerDebtConsolidationLoanCalculatorCalculator(): void {
  calculatorRegistry.register(new DebtConsolidationLoanCalculatorCalculator());
}
