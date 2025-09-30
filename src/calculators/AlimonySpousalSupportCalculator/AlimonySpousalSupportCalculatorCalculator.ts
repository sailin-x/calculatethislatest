import { Calculator } from '../../engines/CalculatorEngine';
import { AlimonySpousalSupportCalculatorInputs, AlimonySpousalSupportCalculatorResults, AlimonySpousalSupportCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class AlimonySpousalSupportCalculatorCalculator implements Calculator<AlimonySpousalSupportCalculatorInputs, AlimonySpousalSupportCalculatorResults> {
  readonly id = 'AlimonySpousalSupportCalculator';
  readonly name = 'AlimonySpousalSupportCalculator Calculator';
  readonly description = 'Calculate AlimonySpousalSupportCalculator values';

  calculate(inputs: AlimonySpousalSupportCalculatorInputs): AlimonySpousalSupportCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: AlimonySpousalSupportCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: AlimonySpousalSupportCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
