import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { HomeCleaningCostCalculator } from './HomeCleaningCostCalculator';

export function registerHomeCleaningCostCalculator(): void {
  calculatorRegistry.register(HomeCleaningCostCalculator);
}

export { HomeCleaningCostCalculator };
