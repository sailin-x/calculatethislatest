import { calculatorRegistry } from '../../data/calculatorRegistry';
import { financial_balance_calculatorCalculatorCalculator } from './financial_balance_calculatorCalculatorCalculator';

export function registerfinancial_balance_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new financial_balance_calculatorCalculatorCalculator());
}
