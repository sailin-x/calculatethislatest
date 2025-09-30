import { Calculator } from '../../engines/CalculatorEngine';
import { roiCalculatorInputs, roiCalculatorResults, roiCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class roiCalculatorCalculator implements Calculator<roiCalculatorInputs, roiCalculatorResults> {
  readonly id = 'roiCalculator';
  readonly name = 'roiCalculator Calculator';
  readonly description = 'Calculate roiCalculator values';

  calculate(inputs: roiCalculatorInputs): roiCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: roiCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: roiCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
