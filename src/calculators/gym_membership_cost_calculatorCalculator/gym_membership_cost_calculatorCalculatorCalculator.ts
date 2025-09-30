import { Calculator } from '../../engines/CalculatorEngine';
import { gym_membership_cost_calculatorCalculatorInputs, gym_membership_cost_calculatorCalculatorResults, gym_membership_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class gym_membership_cost_calculatorCalculatorCalculator implements Calculator<gym_membership_cost_calculatorCalculatorInputs, gym_membership_cost_calculatorCalculatorResults> {
  readonly id = 'gym_membership_cost_calculatorCalculator';
  readonly name = 'gym_membership_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate gym_membership_cost_calculatorCalculator values';

  calculate(inputs: gym_membership_cost_calculatorCalculatorInputs): gym_membership_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: gym_membership_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: gym_membership_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
