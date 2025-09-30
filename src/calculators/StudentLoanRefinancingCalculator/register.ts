import { calculatorRegistry } from '../../data/calculatorRegistry';
import { StudentLoanRefinancingCalculatorCalculator } from './StudentLoanRefinancingCalculatorCalculator';

export function registerStudentLoanRefinancingCalculatorCalculator(): void {
  calculatorRegistry.register(new StudentLoanRefinancingCalculatorCalculator());
}
