import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerRequiredMinimumDistributionRmdCalculatorCalculator } from './registerRequiredMinimumDistributionRmdCalculatorCalculator';

export function registerregisterRequiredMinimumDistributionRmdCalculatorCalculator(): void {
  calculatorRegistry.register(new registerRequiredMinimumDistributionRmdCalculatorCalculator());
}
