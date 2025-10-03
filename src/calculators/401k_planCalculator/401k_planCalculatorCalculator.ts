import { Calculator } from '../../engines/CalculatorEngine';
import { K401PlanCalculatorInputs, K401PlanCalculatorResults, K401PlanCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class K401kPlanCalculatorCalculator implements Calculator<K401PlanCalculatorInputs, K401PlanCalculatorResults> {
  readonly id = '401k_planCalculator';
  readonly name = '401k_planCalculator Calculator';
  readonly description = 'Calculate 401k_planCalculator values';

  calculate(inputs: K401PlanCalculatorInputs): K401PlanCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: K401PlanCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: K401PlanCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}

export const FourZeroOnek_planCalculator = new K401kPlanCalculatorCalculator();
