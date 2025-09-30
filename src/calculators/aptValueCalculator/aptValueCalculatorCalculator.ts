import { Calculator } from '../../engines/CalculatorEngine';
import { aptValueCalculatorInputs, aptValueCalculatorResults, aptValueCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class aptValueCalculatorCalculator implements Calculator<aptValueCalculatorInputs, aptValueCalculatorResults> {
  readonly id = 'aptValueCalculator';
  readonly name = 'aptValueCalculator Calculator';
  readonly description = 'Calculate aptValueCalculator values';

  calculate(inputs: aptValueCalculatorInputs): aptValueCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: aptValueCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: aptValueCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
