import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { TourCostCalculator } from './TourCostCalculator';

export function registerTourCostCalculator(): void {
  calculatorRegistry.register(TourCostCalculator);
}

export { TourCostCalculator };
