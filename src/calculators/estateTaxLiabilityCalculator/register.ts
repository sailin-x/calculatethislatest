import { calculatorRegistry } from '../../data/calculatorRegistry';
import { estateTaxLiabilityCalculatorCalculator } from './estateTaxLiabilityCalculatorCalculator';

export function registerestateTaxLiabilityCalculatorCalculator(): void {
  calculatorRegistry.register(new estateTaxLiabilityCalculatorCalculator());
}
