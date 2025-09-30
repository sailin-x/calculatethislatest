import { Calculator } from '../../engines/CalculatorEngine';
import { incurred_but_not_reported_ibnr_reserve_estimatorCalculatorInputs, incurred_but_not_reported_ibnr_reserve_estimatorCalculatorResults, incurred_but_not_reported_ibnr_reserve_estimatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class incurred_but_not_reported_ibnr_reserve_estimatorCalculatorCalculator implements Calculator<incurred_but_not_reported_ibnr_reserve_estimatorCalculatorInputs, incurred_but_not_reported_ibnr_reserve_estimatorCalculatorResults> {
  readonly id = 'incurred_but_not_reported_ibnr_reserve_estimatorCalculator';
  readonly name = 'incurred_but_not_reported_ibnr_reserve_estimatorCalculator Calculator';
  readonly description = 'Calculate incurred_but_not_reported_ibnr_reserve_estimatorCalculator values';

  calculate(inputs: incurred_but_not_reported_ibnr_reserve_estimatorCalculatorInputs): incurred_but_not_reported_ibnr_reserve_estimatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: incurred_but_not_reported_ibnr_reserve_estimatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: incurred_but_not_reported_ibnr_reserve_estimatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
