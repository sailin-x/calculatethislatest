import { calculatorRegistry } from '../../data/calculatorRegistry';
import { commercial_property_valuationCalculatorCalculator } from './commercial_property_valuationCalculatorCalculator';

export function registercommercial_property_valuationCalculatorCalculator(): void {
  calculatorRegistry.register(new commercial_property_valuationCalculatorCalculator());
}
