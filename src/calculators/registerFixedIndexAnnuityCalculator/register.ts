import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerFixedIndexAnnuityCalculator } from './registerFixedIndexAnnuityCalculator';

export function registerregisterFixedIndexAnnuityCalculator(): void {
  calculatorRegistry.register(new registerFixedIndexAnnuityCalculator());
}
