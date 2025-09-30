import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { PrescriptionCostCalculator } from './PrescriptionCostCalculator';

export function registerPrescriptionCostCalculator(): void {
  calculatorRegistry.register(PrescriptionCostCalculator);
}

export { PrescriptionCostCalculator };
