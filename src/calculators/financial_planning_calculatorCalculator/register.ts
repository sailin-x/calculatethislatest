import { calculatorRegistry } from '../../data/calculatorRegistry';
import { financial_planning_calculatorCalculatorCalculator } from './financial_planning_calculatorCalculatorCalculator';

export function registerfinancial_planning_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new financial_planning_calculatorCalculatorCalculator());
}
