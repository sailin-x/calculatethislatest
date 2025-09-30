import { Calculator } from '../../engines/CalculatorEngine';
import { rentVsBuyCalculatorInputs, rentVsBuyCalculatorResults, rentVsBuyCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class rentVsBuyCalculatorCalculator implements Calculator<rentVsBuyCalculatorInputs, rentVsBuyCalculatorResults> {
  readonly id = 'rentVsBuyCalculator';
  readonly name = 'rentVsBuyCalculator Calculator';
  readonly description = 'Calculate rentVsBuyCalculator values';

  calculate(inputs: rentVsBuyCalculatorInputs): rentVsBuyCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: rentVsBuyCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: rentVsBuyCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
