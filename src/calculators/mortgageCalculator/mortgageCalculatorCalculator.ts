import { Calculator } from '../../engines/CalculatorEngine';
import { mortgageCalculatorInputs, mortgageCalculatorResults, mortgageCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class mortgageCalculatorCalculator implements Calculator<mortgageCalculatorInputs, mortgageCalculatorResults> {
  readonly id = 'mortgageCalculator';
  readonly name = 'mortgageCalculator Calculator';
  readonly description = 'Calculate mortgageCalculator values';

  calculate(inputs: mortgageCalculatorInputs): mortgageCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: mortgageCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: mortgageCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
