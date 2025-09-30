import { Calculator } from '../../engines/CalculatorEngine';
import { registerEquityValuationCalculatorInputs, registerEquityValuationCalculatorResults, registerEquityValuationCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerEquityValuationCalculatorCalculator implements Calculator<registerEquityValuationCalculatorInputs, registerEquityValuationCalculatorResults> {
  readonly id = 'registerEquityValuationCalculator';
  readonly name = 'registerEquityValuationCalculator Calculator';
  readonly description = 'Calculate registerEquityValuationCalculator values';

  calculate(inputs: registerEquityValuationCalculatorInputs): registerEquityValuationCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerEquityValuationCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerEquityValuationCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
