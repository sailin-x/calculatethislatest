import { calculatorRegistry } from '../../data/calculatorRegistry';
import { StudentLoanRefinancingCalculator } from './StudentLoanRefinancingCalculator';

export function registerStudentLoanRefinancingCalculator(): void {
  calculatorRegistry.register(new StudentLoanRefinancingCalculator());
}
