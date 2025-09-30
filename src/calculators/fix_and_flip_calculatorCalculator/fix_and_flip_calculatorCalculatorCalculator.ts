import { Calculator } from '../../engines/CalculatorEngine';
import { fix_and_flip_calculatorCalculatorInputs, fix_and_flip_calculatorCalculatorResults, fix_and_flip_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class fix_and_flip_calculatorCalculatorCalculator implements Calculator<fix_and_flip_calculatorCalculatorInputs, fix_and_flip_calculatorCalculatorResults> {
  readonly id = 'fix_and_flip_calculatorCalculator';
  readonly name = 'fix_and_flip_calculatorCalculator Calculator';
  readonly description = 'Calculate fix_and_flip_calculatorCalculator values';

  calculate(inputs: fix_and_flip_calculatorCalculatorInputs): fix_and_flip_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: fix_and_flip_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: fix_and_flip_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
