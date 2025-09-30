import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerStudentLoanRefinancingCalculatorCalculator } from './registerStudentLoanRefinancingCalculatorCalculator';

export function registerregisterStudentLoanRefinancingCalculatorCalculator(): void {
  calculatorRegistry.register(new registerStudentLoanRefinancingCalculatorCalculator());
}
