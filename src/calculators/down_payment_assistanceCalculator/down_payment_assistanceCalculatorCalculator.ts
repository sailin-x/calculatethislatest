import { Calculator } from '../../engines/CalculatorEngine';
import { down_payment_assistanceCalculatorInputs, down_payment_assistanceCalculatorResults, down_payment_assistanceCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class down_payment_assistanceCalculatorCalculator implements Calculator<down_payment_assistanceCalculatorInputs, down_payment_assistanceCalculatorResults> {
  readonly id = 'down_payment_assistanceCalculator';
  readonly name = 'down_payment_assistanceCalculator Calculator';
  readonly description = 'Calculate down_payment_assistanceCalculator values';

  calculate(inputs: down_payment_assistanceCalculatorInputs): down_payment_assistanceCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: down_payment_assistanceCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: down_payment_assistanceCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
