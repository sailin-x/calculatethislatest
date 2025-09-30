import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { HospitalNegligenceCalculator } from './HospitalNegligenceCalculator';

export function registerHospitalNegligenceCalculator(): void {
  calculatorRegistry.register(HospitalNegligenceCalculator);
}

export { HospitalNegligenceCalculator };
