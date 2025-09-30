import { calculatorRegistry } from '../../data/calculatorRegistry';
import { DebtPayoffCalculatorCalculator } from './DebtPayoffCalculatorCalculator';

export function registerDebtPayoffCalculatorCalculator(): void {
  calculatorRegistry.register(new DebtPayoffCalculatorCalculator());
}
