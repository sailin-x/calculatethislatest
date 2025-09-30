import { calculatorRegistry } from '../../data/calculatorRegistry';
import { budget_optimization_calculatorCalculatorCalculator } from './budget_optimization_calculatorCalculatorCalculator';

export function registerbudget_optimization_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new budget_optimization_calculatorCalculatorCalculator());
}
