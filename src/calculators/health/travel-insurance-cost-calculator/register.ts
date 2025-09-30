import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { TravelInsuranceCostCalculator } from './TravelInsuranceCostCalculator';

export function registerTravelInsuranceCostCalculator(): void {
  calculatorRegistry.register(TravelInsuranceCostCalculator);
}

export { TravelInsuranceCostCalculator };
