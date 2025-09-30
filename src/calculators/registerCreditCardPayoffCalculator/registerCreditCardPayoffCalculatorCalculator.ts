import { Calculator } from '../../engines/CalculatorEngine';
import { registerCreditCardPayoffCalculatorInputs, registerCreditCardPayoffCalculatorResults, registerCreditCardPayoffCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerCreditCardPayoffCalculatorCalculator implements Calculator<registerCreditCardPayoffCalculatorInputs, registerCreditCardPayoffCalculatorResults> {
  readonly id = 'registerCreditCardPayoffCalculator';
  readonly name = 'registerCreditCardPayoffCalculator Calculator';
  readonly description = 'Calculate registerCreditCardPayoffCalculator values';

  calculate(inputs: registerCreditCardPayoffCalculatorInputs): registerCreditCardPayoffCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerCreditCardPayoffCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerCreditCardPayoffCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
