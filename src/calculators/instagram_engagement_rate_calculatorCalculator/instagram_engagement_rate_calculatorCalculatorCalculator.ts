import { Calculator } from '../../engines/CalculatorEngine';
import { instagram_engagement_rate_calculatorCalculatorInputs, instagram_engagement_rate_calculatorCalculatorResults, instagram_engagement_rate_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class instagram_engagement_rate_calculatorCalculatorCalculator implements Calculator<instagram_engagement_rate_calculatorCalculatorInputs, instagram_engagement_rate_calculatorCalculatorResults> {
  readonly id = 'instagram_engagement_rate_calculatorCalculator';
  readonly name = 'instagram_engagement_rate_calculatorCalculator Calculator';
  readonly description = 'Calculate instagram_engagement_rate_calculatorCalculator values';

  calculate(inputs: instagram_engagement_rate_calculatorCalculatorInputs): instagram_engagement_rate_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: instagram_engagement_rate_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: instagram_engagement_rate_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
