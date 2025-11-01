import { calculatorRegistry } from '../../data/calculatorRegistry';
import { savingsGoalCalculator } from './savingsGoalCalculator';

export function registersavingsGoalCalculator(): void {
  calculatorRegistry.register(new savingsGoalCalculator());
}
