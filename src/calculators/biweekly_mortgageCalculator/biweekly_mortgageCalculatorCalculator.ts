import { Calculator } from '../../engines/CalculatorEngine';
import { biweekly_mortgageCalculatorInputs, biweekly_mortgageCalculatorResults, biweekly_mortgageCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class biweekly_mortgageCalculatorCalculator implements Calculator<biweekly_mortgageCalculatorInputs, biweekly_mortgageCalculatorResults> {
  readonly id = 'biweekly_mortgageCalculator';
  readonly name = 'biweekly_mortgageCalculator Calculator';
  readonly description = 'Calculate biweekly_mortgageCalculator values';

  calculate(inputs: biweekly_mortgageCalculatorInputs): biweekly_mortgageCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: biweekly_mortgageCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: biweekly_mortgageCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
