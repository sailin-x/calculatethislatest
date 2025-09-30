import { Calculator } from '../../engines/CalculatorEngine';
import { line_of_credit_calculatorCalculatorInputs, line_of_credit_calculatorCalculatorResults, line_of_credit_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class line_of_credit_calculatorCalculatorCalculator implements Calculator<line_of_credit_calculatorCalculatorInputs, line_of_credit_calculatorCalculatorResults> {
  readonly id = 'line_of_credit_calculatorCalculator';
  readonly name = 'line_of_credit_calculatorCalculator Calculator';
  readonly description = 'Calculate line_of_credit_calculatorCalculator values';

  calculate(inputs: line_of_credit_calculatorCalculatorInputs): line_of_credit_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: line_of_credit_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: line_of_credit_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
