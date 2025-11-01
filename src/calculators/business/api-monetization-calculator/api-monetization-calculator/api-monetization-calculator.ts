import { Calculator } from '../../engines/CalculatorEngine';
import { ApiMonetizationCalculatorinputs, ApiMonetizationCalculatorresults, ApiMonetizationCalculatormetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class ApiMonetizationCalculator implements Calculator<ApiMonetizationCalculatorinputs, ApiMonetizationCalculatorresults> {
  readonly id = 'ApiMonetizationCalculator';
  readonly name = 'api monetization calculator Calculator';
  readonly description = 'Calculate api monetization calculator values';

  calculate(inputs: ApiMonetizationCalculatorinputs): ApiMonetizationCalculatorresults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: ApiMonetizationCalculatormetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: ApiMonetizationCalculatorinputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
