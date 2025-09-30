import { Calculator } from '../../engines/CalculatorEngine';
import { reverseMortgageCalculatorInputs, reverseMortgageCalculatorResults, reverseMortgageCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class reverseMortgageCalculatorCalculator implements Calculator<reverseMortgageCalculatorInputs, reverseMortgageCalculatorResults> {
  readonly id = 'reverseMortgageCalculator';
  readonly name = 'reverseMortgageCalculator Calculator';
  readonly description = 'Calculate reverseMortgageCalculator values';

  calculate(inputs: reverseMortgageCalculatorInputs): reverseMortgageCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: reverseMortgageCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: reverseMortgageCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
