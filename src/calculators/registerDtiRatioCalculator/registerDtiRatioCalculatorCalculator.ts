import { Calculator } from '../../engines/CalculatorEngine';
import { registerDtiRatioCalculatorInputs, registerDtiRatioCalculatorResults, registerDtiRatioCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerDtiRatioCalculatorCalculator implements Calculator<registerDtiRatioCalculatorInputs, registerDtiRatioCalculatorResults> {
  readonly id = 'registerDtiRatioCalculator';
  readonly name = 'registerDtiRatioCalculator Calculator';
  readonly description = 'Calculate registerDtiRatioCalculator values';

  calculate(inputs: registerDtiRatioCalculatorInputs): registerDtiRatioCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerDtiRatioCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerDtiRatioCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
