import { Calculator } from '../../engines/CalculatorEngine';
import { registerExecutiveDeferredCompensationCalculatorInputs, registerExecutiveDeferredCompensationCalculatorResults, registerExecutiveDeferredCompensationCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerExecutiveDeferredCompensationCalculatorCalculator implements Calculator<registerExecutiveDeferredCompensationCalculatorInputs, registerExecutiveDeferredCompensationCalculatorResults> {
  readonly id = 'registerExecutiveDeferredCompensationCalculator';
  readonly name = 'registerExecutiveDeferredCompensationCalculator Calculator';
  readonly description = 'Calculate registerExecutiveDeferredCompensationCalculator values';

  calculate(inputs: registerExecutiveDeferredCompensationCalculatorInputs): registerExecutiveDeferredCompensationCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerExecutiveDeferredCompensationCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerExecutiveDeferredCompensationCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
