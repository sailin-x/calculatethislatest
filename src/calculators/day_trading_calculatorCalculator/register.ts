import { calculatorRegistry } from '../../data/calculatorRegistry';
import { day_trading_calculatorCalculatorCalculator } from './day_trading_calculatorCalculatorCalculator';

export function registerday_trading_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new day_trading_calculatorCalculatorCalculator());
}
