import { Calculator } from '../../engines/CalculatorEngine';
import { reverse_mortgageCalculatorInputs, reverse_mortgageCalculatorResults, reverse_mortgageCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class reverse_mortgageCalculatorCalculator implements Calculator<reverse_mortgageCalculatorInputs, reverse_mortgageCalculatorResults> {
  readonly id = 'reverse_mortgageCalculator';
  readonly name = 'reverse_mortgageCalculator Calculator';
  readonly description = 'Calculate reverse_mortgageCalculator values';

  calculate(inputs: reverse_mortgageCalculatorInputs): reverse_mortgageCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: reverse_mortgageCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: reverse_mortgageCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
