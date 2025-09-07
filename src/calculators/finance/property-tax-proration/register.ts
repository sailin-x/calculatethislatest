import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { PropertyTaxProrationCalculator } from './PropertyTaxProrationCalculator';

export function registerPropertyTaxProrationCalculator(): void {
  calculatorRegistry.register(PropertyTaxProrationCalculator);
}