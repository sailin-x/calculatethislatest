import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerDebtConsolidationLoanCalculatorCalculator } from './registerDebtConsolidationLoanCalculatorCalculator';

export function registerregisterDebtConsolidationLoanCalculatorCalculator(): void {
  calculatorRegistry.register(new registerDebtConsolidationLoanCalculatorCalculator());
}
