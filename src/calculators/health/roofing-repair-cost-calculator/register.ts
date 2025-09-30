import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { RoofingRepairCostCalculator } from './RoofingRepairCostCalculator';

export function registerRoofingRepairCostCalculator(): void {
  calculatorRegistry.register(RoofingRepairCostCalculator);
}

export { RoofingRepairCostCalculator };
