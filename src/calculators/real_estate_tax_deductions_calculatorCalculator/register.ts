import { calculatorRegistry } from '../../data/calculatorRegistry';
import { real_estate_tax_deductions_calculatorCalculatorCalculator } from './real_estate_tax_deductions_calculatorCalculatorCalculator';

export function registerreal_estate_tax_deductions_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new real_estate_tax_deductions_calculatorCalculatorCalculator());
}
