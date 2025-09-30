import { calculatorRegistry } from '../../data/calculatorRegistry';
import { cost_of_equity_calculatorCalculatorCalculator } from './cost_of_equity_calculatorCalculatorCalculator';

export function registercost_of_equity_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new cost_of_equity_calculatorCalculatorCalculator());
}
