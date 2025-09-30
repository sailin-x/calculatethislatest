import { calculatorRegistry } from '../../data/calculatorRegistry';
import { businessloanqualificationcalculatorCalculator } from './businessloanqualificationcalculatorCalculator';

export function registerbusinessloanqualificationcalculatorCalculator(): void {
  calculatorRegistry.register(new businessloanqualificationcalculatorCalculator());
}
