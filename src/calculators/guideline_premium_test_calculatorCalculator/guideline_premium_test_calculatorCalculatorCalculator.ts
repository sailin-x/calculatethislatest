import { Calculator } from '../../engines/CalculatorEngine';
import { guideline_premium_test_calculatorCalculatorInputs, guideline_premium_test_calculatorCalculatorResults, guideline_premium_test_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class guideline_premium_test_calculatorCalculatorCalculator implements Calculator<guideline_premium_test_calculatorCalculatorInputs, guideline_premium_test_calculatorCalculatorResults> {
  readonly id = 'guideline_premium_test_calculatorCalculator';
  readonly name = 'guideline_premium_test_calculatorCalculator Calculator';
  readonly description = 'Calculate guideline_premium_test_calculatorCalculator values';

  calculate(inputs: guideline_premium_test_calculatorCalculatorInputs): guideline_premium_test_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: guideline_premium_test_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: guideline_premium_test_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
