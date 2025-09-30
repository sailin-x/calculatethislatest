import { calculatorRegistry } from '../../data/calculatorRegistry';
import { maximum_drawdown_calculatorCalculatorCalculator } from './maximum_drawdown_calculatorCalculatorCalculator';

export function registermaximum_drawdown_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new maximum_drawdown_calculatorCalculatorCalculator());
}
