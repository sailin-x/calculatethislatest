import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerDebtConsolidationLoanCalculator } from './registerDebtConsolidationLoanCalculator';

export function registerregisterDebtConsolidationLoanCalculator(): void {
  calculatorRegistry.register(new registerDebtConsolidationLoanCalculator());
}
