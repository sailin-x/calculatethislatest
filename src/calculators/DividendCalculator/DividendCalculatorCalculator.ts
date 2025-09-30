import { Calculator } from '../../engines/CalculatorEngine';
import { DividendCalculatorInputs, DividendCalculatorResults, DividendCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class DividendCalculatorCalculator implements Calculator<DividendCalculatorInputs, DividendCalculatorResults> {
  readonly id = 'DividendCalculator';
  readonly name = 'DividendCalculator Calculator';
  readonly description = 'Calculate DividendCalculator values';

  calculate(inputs: DividendCalculatorInputs): DividendCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: DividendCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: DividendCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
