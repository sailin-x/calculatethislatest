import { Calculator } from '../../engines/CalculatorEngine';
import { AdViewabilityImpact-calculatorInputs, AdViewabilityImpact-calculatorResults, AdViewabilityImpact-calculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class AdViewabilityImpact-calculator implements Calculator<AdViewabilityImpact-calculatorInputs, AdViewabilityImpact-calculatorResults> {
  readonly id = 'AdViewabilityImpact-calculator';
  readonly name = 'ad viewability impact calculator Calculator';
  readonly description = 'Calculate ad viewability impact calculator values';

  calculate(inputs: AdViewabilityImpact-calculatorInputs): AdViewabilityImpact-calculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: AdViewabilityImpact-calculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: AdViewabilityImpact-calculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
