import { Calculator } from '../../engines/CalculatorEngine';
import { registerGenerationSkippingTransferGstTaxCalculatorInputs, registerGenerationSkippingTransferGstTaxCalculatorResults, registerGenerationSkippingTransferGstTaxCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerGenerationSkippingTransferGstTaxCalculatorCalculator implements Calculator<registerGenerationSkippingTransferGstTaxCalculatorInputs, registerGenerationSkippingTransferGstTaxCalculatorResults> {
  readonly id = 'registerGenerationSkippingTransferGstTaxCalculator';
  readonly name = 'registerGenerationSkippingTransferGstTaxCalculator Calculator';
  readonly description = 'Calculate registerGenerationSkippingTransferGstTaxCalculator values';

  calculate(inputs: registerGenerationSkippingTransferGstTaxCalculatorInputs): registerGenerationSkippingTransferGstTaxCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerGenerationSkippingTransferGstTaxCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerGenerationSkippingTransferGstTaxCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
