import { Calculator } from '../../engines/CalculatorEngine';
import { comprehensiveMortgageCalculatorInputs, comprehensiveMortgageCalculatorResults, comprehensiveMortgageCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class comprehensiveMortgageCalculatorCalculator implements Calculator<comprehensiveMortgageCalculatorInputs, comprehensiveMortgageCalculatorResults> {
  readonly id = 'comprehensiveMortgageCalculator';
  readonly name = 'comprehensiveMortgageCalculator Calculator';
  readonly description = 'Calculate comprehensiveMortgageCalculator values';

  calculate(inputs: comprehensiveMortgageCalculatorInputs): comprehensiveMortgageCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: comprehensiveMortgageCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: comprehensiveMortgageCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
