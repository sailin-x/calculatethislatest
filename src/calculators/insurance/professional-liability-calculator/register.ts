import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ProfessionalLiabilityCalculator } from './ProfessionalLiabilityCalculator';

export function registerProfessionalLiabilityCalculator(): void {
  calculatorRegistry.register(ProfessionalLiabilityCalculator);
}

export { ProfessionalLiabilityCalculator };
