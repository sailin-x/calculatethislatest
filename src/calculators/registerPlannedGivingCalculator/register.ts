import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerPlannedGivingCalculator } from './registerPlannedGivingCalculator';

export function registerregisterPlannedGivingCalculator(): void {
  calculatorRegistry.register(new registerPlannedGivingCalculator());
}
