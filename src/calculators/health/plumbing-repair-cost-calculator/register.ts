import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { PlumbingRepairCostCalculator } from './PlumbingRepairCostCalculator';

export function registerPlumbingRepairCostCalculator(): void {
  calculatorRegistry.register(PlumbingRepairCostCalculator);
}

export { PlumbingRepairCostCalculator };
