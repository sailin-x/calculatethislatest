import { Calculator } from '../../engines/CalculatorEngine';
import { clinical_trial_cost_calculatorCalculatorInputs, clinical_trial_cost_calculatorCalculatorResults, clinical_trial_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class clinical_trial_cost_calculatorCalculatorCalculator implements Calculator<clinical_trial_cost_calculatorCalculatorInputs, clinical_trial_cost_calculatorCalculatorResults> {
  readonly id = 'clinical_trial_cost_calculatorCalculator';
  readonly name = 'clinical_trial_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate clinical_trial_cost_calculatorCalculator values';

  calculate(inputs: clinical_trial_cost_calculatorCalculatorInputs): clinical_trial_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: clinical_trial_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: clinical_trial_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
