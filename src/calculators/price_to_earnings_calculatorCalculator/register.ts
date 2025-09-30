import { calculatorRegistry } from '../../data/calculatorRegistry';
import { price_to_earnings_calculatorCalculatorCalculator } from './price_to_earnings_calculatorCalculatorCalculator';

export function registerprice_to_earnings_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new price_to_earnings_calculatorCalculatorCalculator());
}
