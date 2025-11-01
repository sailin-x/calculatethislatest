import { calculatorRegistry } from '../../data/calculatorRegistry';
import { generationSkippingTransferGstTaxCalculator } from './GenerationSkippingTransferGstTaxCalculator';

export function registerGenerationSkippingTransferGstTaxCalculator(): void {
  calculatorRegistry.register(generationSkippingTransferGstTaxCalculator);
}
