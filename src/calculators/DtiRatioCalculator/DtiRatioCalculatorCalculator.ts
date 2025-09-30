import { Calculator } from '../../engines/CalculatorEngine';
import { DtiRatioCalculatorInputs, DtiRatioCalculatorResults, DtiRatioCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class DtiRatioCalculatorCalculator implements Calculator<DtiRatioCalculatorInputs, DtiRatioCalculatorResults> {
  readonly id = 'DtiRatioCalculator';
  readonly name = 'DtiRatioCalculator Calculator';
  readonly description = 'Calculate DtiRatioCalculator values';

  calculate(inputs: DtiRatioCalculatorInputs): DtiRatioCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: DtiRatioCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: DtiRatioCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
