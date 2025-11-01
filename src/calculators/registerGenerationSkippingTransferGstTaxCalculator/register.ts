import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerGenerationSkippingTransferGstTaxCalculator } from './registerGenerationSkippingTransferGstTaxCalculator';

export function registerregisterGenerationSkippingTransferGstTaxCalculator(): void {
  calculatorRegistry.register(new registerGenerationSkippingTransferGstTaxCalculator());
}
