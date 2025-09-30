import { Calculator } from '../../engines/CalculatorEngine';
import { taxCalculatorInputs, taxCalculatorResults, taxCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class taxCalculatorCalculator implements Calculator<taxCalculatorInputs, taxCalculatorResults> {
  readonly id = 'taxCalculator';
  readonly name = 'taxCalculator Calculator';
  readonly description = 'Calculate taxCalculator values';

  calculate(inputs: taxCalculatorInputs): taxCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: taxCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: taxCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
