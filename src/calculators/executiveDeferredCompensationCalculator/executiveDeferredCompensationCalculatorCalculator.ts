import { Calculator } from '../../engines/CalculatorEngine';
import { executiveDeferredCompensationCalculatorInputs, executiveDeferredCompensationCalculatorResults, executiveDeferredCompensationCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class executiveDeferredCompensationCalculatorCalculator implements Calculator<executiveDeferredCompensationCalculatorInputs, executiveDeferredCompensationCalculatorResults> {
  readonly id = 'executiveDeferredCompensationCalculator';
  readonly name = 'executiveDeferredCompensationCalculator Calculator';
  readonly description = 'Calculate executiveDeferredCompensationCalculator values';

  calculate(inputs: executiveDeferredCompensationCalculatorInputs): executiveDeferredCompensationCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: executiveDeferredCompensationCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: executiveDeferredCompensationCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
