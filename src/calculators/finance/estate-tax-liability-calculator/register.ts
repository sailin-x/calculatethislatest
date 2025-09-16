import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { estateTaxLiabilityCalculator } from './EstateTaxLiabilityCalculator';

/**
 * Register the Estate Tax Liability Calculator
 */
export function registerEstateTaxLiabilityCalculator(): void {
  calculatorRegistry.register(estateTaxLiabilityCalculator);
}