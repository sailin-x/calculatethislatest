import { Calculator } from '../../engines/CalculatorEngine';
import { fixedIndexAnnuityCalculatorInputs, fixedIndexAnnuityCalculatorResults, fixedIndexAnnuityCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class fixedIndexAnnuityCalculatorCalculator implements Calculator<fixedIndexAnnuityCalculatorInputs, fixedIndexAnnuityCalculatorResults> {
  readonly id = 'fixedIndexAnnuityCalculator';
  readonly name = 'fixedIndexAnnuityCalculator Calculator';
  readonly description = 'Calculate fixedIndexAnnuityCalculator values';

  calculate(inputs: fixedIndexAnnuityCalculatorInputs): fixedIndexAnnuityCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: fixedIndexAnnuityCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: fixedIndexAnnuityCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
