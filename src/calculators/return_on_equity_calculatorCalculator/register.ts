import { calculatorRegistry } from '../../data/calculatorRegistry';
import { return_on_equity_calculatorCalculatorCalculator } from './return_on_equity_calculatorCalculatorCalculator';

export function registerreturn_on_equity_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new return_on_equity_calculatorCalculatorCalculator());
}
