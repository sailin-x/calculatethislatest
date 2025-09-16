import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { rothConversionTaxCalculator } from './RothConversionTaxCalculator';

/**
 * Register the Roth Conversion Tax Calculator
 */
export function registerRothConversionTaxCalculator(): void {
  calculatorRegistry.register(rothConversionTaxCalculator);
}