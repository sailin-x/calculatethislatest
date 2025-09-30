import { Calculator } from '../../engines/CalculatorEngine';
import { hoa_feeCalculatorInputs, hoa_feeCalculatorResults, hoa_feeCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class hoa_feeCalculatorCalculator implements Calculator<hoa_feeCalculatorInputs, hoa_feeCalculatorResults> {
  readonly id = 'hoa_feeCalculator';
  readonly name = 'hoa_feeCalculator Calculator';
  readonly description = 'Calculate hoa_feeCalculator values';

  calculate(inputs: hoa_feeCalculatorInputs): hoa_feeCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: hoa_feeCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: hoa_feeCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
