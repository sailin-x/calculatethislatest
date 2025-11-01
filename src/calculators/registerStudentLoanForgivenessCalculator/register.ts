import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerStudentLoanForgivenessCalculator } from './registerStudentLoanForgivenessCalculator';

export function registerregisterStudentLoanForgivenessCalculator(): void {
  calculatorRegistry.register(new registerStudentLoanForgivenessCalculator());
}
