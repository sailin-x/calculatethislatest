import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerHealthSavingsAccountHsaCalculatorCalculator } from './registerHealthSavingsAccountHsaCalculatorCalculator';

export function registerregisterHealthSavingsAccountHsaCalculatorCalculator(): void {
  calculatorRegistry.register(new registerHealthSavingsAccountHsaCalculatorCalculator());
}
