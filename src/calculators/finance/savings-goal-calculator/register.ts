import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { SavingsGoalCalculator } from './SavingsGoalCalculator';

export function registerSavingsGoalCalculator(): void {
  calculatorRegistry.register(SavingsGoalCalculator);
}

export { SavingsGoalCalculator };
