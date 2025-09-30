import { calculatorRegistry } from '../../data/calculatorRegistry';
import { conservation_easement_tax_benefitCalculatorCalculator } from './conservation_easement_tax_benefitCalculatorCalculator';

export function registerconservation_easement_tax_benefitCalculatorCalculator(): void {
  calculatorRegistry.register(new conservation_easement_tax_benefitCalculatorCalculator());
}
