import { calculatorRegistry } from '../../data/calculatorRegistry';
import { commercial_real_estate_loan_amortizationCalculator } from './commercial_real_estate_loan_amortizationCalculator';

export function registercommercial_real_estate_loan_amortizationCalculator(): void {
  calculatorRegistry.register(new commercial_real_estate_loan_amortizationCalculator());
}
