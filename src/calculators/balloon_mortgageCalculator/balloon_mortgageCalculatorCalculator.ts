import { Calculator } from '../../engines/CalculatorEngine';
import { balloon_mortgageCalculatorInputs, balloon_mortgageCalculatorResults, balloon_mortgageCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class balloon_mortgageCalculatorCalculator implements Calculator<balloon_mortgageCalculatorInputs, balloon_mortgageCalculatorResults> {
  readonly id = 'balloon_mortgageCalculator';
  readonly name = 'balloon_mortgageCalculator Calculator';
  readonly description = 'Calculate balloon_mortgageCalculator values';

  calculate(inputs: balloon_mortgageCalculatorInputs): balloon_mortgageCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: balloon_mortgageCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: balloon_mortgageCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
