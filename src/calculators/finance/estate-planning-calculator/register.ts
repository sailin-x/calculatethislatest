import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { estatePlanningCalculator } from './EstatePlanningCalculator';

/**
 * Register the Estate Planning Calculator
 */
export function registerEstatePlanningCalculator(): void {
  calculatorRegistry.register(estatePlanningCalculator);
}
