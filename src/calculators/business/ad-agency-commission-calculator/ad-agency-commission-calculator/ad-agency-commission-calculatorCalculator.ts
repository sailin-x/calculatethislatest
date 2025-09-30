import { Calculator } from '../../engines/CalculatorEngine';
import { ad-agency-commission-calculatorInputs, ad-agency-commission-calculatorResults, ad-agency-commission-calculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class ad-agency-commission-calculatorCalculator implements Calculator<ad-agency-commission-calculatorInputs, ad-agency-commission-calculatorResults> {
  readonly id = 'ad-agency-commission-calculator';
  readonly name = 'ad agency commission calculator Calculator';
  readonly description = 'Calculate ad agency commission calculator values';

  calculate(inputs: ad-agency-commission-calculatorInputs): ad-agency-commission-calculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: ad-agency-commission-calculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: ad-agency-commission-calculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
