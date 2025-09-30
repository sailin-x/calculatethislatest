import { Calculator } from '../../engines/CalculatorEngine';
import { ad_reach_and_frequency_calculatorCalculatorInputs, ad_reach_and_frequency_calculatorCalculatorResults, ad_reach_and_frequency_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class ad_reach_and_frequency_calculatorCalculatorCalculator implements Calculator<ad_reach_and_frequency_calculatorCalculatorInputs, ad_reach_and_frequency_calculatorCalculatorResults> {
  readonly id = 'ad_reach_and_frequency_calculatorCalculator';
  readonly name = 'ad_reach_and_frequency_calculatorCalculator Calculator';
  readonly description = 'Calculate ad_reach_and_frequency_calculatorCalculator values';

  calculate(inputs: ad_reach_and_frequency_calculatorCalculatorInputs): ad_reach_and_frequency_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: ad_reach_and_frequency_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: ad_reach_and_frequency_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
