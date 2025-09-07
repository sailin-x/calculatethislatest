import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { PropertyTaxCalculator } from './PropertyTaxCalculator';

export function registerPropertyTaxCalculator(): void {
  calculatorRegistry.register(PropertyTaxCalculator);
}