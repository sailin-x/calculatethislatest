import { calculatorRegistry } from '../../data/calculatorRegistry';
import { conservation_easement_tax_benefitCalculator } from './conservation_easement_tax_benefitCalculator';

export function registerconservation_easement_tax_benefitCalculator(): void {
  calculatorRegistry.register(new conservation_easement_tax_benefitCalculator());
}
