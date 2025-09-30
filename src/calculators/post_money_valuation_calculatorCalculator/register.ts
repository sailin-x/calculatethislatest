import { calculatorRegistry } from '../../data/calculatorRegistry';
import { post_money_valuation_calculatorCalculatorCalculator } from './post_money_valuation_calculatorCalculatorCalculator';

export function registerpost_money_valuation_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new post_money_valuation_calculatorCalculatorCalculator());
}
