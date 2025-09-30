import { calculatorRegistry } from '../../data/calculatorRegistry';
import { commercial_real_estate_loan_amortizationCalculatorCalculator } from './commercial_real_estate_loan_amortizationCalculatorCalculator';

export function registercommercial_real_estate_loan_amortizationCalculatorCalculator(): void {
  calculatorRegistry.register(new commercial_real_estate_loan_amortizationCalculatorCalculator());
}
