import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { RequiredMinimumDistributionRmdCalculator } from './RequiredMinimumDistributionRmdCalculator';

export function registerRequiredMinimumDistributionRmdCalculator(): void {
  calculatorRegistry.register(RequiredMinimumDistributionRmdCalculator);
}

export { RequiredMinimumDistributionRmdCalculator };
