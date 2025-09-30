import { calculatorRegistry } from '../../data/calculatorRegistry';
import { rental_property_roiCalculatorCalculator } from './rental_property_roiCalculatorCalculator';

export function registerrental_property_roiCalculatorCalculator(): void {
  calculatorRegistry.register(new rental_property_roiCalculatorCalculator());
}
