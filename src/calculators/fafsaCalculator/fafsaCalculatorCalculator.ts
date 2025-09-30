import { Calculator } from '../../engines/CalculatorEngine';
import { fafsaCalculatorInputs, fafsaCalculatorResults, fafsaCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class fafsaCalculatorCalculator implements Calculator<fafsaCalculatorInputs, fafsaCalculatorResults> {
  readonly id = 'fafsaCalculator';
  readonly name = 'fafsaCalculator Calculator';
  readonly description = 'Calculate fafsaCalculator values';

  calculate(inputs: fafsaCalculatorInputs): fafsaCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: fafsaCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: fafsaCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
