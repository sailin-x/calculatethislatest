import { Calculator } from '../../engines/CalculatorEngine';
import { plannedGivingCalculatorInputs, plannedGivingCalculatorResults, plannedGivingCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class plannedGivingCalculatorCalculator implements Calculator<plannedGivingCalculatorInputs, plannedGivingCalculatorResults> {
  readonly id = 'plannedGivingCalculator';
  readonly name = 'plannedGivingCalculator Calculator';
  readonly description = 'Calculate plannedGivingCalculator values';

  calculate(inputs: plannedGivingCalculatorInputs): plannedGivingCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: plannedGivingCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: plannedGivingCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
