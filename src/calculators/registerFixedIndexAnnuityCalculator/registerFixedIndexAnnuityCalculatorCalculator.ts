import { Calculator } from '../../engines/CalculatorEngine';
import { registerFixedIndexAnnuityCalculatorInputs, registerFixedIndexAnnuityCalculatorResults, registerFixedIndexAnnuityCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerFixedIndexAnnuityCalculatorCalculator implements Calculator<registerFixedIndexAnnuityCalculatorInputs, registerFixedIndexAnnuityCalculatorResults> {
  readonly id = 'registerFixedIndexAnnuityCalculator';
  readonly name = 'registerFixedIndexAnnuityCalculator Calculator';
  readonly description = 'Calculate registerFixedIndexAnnuityCalculator values';

  calculate(inputs: registerFixedIndexAnnuityCalculatorInputs): registerFixedIndexAnnuityCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerFixedIndexAnnuityCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerFixedIndexAnnuityCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
