import { Calculator } from '../../engines/CalculatorEngine';
import { registerCreditUtilizationCalculatorInputs, registerCreditUtilizationCalculatorResults, registerCreditUtilizationCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerCreditUtilizationCalculatorCalculator implements Calculator<registerCreditUtilizationCalculatorInputs, registerCreditUtilizationCalculatorResults> {
  readonly id = 'registerCreditUtilizationCalculator';
  readonly name = 'registerCreditUtilizationCalculator Calculator';
  readonly description = 'Calculate registerCreditUtilizationCalculator values';

  calculate(inputs: registerCreditUtilizationCalculatorInputs): registerCreditUtilizationCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerCreditUtilizationCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerCreditUtilizationCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
