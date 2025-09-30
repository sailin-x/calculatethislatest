import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialManagementCalculator } from './FinancialManagementCalculator';

export function registerFinancialManagementCalculator(): void {
  calculatorRegistry.register(FinancialManagementCalculator);
}

export { FinancialManagementCalculator };
