import { Calculator } from '../../engines/CalculatorEngine';
import { EquityValuationCalculatorInputs, EquityValuationCalculatorResults, EquityValuationCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class EquityValuationCalculatorCalculator implements Calculator<EquityValuationCalculatorInputs, EquityValuationCalculatorResults> {
  readonly id = 'EquityValuationCalculator';
  readonly name = 'EquityValuationCalculator Calculator';
  readonly description = 'Calculate EquityValuationCalculator values';

  calculate(inputs: EquityValuationCalculatorInputs): EquityValuationCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: EquityValuationCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: EquityValuationCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
