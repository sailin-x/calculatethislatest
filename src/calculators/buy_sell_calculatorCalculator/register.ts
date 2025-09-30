import { calculatorRegistry } from '../../data/calculatorRegistry';
import { buy_sell_calculatorCalculatorCalculator } from './buy_sell_calculatorCalculatorCalculator';

export function registerbuy_sell_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new buy_sell_calculatorCalculatorCalculator());
}
