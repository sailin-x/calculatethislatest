import { Calculator } from '../../engines/CalculatorEngine';
import { Roth401kVsTraditional401kCalculatorInputs, Roth401kVsTraditional401kCalculatorResults, Roth401kVsTraditional401kCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class Roth401kVsTraditional401kCalculatorCalculator implements Calculator<Roth401kVsTraditional401kCalculatorInputs, Roth401kVsTraditional401kCalculatorResults> {
  readonly id = 'Roth401kVsTraditional401kCalculator';
  readonly name = 'Roth401kVsTraditional401kCalculator Calculator';
  readonly description = 'Calculate Roth401kVsTraditional401kCalculator values';

  calculate(inputs: Roth401kVsTraditional401kCalculatorInputs): Roth401kVsTraditional401kCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: Roth401kVsTraditional401kCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: Roth401kVsTraditional401kCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
