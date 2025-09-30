import { Calculator } from '../../engines/CalculatorEngine';
import { registerCarPaymentCalculatorInputs, registerCarPaymentCalculatorResults, registerCarPaymentCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerCarPaymentCalculatorCalculator implements Calculator<registerCarPaymentCalculatorInputs, registerCarPaymentCalculatorResults> {
  readonly id = 'registerCarPaymentCalculator';
  readonly name = 'registerCarPaymentCalculator Calculator';
  readonly description = 'Calculate registerCarPaymentCalculator values';

  calculate(inputs: registerCarPaymentCalculatorInputs): registerCarPaymentCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerCarPaymentCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerCarPaymentCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
