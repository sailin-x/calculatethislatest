import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialHappinessCalculator } from './FinancialHappinessCalculator';

export function registerFinancialHappinessCalculator(): void {
  calculatorRegistry.register(FinancialHappinessCalculator);
}

export { FinancialHappinessCalculator };
