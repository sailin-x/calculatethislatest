import { Calculator } from '../../engines/CalculatorEngine';
import { loan_to_cost_ratioCalculatorInputs, loan_to_cost_ratioCalculatorResults, loan_to_cost_ratioCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class loan_to_cost_ratioCalculatorCalculator implements Calculator<loan_to_cost_ratioCalculatorInputs, loan_to_cost_ratioCalculatorResults> {
  readonly id = 'loan_to_cost_ratioCalculator';
  readonly name = 'loan_to_cost_ratioCalculator Calculator';
  readonly description = 'Calculate loan_to_cost_ratioCalculator values';

  calculate(inputs: loan_to_cost_ratioCalculatorInputs): loan_to_cost_ratioCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: loan_to_cost_ratioCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: loan_to_cost_ratioCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
