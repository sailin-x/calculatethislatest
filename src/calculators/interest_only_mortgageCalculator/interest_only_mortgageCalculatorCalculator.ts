import { Calculator } from '../../engines/CalculatorEngine';
import { interest_only_mortgageCalculatorInputs, interest_only_mortgageCalculatorResults, interest_only_mortgageCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class interest_only_mortgageCalculatorCalculator implements Calculator<interest_only_mortgageCalculatorInputs, interest_only_mortgageCalculatorResults> {
  readonly id = 'interest_only_mortgageCalculator';
  readonly name = 'interest_only_mortgageCalculator Calculator';
  readonly description = 'Calculate interest_only_mortgageCalculator values';

  calculate(inputs: interest_only_mortgageCalculatorInputs): interest_only_mortgageCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: interest_only_mortgageCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: interest_only_mortgageCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
