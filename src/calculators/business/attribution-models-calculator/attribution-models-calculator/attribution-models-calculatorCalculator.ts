import { Calculator } from '../../engines/CalculatorEngine';
import { attribution-models-calculatorInputs, attribution-models-calculatorResults, attribution-models-calculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class attribution-models-calculatorCalculator implements Calculator<attribution-models-calculatorInputs, attribution-models-calculatorResults> {
  readonly id = 'attribution-models-calculator';
  readonly name = 'attribution models calculator Calculator';
  readonly description = 'Calculate attribution models calculator values';

  calculate(inputs: attribution-models-calculatorInputs): attribution-models-calculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: attribution-models-calculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: attribution-models-calculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
