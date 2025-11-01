import { calculatorRegistry } from '../../data/calculatorRegistry';
import { StudentLoanForgivenessCalculator } from './StudentLoanForgivenessCalculator';

export function registerStudentLoanForgivenessCalculator(): void {
  calculatorRegistry.register(new StudentLoanForgivenessCalculator());
}
