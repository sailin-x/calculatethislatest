import { calculatorRegistry } from '../../data/calculatorRegistry';
import { inheritance_tax_estimatorCalculator } from './inheritance_tax_estimatorCalculator';

export function registerinheritance_tax_estimatorCalculator(): void {
  calculatorRegistry.register(new inheritance_tax_estimatorCalculator());
}
