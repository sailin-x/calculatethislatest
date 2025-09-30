import { calculatorRegistry } from '../../data/calculatorRegistry';
import { property_tax_prorationCalculatorCalculator } from './property_tax_prorationCalculatorCalculator';

export function registerproperty_tax_prorationCalculatorCalculator(): void {
  calculatorRegistry.register(new property_tax_prorationCalculatorCalculator());
}
