import { Calculator } from '../../engines/CalculatorEngine';
import { cash_out_refinanceCalculatorInputs, cash_out_refinanceCalculatorResults, cash_out_refinanceCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class cash_out_refinanceCalculatorCalculator implements Calculator<cash_out_refinanceCalculatorInputs, cash_out_refinanceCalculatorResults> {
  readonly id = 'cash_out_refinanceCalculator';
  readonly name = 'cash_out_refinanceCalculator Calculator';
  readonly description = 'Calculate cash_out_refinanceCalculator values';

  calculate(inputs: cash_out_refinanceCalculatorInputs): cash_out_refinanceCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: cash_out_refinanceCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: cash_out_refinanceCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
