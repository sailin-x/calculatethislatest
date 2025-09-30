import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { HealthSavingsAccountContributionCalculator } from './HealthSavingsAccountContributionCalculator';

export function registerHealthSavingsAccountContributionCalculator(): void {
  calculatorRegistry.register(HealthSavingsAccountContributionCalculator);
}

export { HealthSavingsAccountContributionCalculator };
