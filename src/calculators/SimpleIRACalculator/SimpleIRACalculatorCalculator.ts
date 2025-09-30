import { Calculator } from '../../engines/CalculatorEngine';
import { SimpleIRACalculatorInputs, SimpleIRACalculatorResults, SimpleIRACalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class SimpleIRACalculatorCalculator implements Calculator<SimpleIRACalculatorInputs, SimpleIRACalculatorResults> {
  readonly id = 'SimpleIRACalculator';
  readonly name = 'SimpleIRACalculator Calculator';
  readonly description = 'Calculate SimpleIRACalculator values';

  calculate(inputs: SimpleIRACalculatorInputs): SimpleIRACalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: SimpleIRACalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: SimpleIRACalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
