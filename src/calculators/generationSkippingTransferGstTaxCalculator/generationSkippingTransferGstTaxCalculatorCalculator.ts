import { Calculator } from '../../engines/CalculatorEngine';
import { GenerationSkippingTransferGstTaxCalculatorInputs, GenerationSkippingTransferGstTaxCalculatorResults, GenerationSkippingTransferGstTaxCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class GenerationSkippingTransferGstTaxCalculatorCalculator implements Calculator<GenerationSkippingTransferGstTaxCalculatorInputs, GenerationSkippingTransferGstTaxCalculatorResults> {
  readonly id = 'GenerationSkippingTransferGstTaxCalculator';
  readonly name = 'GenerationSkippingTransferGstTaxCalculator Calculator';
  readonly description = 'Calculate GenerationSkippingTransferGstTaxCalculator values';

  calculate(inputs: GenerationSkippingTransferGstTaxCalculatorInputs): GenerationSkippingTransferGstTaxCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: GenerationSkippingTransferGstTaxCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: GenerationSkippingTransferGstTaxCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
