import { calculatorRegistry } from '../../data/calculatorRegistry';
import { GenerationSkippingTransferGstTaxCalculatorCalculator } from './GenerationSkippingTransferGstTaxCalculatorCalculator';

export function registerGenerationSkippingTransferGstTaxCalculatorCalculator(): void {
  calculatorRegistry.register(new GenerationSkippingTransferGstTaxCalculatorCalculator());
}
