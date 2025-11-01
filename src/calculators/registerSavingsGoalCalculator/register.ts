import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerSavingsGoalCalculator } from './registerSavingsGoalCalculator';

export function registerregisterSavingsGoalCalculator(): void {
  calculatorRegistry.register(new registerSavingsGoalCalculator());
}
