import { calculatorRegistry } from '../../data/calculatorRegistry';
import { StudentLoanRepaymentCalculator } from './StudentLoanRepaymentCalculator';

export function registerStudentLoanRepaymentCalculator(): void {
  calculatorRegistry.register(new StudentLoanRepaymentCalculator());
}
