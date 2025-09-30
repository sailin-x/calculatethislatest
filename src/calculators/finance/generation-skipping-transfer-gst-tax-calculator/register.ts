import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { GenerationSkippingTransferGstTaxCalculator } from './GenerationSkippingTransferGstTaxCalculator';

export function registerGenerationSkippingTransferGstTaxCalculator(): void {
  calculatorRegistry.register(GenerationSkippingTransferGstTaxCalculator);
}

export { GenerationSkippingTransferGstTaxCalculator };