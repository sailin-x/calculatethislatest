import { calculatorRegistry } from '../../data/calculatorRegistry';
import { propertyTaxProrationCalculator } from './propertyTaxProrationCalculator';

export function registerpropertyTaxProrationCalculator(): void {
  calculatorRegistry.register(new propertyTaxProrationCalculator());
}
