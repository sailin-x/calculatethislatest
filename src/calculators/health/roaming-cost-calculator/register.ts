import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { RoamingCostCalculator } from './RoamingCostCalculator';

export function registerRoamingCostCalculator(): void {
  calculatorRegistry.register(RoamingCostCalculator);
}

export { RoamingCostCalculator };
