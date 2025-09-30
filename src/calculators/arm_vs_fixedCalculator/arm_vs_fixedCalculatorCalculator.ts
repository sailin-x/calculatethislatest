import { Calculator } from '../../engines/CalculatorEngine';
import { arm_vs_fixedCalculatorInputs, arm_vs_fixedCalculatorResults, arm_vs_fixedCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class arm_vs_fixedCalculatorCalculator implements Calculator<arm_vs_fixedCalculatorInputs, arm_vs_fixedCalculatorResults> {
  readonly id = 'arm_vs_fixedCalculator';
  readonly name = 'arm_vs_fixedCalculator Calculator';
  readonly description = 'Calculate arm_vs_fixedCalculator values';

  calculate(inputs: arm_vs_fixedCalculatorInputs): arm_vs_fixedCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: arm_vs_fixedCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: arm_vs_fixedCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
