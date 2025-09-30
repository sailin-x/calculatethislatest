import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { KetoCalculator } from './KetoCalculator';

export function registerKetoCalculator(): void {
  calculatorRegistry.register(KetoCalculator);
}

export { KetoCalculator };
