import { Calculator } from '../../engines/CalculatorEngine';
import { AdReachFrequency-calculatorInputs, AdReachFrequency-calculatorResults, AdReachFrequency-calculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class AdReachFrequency-calculator implements Calculator<AdReachFrequency-calculatorInputs, AdReachFrequency-calculatorResults> {
  readonly id = 'AdReachFrequency-calculator';
  readonly name = 'ad reach frequency calculator Calculator';
  readonly description = 'Calculate ad reach frequency calculator values';

  calculate(inputs: AdReachFrequency-calculatorInputs): AdReachFrequency-calculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: AdReachFrequency-calculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: AdReachFrequency-calculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
