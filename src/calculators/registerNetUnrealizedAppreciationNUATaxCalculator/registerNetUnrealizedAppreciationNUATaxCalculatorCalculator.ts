import { Calculator } from '../../engines/CalculatorEngine';
import { registerNetUnrealizedAppreciationNUATaxCalculatorInputs, registerNetUnrealizedAppreciationNUATaxCalculatorResults, registerNetUnrealizedAppreciationNUATaxCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerNetUnrealizedAppreciationNUATaxCalculatorCalculator implements Calculator<registerNetUnrealizedAppreciationNUATaxCalculatorInputs, registerNetUnrealizedAppreciationNUATaxCalculatorResults> {
  readonly id = 'registerNetUnrealizedAppreciationNUATaxCalculator';
  readonly name = 'registerNetUnrealizedAppreciationNUATaxCalculator Calculator';
  readonly description = 'Calculate registerNetUnrealizedAppreciationNUATaxCalculator values';

  calculate(inputs: registerNetUnrealizedAppreciationNUATaxCalculatorInputs): registerNetUnrealizedAppreciationNUATaxCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerNetUnrealizedAppreciationNUATaxCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerNetUnrealizedAppreciationNUATaxCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
