import { Calculator } from '../../engines/CalculatorEngine';
import { loan_comparison_calculatorCalculatorInputs, loan_comparison_calculatorCalculatorResults, loan_comparison_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class loan_comparison_calculatorCalculatorCalculator implements Calculator<loan_comparison_calculatorCalculatorInputs, loan_comparison_calculatorCalculatorResults> {
  readonly id = 'loan_comparison_calculatorCalculator';
  readonly name = 'loan_comparison_calculatorCalculator Calculator';
  readonly description = 'Calculate loan_comparison_calculatorCalculator values';

  calculate(inputs: loan_comparison_calculatorCalculatorInputs): loan_comparison_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: loan_comparison_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: loan_comparison_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
