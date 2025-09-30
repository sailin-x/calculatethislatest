import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialComplianceCalculator } from './FinancialComplianceCalculator';

export function registerFinancialComplianceCalculator(): void {
  calculatorRegistry.register(FinancialComplianceCalculator);
}

export { FinancialComplianceCalculator };
