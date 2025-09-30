import { Calculator } from '../../engines/CalculatorEngine';
import { preference_payment_clawback_calculatorCalculatorInputs, preference_payment_clawback_calculatorCalculatorResults, preference_payment_clawback_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class preference_payment_clawback_calculatorCalculatorCalculator implements Calculator<preference_payment_clawback_calculatorCalculatorInputs, preference_payment_clawback_calculatorCalculatorResults> {
  readonly id = 'preference_payment_clawback_calculatorCalculator';
  readonly name = 'preference_payment_clawback_calculatorCalculator Calculator';
  readonly description = 'Calculate preference_payment_clawback_calculatorCalculator values';

  calculate(inputs: preference_payment_clawback_calculatorCalculatorInputs): preference_payment_clawback_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: preference_payment_clawback_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: preference_payment_clawback_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
