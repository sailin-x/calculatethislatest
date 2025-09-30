import { Calculator } from '../../engines/CalculatorEngine';
import { CurrentRatioCalculatorInputs, CurrentRatioCalculatorResults, CurrentRatioCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class CurrentRatioCalculatorCalculator implements Calculator<CurrentRatioCalculatorInputs, CurrentRatioCalculatorResults> {
  readonly id = 'CurrentRatioCalculator';
  readonly name = 'CurrentRatioCalculator Calculator';
  readonly description = 'Calculate CurrentRatioCalculator values';

  calculate(inputs: CurrentRatioCalculatorInputs): CurrentRatioCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: CurrentRatioCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: CurrentRatioCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
