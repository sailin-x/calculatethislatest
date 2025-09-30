import { Calculator } from '../../engines/CalculatorEngine';
import { mortgageRefinanceCalculatorInputs, mortgageRefinanceCalculatorResults, mortgageRefinanceCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class mortgageRefinanceCalculatorCalculator implements Calculator<mortgageRefinanceCalculatorInputs, mortgageRefinanceCalculatorResults> {
  readonly id = 'mortgageRefinanceCalculator';
  readonly name = 'mortgageRefinanceCalculator Calculator';
  readonly description = 'Calculate mortgageRefinanceCalculator values';

  calculate(inputs: mortgageRefinanceCalculatorInputs): mortgageRefinanceCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: mortgageRefinanceCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: mortgageRefinanceCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
