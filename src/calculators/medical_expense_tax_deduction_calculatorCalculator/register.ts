import { calculatorRegistry } from '../../data/calculatorRegistry';
import { medical_expense_tax_deduction_calculatorCalculatorCalculator } from './medical_expense_tax_deduction_calculatorCalculatorCalculator';

export function registermedical_expense_tax_deduction_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new medical_expense_tax_deduction_calculatorCalculatorCalculator());
}
