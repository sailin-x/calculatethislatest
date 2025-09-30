import { calculatorRegistry } from '../../data/calculatorRegistry';
import { propertyTaxProrationCalculatorCalculator } from './propertyTaxProrationCalculatorCalculator';

export function registerpropertyTaxProrationCalculatorCalculator(): void {
  calculatorRegistry.register(new propertyTaxProrationCalculatorCalculator());
}
