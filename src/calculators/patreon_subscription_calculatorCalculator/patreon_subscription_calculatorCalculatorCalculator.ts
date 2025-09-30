import { Calculator } from '../../engines/CalculatorEngine';
import { patreon_subscription_calculatorCalculatorInputs, patreon_subscription_calculatorCalculatorResults, patreon_subscription_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class patreon_subscription_calculatorCalculatorCalculator implements Calculator<patreon_subscription_calculatorCalculatorInputs, patreon_subscription_calculatorCalculatorResults> {
  readonly id = 'patreon_subscription_calculatorCalculator';
  readonly name = 'patreon_subscription_calculatorCalculator Calculator';
  readonly description = 'Calculate patreon_subscription_calculatorCalculator values';

  calculate(inputs: patreon_subscription_calculatorCalculatorInputs): patreon_subscription_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: patreon_subscription_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: patreon_subscription_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
