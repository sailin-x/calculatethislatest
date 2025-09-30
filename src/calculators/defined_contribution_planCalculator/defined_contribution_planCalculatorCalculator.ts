import { Calculator } from '../../engines/CalculatorEngine';
import { defined_contribution_planCalculatorInputs, defined_contribution_planCalculatorResults, defined_contribution_planCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class defined_contribution_planCalculatorCalculator implements Calculator<defined_contribution_planCalculatorInputs, defined_contribution_planCalculatorResults> {
  readonly id = 'defined_contribution_planCalculator';
  readonly name = 'defined_contribution_planCalculator Calculator';
  readonly description = 'Calculate defined_contribution_planCalculator values';

  calculate(inputs: defined_contribution_planCalculatorInputs): defined_contribution_planCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: defined_contribution_planCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: defined_contribution_planCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
