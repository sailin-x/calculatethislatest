import { Calculator } from '../../engines/CalculatorEngine';
import { fourZeroOneKCalculatorInputs, fourZeroOneKCalculatorResults, fourZeroOneKCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class fourZeroOneKCalculatorCalculator implements Calculator<fourZeroOneKCalculatorInputs, fourZeroOneKCalculatorResults> {
  readonly id = 'fourZeroOneKCalculator';
  readonly name = 'fourZeroOneKCalculator Calculator';
  readonly description = 'Calculate fourZeroOneKCalculator values';

  calculate(inputs: fourZeroOneKCalculatorInputs): fourZeroOneKCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: fourZeroOneKCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: fourZeroOneKCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
