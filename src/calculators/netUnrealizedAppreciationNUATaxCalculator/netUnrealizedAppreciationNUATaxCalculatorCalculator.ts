import { Calculator } from '../../engines/CalculatorEngine';
import { netUnrealizedAppreciationNUATaxCalculatorInputs, netUnrealizedAppreciationNUATaxCalculatorResults, netUnrealizedAppreciationNUATaxCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class netUnrealizedAppreciationNUATaxCalculatorCalculator implements Calculator<netUnrealizedAppreciationNUATaxCalculatorInputs, netUnrealizedAppreciationNUATaxCalculatorResults> {
  readonly id = 'netUnrealizedAppreciationNUATaxCalculator';
  readonly name = 'netUnrealizedAppreciationNUATaxCalculator Calculator';
  readonly description = 'Calculate netUnrealizedAppreciationNUATaxCalculator values';

  calculate(inputs: netUnrealizedAppreciationNUATaxCalculatorInputs): netUnrealizedAppreciationNUATaxCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: netUnrealizedAppreciationNUATaxCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: netUnrealizedAppreciationNUATaxCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
