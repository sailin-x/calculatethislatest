import { Calculator } from '../../engines/CalculatorEngine';
import { return_on_ad_spend_roas_calculatorCalculatorInputs, return_on_ad_spend_roas_calculatorCalculatorResults, return_on_ad_spend_roas_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class return_on_ad_spend_roas_calculatorCalculatorCalculator implements Calculator<return_on_ad_spend_roas_calculatorCalculatorInputs, return_on_ad_spend_roas_calculatorCalculatorResults> {
  readonly id = 'return_on_ad_spend_roas_calculatorCalculator';
  readonly name = 'return_on_ad_spend_roas_calculatorCalculator Calculator';
  readonly description = 'Calculate return_on_ad_spend_roas_calculatorCalculator values';

  calculate(inputs: return_on_ad_spend_roas_calculatorCalculatorInputs): return_on_ad_spend_roas_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: return_on_ad_spend_roas_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: return_on_ad_spend_roas_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
