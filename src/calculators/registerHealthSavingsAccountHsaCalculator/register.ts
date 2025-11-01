import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerHealthSavingsAccountHsaCalculator } from './registerHealthSavingsAccountHsaCalculator';

export function registerregisterHealthSavingsAccountHsaCalculator(): void {
  calculatorRegistry.register(new registerHealthSavingsAccountHsaCalculator());
}
