import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { MedicalBillNegotiationCalculator } from './MedicalBillNegotiationCalculator';

export function registerMedicalBillNegotiationCalculator(): void {
  calculatorRegistry.register(MedicalBillNegotiationCalculator);
}

export { MedicalBillNegotiationCalculator };
