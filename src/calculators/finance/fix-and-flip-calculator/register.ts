import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FixAndFlipCalculator } from './FixAndFlipCalculator';

export function registerFixAndFlipCalculator(): void {
  calculatorRegistry.register(FixAndFlipCalculator);
}

export { FixAndFlipCalculator };
