import { calculatorRegistry } from '../../data/calculatorRegistry';
import { market_cap_calculatorCalculatorCalculator } from './market_cap_calculatorCalculatorCalculator';

export function registermarket_cap_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new market_cap_calculatorCalculatorCalculator());
}
