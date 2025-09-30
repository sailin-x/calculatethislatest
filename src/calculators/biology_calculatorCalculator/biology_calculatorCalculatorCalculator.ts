import { Calculator } from '../../engines/CalculatorEngine';
import { biology_calculatorCalculatorInputs, biology_calculatorCalculatorResults, biology_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class biology_calculatorCalculatorCalculator implements Calculator<biology_calculatorCalculatorInputs, biology_calculatorCalculatorResults> {
  readonly id = 'biology_calculatorCalculator';
  readonly name = 'biology_calculatorCalculator Calculator';
  readonly description = 'Calculate biology_calculatorCalculator values';

  calculate(inputs: biology_calculatorCalculatorInputs): biology_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: biology_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: biology_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
