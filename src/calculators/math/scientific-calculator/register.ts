import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ScientificCalculator } from './ScientificCalculator';

export function registerScientificCalculator(): void {
  calculatorRegistry.register(ScientificCalculator);
}

export { ScientificCalculator };
