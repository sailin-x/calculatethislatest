import { calculatorRegistry } from '../../data/calculatorRegistry';
import { student_loanCalculatorCalculator } from './student_loanCalculatorCalculator';

export function registerstudent_loanCalculatorCalculator(): void {
  calculatorRegistry.register(new student_loanCalculatorCalculator());
}
