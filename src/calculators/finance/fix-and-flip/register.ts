import { CalculatorRegistry } from '../../../data/calculatorRegistry';
import { FixAndFlipCalculator } from './FixAndFlipCalculator';

export function registerFixAndFlipCalculator(registry: CalculatorRegistry): void {
  registry.register(FixAndFlipCalculator);
}

export { FixAndFlipCalculator };
