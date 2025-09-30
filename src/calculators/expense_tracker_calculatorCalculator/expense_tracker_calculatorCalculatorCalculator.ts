import { Calculator } from '../../engines/CalculatorEngine';
import { expense_tracker_calculatorCalculatorInputs, expense_tracker_calculatorCalculatorResults, expense_tracker_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class expense_tracker_calculatorCalculatorCalculator implements Calculator<expense_tracker_calculatorCalculatorInputs, expense_tracker_calculatorCalculatorResults> {
  readonly id = 'expense_tracker_calculatorCalculator';
  readonly name = 'expense_tracker_calculatorCalculator Calculator';
  readonly description = 'Calculate expense_tracker_calculatorCalculator values';

  calculate(inputs: expense_tracker_calculatorCalculatorInputs): expense_tracker_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: expense_tracker_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: expense_tracker_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
