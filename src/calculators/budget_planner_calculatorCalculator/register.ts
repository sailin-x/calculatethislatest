import { calculatorRegistry } from '../../data/calculatorRegistry';
import { budget_planner_calculatorCalculatorCalculator } from './budget_planner_calculatorCalculatorCalculator';

export function registerbudget_planner_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new budget_planner_calculatorCalculatorCalculator());
}
