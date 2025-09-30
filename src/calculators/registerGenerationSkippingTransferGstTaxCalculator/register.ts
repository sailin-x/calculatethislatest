import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerGenerationSkippingTransferGstTaxCalculatorCalculator } from './registerGenerationSkippingTransferGstTaxCalculatorCalculator';

export function registerregisterGenerationSkippingTransferGstTaxCalculatorCalculator(): void {
  calculatorRegistry.register(new registerGenerationSkippingTransferGstTaxCalculatorCalculator());
}
