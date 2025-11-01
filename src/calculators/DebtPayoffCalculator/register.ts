import { calculatorRegistry } from '../../data/calculatorRegistry';
import { DebtPayoffCalculator } from './DebtPayoffCalculator';

export function registerDebtPayoffCalculator(): void {
  calculatorRegistry.register(new DebtPayoffCalculator());
}
