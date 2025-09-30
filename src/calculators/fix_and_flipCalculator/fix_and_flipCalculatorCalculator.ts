import { Calculator } from '../../engines/CalculatorEngine';
import { fix_and_flipCalculatorInputs, fix_and_flipCalculatorResults, fix_and_flipCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class fix_and_flipCalculatorCalculator implements Calculator<fix_and_flipCalculatorInputs, fix_and_flipCalculatorResults> {
  readonly id = 'fix_and_flipCalculator';
  readonly name = 'fix_and_flipCalculator Calculator';
  readonly description = 'Calculate fix_and_flipCalculator values';

  calculate(inputs: fix_and_flipCalculatorInputs): fix_and_flipCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: fix_and_flipCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: fix_and_flipCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
