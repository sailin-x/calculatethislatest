import { calculatorRegistry } from '../../data/calculatorRegistry';
import { financial_independence_calculatorCalculatorCalculator } from './financial_independence_calculatorCalculatorCalculator';

export function registerfinancial_independence_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new financial_independence_calculatorCalculatorCalculator());
}
