import { Calculator } from '../../engines/CalculatorEngine';
import { CreditDefaultSwapCalculatorInputs, CreditDefaultSwapCalculatorResults, CreditDefaultSwapCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class CreditDefaultSwapCalculatorCalculator implements Calculator<CreditDefaultSwapCalculatorInputs, CreditDefaultSwapCalculatorResults> {
  readonly id = 'CreditDefaultSwapCalculator';
  readonly name = 'CreditDefaultSwapCalculator Calculator';
  readonly description = 'Calculate CreditDefaultSwapCalculator values';

  calculate(inputs: CreditDefaultSwapCalculatorInputs): CreditDefaultSwapCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: CreditDefaultSwapCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: CreditDefaultSwapCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
