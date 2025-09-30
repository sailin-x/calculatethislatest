import { calculatorRegistry } from '../../data/calculatorRegistry';
import { inheritance_tax_estimatorCalculatorCalculator } from './inheritance_tax_estimatorCalculatorCalculator';

export function registerinheritance_tax_estimatorCalculatorCalculator(): void {
  calculatorRegistry.register(new inheritance_tax_estimatorCalculatorCalculator());
}
