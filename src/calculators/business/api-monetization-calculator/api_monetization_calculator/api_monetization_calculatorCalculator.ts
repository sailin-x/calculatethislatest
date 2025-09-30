import { Calculator } from '../../engines/CalculatorEngine';
import { api_monetization_calculatorInputs, api_monetization_calculatorResults, api_monetization_calculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class api_monetization_calculatorCalculator implements Calculator<api_monetization_calculatorInputs, api_monetization_calculatorResults> {
  readonly id = 'api_monetization_calculator';
  readonly name = 'api_monetization_calculator Calculator';
  readonly description = 'Calculate api_monetization_calculator values';

  calculate(inputs: api_monetization_calculatorInputs): api_monetization_calculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: api_monetization_calculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: api_monetization_calculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
