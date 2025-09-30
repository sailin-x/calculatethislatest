import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { DebtManagementCalculator } from './DebtManagementCalculator';

export function registerDebtManagementCalculator(): void {
  calculatorRegistry.register(DebtManagementCalculator);
}

export { DebtManagementCalculator };
