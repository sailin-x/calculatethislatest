import { Calculator } from '../../engines/CalculatorEngine';
import { registerAlimonySpousalSupportCalculatorInputs, registerAlimonySpousalSupportCalculatorResults, registerAlimonySpousalSupportCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerAlimonySpousalSupportCalculatorCalculator implements Calculator<registerAlimonySpousalSupportCalculatorInputs, registerAlimonySpousalSupportCalculatorResults> {
  readonly id = 'registerAlimonySpousalSupportCalculator';
  readonly name = 'registerAlimonySpousalSupportCalculator Calculator';
  readonly description = 'Calculate registerAlimonySpousalSupportCalculator values';

  calculate(inputs: registerAlimonySpousalSupportCalculatorInputs): registerAlimonySpousalSupportCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerAlimonySpousalSupportCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerAlimonySpousalSupportCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
