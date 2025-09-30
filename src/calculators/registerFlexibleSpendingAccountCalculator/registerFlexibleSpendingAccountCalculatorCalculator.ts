import { Calculator } from '../../engines/CalculatorEngine';
import { registerFlexibleSpendingAccountCalculatorInputs, registerFlexibleSpendingAccountCalculatorResults, registerFlexibleSpendingAccountCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerFlexibleSpendingAccountCalculatorCalculator implements Calculator<registerFlexibleSpendingAccountCalculatorInputs, registerFlexibleSpendingAccountCalculatorResults> {
  readonly id = 'registerFlexibleSpendingAccountCalculator';
  readonly name = 'registerFlexibleSpendingAccountCalculator Calculator';
  readonly description = 'Calculate registerFlexibleSpendingAccountCalculator values';

  calculate(inputs: registerFlexibleSpendingAccountCalculatorInputs): registerFlexibleSpendingAccountCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerFlexibleSpendingAccountCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerFlexibleSpendingAccountCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
