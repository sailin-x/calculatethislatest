import { Calculator } from '../../engines/CalculatorEngine';
import { a1c_calculatorCalculatorInputs, a1c_calculatorCalculatorResults, a1c_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class a1c_calculatorCalculatorCalculator implements Calculator<a1c_calculatorCalculatorInputs, a1c_calculatorCalculatorResults> {
  readonly id = 'a1c_calculatorCalculator';
  readonly name = 'a1c_calculatorCalculator Calculator';
  readonly description = 'Calculate a1c_calculatorCalculator values';

  calculate(inputs: a1c_calculatorCalculatorInputs): a1c_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: a1c_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: a1c_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
