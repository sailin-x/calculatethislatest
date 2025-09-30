import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ElectricalRepairCostCalculator } from './ElectricalRepairCostCalculator';

export function registerElectricalRepairCostCalculator(): void {
  calculatorRegistry.register(ElectricalRepairCostCalculator);
}

export { ElectricalRepairCostCalculator };
