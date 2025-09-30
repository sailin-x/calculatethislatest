import { Calculator } from '../../engines/CalculatorEngine';
import { registerCreditDefaultSwapCalculatorInputs, registerCreditDefaultSwapCalculatorResults, registerCreditDefaultSwapCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerCreditDefaultSwapCalculatorCalculator implements Calculator<registerCreditDefaultSwapCalculatorInputs, registerCreditDefaultSwapCalculatorResults> {
  readonly id = 'registerCreditDefaultSwapCalculator';
  readonly name = 'registerCreditDefaultSwapCalculator Calculator';
  readonly description = 'Calculate registerCreditDefaultSwapCalculator values';

  calculate(inputs: registerCreditDefaultSwapCalculatorInputs): registerCreditDefaultSwapCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerCreditDefaultSwapCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerCreditDefaultSwapCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
