import { Calculator } from '../../engines/CalculatorEngine';
import { mortgage_equityCalculatorInputs, mortgage_equityCalculatorResults, mortgage_equityCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class mortgage_equityCalculatorCalculator implements Calculator<mortgage_equityCalculatorInputs, mortgage_equityCalculatorResults> {
  readonly id = 'mortgage_equityCalculator';
  readonly name = 'mortgage_equityCalculator Calculator';
  readonly description = 'Calculate mortgage_equityCalculator values';

  calculate(inputs: mortgage_equityCalculatorInputs): mortgage_equityCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: mortgage_equityCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: mortgage_equityCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
