import { Calculator } from '../../engines/CalculatorEngine';
import { expense_ratio_calculatorCalculatorInputs, expense_ratio_calculatorCalculatorResults, expense_ratio_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class expense_ratio_calculatorCalculatorCalculator implements Calculator<expense_ratio_calculatorCalculatorInputs, expense_ratio_calculatorCalculatorResults> {
  readonly id = 'expense_ratio_calculatorCalculator';
  readonly name = 'expense_ratio_calculatorCalculator Calculator';
  readonly description = 'Calculate expense_ratio_calculatorCalculator values';

  calculate(inputs: expense_ratio_calculatorCalculatorInputs): expense_ratio_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: expense_ratio_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: expense_ratio_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
