import { calculatorRegistry } from '../../data/calculatorRegistry';
import { fixedIndexAnnuityCalculator } from './fixedIndexAnnuityCalculator';

export function registerfixedIndexAnnuityCalculator(): void {
  calculatorRegistry.register(new fixedIndexAnnuityCalculator());
}
