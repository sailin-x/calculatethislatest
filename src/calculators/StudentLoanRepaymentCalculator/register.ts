import { calculatorRegistry } from '../../data/calculatorRegistry';
import { StudentLoanRepaymentCalculatorCalculator } from './StudentLoanRepaymentCalculatorCalculator';

export function registerStudentLoanRepaymentCalculatorCalculator(): void {
  calculatorRegistry.register(new StudentLoanRepaymentCalculatorCalculator());
}
