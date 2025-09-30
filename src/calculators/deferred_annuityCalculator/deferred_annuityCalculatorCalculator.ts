import { Calculator } from '../../engines/CalculatorEngine';
import { deferred_annuityCalculatorInputs, deferred_annuityCalculatorResults, deferred_annuityCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class deferred_annuityCalculatorCalculator implements Calculator<deferred_annuityCalculatorInputs, deferred_annuityCalculatorResults> {
  readonly id = 'deferred_annuityCalculator';
  readonly name = 'deferred_annuityCalculator Calculator';
  readonly description = 'Calculate deferred_annuityCalculator values';

  calculate(inputs: deferred_annuityCalculatorInputs): deferred_annuityCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: deferred_annuityCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: deferred_annuityCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
