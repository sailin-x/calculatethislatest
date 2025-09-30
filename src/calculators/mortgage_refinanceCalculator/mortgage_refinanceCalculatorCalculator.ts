import { Calculator } from '../../engines/CalculatorEngine';
import { mortgage_refinanceCalculatorInputs, mortgage_refinanceCalculatorResults, mortgage_refinanceCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class mortgage_refinanceCalculatorCalculator implements Calculator<mortgage_refinanceCalculatorInputs, mortgage_refinanceCalculatorResults> {
  readonly id = 'mortgage_refinanceCalculator';
  readonly name = 'mortgage_refinanceCalculator Calculator';
  readonly description = 'Calculate mortgage_refinanceCalculator values';

  calculate(inputs: mortgage_refinanceCalculatorInputs): mortgage_refinanceCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: mortgage_refinanceCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: mortgage_refinanceCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
