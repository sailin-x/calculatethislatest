import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerDebtConsolidationCalculatorCalculator } from './registerDebtConsolidationCalculatorCalculator';

export function registerregisterDebtConsolidationCalculatorCalculator(): void {
  calculatorRegistry.register(new registerDebtConsolidationCalculatorCalculator());
}
