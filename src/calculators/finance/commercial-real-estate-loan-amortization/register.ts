import { CalculatorRegistry } from '../../../data/calculatorRegistry';
import { CommercialRealEstateLoanAmortizationCalculator } from './CommercialRealEstateLoanAmortizationCalculator';

export function registerCommercialRealEstateLoanAmortizationCalculator(registry: CalculatorRegistry): void {
  registry.register(CommercialRealEstateLoanAmortizationCalculator);
}

export { CommercialRealEstateLoanAmortizationCalculator };
