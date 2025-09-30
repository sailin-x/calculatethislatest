import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerStudentLoanForgivenessCalculatorCalculator } from './registerStudentLoanForgivenessCalculatorCalculator';

export function registerregisterStudentLoanForgivenessCalculatorCalculator(): void {
  calculatorRegistry.register(new registerStudentLoanForgivenessCalculatorCalculator());
}
