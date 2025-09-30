import { Calculator } from '../../engines/CalculatorEngine';
import { mortgage_apr_comparisonCalculatorInputs, mortgage_apr_comparisonCalculatorResults, mortgage_apr_comparisonCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class mortgage_apr_comparisonCalculatorCalculator implements Calculator<mortgage_apr_comparisonCalculatorInputs, mortgage_apr_comparisonCalculatorResults> {
  readonly id = 'mortgage_apr_comparisonCalculator';
  readonly name = 'mortgage_apr_comparisonCalculator Calculator';
  readonly description = 'Calculate mortgage_apr_comparisonCalculator values';

  calculate(inputs: mortgage_apr_comparisonCalculatorInputs): mortgage_apr_comparisonCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: mortgage_apr_comparisonCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: mortgage_apr_comparisonCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
