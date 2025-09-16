import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { generationSkippingTransferTaxCalculator } from './GenerationSkippingTransferTaxCalculator';

/**
 * Register the Generation-Skipping Transfer Tax Calculator
 */
export function registerGenerationSkippingTransferTaxCalculator(): void {
  calculatorRegistry.register(generationSkippingTransferTaxCalculator);
}