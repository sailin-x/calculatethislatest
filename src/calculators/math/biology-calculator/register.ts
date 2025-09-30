import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { BiologyCalculator } from './BiologyCalculator';

export function registerBiologyCalculator(): void {
  calculatorRegistry.register(BiologyCalculator);
}

export { BiologyCalculator };
