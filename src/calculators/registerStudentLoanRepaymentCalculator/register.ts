import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerStudentLoanRepaymentCalculatorCalculator } from './registerStudentLoanRepaymentCalculatorCalculator';

export function registerregisterStudentLoanRepaymentCalculatorCalculator(): void {
  calculatorRegistry.register(new registerStudentLoanRepaymentCalculatorCalculator());
}
