import { calculatorRegistry } from '../../data/calculatorRegistry';
import { equity_valuation_calculatorCalculatorCalculator } from './equity_valuation_calculatorCalculatorCalculator';

export function registerequity_valuation_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new equity_valuation_calculatorCalculatorCalculator());
}
