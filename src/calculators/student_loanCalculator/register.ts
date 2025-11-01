import { calculatorRegistry } from '../../data/calculatorRegistry';
import { student_loanCalculator } from './student_loanCalculator';

export function registerstudent_loanCalculator(): void {
  calculatorRegistry.register(new student_loanCalculator());
}
