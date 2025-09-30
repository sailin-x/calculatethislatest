import { Calculator } from '../../engines/CalculatorEngine';
import { loan_to_value_ratioCalculatorInputs, loan_to_value_ratioCalculatorResults, loan_to_value_ratioCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class loan_to_value_ratioCalculatorCalculator implements Calculator<loan_to_value_ratioCalculatorInputs, loan_to_value_ratioCalculatorResults> {
  readonly id = 'loan_to_value_ratioCalculator';
  readonly name = 'loan_to_value_ratioCalculator Calculator';
  readonly description = 'Calculate loan_to_value_ratioCalculator values';

  calculate(inputs: loan_to_value_ratioCalculatorInputs): loan_to_value_ratioCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: loan_to_value_ratioCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: loan_to_value_ratioCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
