import { Calculator } from '../../engines/CalculatorEngine';
import { incurred_but_not_reported_calculatorCalculatorInputs, incurred_but_not_reported_calculatorCalculatorResults, incurred_but_not_reported_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class incurred_but_not_reported_calculatorCalculatorCalculator implements Calculator<incurred_but_not_reported_calculatorCalculatorInputs, incurred_but_not_reported_calculatorCalculatorResults> {
  readonly id = 'incurred_but_not_reported_calculatorCalculator';
  readonly name = 'incurred_but_not_reported_calculatorCalculator Calculator';
  readonly description = 'Calculate incurred_but_not_reported_calculatorCalculator values';

  calculate(inputs: incurred_but_not_reported_calculatorCalculatorInputs): incurred_but_not_reported_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: incurred_but_not_reported_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: incurred_but_not_reported_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
