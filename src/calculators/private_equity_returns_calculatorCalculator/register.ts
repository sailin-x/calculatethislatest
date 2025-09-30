import { calculatorRegistry } from '../../data/calculatorRegistry';
import { private_equity_returns_calculatorCalculatorCalculator } from './private_equity_returns_calculatorCalculatorCalculator';

export function registerprivate_equity_returns_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new private_equity_returns_calculatorCalculatorCalculator());
}
