import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { TravelAdapterCostCalculator } from './TravelAdapterCostCalculator';

export function registerTravelAdapterCostCalculator(): void {
  calculatorRegistry.register(TravelAdapterCostCalculator);
}

export { TravelAdapterCostCalculator };
