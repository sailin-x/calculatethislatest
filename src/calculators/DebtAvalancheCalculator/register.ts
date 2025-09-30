import { calculatorRegistry } from '../../data/calculatorRegistry';
import { DebtAvalancheCalculatorCalculator } from './DebtAvalancheCalculatorCalculator';

export function registerDebtAvalancheCalculatorCalculator(): void {
  calculatorRegistry.register(new DebtAvalancheCalculatorCalculator());
}
