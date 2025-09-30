import { Calculator } from '../../engines/CalculatorEngine';
import { RetirementAbroadCalculatorInputs, RetirementAbroadCalculatorResults, RetirementAbroadCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class RetirementAbroadCalculatorCalculator implements Calculator<RetirementAbroadCalculatorInputs, RetirementAbroadCalculatorResults> {
  readonly id = 'RetirementAbroadCalculator';
  readonly name = 'RetirementAbroadCalculator Calculator';
  readonly description = 'Calculate RetirementAbroadCalculator values';

  calculate(inputs: RetirementAbroadCalculatorInputs): RetirementAbroadCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: RetirementAbroadCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: RetirementAbroadCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
