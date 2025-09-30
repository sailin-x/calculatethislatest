import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerEstateTaxLiabilityCalculatorCalculator } from './registerEstateTaxLiabilityCalculatorCalculator';

export function registerregisterEstateTaxLiabilityCalculatorCalculator(): void {
  calculatorRegistry.register(new registerEstateTaxLiabilityCalculatorCalculator());
}
