import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { PoolMaintenanceCostCalculator } from './PoolMaintenanceCostCalculator';

export function registerPoolMaintenanceCostCalculator(): void {
  calculatorRegistry.register(PoolMaintenanceCostCalculator);
}

export { PoolMaintenanceCostCalculator };
