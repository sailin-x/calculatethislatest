import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerDebtConsolidationCalculator } from './registerDebtConsolidationCalculator';

export function registerregisterDebtConsolidationCalculator(): void {
  calculatorRegistry.register(new registerDebtConsolidationCalculator());
}
