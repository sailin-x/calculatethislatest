import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { generationSkippingTransferGstTaxCalculator } from './GenerationSkippingTransferGstTaxCalculator';

/**
 * Register the Generation-Skipping Transfer (GST) Tax Calculator
 */
export function registerGenerationSkippingTransferGstTaxCalculator(): void {
  calculatorRegistry.register(generationSkippingTransferGstTaxCalculator);
}

/**
 * Unregister the Generation-Skipping Transfer (GST) Tax Calculator
 */
export function unregisterGenerationSkippingTransferGstTaxCalculator(): void {
  calculatorRegistry.unregister('generation-skipping-transfer-gst-tax-calculator');
}