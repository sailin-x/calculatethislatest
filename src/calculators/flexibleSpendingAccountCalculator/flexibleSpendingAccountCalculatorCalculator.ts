import { Calculator } from '../../engines/CalculatorEngine';
import { flexibleSpendingAccountCalculatorInputs, flexibleSpendingAccountCalculatorResults, flexibleSpendingAccountCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class flexibleSpendingAccountCalculatorCalculator implements Calculator<flexibleSpendingAccountCalculatorInputs, flexibleSpendingAccountCalculatorResults> {
  readonly id = 'flexibleSpendingAccountCalculator';
  readonly name = 'flexibleSpendingAccountCalculator Calculator';
  readonly description = 'Calculate flexibleSpendingAccountCalculator values';

  calculate(inputs: flexibleSpendingAccountCalculatorInputs): flexibleSpendingAccountCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: flexibleSpendingAccountCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: flexibleSpendingAccountCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
