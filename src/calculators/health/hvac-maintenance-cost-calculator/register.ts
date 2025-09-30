import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { HvacMaintenanceCostCalculator } from './HvacMaintenanceCostCalculator';

export function registerHvacMaintenanceCostCalculator(): void {
  calculatorRegistry.register(HvacMaintenanceCostCalculator);
}

export { HvacMaintenanceCostCalculator };
