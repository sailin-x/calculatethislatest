import { Calculator } from '../../engines/CalculatorEngine';
import { registerCurrentRatioCalculatorInputs, registerCurrentRatioCalculatorResults, registerCurrentRatioCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerCurrentRatioCalculatorCalculator implements Calculator<registerCurrentRatioCalculatorInputs, registerCurrentRatioCalculatorResults> {
  readonly id = 'registerCurrentRatioCalculator';
  readonly name = 'registerCurrentRatioCalculator Calculator';
  readonly description = 'Calculate registerCurrentRatioCalculator values';

  calculate(inputs: registerCurrentRatioCalculatorInputs): registerCurrentRatioCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerCurrentRatioCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerCurrentRatioCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
