import { Calculator } from '../../engines/CalculatorEngine';
import { registerReverseMortgageCalculatorInputs, registerReverseMortgageCalculatorResults, registerReverseMortgageCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerReverseMortgageCalculatorCalculator implements Calculator<registerReverseMortgageCalculatorInputs, registerReverseMortgageCalculatorResults> {
  readonly id = 'registerReverseMortgageCalculator';
  readonly name = 'registerReverseMortgageCalculator Calculator';
  readonly description = 'Calculate registerReverseMortgageCalculator values';

  calculate(inputs: registerReverseMortgageCalculatorInputs): registerReverseMortgageCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerReverseMortgageCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerReverseMortgageCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
