import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerEstateTaxLiabilityCalculator } from './registerEstateTaxLiabilityCalculator';

export function registerregisterEstateTaxLiabilityCalculator(): void {
  calculatorRegistry.register(new registerEstateTaxLiabilityCalculator());
}
