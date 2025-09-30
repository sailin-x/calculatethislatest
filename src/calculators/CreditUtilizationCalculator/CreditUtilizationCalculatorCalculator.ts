import { Calculator } from '../../engines/CalculatorEngine';
import { CreditUtilizationCalculatorInputs, CreditUtilizationCalculatorResults, CreditUtilizationCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class CreditUtilizationCalculatorCalculator implements Calculator<CreditUtilizationCalculatorInputs, CreditUtilizationCalculatorResults> {
  readonly id = 'CreditUtilizationCalculator';
  readonly name = 'CreditUtilizationCalculator Calculator';
  readonly description = 'Calculate CreditUtilizationCalculator values';

  calculate(inputs: CreditUtilizationCalculatorInputs): CreditUtilizationCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: CreditUtilizationCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: CreditUtilizationCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
