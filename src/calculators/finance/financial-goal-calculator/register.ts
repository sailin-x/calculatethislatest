import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialGoalCalculator } from './FinancialGoalCalculator';

export function registerFinancialGoalCalculator(): void {
  calculatorRegistry.register(FinancialGoalCalculator);
}

export { FinancialGoalCalculator };
