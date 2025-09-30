import { calculatorRegistry } from '../../data/calculatorRegistry';
import { cost_of_debt_calculatorCalculatorCalculator } from './cost_of_debt_calculatorCalculatorCalculator';

export function registercost_of_debt_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new cost_of_debt_calculatorCalculatorCalculator());
}
