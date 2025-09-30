import { calculatorRegistry } from '../../data/calculatorRegistry';
import { commercial_property_insuranceCalculatorCalculator } from './commercial_property_insuranceCalculatorCalculator';

export function registercommercial_property_insuranceCalculatorCalculator(): void {
  calculatorRegistry.register(new commercial_property_insuranceCalculatorCalculator());
}
