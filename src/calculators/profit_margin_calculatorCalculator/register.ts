import { calculatorRegistry } from '../../data/calculatorRegistry';
import { profit_margin_calculatorCalculatorCalculator } from './profit_margin_calculatorCalculatorCalculator';

export function registerprofit_margin_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new profit_margin_calculatorCalculatorCalculator());
}
