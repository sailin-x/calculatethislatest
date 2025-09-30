import { Calculator } from '../../engines/CalculatorEngine';
import { policy_lapse_rate_calculatorCalculatorInputs, policy_lapse_rate_calculatorCalculatorResults, policy_lapse_rate_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class policy_lapse_rate_calculatorCalculatorCalculator implements Calculator<policy_lapse_rate_calculatorCalculatorInputs, policy_lapse_rate_calculatorCalculatorResults> {
  readonly id = 'policy_lapse_rate_calculatorCalculator';
  readonly name = 'policy_lapse_rate_calculatorCalculator Calculator';
  readonly description = 'Calculate policy_lapse_rate_calculatorCalculator values';

  calculate(inputs: policy_lapse_rate_calculatorCalculatorInputs): policy_lapse_rate_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: policy_lapse_rate_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: policy_lapse_rate_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
