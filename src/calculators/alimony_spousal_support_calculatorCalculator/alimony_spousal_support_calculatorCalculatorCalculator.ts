import { Calculator } from '../../engines/CalculatorEngine';
import { alimony_spousal_support_calculatorCalculatorInputs, alimony_spousal_support_calculatorCalculatorResults, alimony_spousal_support_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class alimony_spousal_support_calculatorCalculatorCalculator implements Calculator<alimony_spousal_support_calculatorCalculatorInputs, alimony_spousal_support_calculatorCalculatorResults> {
  readonly id = 'alimony_spousal_support_calculatorCalculator';
  readonly name = 'alimony_spousal_support_calculatorCalculator Calculator';
  readonly description = 'Calculate alimony_spousal_support_calculatorCalculator values';

  calculate(inputs: alimony_spousal_support_calculatorCalculatorInputs): alimony_spousal_support_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: alimony_spousal_support_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: alimony_spousal_support_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
