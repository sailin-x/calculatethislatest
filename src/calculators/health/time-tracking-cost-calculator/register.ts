import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { TimeTrackingCostCalculator } from './TimeTrackingCostCalculator';

export function registerTimeTrackingCostCalculator(): void {
  calculatorRegistry.register(TimeTrackingCostCalculator);
}

export { TimeTrackingCostCalculator };
