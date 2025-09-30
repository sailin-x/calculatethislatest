import { calculatorRegistry } from '../../data/calculatorRegistry';
import { rental_property_roi_calculatorCalculatorCalculator } from './rental_property_roi_calculatorCalculatorCalculator';

export function registerrental_property_roi_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new rental_property_roi_calculatorCalculatorCalculator());
}
