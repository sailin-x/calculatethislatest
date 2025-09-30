import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialEfficiencyCalculator } from './FinancialEfficiencyCalculator';

export function registerFinancialEfficiencyCalculator(): void {
  calculatorRegistry.register(FinancialEfficiencyCalculator);
}

export { FinancialEfficiencyCalculator };
