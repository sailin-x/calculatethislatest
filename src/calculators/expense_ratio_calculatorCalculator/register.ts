import { calculatorRegistry } from '../../data/calculatorRegistry';
import { expense_ratio_calculatorCalculatorCalculator } from './expense_ratio_calculatorCalculatorCalculator';

export function registerexpense_ratio_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new expense_ratio_calculatorCalculatorCalculator());
}
