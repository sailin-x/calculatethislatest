import { Calculator } from '../../engines/CalculatorEngine';
import { self_storage_roiCalculatorInputs, self_storage_roiCalculatorResults, self_storage_roiCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class self_storage_roiCalculatorCalculator implements Calculator<self_storage_roiCalculatorInputs, self_storage_roiCalculatorResults> {
  readonly id = 'self_storage_roiCalculator';
  readonly name = 'self_storage_roiCalculator Calculator';
  readonly description = 'Calculate self_storage_roiCalculator values';

  calculate(inputs: self_storage_roiCalculatorInputs): self_storage_roiCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: self_storage_roiCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: self_storage_roiCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
