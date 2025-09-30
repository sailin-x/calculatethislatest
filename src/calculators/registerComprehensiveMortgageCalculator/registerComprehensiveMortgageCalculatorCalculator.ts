import { Calculator } from '../../engines/CalculatorEngine';
import { registerComprehensiveMortgageCalculatorInputs, registerComprehensiveMortgageCalculatorResults, registerComprehensiveMortgageCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerComprehensiveMortgageCalculatorCalculator implements Calculator<registerComprehensiveMortgageCalculatorInputs, registerComprehensiveMortgageCalculatorResults> {
  readonly id = 'registerComprehensiveMortgageCalculator';
  readonly name = 'registerComprehensiveMortgageCalculator Calculator';
  readonly description = 'Calculate registerComprehensiveMortgageCalculator values';

  calculate(inputs: registerComprehensiveMortgageCalculatorInputs): registerComprehensiveMortgageCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerComprehensiveMortgageCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerComprehensiveMortgageCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
