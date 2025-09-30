import { Calculator } from '../../engines/CalculatorEngine';
import { charitable_remainder_trustCalculatorInputs, charitable_remainder_trustCalculatorResults, charitable_remainder_trustCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class charitable_remainder_trustCalculatorCalculator implements Calculator<charitable_remainder_trustCalculatorInputs, charitable_remainder_trustCalculatorResults> {
  readonly id = 'charitable_remainder_trustCalculator';
  readonly name = 'charitable_remainder_trustCalculator Calculator';
  readonly description = 'Calculate charitable_remainder_trustCalculator values';

  calculate(inputs: charitable_remainder_trustCalculatorInputs): charitable_remainder_trustCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: charitable_remainder_trustCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: charitable_remainder_trustCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
