import { Calculator } from '../../engines/CalculatorEngine';
import { expected_shortfall_calculatorCalculatorInputs, expected_shortfall_calculatorCalculatorResults, expected_shortfall_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class expected_shortfall_calculatorCalculatorCalculator implements Calculator<expected_shortfall_calculatorCalculatorInputs, expected_shortfall_calculatorCalculatorResults> {
  readonly id = 'expected_shortfall_calculatorCalculator';
  readonly name = 'expected_shortfall_calculatorCalculator Calculator';
  readonly description = 'Calculate expected_shortfall_calculatorCalculator values';

  calculate(inputs: expected_shortfall_calculatorCalculatorInputs): expected_shortfall_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: expected_shortfall_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: expected_shortfall_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
