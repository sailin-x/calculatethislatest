import { Calculator } from '../../engines/CalculatorEngine';
import { seed_starting_calculatorCalculatorInputs, seed_starting_calculatorCalculatorResults, seed_starting_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class seed_starting_calculatorCalculatorCalculator implements Calculator<seed_starting_calculatorCalculatorInputs, seed_starting_calculatorCalculatorResults> {
  readonly id = 'seed_starting_calculatorCalculator';
  readonly name = 'seed_starting_calculatorCalculator Calculator';
  readonly description = 'Calculate seed_starting_calculatorCalculator values';

  calculate(inputs: seed_starting_calculatorCalculatorInputs): seed_starting_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: seed_starting_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: seed_starting_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
