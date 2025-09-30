import { Calculator } from '../../engines/CalculatorEngine';
import { loan_to_costCalculatorInputs, loan_to_costCalculatorResults, loan_to_costCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class loan_to_costCalculatorCalculator implements Calculator<loan_to_costCalculatorInputs, loan_to_costCalculatorResults> {
  readonly id = 'loan_to_costCalculator';
  readonly name = 'loan_to_costCalculator Calculator';
  readonly description = 'Calculate loan_to_costCalculator values';

  calculate(inputs: loan_to_costCalculatorInputs): loan_to_costCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: loan_to_costCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: loan_to_costCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
