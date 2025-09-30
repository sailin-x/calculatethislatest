import { Calculator } from '../../engines/CalculatorEngine';
import { registerCorrelationCalculatorInputs, registerCorrelationCalculatorResults, registerCorrelationCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerCorrelationCalculatorCalculator implements Calculator<registerCorrelationCalculatorInputs, registerCorrelationCalculatorResults> {
  readonly id = 'registerCorrelationCalculator';
  readonly name = 'registerCorrelationCalculator Calculator';
  readonly description = 'Calculate registerCorrelationCalculator values';

  calculate(inputs: registerCorrelationCalculatorInputs): registerCorrelationCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerCorrelationCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerCorrelationCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
