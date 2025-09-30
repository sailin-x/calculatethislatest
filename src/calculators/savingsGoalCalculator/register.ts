import { calculatorRegistry } from '../../data/calculatorRegistry';
import { savingsGoalCalculatorCalculator } from './savingsGoalCalculatorCalculator';

export function registersavingsGoalCalculatorCalculator(): void {
  calculatorRegistry.register(new savingsGoalCalculatorCalculator());
}
