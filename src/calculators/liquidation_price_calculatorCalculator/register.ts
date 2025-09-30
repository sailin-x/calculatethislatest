import { calculatorRegistry } from '../../data/calculatorRegistry';
import { liquidation_price_calculatorCalculatorCalculator } from './liquidation_price_calculatorCalculatorCalculator';

export function registerliquidation_price_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new liquidation_price_calculatorCalculatorCalculator());
}
