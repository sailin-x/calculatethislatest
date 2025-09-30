import { calculatorRegistry } from '../../data/calculatorRegistry';
import { autoLoanCalculatorCalculator } from './autoLoanCalculatorCalculator';

export function registerautoLoanCalculatorCalculator(): void {
  calculatorRegistry.register(new autoLoanCalculatorCalculator());
}
