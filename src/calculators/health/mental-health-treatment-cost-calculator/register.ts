import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { MentalHealthTreatmentCostCalculator } from './MentalHealthTreatmentCostCalculator';

export function registerMentalHealthTreatmentCostCalculator(): void {
  calculatorRegistry.register(MentalHealthTreatmentCostCalculator);
}

export { MentalHealthTreatmentCostCalculator };
