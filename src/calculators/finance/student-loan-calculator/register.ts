import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { StudentLoanCalculator } from './StudentLoanCalculator';

export function registerStudentLoanCalculator(): void {
  calculatorRegistry.register(StudentLoanCalculator);
}

export { StudentLoanCalculator };
