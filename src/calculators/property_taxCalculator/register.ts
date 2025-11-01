import { calculatorRegistry } from '../../data/calculatorRegistry';
import { property_taxCalculator } from './property_taxCalculator';

export function registerproperty_taxCalculator(): void {
  calculatorRegistry.register(new property_taxCalculator());
}
