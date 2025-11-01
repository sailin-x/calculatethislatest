import { calculatorRegistry } from '../../data/calculatorRegistry';
import { scientificCalculator } from './scientificCalculator';

export function registerscientificCalculator(): void {
  calculatorRegistry.register(new scientificCalculator());
}
