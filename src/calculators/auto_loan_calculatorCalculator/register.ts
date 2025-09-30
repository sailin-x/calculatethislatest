import { calculatorRegistry } from '../../data/calculatorRegistry';
import { auto_loan_calculatorCalculatorCalculator } from './auto_loan_calculatorCalculatorCalculator';

export function registerauto_loan_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new auto_loan_calculatorCalculatorCalculator());
}
