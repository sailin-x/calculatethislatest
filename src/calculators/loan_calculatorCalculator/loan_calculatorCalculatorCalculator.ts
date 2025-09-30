import { Calculator } from '../../engines/CalculatorEngine';
import { loan_calculatorCalculatorInputs, loan_calculatorCalculatorResults, loan_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class loan_calculatorCalculatorCalculator implements Calculator<loan_calculatorCalculatorInputs, loan_calculatorCalculatorResults> {
  readonly id = 'loan_calculatorCalculator';
  readonly name = 'loan_calculatorCalculator Calculator';
  readonly description = 'Calculate loan_calculatorCalculator values';

  calculate(inputs: loan_calculatorCalculatorInputs): loan_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: loan_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: loan_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
