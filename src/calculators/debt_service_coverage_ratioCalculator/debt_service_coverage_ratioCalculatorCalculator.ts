import { Calculator } from '../../engines/CalculatorEngine';
import { debt_service_coverage_ratioCalculatorInputs, debt_service_coverage_ratioCalculatorResults, debt_service_coverage_ratioCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class debt_service_coverage_ratioCalculatorCalculator implements Calculator<debt_service_coverage_ratioCalculatorInputs, debt_service_coverage_ratioCalculatorResults> {
  readonly id = 'debt_service_coverage_ratioCalculator';
  readonly name = 'debt_service_coverage_ratioCalculator Calculator';
  readonly description = 'Calculate debt_service_coverage_ratioCalculator values';

  calculate(inputs: debt_service_coverage_ratioCalculatorInputs): debt_service_coverage_ratioCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: debt_service_coverage_ratioCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: debt_service_coverage_ratioCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
