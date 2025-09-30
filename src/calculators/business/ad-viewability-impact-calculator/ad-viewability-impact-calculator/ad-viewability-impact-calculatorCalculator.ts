import { Calculator } from '../../engines/CalculatorEngine';
import { ad-viewability-impact-calculatorInputs, ad-viewability-impact-calculatorResults, ad-viewability-impact-calculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class ad-viewability-impact-calculatorCalculator implements Calculator<ad-viewability-impact-calculatorInputs, ad-viewability-impact-calculatorResults> {
  readonly id = 'ad-viewability-impact-calculator';
  readonly name = 'ad viewability impact calculator Calculator';
  readonly description = 'Calculate ad viewability impact calculator values';

  calculate(inputs: ad-viewability-impact-calculatorInputs): ad-viewability-impact-calculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: ad-viewability-impact-calculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: ad-viewability-impact-calculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
