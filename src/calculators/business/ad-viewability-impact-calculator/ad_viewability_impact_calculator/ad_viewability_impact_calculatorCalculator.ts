import { Calculator } from '../../engines/CalculatorEngine';
import { ad_viewability_impact_calculatorInputs, ad_viewability_impact_calculatorResults, ad_viewability_impact_calculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class ad_viewability_impact_calculatorCalculator implements Calculator<ad_viewability_impact_calculatorInputs, ad_viewability_impact_calculatorResults> {
  readonly id = 'ad_viewability_impact_calculator';
  readonly name = 'ad_viewability_impact_calculator Calculator';
  readonly description = 'Calculate ad_viewability_impact_calculator values';

  calculate(inputs: ad_viewability_impact_calculatorInputs): ad_viewability_impact_calculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: ad_viewability_impact_calculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: ad_viewability_impact_calculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
