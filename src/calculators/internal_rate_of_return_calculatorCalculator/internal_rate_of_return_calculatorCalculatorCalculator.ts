import { Calculator } from '../../engines/CalculatorEngine';
import { internal_rate_of_return_calculatorCalculatorInputs, internal_rate_of_return_calculatorCalculatorResults, internal_rate_of_return_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class internal_rate_of_return_calculatorCalculatorCalculator implements Calculator<internal_rate_of_return_calculatorCalculatorInputs, internal_rate_of_return_calculatorCalculatorResults> {
  readonly id = 'internal_rate_of_return_calculatorCalculator';
  readonly name = 'internal_rate_of_return_calculatorCalculator Calculator';
  readonly description = 'Calculate internal_rate_of_return_calculatorCalculator values';

  calculate(inputs: internal_rate_of_return_calculatorCalculatorInputs): internal_rate_of_return_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: internal_rate_of_return_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: internal_rate_of_return_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
