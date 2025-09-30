import { Calculator } from '../../engines/CalculatorEngine';
import { registerHealthSavingsAccountHsaCalculatorInputs, registerHealthSavingsAccountHsaCalculatorResults, registerHealthSavingsAccountHsaCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerHealthSavingsAccountHsaCalculatorCalculator implements Calculator<registerHealthSavingsAccountHsaCalculatorInputs, registerHealthSavingsAccountHsaCalculatorResults> {
  readonly id = 'registerHealthSavingsAccountHsaCalculator';
  readonly name = 'registerHealthSavingsAccountHsaCalculator Calculator';
  readonly description = 'Calculate registerHealthSavingsAccountHsaCalculator values';

  calculate(inputs: registerHealthSavingsAccountHsaCalculatorInputs): registerHealthSavingsAccountHsaCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerHealthSavingsAccountHsaCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerHealthSavingsAccountHsaCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
