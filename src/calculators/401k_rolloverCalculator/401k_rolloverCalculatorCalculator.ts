import { Calculator } from '../../engines/CalculatorEngine';
import { 401k_rolloverCalculatorInputs, 401k_rolloverCalculatorResults, 401k_rolloverCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class 401k_rolloverCalculatorCalculator implements Calculator<401k_rolloverCalculatorInputs, 401k_rolloverCalculatorResults> {
  readonly id = '401k_rolloverCalculator';
  readonly name = '401k_rolloverCalculator Calculator';
  readonly description = 'Calculate 401k_rolloverCalculator values';

  calculate(inputs: 401k_rolloverCalculatorInputs): 401k_rolloverCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: 401k_rolloverCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: 401k_rolloverCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
