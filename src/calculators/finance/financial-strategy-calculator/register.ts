import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialStrategyCalculator } from './FinancialStrategyCalculator';

export function registerFinancialStrategyCalculator(): void {
  calculatorRegistry.register(FinancialStrategyCalculator);
}

export { FinancialStrategyCalculator };
