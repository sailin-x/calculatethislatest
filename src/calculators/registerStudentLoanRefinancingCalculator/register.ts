import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerStudentLoanRefinancingCalculator } from './registerStudentLoanRefinancingCalculator';

export function registerregisterStudentLoanRefinancingCalculator(): void {
  calculatorRegistry.register(new registerStudentLoanRefinancingCalculator());
}
