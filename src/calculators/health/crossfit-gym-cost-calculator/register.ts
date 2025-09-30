import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { CrossfitGymCostCalculator } from './CrossfitGymCostCalculator';

export function registerCrossfitGymCostCalculator(): void {
  calculatorRegistry.register(CrossfitGymCostCalculator);
}

export { CrossfitGymCostCalculator };
