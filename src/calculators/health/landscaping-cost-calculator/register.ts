import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { LandscapingCostCalculator } from './LandscapingCostCalculator';

export function registerLandscapingCostCalculator(): void {
  calculatorRegistry.register(LandscapingCostCalculator);
}

export { LandscapingCostCalculator };
