import { calculatorRegistry } from '../../data/calculatorRegistry';
import { StudentLoanForgivenessCalculatorCalculator } from './StudentLoanForgivenessCalculatorCalculator';

export function registerStudentLoanForgivenessCalculatorCalculator(): void {
  calculatorRegistry.register(new StudentLoanForgivenessCalculatorCalculator());
}
