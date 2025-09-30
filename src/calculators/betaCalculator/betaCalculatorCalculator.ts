import { Calculator } from '../../engines/CalculatorEngine';
import { betaCalculatorInputs, betaCalculatorResults, betaCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class betaCalculatorCalculator implements Calculator<betaCalculatorInputs, betaCalculatorResults> {
  readonly id = 'betaCalculator';
  readonly name = 'betaCalculator Calculator';
  readonly description = 'Calculate betaCalculator values';

  calculate(inputs: betaCalculatorInputs): betaCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: betaCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: betaCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
