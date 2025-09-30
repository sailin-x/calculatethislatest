import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { CampingCostCalculator } from './CampingCostCalculator';

export function registerCampingCostCalculator(): void {
  calculatorRegistry.register(CampingCostCalculator);
}

export { CampingCostCalculator };
