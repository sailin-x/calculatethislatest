import { calculatorRegistry } from '../../data/calculatorRegistry';
import { RequiredMinimumDistributionRmdCalculatorCalculator } from './RequiredMinimumDistributionRmdCalculatorCalculator';

export function registerRequiredMinimumDistributionRmdCalculatorCalculator(): void {
  calculatorRegistry.register(new RequiredMinimumDistributionRmdCalculatorCalculator());
}
