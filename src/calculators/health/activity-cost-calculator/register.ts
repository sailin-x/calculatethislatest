import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ActivityCostCalculator } from './ActivityCostCalculator';

export function registerActivityCostCalculator(): void {
  calculatorRegistry.register(ActivityCostCalculator);
}

export { ActivityCostCalculator };
