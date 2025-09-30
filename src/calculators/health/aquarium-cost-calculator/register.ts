import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { AquariumCostCalculator } from './AquariumCostCalculator';

export function registerAquariumCostCalculator(): void {
  calculatorRegistry.register(AquariumCostCalculator);
}

export { AquariumCostCalculator };
