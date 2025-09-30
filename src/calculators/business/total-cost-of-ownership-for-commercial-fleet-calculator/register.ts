import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { TotalCostOfOwnershipForCommercialFleetCalculator } from './TotalCostOfOwnershipForCommercialFleetCalculator';

export function registerTotalCostOfOwnershipForCommercialFleetCalculator(): void {
  calculatorRegistry.register(TotalCostOfOwnershipForCommercialFleetCalculator);
}

export { TotalCostOfOwnershipForCommercialFleetCalculator };
