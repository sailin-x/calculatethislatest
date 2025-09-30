import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { PublicTransportationCostCalculator } from './PublicTransportationCostCalculator';

export function registerPublicTransportationCostCalculator(): void {
  calculatorRegistry.register(PublicTransportationCostCalculator);
}

export { PublicTransportationCostCalculator };
