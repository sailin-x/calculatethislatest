import { Calculator } from '../../engines/CalculatorEngine';
import { mezzanine_financingCalculatorInputs, mezzanine_financingCalculatorResults, mezzanine_financingCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class mezzanine_financingCalculatorCalculator implements Calculator<mezzanine_financingCalculatorInputs, mezzanine_financingCalculatorResults> {
  readonly id = 'mezzanine_financingCalculator';
  readonly name = 'mezzanine_financingCalculator Calculator';
  readonly description = 'Calculate mezzanine_financingCalculator values';

  calculate(inputs: mezzanine_financingCalculatorInputs): mezzanine_financingCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: mezzanine_financingCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: mezzanine_financingCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
