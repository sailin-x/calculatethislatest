import { calculatorRegistry } from '../../data/calculatorRegistry';
import { property_taxCalculatorCalculator } from './property_taxCalculatorCalculator';

export function registerproperty_taxCalculatorCalculator(): void {
  calculatorRegistry.register(new property_taxCalculatorCalculator());
}
