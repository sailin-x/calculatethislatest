import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { PlannedGivingCalculator } from './PlannedGivingCalculator';

export function registerPlannedGivingCalculator(): void {
  calculatorRegistry.register(PlannedGivingCalculator);
}

export { PlannedGivingCalculator };
