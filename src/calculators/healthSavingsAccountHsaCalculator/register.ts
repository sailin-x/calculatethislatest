import { calculatorRegistry } from '../../data/calculatorRegistry';
import { healthSavingsAccountHsaCalculator } from './HealthSavingsAccountHsaCalculator';

export function registerHealthSavingsAccountHsaCalculator(): void {
  calculatorRegistry.register(healthSavingsAccountHsaCalculator);
}
