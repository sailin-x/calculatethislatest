import { Calculator } from '../../engines/CalculatorEngine';
import { defined_benefit_planCalculatorInputs, defined_benefit_planCalculatorResults, defined_benefit_planCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class defined_benefit_planCalculatorCalculator implements Calculator<defined_benefit_planCalculatorInputs, defined_benefit_planCalculatorResults> {
  readonly id = 'defined_benefit_planCalculator';
  readonly name = 'defined_benefit_planCalculator Calculator';
  readonly description = 'Calculate defined_benefit_planCalculator values';

  calculate(inputs: defined_benefit_planCalculatorInputs): defined_benefit_planCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: defined_benefit_planCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: defined_benefit_planCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
