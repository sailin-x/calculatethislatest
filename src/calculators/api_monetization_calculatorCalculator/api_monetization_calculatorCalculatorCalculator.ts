import { Calculator } from '../../engines/CalculatorEngine';
import { api_monetization_calculatorCalculatorInputs, api_monetization_calculatorCalculatorResults, api_monetization_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class api_monetization_calculatorCalculatorCalculator implements Calculator<api_monetization_calculatorCalculatorInputs, api_monetization_calculatorCalculatorResults> {
  readonly id = 'api_monetization_calculatorCalculator';
  readonly name = 'api_monetization_calculatorCalculator Calculator';
  readonly description = 'Calculate api_monetization_calculatorCalculator values';

  calculate(inputs: api_monetization_calculatorCalculatorInputs): api_monetization_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: api_monetization_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: api_monetization_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
