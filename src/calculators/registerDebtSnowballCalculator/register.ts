import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerDebtSnowballCalculator } from './registerDebtSnowballCalculator';

export function registerregisterDebtSnowballCalculator(): void {
  calculatorRegistry.register(new registerDebtSnowballCalculator());
}
