import { Calculator } from '../../engines/CalculatorEngine';
import { ad_viewability_impact_on_roi_calculatorCalculatorInputs, ad_viewability_impact_on_roi_calculatorCalculatorResults, ad_viewability_impact_on_roi_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class ad_viewability_impact_on_roi_calculatorCalculatorCalculator implements Calculator<ad_viewability_impact_on_roi_calculatorCalculatorInputs, ad_viewability_impact_on_roi_calculatorCalculatorResults> {
  readonly id = 'ad_viewability_impact_on_roi_calculatorCalculator';
  readonly name = 'ad_viewability_impact_on_roi_calculatorCalculator Calculator';
  readonly description = 'Calculate ad_viewability_impact_on_roi_calculatorCalculator values';

  calculate(inputs: ad_viewability_impact_on_roi_calculatorCalculatorInputs): ad_viewability_impact_on_roi_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: ad_viewability_impact_on_roi_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: ad_viewability_impact_on_roi_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
