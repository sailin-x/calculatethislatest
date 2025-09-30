import { Calculator } from '../../engines/CalculatorEngine';
import { ad_reach_and_frequency_calculatorInputs, ad_reach_and_frequency_calculatorResults, ad_reach_and_frequency_calculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class ad_reach_and_frequency_calculatorCalculator implements Calculator<ad_reach_and_frequency_calculatorInputs, ad_reach_and_frequency_calculatorResults> {
  readonly id = 'ad_reach_and_frequency_calculator';
  readonly name = 'ad_reach_and_frequency_calculator Calculator';
  readonly description = 'Calculate ad_reach_and_frequency_calculator values';

  calculate(inputs: ad_reach_and_frequency_calculatorInputs): ad_reach_and_frequency_calculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: ad_reach_and_frequency_calculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: ad_reach_and_frequency_calculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
