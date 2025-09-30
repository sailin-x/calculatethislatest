import { Calculator } from '../../engines/CalculatorEngine';
import { PaycheckCalculatorInputs, PaycheckCalculatorResults, PaycheckCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class PaycheckCalculatorCalculator implements Calculator<PaycheckCalculatorInputs, PaycheckCalculatorResults> {
  readonly id = 'PaycheckCalculator';
  readonly name = 'PaycheckCalculator Calculator';
  readonly description = 'Calculate PaycheckCalculator values';

  calculate(inputs: PaycheckCalculatorInputs): PaycheckCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: PaycheckCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: PaycheckCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
