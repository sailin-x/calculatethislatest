import { calculatorRegistry } from '../../data/calculatorRegistry';
import { commercial_property_insuranceCalculator } from './commercial_property_insuranceCalculator';

export function registercommercial_property_insuranceCalculator(): void {
  calculatorRegistry.register(new commercial_property_insuranceCalculator());
}
