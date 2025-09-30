import { Calculator } from '../../engines/CalculatorEngine';
import { escrow_analysisCalculatorInputs, escrow_analysisCalculatorResults, escrow_analysisCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class escrow_analysisCalculatorCalculator implements Calculator<escrow_analysisCalculatorInputs, escrow_analysisCalculatorResults> {
  readonly id = 'escrow_analysisCalculator';
  readonly name = 'escrow_analysisCalculator Calculator';
  readonly description = 'Calculate escrow_analysisCalculator values';

  calculate(inputs: escrow_analysisCalculatorInputs): escrow_analysisCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: escrow_analysisCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: escrow_analysisCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
