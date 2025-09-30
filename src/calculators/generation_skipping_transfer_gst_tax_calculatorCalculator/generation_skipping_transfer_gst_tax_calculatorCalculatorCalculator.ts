import { Calculator } from '../../engines/CalculatorEngine';
import { generation_skipping_transfer_gst_tax_calculatorCalculatorInputs, generation_skipping_transfer_gst_tax_calculatorCalculatorResults, generation_skipping_transfer_gst_tax_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class generation_skipping_transfer_gst_tax_calculatorCalculatorCalculator implements Calculator<generation_skipping_transfer_gst_tax_calculatorCalculatorInputs, generation_skipping_transfer_gst_tax_calculatorCalculatorResults> {
  readonly id = 'generation_skipping_transfer_gst_tax_calculatorCalculator';
  readonly name = 'generation_skipping_transfer_gst_tax_calculatorCalculator Calculator';
  readonly description = 'Calculate generation_skipping_transfer_gst_tax_calculatorCalculator values';

  calculate(inputs: generation_skipping_transfer_gst_tax_calculatorCalculatorInputs): generation_skipping_transfer_gst_tax_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: generation_skipping_transfer_gst_tax_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: generation_skipping_transfer_gst_tax_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
