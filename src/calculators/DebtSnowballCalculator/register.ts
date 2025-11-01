import { calculatorRegistry } from '../../data/calculatorRegistry';
import { DebtSnowballCalculator } from './DebtSnowballCalculator';

export function registerDebtSnowballCalculator(): void {
  calculatorRegistry.register(new DebtSnowballCalculator());
}
