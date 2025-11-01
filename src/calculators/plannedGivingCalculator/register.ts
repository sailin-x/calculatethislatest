import { calculatorRegistry } from '../../data/calculatorRegistry';
import { plannedGivingCalculator } from './plannedGivingCalculator';

export function registerplannedGivingCalculator(): void {
  calculatorRegistry.register(new plannedGivingCalculator());
}
