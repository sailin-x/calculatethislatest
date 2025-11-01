import { calculatorRegistry } from '../../data/calculatorRegistry';
import { estateTaxLiabilityCalculator } from './estateTaxLiabilityCalculator';

export function registerestateTaxLiabilityCalculator(): void {
  calculatorRegistry.register(new estateTaxLiabilityCalculator());
}
