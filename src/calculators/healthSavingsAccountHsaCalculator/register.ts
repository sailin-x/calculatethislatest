import { calculatorRegistry } from '../../data/calculatorRegistry';
import { HealthSavingsAccountHsaCalculatorCalculator } from './HealthSavingsAccountHsaCalculatorCalculator';

export function registerHealthSavingsAccountHsaCalculatorCalculator(): void {
  calculatorRegistry.register(new HealthSavingsAccountHsaCalculatorCalculator());
}
