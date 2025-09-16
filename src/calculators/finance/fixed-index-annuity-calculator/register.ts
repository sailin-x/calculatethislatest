import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { fixedIndexAnnuityCalculator } from './FixedIndexAnnuityCalculator';

/**
 * Register the Fixed Index Annuity Calculator
 */
export function registerFixedIndexAnnuityCalculator(): void {
  calculatorRegistry.register(fixedIndexAnnuityCalculator);
}