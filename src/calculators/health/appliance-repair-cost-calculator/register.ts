import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ApplianceRepairCostCalculator } from './ApplianceRepairCostCalculator';

export function registerApplianceRepairCostCalculator(): void {
  calculatorRegistry.register(ApplianceRepairCostCalculator);
}

export { ApplianceRepairCostCalculator };
