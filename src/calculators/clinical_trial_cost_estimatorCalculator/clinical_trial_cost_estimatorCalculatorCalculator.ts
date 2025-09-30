import { Calculator } from '../../engines/CalculatorEngine';
import { clinical_trial_cost_estimatorCalculatorInputs, clinical_trial_cost_estimatorCalculatorResults, clinical_trial_cost_estimatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class clinical_trial_cost_estimatorCalculatorCalculator implements Calculator<clinical_trial_cost_estimatorCalculatorInputs, clinical_trial_cost_estimatorCalculatorResults> {
  readonly id = 'clinical_trial_cost_estimatorCalculator';
  readonly name = 'clinical_trial_cost_estimatorCalculator Calculator';
  readonly description = 'Calculate clinical_trial_cost_estimatorCalculator values';

  calculate(inputs: clinical_trial_cost_estimatorCalculatorInputs): clinical_trial_cost_estimatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: clinical_trial_cost_estimatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: clinical_trial_cost_estimatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
