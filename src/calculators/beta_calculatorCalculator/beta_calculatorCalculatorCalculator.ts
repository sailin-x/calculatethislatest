import { Calculator } from '../../engines/CalculatorEngine';
import { beta_calculatorCalculatorInputs, beta_calculatorCalculatorResults, beta_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class beta_calculatorCalculatorCalculator implements Calculator<beta_calculatorCalculatorInputs, beta_calculatorCalculatorResults> {
  readonly id = 'beta_calculatorCalculator';
  readonly name = 'beta_calculatorCalculator Calculator';
  readonly description = 'Calculate beta_calculatorCalculator values';

  calculate(inputs: beta_calculatorCalculatorInputs): beta_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: beta_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: beta_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
