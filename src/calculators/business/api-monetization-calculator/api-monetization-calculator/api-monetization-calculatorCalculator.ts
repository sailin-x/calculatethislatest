import { Calculator } from '../../engines/CalculatorEngine';
import { api-monetization-calculatorInputs, api-monetization-calculatorResults, api-monetization-calculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class api-monetization-calculatorCalculator implements Calculator<api-monetization-calculatorInputs, api-monetization-calculatorResults> {
  readonly id = 'api-monetization-calculator';
  readonly name = 'api monetization calculator Calculator';
  readonly description = 'Calculate api monetization calculator values';

  calculate(inputs: api-monetization-calculatorInputs): api-monetization-calculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: api-monetization-calculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: api-monetization-calculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
