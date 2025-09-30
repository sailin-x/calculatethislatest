import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FoundationRepairCostCalculator } from './FoundationRepairCostCalculator';

export function registerFoundationRepairCostCalculator(): void {
  calculatorRegistry.register(FoundationRepairCostCalculator);
}

export { FoundationRepairCostCalculator };
