import { calculatorRegistry } from '../../data/calculatorRegistry';
import { rental_property_roiCalculator } from './rental_property_roiCalculator';

export function registerrental_property_roiCalculator(): void {
  calculatorRegistry.register(new rental_property_roiCalculator());
}
