import { Calculator } from '../../engines/CalculatorEngine';
import { long_term_care_calculatorCalculatorInputs, long_term_care_calculatorCalculatorResults, long_term_care_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class long_term_care_calculatorCalculatorCalculator implements Calculator<long_term_care_calculatorCalculatorInputs, long_term_care_calculatorCalculatorResults> {
  readonly id = 'long_term_care_calculatorCalculator';
  readonly name = 'long_term_care_calculatorCalculator Calculator';
  readonly description = 'Calculate long_term_care_calculatorCalculator values';

  calculate(inputs: long_term_care_calculatorCalculatorInputs): long_term_care_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: long_term_care_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: long_term_care_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
