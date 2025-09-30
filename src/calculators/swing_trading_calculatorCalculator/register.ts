import { calculatorRegistry } from '../../data/calculatorRegistry';
import { swing_trading_calculatorCalculatorCalculator } from './swing_trading_calculatorCalculatorCalculator';

export function registerswing_trading_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new swing_trading_calculatorCalculatorCalculator());
}
