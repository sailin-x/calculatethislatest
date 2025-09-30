import { Calculator } from '../../engines/CalculatorEngine';
import { 401kCalculatorInputs, 401kCalculatorResults, 401kCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class 401kCalculatorCalculator implements Calculator<401kCalculatorInputs, 401kCalculatorResults> {
  readonly id = '401kCalculator';
  readonly name = '401kCalculator Calculator';
  readonly description = 'Calculate 401kCalculator values';

  calculate(inputs: 401kCalculatorInputs): 401kCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: 401kCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: 401kCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
