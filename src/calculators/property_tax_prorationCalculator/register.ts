import { calculatorRegistry } from '../../data/calculatorRegistry';
import { property_tax_prorationCalculator } from './property_tax_prorationCalculator';

export function registerproperty_tax_prorationCalculator(): void {
  calculatorRegistry.register(new property_tax_prorationCalculator());
}
