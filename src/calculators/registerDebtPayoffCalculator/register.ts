import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerDebtPayoffCalculator } from './registerDebtPayoffCalculator';

export function registerregisterDebtPayoffCalculator(): void {
  calculatorRegistry.register(new registerDebtPayoffCalculator());
}
