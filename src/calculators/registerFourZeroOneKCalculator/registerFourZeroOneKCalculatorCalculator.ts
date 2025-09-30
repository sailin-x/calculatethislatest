import { Calculator } from '../../engines/CalculatorEngine';
import { registerFourZeroOneKCalculatorInputs, registerFourZeroOneKCalculatorResults, registerFourZeroOneKCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerFourZeroOneKCalculatorCalculator implements Calculator<registerFourZeroOneKCalculatorInputs, registerFourZeroOneKCalculatorResults> {
  readonly id = 'registerFourZeroOneKCalculator';
  readonly name = 'registerFourZeroOneKCalculator Calculator';
  readonly description = 'Calculate registerFourZeroOneKCalculator values';

  calculate(inputs: registerFourZeroOneKCalculatorInputs): registerFourZeroOneKCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerFourZeroOneKCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerFourZeroOneKCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
