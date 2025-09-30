import { calculatorRegistry } from '../../data/calculatorRegistry';
import { DebtSnowballCalculatorCalculator } from './DebtSnowballCalculatorCalculator';

export function registerDebtSnowballCalculatorCalculator(): void {
  calculatorRegistry.register(new DebtSnowballCalculatorCalculator());
}
