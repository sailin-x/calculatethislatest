import { calculatorRegistry } from '../../data/calculatorRegistry';
import { commercial_property_valuationCalculator } from './commercial_property_valuationCalculator';

export function registercommercial_property_valuationCalculator(): void {
  calculatorRegistry.register(new commercial_property_valuationCalculator());
}
