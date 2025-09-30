import { Calculator } from '../../engines/CalculatorEngine';
import { marketingROICalculatorInputs, marketingROICalculatorResults, marketingROICalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class marketingROICalculatorCalculator implements Calculator<marketingROICalculatorInputs, marketingROICalculatorResults> {
  readonly id = 'marketingROICalculator';
  readonly name = 'marketingROICalculator Calculator';
  readonly description = 'Calculate marketingROICalculator values';

  calculate(inputs: marketingROICalculatorInputs): marketingROICalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: marketingROICalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: marketingROICalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
