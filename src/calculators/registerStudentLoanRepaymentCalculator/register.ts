import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerStudentLoanRepaymentCalculator } from './registerStudentLoanRepaymentCalculator';

export function registerregisterStudentLoanRepaymentCalculator(): void {
  calculatorRegistry.register(new registerStudentLoanRepaymentCalculator());
}
