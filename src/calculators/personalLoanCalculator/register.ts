import { calculatorRegistry } from '../../data/calculatorRegistry';
import { personalLoanCalculatorCalculator } from './personalLoanCalculatorCalculator';

export function registerpersonalLoanCalculatorCalculator(): void {
  calculatorRegistry.register(new personalLoanCalculatorCalculator());
}
