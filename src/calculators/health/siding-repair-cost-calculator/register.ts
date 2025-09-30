import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { SidingRepairCostCalculator } from './SidingRepairCostCalculator';

export function registerSidingRepairCostCalculator(): void {
  calculatorRegistry.register(SidingRepairCostCalculator);
}

export { SidingRepairCostCalculator };
