import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerFixedIndexAnnuityCalculatorCalculator } from './registerFixedIndexAnnuityCalculatorCalculator';

export function registerregisterFixedIndexAnnuityCalculatorCalculator(): void {
  calculatorRegistry.register(new registerFixedIndexAnnuityCalculatorCalculator());
}
