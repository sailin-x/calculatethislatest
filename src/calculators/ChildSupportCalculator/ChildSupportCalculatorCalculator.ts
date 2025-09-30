import { Calculator } from '../../engines/CalculatorEngine';
import { ChildSupportCalculatorInputs, ChildSupportCalculatorResults, ChildSupportCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class ChildSupportCalculatorCalculator implements Calculator<ChildSupportCalculatorInputs, ChildSupportCalculatorResults> {
  readonly id = 'ChildSupportCalculator';
  readonly name = 'ChildSupportCalculator Calculator';
  readonly description = 'Calculate ChildSupportCalculator values';

  calculate(inputs: ChildSupportCalculatorInputs): ChildSupportCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: ChildSupportCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: ChildSupportCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
