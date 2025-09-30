import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialGovernanceCalculator } from './FinancialGovernanceCalculator';

export function registerFinancialGovernanceCalculator(): void {
  calculatorRegistry.register(FinancialGovernanceCalculator);
}

export { FinancialGovernanceCalculator };
