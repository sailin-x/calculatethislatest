import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerSavingsGoalCalculatorCalculator } from './registerSavingsGoalCalculatorCalculator';

export function registerregisterSavingsGoalCalculatorCalculator(): void {
  calculatorRegistry.register(new registerSavingsGoalCalculatorCalculator());
}
