import { Calculator } from '../../engines/CalculatorEngine';
import { estateTaxLiabilityCalculatorInputs, estateTaxLiabilityCalculatorResults, estateTaxLiabilityCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class estateTaxLiabilityCalculatorCalculator implements Calculator<estateTaxLiabilityCalculatorInputs, estateTaxLiabilityCalculatorResults> {
  readonly id = 'estateTaxLiabilityCalculator';
  readonly name = 'estateTaxLiabilityCalculator Calculator';
  readonly description = 'Calculate estateTaxLiabilityCalculator values';

  calculate(inputs: estateTaxLiabilityCalculatorInputs): estateTaxLiabilityCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: estateTaxLiabilityCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: estateTaxLiabilityCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
