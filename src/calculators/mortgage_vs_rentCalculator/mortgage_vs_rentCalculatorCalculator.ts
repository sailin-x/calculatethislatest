import { Calculator } from '../../engines/CalculatorEngine';
import { mortgage_vs_rentCalculatorInputs, mortgage_vs_rentCalculatorResults, mortgage_vs_rentCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class mortgage_vs_rentCalculatorCalculator implements Calculator<mortgage_vs_rentCalculatorInputs, mortgage_vs_rentCalculatorResults> {
  readonly id = 'mortgage_vs_rentCalculator';
  readonly name = 'mortgage_vs_rentCalculator Calculator';
  readonly description = 'Calculate mortgage_vs_rentCalculator values';

  calculate(inputs: mortgage_vs_rentCalculatorInputs): mortgage_vs_rentCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: mortgage_vs_rentCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: mortgage_vs_rentCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
