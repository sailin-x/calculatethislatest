import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { DentalInsuranceCostCalculator } from './DentalInsuranceCostCalculator';

export function registerDentalInsuranceCostCalculator(): void {
  calculatorRegistry.register(DentalInsuranceCostCalculator);
}

export { DentalInsuranceCostCalculator };
