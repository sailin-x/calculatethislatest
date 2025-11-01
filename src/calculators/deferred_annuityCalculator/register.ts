import { calculatorRegistry } from '../../data/calculatorRegistry';
import { deferred_annuityCalculator } from './deferred_annuityCalculator';

export function registerdeferred_annuityCalculator(): void {
  calculatorRegistry.register(new deferred_annuityCalculator());
}
