import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerDebtSnowballCalculatorCalculator } from './registerDebtSnowballCalculatorCalculator';

export function registerregisterDebtSnowballCalculatorCalculator(): void {
  calculatorRegistry.register(new registerDebtSnowballCalculatorCalculator());
}
