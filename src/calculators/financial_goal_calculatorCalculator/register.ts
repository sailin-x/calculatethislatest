import { calculatorRegistry } from '../../data/calculatorRegistry';
import { financial_goal_calculatorCalculatorCalculator } from './financial_goal_calculatorCalculatorCalculator';

export function registerfinancial_goal_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new financial_goal_calculatorCalculatorCalculator());
}
