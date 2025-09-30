import { Calculator } from '../../engines/CalculatorEngine';
import { Four01kCalculatorInputs, Four01kCalculatorResults, Four01kCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class Four01kCalculatorCalculator implements Calculator<Four01kCalculatorInputs, Four01kCalculatorResults> {
  readonly id = '401kCalculator';
  readonly name = '401kCalculator Calculator';
  readonly description = 'Calculate 401kCalculator values';

  calculate(inputs: Four01kCalculatorInputs): Four01kCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: Four01kCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: Four01kCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
