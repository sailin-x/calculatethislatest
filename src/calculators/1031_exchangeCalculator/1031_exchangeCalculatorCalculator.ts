import { Calculator } from '../../engines/CalculatorEngine';
import { 1031_exchangeCalculatorInputs, 1031_exchangeCalculatorResults, 1031_exchangeCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class 1031_exchangeCalculatorCalculator implements Calculator<1031_exchangeCalculatorInputs, 1031_exchangeCalculatorResults> {
  readonly id = '1031_exchangeCalculator';
  readonly name = '1031_exchangeCalculator Calculator';
  readonly description = 'Calculate 1031_exchangeCalculator values';

  calculate(inputs: 1031_exchangeCalculatorInputs): 1031_exchangeCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: 1031_exchangeCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: 1031_exchangeCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
