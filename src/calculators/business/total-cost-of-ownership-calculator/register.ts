import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { TotalCostOfOwnershipCalculator } from './TotalCostOfOwnershipCalculator';

export function registerTotalCostOfOwnershipCalculator(): void {
  calculatorRegistry.register(TotalCostOfOwnershipCalculator);
}

export { TotalCostOfOwnershipCalculator };
