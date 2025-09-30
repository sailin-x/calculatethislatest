import { Calculator } from '../../engines/CalculatorEngine';
import { registerEbitdaCalculatorInputs, registerEbitdaCalculatorResults, registerEbitdaCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerEbitdaCalculatorCalculator implements Calculator<registerEbitdaCalculatorInputs, registerEbitdaCalculatorResults> {
  readonly id = 'registerEbitdaCalculator';
  readonly name = 'registerEbitdaCalculator Calculator';
  readonly description = 'Calculate registerEbitdaCalculator values';

  calculate(inputs: registerEbitdaCalculatorInputs): registerEbitdaCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerEbitdaCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerEbitdaCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
