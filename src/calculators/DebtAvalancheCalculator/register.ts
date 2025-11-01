import { calculatorRegistry } from '../../data/calculatorRegistry';
import { DebtAvalancheCalculator } from './DebtAvalancheCalculator';

export function registerDebtAvalancheCalculator(): void {
  calculatorRegistry.register(new DebtAvalancheCalculator());
}
