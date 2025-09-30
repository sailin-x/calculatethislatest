import { Calculator } from '../../engines/CalculatorEngine';
import { statisticsCalculatorInputs, statisticsCalculatorResults, statisticsCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class statisticsCalculatorCalculator implements Calculator<statisticsCalculatorInputs, statisticsCalculatorResults> {
  readonly id = 'statisticsCalculator';
  readonly name = 'statisticsCalculator Calculator';
  readonly description = 'Calculate statisticsCalculator values';

  calculate(inputs: statisticsCalculatorInputs): statisticsCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: statisticsCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: statisticsCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
