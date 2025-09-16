import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { plannedGivingCalculator } from './PlannedGivingCalculator';

/**
 * Register the Planned Giving Calculator
 */
export function registerPlannedGivingCalculator(): void {
  calculatorRegistry.register(plannedGivingCalculator);
}