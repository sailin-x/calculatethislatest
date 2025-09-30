import { Calculator } from '../../engines/CalculatorEngine';
import { estatePlanningCalculatorInputs, estatePlanningCalculatorResults, estatePlanningCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class estatePlanningCalculatorCalculator implements Calculator<estatePlanningCalculatorInputs, estatePlanningCalculatorResults> {
  readonly id = 'estatePlanningCalculator';
  readonly name = 'estatePlanningCalculator Calculator';
  readonly description = 'Calculate estatePlanningCalculator values';

  calculate(inputs: estatePlanningCalculatorInputs): estatePlanningCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: estatePlanningCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: estatePlanningCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
