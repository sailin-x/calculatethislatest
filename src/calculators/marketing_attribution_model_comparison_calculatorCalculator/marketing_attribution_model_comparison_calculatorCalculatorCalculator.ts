import { Calculator } from '../../engines/CalculatorEngine';
import { marketing_attribution_model_comparison_calculatorCalculatorInputs, marketing_attribution_model_comparison_calculatorCalculatorResults, marketing_attribution_model_comparison_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class marketing_attribution_model_comparison_calculatorCalculatorCalculator implements Calculator<marketing_attribution_model_comparison_calculatorCalculatorInputs, marketing_attribution_model_comparison_calculatorCalculatorResults> {
  readonly id = 'marketing_attribution_model_comparison_calculatorCalculator';
  readonly name = 'marketing_attribution_model_comparison_calculatorCalculator Calculator';
  readonly description = 'Calculate marketing_attribution_model_comparison_calculatorCalculator values';

  calculate(inputs: marketing_attribution_model_comparison_calculatorCalculatorInputs): marketing_attribution_model_comparison_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: marketing_attribution_model_comparison_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: marketing_attribution_model_comparison_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
