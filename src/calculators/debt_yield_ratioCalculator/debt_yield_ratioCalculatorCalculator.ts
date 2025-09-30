import { Calculator } from '../../engines/CalculatorEngine';
import { debt_yield_ratioCalculatorInputs, debt_yield_ratioCalculatorResults, debt_yield_ratioCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class debt_yield_ratioCalculatorCalculator implements Calculator<debt_yield_ratioCalculatorInputs, debt_yield_ratioCalculatorResults> {
  readonly id = 'debt_yield_ratioCalculator';
  readonly name = 'debt_yield_ratioCalculator Calculator';
  readonly description = 'Calculate debt_yield_ratioCalculator values';

  calculate(inputs: debt_yield_ratioCalculatorInputs): debt_yield_ratioCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: debt_yield_ratioCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: debt_yield_ratioCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
