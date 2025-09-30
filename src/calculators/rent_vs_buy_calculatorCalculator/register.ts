import { calculatorRegistry } from '../../data/calculatorRegistry';
import { rent_vs_buy_calculatorCalculatorCalculator } from './rent_vs_buy_calculatorCalculatorCalculator';

export function registerrent_vs_buy_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new rent_vs_buy_calculatorCalculatorCalculator());
}
