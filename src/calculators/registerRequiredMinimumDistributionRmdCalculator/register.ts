import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerRequiredMinimumDistributionRmdCalculator } from './registerRequiredMinimumDistributionRmdCalculator';

export function registerregisterRequiredMinimumDistributionRmdCalculator(): void {
  calculatorRegistry.register(new registerRequiredMinimumDistributionRmdCalculator());
}
